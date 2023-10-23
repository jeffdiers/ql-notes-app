import React, { useState, useCallback } from "react";
import ItemView from "../components/itemView";

import _ from "lodash";

import "../styles/workspace.css";

import {
  getFilePath,
  deleteItemsRecursively,
  insertItemSorted,
} from "../util/helpers";

export interface Item {
  type: "note" | "directory";
  name: string;
  parent?: Item;
  note?: string;
  items?: Item[];
}

export interface WorkspaceContextProps {
  currentItem: Item | null;
  setCurrentItem: (item: Item) => void;
  addNote: (fileName: string, noteText: string) => void;
  addDirectory: (newDirName: string) => void;
  updateNote: (newText: string) => void;
  selectedItems: string[];
  selectItem: (item: Item) => void;
  setSelectedItems: (items: string[]) => void;
  deleteSelectedItems: () => void;
  deleteItem: (item: Item) => void;
  updateChildName: (newName: string, childIndex: number) => void;
}

export const WorkspaceContext = React.createContext<WorkspaceContextProps>({
  currentItem: null,
  setCurrentItem: (item: Item) => {},
  addNote: (fileName: string, noteText: string) => {},
  addDirectory: (newDirName: string) => {},
  updateNote: (newText: string) => {},
  selectedItems: [],
  selectItem: (item: Item) => {},
  setSelectedItems: (items: string[]) => {},
  deleteSelectedItems: () => {},
  deleteItem: (item: Item) => {},
  updateChildName: (newName: string, childIndex: number) => {},
});

export function Workspace() {
  const [currentItem, setCurrentItem] = useState<Item>({
    name: "root",
    type: "directory",
    items: [],
  });

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const selectItem = useCallback((item: Item) => {
    setSelectedItems((prevSelectedItems) => {
      // Deep clone the selected items
      const newSelectedItems = _.cloneDeep(prevSelectedItems);
      const newSelectetItemFilePath = getFilePath(item).join("/");
      const index = newSelectedItems.indexOf(newSelectetItemFilePath);
      if (index > -1) {
        newSelectedItems.splice(index, 1);
      } else {
        newSelectedItems.push(newSelectetItemFilePath);
      }
      return newSelectedItems;
    });
  }, []);

  const addNote = useCallback((fileName: string, noteText: string) => {
    setCurrentItem((prevItem) => {
      // Deep clone the item
      const newItem = _.cloneDeep(prevItem);
      if (newItem.type === "directory") {
        const newNote: Item = {
          type: "note",
          name: fileName,
          note: noteText,
          parent: newItem,
        };
        newItem.items = insertItemSorted(newItem.items, newNote);
      }
      return newItem;
    });
  }, []);

  const addDirectory = useCallback((newDirName: string) => {
    setCurrentItem((prevItem) => {
      // Deep clone the item
      const newItem = _.cloneDeep(prevItem);
      if (newItem.type === "directory") {
        const newDir: Item = {
          type: "directory",
          name: newDirName,
          items: [],
          parent: newItem,
        };
        newItem.items = insertItemSorted(newItem.items, newDir);
      }
      return newItem;
    });
  }, []);

  const updateNote = useCallback((newText: string) => {
    setCurrentItem((prevItem) => {
      const newItem = _.cloneDeep(prevItem);
      if (prevItem.type === "note") {
        newItem.note = newText;
      }
      return newItem;
    });
  }, []);

  // Recursively delete a set of items traversing up the tree
  const deleteSelectedItems = useCallback(() => {
    setCurrentItem((prevItem) => {
      // Deep clone the item
      const newItem = _.cloneDeep(prevItem);

      let tempNewItem: Item = newItem;
      const newItemPath: string[] = getFilePath(newItem);
      const visited = new Set();

      // Move up the tree and delete nodes above the current node
      while (tempNewItem && !visited.has(tempNewItem)) {
        visited.add(tempNewItem);
        if (tempNewItem.items) {
          tempNewItem.items = tempNewItem.items.filter(
            (childNode) =>
              deleteItemsRecursively(
                childNode,
                [...newItemPath, childNode.name],
                selectedItems
              ) !== null
          );
        }
        if (tempNewItem.parent) {
          newItemPath.pop();
          tempNewItem = tempNewItem.parent;
        } else {
          break; // reached the root
        }
      }

      return newItem; // TODO: this can return a deleted node
    });
  }, [selectedItems]);

  // Recursively delete a single item
  const deleteItem = useCallback((itemToDelete: Item) => {
    setCurrentItem((prevItem) => {
      const newItem = _.cloneDeep(prevItem);
      const newItemPath: string[] = getFilePath(newItem);
      const itemToDeletePath: string[] = [getFilePath(itemToDelete).join("/")];
      deleteItemsRecursively(newItem, newItemPath, itemToDeletePath);
      return newItem;
    });
  }, []);

  const updateChildName = useCallback((newName: string, childIndex: number) => {
    setCurrentItem((prevItem) => {
      const newItem = _.cloneDeep(prevItem);
      if (newItem.items) {
        newItem.items[childIndex].name = newName;
      }
      return newItem;
    });
  }, []);

  return (
    <div className="workspace">
      <WorkspaceContext.Provider
        value={{
          currentItem,
          setCurrentItem,
          addNote,
          addDirectory,
          updateNote,
          selectedItems,
          selectItem,
          setSelectedItems,
          deleteSelectedItems,
          deleteItem,
          updateChildName,
        }}
      >
        <ItemView {...currentItem} />
      </WorkspaceContext.Provider>
    </div>
  );
}
