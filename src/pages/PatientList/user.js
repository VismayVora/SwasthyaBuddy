import axios from 'axios';
const API_URL = "https://uia-antons-server.herokuapp.com/api/reports/doctor";

const email = localStorage.getItem("email")

const response = await axios.post(API_URL, { email })
console.log(response)
const users = response.data.data
export default users