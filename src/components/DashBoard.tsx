// src/PersonCard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

type person={
  username:string
  email:string
}
const Dashboard = () => {
   const [person, setPerson] = useState<person|null>(null);

   useEffect(() => {
     axios.get('http://localhost:4000/user/userInfo',{withCredentials:true})
       .then(response => {
         setPerson(response.data.success);
       })
       .catch(error => {
        console.error('There was an error fetching the data!', error);
       });
   }, []);

   if (!person) {
     return <div>Loading...</div>;
   }

  return (
    <div className="flex   justify-center min-h-screen bg-gray-100">
      <div className="bg-white mt-8 h-fit p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-2">{person.username}</h1>
        <p className="text-gray-600">{person.email}</p>
      </div>
    </div>
  );
};

export default Dashboard;
