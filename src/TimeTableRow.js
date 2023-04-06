import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
// import { setBackgroundColor } from './helper';


const TimeTableRow = ({ id, time, startRange, icon, title, type, sessionName, sessionTime, edit, refresh, status, dateStatus, costPerHour }) => {
    const [expend, setExpend] = useState(false);
    const deleteItem = async () => {
        const data = axios.delete(`http://localhost:3001/teacher-compensation/${id}`);
        refresh();
    }
    const costPerSession = (totalTime) => Math.floor((costPerHour / 60) * totalTime);
    return (
        <div className="time-table-row mb-4" onClick={() => setExpend(!expend)}>
            <div className={`accordin-header row g-0 justify-content-between align-items-center p-2 ${status === "checked" ? "active" : dateStatus === "old" ? "skiped" : ""}`}>
                <div className="col-md-1 ">
                    <span className={`wraper-icon`} >
                        <FontAwesomeIcon icon={faCalendarCheck} className="fa-2x fa-solid" />
                    </span>
                </div>
                <div className="col-md-5">
                    <div className="card-body p-0">
                        <h5 className="card-title m-0">{title}</h5>
                        <p className="card-text"><small className="text-muted">{type}</small></p>
                    </div>
                </div>
                <div className='col-md-2 text-end'>
                    <small>{"Duration"}</small> : <small className="text-muted">{sessionTime} Min</small>
                </div>
                <div className="col-md-4 text-end">
                    <small><i>{"Cost"}</i></small><small className="text-muted"> :
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-rupee" viewBox="0 0 16 16">
                            <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z" />
                        </svg> {costPerSession(sessionTime)}</small>
                </div>
            </div>
            {expend && <div className='p-2 container' style={{ borderTop: "1px solid #ccc" }}>
                <div className='row p-2'>
                    <div className='col-md-4 p-2'><dt>Name: </dt><dl>{title}</dl></div>
                    <div className='col-md-4 p-2'><dt>Status: </dt><dl>{status ? status : "NA"}</dl></div>
                    <div className='col-md-4 p-2'><dt>Duration: </dt><dl>{sessionTime}</dl></div>
                    <div className='col-md-4 p-2'><dt>Session Name: </dt><dl>{sessionName}</dl></div>
                    <div className='col-md-4 p-2'><dt>Date: </dt><dl>{startRange}</dl></div>
                    <div className='col-md-4 p-2'><dt>Time: </dt><dl>{time}</dl></div>
                    <div className='col-md-4 p-2'><dt>cost Per Hour: </dt><dl>{costPerHour}</dl></div>
                    <div className='col-md-4 p-2'><dt>Total cost: </dt><dl>{costPerSession(sessionTime)}</dl></div>
                </div>
                <div className=''>
                    <table class="table caption-top">
                        <caption>Teacher Compensation Details</caption>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Cost Per Hour</th>
                                <th scope="col">Total Session Time</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>{costPerHour}</td>
                                <td>{sessionTime}</td>
                                <td>{costPerSession(sessionTime)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>}
        </div>
    )
}

export default TimeTableRow