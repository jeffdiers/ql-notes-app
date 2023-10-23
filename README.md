# Quilt Labs - Notes Filesystem App Challenge

## Running the code

1. If you don’t have it please install [node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
2. Run `npm install` in the project directory.
3. Run `npm run dev` in the project directory.
4. The app should now be running on `localhost:3030` so put that into your web browser and try it out.

## Provided code

**Items**

An **Item** can be either a **Note** or a **Directory**. A **Note** is a leaf node in the filesystem and contains a string of text. A **Directory** is a node in the filesystem that can contain other **Items**. The root of the filesystem is a **Directory**.

Schema:

| **Field** | **Type**              | **Description**                                                                                     |
| --------- | --------------------- | --------------------------------------------------------------------------------------------------- |
| type      | ‘note’ \| ‘directory’ | Defines whether an Item is a Note or Directory.                                                     |
| name      | string                | The name associated with the Item.                                                                  |
| parent    | Item \| undefined     | A reference to the parent of this Item. undefined for the `root` directory.                         |
| note      | string \| undefined   | The actual notes text that the user can set for `Note` items. undefined when `type == ‘directory’`. |
| items     | Item[] \| undefined   | The items in this directory if the item is a `Directory`. undefined when `type == ‘note’`.          |

This is defined in `app/components/types.ts`.

**Components**

- `ReactApp (app/components/reactApp.tsx)` - The main component that renders the app.
- `Workspace (app/components/workspace.tsx)` - The component that renders the filesystem.
  - This component provides a `React.Context` through which child components can filesystem methods and state.
- `ItemView (app/components/workspace.tsx)` - The component which renders an individual Item.
  - This component is checks the type and renders the correct component for the Item type (Note or Directory).
- `noteView (app/components/noteView.tsx)` - The component which renders a Note.
- `directoryView (app/components/directoryView.tsx)` - The component which renders a Directory.

**React Context**

The `Workspace` component provides a `React.Context` through which child components can filesystem methods and state. This is defined in `app/components/workspace.tsx`.

| **Field**      | **Type**     | **Description**                                                                            |
| -------------- | ------------ | ------------------------------------------------------------------------------------------ |
| currentItem    | Item \| null | The current item rendered in the `Workspace`.                                              |
| setCurrentItem | Function     | Sets the current item to a different item.                                                 |
| addNote        | Function     | Creates a new note given a `fileName` and `noteText`, if the `currentItem` is a directory. |
| addDirectory   | Function     | Creates a new directory given a `newDirName`, if the `currentItem` is a directory.         |
| updateNote     | Function     | Updates the `note` text of the `currentItem`, if it is a note.                             |

**Questions**

If there are any questions or issues about the starter code, please reach out to `support@quiltlabs.ai` and we will respond ASAP. Good luck!

### Documentation Section

_Jeff Diers - 10/23/2023_

Here are some notes on tricky problems I faced, what I would want to implement if I had more time, and other notes.

**Problems I faced**

- Implementing the delete recursive function was tricky. I created a tree traversal algorithm that searched for nodes while moving down the tree. However, this approach meant finding the root node first. To address this, I needed to maintain a reference to the current node, so I added a function to traverse up the tree.

- Another challenge with the delete function was working with a deep clone to preserve the immutability of React. Instead of storing references to nodes for deletion and mutating the original state, I decided to create a deep clone of the original state and search for nodes to delete using their paths. Enforcing unique filenames within each directory allows me to ensure that each file path is unique.

**If I had more time**

- I had intended to create a test file for the delete recursive function and test it with large inputs and edge cases. This would have helped me find a more performant and fault-tolerant function for deleting items. I began the implementation but decided to move on to other tasks to save time.

- I also discovered a bug in the delete function. If you select a directory, navigate into it, and then delete, the state will revert to an older reference from the previous state. To address this, I planned to add a check in the delete function to determine if the previous item was deleted and then traverse up the tree until I reached an item that wasn't deleted.

- I would have invested more time in styling. I quickly created CSS files for each component to provide a basic style for this project. If I had more time, I would have considered implementing Tailwind CSS styling, using a BEM naming convention, or utilizing styled-components.

- Additionally, I would have focused on implementing accessibility standards and adding comprehensive testing for the entire app.

_Thank you for reviewing my challenge! I look forward to hearing feedback!_
