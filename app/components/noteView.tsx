import React, { useState, useContext, ChangeEventHandler } from "react";
import { WorkspaceContext, Item } from "../containers/workspace";
import Button from "./button";

import "../styles/note.css";

interface NoteViewProps {
  note: Item;
}

const NoteView: React.FC<NoteViewProps> = ({ note }) => {
  const { updateNote } = useContext(WorkspaceContext);
  const [text, setText] = useState(note.note);

  const handleNoteChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setText(event.target.value);
  };

  const handleNoteSubmit = () => {
    if (text == null) {
      alert("Cannot save empty note.");
      return;
    }

    updateNote(text);
  };

  return (
    <div className="noteSection">
      <div>
        <textarea
          className="note-textarea"
          value={text}
          onChange={handleNoteChange}
        />
        <Button onClick={handleNoteSubmit}>Save</Button>
      </div>
    </div>
  );
};

export default NoteView;
