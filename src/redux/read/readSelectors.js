export const getConfig = (state, configId) => {
  return state.origoAdmin.read.configs.find(c => c.id == configId) || null;
};

export const getSource = (state, sourceId) => {
  return state.origoAdmin.read.sources.find(s => s.id == sourceId) || null;
};

export const getGroup = (state, groupId) => {
  // console.log(state);
  return state.origoAdmin.read.groups.find(g => g.id == groupId) || null;
};

export const getSourceWithLayers = (state, sourceId) => {
  let source = state.origoAdmin.read.sources.find(s => s.id == sourceId) || {};
  source.layers = [];
  if (source && (!source.layers || source.layers.length == 0)) {
    dispatch(getLayersFromSource(source.id, source.url));
    //Todo: wait for this?!
  }
  return source;
}

export const getLayer = (state, layerId) => {
  return state.origoAdmin.read.layers.find(l => l.id == layerId) || null;
};

export const getSourceUrl = (state, sourceId) => {
  const sources = state.origoAdmin.read.sources;
  let sourceUrl;
  sources.forEach(function (element) {
    if (element.id == sourceId) sourceUrl = element.url;
  });
  return sourceUrl;
  // return state.origoAdmin.read.sources.find(s => s.id == sourceId) || null;    
}

export const getSourceOfLayer = (state, layer) => {
  // const source = state.origoAdmin.read.sources;
  // let sourceOfLayer;
  // sources.forEach(function(source) {
  //   if (source.id === layer.source_id) sourceOfLayer = source;
  // });
  // return sourceOfLayer;
  console.log('source_id: ' + layer.source_id);
  return state.origoAdmin.read.sources.find(source => source.id === layer.source_id) || null;
}

export const getGroupLayerTree = (state) => {
  console.log(state);
  const layers = state.origoAdmin.read.layers && state.origoAdmin.read.layers.length > 0 ? [...state.origoAdmin.read.layers] : [];
  const groups = state.origoAdmin.read.groups && state.origoAdmin.read.groups.length > 0 ? [...state.origoAdmin.read.groups] : [];
  let treeRoot = { groupId: 0, title: 'Lager & Grupper', name: 'Lager & Grupper', children: [] };
  treeRoot = addGroupsAndLayersToGroup(treeRoot, groups, layers);
  return treeRoot;
}

export const getGroupLayerTree2 = (state) => {

  const read = state.origoAdmin.read;

  if (read.layers && read.layers.length > 0 && read.groups && read.groups.length > 0) {
    const groupsWithLayers = read.groups.map(g => {
      const group = { ...g }; // This to not mutate the state
      group.layers = read.layers.filter(layer => layer.group_id === group.id);
      return group;
    });

    const treeData = getTreeFromFlatData({ flatData: groupsWithLayers });
    console.log(treeData);
    return treeData;
  }

  return [];
}
export function getTreeFromFlatData({
  flatData,
  getKey = node => node.name,
  getParentKey = node => node.parent,
  rootKey = 'null',
}) {

  if (!flatData) {
    return [];
  }

  const childrenToParents = {};
  flatData.forEach(child => {
    const parentKey = getParentKey(child);

    if (parentKey in childrenToParents) {
      childrenToParents[parentKey].push(child);
    } else {
      childrenToParents[parentKey] = [child];
    }
  });

  if (!(rootKey in childrenToParents)) {
    return [];
  }

  const trav = parent => {
    const parentKey = getKey(parent);
    const layers = parent.layers ? [...parent.layers] : [];

    if (parentKey in childrenToParents) {
      return {
        ...parent,
        children: [...childrenToParents[parentKey], ...layers].map(child => trav(child)),
      };
    }

    return {
      ...parent,
      children: [...layers]
    };
  };

  return childrenToParents[rootKey].map(child => trav(child));
}

const addGroupsAndLayersToGroup = (currentTreeNode, groups, layers) => {
  groups.forEach(function (group) {
    if (!group.name) {
      console.log("Group with name null is found");
    }
    else {
      if ((!group.parent && currentTreeNode.name == "Lager & Grupper") || (group.parent == currentTreeNode.name)) {
        let collapsed = group.collapsed_in_admin_tree ? true : false;
        let newGroupNode = { groupId: group.id, name: group.name, title: group.title, parent: group.parent, collapsed: collapsed, children: [], order_number: group.order_number };
        if (groups.length > 0 || layers.length > 0) {
          newGroupNode = addGroupsAndLayersToGroup(newGroupNode, groups, layers);
        }
        currentTreeNode.children.push(newGroupNode);
      }
      else {
        layers.forEach(function (layer) {
          if (layer.group_id == currentTreeNode.groupId) {
            let newLayerNode = { layerId: layer.id, name: layer.name, title: layer.title, parentId: layer.group_id, leaf: true, order_number: layer.order_number };
            currentTreeNode.children.push(newLayerNode);
            remove(layers, layer);
          }
        });
      }
    }
  });
  currentTreeNode.children.sort(sortGroupOrLayerFunction);
  return currentTreeNode;
}

function sortGroupOrLayerFunction(node1, node2) {
  if (node1.order_number < node2.order_number) {
    return -1;
  }
  if (node1.order_number > node2.order_number) {
    return 1;
  }
  else {
    return 0;
  }
}

export function getFromAvailableControls(state, control) {
  const availableControls = state.origoAdmin.read.availableControls || [];
  return availableControls.find(c => c.name === control.name) || null;
}

export function getAvailableControls(state) {
  return state.origoAdmin.read.availableControls || [];
}

export function getCurrentConfigControls(state) {
  return state.origoAdmin.read.currentConfigControls || [];
}

function remove(array, element) {
  const index = array.indexOf(element);
  array.splice(index, 1);
}


