// import * as redux from 'redux';
import React from 'react';
import styled from 'styled-components';
import { FilterableConfigList } from './FilterableConfigList';
import { EditConfigEditor } from '../EditConfig/EditConfigEditor';
import { Spinner } from '../../components/Spinner/Spinner';
import { connect } from 'react-redux';

import {
  fetchConfigs,
  fetchAvailableControls,
  fetchSources,
  fetchProj4defs
} from '../../redux/read/readActions'

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 310px auto;
  grid-template-rows: 50px auto;
  height: calc(100vh - 10px);
  width: calc(100vw);
  grid-template-areas:
  "header header" 
  "sidebar content";
  padding:10px;
`;

const Header = styled.div`
  {
    grid-area: header;
    border-bottom: 11px solid #dddddd;
    margin-left: -10px;
    padding-left:5px;
    max-width: 600px;
    border-radius: 0 0 50px 0;
  }
  span {
    font-family: 'Oswald', sans-serif;
    font-size:45px;
    position:relative;
    left:0px;
    bottom:0px;
  }
`;

const SidePanel = styled.div`
  grid-area: sidebar;
  padding-right: 7px;
  border-right: 1px solid #cdcdcd
`;

const Content = styled.div`
  grid-area: content;
  width:100%;
`;

class AdminMain extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchConfigs();
    this.props.fetchSources();
    this.props.fetchProj4defs();
    this.props.fetchAvailableControls();
  }

  render() {
    return (
      <Spinner visibilityProp={false}>
        <GridWrapper>
          <Header><img src="https://avatars2.githubusercontent.com/u/16898915?v=4&s=200" width="50px" /><span>rigoMap Admin</span></Header>
          <SidePanel><FilterableConfigList /></SidePanel>
          <Content><EditConfigEditor /></Content>
        </GridWrapper>
      </Spinner>
    );
  }
};

const mapStateToProps = state => {
  return {
    test: state
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchConfigs: () => dispatch(fetchConfigs()),
    fetchSources: () => dispatch(fetchSources()),
    fetchProj4defs: () => dispatch(fetchProj4defs()),
    fetchAvailableControls: () => dispatch(fetchAvailableControls())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminMain);
