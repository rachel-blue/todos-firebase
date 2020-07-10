import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../firebase';
import { UserContext } from '../../../app/UserContextProvider';
import ListItem from './ListItem';

function PageChecklist() {
  const { user } = useContext(UserContext);
  const { id } = useParams();

  const [list, setList] = useState([]);
  const [checklistTitle, setChecklistTitle] = useState('');
  const [newItem, setNewItem] = useState('');
  const [initValue, setInitValue] = useState(false);

  const handleUpdate = useCallback(
    async () => {
      const updateData = {
        title: checklistTitle,
        createdBy: user.uid,
        items: list,
      };

      await db.collection('checklists')
        .doc(id)
        .set(updateData);
    },
    [id, checklistTitle, list, user.uid],
  );

  const getData = useCallback(
    async () => {
      const response = await db
        .collection('checklists')
        .doc(id)
        .get();

      const listItems = response.data();
      setList(listItems.items);
      setChecklistTitle(listItems.title);
      setInitValue(true);
    },
    [id],
  );

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

  useEffect(() => {
    if (initValue === true) {
      handleUpdate();
    }

  }, [handleUpdate, checklistTitle, list, list.value, initValue]);

  if (!list) {
    return (
      <p>loading...</p>
    );
  }
  return (
    <div>
      <h2>
        <input
          value={checklistTitle}
          onChange={(evt) => setChecklistTitle(evt.target.value)}
        />
      </h2>
      <ul>
        {list.map((item, index) => (
          <ListItem
            item={item}
            index={index}
            handleCheck={handleCheck}
            handleChange={handleChange}
            handleItemDelete={handleItemDelete}
            key={item.key}
          />
        ))}
        <form
          onSubmit={(evt) => {
            handleNew(evt);
            setNewItem('');
          }}
        >
          <input
            placeholder="add new item"
            value={newItem.name}
            onChange={(evt) => {
              setNewItem(evt.target.value);
            }}
          />
          <button
            type="submit"
          >
            +
          </button>
        </form>
      </ul>
    </div>
  );
}

export default PageChecklist;
