import TaskItem from "./TaskItem";

function TaskList({
    tasks,
    loading,
    error,
    editingId,
    editText,
    onChangeEdit,
    onStartEdit,
    onCancelEdit,
    onSaveEdit,
    onToggle,
    onDelete
}) {
    return (
        <section>
            {error && <p className="empty">{error}</p>}

            {loading ? (
                <p className="empty">Loading...</p>
            ) : tasks.length === 0 ? (
                <p className="empty">No tasks yet. Add one above.</p>
            ) : (
                <ol className="task-list">
                    {tasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            isEditing={editingId === task.id}
                            editText={editText}
                            onChangeEdit={onChangeEdit}
                            onStartEdit={onStartEdit}
                            onCancelEdit={onCancelEdit}
                            onSaveEdit={onSaveEdit}
                            onToggle={onToggle}
                            onDelete={onDelete}
                        />
                    ))}
                </ol>
            )}
        </section>
    );
}

export default TaskList;
