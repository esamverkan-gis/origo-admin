import { connect } from 'react-redux'
import { EditControl } from './EditControl'

import {
  controlEditorToggleControl,
  controlEditorStartEdit,
  controlEditorUpdateValue,
  controlEditorSaveCurrentControl
} from '../../redux/write/writeActions'

import {
  setControlEditorVisible
} from '../../redux/ui/uiActions'

const mapStateToProps = state => {
  return {
    availableControls: state.origoAdmin.read.availableControls || [],
    currentConfigControls: state.origoAdmin.read.currentConfigControls || [],
    controlEditor: state.origoAdmin.write.controlEditor,
    controls: state.origoAdmin.write.controlEditor.controls || [],
    isControlEditorVisible: state.origoAdmin.ui.controlEditor.visible
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onToggleControl: (control) => {
      dispatch(controlEditorToggleControl(control));
    },
    onEditButtonClicked: (control) => {
      dispatch(controlEditorStartEdit(control));
    },
    onControlFormCancel: () => {
      dispatch(setControlEditorVisible(false));
    },
    onControlFormSubmit: (event) => {
      event.preventDefault();
      dispatch(controlEditorSaveCurrentControl());     
    },
    onControlFormChanged: (name, value) => {
      dispatch(controlEditorUpdateValue(name, value));
    }
  }
}

export const EditControlEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditControl)
