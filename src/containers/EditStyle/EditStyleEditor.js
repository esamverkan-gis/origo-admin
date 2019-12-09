import { connect } from 'react-redux';
import { EditStyle } from './EditStyle';

import {
  setStyleEditorVisible,
  setStyleEditorHidden,
  updateUiStyleEditorName,
  updateUiStyleEditorText
} from '../../redux/ui/uiActions'

import { saveStyle, updateWriteStyleEditorName, importStil } from '../../redux/write/writeActions'

import { fetchConfigStyles } from '../../redux/read/readActions'

const mapStateToProps = state => {
  return {
    style: state.origoAdmin.write.styleEditor,
    styleEditor : state.origoAdmin.ui.styleEditor || '',
    isAnyLayerSelected : state.origoAdmin.write.layerEditor.id, //if a layer is selected there is an id available, or if a new layer is created id=-1 which is truthy
    styles: state.origoAdmin.read.currentConfigStyles || []
    // currentImportedStyleId: state.origoAdmin.write.currentImportedStyle.id || -1
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStyleEditorStartEdit: (event) => {
      event.preventDefault();
      dispatch(fetchConfigStyles());
      dispatch(setStyleEditorVisible());
    },
    onStyleFormSubmit: (event) => { 
      event.preventDefault();
      event.stopPropagation();
      dispatch(saveStyle());
    },
    onStyleTextChanged: (event) => {
      dispatch(updateUiStyleEditorText(event.target.value));
    },
    onStyleNameChanged: (event) => {
      // dispatch(updateUiStyleEditorName(event.target.value));
      dispatch(updateWriteStyleEditorName(event.target.value));
    },
    onStyleEditorCancel: () => {
      dispatch(setStyleEditorHidden());
    },
    onImportedStyleChanged: (event) => {
      dispatch(importStil(event.target.value));
    }
  }
}

export const EditStyleEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditStyle)
