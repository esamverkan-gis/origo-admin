import React from 'react';
import styled from 'styled-components';

const GlassPanel = styled.div`
    position: fixed;
    background: rgba(205, 205, 205, 0.8);
    z-index:100000;
    top:0px;
    bottom:0px;
    left:0px;
    right:0px;
    cursor: default;
`;
const Window = styled.div`
    position:absolute;
    background: rgba(255,255,255, 1);
    border:10px solid #bcbcbc;
    border-radius:8px;
    height:auto;
    min-height:200px;
    max-height:600px;
    min-width:200px;
    max-width:500px;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    pointer-events: all;
    cursor: default;
    padding:10px;
    overflow-y: auto;
    z-index:100000;
`;
const Content = styled.div`
    z-index:100000;
`;

export class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldModalBeVisible(visible) {
    return visible ? '' : 'hidden';
  }

  handleClick(event) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    return;
  }

  render() {
    return (
      <GlassPanel className={this.shouldModalBeVisible(this.props.visibilityProp)} onClick={this.handleClick}>
        <Window>
          <Content>{this.props.children}</Content>
        </Window>
      </GlassPanel>
    );
  }
};