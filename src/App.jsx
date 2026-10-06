import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import * as taskApi from "./services/taskApi";

function App() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadTasks() {
            try {
                setLoading(true);
                setError("");
                const data = await taskApi.getTasks();
                if (!cancelled) {
                    setTasks(data);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadTasks();

        return () => {
            cancelled = true;
        };
    }, []);

    async function handleAdd(title) {
        try {
            setError("");
            const newTask = await taskApi.createTask(title);
            setTasks((prev) => [...prev, newTask]);
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    }

    async function handleDelete(id) {
        try {
            setError("");
            await taskApi.deleteTask(id);
            setTasks((prev) => prev.filter((task) => task.id !== id));
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleToggle(task) {
        try {
            setError("");
            const updated = await taskApi.updateTask(task.id, {
                title: task.title,
                completed: !task.completed
            });
            setTasks((prev) =>
                prev.map((item) => (item.id === task.id ? { ...item, ...updated } : item))
            );
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleSaveEdit() {
        if (!editText.trim()) return;
        const current = tasks.find((task) => task.id === editingId);
        if (!current) return;

        try {
            setError("");
            const updated = await taskApi.updateTask(editingId, {
                title: editText,
                completed: Boolean(current.completed)
            });
            setTasks((prev) =>
                prev.map((task) => (task.id === editingId ? { ...task, ...updated } : task))
            );
            setEditText("");
            setEditingId(null);
        } catch (err) {
            setError(err.message);
        }
    }

    function handleStartEdit(task) {
        setEditText(task.title);
        setEditingId(task.id);
    }

    function handleCancelEdit() {
        setEditText("");
        setEditingId(null);
    }

    return (
        <div className="app">
            <Header title="Task Manager" subtitle="welcome to the jungle" />

            <TaskForm onAdd={handleAdd} />

            <TaskList
                tasks={tasks}
                loading={loading}
                error={error}
                editingId={editingId}
                editText={editText}
                onChangeEdit={setEditText}
                onStartEdit={handleStartEdit}
                onCancelEdit={handleCancelEdit}
                onSaveEdit={handleSaveEdit}
                onToggle={handleToggle}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default App;
