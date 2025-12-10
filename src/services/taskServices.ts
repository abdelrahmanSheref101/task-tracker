import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore"
import type { QuerySnapshot, DocumentData, Unsubscribe } from "firebase/firestore";



import { db } from "../config/firebase"
import type { TaskType } from "../types/taskType"


export async function addTask(name: string): Promise<string> {

        //simple validation
        if (!name.trim())
                throw new Error("name is required");

        const task: TaskType = {
                name,
                status: "open",
                createdAt: serverTimestamp() as any,
        };

        const ref = await addDoc(collection(db, "tasks"), task);

        return ref.id;
}


// export function listenTasks(status, onUpdate) {
//         const colRef = collection(db, "tasks");
//         const unsub = onSnapshot(
//                 colRef,
//                 (snap) => {
//                         const tasks = snap.docs.map(d => ({ id: d.id, ...(d.data()) }));
//                         onUpdate(tasks);
//                 },
//                 (err) => console.error("onSnapshot error (bare):", err)
//         );
//         return unsub;
// }
//


export function listenTasks(
        status: TaskType["status"] | "all" | undefined,
        onUpdate: (tasks: (TaskType & { id: string })[]) => void
): Unsubscribe {

        const constraints: any[] = [orderBy("createdAt", "desc")];

        if (status && status !== "all") constraints.unshift(where("status", "==", status));

        console.log("constraints ::", constraints);


        const q = query(collection(db, "tasks"), ...constraints);



        const unsubscribe = onSnapshot(
                q,
                (snapshot: QuerySnapshot<DocumentData>) => {
                        const tasks = snapshot.docs.map((d) => {
                                const data = d.data() as TaskType;
                                return {
                                        id: d.id,
                                        name: data.name,
                                        status: data.status,
                                        createdAt: data.createdAt ?? null,
                                } as TaskType & { id: string };
                        });

                        console.log("got tasks:", tasks);
                        onUpdate(tasks);
                },
                (err) => {
                        // <-- IMPORTANT: shows actual error from the Listen RPC
                        console.error("onSnapshot error:", err);
                }
        );

        return unsubscribe; // synchronous unsubscribe function
}











// export async function listenTasks(
//         status?: Task["status"],
//         onUpdate: (tasks: (Task & { id: string })[]) => void // onUpdate is the ui triger (taks array )
//
// ) {
//
//         console.log("status :", status);
//         console.log("onUpdate :", onUpdate);
//
//         const constraints: any[] = [
//                 orderBy("createdAt", "desc")
//         ];
//         if (status)
//                 constraints.unshift(where("status", "==", status));
//
//
//         const qry = query(collection(db, "tasks"),
//                 ...constraints
//         );
//
//         console.log("constraints :: ", constraints);
//         console.log("query :", qry);
//
//
//
//         const usup = onSnapshot(
//                 qry, (snapshot: QuerySnapshot<DocumentData>) => {
//
//
//                         const tasks = snapshot.docs.map(doc => {
//                                 const data: Task = doc.data() as Task;
//                                 return {
//                                         id: doc.id,
//                                         name: data.name,
//                                         status: data.status,
//                                         createdAt: data.createdAt ?? null,
//
//                                 } as Task & { id: string };     // asserting that the type of the produced opject will be task and id
//                         });
//
//                         console.log("yay  we got the tasks:", tasks);
//
//                         onUpdate?.(tasks);
//                 });
//
//         console.log("usup :: ", usup);
//
//         return usup;
// }

export async function updateTaskStatus(id: string, status: TaskType["status"]): Promise<void> {
        //refernce to the doc itself
        const ref = doc(db, "tasks", id);
        await updateDoc(ref, { status });
}



export async function deleteTask(id: string): Promise<void> {
        console.log("the  deleted task id :: ", id);
        await deleteDoc(doc(db, "tasks", id));
}


