import React, { useContext, useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { UserContext } from '../../../app/UserContextProvider';
import CreateBtn from '../../molecule/CreateBtn/CreateBtn';

function PageHome() {
  const { user } = useContext(UserContext);
  const [checklist, setChecklist] = useState([]);

  const getData = async () => {
    const response = await db
      .collection('checklists')
      .where('createdBy', '==', user.uid)
      .get();

    const lists = response.docs
      .map((t) => ({
        id: t.id,
        ...t.data(),
      }));
    setChecklist(lists);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!user) {
    return (
      <div>
        {/*
         //put splash page in here
         */}
        <h1>This is the Home Page!</h1>
        <p>Sign in to start using To-Do lists</p>
      </div>
    );
  }
  return (
    <div>
      <h1>This is the Home Page!</h1>
      {checklist.length <= 0
        ? <CreateBtn />
        : checklist.map((list) => (
          <div key={list.id}>
            <h2>{list.title}</h2>
            <ul>
              {list.items.map((i) => (
                <li>{i}</li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}

export default PageHome;
