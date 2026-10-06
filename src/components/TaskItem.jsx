function TaskItem({
    task,
    isEditing,
    editText,
    onChangeEdit,
    onStartEdit,
    onCancelEdit,
    onSaveEdit,
    onToggle,
    onDelete
}) {
    if (isEditing) {
        return (
            <li className="task-item">
                <div className="edit-area">
                    <input
                        type="text"
                        value={editText}
                        onChange={(event) => onChangeEdit(event.target.value)}
                    />
                    <button className="secondary" type="button" onClick={onCancelEdit}>
                        Cancel
                    </button>
                    <button type="button" onClick={onSaveEdit}>
                        save
                    </button>
                </div>
            </li>
        );
    }

    return (
        <li className={task.completed ? "task-item completed" : "task-item"}>
            <div className="task-content">
                <span>{task.title}</span>
            </div>
            <div className="task-actions">
                <button className="secondary" type="button" onClick={() => onStartEdit(task)}>
                    edit
                </button>
                <button className="secondary" type="button" onClick={() => onToggle(task)}>
                    {task.completed ? "completed" : "pending"}
                </button>
                <button className="danger" type="button" onClick={() => onDelete(task.id)}>
                    Delete
                </button>
            </div>
        </li>
    );
}

export default TaskItem;
