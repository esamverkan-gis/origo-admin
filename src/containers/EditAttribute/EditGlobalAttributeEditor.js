
import { connect } from 'react-redux'
import { GlobalAttributeComponent } from './EditGlobalAttribute'

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGlobalAttributeEditorStartEdit: (event) => {
      event.preventDefault();
      dispatch(setGlobalattributeEditorVisible());
    }
  }
}

export const EditGlobalAttributeEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalAttributeComponent)
