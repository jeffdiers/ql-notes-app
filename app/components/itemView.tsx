import React, { useContext, useCallback } from "react";
import NoteView from "./noteView";
import DirectoryView from "./directoryView";
import { WorkspaceContext, Item } from "../containers/workspace";
import Button, { BUTTON_TYPE_CLASSES } from "./button";

import "../styles/itemView.css";

import { getFilePath } from "../util/helpers";

const ItemView = (item: Item) => {
  const {
    setCurrentItem,
    selectedItems,
    deleteSelectedItems,
    setSelectedItems,
  } = useContext(WorkspaceContext);

  const goToEnclosingFolder = useCallback(() => {
    if (item.parent == null) {
      alert("Cannot go to enclosing folder.");
      return;
    }

    setCurrentItem(item.parent);
  }, [item, setCurrentItem]);

  const handleDeleteSelected = () => {
    if (confirm("Are you sure? This cannot be undone.")) {
      deleteSelectedItems();
      setSelectedItems([]);
    }
  };

  return (
    <div className="item-view">
      <div className="item-view-header">
        <div className="item-view-title">
          <h2>Current Item: {item.name}</h2>
          <h3>Type: {item.type}</h3>
          <span>Path: /{getFilePath(item).join("/")}</span>
        </div>
        <div className="item-view-buttons">
          {item.parent != null && (
            <Button onClick={goToEnclosingFolder}>Previous Directory</Button>
          )}
          {selectedItems.length > 0 && (
            <Button
              buttonType={BUTTON_TYPE_CLASSES.danger}
              onClick={handleDeleteSelected}
            >
              Delete Selected
            </Button>
          )}
        </div>
      </div>
      <div className="item">
        {item.type == "directory" && <DirectoryView directory={item} />}
        {item.type == "note" && <NoteView note={item} />}
      </div>
    </div>
  );
};

export default ItemView;
