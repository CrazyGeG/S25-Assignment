//Imports the React library, which is necessary for creating React components.
//{ useState }: This is a React hook that allows us to add state to function components. It is used to track the number of likes in this component.
import React, { useState } from "react";
//bootstrap: stying, the below import is for the bootstrap css
//It loads Bootstrap’s predefined styles so that components like buttons, cards, and the grid system work automatically.
import "bootstrap/dist/css/bootstrap.min.css";

//defining the PeopleCard Componend. functional React component named PeopleCard
const ProfileCard = ({ person }) => {
  //useState Hook for Likes, initializes a state variable likes with a value of 0
  //setLikes is a function that updates the likes state variable.
  //This state variable will be used to keep track of how many times the button has been clicked.
  const [likes, setLikes] = useState(0);

  return (
    //create two styles, one for the card and one for the button.Both styles are inline styles
    //I have ask Chatgpt to create these tyles by giving it the despciption that I visulized on the example. I make some adjustment myself.
    
    //Some Notes:
    //<h5> - Heading Element, <div> - Generic Container, <p> - Paragraph
    //<strong> makes the label bold.

    <div
      style={{
        borderRadius: "10px",
        padding: "15px",
        margin: "10px 0",
        textAlign: "left",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
        width: "800px",
        minheight: "100px",
        backgroundColor: "#E0E0E0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    > 
      <p style= {{margin: "5px 0"}}>Name: {person.name}</p> 
      <p style={{ margin: "5px 0" }}>Favorite: {person.favoriteColor}</p>
      <p style={{ margin: "5px 0" }}>Favorite Food: {person.favoriteFood}</p>
      
      <button
        onClick={() => setLikes(likes + 1)}
        style={{
          backgroundColor: "#54595F",//dark-grey
          color: "white",
          border: "none",
          padding: "4px 11px", //Reduced padding to make the button smaller
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
    </div>
  );
};

//Exporting the Component
export default ProfileCard;
