import React from 'react';
import styled from 'styled-components';
import { Modal } from '../../components/Modal';
import PropTypes from 'prop-types';

const Button = styled.button`
  width:30%;
`;

const Check = styled.input.attrs({
  type: 'checkbox'
})`
  position: relative;
  margin: 10px 10px 20px 2px;
`;

const ValidationMessage = styled.div`
  color: red;
  font-size: 10px;
  padding: 2px;
`;

export class EditGroup extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // const name = target.name;
    this.props.onGroupFormChanged(target.name, value);
  }

  handleCheckBoxChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.props.onGroupFormChanged(target.name, value);
  }

  isGroupNameValid() {
    if (this.props.group.name)
      return this.props.group.name.indexOf(' ') !== -1;
    else
      return true;
    //if (this.props.group.name) is undefined it means att we want to create a new group. so it is safe to return false as well.
    //if we return false html5 validation takes care of alerting for empty name input.
  }

  onGroupDeleteClicked = (event) => {
    event.preventDefault();
    this.props.onDeleteGroupButtonClicked(this.props.group.id);
  }

  render() {
    return (
      <div>
        {this.props.groupEditor.visible ?
          <Modal visibilityProp={this.props.groupEditor.visible}>
            <h3>{this.props.group.id ? 'Editera grupp ' + this.props.group.name : 'Skapa ny grupp'}</h3>
            <form className='pure-form' onSubmit={this.props.onGroupFormSubmit}>
              <fieldset>
                <legend>Namn</legend>
                <input type="text" name="name" value={this.props.group.name} onChange={this.handleInputChange} required readOnly={this.props.group.id ? true : false} />
                {this.isGroupNameValid() && <ValidationMessage> Namnet är ogiltigt! </ValidationMessage>}
                <legend>Titel</legend>
                <input type="text" name="title" value={this.props.group.title} onChange={this.handleInputChange} required />
                {/* <legend>Parent</legend>
              <ParentGroupSelectBox value={this.props.group.parent ? this.props.group.parent : ''} onChange={this.props.onParentGroupChanged} >
                <option value="">Ingen parent grupp</option>
                {this.props.currentConfigGroups && this.props.currentConfigGroups.map(group => (<option key={group.id} value={group.name}> {group.title} </option>))}
              </ParentGroupSelectBox> */}
                <br />
                <Check name="expanded" checked={this.props.group.expanded} onChange={this.handleCheckBoxChange} />
                <label>Ska vara utfällt från början</label>
                <br />
                <Button className="pure-button pure-button-active color-scheme-c5" onClick={this.props.onGroupFormCancel}>Ångra</Button>
                <Button className="pure-button pure-button-active color-scheme-c2" disabled={this.isGroupNameValid()}>Spara</Button>
                <Button className="pure-button pure-button-active color-scheme-c1" disabled={!this.props.group.id} onClick={this.onGroupDeleteClicked}>Ta bort</Button>
              </fieldset>
            </form>
          </Modal> : null}
      </div>
    );
  }
}

EditGroup.propTypes = {
  onGroupFormSubmit: PropTypes.func.isRequired,
  onGroupFormCancel: PropTypes.func.isRequired,
  onGroupFormChanged: PropTypes.func.isRequired
}