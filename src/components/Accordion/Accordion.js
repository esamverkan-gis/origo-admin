import React from 'react';
import styled from 'styled-components';

const AccordionDiv = styled.div`
`;
const AccordionWrapper = styled.div`
    clear:both;
    display:block;
    margin-bottom: 2px;
`;
const Content = styled.div`
`;
const Header = styled.div`
    {
    background-color:#e0e0e0;
    height:32px;
    border-radius:4px;
    font-weight:bold;
    cursor: pointer;
    }
    span {
        position:relative;
        left: 9px;
        bottom: 2px;
    }
    span i {
        top:7px;
        position:relative;
    }
`;
const GlassPanel = styled.div`
    position: fixed;
    background: rgba(205, 205, 205, 0.8);
    z-index:10000000;
    top:0px;
    bottom:0px;
    left:0px;
    right:0px;
    pointer-events: none;
    cursor: default;
`;

export class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: this.props.defaultOpen };
  }

  isCollapsed() {
    return this.state.open ? "visible fadeIn" : "hidden fadeOut";
  }

  toggleOpen() {
    this.setState({ open: !this.state.open });
  }

  className() {
    return this.state.open ? "keyboard_arrow_down" : "keyboard_arrow_right"
  }

  render() {
    return (
      <AccordionWrapper>
        <Header onClick={() => this.toggleOpen()}><span><i className="material-icons">{this.className()}</i>{this.props.header}</span></Header>
        <AccordionDiv className={this.isCollapsed()}>
          <Content>{this.props.children}</Content>
        </AccordionDiv>
      </AccordionWrapper>
    );
  }
};
