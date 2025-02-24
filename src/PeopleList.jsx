//Imports the React library, which is necessary for creating React components.
import React from "react";
import ProfileCard from "./ProfileCard";
// People data array, This data will be used to dynamically generate components. I used my teammates as examples.
const People = [
  { id: 1, name: "Meghana Spurthi Maadugundu", favoriteFood: "Pizza", favoriteColor: "Blue" },
  { id: 2, name: "Ishrat Mohima", favoriteFood: "Sushi", favoriteColor: "Green" },
  { id: 3, name: "Habiba Barsha", favoriteFood: "Burgers", favoriteColor: "Red" },
  { id: 4, name: "Tsi Ting-Yu", favoriteFood: "Noodles", favoriteColor: "Pink" },
];

//Defining the PeopleList Component
const PeopleList = () => {
  //the function returns JSX, which describes the component’s UI.
  // first make the style for text "Classmates" left-aligned(on the top left)
  // second make the style for the cards, cards need to be stacked in one column
  // map through the People array and render a ProfileCard component for each person.

  return (
    <div style={{ marginTop: "20px", padding: "20px" }}>
      {/* Left-aligned heading */}
      <h2 style={{ textAlign: "left", marginBottom: "20px" }}>My Classmates</h2>
      
      
      {/* Stack cards in one cloumn */}
      <div 
      style={{ 
        display: "flex", 
        flexDirection: "column", // Stack cards in one column
        alignItems: "center",  // Centers the cards within the container
        gap: "10px",  // Space between cards
      }}
    >
      {People.map((person) => (
        <ProfileCard key={person.id} person={person} />
      ))}
    </div>
  </div>
);
};
    
export default PeopleList;
