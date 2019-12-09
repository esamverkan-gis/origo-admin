import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Control from './Control';
import Controlform from './ControlForm';

const Controlslist = styled.div`
  float: left;
  width: 30%;
  margin-top: 2px;
  padding: 10px;
  border: 5px solid #e0e0e0;
  border-radius: 8px;
`;
const ControlformContainer = styled.div`
  float: left;
  width: 60%;
  margin-left: 10px;
`;

export class EditControl extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Controlslist>
          {this.props.controls.map(control => <Control
            key={control.name}
            control={control}
            toggleControl={() => this.props.onToggleControl(control)}
            editButtonClicked={() => this.props.onEditButtonClicked(control)} />
          )}
        </Controlslist>
        <ControlformContainer>
          <Controlform
            controlEditor={this.props.controlEditor}
            isControlEditorVisible={this.props.isControlEditorVisible}
            onControlFormCancel={this.props.onControlFormCancel}
            onControlFormSubmit={this.props.onControlFormSubmit}
            onControlFormChanged={this.props.onControlFormChanged} />
        </ControlformContainer>
      </div>
    );
  }
}

EditControl.propTypes = {
  sources: PropTypes.object
}