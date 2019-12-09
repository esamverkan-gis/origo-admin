import React from "react";
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app;

export default class SortableTreeWrapper extends React.Component {

  generateNodePropsFunc = ({
    node,
    path,
    treeIndex,
    lowerSiblingCounts,
    isSearchMatch,
    isSearchFocus
  }) => {
    // only layers have type property. We need a way to distinguish if a node being rendered is a layer or a group
    const className = node.type ? '_layer_' : node.name === 'ROOT' ? '_root_group_' : '_group_';
    const color = node.type ? '#002db3' : 'black';
    return {
      className,
      style: {
        color
      },
      onClick: (event) => {
        // clicking on the tringle icon should not trigger an action
        if (event.target.tagName === 'BUTTON') {
          return;
        }

        // clicking on the root group should not trigger an action
        if (node.name === 'ROOT') {
          return;
        }

        if (node.type) { // node is a layer
          this.props.onLayerEditorStartEdit(node.id);
        } else { // node is a group
          this.props.onGroupEditorStartEdit(event, node.id);
        }
      }
    }
  }

  canDropFunc = ({
    node,
    prevPath,
    prevParent,
    prevTreeIndex,
    nextPath,
    nextParent,
    nextTreeIndex
  }) => {
    const nodeType = node.type ? 'layer' : 'group';

    if (!nextParent) { // next parent is root 
      return false;
    }

    if (nextParent && nextParent.type) { // parent is a layer, layer cannot be parent
      return false;
    }

    if (nextParent) { // node is NOT being droped under root 
      let numberOfgroups = 0;
      let nextPosition;
      const nextSiblings = nextParent.children;

      nextSiblings.forEach((i, index) => {
        if (!i.type) numberOfgroups++;
        // if (i.id === node.id && i.config_id === node.config_id) nextPosition = index;
        if (i.name === node.name) nextPosition = index;
      });

      if (nodeType === 'group') {
        if (nextPosition >= numberOfgroups) return false;
      } else if (nodeType === 'layer') {
        if (nextPosition < numberOfgroups) return false;
      }
    }
    return true;
  }

  onMoveNodeFunc = ({
    treeData,
    node,
    nextParentNode,
    prevPath,
    prevTreeIndex,
    nextPath,
    nextTreeIndex
  }) => {
    this.props.updateTreeStructure(node, nextParentNode, nextParentNode.children);
  }

  onVisibilityToggleFunc = ({
    treeData,
    node,
    expanded,
    path
  }) => {
    this.props.saveVisibilityStatus(node, expanded);
  }

  render() {
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={this.props.data}
          onChange={this.props.setTreeData}
          generateNodeProps={this.generateNodePropsFunc}
          canDrop={this.canDropFunc}
          theme={FileExplorerTheme}
          innerStyle={{ paddingTop: '5px' }}
          onMoveNode={this.onMoveNodeFunc}
          onVisibilityToggle={this.onVisibilityToggleFunc}
        />
      </div>
    );
  }
}
