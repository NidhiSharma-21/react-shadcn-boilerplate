
import React from "react";
import type { ContainerProps } from "../types/container";

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => (
  <div className={`w-full max-w-md mt-8 md:mt-0 ${className}`}>
    {children}
  </div>
);

export default Container;
