import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../../firebase';
import { UserContext } from '../../../app/UserContextProvider';
import CreateBtn from '../../molecule/CreateBtn/CreateBtn';

function PageHome() {
  const { user } = useContext(UserContext);
  const [checklist, setChecklist] = useState([]);

  const getData = useCallback(
    async () => {
      if (!user) {
        return;
      }
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
    },
    [user],
  );

  const handleDelete = async (evt, index) => {
    evt.preventDefault();

    await db.collection('checklists')
      .doc(checklist[index].id)
      .delete();

    getData();
  };

  useEffect(() => {
    getData();
  }, [getData]);

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
    <div className="row m-4">
      <div className="col-12 align-content-between">
        <CreateBtn />
      </div>
      {checklist.length <= 0
        ? <p>Make a new checklist to get started!</p>
        : checklist.map((list, index) => (
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            <Link to={`/checklists/${list.id}`}>
              <div
                key={list.id}
                className="card my-2 p-4"
              >
                <h2>{list.title}</h2>
                <button
                  type="button"
                  onClick={(evt) => handleDelete(evt, index)}
                >
                  Delete
                </button>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default PageHome;
