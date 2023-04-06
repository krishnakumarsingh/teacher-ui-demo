import { faCalendarDay, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Moment from 'moment';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import FormComponent from "./FormComponent";
import TimeTableRow from './TimeTableRow';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const TeacherCompensation = () => {
    const [post, setPost] = useState([]);
    const [oldPost, setOldPost] = useState([]);
    const [addTimeTable, setAddTimeTable] = useState(false);
    const [filterValue, setFilterValue] = useState("all");
    const [filterOpen, setFilterOpen] = useState(false);
    const [totalCost, setTotalCost] = useState(0);

    const handleClose = () => setAddTimeTable(false);
    const handleSave = () => console.log("Save");

    useEffect(() => {
        getPostData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form was submitted, now the modal can be closed", e);
        handleClose();
    };
    const refresh = () => {
        getPostData();
    }
    const getPostData = () => {
        let today = Moment(new Date()).format('yyyy-MM-DD');
        const data = axios.get("http://localhost:3001/teacher-compensation");
        data.then((res) => {
            let currentData = [];
            currentData = res && res.data;
            currentData.sort((a, b) => {
                if (a.date < b.date) {
                    return -1;
                }
            });
            setPost(currentData.filter((item) => item.startRange > today));
            setOldPost(currentData.filter((item) => item.startRange < today));
        });
    }
    useEffect(() => {
        if(post.length > 0) {
            let currentValue = 0;
            oldPost.forEach(item => {
                const costPerSession = () => Math.floor((item.costPerHour/60) * item.sessionTime);
                if(item.status === "checked") currentValue = currentValue + costPerSession();
            });
            setTotalCost(currentValue);
        }
    }, [post]);
    const edit = () => {
        console.log("edit");
    }

const VariantsExample = () => {
    return (
      <>
        <DropdownButton
            as={ButtonGroup}
            key={"Secondary"}
            id={`dropdown-variants-${"Secondary"}`}
            variant={"Secondary".toLowerCase()}
            title={"Secondary"}
        >
            <Dropdown.Item eventKey="1" onClick={() => setFilterValue("all")} active={filterValue === "all"}>Completed Session</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => setFilterValue("today")} active={filterValue === "today"}>Today Session</Dropdown.Item>
            <Dropdown.Item eventKey="3" onClick={() => setFilterValue("feature")} active={filterValue === "feature"}>Feature Session</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4" onClick={() => setFilterValue("currentMonth")} active={filterValue === "currentMonth"}>Current Month Session</Dropdown.Item>
        </DropdownButton>
      </>
    );
  }
    return (
        <>
            <div className="teacher-compensation">{console.log(post)}
                <div className="container">
                    <div className="row">
                        <h2>Good morning, Monica</h2>
                        <div className="p-3 rounded bg-blue">
                            <h5>Your students are doing greate 60% student has completed the test.</h5>
                        </div>
                        <div className="col-md-8">
                            <div className="d-flex justify-content-between align-items-center">
                                <h2>Session calender</h2>
                                <VariantsExample />
                            </div>
                            <div className="card mt-5 mb-5 border-0">
                                <div className="card-body">
                                    {post.length > 0 && <div className='new-timeline'>
                                        <div className="card mb-3 border-0">
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <h3>Schedule</h3>
                                                <h6>Total Cost: 
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-rupee" viewBox="0 0 16 16">
                                                        <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z"/>
                                                    </svg> 
                                                    {totalCost}/-</h6>
                                            </div>
                                            {post && post.map(item => {
                                                return <TimeTableBlock data={item} dateStatus="new" filterValue={filterValue} />
                                            })}
                                        </div>
                                    </div>}
                                </div>
                            </div>
                            {oldPost.length > 0 && <div className='old-timeline'>
                                {oldPost && oldPost.map(item => {
                                    return (
                                        <div className="card mt-1 mb-2 border-0">
                                            <div className="card-body">
                                                <TimeTableBlock data={item} dateStatus="old" filterValue={filterValue} />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>}
                        </div>
                        <div className="col-md-4">
                            <div className="card mt-5 mb-5 border-0">
                                <div className="card-body">
                                    <FormComponent submit={handleSubmit} refresh={refresh} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
const TimeTableBlock = ({ data, edit, refresh, dateStatus, filterValue }) => {
    const { id, startRange, endRange, time, title, type, sessionName, sessionTime, status, costPerHour } = data;
    const formateDate = (date) => {
        const currentDate = Moment(date).format('MMMM Do YYYY, h:mm A');

        return `${currentDate}`;
    }
    return (
        <div>
            <h5><FontAwesomeIcon icon={faCalendarDay} className="fa-1x" /> {formateDate(startRange)}</h5>
            <TimeTableRow id={id} refresh={refresh} startRange={startRange} time={time} icon={faClock} title={title} type={`Lecturer: ${type}`} sessionName={sessionName} sessionTime={sessionTime} edit={edit} status={status} dateStatus={dateStatus} costPerHour={costPerHour} />
        </div>
    )
}
                                    
export default TeacherCompensation;