import * as React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import _ from 'lodash';

const DeleteButton = styled.button`
  display: inline-block;
  float: right;
  font-size: 45%;
  background-color:#c45c52;
  margin:0px;
  margin-top: 5px !important;
  padding: 5px 5px;
`;
const NodeText = styled.span`
    display: inline-block;
    padding: 5px 0;
    padding-left: 5px;
    line-height: 16px;    
    height: 100%;
    
    width: calc(100% - 20px);
}  
`;

function getChildrenString(node) {
  let nodeString = '';
  if (node && node.children && node.children.length) {
    nodeString = nodeString + node.name;
    const numberOfChildren = node.children.length;
    for (let i = 0; i < numberOfChildren; i++) {
      let childNode = node.children[i];
      nodeString = nodeString.concat(' ' + childNode.name);
      if (childNode) {
        nodeString.concat(' ' + node.name);
        if (childNode.children && childNode.children.length) {
          nodeString = nodeString.concat(' ' + getChildrenString(childNode));
        }
      }
    }
  }
  return nodeString;
}

export class TreeWrapper extends React.Component {

  state = {
    active: null,
    tree: {
      module: 'test',
      children: []
    }
  };

  prevChildrenString = '';
  hoveredNode;

  renderNode = node => {
    let nodeType = typeof node.leaf == "undefined" ? "Group" : "   Layer"

    return (
      <div
        className={cx('node', {
          'is-active': node === this.state.active
        }, { 'is-group': typeof node.leaf == "undefined" })}>
        <NodeText
          onClick={this.onClickNode.bind(null, node)}
          onMouseEnter={this.onMouseEnterNode.bind(null, node)}
        >
          {node.title}
        </NodeText>
        <DeleteButton className="pure-button pure-button-active color-scheme-c1  "
          onClick={(event) => this.props.onDeleteButtonClicked(event, node)}>x</DeleteButton>
      </div>
    );
  };

  componentWillReceiveProps(props) {
    this.setState({
      prevTree: this.props.tree
    });
  }

  onClickNode = (node, proxy) => {
    if (proxy) {
      // TODO:  INFO: This is a very convoluted way of handling the problem whereby the editing pop-up is brought up when one clicks on the small arrow to the left which is meant to collapse, and the collapse/expansion is toggled such that nothing happens.
      // Basically, when the text is clicked in we get sent 2 parameters whereas this is not the case when the arrow is clicked on. I therefore make sure that we only do stuff when we click on the text and not the arrows.
      if (node.layerId) {
        this.props.onLayerEditorStartEdit(node.layerId);
      } else if (node.groupId) {
        this.props.onGroupEditorStartEdit(event, node.groupId);
      }
    }
  };
  onMouseEnterNode = node => {
    this.hoveredNode = node;
  };


  handleChange = (tree, other, more) => {
    this.setState({
      tree: tree
    });

    try {
      this.validateTree(tree);
    } catch (err) {
      alert("Webbkartan Origo tillåter idag inte att lager följs av grupper i trädet.\n" + err + "");
    }
    if (getChildrenString(tree) !== this.prevChildrenString) {
      this.props.onGroupLayerTreeChanged(tree); // But still save the state, otherwise we get in strange state
      this.prevChildrenString = getChildrenString(tree);
    } else {
      if (this.hoveredNode) {
        // console.info('Triggering click event:\n', 'tree: ', tree, '\nother: ', other, '\nmore: ', more);
        this.onClickNode(this.hoveredNode);
      }
    }
  };

  /**
   * Make sure no group is positioned after a layer
   * @param {*} currentNode
   */
  validateTree(currentNode) {
    let _this = this;
    let firstLayerEncountered = false;
    currentNode.children.forEach(function (item) {
      if (item.children && item.children.length > 0) {
        if (!_this.validateTree(item)) {
          return false; //some one else found an error
        }
      }
      if (item.groupId && firstLayerEncountered) { //we found a group but we already found a layer
        throw new Error("Gruppen '" + item.title + "' ligger efter ett lager i lagerlistan.");
      } else if (item.layerId) {
        firstLayerEncountered = true;
      }
    });
    return true;
  }

  render() {
    return (
      <Tree
        paddingLeft={20}
        tree={Object.assign({}, this.props.tree)}
        onChange={this.handleChange}
        isNodeCollapsed={this.isNodeCollapsed}
        renderNode={this.renderNode}
      />
    );
  }
}
