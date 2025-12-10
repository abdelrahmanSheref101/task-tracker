import { useState } from "react";
import { addTask } from "../services/taskServices"

export default function TaskForm() {
        const [hideForm, setHideForm] = useState(true);

        //when it's a button : i want it stuck to right bottom of the screen (not just the spaned screen)
        //when it's a form : make overflow all components with blurely transparent background , also appropiately place it and style it

        if (!hideForm)
                return (
                        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                                <form onSubmit={e => {
                                        e.preventDefault();
                                        const formData = Object.fromEntries(new FormData(e.currentTarget)) as { name: string };
                                        addTask(formData.name);
                                        setHideForm(true);
                                }
                                } className="bg-gray-800 p-6 rounded-lg shadow-xl w-96">
                                        <h1 className="text-xl font-semibold text-white mb-4">Add a new task</h1>
                                        <input name="name" placeholder="enter task name" required className="w-full h-10 px-3 mb-4 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400" />

                                        {/* <select value={newTask.status} onChange={e => newTask.status = e.target.value}> */}
                                        {/*         <option value="open">open</option> */}
                                        {/*         <option value="closed">closed</option> */}
                                        {/* </select> */}
                                        <div className="flex gap-2">
                                                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">Add Task</button>
                                                <button type="button" onClick={() => setHideForm(true)} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors">Cancel</button>
                                        </div>
                                </form>
                        </div>
                )
        else
                return (
                        <button onClick={() => setHideForm(false)} className="fixed bottom-6 right-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors z-40">
                                Add a new task
                        </button>
                )
}

