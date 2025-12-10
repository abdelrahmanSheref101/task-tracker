import "./index.css";
import { useEffect, useState } from "react";
import type { TaskType } from "./types/taskType";
import { listenTasks } from "./services/taskServices";
import SearchFilter from "./components/SearchFilter";
import Dashboard from "./components/Dashboard";
import TaskForm from "./components/TaskForm";

function App() {
        const [tasks, setTasks] = useState<(TaskType & { id: string })[]>([]);
        // allow undefined => means "all tasks"
        const [statusFilter, setStatusFilter] = useState<TaskType["status"] | "all">("all");
        const [search, setSearch] = useState("");

        useEffect(() => {
                // listenTasks should be synchronous and return unsub function
                const unsub = listenTasks(statusFilter, (newTasks) => {
                        console.log("new tasks here:", newTasks);
                        setTasks(newTasks);
                });

                return () => {
                        try {
                                unsub();
                        } catch (error) {
                                console.warn("Error unsubscribing:", error);
                        }
                };
        }, [statusFilter]);

        const shownTasks = tasks.filter((task) =>
                task.name.toLowerCase().includes(search.trim().toLowerCase())
        );



        //center components with margin from right and left (achieve that with grids)
        //div.container : should be like a grid of 12 and all childeren spans for 10 cols leting one col on each side
        //overall theme is dark

        return (
                <div id="container" className="min-h-screen bg-gray-800 text-white grid grid-cols-12 gap-4 p-4">
                        <div className="col-span-10 col-start-2">

                                <h1>TASK tracker app </h1>

                                <SearchFilter

                                        onChangeHandler={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                setSearch(event.target.value)
                                        }

                                        onChangeFilter={(event: React.ChangeEvent<HTMLSelectElement>) =>
                                                setStatusFilter(event.target.value as TaskType["status"])
                                        }
                                />

                                <Dashboard tasks={shownTasks} />
                                <TaskForm />
                        </div>

                </div>
        );
}

export default App;

