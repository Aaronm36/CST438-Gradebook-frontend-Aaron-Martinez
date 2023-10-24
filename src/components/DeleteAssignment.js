import React, {useState, useEffect}  from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';

function DeleteAssignment(props) { 

    const [currentAssignment, setName] = useState([]);
    let assignmentId=0;
    const [force, setForce] = useState(false);
    const [message, setMessage] = useState('');
    const token = sessionStorage.getItem("jwt");
  
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
        fetch(`${SERVER_URL}/assignment/${assignmentId}` , {
            headers: {'Authorization' : token}
          })
        .then((response) => response.json()) 
        .then((data) => { setName(data) })       
        .catch(err => { 
          setMessage("Exception. "+err);
          console.error("fetch Assignment error "+ err);
        });
      }
  
      const deleteAssignment = ( ) => {
        setForce(false);
        setMessage(''); 
        console.log("Assignment.save ");     
        fetch(`${SERVER_URL}/assignment/${assignmentId}` , 
            {  method: 'Delete',
            headers: {'Authorization' : token} })
        .then(res => {
          fetchAssignments(assignmentId);
          setMessage("Assignment Deleted.");
          setForce(false);
            
          if(res.status === 400){
              setMessage("The assignment you want to delete has grades. \n If you would like to continue deleting press the force delete button at the bottom or press back");
              setForce(true);
      }})
          .catch(err => {
              setMessage("Exception. "+err);
              console.error('Save Assignment exception =' + err);
          });
     };  

     
     const forceDelete = () => {
        fetch(`${SERVER_URL}/assignment/${assignmentId}?force=yes`, 
            {  method: 'Delete',
            headers: {'Authorization' : token}} )
            setMessage("Assignment Deleted");
     }

    
      
    const headers = ['Assignment Name', 'Due Date', 'Course Name'];
    
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
                    <td>{currentAssignment.assignmentName}</td>  
                    <td>{currentAssignment.dueDate}</td>  
                    <td>{currentAssignment.courseTitle}</td>  
                    </tr>
                </tbody>
            </table>
            {!force && <button id="sgrade" type="button" margin="auto" onClick={deleteAssignment} >Delete Assignment</button>}
            {force && <button id="sgrade" type="button" margin="auto" onClick={forceDelete} >  Force Delete</button>}
            <button> <Link to={`/`}>Back</Link></button>
            </div>
        </div>
        )
    }
    
    export default DeleteAssignment;    