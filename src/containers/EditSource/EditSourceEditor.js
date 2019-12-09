import { connect } from 'react-redux';
import { EditSource } from './EditSource';

import {
  sourceEditorUpdateValue,
  sourceEditorSave,
  sourceEditorSetObjectToEdit
} from '../../redux/write/writeActions'

import {
  setSourceEditorHidden
} from '../../redux/ui/uiActions'

const getLayersFromSource = (sources, sourceId) => {
  var res = [];
  if (!sources || !sourceId) {

  }
  else {
    sources.forEach(function (source) {
      if (source.id == sourceId) {
        res = source.layers;
      }
    })
  }
  return res;
}

const mapStateToProps = state => {
  return {
    source: state.origoAdmin.write.sourceEditor,
    sourceEditor: state.origoAdmin.ui.sourceEditor
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSourceFormChanged: (attributeName, value) => {
      dispatch(sourceEditorUpdateValue(attributeName, value));
    },
    onSourceFormSubmit: (event) => {
      event.preventDefault();
      dispatch(sourceEditorSave());
      dispatch(setSourceEditorHidden());
    },
    onSourceFormCancel: (event) => {
      event.preventDefault();
      dispatch(sourceEditorSetObjectToEdit(null));
      dispatch(setSourceEditorHidden());
    }
  }
}

export const EditSourceEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSource)
