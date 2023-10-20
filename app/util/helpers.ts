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
