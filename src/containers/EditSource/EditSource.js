import React from 'react';
import styled from 'styled-components';
import { Modal } from '../../components/Modal';

const Button = styled.button`
  width:30%;
`;

export class EditSource extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    // const name = target.name;
    this.props.onSourceFormChanged(target.name, target.value);
  }

  render() {
    return (
      <div>
        {this.props.sourceEditor.visible ?
          <Modal visibilityProp={this.props.sourceEditor.visible}>
            <div>
              <h3> {this.props.source.id > 0 ? 'Redigera source' : 'Lägg till source'} </h3>
              <form className='pure-form' onSubmit={this.props.onSourceFormSubmit}>
                <fieldset>
                  <legend>Namn</legend>
                  <input type="text" name="name" value={this.props.source.name} onChange={this.handleInputChange} required />
                  <legend>URL</legend>
                  <input type="url" name="url" value={this.props.source.url} onChange={this.handleInputChange} required />
                  <legend>Version</legend>
                  <input type="text" name="version" value={this.props.source.version} onChange={this.handleInputChange} required />
                  <legend>Tjänst</legend>
                  <select name="service" value={this.props.source.service} onChange={this.handleInputChange} required>
                    <option value="">Välj en Webb tjänst</option>
                    <option value="WMS">WMS</option>
                    <option value="WFS">WFS</option>
                  </select>
                  <br /><br />
                  <Button className="pure-button pure-button-active color-scheme-c1" onClick={this.props.onSourceFormCancel}>Ångra</Button>
                  <Button className="pure-button pure-button-active color-scheme-c2">Spara</Button>
                </fieldset>
              </form>
            </div>
          </Modal> : null}
      </div>
    );
  }
}