import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase';

function PageChecklist() {
  const [list, setList] = useState();
  const { id } = useParams();

  const getData = useCallback(
    async () => {
      const response = await db
        .collection('checklists')
        .doc(id)
        .get();

      const listItems = response.data();
      setList(listItems);
    },
    [id],
  );

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
      <h2>{list.title}</h2>
      <ul>
        {list.items.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default PageChecklist;
