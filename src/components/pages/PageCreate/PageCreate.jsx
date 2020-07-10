import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { db } from '../../../firebase';
import { UserContext } from '../../../app/UserContextProvider';

function PageCreate() {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [checklistTitle, setChecklistTitle] = useState('');
  const [checklistItems, setChecklistItems] = useState([{}]);
  const [submitMessage, setSubmitMessage] = useState();
  const [alert, setAlert] = useState();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const todoData = {
      title: checklistTitle,
      createdBy: user.uid,
      items: checklistItems,
    };

    db.collection('checklists')
      .add(todoData).then(() => {
        setSubmitMessage('document sent successfully');
        setAlert('alert-success');
        setChecklistItems([]);
      }).catch((error) => {
        setSubmitMessage('Error adding document: ', error);
        setAlert('alert-danger');
      });

    history.push('/');
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
      >
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          New Checklist
          <br />
          <input
            placeholder="checklist name"
            value={checklistTitle}
            onChange={(evt) => {
              setChecklistTitle(evt.target.value);
            }}
          />
        </label>
        <br />
        <button type="submit">
          Submit
        </button>
        <div className={`alert ${alert}`} role="alert">
          {submitMessage}
        </div>
      </form>
    </div>
  );
}

export default PageCreate;
