---
order: 2
title:
  en-US: draggable-and-draggeable
---


## en-US

- Drag treeNode to insert after the other treeNode or insert into the other parent TreeNode.
- Press '+' button to add a new node
- Press '-' button to delete a new node
- The titles are automatically updated

treeUtils.js
```jsx
/**
 *
 * @param data - La liste de node dans le noeud de l'arbre actuel
 * @param key - key du node a rechercher
 * @param parent - parent du noeud actuel
 * @param callback - fonction appelé quand le node avec la key est trouvée -> (node, index, data, parent = null) => DataNode | undefined
 *
 * Parcours en profondeur de l'arbre en matchant la key du node, une fois trouvée on applique la fonction callback
 */
export const depthSearchByKeyWithCallback = (
  data,
  key,
  callback,
  parent = null
) => {
  let result;

  for (let i = 0; i < data.length && data[i]; i++) {
    if (data[i].key === key) return callback(data[i], i, data, parent);
    if (data[i].children) {
      const node = depthSearchByKeyWithCallback(
        data[i].children || [],
        key,
        callback,
        data[i]
      );
      result = node !== undefined ? node : result;
    }
  }
  return result;
};
/**
 *
 * @param info - la data récupérée par le drag & drop
 * @param treeData - l'arbre de base
 *
 * L'algorithme effectue un premier parcours en profondeur pour supprimer le node de sa position initiale
 * Puis un deuxième afin d'ajouter ce node à sa nouvelle place
 */
export const moveNodeInTree = (info, treeData) => {
  const { node: destinationNode, dragNode: draggedNode } = info;
  const dropPosition =
    info.dropPosition - Number(destinationNode.pos.split("-").pop());
  const currentTreeData = [...treeData];

  //Je supprime le node dragged dans la liste de child actuelle et je le récupère
  const dragObj = depthSearchByKeyWithCallback(
    currentTreeData,
    draggedNode.key,
    (draggedNode, index, childNodes, parent) => {
      childNodes.splice(index, 1);
      updateNodesTitle(childNodes, parent?.title);
      return draggedNode;
    }
  );

  //Je rajoute le node dragged la où je l'ai drop
  depthSearchByKeyWithCallback(
    currentTreeData,
    destinationNode.key,
    (draggedNode, index, childNodes, parent) => {
      // si je met un node dans un niveau inférieur
      if (
        !info.dropToGap ||
        ((destinationNode.children || []).length > 0 && // Has children
        destinationNode.expanded && // Is expanded
          dropPosition === 1) // On the bottom gap
      ) {
        draggedNode.children = draggedNode.children || [];
        dragObj && draggedNode.children.unshift(dragObj);
      }
      // si je met un node avant un autre au même niveau
      else {
        dragObj &&
          childNodes.splice(index + Number(dropPosition !== -1), 0, dragObj);
      }
      updateNodesTitle(childNodes, parent?.title);
      return draggedNode;
    }
  );

  return currentTreeData;
};

/**
 *
 * @param data - Le noeud actuel dans l'arbre
 * @param preTitle - Le préfixe du titre
 */
export const updateNodesTitle = (data, preTitle = null) => {
  for (let i = 0; data && i < data.length; i++) {
    data[i].title = computeTitle(`${preTitle || ""}`, i + 1);

    if (data[i] && data[i].children)
      updateNodesTitle(data[i].children, data[i].title);
  }
};

/**
 *
 * @param key - key de l'élément à supprimer
 * @param tree - arbre dans lequel on veut ajouter l'élément
 */
export const deleteNodeWithKeyFromTree = (key, tree) => {
  const newTree = [...tree];
  depthSearchByKeyWithCallback(newTree, key, (node, index, data, parent) => {
    data.splice(index, 1);
    updateNodesTitle(data, parent?.title);

    return node;
  });
  return newTree;
};

/**
 *
 * @param elt - l'élément à ajouter
 * @param tree - arbre dans lequel ajouter l'élément
 * @param parentKey - la potentielle clé du parent dans lequel on veut ajouter l'élément
 */
export const addNodeFromTree = (elt, tree, parentKey = null) => {
  if (!parentKey) {
    return [
      ...tree,
      { ...elt, title: computeTitle(`${elt.title}`, tree.length + 1) }
    ];
  } else {
    const newTree = [...tree];

    depthSearchByKeyWithCallback(newTree, parentKey, (node) => {
      node.children = node.children || [];
      node.children.push(elt);

      updateNodesTitle(newTree);
      return node;
    });

    return newTree;
  }
};

const separator = ".";

/**
 *
 * @param preTitle - prefixe du titre
 * @param title - texte du titre
 * @param withSeparator - boolean si on veut afficher le séparateur
 */
export const computeTitle = (preTitle, title, withSeparator = true) =>
  `${preTitle}${title}${withSeparator ? separator : ""}`;
```

index.js
```jsx
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Tree } from "antd";
import {
  moveNodeInTree,
  addNodeFromTree,
  deleteNodeWithKeyFromTree
} from "./treeUtils";
const defaultData = [
  {
    key: Math.random(),
    title: "1.",
    inputValue: "Budget",
    children: [
      {
        key: Math.random(),
        title: "1.1.",
        inputValue: "Budget de la semaine"
      },
      {
        key: Math.random(),
        title: "1.2.",
        inputValue: "Budget du jour",
        children: [
          {
            key: Math.random(),
            title: "1.2.1"
          },
          {
            key: Math.random(),
            title: "1.2.2"
          }
        ]
      },
      {
        key: Math.random(),
        title: "1.3."
      }
    ]
  },
  {
    key: Math.random(),
    title: "2."
  },

  {
    key: Math.random(),
    title: "3."
  }
];

const DraggableTree = () => {
  const [treeData, setTreeData] = useState(defaultData);
  const [expandedKeys, setExpandedKeys] = useState([]);

  const onDragEnter = (info) => {
    setExpandedKeys(expandedKeys.concat(info.expandedKeys));
  };

  const onDrop = (info) => {
    setTreeData(moveNodeInTree(info, treeData));
  };
  const onAdd = (parentKey = null, preTitle = null) => {
    const elt = { key: Math.random(), title: `${preTitle || ""}` };
    setTreeData(addNodeFromTree(elt, treeData, parentKey));
  };

  const onDelete = (key) => {
    setTreeData(deleteNodeWithKeyFromTree(key, treeData));
  };

  return (
    <Tree
      className={`draggable-tree`}
      draggable
      blockNode
      onDragEnter={onDragEnter}
      onDrop={onDrop}
      treeData={treeData}
      titleRender={(item) => (
        <div style={{ display: "flex" }}>
          <h5>{item.title}</h5>
          <h4
            style={{ marginLeft: "20px" }}
            onClick={() => onAdd(item.key, item.title)}
          >
            +
          </h4>
          <h4 style={{ marginLeft: "20px" }} onClick={() => onDelete(item.key)}>
            -
          </h4>
        </div>
      )}
    />
  );
};

export default DraggableTree;

ReactDOM.render(<DraggableTree />, document.getElementById("container"));

```
