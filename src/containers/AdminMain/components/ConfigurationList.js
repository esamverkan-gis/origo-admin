import React from 'react';
import styled from 'styled-components';
import { Config } from './Config'

const SearchBox = styled.input`
    width:200px!important;
`;

const ConfigList = styled.ul`
    padding:0px;
`;

export class ConfigurationList extends React.Component {
  onFormSubmit(event) {
    event.preventDefault();
    return false;
  }
  render() {
    return (
      <div>
        <h2>Konfigurationer</h2>
        <form className='pure-form' onSubmit={this.onFormSubmit}>
          <fieldset>
            <SearchBox type="text" placeholder='Sök konfiguration' onChange={(event) => this.props.onFilterChange(event.target.value)} />
            <button className="pure-button pure-button-active color-scheme-c2" onClick={this.props.onNewConfigClick}>Skapa ny</button>
          </fieldset>
        </form>
        <ConfigList>
          {this.props.configs.map(config => (
            <Config
              key={config.id} {...config}
              onConfigClick={() => this.props.onConfigClick(config.id)}
              onExportConfigAsJsonClicked={() => this.props.onExportConfigAsJsonClicked(config.id)}
              onConfigRemoveClick={() => this.props.onConfigRemoveClick(config.id)} />
          ))}
        </ConfigList>
      </div>
    )
  }
}
