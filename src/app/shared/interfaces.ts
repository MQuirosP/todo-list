export interface Task {
    title: string;
    completed: boolean;
    date: Date;
}

export interface AppState {
    location: string;
    tasks: Task[];
}

