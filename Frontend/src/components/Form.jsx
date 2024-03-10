import React from 'react';

const Form = (props) => {

    const {SongInput, handleSongChange, handleSubmit} = props

    return (
      <>
        <form className="formInput" onSubmit={handleSubmit}>
          <label htmlFor="taskInput"></label>
          <input
            required
            type="text"
            value={SongInput}
            placeholder="Youtube Video URL"
            onChange={handleSongChange}
          />
          {/* <input required type="text" className="artist Tab" value={YearInput} placeholder="Year" onChange={handleYearChange}/> */}
          <button
            className="deleteAll recommend"
            type="submit"
          >
            <i className="fa-solid fa-music"></i>Generate Questions
          </button>
        </form>
      </>
    );
}

export default Form;