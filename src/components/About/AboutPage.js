import React from "react";
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app

export default class Tree extends React.Component {
  constructor(props) {
    super(props);
    console.log('-----')
    this.state = {
      treeData: [
        { title: 'Chicken', children: [{ title: 'Egg' }, { title: 'Boogh' }] },
        { title: 'Chicken', children: [{ title: 'Egg' }, { title: 'Boogh' }] }
      ]
    };
  }

  render() {
    return (
      <div style={{ height: 400 }}>
        hej
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
          //theme={FileExplorerTheme}
        />
      </div>
    );
  }
}
