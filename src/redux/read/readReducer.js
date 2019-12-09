
import {
  FETCH_CONFIGS_COMPLETE,
  FETCH_SOURCES_COMPLETE,
  FETCH_AVAILABLE_CONTROLS_COMPLETE,
  FETCH_PROJ4DEFS_COMPLETE,
  FETCH_LAYERS_COMPLETE,
  FETCH_GROUPS_COMPLETE,
  FETCH_SOURCE_LAYERS_COMPLETE,
  FETCH_CONFIG_CONTROLS_COMPLETE,
  FETCH_CONFIG_STYLES_COMPLETE,
  UPDATE_TREE_DATA,
  CREATE_TREE_STRUCTURE,
  SET_TREE_STRUCTURE_TO_DEFAULT
} from './readActions'

import { getTreeFromFlatData } from './readSelectors';

function readReducer(state, action) {
  if (typeof state === 'undefined') {
    //default state
    return {
      configs: [],
      sources: [],
      layers: [],
      groups: [],
      proj4defs: [],
      availableControls: [],
      currentConfigControls: [],
      cachedControls: []
    };
  }

  switch (action.type) {
    case FETCH_CONFIGS_COMPLETE:
      state = Object.assign({}, state, { configs: action.result });
      return state;

    case FETCH_AVAILABLE_CONTROLS_COMPLETE:
      state = Object.assign({}, state, { availableControls: action.result });
      return state;

    case FETCH_CONFIG_CONTROLS_COMPLETE:
      state = Object.assign({}, state, { currentConfigControls: action.result });
      return state;

    case FETCH_SOURCES_COMPLETE:
      state = Object.assign({}, state, { sources: action.result });
      return state;

    case FETCH_PROJ4DEFS_COMPLETE:
      state = Object.assign({}, state, { proj4defs: action.result });
      return state;

    case FETCH_LAYERS_COMPLETE:
      var fetchedLayers = action.result;
      state = Object.assign({}, state, { layers: fetchedLayers });
      return state;

    case FETCH_GROUPS_COMPLETE:
      var fetchedGroups = action.result;
      state = Object.assign({}, state, { groups: fetchedGroups });
      return state;

    case FETCH_SOURCE_LAYERS_COMPLETE:
      const newSources = [];
      if (state.sources) {

        state.sources.forEach(source => {
          const newSource = { ...source };
          if (newSource.id == action.sourceId) {
            newSource.layers = action.layers;
          }
          newSources.push(newSource);
        })
        return Object.assign({}, state, { sources: newSources });
      }

    case FETCH_CONFIG_STYLES_COMPLETE:
      state = Object.assign({}, state, { currentConfigStyles: action.styles });
      return state;

    case UPDATE_TREE_DATA:
      return Object.assign({}, state, { treeData: action.treeData });

    case CREATE_TREE_STRUCTURE:

      const read = state;
      let treeData = [];
      let fullTreeData = [];

      let groupsWithLayers = [];
      // if (read.layers && read.layers.length > 0 && read.groups && read.groups.length > 0) {
      if (read.groups && read.groups.length > 0) {
        groupsWithLayers = read.groups.map(g => {
          const group = { ...g, expanded: g.collapsed_in_admin_tree }; // This to not mutate the state
          if (read.layers && read.layers.length > 0) {
            group.layers = read.layers.filter(layer => layer.group_id === group.id);
            group.layers.sort(compareFunction);
          }
          return group;
        });
        groupsWithLayers.sort(compareFunction);
      }

      let rootLayers;
      if (read.layers && read.layers.length > 0) {
        rootLayers = read.layers.filter(layer => !layer.group_id);
        rootLayers.sort(compareFunction);
      }
      treeData = getTreeFromFlatData({ flatData: groupsWithLayers });
      fullTreeData = rootLayers && rootLayers.length ? treeData.concat(rootLayers) : treeData;

      let fullTreeData_plus_rootGroup = [{ name: 'ROOT', title: 'Groups & layers', expanded: true, children: fullTreeData }];
      return Object.assign({}, state, { treeData: fullTreeData_plus_rootGroup });

    case SET_TREE_STRUCTURE_TO_DEFAULT:
      return Object.assign({}, state, { treeData: [{ name: 'ROOT', title: 'Groups & layers', expanded: true, children: [] }] });

    default:
      return state;
  }
}

function compareFunction(a, b) {
  if (a.order_number < b.order_number) return -1;
  if (a.order_number > b.order_number) return 1;
  return 0;
}

export default readReducer