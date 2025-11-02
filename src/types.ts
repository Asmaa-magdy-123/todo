import type { ReactNode } from "react";

export interface ModalProps{
    children: ReactNode,
    onClose:()=> void,
    theme:string,
}

export interface Task {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  desc:string;
  priority:string;
  date: Date;

}

export interface newTaskType {
  userId: number;
  id: number;
  title: string;
  desc:string;
  priority:string;
  date: Date;
  completed: boolean;
}