import axios from 'axios';

const config = {
  headers: {
      'Content-Type': 'application/json'
  }
};
const teacherCompensationGetApi = async () => await axios.get("http://localhost:3002/teacher-compensation");
const teacherCompensationPostApi = async (fieldsData) => await axios.post("http://localhost:3002/teacher-compensation", fieldsData, config);
const teacherCompensationDeleteApi = async (id) => await axios.delete(`http://localhost:3002/teacher-compensation/${id}`);
const subjectCost = (name) => {
  let cost = 0;
  const subjectsName = ["English", "Maths", "Science", "Social Sciences", "Physical Education", "Computer Basics", "Arts"];
  switch(name.toLowerCase()) {
    case "english":
      cost = 100;
      break;
    case "maths":
      cost = 150;
      break;
    case "science":
      cost = 200;
      break;
    case "social sciences":
      cost = 100;
      break;
    case "physical education":
      cost = 100;
      break;
    case "computer basics":
      cost = 100;
      break;
    case "arts":
      cost = 100;
      break;
    default:
      cost = 50;
  }
  return cost;
}

export {
    teacherCompensationGetApi,
    teacherCompensationPostApi,
    teacherCompensationDeleteApi,
    subjectCost
}