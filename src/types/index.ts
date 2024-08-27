import { ReactElement } from "react";

export type ChildrenProps = {
  children: ReactElement;
};

export type PolaroidData = {
  title: string;
  date: string;
  file?: File;
};

export type PolaroidDTO = {
  title: string;
  date: string;
  image: string;
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
};

export * from "./props";
export * from "./redux";
