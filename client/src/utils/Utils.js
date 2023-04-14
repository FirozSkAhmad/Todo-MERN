import axios from "axios";
import { toast } from 'react-hot-toast'
const token = localStorage.getItem("token");

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

async function getAllToDo(setToDo) {
  try {
    const options = {
      url: `${baseUrl}/gettodo`,
      method: "GET",
      headers: {
        authorization: `${token}`,
      },
    }
    const docs = await axios(options)
    setToDo(docs.data.todoData)
  }
  catch (err) {
    console.log(err)
  }
};

async function addToDo(text, setText, setToDo) {
  try {

    if (text.length === 0) {
      toast.error("Add some Todo before click on Add button")
    }
    else {
      const options = {
        url: `${baseUrl}/save`,
        method: "POST",
        headers: {
          authorization: `${token}`,
        },
        data: { text }
      }

      await axios(options)

      toast.success("added todo sucessfully")
      getAllToDo(setToDo)
      setText("")
    }

  }
  catch (err) {
    console.log(err)
  }
};

async function updateToDo(toDoId, text, setToDo, setText, setIsUpdating) {
  try {
    const options = {
      url: `${baseUrl}/update`,
      method: "PUT",
      headers: {
        authorization: `${token}`,
      },
      data: { toDoId, text }
    }

    await axios(options)

    toast.success("updated todo sucessfully")

    setText("");
    setIsUpdating(false);
    getAllToDo(setToDo);
  }
  catch (err) {
    console.log(err)
  }
};

async function deleteToDo(_id, setToDo, isUpdating) {

  try {
    if (isUpdating) {
      toast.error("As you already clicked on the update button, update the todo before delete")
    }
    else {
      const options = {
        url: `${baseUrl}/delete`,
        method: "DELETE",
        headers: {
          authorization: `${token}`,
        },
        data: { _id }
      }

      await axios(options)

      toast.success("deleted todo sucessfully")

      getAllToDo(setToDo);
    }
  }
  catch (err) {
    console.log(err)
  }

};

export { getAllToDo, updateToDo, addToDo, deleteToDo };