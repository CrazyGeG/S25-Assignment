import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

///Similar code as Lab2, just add the edit and delete button

// Define the ProfileCard component
const ProfileCard = React.memo(({ student, updateStudent, deleteStudent }) => {
  const [likes, setLikes] = useState(0); // State for likes
  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const [editedStudent, setEditedStudent] = useState(student); // State for edited student data

  // Handle like button click
  const handleLikes = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  // Handle save button click (after editing)
  const handleSave = () => {
    updateStudent(student.name, editedStudent); // Call updateStudent from props
    setIsEditing(false); // Exit edit mode
  };
  // Same Profile Card format as Lab 2 assignment
  return (
    <div
      style={{
        borderRadius: "10px",
        padding: "15px",
        margin: "10px 0",
        textAlign: "left",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
        width: "800px",
        minHeight: "100px",
        backgroundColor: "#E0E0E0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      {isEditing ? (
        <>
          {/* Edit Mode: Input fields for editing student details */}
          <input
            type="text"
            className="form-control mb-2"
            value={editedStudent.name}
            onChange={(e) =>
              setEditedStudent({ ...editedStudent, name: e.target.value })
            }
          />
          <input
            type="text"
            className="form-control mb-2"
            value={editedStudent.favoriteFood}
            onChange={(e) =>
              setEditedStudent({ ...editedStudent, favoriteFood: e.target.value })
            }
          />
          <input
            type="text"
            className="form-control mb-2"
            value={editedStudent.favoriteColor}
            onChange={(e) =>
              setEditedStudent({ ...editedStudent, favoriteColor: e.target.value })
            }
          />
          <div>
            <button className="btn btn-success me-2" onClick={handleSave}>
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          {/* View Mode: Display student details */}
          <p style={{ margin: "5px 0" }}>Name: {student.name}</p>
          <p style={{ margin: "5px 0" }}>Favorite Food: {student.favoriteFood}</p>
          <p style={{ margin: "5px 0" }}>Favorite Color: {student.favoriteColor}</p>

          {/* Like button */}
          <button
            onClick={handleLikes}
            style={{
              backgroundColor: "#54595F", // dark-grey
              color: "white",
              border: "none",
              padding: "4px 11px",
              fontSize: "15px",
              borderRadius: "5px",
              cursor: "pointer",
              position: "absolute",
              bottom: "10px",
              right: "10px",
            }}
          >
            Like ({likes})
          </button>

          {/* Edit and Delete buttons */}
          <div style={{ marginTop: "10px" }}>
            <button
              className="btn btn-warning btn-sm me-2"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteStudent(student.name)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
});

export default ProfileCard;