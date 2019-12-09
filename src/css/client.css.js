import { createGlobalStyle } from 'styled-components';

import './fonts.css';

const GlobalStyle = createGlobalStyle`
body {
  overflow-x:hidden;
}
.modalGlass {
  position: fixed;
  background: rgba(205, 205, 205, 0.8);
  z-index:100000;
  top:0px;
  bottom:0px;
  left:0px;
  right:0px;
  cursor: default;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;  
}
.modalWindow {
    display: inline-block;
    background: rgba(255,255,255, 1);
    border:10px solid #bcbcbc;
    border-radius:8px;    
    pointer-events: all;
    cursor: default;
    padding:20px;
    z-index:100000;
}
#root, body, AppComponent, RouteContent {
    background-color: #F0F0F0;
}
.color-scheme-base{
    background-color: #F0F0F0;
}
.color-scheme-c1{
    background-color: #b96c6c;
}
.color-scheme-c2{
    background-color: #aaccb5;
}
.color-scheme-c3{
    background-color: #a7b3a5;
}
.color-scheme-c4 {
    background-color: #dfdfdf;
}
.color-scheme-c5 {
    background-color: #a0b4d0;
}

.pure-button {
    margin:2px;
}
.pure-button.no-margin {
    margin:0px;
}

.pure-form input:not([type=checkbox]) {
  width: 300px;
}
.pure-form legend {
  border:0px;
  margin-top: 0.7em;
  padding 0 0;
  font-weight:bold;
  font-size:14px;
}

@import url(https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css);
@import url(https://fonts.googleapis.com/css?family=Lato);
* {
  box-sizing: border-box;
}

.form-block {
  margin-bottom: 12px;
}

.form-element {
  background: #e8ebed;
  border: 1px solid #dfe4e6;
  color: #576366;
  line-height: 1;
  display: block;
  border-radius: 5px;
  height: 32px;
  padding: 0 8px;
  margin: 0;
  width: 200px;
}

textarea.form-element {
  height: auto;
  padding: 8px;
}

.form-select {
  padding: 0;
  position: relative;
}
.form-select:after {
  content: '';
  background: #bdc6cb;
  border-radius: 5px;
  position: absolute;
  top: 2px;
  bottom: 2px;
  right: 2px;
  width: 25px;
}
.form-select:before {
  color: white;
  content: '\f123';
  font-family: 'Ionicons';
  font-size: 12px;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
  right: 9px;
  z-index: 2;
}
.form-select select {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  background: transparent;
  border: 0;
  color: #576366;
  outline: none;
  font-weight: bold;
  height: 100%;
  width: 100%;
  padding: 8px 28px 8px 8px;
}

.form-checkbox {
  cursor: pointer;
  margin: 0 8px 0 0;
  position: relative;
}
.form-checkbox + label {
  cursor: pointer;
}
.form-checkbox:before {
  -webkit-transition: -webkit-transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
  transition: -webkit-transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
  transition: transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
  transition: transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75), -webkit-transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
  -webkit-transform: rotate(0) scale(0);
          transform: rotate(0) scale(0);
  content: "";
  position: absolute;
  left: 3px;
  top: 2px;
  z-index: 1;
  width: 9px;
  height: 4px;
  border: 3px solid #576366;
  border-top-style: none;
  border-right-style: none;
}
.form-checkbox:checked:before {
  -webkit-transform: rotate(-45deg) scale(1, 1);
          transform: rotate(-45deg) scale(1, 1);
}
.form-checkbox:after {
  content: "";
  position: absolute;
  top: -2px;
  left: 0;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background: #e8ebed;
  cursor: pointer;
}

.form-radio {
  cursor: pointer;
  position: relative;
  margin: 0 8px 0 0;
}
.form-radio + label {
  cursor: pointer;
}
.form-radio:before {
  -webkit-transition: -webkit-transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
  transition: -webkit-transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
  transition: transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
  transition: transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75), -webkit-transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
  -webkit-transform: scale(0);
          transform: scale(0);
  content: "";
  position: absolute;
  top: 1px;
  left: 1px;
  z-index: 1;
  width: 14px;
  height: 14px;
  background: #afb9c0;
  border-radius: 50%;
}
.form-radio:checked:before {
  -webkit-transform: scale(1);
          transform: scale(1);
}
.form-radio:after {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  width: 1rem;
  height: 1rem;
  background: #fff;
  border: 2px solid #cbd2d7;
  border-radius: 50%;
}

.form-element-block {
  display: block;
  margin-bottom: 12px;
}

.form-element-inline {
  display: inline-block;
}
.form-element-inline + .form-element-inline {
  margin-left: 12px;
}

/* OTHER STUFF */
body {
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  font-family: 'Lato';
  min-height: 100vh;
}

.formy-title {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 0;
}

.formy-subtitle {
  color: #576366;
  margin: 0 0 12px;
}

.floatLeft {
  float:left;
}

.clearBoth{
  clear:both;
}

.hidden {
  display: none;
}

.visible {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeIn {
  0% {opacity: 0;}
  100% {opacity: 1;}
}

@keyframes fadeIn {
  0% {opacity: 0;}
  100% {opacity: 1;}
}

.fadeIn {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}

@-webkit-keyframes fadeOut {
  0% {opacity: 1;}
  100% {opacity: 0;}
}

@keyframes fadeOut {
  0% {opacity: 1;}
  100% {opacity: 0;}
}

.fadeOut {
  -webkit-animation-name: fadeOut;
  animation-name: fadeOut;
}

.btn-xsmall{
  font-size:35%;
}
.btn-small{
  font-size:45%;
}
.btn-medium{
  font-size:70%;
}
.btn-large{
  font-size:80%;
}
.btn-xlarge{
  font-size:110%;
}
/* Scrollbars Start*/
::-webkit-scrollbar
{
	width: 12px;
  background-color: #F5F5F5;
  margin:20px;
}

::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

::-webkit-scrollbar
{
	width: 12px;
	background-color: #ecebeb;
}

::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #ccc;
}
/* Scrollbars End*/

/*Google Material Icons Start */
.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  /*font-size: 24px; */ /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}
/*Google Material Icons End */

`;
 export default GlobalStyle;