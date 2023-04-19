import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Moment from 'moment';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { teacherCompensationPostApi, subjectCost } from './helper';

const FormComponent = ({ submit, refresh }) => {
    const [selectionRange, setSelectionRange] = useState("single");
    const [title, setTitle] = useState("");
    const [sessionDate, setSessionDate] = useState("");
    const [endRange, setEndRange] = useState("");
    const [time, setTime] = useState("");
    const [type, setType] = useState("");
    const [sessionName, setSessionName] = useState("");
    const [sessionTime, setSessionTime] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [show, setShow] = useState(true);
    const [subjects, setSubjects] = useState([]);
    const [subject, setSubject] = useState([]);

    useEffect(() => {
        let today = Moment(new Date()).format('yyyy-MM-DD');
        let startDate = "2023-03-01";
        let endDate = (Number(today.split("-")[0]) + 1) + "-" + today.split("-")[1] + "-" + today.split("-")[2];
        setSessionDate(today);
        setEndRange(endDate);
        setTimeout(() => {
            let elem = document.getElementById("sessionDate");
            elem.setAttribute('min',startDate);
            elem.setAttribute('max',endDate);
            elem.setAttribute('value',today);
        }, 400);
        setSubjects(["English", "Maths", "Science", "Social Sciences", "Physical Education", "Computer Basics", "Arts"]);
    }, []);
    const submitForm = () => {
        if (title &&
            sessionDate &&
            time &&
            // type &&
            sessionName &&
            sessionTime) {
            let subjectCosting = subjectCost(title);
            
            let fieldsData = {
                id: Math.random().toString(36).slice(2),
                title,
                sessionDate,
                time,
                // type,
                sessionName,
                sessionTime: sessionTime + "min",
                status: "",
                costPerHour: subjectCosting,
                // ...(selectionRange === "range" && endRange),
            };
            const data = teacherCompensationPostApi(fieldsData);
            data.then((res) => {
                setError("");
                setSuccess("Successfully created event.");
                setShow(true);
                refresh();
            })
        } else {
            setError("We are getting error during creating event.");
            setSuccess(""); 
            setShow(true);
        }
    }
    return (
        <Form onSubmit={() => submit()}>
            {show && error && <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>{error}</Alert.Heading>
            </Alert>}
            {show && success && <Alert variant="success" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>{success}</Alert.Heading>
            </Alert>}
            <Form.Group className="mb-3" controlId="title">
                <Row className="justify-content-md-center">
                    <Col xs md="4">
                        <Form.Label className='mt-2'>Title *</Form.Label>
                    </Col>
                    <Col xs md="8">
                        <Dropdown bsPrefix="subjects" variant="light">
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Subjects
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {subjects.map((val, index) => <Dropdown.Item key={val} active={val.split(" ").join("-").toLowerCase() === title} href={`#/${val.split(" ").join("-").toLowerCase()}`} name={val.split(" ").join("-").toLowerCase()} onClick={(e) => setTitle(e.target.name)}>{val}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                <Form.Label className='mt-2 subject-name'>{title.length > 0 ? title.split("-").join(" ") : "--"}</Form.Label>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="selectionRange">
                <Form.Check type="checkbox" label="Single Day" value="single" checked={selectionRange === "single"} onChange={() => setSelectionRange("single")} />
                <Form.Check type="checkbox" label="Range" value="range" checked={selectionRange !== "single"} onChange={() => setSelectionRange("range")} />
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="sessionDate">
                <Form.Label>{selectionRange === "range" && "Start"} Date *</Form.Label>
                <Form.Control type="date" placeholder="Date" defaultValue={sessionDate} onChange={(e) => setSessionDate(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="time">
                <Form.Label>Time *</Form.Label>
                <Form.Control type="time" placeholder="Time" onChange={(e) => setTime(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="sessionName">
                <Form.Label>Session Name *</Form.Label>
                <Form.Control type="text" placeholder="Enter Session Name" onChange={(e) => setSessionName(e.target.value)} />
            </Form.Group>

            <Form.Group className="col-md-6 mb-3" controlId="sessionTime">
                <Form.Label>Session Time *</Form.Label>
                <Form.Control type="number" className="gap-rit" min="05:00" max="00:00" step="00:15" required onChange={(e) => setSessionTime(e.target.value)} />
                <Form.Text className="text-muted pos-rit">
                    min
                </Form.Text>
            </Form.Group>

            <Button variant="primary" onClick={(e) => submitForm(e)}>
                Submit
            </Button>
        </Form>
    );
}

export default FormComponent;