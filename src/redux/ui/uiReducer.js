
import {
  FILTER_CONFIGS,
  SET_SOURCE_EDITOR_VISIBLE,
  SET_SOURCE_EDITOR_HIDDEN,
  SET_CURRENT_CONFIG_ID,
  SET_ATTRIBUTE_EDITOR_HIDDEN,
  SET_ATTRIBUTE_EDITOR_VISIBLE,
  LAYER_EDITOR_SET_SELECTED_UI_ATTRIBUTE,
  SET_ATTRIBUTE_OBJECT_TO_EDIT,
  ATTRIBUTE_EDITOR_UPDATE_VALUE,
  RESET_ATTRIBUTE_EDITOR,
  SET_GROUP_EDITOR_HIDDEN,
  SET_GROUP_EDITOR_VISIBLE,
  SET_STYLE_EDITOR_HIDDEN,
  SET_STYLE_EDITOR_VISIBLE,
  UPDATE_UI_STYLE_EDITOR_TEXT,
  UPDATE_UI_STYLE_EDITOR_NAME,
  SOURCE_EDITOR_IS_SOURCE_LOADING,
  SET_CONFIG_EDITOR_VISIBLE,
  SET_LAYER_EDITOR_VISIBLE,
  IMPORT_JSON_TO_DB_LOADING,
  TOOGLE_UI_VALUE,
  SET_CONTROL_EDITOR_VISIBLE,
  SET_ATTRIBUTE_EDITOR_TYPE
} from './uiActions'

import { Attribute } from '../../models/Attribute'

function uiReducer(state, action) {
  if (typeof state === 'undefined') {
    //default state
    return {
      adminMain: { globalSpinnerVisible: false, mapSettingAccordionCollapsed: false },
      configList: { filter: '' },
      layerEditor: {},
      configEditor: {},
      sourceEditor: {},
      attributeEditor: {},
      groupEditor: {},
      styleEditor: {},
      controlEditor: {}
    };
  }
  switch (action.type) {
    case FILTER_CONFIGS:
      state = Object.assign({}, state, { configList: { filter: action.filterString } });
      return state;

    case SET_LAYER_EDITOR_VISIBLE:
      return Object.assign({}, state, { layerEditor: Object.assign({}, state.layerEditor, { visible: action.status }) });

    case SET_SOURCE_EDITOR_VISIBLE:
      return Object.assign({}, state, { sourceEditor: Object.assign({}, state.sourceEditor, { visible: true }) });

    case SET_SOURCE_EDITOR_HIDDEN:
      return Object.assign({}, state, { sourceEditor: Object.assign({}, state.sourceEditor, { visible: false }) });

    case SOURCE_EDITOR_IS_SOURCE_LOADING:
      return Object.assign({}, state, { sourceEditor: Object.assign({}, state.sourceEditor, { isLoading: action.status }) });

    case SET_ATTRIBUTE_EDITOR_VISIBLE:
      const obj = { visible: action.status };
      obj.type = 'specific'; // when closing or opening the attributeEditor reset type to default
      obj.manuel = false; // when closing or opening the attributeEditor reset manuel to default
      return Object.assign({}, state, { attributeEditor: Object.assign({}, state.attributeEditor, obj) });

    case SET_ATTRIBUTE_EDITOR_HIDDEN:
      // return Object.assign({}, state, { attributeEditor: { visible: false } });
      return Object.assign({}, state, { attributeEditor: Object.assign({}, state.attributeEditor, { visible: false }) });

    case SET_GROUP_EDITOR_VISIBLE:
      return Object.assign({}, state, { groupEditor: Object.assign({}, state.groupEditor, { visible: true }) });

    case SET_GROUP_EDITOR_HIDDEN:
      return Object.assign({}, state, { groupEditor: { visible: false } });

    case SET_STYLE_EDITOR_VISIBLE:
      return Object.assign({}, state, { styleEditor: Object.assign({}, state.styleEditor, { visible: true }) });

    case SET_STYLE_EDITOR_HIDDEN:
      return Object.assign({}, state, { styleEditor: Object.assign({}, state.styleEditor, { visible: false }) });

    case SET_CURRENT_CONFIG_ID:
      // return Object.assign({}, state, { configEditor: { currentConfigId: action.id } });
      return Object.assign({}, state, { configEditor: Object.assign({}, state.configEditor, { currentConfigId: action.id }) });


    case LAYER_EDITOR_SET_SELECTED_UI_ATTRIBUTE:
      let attributes = action.attributes;
      return Object.assign({}, state, { attributeEditor: Object.assign({}, state.attributeEditor, { attributes: attributes }) });

    case SET_ATTRIBUTE_OBJECT_TO_EDIT:
      let attribute = action.attribute ? action.attribute : new Attribute();
      return Object.assign({}, state, {
        attributeEditor: Object.assign({}, state.attributeEditor,
          {
            name: attribute.name,
            title: attribute.title,
            url: attribute.url,
            url_title: attribute.url_title,
            html: attribute.html
          })
      });

    case ATTRIBUTE_EDITOR_UPDATE_VALUE:
      let tmp = {};
      tmp[action.attributeName] = action.value
      return Object.assign({}, state, { attributeEditor: Object.assign({}, state.attributeEditor, tmp) });

    case RESET_ATTRIBUTE_EDITOR:
      return Object.assign({}, state, { attributeEditor: { attributes: null } });

    case UPDATE_UI_STYLE_EDITOR_TEXT:
      let style = action.style ? action.style : "";
      return Object.assign({}, state, { styleEditor: Object.assign({}, state.styleEditor, { text: style }) });

    case UPDATE_UI_STYLE_EDITOR_NAME:
      let name = action.name ? action.name : "";
      return Object.assign({}, state, { styleEditor: Object.assign({}, state.styleEditor, { name: name }) });

    case SET_CONFIG_EDITOR_VISIBLE:
      return Object.assign({}, state, { configEditor: Object.assign({}, state.configEditor, { visible: action.status }) });

    case IMPORT_JSON_TO_DB_LOADING:
      state = Object.assign({}, state, { adminMain: { globalSpinnerVisible: action.status } });
      return state;

    case TOOGLE_UI_VALUE:
      oldValue = ui.adminMain.mapSettingAccordionCollapsed;
      state = Object.assign({}, state, { adminMain: { mapSettingAccordionCollapsed: !oldValue } });

    case SET_CONTROL_EDITOR_VISIBLE:
      return Object.assign({}, state, { controlEditor: Object.assign({}, state.controlEditor, { visible: action.status }) });

    case SET_ATTRIBUTE_EDITOR_TYPE:
      return Object.assign({}, state, { attributeEditor: Object.assign({}, state.attributeEditor, { type: action.attributeEditorType }) });

    default:
      return state
  }
}

export default uiReducer;