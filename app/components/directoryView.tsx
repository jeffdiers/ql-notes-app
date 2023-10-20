import React, { useContext } from "react";
import { WorkspaceContext, Item } from "../containers/workspace";
import DirectoryIcon from "./directoryIcon";
import NoteIcon from "./noteIcon";

import "../styles/directory.css";

import { getFilePath } from "../util/helpers";

interface DirectoryViewProps {
  directory: Item;
}

const DirectoryView: React.FC<DirectoryViewProps> = ({ directory }) => {
  const {
    addNote,
    addDirectory,
    setCurrentItem,
    selectedItems,
    selectItem,
    deleteItem,
    updateChildName,
  } = useContext(WorkspaceContext);

  const isFileNameUnique = (fileName: string) => {
    // Check if an item with the same name already exists
    const existingNote = directory.items?.find(
      (item) => item.name === fileName
    );

    return !existingNote;
  };

  const handleAddNote = () => {
    let fileName: string | null = null;
    let isUnique = false;
    while (!fileName || !isUnique) {
      fileName = window.prompt("Enter the name of the new note:");
      if (fileName === null) return;
      isUnique = isFileNameUnique(fileName);
      if (!isUnique) {
        alert(
          "An item with the same name already exists. Please choose a different name."
        );
      }
    }

    const noteText = window.prompt("Enter the text of the new note:");
    if (noteText === null) return;

    addNote(fileName, noteText);
  };

  const handleAddDirectory = () => {
    let fileName: string | null = null;
    let isUnique = false;
    while (!fileName || !isUnique) {
      fileName = window.prompt("Enter the name of the new directory:");
      if (fileName === null) return;
      isUnique = isFileNameUnique(fileName);
      if (!isUnique) {
        alert(
          "An item with the same name already exists. Please choose a different name."
        );
      }
    }

    addDirectory(fileName);
  };

  const handleItemClick = (item: Item) => {
    setCurrentItem(item);
  };

  const handleSelectItem = (item: Item) => {
    selectItem(item);
  };

  const handleDeleteItem = (item: Item) => {
    if (confirm("Are you sure? This cannot be undone.")) {
      deleteItem(item);
    }
  };

  const handleRenameItem = (item: Item, index: number) => {
    const newName = window.prompt("Enter the new name:");
    if (newName === null) return;
    updateChildName(newName, index);
  };

  return (
    <div>
      <button onClick={handleAddNote}>New Note</button>
      <button onClick={handleAddDirectory}>New Directory</button>
      <table className="dirSection">
        <tbody>
          {directory.items?.map((childItem, index) => (
            <tr className="dirItem" key={index}>
              <td onClick={() => handleItemClick(childItem)}>
                {childItem.type == "directory" && <DirectoryIcon />}
                {childItem.type == "note" && <NoteIcon />} {childItem.name}
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(
                    getFilePath(childItem).join("/")
                  )}
                  onChange={() => handleSelectItem(childItem)}
                />
              </td>
              <td>
                <button onClick={() => handleRenameItem(childItem, index)}>
                  Edit Item Name
                </button>
              </td>
              <td>
                <button onClick={() => handleDeleteItem(childItem)}>
                  Delete Item
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DirectoryView;
