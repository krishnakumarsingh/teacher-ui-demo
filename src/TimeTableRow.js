import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
// import { setBackgroundColor } from './helper';


const TimeTableRow = ({ id, time, icon, title, type, sessionName, sessionTime, edit, refresh }) => {
    // const bg = setBackgroundColor();
    // const color = setBackgroundColor().color;
    const deleteItem = async () => {
        const data = axios.delete(`http://localhost:3001/teacher-compensation/${id}`);
        refresh();
    }
    return (
        <div className="row g-0 justify-content-between align-items-center mb-4 border-bottom p-2">
            <div className="col-md-2 ">
                {time}
            </div>
            <div className="col-md-1 ">
                <span className={`wraper-icon`} style={{ backgroundColor: "#ccc", color: "#ccc"}} ><FontAwesomeIcon icon={icon} className="fa-1x" /></span>
            </div>
            <div className="col-md-5">
                <div className="card-body p-0">
                    <h5 className="card-title m-0">{title}</h5>
                    {/* <p className="card-text">Lecturer: Roshan</p> */}
                    <p className="card-text"><small className="text-muted">{type}</small></p>
                </div>
            </div>
            <div className="col-md-2 text-center">
                <span className='icon-with-shadow'><FontAwesomeIcon icon={faPencil} className="fa-1x" onClick={() => edit()} /></span>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className='icon-with-shadow'><FontAwesomeIcon icon={faTrash} className="fa-1x" onClick={() => deleteItem()} /></span>
            </div>
            <div className='col-md-2 text-end'>
                <dt>{sessionName}</dt>
                <dl><small className="text-muted">{sessionTime}</small></dl>
            </div>
        </div>
    )
}

export default TimeTableRow