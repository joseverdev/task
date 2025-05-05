export interface FormData{
  id: number;
  description: string;
  done: boolean;
}

export interface Task {
  id: number;
  description: string;
  done: boolean;
}


export interface DeleteEvent extends React.MouseEvent<HTMLButtonElement> {
  currentTarget: HTMLButtonElement & {
    dataset: {
      id: string;
    };
  };
}