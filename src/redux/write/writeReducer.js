
import {
  CONFIG_EDITOR_SET_OBJECT_TO_EDIT,
  CONFIG_EDITOR_UPDATE_VALUE,
  LAYER_EDITOR_SET_OBJECT_TO_EDIT,
  LAYER_EDITOR_UPDATE_VALUE,
  SOURCE_EDITOR_SET_OBJECT_TO_EDIT,
  SOURCE_EDITOR_UPDATE_VALUE,
  GROUP_EDITOR_UPDATE_VALUE,
  LAYER_EDITOR_ADD_SELECTED_ATTRIBUTE,
  LAYER_EDITOR_SET_ATTRIIBUTES_TO_EDIT,
  GROUP_EDITOR_SET_OBJECT_TO_EDIT,
  UPDATE_WRITE_STYLE_EDITOR,
  UPDATE_WRITE_STYLE_EDITOR_NAME,
  UPDATE_LAYER_STYLE_ID,
  LAYER_EDITOR_REMOVE_ATTRIBUTE,
  CREATE_CONTROL_OBJECTS_COMPLETE,
  CONTROL_EDITOR_TOGGLE_CONTROL,
  SET_CONTROL_OBJECT_TO_EDIT,
  LAYER_EDITOR_SET_SELECTED_SOURCE,
  CONTROL_EDITOR_UPDATE_VALUE,
  LAYER_EDITOR_SET_SELECTED_GROUP,
  GROUP_EDITOR_SET_SELECTED_PARENT_GROUP
} from './writeActions'

import { Config } from '../../models/Config'
import { Source } from '../../models/Source'
import { Layer } from '../../models/Layer'
import { Group } from '../../models/Group'
import { Style } from '../../models/Style'

function writeReducer(state, action) {
  if (typeof state === 'undefined') {
    //default state
    return {
      configEditor: {},
      layerEditor: {},
      sourceEditor: {},
      groupEditor: {},
      styleEditor: {},
      controlEditor: {}
    };
  }

  switch (action.type) {

    case CONFIG_EDITOR_SET_OBJECT_TO_EDIT:
      // let config = action.config ? action.config : new Config();
      let config = action.config ? new Config(action.config) : new Config();
      return Object.assign({}, state, { configEditor: config });

    case CONFIG_EDITOR_UPDATE_VALUE:
      let tmp1 = {};
      if (action.attributeName == "pinning")
        // tmp1[action.featureinfo_options.attributeName] = action.value;
        Object.assign(tmp1, { featureinfo_options: { pinning: action.value } });
      else
        tmp1[action.attributeName] = action.value;
      return Object.assign({}, state, { configEditor: Object.assign({}, state.configEditor, tmp1) });

    case LAYER_EDITOR_SET_OBJECT_TO_EDIT:
      let layer = action.layer ? action.layer : new Layer(action.configId);
      // if (!layer.config_id) layer.config_id = action.layer.config_id;
      return Object.assign({}, state, { layerEditor: layer });

    case LAYER_EDITOR_UPDATE_VALUE:
      let tmp2 = {};
      tmp2[action.attributeName] = action.value
      return Object.assign({}, state, { layerEditor: Object.assign({}, state.layerEditor, tmp2) });

    case SOURCE_EDITOR_SET_OBJECT_TO_EDIT:
      let source = action.source ? action.source : new Source();
      if (source.layers) delete source.layers;
      return Object.assign({}, state, { sourceEditor: source });

    case SOURCE_EDITOR_UPDATE_VALUE:
      let tmp3 = {};
      tmp3[action.attributeName] = action.value
      return Object.assign({}, state, { sourceEditor: Object.assign({}, state.sourceEditor, tmp3) });

    case GROUP_EDITOR_UPDATE_VALUE:
      let tmp4 = {};
      tmp4[action.attributeName] = action.value
      return Object.assign({}, state, { groupEditor: Object.assign({}, state.groupEditor, tmp4) });

    // this case adds ONE selectes attribute from attribute editor to the layer editor 
    case LAYER_EDITOR_ADD_SELECTED_ATTRIBUTE:
      let attribute = action.attribute;
      let attributes = state.layerEditor.attributes ? state.layerEditor.attributes : [];
      attributes.push(attribute);
      return Object.assign({}, state, { layerEditor: Object.assign({}, state.layerEditor, { attributes: attributes }) });

    case LAYER_EDITOR_REMOVE_ATTRIBUTE:
      let attribute3 = action.attribute;
      let attributes3 = state.layerEditor.attributes ? state.layerEditor.attributes : [];
      let index = attributes3.indexOf(attribute3);
      if (index > -1) {
        attributes3.splice(index, 1);
      }
      return Object.assign({}, state, { layerEditor: Object.assign({}, state.layerEditor, { attributes: attributes3 }) });

    // this case adds ALL attributes for a layer read from db to the layer editor 
    case LAYER_EDITOR_SET_ATTRIIBUTES_TO_EDIT:
      let attributes2 = action.attributes;
      return Object.assign({}, state, { layerEditor: Object.assign({}, state.layerEditor, { attributes: attributes2 }) });

    case GROUP_EDITOR_SET_OBJECT_TO_EDIT:
      let group = action.group ? action.group : new Group(action.configId);
      return Object.assign({}, state, { groupEditor: group });

    case UPDATE_WRITE_STYLE_EDITOR:
      let style = action.style ? action.style : new Style();
      return Object.assign({}, state, { styleEditor: style });

    case UPDATE_WRITE_STYLE_EDITOR_NAME:
      let name = action.name ? action.name : "";
      // return Object.assign({}, state, { styleEditor: style });
      return Object.assign({}, state, { styleEditor: Object.assign({}, state.styleEditor, { name: name }) });

    case UPDATE_LAYER_STYLE_ID:
      return Object.assign({}, state, { layerEditor: Object.assign({}, state.layerEditor, { style_id: action.id }) });

    case CREATE_CONTROL_OBJECTS_COMPLETE:
      state = Object.assign({}, state, { controlEditor: Object.assign({}, state.controlEditor, { controls: action.controls }) });
      return state;

    case CONTROL_EDITOR_TOGGLE_CONTROL:
      let availableControls2 = [...state.availableControls];
      availableControls2.forEach(availableControl => {
        if (availableControl.name === action.controlName) {
          availableControl.isActive = !availableControl.isActive;
        }
      });
      state = Object.assign({}, state, { availableControls: availableControls2 });
      return state;

    case SET_CONTROL_OBJECT_TO_EDIT:
      state = Object.assign({}, state, { controlEditor: Object.assign({}, state.controlEditor, { currentControl: action.control }) });
      return state;

    case CONTROL_EDITOR_UPDATE_VALUE:
      const newState = Object.assign({}, state, {
        controlEditor: Object.assign({}, state.controlEditor, {
          currentControl: Object.assign({}, state.controlEditor.currentControl, {
            options: state.controlEditor.currentControl.options.map(o => {
              if (o.name === action.name)
                return Object.assign({}, o, { value: action.value });
              else
                return Object.assign({}, o);
            })
          })
        })
      });
      // newState.controlEditor.currentControl.options[action.index].value = action.value;
      return newState;

    case LAYER_EDITOR_SET_SELECTED_SOURCE:
      return Object.assign({}, state, { layerEditor: Object.assign({}, state.layerEditor, { source_id: action.id }) });

    case LAYER_EDITOR_SET_SELECTED_GROUP:
      return Object.assign({}, state, { layerEditor: Object.assign({}, state.layerEditor, { group_id: action.id }) });

    case GROUP_EDITOR_SET_SELECTED_PARENT_GROUP:
      return Object.assign({}, state, { groupEditor: Object.assign({}, state.groupEditor, { parent: action.parent }) });






    
    default:
      return state
  }
}
export default writeReducer