import React, {useState, useEffect}  from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';



function EditAssignment(props) { 
  

  const [currentAssignment, setName] = useState([]);
  let assignmentId=0;
  const [message, setMessage] = useState('');

  const path = window.location.pathname;
  const s = /\d+$/.exec(path)[0];
  console.log("Assignment assignmentId="+s);
  assignmentId=s;

  useEffect(() => {
    fetchAssignments()
   }, [] )

  const fetchAssignments = ( ) => {
      setMessage('');
      console.log("fetchAssignment "+assignmentId);
      fetch(`${SERVER_URL}/assignment/${assignmentId}`)
      .then((response) => response.json()) 
      .then((data) => { setName(data) })       
      .catch(err => { 
        setMessage("Exception. "+err);
        console.error("fetch Assignment error "+ err);
      });
    }

    const saveAssignment = ( ) => {
      setMessage(''); 
      console.log("Assignment.save ");     
      fetch(`${SERVER_URL}/assignment/${assignmentId}` , 
          {  
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json', }, 
            body: JSON.stringify( currentAssignment )
          } )
      .then(res => {
          if (res.ok) {
            fetchAssignments(assignmentId);
            setMessage("Assignment saved.");
          } else {
            setMessage("Save error. "+res.status);
            console.error('Save Assignment error =' + res.status);
      }})
        .catch(err => {
            setMessage("Exception. "+err);
            console.error('Save Assignment exception =' + err);
        });
   };        
    

    const onChangeInput = (e) => {
      setMessage('');
      setName({ ...currentAssignment, assignmentName:e.target.value});
    }

    const onChangeDate = (e) => {
      setMessage('');
      setName({ ...currentAssignment, dueDate:e.target.value});
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
                  <input type="text" name="name" value={currentAssignment.assignmentName} onChange={onChangeInput} />
                </td>
                <td>
                  <input type="text" name="date" value={currentAssignment.dueDate} onChange={onChangeDate} />
                </td>
                <td>{currentAssignment.courseTitle}</td>  
              </tr>
          </tbody>
        </table>
        <button id="submit" type="button" margin="auto" onClick={saveAssignment}>Save Assignment</button>
        <button> <Link to={`/`}>Back</Link></button>
      </div>
    </div>
  )
}

export default EditAssignment;