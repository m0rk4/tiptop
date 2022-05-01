export interface Board {
  id?: string;
  title?: string;
  priority?: number;
  tasks?: Task[];
}

export interface Task {
  id?: string;
  priority?: number;
  name?: string;
  description?: string;
  label?: Color;
}

export type Color = 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';
