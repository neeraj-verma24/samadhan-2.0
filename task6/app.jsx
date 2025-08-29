import React from 'react';
import ProfileCard from './ProfileCard';
import './App.css'; 

function App() {
  const neerajData = {
    name: "Neeraj Verma",
    status: "Student",
    email: "vermaneeraja9@gmail.com",
    phone: "9669443911",
    linkedin: "https://www.linkedin.com/in/neeraj-verma-06a9a0339"
  };

  return (
    <div className="App">
      <h1>My React Profile Cards</h1>
      <ProfileCard
        name={neerajData.name}
        status={neerajData.status}
        email={neerajData.email}
        phone={neerajData.phone}
        linkedin={neerajData.linkedin}
      />
    </div>
  );
}

export default App;