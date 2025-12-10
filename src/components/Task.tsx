import { Timestamp } from "firebase/firestore";
import { deleteTask, updateTaskStatus } from "../services/taskServices";
import type { TaskType } from "../types/taskType";

export default function Task({ task }: { task: (TaskType & { id: string }) }) {

        function handleChangeStatus(event: React.ChangeEvent<HTMLSelectElement>) {
                const newStatus = event.target.value;


                if (newStatus !== "open" && newStatus !== "closed")
                        throw new Error("inHTMLSelectElementvalid status");


                updateTaskStatus(task.id, newStatus);
        }

        function handleDelete() {
                console.log("handling deleting");
                deleteTask(task.id);
        }

        //this component should be card like
        //make the h1 and task.status appropiate sizes
        //make the status dive padge like
        // style rest of the component appropiately

        let date = task.createdAt instanceof Timestamp ? task.createdAt.toDate().toLocaleString() : task.createdAt;

        return (
                <li className="bg-gray-800 rounded-lg p-4 shadow-md">
                        <div className="flex justify-between items-start mb-3">
                                <div>
                                        <h1 className="text-xl font-semibold text-white mb-2">
                                                {task.name}

                                        </h1>
                                        <div className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${task.status === 'open'
                                                ? 'bg-green-600 text-white'
                                                : 'bg-red-600 text-white'
                                                }`}>
                                                {task.status}
                                        </div>
                                </div>

                                <div className="text-gray-400 text-sm">
                                        {date?.toString()}
                                </div>
                        </div>
                        <div className="flex justify-end gap-2">
                                <button onClick={handleDelete} className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors">delete</button>

                                <select value={task.status} onChange={e => handleChangeStatus(e)} className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white">
                                        <option value="open">open</option>
                                        <option value="closed">closed</option>
                                </select>
                        </div>
                </li >
        )
}

