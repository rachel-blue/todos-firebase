import React, { useState } from 'react';

function ListItem(props) {
  const [itemName, setItemName] = useState('');
  const [done, setDone] = useState(false);
  // const [newChecklistItem, setNewChecklistItem] = useState();

  return (
    <div>
      <input
        type="checkbox"
        onChange={(evt) => setDone(evt.currentTarget.checked)}
        checked={done}
      />
      <input
        value={itemName}
        // onChange={(evt) => {
        //   evt.preventDefault();
        //   setItemName(evt.target.value);
        // }}
      />
    </div>
  );
}

export default ListItem;
