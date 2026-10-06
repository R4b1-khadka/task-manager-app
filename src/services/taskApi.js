const BASE_URL = "/api/tasks";

async function handleResponse(response, errorMessage) {
    if (!response.ok) {
        throw new Error(errorMessage);
    }
    return response.json();
}

export async function getTasks() {
    const response = await fetch(BASE_URL);
    return handleResponse(response, "failed to fetch tasks");
}

export async function createTask(title) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
    });
    return handleResponse(response, "failed to add task");
}

export async function updateTask(id, { title, completed }) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, completed })
    });
    return handleResponse(response, "failed to update task");
}

export async function deleteTask(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    });
    return handleResponse(response, "failed to delete task");
}
