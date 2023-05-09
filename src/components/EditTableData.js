import React from "react";

const EditTableData = ({
  editFormData,
  handleFormChange,
  handleCancelClick
}) => {
  return (
    <tr>
      <td></td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="fullName"
          value={editFormData.name}
          onChange={handleFormChange}
        ></input>
      </td>
      <td>
        <input
          type="email"
          required="required"
          placeholder="Enter an email..."
          name="email"
          value={editFormData.email}
          onChange={handleFormChange}
        ></input>
      </td>
      <td>
        <input
          type="role"
          required="required"
          placeholder="Enter an Role..."
          name="role"
          value={editFormData.role}
          onChange={handleFormChange}
        ></input>
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditTableData;
