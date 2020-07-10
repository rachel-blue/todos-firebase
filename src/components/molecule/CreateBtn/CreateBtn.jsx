import React from 'react';
import { NavLink } from 'react-router-dom';

function CreateBtn() {
  return (
    <div className="my-2 p-4">
      <button type="button" className="px-3">
        <NavLink to="/create">
          <h2>+</h2>
        </NavLink>
      </button>
    </div>
  );
}

export default CreateBtn;
