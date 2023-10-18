import React, { useState, useContext, useCallback } from 'react';
import { Item } from './types';
import NoteView from './noteView';
import DirectoryView from './directoryView';

import _ from 'lodash';

import '../styles/workspace.css'


function ItemView(item: Item) {
    const { setCurrentItem } = useContext(WorkspaceContext);

    const goToEnclosingFolder = useCallback(() => {
        if (item.parent == null) {
            alert('Cannot go to enclosing folder.');
            return;
        }

        setCurrentItem(item.parent);
    }, [item, setCurrentItem]);
    
    return (
        <div>
            <h2>Current Item: {item.name}</h2>
            <h3>Type: {item.type}</h3>
            <div className="item">
                {item.parent != null && <button onClick={goToEnclosingFolder}>Previous Directory</button>}
                {item.type == 'directory' && (
                    <DirectoryView directory={item} />
                )}
                {item.type == 'note' && (
                    <NoteView note={item} />
                )}
            </div>
        </div>
    );
}


interface WorkspaceContextProps {
    currentItem: Item | null;
    setCurrentItem: (item: Item) => void;
    addNote: (fileName: string, noteText: string) => void;
    addDirectory: (newDirName: string) => void;
    updateNote: (newText: string) => void;
}

export const WorkspaceContext = React.createContext<WorkspaceContextProps>({
    currentItem: null,
    setCurrentItem: (item: Item) => {},
    addNote: (fileName: string, noteText: string) => {},
    addDirectory: (newDirName: string) => {},
    updateNote: (newText: string) => {},
});

export function Workspace() {
    const [currentItem, setCurrentItem] = useState<Item>({
        name: 'root',
        type: 'directory',
        items: [],
    });

    const addNote = useCallback((fileName: string, noteText: string) => {
        setCurrentItem(prevItem => {
            // Deep clone the item
            const newItem = _.cloneDeep(prevItem);
            if (newItem.type === 'directory') {
                const newNote: Item = {
                    type: 'note',
                    name: fileName,
                    note: noteText,
                    parent: newItem,
                };
                newItem.items = newItem.items ? [...newItem.items, newNote] : [newNote];
            }
            return newItem;
        });
    }, []);
    
    const addDirectory = useCallback((newDirName: string) => {
        setCurrentItem(prevItem => {
            // Deep clone the item
            const newItem = _.cloneDeep(prevItem);
            if (newItem.type === 'directory') {
                const newDir: Item = {
                    type: 'directory',
                    name: newDirName,
                    items: [],
                    parent: newItem,
                };
                newItem.items = newItem.items ? [...newItem.items, newDir] : [newDir];
            }
            return newItem;
        });
    }, []);
    

    const updateNote = useCallback((newText: string) => {
        setCurrentItem(prevItem => {
            const newItem = _.cloneDeep(prevItem);
            if (prevItem.type === 'note') {
                newItem.note = newText;
            }
            return newItem;
        });
    }, []);

    return (
        <div className="workspace">
            <WorkspaceContext.Provider value={{ currentItem, setCurrentItem, addNote, addDirectory, updateNote }}>
                <ItemView {...currentItem} />
            </WorkspaceContext.Provider>
        </div>
    );
}