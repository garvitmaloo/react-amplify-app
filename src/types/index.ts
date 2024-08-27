import { ReactElement } from "react";

export type ChildrenProps = {
  children: ReactElement;
};

export type PolaroidData = {
  title: string;
  date: string;
  file?: File;
};

export * from "./props";
export * from "./redux";
