import React, { useState } from 'react';
import {SERVER_URL} from '../constants';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';

function AddAssignment(props) { 

  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('');
  const [assignment, setAssignment] = useState({courseId: 0, dueDate: "", assignmentName: ""});

  const handleChange = (event) => {
    setAssignment({...assignment, [event.target.name]:event.target.value});
    setAssignment({...assignment, [event.target.name]:event.target.value});
    setAssignment({...assignment, [event.target.name]:event.target.value});
  }

  const newAssignment = ( ) => {
    fetch(`${SERVER_URL}/assignment`, 
          {  
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
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