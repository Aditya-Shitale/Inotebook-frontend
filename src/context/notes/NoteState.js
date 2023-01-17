// import react from "react";
import { useState } from "react";
import NoteContext from "./noteContext";
import { useNavigate } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";

const NoteState = (props) => {
  const host = "https://zany-erin-coati-wear.cyclic.app";
  const navigate=useNavigate();
  const notesInitial = [];
// const AUTH_TOKEN= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyNGMxY2Y0NDc4MWRhOGU5ZWEwYzlmIn0sImlhdCI6MTY2MzQyODQ2Nn0.W6FxekqLphyd4G73V6LyYCY8uEFh2YKA71rF8Df4fws";
const AUTH_TOKEN= localStorage.getItem("token");
  const [notes, setNotes] = useState(notesInitial);

  //Get all notes
  const getNotes = async () => {
    if(AUTH_TOKEN){
      // console.log(AUTH_TOKEN);
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
  
        headers: {
          "Content-Type": "application/json",
          "auth-token": AUTH_TOKEN  ,    },
      });
  
      const json = await response.json();
      // console.log(json);
      setNotes(json);
    }else{
  navigate('/login',{replace:true})
    }
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": AUTH_TOKEN      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json= await response.json();
    console.log(json);
    

    console.log("add a note");

    const note = json;
    if(title!==""&&description!==""){
      setNotes(notes.concat(note)); //we wrote notes.push() first but we cant use it because concar returns an array whereas push updates an array
    }
  };

  //Delete a note
  const deleteNote = async (id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": AUTH_TOKEN      },
    });
    const json = response.json();
    console.log(json);

    // console.log("Delete a note with its ID" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //update a note
  const editNote = async (id, title, description, tag) => {
    //API call we pasted this function from developer mozilla by searching fetch with headers
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": AUTH_TOKEN      },

      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json =await response.json();
    console.log(json);

    const newNotes= JSON.parse(JSON.stringify(notes))  //creates a deep copy of the give notes
    //Logic to edit client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }

    }
    setNotes(newNotes);
  };

  return (
    // <BrowserRouter>
    <NoteContext.Provider  value={{ notes, addNote, deleteNote, editNote, getNotes }}  >
      {props.children}
    </NoteContext.Provider>
      // </BrowserRouter>
  );
};
export default NoteState;
