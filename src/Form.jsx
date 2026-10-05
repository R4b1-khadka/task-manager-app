import {useState} from 'react';


function Form(){
    const [task,setTask]= useState([])
    const [title, setTitle] = useState('')
    const [editingId, setEditingId]=useState(null);
    const [editText, setEditText]= useState("");

       function handleDelete(currentId){
        
        setTask(task.filter(tk=>tk.id !==currentId))

    }
    function startEdit(tk){
        setEditText(tk.title);
        setEditingId(tk.id);
    }
    function saveEdit(){
      if(!editText.trim()) return;
      setTask(task.map(tk=> tk.id===editingId ? {...tk , title: editText} : tk ))

      setEditText("");
      setEditingId(null);
    }
    function handleToggle(togId){
        setTask(
            task.map(tk=>tk.id===togId ? {...tk, completed: !tk.completed} : tk)
        );
    }
    function handleFrom(event){
        event.preventDefault();
        if(!title.trim()) return;
        const newTask= {
            id: crypto.randomUUID(),
            completed: false,
            title
        }

        setTask([...task, newTask])
       
        setTitle("")
    }

    return(
        <>
            <form onSubmit={handleFrom}>
                <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}></input>
                <button type="submit">add task</button>
            </form>
            <ol>
                {task.map((tk) => (
                    <li key={tk.id}>
                        {editingId === tk.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(event) => setEditText(event.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditText("");
                                        setEditingId(null);
                                    }}
                                >
                                    Cancel
                                </button>
                                <button type="button" onClick={() => saveEdit(tk.id)}>save</button>
                            </>
                        ) : (
                            <>
                                {tk.title}
                                <button type="button" onClick={() => startEdit(tk)}>edit</button>
                                <button type="button" onClick={() => handleToggle(tk.id)}>
                                    {tk.completed ? "completed" : "pending"}
                                </button>
                                <button type="button" onClick={() => handleDelete(tk.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </>
    )
      
    }
  
    export default Form
    
  