import { ReactNode } from "react";

export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TSidebarItem = {
  key: string;
  label: ReactNode;
  children?: TSidebarItem[];
}| undefined;


export type TUserPaths = {
  name?: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPaths[];
};