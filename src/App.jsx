import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [goals, setGoals] = useState([]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    if (input === "") return;
    console.log("submitted");
    setGoals([...goals, input]);
    setInput("");
  };

  const handleDelete = (e) => {
    console.log("deleted");
    const newGoals = goals.filter((goal) => goal !== e.target.innerText);
    setGoals(newGoals);
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col flex-grow items-center">
          <div className="m-5 font-bold text-2xl">Enter Goal Here!</div>
          <div className="flex flex-row">
            <input type="text" className="border-2 border-black rounded-l-md" onChange={handleChange} value={input}/>
            <button
              className="bg-green-500 border-1 border-green-700 px-2 rounded-r-md font-semibold"
              onClick={handleSubmit}
            >
              OK
            </button>
          </div>
          <div className="mt-3"></div>
          {goals.map((goal, index) => (
            <div key={index} className="border-b-2 border-gray-700 min-w-24 text-center m-1" onClick={handleDelete}>
              {goal}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
