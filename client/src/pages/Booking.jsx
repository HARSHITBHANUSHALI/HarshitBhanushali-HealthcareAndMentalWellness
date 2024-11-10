import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import FlipCard from '../components/FlipCard';
import SideBarComp from '../components/SideBarComp';

function Booking() {


  const people = [
    {
      id: 1,
      name: 'John Doe',
      occupation: 'Therapist',
      location: 'San Francisco, CA',
      bio: 'Always present to healp People Maentally',
    },
    {
      id: 2,
      name: 'Jane Smith',
      occupation: 'Psycologist',
      location: 'New York, NY',
      bio: 'Problems where everyboady runs',
    }
  ];
  

  return (
    <div className={`flex`}>
        <SideBarComp />
      <div className={`flex-grow p-4 m-3 mt-24 `}>
        <h2 className="text-3xl text-center text-orange-400 font-bold mb-8">Connect with People</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {people.length > 0 ? (
            people.map(person => (
              <FlipCard key={person.id} user={person} />
            ))
          ) : (
            <p>No people to show</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Booking;