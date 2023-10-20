import Image from "next/image";
import NoteIconSvg from "../assets/file-lines-solid.svg";

const NoteIcon = () => (
  <Image src={NoteIconSvg} alt="Note Icon" width={16} height={16} />
);

export default NoteIcon;
