import React from "react";
import Image from "next/image";
import directoryIconSvg from "../assets/folder-solid.svg";

const DirectoryIcon = ({ ...otherProps }) => (
  <Image
    {...otherProps}
    src={directoryIconSvg}
    alt="Directory Icon"
    width={16}
    height={16}
  />
);

export default DirectoryIcon;
