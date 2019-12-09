import { toast } from 'react-toastify';

import {
  apiPostConfig,
  apiPutConfig,
  apiDelConfig,
  apiPostSource,
  apiPutSource,
  apiPostLayer,
  apiPutLayer,
  apiPostAttributes,
  apiPutAttributes,
  apiFetchLayerAttributesFromDatabase,
  apiFetchLayerAttributesFromServer,
  apiDelAttribute,
  apiFetchLayersAndGroups,
  apiPostGroup,
  apiPutGroup,
  apiFetchLayerStyle,
  apiFetchStyle,
  apiPostStyle,
  apiPutStyle,
  apiDelLayer,
  apiDelGroup,
  apiPostControl,
  apiDelControl,
  apiPutControl,
  apiFetchConfigStyles,
  apiRemoveConfigGraph,
  apiRemoveLayerGraph,
  apiUpdateGroupAndLayerTreeInformation
} from '../../services/adminapi';

import { getConfig, getSource, getLayer, getSourceOfLayer, getAvailableControls, getCurrentConfigControls, getGroup } from '../read/readSelectors'

import {
  fetchConfigs,
  fetchSources,
  fetchLayers,
  fetchConfigLayers,
  fetchConfigGroups,
  fetchLayersForCurrentConfig,
  fetchLayersAndGroups,
  fetchLayersComplete,
  fetchGroupsComplete,
  fetchConfigControls,
  fetchConfigControlsComplete1,
  createTreeStructure,
  setTreeStructureToDefault
} from '../read/readActions'

import {
  setCurrentConfigId,
  resetAttributesEditor,
  updateUiStyleEditorText,
  setConfigEditorVisible,
  setLayerEditorVisible,
  layerEditorSetSelectedUiAttribute,
  setControlEditorVisible,
  setStyleEditorHidden,
  setAttributeObjectToEdit,
  setGroupEditorHidden
} from '../ui/uiActions'

import { createJsonObject, createStyleObject, prettifyJson } from '../../services/styleHelpers'
import { DbConfig } from '../../models/DbConfig'
import { DbControl } from '../../models/DbControl'
import { setAttributeEditorVisible } from '../ui/uiActions';

export const CONFIG_EDITOR_SET_OBJECT_TO_EDIT = 'CONFIG_EDITOR_SET_OBJECT_TO_EDIT'
export const CONFIG_EDITOR_UPDATE_VALUE = 'CONFIG_EDITOR_UPDATE_VALUE'
export const LAYER_EDITOR_SET_OBJECT_TO_EDIT = 'LAYER_EDITOR_SET_OBJECT_TO_EDIT'
export const LAYER_EDITOR_UPDATE_VALUE = 'LAYER_EDITOR_UPDATE_VALUE'
export const SOURCE_EDITOR_SET_OBJECT_TO_EDIT = 'SOURCE_EDITOR_SET_OBJECT_TO_EDIT'
export const SOURCE_EDITOR_UPDATE_VALUE = 'SOURCE_EDITOR_UPDATE_VALUE'
export const LAYER_EDITOR_ADD_SELECTED_ATTRIBUTE = "LAYER_EDITOR_ADD_SELECTED_ATTRIBUTE"
export const LAYER_EDITOR_SET_ATTRIIBUTES_TO_EDIT = "LAYER_EDITOR_SET_ATTRIIBUTES_TO_EDIT"
export const GROUP_EDITOR_UPDATE_VALUE = "GROUP_EDITOR_UPDATE_VALUE"
export const GROUP_EDITOR_SET_OBJECT_TO_EDIT = "GROUP_EDITOR_SET_OBJECT_TO_EDIT"
export const UPDATE_WRITE_STYLE_EDITOR = "UPDATE_WRITE_STYLE_EDITOR"
export const UPDATE_WRITE_STYLE_EDITOR_NAME = "UPDATE_WRITE_STYLE_EDITOR_NAME"
export const UPDATE_LAYER_STYLE_ID = "UPDATE_LAYER_STYLE_ID"
export const LAYER_EDITOR_REMOVE_ATTRIBUTE = "LAYER_EDITOR_REMOVE_ATTRIBUTE"
export const CREATE_CONTROL_OBJECTS_COMPLETE = "CREATE_CONTROL_OBJECTS_COMPLETE"
export const CONTROL_EDITOR_TOGGLE_CONTROL = "CONTROL_EDITOR_TOGGLE_CONTROL"
export const SET_CONTROL_OBJECT_TO_EDIT = "SET_CONTROL_OBJECT_TO_EDIT"
export const CONTROL_EDITOR_UPDATE_VALUE = "CONTROL_EDITOR_UPDATE_VALUE"
export const LAYER_EDITOR_SET_SELECTED_SOURCE = "LAYER_EDITOR_SET_SELECTED_SOURCE"
export const LAYER_EDITOR_SET_SELECTED_GROUP = "LAYER_EDITOR_SET_SELECTED_GROUP"
export const GROUP_EDITOR_SET_SELECTED_PARENT_GROUP = "GROUP_EDITOR_SET_SELECTED_PARENT_GROUP"
export const UPDATE_SORT_ORDER_OF_LAYERS_AND_GROUPS = "UPDATE_SORT_ORDER_OF_LAYERS_AND_GROUPS"



export function createControlObjects() {
  return (dispatch, getState) => {

    let availableControls = getAvailableControls(getState());
    let currentConfigControls = getCurrentConfigControls(getState());

    let controls = availableControls.map(availableControl => {
      let currentConfigControl = currentConfigControls.find(c => c.name === availableControl.name);
      let control = Object.assign({}, availableControl);
      if (currentConfigControl) {
        control.options = availableControl.options.map(o => {
          let option = Object.assign({}, o);
          option.value = currentConfigControl.options[option.name];
          return option;
        });
        control.id = currentConfigControl.id;
        control.isActive = true
      } else {
        // here control object has availableControl default value
        control.id = null
        control.isActive = false
      }
      return control;
    });
    dispatch(createControlObjectsComplete(controls));
  }
}
export function createControlObjectsComplete(controls) {
  return { type: CREATE_CONTROL_OBJECTS_COMPLETE, controls: controls }
}

export function controlEditorToggleControl(control) {
  return (dispatch, getState) => {
    const currentControl = getState().origoAdmin.write.controlEditor.currentControl;
    let currentConfigId = getCurrentConfigId(getState());
    if (control.isActive) {
      // remove control from db
      if (control.id) // this is needed if we want to handle caching, otherwise it is unneccessary!
        apiDelControl(control.id).then(result => {
          dispatch(fetchConfigControls(currentConfigId));
        });
      if (currentControl && control.name === currentControl.name)
        dispatch(setControlEditorVisible(false));
    } else {
      if (!currentConfigId || currentConfigId <= 0) {
        alert('spara den nyskapade konfigen eller välj en annan konfig först!');
        return;
      }
      // create an object to be saved in db from the control [ControlForm->getFormAsControl() OEMAP-167]
      const dbFormattedControl = new DbControl(control, currentConfigId);
      // add control to db for this config
      apiPostControl(dbFormattedControl).then(result => {
        dispatch(fetchConfigControls(currentConfigId));
      });
    }
  }
}

export function controlEditorStartEdit(control) {
  return (dispatch, getState) => {
    dispatch(setControlEditorVisible(true));
    dispatch(setControlObjectToEdit(control));
  }
}

export function setControlObjectToEdit(control) {
  return { type: SET_CONTROL_OBJECT_TO_EDIT, control: control }
}

export function controlEditorUpdateValue(name, value) {
  return { type: CONTROL_EDITOR_UPDATE_VALUE, name: name, value: value }
}

export function controlEditorSaveCurrentControl() {
  return (dispatch, getState) => {
    const currentControl = getState().origoAdmin.write.controlEditor.currentControl;
    const currentConfigId = getCurrentConfigId(getState());
    const databaseFormattedStyle = new DbControl(currentControl, currentConfigId);
    apiPutControl(databaseFormattedStyle).then(result => {
      dispatch(fetchConfigControls(currentConfigId));
      dispatch(setControlEditorVisible(false));
    });
  }
}

// CONFIG EDITOR 
export function configEditorStartEdit(id) {
  return (dispatch, getState) => {
    if (!id) {
      dispatch(configEditorSetObjectToEdit(null));
      dispatch(setCurrentConfigId(null));
      // The point is to set layers and to null when a new config is created. Maybe it is better to write a seperate action instead of using fetchLayers/GroupsComplete(null) for readability 
      dispatch(fetchLayersComplete(null));
      dispatch(fetchGroupsComplete(null));
      dispatch(fetchConfigControlsComplete1(null));
      dispatch(setTreeStructureToDefault());
    } else {
      dispatch(configEditorSetObjectToEdit(getConfig(getState(), id)));
      dispatch(setCurrentConfigId(id));
      dispatch(fetchConfigLayers(id));
      dispatch(fetchConfigGroups(id));
      dispatch(fetchConfigControls(id));
      // dispatch(createTreeStructure());
      // dispatch(fetchLayersAndGroups(id)); // hämtar alla lager och grupper tillgörande en konfig på en gång
    }
    dispatch(setConfigEditorVisible(true));
    // here it is ok NOT to send currentConfigId along, because layer editor is set to invisible and user MUST choose another layer or a create a new layer that will set the config_id on layer object either way.
    dispatch(layerEditorSetObjectToEdit(null));
    dispatch(setLayerEditorVisible(false));
    dispatch(setControlEditorVisible(false));
  }
}

export function configEditorSetObjectToEdit(config) {
  return { type: CONFIG_EDITOR_SET_OBJECT_TO_EDIT, config: config }
}

export function configEditorUpdateValue(attributeName, value) {
  return { type: CONFIG_EDITOR_UPDATE_VALUE, attributeName: attributeName, value: value }
}

export function configEditorSave() {
  return (dispatch, getState) => {
    var uiConfig = getState().origoAdmin.write.configEditor;
    // converting from the config format in the UI to the config format of DB.
    var config = new DbConfig(uiConfig);
    if (!config.id || config.id == 0) {
      apiPostConfig(config).then(result => dispatch(configEditorEndEdit(result.serverResponse.id)));
    }
    else {
      apiPutConfig(config).then(result => dispatch(configEditorEndEdit(config.id)));
    }
  }
}

export function configEditorEndEdit(id) {
  return (dispatch, getState) => {
    // dispatch(configEditorSetObjectToEdit(null));
    dispatch(fetchConfigs());
    dispatch(setCurrentConfigId(id));
  }
}

export function removeConfig(id) {
  return (dispatch, getState) => {
    // apiDelConfig(id).then(result => dispatch(fetchConfigs()));
    apiRemoveConfigGraph(id).then(result => dispatch(fetchConfigs()));
    const currentConfigId = getState().origoAdmin.ui.configEditor.currentConfigId;
    if (id == currentConfigId) {
      dispatch(configEditorStartEdit(null));
      // dispatch(setCurrentConfigId(null));
      dispatch(setLayerEditorVisible(false));
    }
  }
}

// LAYER EDITOR 
export function layerEditorStartEdit(id) {
  return (dispatch, getState) => {
    let currentConfigId = getState().origoAdmin.ui.configEditor.currentConfigId;
    if (!currentConfigId) {
      alert('Du måste välja en Konfiguration först!');
      return;
    }
    if (!id) {
      dispatch(layerEditorSetObjectToEdit(null, currentConfigId));
      dispatch(layerEditorSetStyleToEdit(null));
    } else {
      const layer = getLayer(getState(), id);
      const source = getSourceOfLayer(getState(), layer);
      dispatch(layerEditorSetObjectToEdit(layer));
      apiFetchLayerAttributesFromDatabase(layer).then(result => dispatch(layerEditorSetAttributesToEdit(result.serverResponse)));
      // layerEditorSetSelectedUiAttribute => method that puts an array of attributes ui to be shown in the selector.
      apiFetchLayerAttributesFromServer(layer.name, source)
        .then(result => dispatch(layerEditorSetSelectedUiAttribute(result.serverResponse)))
        .catch(err => dispatch(layerEditorSetSelectedUiAttribute([])));
      // dispatch(layerEditorSetSelectedGroup(layer.group_id));
      if (layer.style_id && layer.style_id > 0) {
        apiFetchStyle(layer.style_id).then(result => {
          dispatch(layerEditorSetStyleToEdit(result.serverResponse));
        });
      } else {
        dispatch(layerEditorSetStyleToEdit(null));
      }
    }
    dispatch(setLayerEditorVisible(true));
  }
}

export function layerEditorSetStyleToEdit(databaseFormattedStyle) {
  return (dispatch, getState) => {
    if (databaseFormattedStyle) {
      let jsonFormattedStyle = createJsonObject(databaseFormattedStyle[0]);
      let styleName = databaseFormattedStyle[0].name;
      // keeping the database like style object under state.write.styleEditor 
      dispatch(updateWriteStyleEditor(databaseFormattedStyle[0]));
      // keeping the json like style object under the state.ui.styleEditor
      dispatch(updateUiStyleEditorText(prettifyJson(JSON.stringify(jsonFormattedStyle))));
      // dispatch(updateUiStyleEditorName(styleName));
    } else {
      dispatch(updateWriteStyleEditor(null));
      dispatch(updateUiStyleEditorText(null));
      // dispatch(updateUiStyleEditorName(null));
    }
  }
}

// keeping the database like style object under state.write.styleEditor 
export function updateWriteStyleEditor(databaseFormattedStyle) {
  return { type: UPDATE_WRITE_STYLE_EDITOR, style: databaseFormattedStyle }
}

export function layerEditorSetAttributesToEdit(attributes) {
  // OBS! attributes is an array of objects not an object.
  return { type: LAYER_EDITOR_SET_ATTRIIBUTES_TO_EDIT, attributes: attributes }
}

export function layerEditorSetObjectToEdit(layer, currentConfigId) {
  return { type: LAYER_EDITOR_SET_OBJECT_TO_EDIT, layer: layer, configId: currentConfigId }
}

export function layerEditorUpdateValue(attributeName, value) {
  return { type: LAYER_EDITOR_UPDATE_VALUE, attributeName: attributeName, value: value }
}

export function layerEditorAddSelectedAttribute() {
  return (dispatch, getState) => {

    let attribute = getState().origoAdmin.ui.attributeEditor;
    if (attribute.html) {
      let attributeHtlm = {};
      attributeHtlm.html = attribute.html;
      // attributeHtlm.layer_id = attribute.layer_id;
      dispatch(layerEditorAddSelectedAttribute2(attributeHtlm));
    }
    if (attribute.name) {
      attribute.html = '';
      dispatch(layerEditorAddSelectedAttribute2(attribute));
    }
    dispatch(setAttributeObjectToEdit(null));
    dispatch(setAttributeEditorVisible(false));
  }
}

export function layerEditorAddSelectedAttribute2(attribute) {
  return { type: LAYER_EDITOR_ADD_SELECTED_ATTRIBUTE, attribute: attribute }
}

export function layerEditorSave() {
  return (dispatch, getState) => {

    const l = getState().origoAdmin.write.layerEditor;
    const layer = { ...l }; // We make clone of the layer object to prevent state mutation when removing order_number
    if (!layer.source_id || layer.source_id <= 0) {
      alert('Ni måste välja en serverkälla!');
      return;
    }
    if (!layer.name) {
      alert('Ni måste välja ett lager!');
      return;
    }
    if (!layer.style_id) {
      alert('Ni måste skapa en stil!');
      return;
    }

    const attributes = layer.attributes || [];
    let putAttributes = []; // now we don't use put. 
    let postAttributes = [];
    attributes.forEach(function (attribute) {
      if (attribute.hasOwnProperty('id'))
        putAttributes.push(attribute);
      else
        postAttributes.push(attribute);
    });
    if (!layer.id || layer.id <= 0) {
      layer.id = null;
      // we need to this to ensure that the newly created layer ends up in the last place.
      // order_number is overwritten in the database, becuase the order_number is saved directly to database and has nothin to do with layer editor.
      layer.order_number = 9999;
      apiPostLayer(layer)
        .then(result => {
          let layerId = result.serverResponse.id;
          // it is enough to just set layerId on the postAttributes, but is does not do any harm to do it for all!
          attributes.forEach(function (attribute) {
            attribute.layer_id = layerId;
          });
          apiPostAttributes(postAttributes);
          // it is basically not needed to do put here when layer is post. but does not do any harm to do that!!
          // apiPutAttributes(putAttributes);
          // here we do not wait for attributes to be save first and then reset the editor. 
          // if we want to do so, we should have a then() function for post and a then() for put seperatrly:
          // return apiPostAttributes(attributes);
        })
        .then(() => dispatch(layerEditorEndEdit()))
        .catch((err) => console.log(err));
    } else {
      // we need to this so that no order_number is overwritten in the database, becuase the order_number is saved directly to database and has nothin to do with layer editor.
      // otherwise if layer editor is open and then we change the order of the same open layer, when "Spara Lager" button is clicked the order_number in the editor that still holds the old value will overwrite the updated value
      // and the layer will jump back to its previous position in the tree.
      // The same goes for parent group.
      if (layer.order_number) delete layer.order_number;
      if (layer.group_id) delete layer.group_id;
      apiPutLayer(layer)
        .then(result => {
          attributes.forEach(function (attribute) {
            attribute.layer_id = layer.id;
          });
          // if layer is a PUT, attributes that belong to that layer and are fetched from database are put as well, 
          // however, if new attributes are added, thosw newly added attributes become POST. That is why we need two function. 
          apiPostAttributes(postAttributes);
          // apiPutAttributes(putAttributes);
        })
        .then(() => dispatch(layerEditorEndEdit()))
        .catch((err) => console.log(err));
    }
    dispatch(setLayerEditorVisible(false));
  }
}

export function layerEditorEndEdit() {
  return (dispatch, getState) => {
    let currentConfigId = getState().origoAdmin.ui.configEditor.currentConfigId;
    dispatch(layerEditorSetObjectToEdit(null, currentConfigId));
    dispatch(resetAttributesEditor());
    dispatch(fetchLayersForCurrentConfig());
  }
}
// ===================================>> HERE <<=============================
export function removeLayer(id) {
  return (dispatch, getState) => {
    let currentLayerId = getState().origoAdmin.write.layerEditor.id;
    apiRemoveLayerGraph(id).then(result => {
      const currentConfigId = getState().origoAdmin.ui.configEditor.currentConfigId;
      dispatch(fetchConfigLayers(currentConfigId));
      dispatch(fetchConfigGroups(currentConfigId));
    });
    if (id === currentLayerId) {
      // here it is ok NOT to send currentConfigId along, because layer editor is set to invisible and user MUST choose another layer or a create a new layer that will set the config_id on layer object either way.
      dispatch(layerEditorSetObjectToEdit(null));
      dispatch(setLayerEditorVisible(false));
    }
  }
}

export function removeAttribute(attribute) {
  return dispatch => {
    if (attribute.id) { // means that thid attribute is already saved in db so it should be removed from db and then from state. otherwise should be removed only from the state.
      // after removing one attribute from db we cannot read them all from db again to update the view bcoz other unsaved attributes will be removed as well! 
      // we need to update the state only so that only this specific attributes is removed.
      console.log('attribute id to be removed: ' + attribute.id);
      apiDelAttribute(attribute.id)
        .then(
          // removing this attribute from state
          dispatch(layerEditorRemoveAttribute(attribute))
        );
    } else {
      // removing this attribute from state
      dispatch(layerEditorRemoveAttribute(attribute))
    }
  }
}

export function layerEditorRemoveAttribute(attribute) {
  return { type: LAYER_EDITOR_REMOVE_ATTRIBUTE, attribute: attribute }
}

export function layerEditorSetSelectedSource(id) {
  return { type: LAYER_EDITOR_SET_SELECTED_SOURCE, id: id };
}

export function layerEditorSetSelectedGroup(id) {
  return { type: LAYER_EDITOR_SET_SELECTED_GROUP, id: id };
}

// SOURCE EDITOR 
export function sourceEditorStartEdit(id) {
  return (dispatch, getState) => {
    if (!id) {
      dispatch(sourceEditorSetObjectToEdit(null));
    } else {
      dispatch(sourceEditorSetObjectToEdit(getSource(getState(), id)));
    }
  }
}

export function sourceEditorSetObjectToEdit(source) {
  return { type: SOURCE_EDITOR_SET_OBJECT_TO_EDIT, source: source }
}

export function sourceEditorUpdateValue(attributeName, value) {
  return { type: SOURCE_EDITOR_UPDATE_VALUE, attributeName: attributeName, value: value }
}

export function sourceEditorSave() {
  return (dispatch, getState) => {
    var source = getState().origoAdmin.write.sourceEditor;
    if (!source.id || source.id == 0) {
      apiPostSource(source).then(result => dispatch(sourceEditorEndEdit()));
    }
    else {
      apiPutSource(source).then(result => dispatch(sourceEditorEndEdit()));
    }
  }
}

export function sourceEditorEndEdit() {
  return (dispatch, getState) => {
    dispatch(sourceEditorSetObjectToEdit(null));
    dispatch(fetchSources());
  }
}

export function removeSource(id) {
  return dispatch => {
    apiDelSource(id).then(result => dispatch(fetchSources()));
  }
}

// GROUP EDITOR
export function groupEditorUpdateValue(attributeName, value) {
  return { type: GROUP_EDITOR_UPDATE_VALUE, attributeName: attributeName, value: value }
}

export function groupEditorSave() {
  return (dispatch, getState) => {
    var group_original = getState().origoAdmin.write.groupEditor;
    let currentConfigId = getState().origoAdmin.ui.configEditor.currentConfigId;
    if (!currentConfigId) {
      alert('Du måste välja en Konfiguration först!');
      return;
    }
    // We need to clone the object otherwise state is mutated when setting config_id and order_number
    const group = { ...group_original };
    if (!group.id || group.id == 0) {
      if (!group.config_id || group.config_id <= 0) group.config_id = currentConfigId;
      group.order_number = 9999; // To ensure that newly created group ends up in the last place
      group.parent = null; // To ensure that newly created group ends up in the root group. in case we let the user choose parent group for a new group handling order_number becomes cumbersome
      apiPostGroup(group).then(result => dispatch(groupEditorEndEdit()));
    }
    else {
      delete group.collapsed_in_admin_tree;
      apiPutGroup(group).then(result => dispatch(groupEditorEndEdit()));
    }
  }
}

export function groupEditorEndEdit() {
  return (dispatch, getState) => {
    let currentConfigId = getState().origoAdmin.ui.configEditor.currentConfigId;
    dispatch(groupEditorSetObjectToEdit(null, currentConfigId));
    dispatch(fetchConfigGroups(currentConfigId));
  }
}
export function groupEditorSetObjectToEditById(id) {
  return (dispatch, getState) => {
    const group = getGroup(getState(), id);
    let currentConfigId = getState().origoAdmin.ui.configEditor.currentConfigId;
    dispatch(groupEditorSetObjectToEdit(group, currentConfigId));
  }
}

export function groupEditorSetObjectToEdit(group, configId) {
  return { type: GROUP_EDITOR_SET_OBJECT_TO_EDIT, group: group, configId: configId }
}

export function removeGroup(id) {

  return (dispatch, getState) => {
    // let currentGroupId = getState().origoAdmin.write.layerEditor.group_id;
    const treeData = getState().origoAdmin.read.treeData;
    let foundGroup;
    function findGroup(groups, id) {
      for (let group of groups) {
        // console.log(group.name);
        if (group.id === id) {
          foundGroup = group;
        } else if (group.children && group.children.length > 0) {
          findGroup(group.children, id);
        }
      }
    }
    findGroup(treeData[0].children, id);
    const currentConfigId = getState().origoAdmin.ui.configEditor.currentConfigId;
    if (foundGroup.children && foundGroup.children.length > 0) {
      toast.error('group has children, cannot be removed');
      console.log('group has children, cannot be removed');
    } else {
      apiDelGroup(id).then(result => dispatch(fetchConfigGroups(currentConfigId)));
    }
  }
}

export function groupEditorSetSelectedParentGroup(parent) {
  return { type: GROUP_EDITOR_SET_SELECTED_PARENT_GROUP, parent: parent }
}

// style editor
export function saveStyle() {
  return (dispatch, getState) => {
    const id = getState().origoAdmin.write.layerEditor.style_id;
    const styleName = getState().origoAdmin.write.styleEditor.name;
    const currentConfigId = getCurrentConfigId(getState());
    if (!styleName) {
      alert('Stil måste ha ett namn!');
      return;
    }
    //  check that name is unique here
    apiFetchConfigStyles(currentConfigId).then(result => {
      // console.log(result.serverResponse);
      const obj = result.serverResponse.find(o => o.name === styleName);
      const styleText = getState().origoAdmin.ui.styleEditor.text;
      const isValid = validateJson(styleText);

      if (!isValid) {
        alert('Nogåt gick fel! Se till stil har en korrekt format.');
        return;
      }

      const styleJson = JSON.parse(styleText);
      const databaseFormattedStyle = createStyleObject(styleName, [styleJson]);
      if (!id || id <= 0) {
        if (obj && obj.name) {
          alert('En stil redan finns med samma namn!');
          return;
        }
        apiPostStyle(databaseFormattedStyle).then(result => {
          dispatch(updateLayerStyleId(result.serverResponse));
          dispatch(updateWriteStyleEditor(result.serverResponse));
        });
      } else {
        if (obj && obj.name && obj.id != id) {
          alert('En stil redan finns med samma namn!');
          return;
        }
        databaseFormattedStyle.id = id;
        apiPutStyle(databaseFormattedStyle).then(result => {
          dispatch(updateWriteStyleEditor(result.serverResponse));
        });
      }
      dispatch(setStyleEditorHidden());
    });
  }
}

function validateJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

// export function importStil00(styleId) {
//   return (dispatch, getState) => {
//     apiFetchStyle(styleId).then(result => {
//       let databaseFormattedStyle = result.serverResponse;
//       let jsonFormattedStyle = createJsonObject(databaseFormattedStyle[0]);
//       // keeping the database like style object under state.write.styleEditor 
//       dispatch(updateWriteStyleEditor(databaseFormattedStyle[0]));
//       // keeping the json like style object under the state.ui.styleEditor
//       dispatch(updateUiStyleEditorText(prettifyJson(JSON.stringify(jsonFormattedStyle))));
//     });
//   }
// }

// if sometime later we need to change the behaviour of importStil or layerEditorSetStyleToEdit, the above function can be used which is now identical to layerEditorSetStyleToEdit.
export function importStil(styleId) {
  return (dispatch, getState) => {
    apiFetchStyle(styleId).then(result => {
      dispatch(layerEditorSetStyleToEdit(result.serverResponse));
    });
  }
}

export function updateGroupAndLayerTreeInformation(tree) {
  return (dispatch, getState) => {
    let groupsAndLayersToSave = findAlteredGroupsAndLayers(tree, [], getState);
    apiUpdateGroupAndLayerTreeInformation(groupsAndLayersToSave)
      .then(
        result => {
          console.log("sucessfully save sort order");
          let currentConfigId = getState().origoAdmin.ui.configEditor.currentConfigId;
          dispatch(fetchConfigLayers(currentConfigId));
          dispatch(fetchConfigGroups(currentConfigId));
        });
  }
}

function findAlteredGroupsAndLayers(currentRoot, groupsAndLayersToSave, getState) {
  var localCounter = 1;
  let previousNode = null;
  let nodeType = "";
  currentRoot.children.forEach(function (node) {
    if (node.groupId) {
      nodeType = "Group";
      previousNode = getGroup(getState(), node.groupId);
    }
    else {
      nodeType = "Layer";
      previousNode = getLayer(getState(), node.layerId);
    }
    let logMessage = "";
    let altered = false;
    //node.parentId was added before sorting in tree
    //TODO Change so group has parentId aswell!!!!
    if (node.groupId && node.parent != currentRoot.name && !(node.parent == null && currentRoot.groupId == 0)) {
      logMessage += "[parent from " + node.parent + " to " + currentRoot.name + "]";
      altered = true;
    }
    if (node.collapsed != previousNode.collapsed_in_admin_tree) {
      logMessage += "[collapsed_in_admin_tree from " + previousNode.collapsed_in_admin_tree + " to " + node.collapsed + "]";
      altered = true;
    }
    if (node.layerId && (node.parentId != currentRoot.groupId && currentRoot.groupId >= 0) && !(typeof node.parentId == "undefined" && currentRoot.groupId == 0)) {
      logMessage += "[parent from " + node.parentId + " to " + currentRoot.groupId + "]";
      altered = true;
    }
    if (node.order_number != localCounter) {
      logMessage += "[order_number from " + node.order_number + " to " + localCounter + "]";
      altered = true;
    }
    if (altered) {
      console.log(nodeType + " " + previousNode.name + "(id:" + previousNode.id + ") " + logMessage);
      groupsAndLayersToSave.push({
        type: nodeType,
        itemId: previousNode.id,
        previousParent: node.parentId,
        newParentId: currentRoot.groupId,
        previousOrderNumber: node.order_number,
        newOrderNumber: localCounter,
        collapsed_in_admin_tree: node.collapsed
      });
    }

    if (nodeType == "Group") {
      groupsAndLayersToSave.concat(findAlteredGroupsAndLayers(node, groupsAndLayersToSave, getState));
    }
    localCounter++;
  });
  return groupsAndLayersToSave;
}

export function updateWriteStyleEditorName(name) {
  return { type: UPDATE_WRITE_STYLE_EDITOR_NAME, name: name }
}

export function updateLayerStyleId(style) {
  return { type: UPDATE_LAYER_STYLE_ID, id: style.id }
}

function getCurrentConfigId(state) {
  return state.origoAdmin.ui.configEditor.currentConfigId;
}