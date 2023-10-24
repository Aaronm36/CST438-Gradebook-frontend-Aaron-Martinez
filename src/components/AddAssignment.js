import React, { useState } from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';

function AddAssignment(props) { 

  const [message, setMessage] = useState('');
  const [assignment, setAssignment] = useState({courseId: 0, dueDate: "", assignmentName: ""});
  const token = sessionStorage.getItem("jwt");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    handleClose();
  }

  return (
      <div>
        <h4>{message}&nbsp;</h4>
        <Button variant="outlined" color="primary" style={{margin: 10}} 
                onClick={handleClickOpen}>
          New Assignment
        </Button>
        <Button variant="outlined" color="primary"> <Link to={`/`}> back</Link> </Button> 
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Assignment</DialogTitle>
            <DialogContent  style={{paddingTop: 20}} >
              <TextField id="courseId" autoFocus fullWidth label="Course Id" name="courseId" onChange={handleChange}  />
              <br/><br/>
              <TextField id="dueDate" autoFocus fullWidth label="Due Date" name="dueDate" onChange={handleChange}  />
              <br/><br/>
              <TextField id="assignmentName" autoFocus fullWidth label="Assignment Name" name="assignmentName" onChange={handleChange}  />
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={handleClose}>Cancel</Button>
              <Button id="Add" color="primary" onClick={handleAdd}>Add</Button>
            </DialogActions>
          </Dialog>  
      
      </div>
  ); 
}

export default AddAssignment;