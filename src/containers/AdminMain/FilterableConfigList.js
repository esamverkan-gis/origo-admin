import { connect } from 'react-redux'
import { ConfigurationList } from './components/ConfigurationList'
import { filterConfigs } from '../../redux/ui/uiActions'
import { configEditorStartEdit, removeConfig } from '../../redux/write/writeActions'
import { exportConfigAsJson } from '../../redux/read/readActions'

const getVisibleConfigs = (configs, filter) => {
  if (!filter || filter.length == 0) {
    return configs;
  }
  return configs.filter(function (config) {
    return config.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
  })
}

const mapStateToProps = state => {
  return {
    configs: getVisibleConfigs(state.origoAdmin.read.configs, state.origoAdmin.ui.configList.filter)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onConfigClick: id => {
      dispatch(configEditorStartEdit(id));
    },
    onNewConfigClick: () => {
      dispatch(configEditorStartEdit());
    },
    onConfigRemoveClick: id => {
      if (confirm('Är du säker?')) {
        dispatch(removeConfig(id));
      }
    },
    onFilterChange: value => {
      dispatch(filterConfigs(value));
    },
    onExportConfigAsJsonClicked: (id) => {
      dispatch(exportConfigAsJson(id));
    },
  }
}

export const FilterableConfigList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigurationList)

export default FilterableConfigList;