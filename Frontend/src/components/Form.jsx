import React from 'react';

const Form = (props) => {

    const {SongInput,YearInput, handleSongChange, handleYearChange, handleSubmit} = props

    return (
        <>
        <form className='formInput' onSubmit={handleSubmit}>
            <label htmlFor="taskInput"></label>
            <input required type="text" value={SongInput} placeholder="Youtube Video URL" onChange={handleSongChange}/>
            {/* <input required type="text" className="artist Tab" value={YearInput} placeholder="Year" onChange={handleYearChange}/> */}
            <button className="btn-add" type="submit" alt="Add Video"><i className="fa-solid fa-plus fa-3x"></i></button>
        </form>
        </>
    );
}

export default Form;