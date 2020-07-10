import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../firebase';
import { UserContext } from '../../../app/UserContextProvider';

function PageChecklist() {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const { id } = useParams();

  const [list, setList] = useState([]);
  const [checklistTitle, setChecklistTitle] = useState('');
  const [newItem, setNewItem] = useState('');

  const getData = useCallback(
    async () => {
      const response = await db
        .collection('checklists')
        .doc(id)
        .get();

      const listItems = response.data();
      setList(listItems.items);
      setChecklistTitle(listItems.title);
    },
    [id],
  );

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const updateData = {
      title: checklistTitle,
      createdBy: user.uid,
      items: list,
    };

    await db.collection('checklists')
      .doc(id)
      .set(updateData);
  };

  const handleChange = (evt, index) => {
    evt.preventDefault();

    const newList = [...list];
    newList[index].name = evt.target.value;
    setList(newList);
  };

  const handleCheck = (evt, index) => {
    const newList = [...list];
    newList[index].value = evt.currentTarget.checked;
    setList(newList);
  };

  const handleItemDelete = (evt, index) => {
    evt.preventDefault();

    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  const handleNew = (evt) => {
    evt.preventDefault();
    const randomUuid = uuidv4();

    const newItemData = {
      name: newItem,
      key: randomUuid,
      value: false,
    };

    const newList = [...list];
    newList.push(newItemData);
    setList(newList);
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
          {list.map((item, index) => (
            <div key={item.key}>
              <input
                type="checkbox"
                onChange={(evt) => handleCheck(evt, index)}
                checked={item.value}
              />
              <input
                value={(item.name)}
                onChange={(evt) => handleChange(evt, index)}
              />
              <button
                type="button"
                onClick={(evt) => handleItemDelete(evt, index, item)}
              >
                X
              </button>
            </div>
          ))}
          <div>
            <form
              onSubmit={(evt) => handleNew(evt)}
            >
              <input
                placeholder="add new item"
                value={newItem.name}
                onChange={(evt) => setNewItem(evt.target.value)}
              />
              <button
                type="submit"
              >
                +
              </button>
            </form>
          </div>
        </ul>
        <button type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

export default PageChecklist;
