import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Modal } from '../../components';

const Wrapper = styled.div`
  clear:both;
`;
const JsonEditor = styled.textarea`
  font-family: "Lucida Console", "Lucida Sans Typewriter", monaco, "Bitstream Vera Sans Mono", monospace;
  font-size: 12px;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  line-height: 18.5714px;
`;
const Link = styled.a`
  display: block;
  margin-top: 10px;
`;
const Button = styled.button`
  width: 25%;
`;
const StyleSelectBox = styled.select`
  margin: 10px 0;
`;

export class EditStyle extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    let buttonText = '';
    buttonText = this.props.style.id == -1 ? 'Skapa Stil' : 'Editera Stil';
    return (
      <Wrapper>
        <button onClick={this.props.onStyleEditorStartEdit} style={{width: '300px'}} disabled={!this.props.isAnyLayerSelected} className="pure-button pure-button-active color-scheme-c4"> {buttonText} </button>
        {this.props.styleEditor.visible ?
        <Modal visibilityProp={this.props.styleEditor.visible}>
          <form className='pure-form' onSubmit={this.props.onStyleFormSubmit}>
            <div>
              <legend>Namn</legend>
              <input type="text" name="name" value={this.props.style.name} onChange={this.props.onStyleNameChanged} required />
              <br /><br />
              <JsonEditor rows="15" cols="60" value={this.props.styleEditor.text} onChange={this.props.onStyleTextChanged} spellcheck="false" required>
              </JsonEditor>
              <br />
              <StyleSelectBox className="clearBoth" value="" onChange={this.props.onImportedStyleChanged} >
                <option key="valj-stil" value="">Kopiera från en existerande stil</option>
                {this.props.styles.map(style => (
                  <option key={style.id} value={style.id}>{style.name}</option>
                ))}
              </StyleSelectBox>
              <br />
              <Button className="pure-button pure-button-active color-scheme-c1" onClick={this.props.onStyleEditorCancel}>Ångra</Button>
              <Button className="pure-button pure-button-active color-scheme-c2">Spara</Button>

              <Link href="http://oemap2-test.decerno.se/helptext.html" target="_blank"> Hjälp text </Link>
            </div>
          </form>
        </Modal> : null}
      </Wrapper>
    )
  }
}

EditStyle.propTypes = {
  styleEditor: PropTypes.object,
  onStyleEditorStartEdit: PropTypes.func.isRequired,
  onStyleFormSubmit: PropTypes.func.isRequired
}