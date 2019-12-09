import React from 'react';
import * as ReactDOM from 'react-dom';

// These two containers are siblings in the DOM
const modalRoot = document.getElementById('modal-root');

// Let's create a Modal component that is an abstraction around
// the portal API.
export class Modal extends React.Component {
  constructor(props) {
    super(props);
    // Create a div that we'll render the modal into. Because each
    // Modal component has its own element, we can render multiple
    // modal components into the modal container. 
    const elem = document.createElement('div');
    elem.className = "modalGlass";
    this.el = elem;
    const elem2 = document.createElement('div');
    elem2.className = "modalWindow";
    elem.appendChild(elem2);
    this.el2 = elem2;
  }

  componentDidMount() {
    // Append the element into the DOM on mount. We'll render
    // into the modal container element (see the HTML tab).
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    modalRoot.removeChild(this.el);
  }

  render() {
    // Use a portal to render the children into the element
    return ReactDOM.createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      this.props.children,
      // A DOM element
      this.el2
    );
  }
}
