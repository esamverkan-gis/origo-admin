import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'

const MainForm = styled.form`
    {}
    legend {
        clear:both;
    }
`
const FormWrapper = styled.div`
    {
        float:left
        margin-bottom:0.7em;
    }
    ::after {
        clear:both;
    }
    input {
        width:100px!important;
    }
    span {
        font-size:12px;
    }
`;

export class ConfigMainForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    if (value === "true") value = true;
    if (value === "false") value = false;
    const name = target.name;
    this.props.onConfigFormChanged(name, value);
  }

  getCoordsFromBBoxString(coordsAsString, nrOfExpectedCoords) {
    if (coordsAsString) {
      return coordsAsString.split(',');
    }
    var emptyArr = [];
    for (var i = 0; i < nrOfExpectedCoords; i++) {
      emptyArr.push('');
    }
    return emptyArr;
  }

  stringToArray(string = '') {
    return string.split(',');
  }

  render() {
    return (

      <MainForm className='pure-form' onSubmit={this.props.onConfigFormSubmit}>
        <fieldset>
          <div>
            <legend>Namn</legend>
            <input type="text" placeholder="Namn på konfigurationen" name="name" value={this.props.config.name} onChange={this.handleInputChange} required />

            <legend><b> Projektion </b></legend>
            <select name="proj4defs_id" value={this.props.config.proj4defs_id} onChange={this.handleInputChange} required>
              {/* https://www.havochvatten.se/hav/samordning--fakta/kartor--gis/mer-om-koordinater/geografiska-referenssystem.html*/}
              <option key="key01" value=""> Välj projektion </option>
              {this.props.projections.map((projection, index) => (
                <option key={projection.id} value={projection.id}> {projection.code} </option>
              ))}

            </select>

            <legend>Projektions extent</legend>
            <FormWrapper>
              <span> X(min): </span>
              <input key={"proj_extent_0"} type="number" name={"proj_extent_0"} value={this.props.config.proj_extent_0} onChange={this.handleInputChange} required />
              <span> Y(min): </span>
              <input key={"proj_extent_1"} type="number" name={"proj_extent_1"} value={this.props.config.proj_extent_1} onChange={this.handleInputChange} required />
              <span> X(max): </span>
              <input key={"proj_extent_2"} type="number" name={"proj_extent_2"} value={this.props.config.proj_extent_2} onChange={this.handleInputChange} required />
              <span> Y(max): </span>
              <input key={"proj_extent_3"} type="number" name={"proj_extent_3"} value={this.props.config.proj_extent_3} onChange={this.handleInputChange} required />
            </FormWrapper>

            <legend>Kartans extent</legend>
            <FormWrapper>
              <span> X(min): </span>
              <input key={"map_extent_0"} type="number" name={"map_extent_0"} value={this.props.config.map_extent_0} onChange={this.handleInputChange} required />
              <span> Y(min): </span>
              <input key={"map_extent_1"} type="number" name={"map_extent_1"} value={this.props.config.map_extent_1} onChange={this.handleInputChange} required />
              <span> X(max): </span>
              <input key={"map_extent_2"} type="number" name={"map_extent_2"} value={this.props.config.map_extent_2} onChange={this.handleInputChange} required />
              <span> Y(max): </span>
              <input key={"map_extent_3"} type="number" name={"map_extent_3"} value={this.props.config.map_extent_3} onChange={this.handleInputChange} required />
            </FormWrapper>

            <legend>Kartans startposition</legend>
            <FormWrapper>
              <span> X: </span>
              <input key={"center_coord_0"} type="number" name={"center_coord_0"} value={this.props.config.center_coord_0} onChange={this.handleInputChange} required />
              <span> Y: </span>
              <input key={"center_coord_1"} type="number" name={"center_coord_1"} value={this.props.config.center_coord_1} onChange={this.handleInputChange} required />
            </FormWrapper>

            <legend>Resolutions</legend>
            <input key={"resolutions"} type="text" name={"resolutions"} value={this.props.config.resolutions} onChange={this.handleInputChange} required />

            <legend>Initial zoomnivå i admin GUI</legend>
            <select value={this.props.config.zoom} name="zoom" onChange={this.handleInputChange} required>
              {this.stringToArray(this.props.config.resolutions).map((resolution, index) => (
                <option key={index} value={index}> {index} </option>
              ))}
            </select>

            <legend>Visa pin vid klick *</legend>
            <select name="pinning" value={(this.props.config.featureinfo_options ? this.props.config.featureinfo_options.pinning : false)} onChange={this.handleInputChange}>
              <option value={true}>Ja</option>
              <option value={false}>Nej</option>
            </select>
          </div>
          <input type="submit" className="pure-button pure-button-active color-scheme-c2" value="Spara" />
        </fieldset>
      </MainForm>
    )
  }
}

ConfigMainForm.propTypes = {
  config: PropTypes.object,
  onConfigFormSubmit: PropTypes.func.isRequired,
  onConfigFormChanged: PropTypes.func.isRequired
}


