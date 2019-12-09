import * as React from 'react';
import styled from 'styled-components';
//import spinner from '../../../static/Images/ajax-loaderTransparent.gif';
//https://www.alyt.com/frontend/img/spinner.gif

const SpinnerContainer = styled.div`
    position: relative;
`;

const GlassPanel = styled.div`
    position: absolute;
    background: rgba(205, 205, 205, 0.8);
    z-index:10000000;
    top:0px;
    bottom:0px;
    left:0px;
    right:0px;
    pointer-events: none;
    cursor: default;
`;

const SpinnerDivOld = styled.div`
    height: 100%;
    background-image: url(http://redribbonbakeshop.com.ph/wp-content/themes/redribbon/images/spinner.gif);
    WebkitTransition: all;
    msTransition: all;
    background-repeat: no-repeat;
    background-position: center center;
    position: absolute;
    z-index: 1000;
    width: 100%;
    background-size: 80px 80px;
    background-color:#343434;
    opacity:0.5;
`;

const SpinnerDiv = styled.div`
    position: absolute;
    WebkitTransition: all;
    msTransition: all;
    z-index: 1100;
    border: 10px solid #f3f3f3;
    border-radius: 50%;
    border-top: 10px solid #3498db;
    width: 60px;
    height: 60px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
    left: 40%;
    top: 40%;
    transform: translate(50px);
    
    @-webkit-keyframes spin {
      0% { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
`;

export class Spinner extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldSpinnerBeVisible(spinnerVisible) {
    return spinnerVisible ? '' : 'hidden';
  }

  render() {
    return (
      <SpinnerContainer>
        <GlassPanel className={this.shouldSpinnerBeVisible(this.props.visibilityProp)}>
          <SpinnerDiv />
        </GlassPanel>
        {this.props.children}
      </SpinnerContainer>
    );
  }
};