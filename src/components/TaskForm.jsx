import { useState } from "react";

function TaskForm({ onAdd }) {
    const [title, setTitle] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        const trimmed = title.trim();
        if (!trimmed) return;

        const added = await onAdd(trimmed);
        if (added) {
            setTitle("");
        }
    }

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                placeholder="What needs to be done?"
                onChange={(event) => setTitle(event.target.value)}
            />
            <button type="submit">add task</button>
        </form>
    );
}

export default TaskForm;
