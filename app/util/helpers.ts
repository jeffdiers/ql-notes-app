import { Item } from "../components/types";

// Helper function to get file path of an item
export const getFilePath = (item: Item): string[] => {
  if (item.parent == null) return [item.name];
  return [...getFilePath(item.parent), item.name];
};

// Helper function to delete nodes recursively
export const deleteItemsRecursively = (
  item: Item,
  filePath: string[],
  pathsToDelete: string[]
) => {
  if (!item) return null;
  if (pathsToDelete.includes(filePath.join("/"))) {
    // Delete the node
    return null;
  }
  if (item.type === "directory" && item.items) {
    // Recursively delete nodes in the 'items' array
    item.items = item.items.filter(
      (childNode) =>
        deleteItemsRecursively(
          childNode,
          [...filePath, childNode.name],
          pathsToDelete
        ) !== null
    );
  }
  return item;
};

// Helper function to insert a new item at the correct position
export const insertItemSorted = (
  items: Item[] | undefined,
  itemToInsert: Item
): Item[] => {
  // If the items array is empty, return the item to insert
  if (!items) return [itemToInsert];

  // Split the items into directories and notes
  const directories = items.filter((item) => item.type === "directory");
  const notes = items.filter((item) => item.type === "note");

  switch (itemToInsert.type) {
    case "directory":
      // If the item to insert is a directory, insert it into the directories array alphabetically
      const insertDirectoryIndex = directories.findIndex(
        (item) => item.name.localeCompare(itemToInsert.name) > 0
      );
      insertDirectoryIndex === -1
        ? directories.push(itemToInsert)
        : directories.splice(insertDirectoryIndex, 0, itemToInsert);

      break;
    case "note":
      // If the item to insert is a directory, insert it into the directories array alphabetically
      const insertNoteIndex = notes.findIndex(
        (item) => item.name.localeCompare(itemToInsert.name) > 0
      );
      insertNoteIndex === -1
        ? notes.push(itemToInsert)
        : notes.splice(insertNoteIndex, 0, itemToInsert);

      break;
  }

  // Concatenate the sorted arrays with directories first
  return [...directories, ...notes];
};
