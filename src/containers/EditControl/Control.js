import React from 'react'
import styled from 'styled-components';

const ListItem = styled.li`
  {
    list-style-type: none;
    font-size:14px;
    font-family: helvetica;
    height:28px;
  }
  span {
    vertical-align: -webkit-baseline-middle;
    margin-left: 6px;
  }
`;

const ListButton = styled.button`
  { 
    float: right;
    margin-left:1px!important;
    
    width:24px!important;
    height:24px!important;
  }
  i {
    font-size: 18px!important;
    position: relative;
    right: 10px;
    bottom: 3px;
    width:20px;
  }
`;

const EditButton = styled(ListButton)`
`;

const Check = styled.input.attrs({
  type: 'checkbox'
})`
  position: relative;
  top: 7px;
`;

export const Control = ({ control, toggleControl, editButtonClicked }) => (
  <ListItem>
    <Check checked={control.isActive} onClick={toggleControl} />
    <span >{control.title}</span>
    <EditButton className="pure-button pure-button-active color-scheme-c2" disabled={!control.isActive} onClick={editButtonClicked} ><i className="material-icons">settings</i></EditButton>
  </ListItem>
)

export default Control;