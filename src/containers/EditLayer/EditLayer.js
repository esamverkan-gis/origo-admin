import React from 'react';
import styled from 'styled-components';
import { EditSourceEditor } from '../EditSource/EditSourceEditor';
import { EditStyleEditor } from '../EditStyle';
import { Spinner } from '../../components/Spinner';
import { Modal } from '../../components/Modal';

const SourceSelectBox = styled.select`
  width:300px;
`;
const GroupSelectBox = styled.select`
  width:200px;
`;
const SourceLayerSelectBox = styled.select`
  width:300px;
  height:400px!important;
`;
const AttributeSelectBox = styled.select`
  width:300px;
  height:150px!important;
`;
const GridWrapper = styled.div`
   min-width:400px;
   display: flex;
`;
const Column = styled.div`
  float:left;
  margin-right:20px;
`
const LayerFormColumn = styled(Column)`
  flex-grow:100;
`;
const EditButton = styled.button`
    width: 147px!important;
`;
const DeleteButton = styled.button`
   float: right;
   font-size: 50%;
   background-color:#c45c52;
   margin:0px;
`;
const ListItem = styled.li`
  list-style-type: none;
  border: 1px solid #cccccc;
  border-radius: 5px;
  padding: 2px 3px 2px 6px;
  margin-bottom: 2px;
  font-size: 75%;
  width: 80%;
`;
const ListItemHtml = styled(ListItem)`
  border-color: #ffb3b3;
`;
const Check = styled.input.attrs({
  type: 'checkbox'
})`
  position: relative;
  margin: 10px 10px 10px 2px;
`;
const FeatureSpecificWrapper = styled.div`
  margin: 10px;
`;
const LayerSpecificWrapper = styled.div`
  margin: 10px;
`;
const Radio = styled.input.attrs({
  type: 'radio'
})`
  width: 10px;
  margin:10px;
`;

const AttributeItem = ({ att, onAttributeRemoveClicked }) => {

  if (att.html) {
    return (
      <ListItemHtml>
        <span> {'HTML: ' + att.html} </span>
        <DeleteButton className="pure-button pure-button-active color-scheme-c1 no-margin" onClick={onAttributeRemoveClicked}>x</DeleteButton>
      </ListItemHtml>
    )
  } else
    return (
      <ListItem>
        <span>{'Namn: ' + att.name}</span> <br />
        <span>{'Titel: ' + att.title}</span>
        {att.url ? <span><br />{'URL: ' + att.url}</span> : ''}
        {att.url_title ? <span> <br />{'URL titel: ' + att.url_title} </span> : ''}
        <DeleteButton className="pure-button pure-button-active color-scheme-c1 no-margin" onClick={onAttributeRemoveClicked}>x</DeleteButton>
      </ListItem>
    )
}

export class EditLayer extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAttributeEditorInputChange = this.handleAttributeEditorInputChange.bind(this);
  }

  handleInputChange(event) {
    if (!event.target.type === 'checkbox')
      event.preventDefault();
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.props.onLayerFormChanged(name, value);
  }

  handleAttributeEditorInputChange(event) {
    if (!event.target.type === 'checkbox')
      event.preventDefault();
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.props.onAttibuteFormChanged(name, value);
  }

  shouldBeVisible = (status) => {
    return status ? 'visible fadeIn' : 'hidden';
  }

  renderSelectLayerFromSource(layerId) {
    if (layerId == -1) {
      return (
        <Column>
          <EditSourceEditor />
          <h3>Tillgängliga lager</h3>
          <form className='pure-form'>
            <fieldset>
              <legend>Serverkälla</legend>
              <SourceSelectBox className="clearBoth" value={this.props.currentSourceId ? this.props.currentSourceId : ""} onChange={this.props.onSourceChanged} required>
                <option key="valj-server-källa" value="">Välj en serverkälla</option>
                {this.props.sources.map(source => (
                  <option key={source.id} value={source.id}>{source.url}</option>
                ))}
              </SourceSelectBox>
              <br />
              <EditButton onClick={(event) => this.props.onSourceEditStart(event, this.props.currentSourceId)} className="pure-button pure-button-active color-scheme-c4 btn-medium" disabled={this.props.currentSourceId || this.props.currentSourceId === '' ? false : true}>Editera vald källa</EditButton>
              <EditButton onClick={(event) => this.props.onSourceEditStart(event, null)} className="pure-button pure-button-active color-scheme-c4 btn-medium">Skapa ny källa</EditButton>

              <legend>Lager tillhörande källan</legend>
              <Spinner visibilityProp={this.props.isSourceLoading}>
                <SourceLayerSelectBox size="20" onChange={(event) => this.props.onSourceLayerSelected('name', event.target.value)}>
                  {this.props.currentSourceLayers ?
                    this.props.currentSourceLayers.map(layer => (
                      <option key={layer.id} value={layer.name}>{layer.title}</option>
                    ))
                    : ""
                  }
                </SourceLayerSelectBox>
              </Spinner>
            </fieldset>
          </form>
        </Column>)
    }
    else {
      return "";
    }
  }

  renderFeatureSpecificWrapper() {
    return (
      <FeatureSpecificWrapper>
        <h3>Tillgängliga Attribut</h3>
        <AttributeSelectBox size="10" onChange={this.props.onAttributeSelected} >
          {this.props.currentLayerAttributes && this.props.currentLayerAttributes.length > 0 ?
            this.props.currentLayerAttributes.map(att => (
              <option key={att.id} value={att.name} >{att.name}</option>
            ))
            : <option key='inga-attribute' value="">{'Inga attribut identiferades för lagret'}</option>
          }
        </AttributeSelectBox>
        <form className='pure-form'>
          <fieldset>
            <legend>Namn</legend>
            <input type="text" name="name"
              value={this.props.attributeEditor.name}
              onChange={this.handleAttributeEditorInputChange}
              readOnly={!this.props.attributeEditor.manuel} />
            <br />
            <Check name="manuel" checked={this.props.attributeEditor.manuel} onChange={this.handleAttributeEditorInputChange} />
            <label>Jag vill ange ett attribut manuellt</label>
            <legend>Title</legend>
            <input type="text" name="title" value={this.props.attributeEditor.title} onChange={this.handleAttributeEditorInputChange} />
            <legend>URL</legend>
            <input type="text" name="url" value={this.props.attributeEditor.url} onChange={this.handleAttributeEditorInputChange} />
            <legend>URL title</legend>
            <input type="text" name="url_title" value={this.props.attributeEditor.url_title} onChange={this.handleAttributeEditorInputChange} />
            <br />
          </fieldset>
        </form>
      </FeatureSpecificWrapper>
    );
  }

  renderLayerSpecificWrapper() {
    return (
      <LayerSpecificWrapper>
        <h3>HTML Attribut</h3>
        <textarea rows="10" cols="40" name="html" value={this.props.attributeEditor.html} onChange={this.handleAttributeEditorInputChange} />
      </LayerSpecificWrapper>
    );
  }

  onRemoveLayerrClicked = (event) => {
    event.preventDefault();
    this.props.onRemoveLayerrClicked(this.props.currentLayer.id);
  }

  render() {

    let AttributeComponent = null;
    if (this.props.isAttributesBoxVisible) {
      AttributeComponent = <Modal visibilityProp={true}> <div>
        <form onChange={this.props.attributeEditorTypeChanged}>
          <Radio id="specific" value="specific" style={{ width: '12px', height: '12px' }} checked={this.props.attributeEditor.type === 'specific'} /><label htmlFor="specific">Lägg till ett attribut som gäller för features i lagret</label><br />
          <Radio id="global" value="global" style={{ width: '12px', height: '12px' }} checked={this.props.attributeEditor.type === 'global'} /><label htmlFor="global">Lägg till ett attribut som gäller för hela lagret</label>
        </form>
        {this.props.attributeEditor.type == 'specific' && this.renderFeatureSpecificWrapper()}
        {this.props.attributeEditor.type == 'global' && this.renderLayerSpecificWrapper()}

        <button className="pure-button pure-button-active color-scheme-c1" style={{ marginLeft: '10px', width: '25%' }} onClick={this.props.onAttributeCloseButtonClicked}>Ångra</button>
        <button className="pure-button pure-button-active color-scheme-c2" style={{ marginLeft: '5px', width: '25%' }} onClick={this.props.onAttributeAdded}>Spara</button>
      </div>
      </Modal>
    }
    return (
      <GridWrapper className={this.shouldBeVisible(this.props.isLayerEditorVisible)}>
        {this.renderSelectLayerFromSource(this.props.currentLayer.id)}
        <LayerFormColumn>
          <h3>{this.props.currentLayer && this.props.currentLayer.id > 0 ? 'Editera lager' : 'Skapa nytt lager'}</h3>
          <form className='pure-form' onSubmit={this.props.onLayerFormSubmit}>
            <fieldset>
              <legend>Id (används för att begära lagret från server)</legend>
              <input type="text" name="name" value={this.props.currentLayer.name} onChange={this.handleInputChange} readOnly="readonly" />
              <legend>Titel</legend>
              <input type="text" name="title" value={this.props.currentLayer.title} onChange={this.handleInputChange} required />
              {this.props.currentLayer && this.props.currentLayer.id > 0 ? null : 
              <>
              <legend>Grupp</legend>
              <GroupSelectBox value={this.props.currentGroupId ? this.props.currentGroupId : ""} style={{ width: '300px' }} onChange={this.props.onGroupChanged} required>
                <option key="valj-grupp" value="">Välj en grupp</option>
                {this.props.currentConfigGroups.map(group => (<option key={group.id} value={group.id}> {group.title} </option>))}
              </GroupSelectBox>
              </>}
              <legend>Lagertyp</legend>
              <select name="type" value={this.props.currentLayer.type} onChange={this.handleInputChange} style={{ width: '300px' }} required>
                <option value="">Välj en lagertyp</option>
                <option value="WMS">WMS</option>
                <option value="WFS">WFS</option>
              </select>
              <br />
              <div className={this.props.currentLayer.type === "WFS" ? "hidden fadeOut" : "visible fadeIn"}>
                <legend>Format</legend>
                <select name="format" value={this.props.currentLayer.format} onChange={this.handleInputChange} style={{ width: '300px' }} >
                  <option value="">Välj en format</option>
                  <option value="image/jpeg">jpg</option>
                  <option value="image/png">png</option>
                </select>
              </div>
              <div className={this.props.currentLayer.type === "WFS" ? "hidden fadeOut" : "visible fadeIn"}>
                <legend>Copyright</legend>
                <input type="text" name="attribution" value={this.props.currentLayer.attribution || ""} onChange={this.handleInputChange} />
              </div>
              <Check id="synligt" name="visible" checked={this.props.currentLayer.visible} onChange={this.handleInputChange} />
              <label htmlFor="synligt">Lagret ska vara synligt</label>

              <br />

              <Check id="queryable" name="queryable" checked={this.props.currentLayer.queryable} onChange={this.handleInputChange} />
              <label htmlFor="queryable">Lagret ska vara queryable</label>

              <legend>Attribut</legend>
              {this.props.currentAttributes && Array.isArray(this.props.currentAttributes) ?
                this.props.currentAttributes.map(att => (
                  <AttributeItem key={att.name} att={att} onAttributeRemoveClicked={(event) => this.props.onAttributeRemoveClicked(event, att)} />
                ))
                : ""
              }
              <button onClick={this.props.onAddAttributeClicked} style={{ width: '300px' }} className="pure-button pure-button-active color-scheme-c4"> Lägg till Attribut </button>
              {AttributeComponent}

              <EditStyleEditor />
              <input type="submit" className="pure-button pure-button-active color-scheme-c2" value="Spara Lager" style={{ display: 'block' }} />
              <button onClick={this.onRemoveLayerrClicked} style={{ width: '300px' }} className="pure-button pure-button-active color-scheme-c1"> Ta Bort Lager </button>
            </fieldset>
          </form>
        </LayerFormColumn>
      </GridWrapper>
    );
  }
}