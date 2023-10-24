import React, { useState } from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';

function AddAssignment(props) { 

  const [message, setMessage] = useState('');
  const [assignment, setAssignment] = useState({courseId: 0, dueDate: "", assignmentName: ""});
  const token = sessionStorage.getItem("jwt");

  const handleChange = (event) => {
    setAssignment({...assignment, [event.target.name]:event.target.value});
    setAssignment({...assignment, [event.target.name]:event.target.value});
    setAssignment({...assignment, [event.target.name]:event.target.value});
  }

  const newAssignment = ( ) => {
    fetch(`${SERVER_URL}/assignment`, 
          {  
            method: 'POST',
            headers: {'Authorization' : token,
            'Content-Type': 'application/json'},
            body: JSON.stringify(assignment)})
    .then((response) => {
      if(response.ok){
        setMessage("Assignment Added");
      } else {
         setMessage("Failed to add Assignment")
      }})
    .catch((err) => {
      setMessage(err)});
  }

  const handleAdd = () => {
    newAssignment();
  }

  const headers = ['Assignment Name', 'Due Date', 'Course Id'];

  return (
      <div>
      <h3>Assignment</h3>
            <div margin="auto" >
              <h4 id="gmessage" >{message}&nbsp;</h4>
              <table className="Center"> 
                <thead>
                  <tr>
                    {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>
                        <input type="text" name="assignmentName"  onChange={handleChange} />
                      </td>
                      <td>
                        <input type="text" name="dueDate" onChange={handleChange} />
                      </td>
                      <td>  
                       <input type="text" name="courseId" onChange={handleChange} />
                      </td>
                    </tr>
                </tbody>
              </table>
              <button id="submit" type="button" margin="auto" onClick={handleAdd}>Save Assignment</button>
              <button> <Link to={`/`}>Back</Link></button>
            </div>
      </div>
  ); 
}

export default AddAssignment;