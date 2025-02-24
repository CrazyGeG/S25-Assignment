//Imports the React library, which is necessary for creating React components.
//{ useState }: This is a React hook that allows us to add state to function components. It is used to track the number of likes in this component.
import React, { useState } from "react";
//bootstrap: stying, the below import is for the bootstrap css
//It loads Bootstrap’s predefined styles so that components like buttons, cards, and the grid system work automatically.
import "bootstrap/dist/css/bootstrap.min.css";

//defining the PeopleCard Componend. functional React component named PeopleCard
const PeopleCard = ({ person }) => {
  //useState Hook for Likes, initializes a state variable likes with a value of 0
  //setLikes is a function that updates the likes state variable.
  //This state variable will be used to keep track of how many times the button has been clicked.
  const [likes, setLikes] = useState(0);

  return (
    //booststrap card styling, styles the component as a card.
    //The card has a width of 18rem(roughly 288 pixels) and a margin of 3 units on all sides.
    //Card Body Content, This div contains the content inside the card.
    //<h5> - Heading Element, <div> - Generic Container, <p> - Paragraph
    //<strong> makes the label bold.
    <div className="card m-3" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{person.name}</h5>
        <p className="card-text">
          <strong>Favorite Food:</strong> {person.favoriteFood}
        </p>
        <p className="card-text">
          <strong>Favorite Color:</strong> {person.favoriteColor}
        </p>
        <button
          className="btn btn-primary"
          onClick={() => setLikes(likes + 1)}
        >
          Like {likes}
        </button>
      </div>
    </div>
  );
};
//<button className="btn btn-primary" onClick={() => setLikes(likes + 1)}>
//Like {likes}
//</button>

//className="btn btn-primary":
// btn: Bootstrap button styling.
// btn-primary: A Bootstrap class that applies a blue theme to the button.

// onClick={() => setLikes(likes + 1)}:
// When the button is clicked, setLikes(likes + 1) updates the likes state by increasing it by 1.
// React re-renders the component, displaying the updated number of likes.

// Like {likes}:
// Displays the text "Like" followed by the current likes count.

//Exporting the Component
export default PeopleCard;
