import React from 'react';
import { NavLink } from 'react-router-dom';

function CreateBtn() {
  return (
    <button type="button">
      <NavLink to="/create">
        Create New Checklist
      </NavLink>
    </button>
  );
}

export default CreateBtn;
