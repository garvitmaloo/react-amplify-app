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
