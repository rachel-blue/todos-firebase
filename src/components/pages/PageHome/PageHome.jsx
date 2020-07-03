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
    [user.uid],
  );

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
      {checklist.length <= 0
        ? <CreateBtn />
        : checklist.map((list) => (
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            <Link to={`/checklists/${list.id}`}>
              <div
                key={list.id}
                className="card my-2 p-4"
              >
                <h2>{list.title}</h2>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default PageHome;
