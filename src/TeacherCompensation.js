import { faCalendarCheck, faCalendarPlus, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Moment from 'moment';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import FormComponent from "./FormComponent";
import TimeTableRow from './TimeTableRow';

const TeacherCompensation = () => {
    const [post, setPost] = useState(null);
    const [oldPost, setOldPost] = useState(null);
    const [addTimeTable, setAddTimeTable] = useState(false);

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
            setPost(postDate(currentData, today));
            setOldPost(pastDate(currentData, today));
        });
    }
    const postDate = (currentData, today) => {
        console.log(currentData, today)
        return currentData.filter((item) => item.startRange > today)
    };
    const pastDate = (currentData, today) => currentData.filter((item) => item.startRange < today);
    const edit = () => {
        console.log("edit");
    }
    useEffect(() => {
        console.log(post);
    }, [post]);
    if (!post) return null;
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
                            <div className="card mt-5 mb-5 border-0">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h2>Session calender</h2>
                                        <div className="dropdown">
                                            <Button className="btn btn-secondary btn-sm dropdown-toggle transparent" type="button" data-bs-toggle="dropdown"
                                                aria-expanded="false">
                                                Filter Calender
                                            </Button>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item" href="#">Completed session</a></li>
                                                <li><a className="dropdown-item" href="#">Today session</a></li>
                                                <li><a className="dropdown-item" href="#">Feature session</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    {post.length > 0 ? <div>
                                        <div className="card mb-3 border-0">
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <h3>Timetable</h3>
                                                {/* <div className="dropdown">
                                                    <Button className="btn btn-outline-secondary btn-sm" variant="outline-secondary" onClick={() => setAddTimeTable(!addTimeTable)}>Add Session{" "}<FontAwesomeIcon icon={faCalendarPlus} className="fa-1x" /></Button>
                                                </div> */}
                                            </div>
                                            {post && post.map(item => {
                                                return <TimeTableBlock data={item} edit={edit} refresh={refresh} />
                                            })}
                                        </div>
                                        <div className="card mb-3 border-0">
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <h3>Old Timetable</h3>
                                            </div>
                                            {oldPost && oldPost.map(item => {
                                                return <TimeTableBlock data={item} />
                                            })}
                                        </div>
                                    </div> : <h1>No Timetable</h1>}
                                    {oldPost.length > 0 && <div>
                                        <div className="card mb-3 border-0">
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <h3>Old Timetable</h3>
                                            </div>
                                            {oldPost && oldPost.map(item => {
                                                return <TimeTableBlock data={item} />
                                            })}
                                        </div>
                                    </div>}
                                </div>
                            </div>
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
const TimeTableBlock = ({ data, edit, refresh }) => {
    const { id, startRange, endRange, time, title, type, sessionName, sessionTime } = data;
    const formateDate = (date) => {
        const newDate = Moment(new Date()).format('DD-MM-YYYY');
        const dbDate = Moment(date).format('DD-MM-YYYY');

        const dbYears = dbDate.split("-")[2];
        const dbMonths = dbDate.split("-")[1];
        const dbDays = dbDate.split("-")[0];

        const newYears = newDate.split("-")[2];
        const newMonths = newDate.split("-")[1];
        const newDays = newDate.split("-")[0];

        let dayText = "";
        if (newDate === dbDate) {
            dayText = `Today`
        } else if (dbYears === newYears && dbMonths === newMonths && dbDays === String(Number(newDays) + 1)) {
            dayText = `Tomorrow`
        }
        return `${dayText} ${dbDays}.${dbMonths}`

    }
    return (
        <div>
            <h5><FontAwesomeIcon icon={faCalendarCheck} className="fa-1x" /> {formateDate(startRange)}</h5>
            <TimeTableRow id={id} refresh={refresh} time={time} icon={faClock} title={title} type={`Lecturer: ${type}`} sessionName={sessionName} sessionTime={sessionTime} edit={edit} />
        </div>
    )
}
export default TeacherCompensation;