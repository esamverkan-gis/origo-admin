import React from 'react';
import styled from 'styled-components';

const Url = styled.input.attrs({
  type: 'url'
})`
  width: 100%;
  height: 30px;
`;

const Check = styled.input.attrs({
  type: 'checkbox'
})`
  margin-right: 8px;
  margin-left: 8px;  
  vertical-align: middle;
`;

class Controlform extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  render() {
    if (!this.props.isControlEditorVisible)
      return null;
    return (
      <div>
        <h3> Redigera Kontroll </h3>
        <form className='pure-form' onSubmit={this.props.onControlFormSubmit}>
          <fieldset>
            <legend>Namn</legend>
            {/* <legend>Namn:{this.props.controlEditor.currentControl ? this.props.controlEditor.currentControl.name : ''}</legend>        */}
            {<input type="text" name="name" value={this.props.controlEditor.currentControl ? this.props.controlEditor.currentControl.name : ''} onChange={null} readOnly />}
            <h4>inställningar</h4>
            {this.renderControlOptions(this.props.controlEditor.currentControl)}
            <br />
            <input
              type="button"
              className="pure-button pure-button-active color-scheme-c1"
              value="Ångra"
              style={{ width: '100px' }}
              onClick={this.props.onControlFormCancel} />
            <input
              type="submit"
              className="pure-button pure-button-active color-scheme-c2"
              value="Spara"
              style={{ width: '100px' }}
              disabled={!this.props.controlEditor.currentControl.options || this.props.controlEditor.currentControl.options.length === 0} />
          </fieldset>
        </form>
      </div>
    );
  }

  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.props.onControlFormChanged(name, value);
  }

  handleListChange(event, item, checked, listItemsValue) {
    const name = event.target.name;
    if (!checked) {
      listItemsValue.push(item);
    } else if (checked) {
      let index = listItemsValue.indexOf(item);
      if (index > -1) {
        listItemsValue.splice(index, 1);
      }
    }
    this.props.onControlFormChanged(name, listItemsValue);
  }

  renderControlOptions(currentControl) {
    if (!currentControl) return;
    if (!currentControl.options || currentControl.options.length == 0) return (<p>Inga tillgängliga inställningar för denna kontroll</p>);
    let that = this;
    return (currentControl.options.map(function (option) {

      switch (option.type) {

        case 'boolean':
          return (<div key={option.name}>
            <legend>{option.title}</legend>
            <select name={option.name} value={option.value} onChange={that.handleInputChange} required={option.required} >
              <option value=""></option>
              <option value="true">Ja</option>
              <option value="false">Nej</option>
            </select>
          </div>);

        case 'string':
          return (<div key={option.name}>
            <legend>{option.title}</legend>
            <input type="text" name={option.name} value={option.value} onChange={that.handleInputChange} required={option.required} />
          </div>);

        case 'text':
          return (<div key={option.name}>
            <legend>{option.title}</legend>
            <textarea rows="10" cols="40" name={option.name} value={option.value} onChange={that.handleInputChange} required={option.required} />
          </div>);

        case 'int':
          return (<div key={option.name}>
            <legend>{option.title}</legend>
            <input type="number" name={option.name} value={option.value} onChange={that.handleInputChange} required={option.required} />
          </div>);

        case 'url':
          return (<div key={option.name}>
            <legend>{option.title}</legend>
            <Url style={{ width: "100%" }} name={option.name} value={option.value} onChange={that.handleInputChange} required={option.required} />
          </div>);

        case 'list':
          var listItemsDefaultValue = option.defaultValue;
          var listItemsValue = option.value;
          if (listItemsValue.constructor.name === "Array") {
            // alert('Array');
          } else if (listItemsValue.constructor.name === "String") {
            // alert('String');
            listItemsValue = listItemsValue.split(',');
          }
          if (listItemsDefaultValue.constructor.name === "Array") {
            // alert('Array');
          } else if (listItemsDefaultValue.constructor.name === "String") {
            // alert('String');
            listItemsDefaultValue = listItemsDefaultValue.split(',');
          }
          return (<div key={option.name}>
            <legend>{option.title}</legend>
            {listItemsDefaultValue.map((item, index) => {
              let itemFound = listItemsValue.find(liv => liv === item);
              let checked = itemFound ? true : false;
              return (<div>
                <Check name={option.name} checked={checked} onChange={(event) => that.handleListChange(event, item, checked, listItemsValue)} />
                <span>{item}</span>
              </div>);
            })}
          </div>);

        case 'date':
          return (<div key={option.name}>DATE</div>);

        case 'dateTime':
          return (<div key={option.name}>DATE TIME</div>);
      }
    }))
  }
}

export default Controlform;