import React, { useContext, useCallback } from "react";
import NoteView from "./noteView";
import DirectoryView from "./directoryView";
import { WorkspaceContext, Item } from "../containers/workspace";

import _ from "lodash";

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
    <div>
      <h2>Current Item: {item.name}</h2>
      <h3>Type: {item.type}</h3>
      <span>Path: /{getFilePath(item).join("/")}</span>
      <div className="item">
        {item.parent != null && (
          <button onClick={goToEnclosingFolder}>Previous Directory</button>
        )}
        {selectedItems.length > 0 && (
          <button onClick={handleDeleteSelected}>Delete Selected</button>
        )}
        {item.type == "directory" && <DirectoryView directory={item} />}
        {item.type == "note" && <NoteView note={item} />}
      </div>
    </div>
  );
};

export default ItemView;
