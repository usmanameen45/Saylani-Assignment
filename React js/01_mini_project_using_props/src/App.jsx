import "./App.css";
import Usercard from "./components/usercard.jsx";
import data from "./data/users.js";

function App() {
  return (
    <>
      <h1 className="title">Users List</h1>
      <div className="card-container">
        {data.map((user, index) => (
          <div key={index}>
            <Usercard {...user} />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
