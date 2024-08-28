/* eslint-disable no-unused-vars */

import { PolaroidData } from "./index";

export type EmailInput = {
  handleChange: (value: string) => void;
  ref: React.RefObject<HTMLInputElement>;
};

export type PasswordInput = {
  handleChange: (value: string) => void;
  ref: React.RefObject<HTMLInputElement>;
};

export type NewPolaroidFormComponent = {
  onSubmit: (value: PolaroidData) => void;
};

export type PolaroidComponent = {
  title: string;
  date: string;
  image: string;
  id: string;
};

export type Snackbar = {
  message: string;
  onClose: () => void;
  hideAfterTime?: number;
};
