import { connect } from 'react-redux'
import { EditLayer } from './EditLayer';

import {
  fetchLayersForASource
} from '../../redux/read/readActions'

import {
  sourceEditorStartEdit,
  layerEditorUpdateValue,
  layerEditorSave,
  layerEditorAddSelectedAttribute,
  removeAttribute,
  layerEditorSetSelectedSource,
  layerEditorSetSelectedGroup,
  removeLayer
} from '../../redux/write/writeActions'

import {
  setSourceEditorVisible,
  setAttributeEditorVisible,
  layerEditorUpdateUiAttributes,
  setAttributeObjectToEdit,
  attributeEditorUpdateValue,
  setAttributeEditorType
} from '../../redux/ui/uiActions'

const getLayersFromSource = (sources, sourceId) => {
  var res = [];
  if (!sources || !sourceId) {

  } else {
    sources.forEach(function (source) {
      if (source.id == sourceId && Array.isArray(source.layers)) {
        res = source.layers;
      }
    })
  }
  return res;
}

const mapStateToProps = state => {
  return {
    sources: (state.origoAdmin.read.sources ? state.origoAdmin.read.sources : []),
    currentSourceId: state.origoAdmin.write.layerEditor.source_id || null,
    currentSourceLayers: getLayersFromSource(state.origoAdmin.read.sources, state.origoAdmin.write.layerEditor.source_id),
    currentLayer: state.origoAdmin.write.layerEditor,
    currentLayerAttributes: (state.origoAdmin.ui.attributeEditor.attributes ? state.origoAdmin.ui.attributeEditor.attributes : []),
    isAttributesBoxVisible: state.origoAdmin.ui.attributeEditor.visible,
    attributeEditor: state.origoAdmin.ui.attributeEditor,
    currentAttributes: (state.origoAdmin.write.layerEditor.attributes ? state.origoAdmin.write.layerEditor.attributes : []),
    currentConfigGroups: (state.origoAdmin.read.groups ? state.origoAdmin.read.groups : []),
    currentGroupId: state.origoAdmin.write.layerEditor.group_id,
    isSourceLoading: state.origoAdmin.ui.sourceEditor.isLoading,
    isLayerEditorVisible: state.origoAdmin.ui.layerEditor.visible
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLayerFormChanged: (attributeName, value) => {
      dispatch(layerEditorUpdateValue(attributeName, value));
      if (attributeName === "type" && value === "WFS") {
        dispatch(layerEditorUpdateValue("format", ""));
        dispatch(layerEditorUpdateValue("attribution", ""));
      }
    },
    onSourceChanged: (event) => {
      dispatch(layerEditorSetSelectedSource(event.target.value));
      dispatch(fetchLayersForASource(event.target.value));
    },
    onGroupChanged: (event) => {
      dispatch(layerEditorSetSelectedGroup(event.target.value));
    },
    onSourceEditStart: (event, sourceId) => {
      event.preventDefault();
      dispatch(sourceEditorStartEdit(sourceId));
      dispatch(setSourceEditorVisible());
    },
    onSourceLayerSelected: (attributeName, value) => {
      dispatch(layerEditorUpdateValue(attributeName, value));
      dispatch(layerEditorUpdateUiAttributes(value)); // here value = layerName which is unique for every source. 
      // for layers that are fetched from Geoserver there is no id available. id is availble on our layers that are read from db. 
    },
    onLayerFormSubmit: (event) => {
      event.preventDefault();
      dispatch(layerEditorSave());
    },
    onAddAttributeClicked: (event) => {
      event.preventDefault();
      dispatch(setAttributeEditorVisible(true));
    },
    onAttributeAdded: (event) => {
      event.preventDefault();
      dispatch(layerEditorAddSelectedAttribute());
    },
    onAttributeCloseButtonClicked: (event) => {
      event.preventDefault();
      dispatch(setAttributeEditorVisible(false));
      dispatch(setAttributeObjectToEdit(null));
    },
    onAttributeSelected: (event) => {
      dispatch(setAttributeObjectToEdit({ name: event.target.value }));
    },
    onAttibuteFormChanged: (attributeName, value) => {
      dispatch(attributeEditorUpdateValue(attributeName, value));
    },
    onAttributeRemoveClicked: (event, att) => {
      event.preventDefault();
      if (confirm('Är du säker?')) {
        dispatch(removeAttribute(att));
      }
    },
    attributeEditorTypeChanged: (event) => {
      dispatch(setAttributeEditorType(event.target.value));
    },
    onRemoveLayerrClicked: (id) => {
      console.log(id);
      dispatch(removeLayer(id));
    }
  }
}

export const EditLayerEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditLayer)