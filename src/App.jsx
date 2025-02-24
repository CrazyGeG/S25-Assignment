import React from "react";
import PeopleList from "./PeopleList";

//Defines a functional React component named App using an arrow function.
//This component serves as the main entry point of the application.
//Renders the PeopleList component inside the App component.
const App = () => {
  return (
    <div className="container mt-4">
      <PeopleList />
    </div>
  );
};

export default App;


// Just for testing:
// import React from "react";

// const App = () => {
//   return (
//     <div>
//       <h1>Hello, React is Working!</h1>
//     </div>
//   );
// };

// export default App;
