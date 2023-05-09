import React, { useEffect, useState, Fragment } from "react";
import ReactPaginate from "react-paginate";
import EditTableData from "./EditTableData";
import TableData from "./TableData";

function Table() {
  const [data, setData] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: ""
  });
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const itemsPerPage = 10;
  let pageVisited = pageCount * itemsPerPage;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const pageChange = ({ selected }) => {
    setPageCount(selected);
  };

  const getUsersDetails = () => {
    fetch(
      `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const handleFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...formData };
    newFormData[fieldName] = fieldValue;
    setFormData(newFormData);
  };

  const handleCancel = () => {
    setEditUserId(null);
  };

  const handleEdit = (event, contact) => {
    event.preventDefault();
    setEditUserId(contact.id);
    const formValues = {
      name: contact.name,
      email: contact.email,
      role: contact.role
    };
    setFormData(formValues);
  };

  const handleDelete = (contactId) => {
    const newContacts = [...data];
    const index = data.findIndex((contact) => contact.id === contactId);
    newContacts.splice(index, 1);
    setData(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedContact = {
      id: editUserId,
      name: formData.name,
      email: formData.email,
      role: formData.role
    };
    const newContacts = [...data];
    const index = data.findIndex((contact) => contact.id === editUserId);
    newContacts[index] = editedContact;
    setData(newContacts);
    setEditUserId(null);
  };

  const handleDeleteSelected = () => {
    setData(data.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    setSelectAll(false);
  };

  const handleCheckbox = (event) => {
    const itemId = event.id;
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
      setSelectAll(false);
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleSelectAll = () => {
    if (!selectAll) {
      const itemIds = data.slice(0, itemsPerPage).map((item) => item.id);
      setSelectedItems(itemIds);
      setSelectAll(true);
    } else {
      setSelectedItems([]);
      setSelectAll(false);
    }
  };

  useEffect(() => {
    getUsersDetails();
  }, []);

  return (
    <div className="container">
      <br />
      <input
        type="text"
        name="name"
        placeholder=" Search by any field "
        onChange={(e) => setSearchUser(e.target.value)}
      />
      <form onSubmit={handleEditFormSubmit}>
        <table className="table">
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Name </th>
            <th>Email </th>
            <th> Role</th>
            <th>Action</th>
          </tr>
          {data
            .filter((user) => {
              if (searchUser === "") return user;
              else if (
                user.name.includes(searchUser) ||
                user.email.includes(searchUser) ||
                user.role.includes(searchUser)
              ) {
                return user;
              }
            })
            .slice(pageVisited, pageVisited + itemsPerPage)
            .map((user) => (
              <Fragment>
                {editUserId === user.id ? (
                  <EditTableData
                    editFormData={formData}
                    handleFormChange={handleFormChange}
                    handleCancelClick={handleCancel}
                  />
                ) : (
                  <TableData
                    user={user}
                    handleEditClick={handleEdit}
                    handleDeleteClick={handleDelete}
                    selectedItems={selectedItems}
                    handleCheckboxChange={handleCheckbox}
                  />
                )}
              </Fragment>
            ))}
        </table>
      </form>
      <br />
      <br />
      <div className="footer">
        {selectedItems.length > 0 && (
          <button onClick={handleDeleteSelected}>Delete selected</button>
        )}
        <ReactPaginate
          className="pagination"
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={totalPages}
          onPageChange={pageChange}
          containerClassName={<pagination />}
        />
      </div>
    </div>
  );
}

export default Table;
