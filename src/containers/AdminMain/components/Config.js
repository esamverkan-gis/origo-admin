import React from 'react';
import styled from 'styled-components';

const ListButton = styled.button`
  { 
    float: right;
    margin-left:1px!important;
    
    width:24px!important;
    height:24px!important;
  }
  i {
    font-size: 18px!important;
    margin-left: -9px;
    margin-top: -4px;
    width:20px;
  }
`;
const DeleteButton = styled(ListButton)`
`;

const DownloadButton = styled(ListButton)`
`;

const ListItem = styled.li`
  {
    list-style-type: none;
    cursor: pointer;
    font-size:14px;
    font-family: helvetica;
    height:28px;
  }
  span{
    vertical-align: -webkit-baseline-middle;
  }
`;

export const Config = ({ onConfigClick, onExportConfigAsJsonClicked, onConfigRemoveClick, name }) => (
  <ListItem>
    <span onClick={onConfigClick}>{name}</span>
    <DeleteButton className="pure-button pure-button-active color-scheme-c1" onClick={onConfigRemoveClick}><i className="material-icons">delete forever</i></DeleteButton>
    <DownloadButton className="pure-button pure-button-active color-scheme-c5" onClick={onExportConfigAsJsonClicked}><i className="material-icons">get_app</i></DownloadButton>
  </ListItem>
)

export default Config