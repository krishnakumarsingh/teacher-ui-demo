import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Moment from 'moment';
const FormComponent = ({ submit, refresh }) => {
    const [selectionRange, setSelectionRange] = useState("single");
    const [title, setTitle] = useState("");
    const [startRange, setStartRange] = useState("");
    const [endRange, setEndRange] = useState("");
    const [time, setTime] = useState("");
    const [type, setType] = useState("");
    const [sessionName, setSessionName] = useState("");
    const [sessionTime, setSessionTime] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [show, setShow] = useState(true);

    useEffect(() => {
        let today = Moment(new Date()).format('yyyy-MM-DD');
        let startDate = "2023-03-01";
        let endDate = (Number(today.split("-")[0]) + 1) + "-" + today.split("-")[1] + "-" + today.split("-")[2];
        setStartRange(today);
        setEndRange(endDate);
        setTimeout(() => {
            let elem = document.getElementById("startRange");
            console.log(today);
            elem.setAttribute('min',startDate);
            elem.setAttribute('max',endDate);
            elem.setAttribute('value',today);
        }, 400);
    }, []);
    const submitForm = () => {
        if (title &&
            startRange &&
            (selectionRange === "single" || endRange) &&
            time &&
            type &&
            sessionName &&
            sessionTime) {
                
            let fieldsData = {
                id: Math.random().toString(36).slice(2),
                title,
                startRange,
                time,
                type,
                sessionName,
                sessionTime: sessionTime + "min",
                ...(selectionRange === "range" && endRange),
            };
            console.log(fieldsData);
            const data = axios.post("http://localhost:3001/teacher-compensation", fieldsData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            data.then((res) => {
                console.log(res.data);
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
                <Form.Label>Title *</Form.Label>
                <Form.Control type="text" placeholder="Enter Title" onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="selectionRange">
                <Form.Check type="checkbox" label="Single Day" value="single" checked={selectionRange === "single"} onChange={() => setSelectionRange("single")} />
                <Form.Check type="checkbox" label="Range" value="range" checked={selectionRange !== "single"} onChange={() => setSelectionRange("range")} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="startRange">
                <Form.Label>{selectionRange === "range" && "Start"} Date *</Form.Label>
                <Form.Control type="date" placeholder="Date" defaultValue={startRange} onChange={(e) => setStartRange(e.target.value)} />
            </Form.Group>
            {selectionRange === "range" && <Form.Group className="mb-3" controlId="endRange">
                <Form.Label>End Date *</Form.Label>
                <Form.Control type="date" placeholder="Date" defaultValue={endRange} onChange={(e) => setEndRange(e.target.value)} />
            </Form.Group>}

            <Form.Group className="mb-3" controlId="time">
                <Form.Label>Time *</Form.Label>
                <Form.Control type="time" placeholder="Time" onChange={(e) => setTime(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="type">
                <Form.Label>Type *</Form.Label>
                <Form.Control type="text" placeholder="Enter Type" onChange={(e) => setType(e.target.value)} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
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