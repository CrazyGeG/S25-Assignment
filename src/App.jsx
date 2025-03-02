import React, { useState } from "react";
import PeopleList from "./PeopleList";
import ProfileCard from "./ProfileCard";
import StudentTable from "./StudentTable";


//Defines a functional React component named App using an arrow function.
//This component serves as the main entry point of the application.
//Renders the PeopleList component inside the App component.
const App = () => {
  //First initialize students with the deterministic data that I entered for the Lab 2.
  const [students, setStudents] = useState(PeopleList);
  //Second initialize selectedStudent with null, which means no student is selected at the beginning.
  const [selectedStudent, setSelectedStudent] = useState(null);
  //Third initialize newStudent with an object containing empty strings for name, favoriteFood, and favoriteColor.
  //this variable will be used to get user's input data
  const [newStudent, setNewStudent] = useState({name:"", favoriteFood:"", favoriteColor:""});

  // control the adding form, when the web load, the form should be invisible
  const [isAdding, setIsAdding] = useState(false);
  
  //This function updates the state when a user types in the form input fields.
  const handleInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  //add a new student, note trim is used to remove all the whitespace from both ends of a string.
  //If any of the fields are empty, it shows an alert message.
  const addStudent = () => {
    if (!newStudent.name.trim() || !newStudent.favoriteFood.trim() || !newStudent.favoriteColor.trim()) {
      alert("All fields are required. If student do not have favorite food or color, please enter 'N/A'.");
      return;
    }

    setStudents([...students, { ...newStudent, likes: 0 }]);
    //After adding a new student, reset the form fields to empty strings.
    setNewStudent({ name: "", favoriteFood: "", favoriteColor: "" }); 
    setIsAdding(false); //Hide the form after adding
  };

  //update student data, this function updates an existing student’s information in the students state based on the student's name.
  const updateStudent = (name, updatedStudent) => {
    setStudents(students.map(student => (student.name === name ? updatedStudent : student)));
  };

  //delete student, take name as an identifier
  const deleteStudent = (name) => {
    setStudents(students.filter(student => student.name !== name));
  
    // Hide profile card if the deleted student is currently selected
    if (selectedStudent?.name === name) setSelectedStudent(null);
  };
  
  

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="text-left">Student Connect</h2>
        {/* Button to toggle the form visibility */}
        <button className="btn btn-primary" onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? "Cancel" : "Add Student"}</button> 
      </div>
      
      {/*Showing the form if isAdding is true*/}
      {isAdding && (
        <div className="card mb-4 mt-3 p-3">
          <h4>Add New Student</h4>
          <div className="row">
            <div className="col">
              <input type="text" className="form-control" name="name" placeholder="Name" value={newStudent.name} onChange={handleInputChange} />
            </div>
            <div className="col">
              <input type="text" className="form-control" name="favoriteFood" placeholder="Favorite Food" value={newStudent.favoriteFood} onChange={handleInputChange} />
            </div>
            <div className="col"> 
              <input type="text" className="form-control" name="favoriteColor" placeholder="Favorite Color" value={newStudent.favoriteColor} onChange={handleInputChange} />
            </div>

            {/*Set two buttons to make su user want to add or cancel*/}
            <div className="col">
              <button className="btn btn-success" onClick={addStudent}>Add</button>
              <button className="btn btn-secondary" onClick={() => setIsAdding(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/*Table View*/}
      <StudentTable students={students} setSelectedStudent={setSelectedStudent}/>

      {/* Profile Card View */}
      {selectedStudent && (
        <div className="d-flex justify-content-center mt-4">
          <ProfileCard student={selectedStudent} updateStudent={updateStudent} deleteStudent={deleteStudent} />            
        </div>
      )}
      </div>
      );
    };

    export default App;
            

