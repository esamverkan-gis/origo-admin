import { connect } from 'react-redux'
import { EditGroup } from './EditGroup'

import {
  groupEditorUpdateValue,
  groupEditorSave,
  groupEditorSetSelectedParentGroup,
  groupEditorSetObjectToEdit,
  removeGroup
} from '../../redux/write/writeActions'

import {
  setGroupEditorVisible,
  setGroupEditorHidden
} from '../../redux/ui/uiActions'

const mapStateToProps = state => {
  return {
    groupEditor: state.origoAdmin.ui.groupEditor,
    group: state.origoAdmin.write.groupEditor,
    currentConfigGroups: state.origoAdmin.read.groups
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGroupFormChanged: (attributeName, value) => {
      dispatch(groupEditorUpdateValue(attributeName, value));
    },
    onGroupFormSubmit: (event) => {
      event.preventDefault();
      dispatch(groupEditorSave());
      dispatch(setGroupEditorHidden());
    },
    onGroupFormCancel: (event) => {
      event.preventDefault();
      dispatch(groupEditorSetObjectToEdit(null));
      dispatch(setGroupEditorHidden());
    },
    onParentGroupChanged: (event) => {
      dispatch(groupEditorSetSelectedParentGroup(event.target.value));
    },
    onDeleteGroupButtonClicked: (id) => {
      dispatch(removeGroup(id));
      dispatch(groupEditorSetObjectToEdit(null));
      dispatch(setGroupEditorHidden());
    }
  }
}

export const EditGroupEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditGroup)
