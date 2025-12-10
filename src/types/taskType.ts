import type { Timestamp } from "firebase/firestore";

export type TaskStatus = "open" | "closed";

export interface TaskType {
        name: string;
        status: TaskStatus;
        createdAt?: Timestamp | Date | null;
}

