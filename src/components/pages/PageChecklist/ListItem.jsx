import React from 'react';
import PropTypes from 'prop-types';

function ListItem({
  item,
  index,
  handleCheck,
  handleChange,
  handleItemDelete,
}) {
  return (
    <div key={item.key}>
      <input
        type="checkbox"
        onChange={(evt) => {
          handleCheck(evt, index);
        }}
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
  );
}

ListItem.propTypes = {
  // eslint-disable-next-line react/require-default-props
  item: PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
  }),
  index: PropTypes.number.isRequired,
  handleCheck: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleItemDelete: PropTypes.func.isRequired,

};
export default ListItem;
