import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Accordion } from '../../components/Accordion/Accordion';
import { ConfigMainForm } from './components/ConfigMainForm';
import { EditLayerEditor } from '../EditLayer';
import { EditGroupEditor } from '../EditGroup';
import { EditControlEditor } from '../EditControl';
import SortableTreeWrapper from './SortableTreeWrapper';
import { Spinner } from '../../components/Spinner';

const GridWrapper = styled.div`
   /* display: grid;
    grid-gap: 10px;
    grid-template-columns: 250px auto;
    grid-template-rows: auto auto;
    height: 100%;
    width:100%;
    grid-template-areas:
    "mainForm mainForm"
    "treePanel content";
    clear:both;*/
`;

const Columns = styled.div`
  clear:both;
  display:flex;
`

const Column = styled.div`
  float:left;
  margin-right:20px;
  
`
const TreeColumn = styled(Column)`
  min-width:350px;
  border-right:1px solid #cdcdcd;
`;

const ContentColumn = styled.div`
  flex-grow:100;
`;

const MainForm = styled.div`
    grid-area: mainForm;
    float: left;
    width: 100%;
`;
const TreePanel = styled.div`
    grid-area: treePanel;
    border-right:1px solid #cdcdcd;
`;
const Content = styled.div`
    grid-area: content;
`;

const DeleteButton = styled.button`
  float: right;
  font-size: 45%;
  background-color:#c45c52;
  margin:0px;
`;

const FileUploadContainer = styled.div`
    border:1px dashed #cdcdcd;
    padding:10px;
    background-color:rgba(254, 255, 71, 0.15);
    width:650px;
    border-radius:8px;
  em {
    font-style:italic;
    font-size:14px;
  }
  input[type="button"]{
    width:80px!important;
  }
`;

const styles = {
  float: 'left',
  width: '30%'
};

export class EditConfig extends React.Component {

  // componentDidMount() {
  //   this.props.onTreeStructureLoad();
  // }

  shouldBeVisible = (status, prevClass = '') => {
    return status ? prevClass + "visible fadeIn" : prevClass + 'hidden';
  }

  render() {

    return (
      <GridWrapper className={this.shouldBeVisible(this.props.isConfigEditorVisible)} >
        <MainForm>
          <h2>{this.props.config.id ? 'Editera konfiguration ' + this.props.config.name : 'Skapa ny konfiguration'}</h2>
          <Accordion defaultOpen={false} header="Kartinställningar">
            <Spinner visibilityProp={this.props.globalSpinnerVisible}>
              <div>
                {(!this.props.config.id) ?
                  <FileUploadContainer>
                    <form className='pure-form' onSubmit={this.props.onImportFormSubmit} ref='uploadForm' id='uploadForm' method='post' encType="multipart/form-data">
                      <fieldset>
                        <legend>Importera från en existerande konfigurationsfil</legend>
                        <input type="file" className="pure-button pure-button-active color-scheme-c4 btn-medium" name="file1" id="fileUpload" />
                        <input type="submit" className="pure-button pure-button-active color-scheme-c2" value="Importera" disabled={false} />
                      </fieldset>
                    </form>
                    <div><em>Filen ska vara i JSON-format och ha tecken UTF-8 samt innehålla en OrigoMap-config</em></div>
                  </FileUploadContainer>
                  : ""
                }
                <ConfigMainForm projections={this.props.projections} config={this.props.config} onConfigFormSubmit={this.props.onConfigFormSubmit} onConfigFormChanged={this.props.onConfigFormChanged} />
              </div>
            </Spinner>
          </Accordion>
        </MainForm>
        <Accordion defaultOpen={true} header="Lager & gruppinställningar">
          <Columns>

            <TreeColumn>
              {/* <Spinner visibilityProp={false}> */}
              <h3>Lager tillhörande konfigurationen</h3>
              <button href="#" className="pure-button pure-button-active color-scheme-c4 btn-medium floatLeft" onClick={(event) => this.props.onLayerEditorStartEdit(null)}>Nytt lager</button>
              <button href="#" className="pure-button pure-button-active color-scheme-c4 btn-medium" onClick={(event) => this.props.onGroupEditorStartEdit(event, null)}>Ny grupp</button>

              <EditGroupEditor style={styles} />
              <div className="tree">
                {/* <TreeWrapper paddingLeft={20}
                  tree={this.props.groupLayerTree}
                  onDeleteButtonClicked={this.props.onDeleteButtonClicked}
                  onLayerEditorStartEdit={this.props.onLayerEditorStartEdit}
                  onGroupEditorStartEdit={this.props.onGroupEditorStartEdit}
                  onGroupLayerTreeChanged={this.props.onGroupLayerTreeChanged}
                /> */}
                <SortableTreeWrapper
                  data={this.props.groupLayerTree}
                  setTreeData={this.props.setTreeData}
                  onLayerEditorStartEdit={this.props.onLayerEditorStartEdit}
                  onGroupEditorStartEdit={this.props.onGroupEditorStartEdit}
                  updateTreeStructure={this.props.updateTreeStructure}
                  saveVisibilityStatus={this.props.saveVisibilityStatus}
                >
                </SortableTreeWrapper>
              </div>
              {/*</Spinner> */}
            </TreeColumn>

            <Column>
              <EditLayerEditor />
            </Column>
          </Columns>
        </Accordion>
        <Accordion defaultOpen={false} header="Kontrollinställningar">
          <EditControlEditor />
        </Accordion>
      </GridWrapper>
    )
  }
}

EditConfig.propTypes = {
  config: PropTypes.object,
  onConfigFormSubmit: PropTypes.func.isRequired
}
