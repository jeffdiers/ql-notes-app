import { FC, ButtonHTMLAttributes } from "react";

import "../styles/button.css";

export enum BUTTON_TYPE_CLASSES {
  base = "base",
  inverted = "inverted",
  danger = "danger",
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): string =>
  ({
    [BUTTON_TYPE_CLASSES.base]: "base",
    [BUTTON_TYPE_CLASSES.inverted]: "base inverted",
    [BUTTON_TYPE_CLASSES.danger]: "base danger",
  }[buttonType]);

export type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, buttonType, ...otherProps }) => {
  const customButtonClassName = getButton(buttonType);
  return (
    <button className={customButtonClassName} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
