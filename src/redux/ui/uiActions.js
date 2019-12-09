
export const FILTER_CONFIGS = 'FILTER_CONFIGS';
export const SET_SOURCE_EDITOR_VISIBLE = "SET_SOURCE_EDITOR_VISIBLE";
export const SET_SOURCE_EDITOR_HIDDEN = "SET_SOURCE_EDITOR_HIDDEN";
export const SET_CURRENT_CONFIG_ID = "SET_CURRENT_CONFIG_ID";
export const SET_ATTRIBUTE_EDITOR_HIDDEN = "SET_ATTRIBUTE_EDITOR_HIDDEN";
export const SET_ATTRIBUTE_EDITOR_VISIBLE = "SET_ATTRIBUTE_EDITOR_VISIBLE";
export const LAYER_EDITOR_UPDATE_UI_ATTRIBUTES = "LAYER_EDITOR_UPDATE_UI_ATTRIBUTES";
export const LAYER_EDITOR_SET_SELECTED_UI_ATTRIBUTE = "LAYER_EDITOR_SET_SELECTED_UI_ATTRIBUTE";
export const SET_ATTRIBUTE_OBJECT_TO_EDIT = "SET_ATTRIBUTE_OBJECT_TO_EDIT";
export const ATTRIBUTE_EDITOR_UPDATE_VALUE = "ATTRIBUTE_EDITOR_UPDATE_VALUE";
export const RESET_ATTRIBUTE_EDITOR = "RESET_ATTRIBUTE_EDITOR";
export const SET_GROUP_EDITOR_HIDDEN = "SET_GROUP_EDITOR_HIDDEN";
export const SET_GROUP_EDITOR_VISIBLE = "SET_GROUP_EDITOR_VISIBLE";
export const SET_STYLE_EDITOR_HIDDEN = "SET_STYLE_EDITOR_HIDDEN";
export const SET_STYLE_EDITOR_VISIBLE = "SET_STYLE_EDITOR_VISIBLE";
export const UPDATE_UI_STYLE_EDITOR_TEXT = "UPDATE_UI_STYLE_EDITOR_TEXT";
export const UPDATE_UI_STYLE_EDITOR_NAME = "UPDATE_UI_STYLE_EDITOR_NAME";
export const SOURCE_EDITOR_IS_SOURCE_LOADING = "SOURCE_EDITOR_IS_SOURCE_LOADING";
export const SET_CONFIG_EDITOR_VISIBLE = "SET_CONFIG_EDITOR_VISIBLE";
export const SET_LAYER_EDITOR_VISIBLE = "SET_LAYER_EDITOR_VISIBLE";
export const IMPORT_JSON_TO_DB_LOADING = "IMPORT_JSON_TO_DB_LOADING";
export const TOOGLE_UI_VALUE = "TOOGLE_UI_VALUE";
export const SET_CONTROL_EDITOR_VISIBLE = "SET_CONTROL_EDITOR_VISIBLE";
export const SET_ATTRIBUTE_EDITOR_TYPE = "SET_ATTRIBUTE_EDITOR_TYPE";

import { getSource } from '../read/readSelectors';
import { apiFetchLayerAttributesFromServer } from '../../services/adminapi';

export function filterConfigs(filterString) {
  return { type: FILTER_CONFIGS, filterString: filterString }
}

export function setSourceEditorVisible() {
  return { type: SET_SOURCE_EDITOR_VISIBLE }
}

export function setSourceEditorHidden() {
  return { type: SET_SOURCE_EDITOR_HIDDEN }
}

export function setCurrentConfigId(id) {
  return { type: SET_CURRENT_CONFIG_ID, id: id }
}

export function setConfigEditorVisible(status) {
  return { type: SET_CONFIG_EDITOR_VISIBLE, status: status }
}

export function setLayerEditorVisible(status) {
  return { type: SET_LAYER_EDITOR_VISIBLE, status: status }
}

export function setAttributeEditorVisible(status) {
  return { type: SET_ATTRIBUTE_EDITOR_VISIBLE, status: status }
}

export function setAttributeEditorType(type) {
  return { type: SET_ATTRIBUTE_EDITOR_TYPE, attributeEditorType: type }
}

export function setControlEditorVisible(status) {
  return { type: SET_CONTROL_EDITOR_VISIBLE, status: status }
}

export function setGroupEditorVisible() {
  return { type: SET_GROUP_EDITOR_VISIBLE }
}

export function setGroupEditorHidden() {
  return { type: SET_GROUP_EDITOR_HIDDEN }
}

export function setStyleEditorVisible() {
  return { type: SET_STYLE_EDITOR_VISIBLE }
}

export function setStyleEditorHidden() {
  return { type: SET_STYLE_EDITOR_HIDDEN }
}

// export function layerEditorUpdateUiAttributes(layerName) {
//     return (dispatch, getState) => {
//         let sourceId = getState().origoAdmin.write.layerEditor.source_id;
//         if (!sourceId) return;
//         let source = getSource(getState(), sourceId);
//         let layers = source.layers;
//         if (!layers) return;
//         for (var prop in layers) {
//             if (layers.hasOwnProperty(prop)) {
//                 var layer = layers[prop];
//                 if (layer.name == layerName) {
//                     dispatch(layerEditorSetSelectedUiAttribute(layer.attributes));
//                     break;
//                 }
//             }
//         }
//     }
// }

export function layerEditorUpdateUiAttributes(layerName) {
  return (dispatch, getState) => {
    let sourceId = getState().origoAdmin.write.layerEditor.source_id;
    if (!sourceId) return;
    let source = getSource(getState(), sourceId);
    apiFetchLayerAttributesFromServer(layerName, source)
      .then(result => dispatch(layerEditorSetSelectedUiAttribute(result.serverResponse)))
      .catch(err => {
        dispatch(layerEditorSetSelectedUiAttribute([]));
        //  alert(err.message);
      });
  }
}

export function layerEditorSetSelectedUiAttribute(attributes) {
  // if (!attributes || attributes.length == 0) attributes = [{name: 'No attributes available', type: 'errorMessage'}];
  return { type: LAYER_EDITOR_SET_SELECTED_UI_ATTRIBUTE, attributes: attributes }
}

export function setAttributeObjectToEdit(attribute) {
  return { type: SET_ATTRIBUTE_OBJECT_TO_EDIT, attribute: attribute }
}

export function attributeEditorUpdateValue(attributeName, value) {
  return { type: ATTRIBUTE_EDITOR_UPDATE_VALUE, attributeName: attributeName, value: value }
}

export function resetAttributesEditor() {
  return { type: RESET_ATTRIBUTE_EDITOR }
}

// keeping the json like style object under the state.ui.styleEditor
export function updateUiStyleEditorText(jsonFormattedStyle) {
  return { type: UPDATE_UI_STYLE_EDITOR_TEXT, style: jsonFormattedStyle }
}

export function updateUiStyleEditorName(name) {
  return { type: UPDATE_UI_STYLE_EDITOR_NAME, name: name }
}

export function sourceEditorIsSourceLoding(status) {
  return { type: SOURCE_EDITOR_IS_SOURCE_LOADING, status: status }
}

export function importJsonToDbLoading(status) {
  return { type: IMPORT_JSON_TO_DB_LOADING, status: status }
}

export function toogleUiValue(uiPath) {
  return { type: TOOGLE_UI_VALUE, path }
}