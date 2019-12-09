import { connect } from 'react-redux';
import { EditConfig } from './EditConfig';

import {
  configEditorUpdateValue,
  configEditorSave,
  saveCurrentConfig,
  layerEditorStartEdit,
  removeLayer,
  removeGroup,
  groupEditorSetObjectToEdit,
  groupEditorSetObjectToEditById,
  updateGroupAndLayerTreeInformation,
} from '../../redux/write/writeActions';

import {
  importJsonToDB,
  updateTreeData,
  updateTreeStructure,
  saveVisibilityStatus,
  createTreeStructure
} from '../../redux/read/readActions';

import {
  setGroupEditorVisible
} from '../../redux/ui/uiActions'

import { getGroupLayerTree, getGroup, getGroupLayerTree2 } from '../../redux/read/readSelectors';

const mapStateToProps = state => {
  return {
    config: state.origoAdmin.write.configEditor,
    layers: state.origoAdmin.read.layers,
    // groupLayerTree: state,
    // groupLayerTree: getGroupLayerTree2(state),
    groupLayerTree: state.origoAdmin.read.treeData,
    mapSettingAccordionCollapsed: state.origoAdmin.ui.adminMain.mapSettingAccordionCollapsed,
    isConfigEditorVisible: state.origoAdmin.ui.configEditor.visible,
    projections: state.origoAdmin.read.proj4defs,
    globalSpinnerVisible: state.origoAdmin.ui.adminMain.globalSpinnerVisible
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onConfigFormChanged: (attributeName, value) => {
      dispatch(configEditorUpdateValue(attributeName, value));
    },
    onConfigFormSubmit: (event) => {
      event.preventDefault();
      dispatch(configEditorSave());
    },
    onLayerEditorStartEdit: (id) => {
      dispatch(layerEditorStartEdit(id));
    },
    onImportFormSubmit: (event) => {
      event.preventDefault();
      dispatch(importJsonToDB(event.target));
    },
    onTreeStructureLoad: () => {
      console.log('i treeload');
      dispatch(createTreeStructure());
    },
    toogleAccordianCollapse: (event) => {
      dispatch(toogleUiValue('ui.adminMain.mapSettingAccordionCollapsed'));
    },
    onDeleteButtonClicked: (event, node) => {
      event.stopPropagation(); //to prevent parent element catch the click event and show the layer edidor (or groupEditor if a group is clicked)
      if (node.layerId) {
        dispatch(removeLayer(node.layerId));
        event.stopPropagation(); //to prevent parent element catch the click event and show the layer edidor
      }
      if (node.groupId) {
        if (node.children.length > 0) {
          alert('Grupp innehåller ett eller flera lager, kan inte tas bort! ');
          return;
        }
        dispatch(removeGroup(node.groupId));
      }
    },
    onGroupEditorStartEdit: (event, id) => {
      event.preventDefault();
      if (id) {
        dispatch(groupEditorSetObjectToEditById(id));
      }
      dispatch(setGroupEditorVisible());
    },
    onGroupLayerTreeChanged: (tree) => {
      dispatch(updateGroupAndLayerTreeInformation(tree))
    },
    setTreeData: (treeData) => {
      dispatch(updateTreeData(treeData));
    },
    updateTreeStructure: (node, nextParentNode, nextSiblings) => {
      dispatch(updateTreeStructure(node, nextParentNode, nextSiblings));
    },
    saveVisibilityStatus: (node, expanded) => {
      dispatch(saveVisibilityStatus(node, expanded));
    }
  }
}

export const EditConfigEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditConfig)
