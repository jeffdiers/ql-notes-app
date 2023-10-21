import React from "react";
import Image from "next/image";
import noteIconSvg from "../assets/file-lines-solid.svg";

const NoteIcon = ({ ...otherProps }) => (
  <Image
    {...otherProps}
    src={noteIconSvg}
    alt="Note Icon"
    width={16}
    height={16}
  />
);

export default NoteIcon;
