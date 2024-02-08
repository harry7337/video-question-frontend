import React, { useState, useEffect } from 'react';
import RecommendedSong from './components/RecommendedSong';
import './App.css';
import axios from 'axios';
import { CancelToken } from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import { Button, Spinner } from 'react-bootstrap';

import 'react-toastify/dist/ReactToastify.css';

const POST_REQ_TIMEOUT = 60000;


 function YourSongs() {
   const [loading, setLoading] = useState(true); // Added loading state
   const [error, setError] = useState(null); // Added error state

   useEffect(() => {
     if (
       !Recommended &&
       JSON.parse(localStorage.getItem("songs"))["data"].length > 0
     ) {
       refreshRecommendations();
     }
   }, []);

   const updateLocalStorage = (newData) => {
     localStorage.setItem("recommendations", JSON.stringify({ data: newData }));
   };

   const refreshRecommendations = async (e) => {
     setLoading(true); // Set loading state to true before making the request
     setError(null); // Reset error state before making the request

     const startingData = JSON.parse(localStorage.getItem("songs"))["data"];
     try {
      console.log(
        "ENV VAR in recommendations.js",
        process.env.REACT_APP_BACKEND_API_URL
      );
      const source = CancelToken.source();
      const timeout = setTimeout(() => {
        source.cancel();
        // Timeout Logic
      }, POST_REQ_TIMEOUT);
       const { data } = await axios.post(
         process.env.REACT_APP_BACKEND_API_URL + "/prediction",
         {
           song_list: startingData,
         },
         { cancelToken: source.token }
       );

       for (var i = 0; i < data.data.length; i++) {
         data.data[i]["completed"] = false;
       }

       updateLocalStorage(data.data);

       setRecommended(data.data);
       clearTimeout(timeout);
     } catch (error) {
       console.error("Error fetching recommendations:", error);
       setError("Error fetching recommendations"); // Set error state with the error message
     } finally {
       setLoading(false); // Set loading state to false regardless of success or failure
     }
   };

   const [Recommended, setRecommended] = useState(null);
   const handleComplete = (index) => {
     const newTasks = [...Recommended];
     if (newTasks[index].completed === false) {
       newTasks[index].completed = true;
     } else {
       newTasks[index].completed = false;
     }
     setRecommended(newTasks);
     updateLocalStorage(newTasks);
   };

   const handleRemove = (index) => {
     const newTasks = [...Recommended];
     newTasks.splice(index, 1);
     setRecommended(newTasks);
     updateLocalStorage(newTasks);
   };

   const handleRemoveAll = () => {
     setRecommended([]);
     updateLocalStorage([]);
   };

   if (JSON.parse(localStorage.getItem("songs"))["data"].length == 0) {
     return (
       <>
         <div className="Spinner-container">
           <Button variant="dark" disabled>
             <Spinner
               as="span"
               animation="grow"
               size="sm"
               role="danger"
               aria-hidden="true"
             />
             <Spinner
               as="span"
               animation="grow"
               size="sm"
               role="danger"
               aria-hidden="true"
             />
             No songs in your list to give recommendations for...
           </Button>
         </div>
       </>
     );
   }

   if (error) {
     console.log("No recommendations");
     return (
       <div className="App">
         <Button variant="dark" disabled>
           {loading ? "Loading..." : error || "No recommendations"}
         </Button>
         <ToastContainer />
       </div>
     );
   }

   return (
     <div className="App">
       <RecommendedSong
         tasks={Recommended}
         handleComplete={handleComplete}
         handleRemove={handleRemove}
         handleRemoveAll={handleRemoveAll}
       />
       <ToastContainer />
     </div>
   );
 }

export default YourSongs;