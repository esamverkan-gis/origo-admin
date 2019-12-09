import React from 'react';
import styled from 'styled-components';
import { Modal } from 'components/Modal/Index';

const Wrapper = styled.div`
  clear:both;
`;
const Button = styled.button`
  width:300px;
`;

export class GlobalAttributeComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Wrapper>
        <Button className="pure-button pure-button-active color-scheme-c4">Lägg till ett lager spesifikt attribut</Button>
        <Modal visibilityProp={false}>
          <div>
            <legend>HTML som visas på alla features i ett lager</legend>
            {/* <textarea rows="10" cols="40" name={option.name} value={option.value} onChange={that.handleInputChange} required={option.required} /> */}
            <p>test</p>
            <button className="pure-button pure-button-active color-scheme-c1" >Stäng</button>
            <button className="pure-button pure-button-active color-scheme-c2" >Lägg till</button>
          </div>
        </Modal>
      </Wrapper>
    );
  }
}