import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import People from "./PeopleList";
import ProfileCard from "./ProfileCard";
import StudentTable from "./StudentTable";

const App = () => {
  {/* holds the list of student objects and function to update students list */}
  const [students, setStudents] = useState(People);
  {/* stores the currently selected student for display in the ProfileCard */}
  const [selectedStudent, setSelectedStudent] = useState(null);
  {/* store new student's info for adding new student */}
  const [newStudent, setNewStudent] = useState({
    name: "",
    favoriteFood: "",
    favoriteColor: "",
  });
  {/* control whether the "Add Student" form is dispalyed */}
  const [isAdding, setIsAdding] = useState(false);

  {/* retrieves the name and value from the input field */}
  {/* Note: ..prevStudent ensures previous values are retained while uploading only the changed field. I got errrors without adding this */}
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  {/* adding a new student with Validation Check. make sure all fields are filled(non-empty) */}
  const addStudent = () => {
    if (
      !newStudent.name.trim() ||
      !newStudent.favoriteFood.trim() ||
      !newStudent.favoriteColor.trim()
    ) {
      alert(
        "All fields are required. If the student does not have a favorite food or color, please enter 'N/A'."
      );
      return;
    }
    {/* assign a unique id to new student object */}
    const newStudentEntry = {
      id: students.length + 1,
      ...newStudent,
    };
    {/* Debug Line */}
    console.log("New Student Entry:", newStudentEntry);

    {/* update students by appending the new entry*/}
    setStudents((prevStudents) => [...prevStudents, newStudentEntry]);
    {/* clear the form for future usage */}
    setNewStudent({ name: "", favoriteFood: "", favoriteColor: "" });
    {/* hide the form */}
    setIsAdding(false);
  };

  {/* find and updates a student by name */}
  {/* use map to replace the old student object with updatedStudent */}
  const updateStudent = (name, updatedStudent) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.name === name ? updatedStudent : student
      )
    );
  };

  {/* delete a student */}
  {/* filter out the student whose name matches name */}
  const deleteStudent = (name) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.name !== name)
    );
    {/* if the deleted student is currently selected, it resets selectedStudent to null */}
    if (selectedStudent?.name === name) setSelectedStudent(null);
  };

  return (
    <div className="container mt-4">
      {/* Updated heading with proper styling */}
      <div style={{ marginTop: "20px", padding: "20px" }}>
        <h2 style={{ textAlign: "left", marginBottom: "20px" }}>Student Connect</h2>
      </div>

      {/* Add Student Button */}
      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn btn-primary"
          onClick={() => setIsAdding((prev) => !prev)}
        >
          {isAdding ? "Cancel" : "Add Student"}
        </button>
      </div>

      {/* Add Student Form */}
      {isAdding && (
        <div className="card mb-4 mt-3 p-3">
          <h4>Add New Student</h4>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Name"
                value={newStudent.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="favoriteFood"
                placeholder="Favorite Food"
                value={newStudent.favoriteFood}
                onChange={handleInputChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="favoriteColor"
                placeholder="Favorite Color"
                value={newStudent.favoriteColor}
                onChange={handleInputChange}
              />
            </div>
            <div className="col">
              <button className="btn btn-success" onClick={addStudent}>
                Add
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Table display and Profile card display when select student on table */}
      <StudentTable
        students={students}
        setSelectedStudent={setSelectedStudent}
      />

      {/* Profile Card diaplay with edit and delete student*/}
      {selectedStudent && (
        <div className="d-flex justify-content-center mt-4">
          <ProfileCard
            student={selectedStudent}
            updateStudent={updateStudent}
            deleteStudent={deleteStudent}
          />
        </div>
      )}
    </div>
  );
};

export default App;