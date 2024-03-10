import React from 'react';
import { Button, Spinner } from 'react-bootstrap';


const RecommendedSong = (props) => {

    const {  tasks,subtopics,topics, handleComplete, handleRemove, handleRemoveAll } = props


    if(!tasks){
        return <>
        <div className='Spinner-container'>
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
         </>
    }
    

    return (
      <>
        <h5 className="text-center your-recommendations-title">
          <i className="fa-solid fa-music"></i> Recommendations
        </h5>
        <div>
          <h6 className="text-center subtopics-header">
            Topics detected:
            {topics &&
              topics.map((topic, index) => (
                <li className="topic-list-items">{topic}</li>
              ))}
          </h6>
          <h6 className="text-center subtopics-header">
            Subtopics detected:
            {subtopics &&
              subtopics.map((subtopic, index) => (
                <li className="topic-list-items">{subtopic}</li>
              ))}
          </h6>
        </div>
        <ul className="todo">
          {tasks &&
            tasks.map((task, index) => (
              <li key={index}>
                <div className="checkAndTask">
                  <label className="checkContainer">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleComplete(index)}
                    />
                    <span className="checkmark"></span>
                  </label>

                  <span dangerouslySetInnerHTML={{ __html: task.name }} />
                </div>
                <button onClick={() => handleRemove(index)}>
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </li>
            ))}
          {tasks && tasks.length > 1 && (
            <p>
              <button className="deleteAll" onClick={() => handleRemoveAll()}>
                <i className="fa-solid red fa-eraser"></i>Delete all
              </button>
            </p>
          )}
        </ul>
      </>
    );
}

export default RecommendedSong;