import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Todo from './components/Todo';
import RecommendedSong from "./components/RecommendedSong";

import './App.css';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';


function YourSongs() {
  const navigate = useNavigate();
  var startingData = [];
  const [Loading, setLoading] = useState(false);

  if (localStorage.getItem("songs")) {
    startingData = JSON.parse(localStorage.getItem("songs"))["data"];
  }

  const [tasks, setTasks] = useState(startingData);

  const [SongInput, setSongInput] = useState("");
  const [error, setError] = useState(null); // Added error state
  const [Subtopics, setSubtopics] = useState(null);
  const [Topics, setTopics] = useState(null);
  const [Recommended, setRecommended] = useState(null);


  const handleSongChange = (e) => {
    setSongInput(e.target.value);
  };

  const getRecommendations = async (e) => {
    navigate("/recommendations");
  };


  const handleSubmit = async (e) => {
    if (SongInput !== "") {
      e.preventDefault();

      const newTask = {
        name: SongInput,
        completed: false,
      };

      setTasks([newTask]);

      updateLocalStorage([newTask]);
      getRecommendations();
    }
  };

  const updateLocalStorage = (newData) => {
    localStorage.setItem("songs", JSON.stringify({ data: newData }));
  };

  const handleComplete = (index) => {
    const newTasks = [...tasks];
    if (newTasks[index].completed === false) {
      newTasks[index].completed = true;
    } else {
      newTasks[index].completed = false;
    }
    setTasks(newTasks);
    updateLocalStorage(newTasks);
  };

  const handleRemove = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    updateLocalStorage(newTasks);
  };

  const handleRemoveAll = () => {
    setTasks([]);
    updateLocalStorage([]);
  };

  return (
    <div className="App">
      {Loading ? (
        <div className="Spinner-container">
          <Button variant="dark" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="danger"
              aria-hidden="true"
            />
            Loading
          </Button>
        </div>
      ) : (
        <>
          <Form
            SongInput={SongInput}
            handleSongChange={handleSongChange}
            handleSubmit={handleSubmit}
          />
          {/* <Todo
            getRecommendations={getRecommendations}
            tasks={tasks}
            handleComplete={handleComplete}
            handleRemove={handleRemove}
            handleRemoveAll={handleRemoveAll}
          />  */}
          
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default YourSongs;