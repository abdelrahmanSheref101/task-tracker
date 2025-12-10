import type { TaskType } from "../types/taskType"
import Task from "./Task"


export default function Dashboard({ tasks }: { tasks: (TaskType & { id: string })[] }) {

        //just make sure there's an appropiate space between each and takes the full size
        return (

                <ul className="w-full space-y-4">
                        {tasks.map(task => {
                                return (
                                        <Task task={task} key={task.id} />
                                )
                        })}
                </ul>
        )
}

