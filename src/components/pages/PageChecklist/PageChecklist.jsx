import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { db } from '../../../firebase';
import { UserContext } from '../../../app/UserContextProvider';

function PageChecklist() {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const { id } = useParams();

  const [list, setList] = useState();
  const [checklistTitle, setChecklistTitle] = useState();
  const [newChecklistItem, setNewChecklistItem] = useState();

  const getData = useCallback(
    async () => {
      const response = await db
        .collection('checklists')
        .doc(id)
        .get();

      const listItems = response.data();
      setList(listItems);
      setChecklistTitle(listItems.title);
    },
    [id],
  );

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const updateData = {
      title: checklistTitle,
      createdBy: user.uid,
      items: list.items,
    };

    await db.collection('checklists')
      .doc(id)
      .set(updateData);

  };

  const handleDelete = async (evt) => {
    evt.preventDefault();

    await db.collection('checklists')
      .doc(id)
      .delete();

    history.push('/');
  };

  useEffect(() => {
    getData();
  }, [getData]);

  if (!list) {
    return (
      <p>loading...</p>
    );
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit}
      >
        <h2>
          <input
            value={checklistTitle}
            onChange={(evt) => {
              setChecklistTitle(evt.target.value);
            }}
          />
        </h2>

        <ul>
          {list.items.map((item) => (
            <li>
              <input
                value={item}
                onChange={(evt) => {
                  setList(evt.target.value);
                }}
              />
            </li>
          ))}
          <li>
            <input
              placeholder="new item"
              value={newChecklistItem}
              onChange={(evt) => {
                setNewChecklistItem(evt.target.value);
              }}
            />
          </li>
        </ul>
        <button type="submit">
          Update
        </button>
      </form>
      <button
        type="button"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}

export default PageChecklist;
