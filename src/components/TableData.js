const TableData = ({
  user,
  handleEditClick,
  handleDeleteClick,
  handleCheckboxChange,
  selectedItems
}) => {
  return (
    <>
      <tr key={user.id}>
        <td>
          <input
            type="checkbox"
            value={user.id}
            checked={selectedItems.includes(user.id)}
            onChange={(e) => handleCheckboxChange(user)}
          />
        </td>
        <td> {user.name} </td>
        <td> {user.email} </td>
        <td> {user.role} </td>
        <td>
          <button
            type="button"
            onClick={(event) => handleEditClick(event, user)}
          >
            Edit
          </button>
          <button type="button" onClick={() => handleDeleteClick(user.id)}>
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default TableData;
