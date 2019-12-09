import { toast } from 'react-toastify';

import {
  apiPostForm,
  apiFetchConfigs,
  apiFetchSources,
  apiFetchLayers,
  apiFetchConfigLayers,
  apiFetchConfigGroups,
  apiFetchLayersForASource,
  apiExportConfigAsJson,
  apiFetchProj4defs,
  apiFetchConfigControls,
  apiFetchConfigStyles,
  apiFetchStyle,
  apiUpdateTreeStructure,
  apiSaveVisibilityStatus
} from '../../services/adminapi';
import { sourceEditorIsSourceLoding, importJsonToDbLoading, setConfigEditorVisible } from '../ui/uiActions';
import { createControlObjects, layerEditorSetStyleToEdit } from '../write/writeActions';
import {
  getSource
} from './readSelectors';
import { availableControls } from '../../other/AvailableControls';

export const FETCH_CONFIGS_COMPLETE = 'FETCH_CONFIGS_COMPLETE';
export const FETCH_AVAILABLE_CONTROLS_COMPLETE = "FETCH_AVAILABLE_CONTROLS_COMPLETE";
export const FETCH_SOURCES_COMPLETE = 'FETCH_SOURCES_COMPLETE';
export const FETCH_LAYERS_COMPLETE = 'FETCH_LAYERS_COMPLETE';
export const FETCH_GROUPS_COMPLETE = 'FETCH_GROUPS_COMPLETE';
export const EXPORT_CONFIG_AS_JSON = "EXPORT_CONFIG_AS_JSON";
export const FETCH_SOURCE_LAYERS_COMPLETE = "FETCH_SOURCE_LAYERS_COMPLETE";
export const FETCH_PROJ4DEFS_COMPLETE = "FETCH_PROJ4DEFS_COMPLETE";
export const FETCH_CONFIG_CONTROLS_COMPLETE = "FETCH_CONFIG_CONTROLS_COMPLETE";
export const UPDATE_ACTIVE_CONTROLS = "UPDATE_ACTIVE_CONTROLS";
export const UPDATE_CACHED_CONTROLS = "UPDATE_CACHED_CONTROLS";
export const FETCH_CONFIG_STYLES_COMPLETE = "FETCH_CONFIG_STYLES_COMPLETE";
export const UPDATE_TREE_DATA = "UPDATE_TREE_DATA";
export const CREATE_TREE_STRUCTURE = "CREATE_TREE_STRUCTURE";
export const SET_TREE_STRUCTURE_TO_DEFAULT = "SET_TREE_STRUCTURE_TO_DEFAULT";

export function updateTreeStructure(node, nextParentNode, nextSiblings) {
  return (dispatch, getState) => {
    // We need to this otherwise all groups and their children get stringified and therefore too large to be sent over the network!
    const data = {
      node: {
        id: node.id,
        name: node.name,
        config_id: node.config_id,
        group_id: node.group_id,
        type: node.type
      },
      nextParentNode: {
        id: nextParentNode.id || null,
        name: nextParentNode.name,
        // if parent is root then we loose the config_id, therefore node.config_id
        config_id: node.config_id,
        group_id: nextParentNode.group_id
      },
      nextSiblings: nextSiblings.map(s => {
        return {
          id: s.id,
          name: s.name,
          config_id: s.config_id,
          group_id: s.group_id,
          type: s.type
        }
      })
    };
    apiUpdateTreeStructure(JSON.stringify(data))
      .then(data => {
        const currentConfigId = getState().origoAdmin.ui.configEditor.currentConfigId;
        dispatch(fetchConfigLayers(currentConfigId));
        dispatch(fetchConfigGroups(currentConfigId));
      })
      .catch(err => {
        console.log(err);
        toast.error('Tree structure could not be updated. Try again later!');
        // This is needed so that tree structure is re-created using old data.
        dispatch(createTreeStructure());
      });
  }
}

export function saveVisibilityStatus(node, expanded) {
  return (dispatch, getState) => {
    const data = {
      group_id: node.id,
      config_id: node.config_id,
      expanded
    }
    apiSaveVisibilityStatus(JSON.stringify(data)).catch(err => console.log(err));
  }
}

export function updateTreeData(treeData) {
  return (dispatch, getState) => {
    dispatch({ type: UPDATE_TREE_DATA, treeData: treeData });
  }
}

export function createTreeStructure() {
  return { type: CREATE_TREE_STRUCTURE };
}

export function setTreeStructureToDefault() {
  return { type: SET_TREE_STRUCTURE_TO_DEFAULT }
}
export function importJsonToDB(form) {
  // var files = document.getElementById('fileUpload').files; // the input element that holds the files is inside the form element!
  return (dispatch, getState) => {
    dispatch(importJsonToDbLoading(true));
    return apiPostForm(form).then(result => {
      dispatch(importJsonToDbLoading(false));
      dispatch(fetchConfigs());
      dispatch(fetchProj4defs());
      dispatch(setConfigEditorVisible(false));
    }).catch(err => {
      alert(err.message);
      dispatch(importJsonToDbLoading(false));
    });
  }
}

export function exportConfigAsJson(id) {
  return (dispatch, getState) => {
    apiExportConfigAsJson(id);
  }
}

export function fetchConfigs() {
  console.log('fetching config');
  return dispatch => {
    return apiFetchConfigs().then(result => dispatch(fetchConfigsComplete(result.serverResponse)));
  }
}

export function fetchConfigsComplete(result) {
  return { type: FETCH_CONFIGS_COMPLETE, result: result }
}

export function fetchAvailableControls() {
  return dispatch => {
    // return apiFetchControls().then(result => dispatch(fetchControlsComplete(result.serverResponse)));
    dispatch(fetchAvailableControlsComplete(availableControls));
  }
}

export function fetchAvailableControlsComplete(result) {
  return { type: FETCH_AVAILABLE_CONTROLS_COMPLETE, result: result }
}

export function fetchSources() {
  return dispatch => {
    return apiFetchSources().then(result => dispatch(fetchSourcesComplete(result.serverResponse)));
  }
}

export function fetchSourcesComplete(result) {
  return { type: FETCH_SOURCES_COMPLETE, result: result }
}

export function fetchProj4defs() {
  return dispatch => {
    return apiFetchProj4defs().then(result => dispatch(fetchProj4defsComplete(result.serverResponse)));
  }
}

export function fetchProj4defsComplete(result) {
  return { type: FETCH_PROJ4DEFS_COMPLETE, result: result }
}

export function fetchLayers() {
  return dispatch => {
    return apiFetchLayers().then(result => dispatch(fetchLayersComplete(result.serverResponse)));
  }
}

export function fetchLayersForCurrentConfig() {
  return (dispatch, getState) => {
    let currentConfigId = getState().origoAdmin.ui.configEditor.currentConfigId;
    if (currentConfigId == null) return;
    return apiFetchConfigLayers(currentConfigId)
      .then(result => dispatch(fetchLayersComplete(result.serverResponse)))
      .then(data => dispatch(createTreeStructure()));
  }
}

export function fetchConfigLayers(configId) {
  return dispatch => {
    return apiFetchConfigLayers(configId).then(result => {
      dispatch(fetchLayersComplete(result.serverResponse));
      dispatch(createTreeStructure()); //this needs to be run both after fetchGroups and Layers bcuz tree structure is dependant on both
    });
  }
}

export function fetchLayersComplete(result) {
  return { type: FETCH_LAYERS_COMPLETE, result: result }
}

export function fetchConfigGroups(configId) {
  return (dispatch, getState) => {
    let currentConfigId = getState().origoAdmin.ui.configEditor.currentConfigId;
    return apiFetchConfigGroups(configId).then(result => {
      dispatch(fetchGroupsComplete(result.serverResponse, currentConfigId));
      dispatch(createTreeStructure()); //this needs to be run both after fetchGroups and Layers bcuz tree structure is dependant on both
    });
  }
}

export function fetchGroupsComplete(result) {
  return { type: FETCH_GROUPS_COMPLETE, result: result }
}

export function fetchConfigControls(configId) {
  return dispatch => {
    return apiFetchConfigControls(configId).then(result => dispatch(fetchConfigControlsComplete1(result.serverResponse)));
  }
}

export function fetchConfigControlsComplete1(result) {
  return dispatch => {
    // this action creates a full control object out of all available controls, and update those that are among current config controls with isActive = true and its info and id. 
    dispatch(fetchConfigControlsComplete(result));
    dispatch(createControlObjects());
  }
}

export function fetchConfigControlsComplete(result) {
  return { type: FETCH_CONFIG_CONTROLS_COMPLETE, result: result }
}

export function fetchLayersForASource(sourceId) {
  return (dispatch, getState) => {
    dispatch(sourceEditorIsSourceLoding(true));
    // const sourceUrl = getSourceUrl(getState(), sourceId);
    const source = getSource(getState(), sourceId);
    apiFetchLayersForASource(source).then(result => {
      dispatch(getLayersFromSourceComplete(sourceId, result.serverResponse));
      dispatch(sourceEditorIsSourceLoding(false));
    });
  }
}

export function getLayersFromSourceComplete(sourceId, layers) {
  return { type: FETCH_SOURCE_LAYERS_COMPLETE, sourceId: sourceId, layers: layers }
}

export function fetchConfigStyles() {
  return (dispatch, getState) => {
    const style_id = getState().origoAdmin.write.layerEditor.style_id;
    const currentConfigId = getCurrentConfigId(getState());
    apiFetchConfigStyles(currentConfigId).then(result => {
      dispatch(fetchConfigStylesComplete(result.serverResponse));

      if (style_id && style_id > 0) {
        apiFetchStyle(style_id).then(result => {
          dispatch(layerEditorSetStyleToEdit(result.serverResponse));
        });
      } else {
        dispatch(layerEditorSetStyleToEdit(null));
      }

    });
  }
}

function fetchConfigStylesComplete(styles) {
  return { type: FETCH_CONFIG_STYLES_COMPLETE, styles: styles }
}

function getCurrentConfigId(state) {
  return state.origoAdmin.ui.configEditor.currentConfigId;
}