import Image from "next/image";
import DirectoryIconSvg from "../assets/folder-solid.svg";

const DirectoryIcon = () => (
  <Image src={DirectoryIconSvg} alt="Directory Icon" width={16} height={16} />
);

export default DirectoryIcon;
