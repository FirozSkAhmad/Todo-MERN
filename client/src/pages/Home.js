import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Todo from '../components/Todo';
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "../utils/Utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
    const [toDo, setToDo] = useState([]);
    const [text, setText] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [toDoId, setToDoId] = useState("");

    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    useEffect(() => {
        getAllToDo(setToDo);
    }, []);


    const updateMode = (_id, text) => {
        setIsUpdating(true);
        setText(text);
        setToDoId(_id);
    };

    return (
        <div className="App">
            <div className="dash-container">
                <h1>Hello {localStorage.getItem("name")} </h1>

                <div className="dash-top">
                    <input
                        type="text"
                        placeholder="Add ToDos..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <div
                        className="add"
                        onClick={
                            isUpdating
                                ? () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating)
                                : () => addToDo(text, setText, setToDo)
                        }
                    >
                        {isUpdating ? "Update" : "Add"}
                    </div>
                </div>

                <div className="dash-list">
                    {toDo.map((item) => (
                        <Todo
                            key={item._id}
                            text={item.text}
                            updateMode={() => updateMode(item._id, item.text)}
                            deleteToDo={() => deleteToDo(item._id, setToDo)}
                        />
                    ))}
                </div>
                <button onClick={handleLogOut}>Log Out</button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Home
