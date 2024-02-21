import * as Icons from "react-icons/tb";
import Customers from "../../api/Customers.json";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input.jsx";
import Badge from "../../components/common/Badge.jsx";
import Button from "../../components/common/Button.jsx";
import CheckBox from "../../components/common/CheckBox.jsx";
import Dropdown from "../../components/common/Dropdown.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import TableAction from "../../components/common/TableAction.jsx";
import SelectOption from "../../components/common/SelectOption.jsx";

const ManageCustomer = () => {
  const [bulkCheck, setBulkCheck] = useState(false);
  const [specificChecks, setSpecificChecks] = useState({});
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedValue, setSelectedValue] = useState(5);
  const [tableRow, setTableRow] = useState([
    { value: 2, label: "2" },
    { value: 5, label: "5" },
    { value: 10, label: "10" },
  ]);

  const customer = Customers;

  const bulkAction = [
    { value: "delete", label: "Delete" },
    { value: "category", label: "Category" },
    { value: "status", label: "Status" },
  ];

  const bulkActionDropDown = (selectedOption) => {
    console.log(selectedOption);
  };

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleBulkCheckbox = (isCheck) => {
    setBulkCheck(isCheck);
    if (isCheck) {
      const updateChecks = {};
      customer.forEach((customer) => {
        updateChecks[customer.id] = true;
      });
      setSpecificChecks(updateChecks);
    } else {
      setSpecificChecks({});
    }
  };

  const handleCheckCustomer = (isCheck, id) => {
    setSpecificChecks((prevSpecificChecks) => ({
      ...prevSpecificChecks,
      [id]: isCheck,
    }));
  };

  const showTableRow = (selectedOption) => {
    setSelectedValue(selectedOption.label);
  };


  const actionItems = ["Delete", "edit"];

  const handleActionItemClick = (item, itemID) => {
    var updateItem = item.toLowerCase();
    if (updateItem === "delete") {
      alert(`#${itemID} item delete`);
    } else if (updateItem === "edit") {
      navigate(`/customers/manage/${itemID}`);
    }
  };


  return (
    <section className="customer">
      <div className="container">
        <div className="wrapper">
          <div className="content transparent">
            <div className="content_head">
              <Dropdown
                placeholder="Bulk Action"
                className="sm"
                onClick={bulkActionDropDown}
                options={bulkAction}
              />
              <Input
                placeholder="Search Customer..."
                className="sm table_search"
              />
              <div className="btn_parent">
                <Link to="/customers/add" className="sm button">
                  <Icons.TbPlus />
                  <span>Create Customer</span>
                </Link>
                <Button label="Advance Filter" className="sm" />
                <Button label="save" className="sm" />
              </div>
            </div>
            <div className="content_body">
              <div className="table_responsive">
                <table className="separate">
                  <thead>
                    <tr>
                      <th className="td_checkbox">
                        <CheckBox
                          onChange={handleBulkCheckbox}
                          isChecked={bulkCheck}
                        />
                      </th>
                      <th className="td_id">id</th>
                      <th className="td_image">image</th>
                      <th colSpan="4">name</th>
                      <th>email</th>
                      <th>orders</th>
                      <th className="td_status">status</th>
                      <th className="td_date">created at</th>
                      <th>actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer.map((customer, key) => {
                      return (
                        <tr key={key}>
                          <td className="td_checkbox">
                            <CheckBox
                              onChange={(isCheck) =>
                                handleCheckCustomer(isCheck, customer.id)
                              }
                              isChecked={specificChecks[customer.id] || false}
                            />
                          </td>
                          <td className="td_id">{customer.id}</td>
                          <td className="td_image">
                            <img
                              src={`${customer.image}${customer.name}`}
                              alt={customer.name}
                            />
                          </td>
                          <td colSpan="4">
                            <Link to={customer.id.toString()}>{customer.name}</Link>
                          </td>
                          <td>{customer.contact.email}</td>
                          <td>{customer.purchase_history.length}</td>
                          <td className="td_status">
                            {customer.status.toLowerCase() === "active" ||
                             customer.status.toLowerCase() === "completed" ||
                             customer.status.toLowerCase() === "new" ||
                             customer.status.toLowerCase() === "coming soon" ? (
                               <Badge
                                 label={customer.status}
                                 className="light-success"
                               />
                             ) : customer.status.toLowerCase() === "inactive" ||
                               customer.status.toLowerCase() === "out of stock" ||
                               customer.status.toLowerCase() === "locked" ||
                               customer.status.toLowerCase() === "discontinued" ? (
                               <Badge
                                 label={customer.status}
                                 className="light-danger"
                               />
                             ) : customer.status.toLowerCase() === "on sale" ||
                                 customer.status.toLowerCase() === "featured" ||
                                 customer.status.toLowerCase() === "pending" ? (
                               <Badge
                                 label={customer.status}
                                 className="light-warning"
                               />
                             ) : customer.status.toLowerCase() === "archive" ||
                                 customer.status.toLowerCase() === "pause" ? (
                               <Badge
                                 label={customer.status}
                                 className="light-secondary"
                               />
                             ) : (
                               ""
                             )}
                          </td>
                          <td className="td_date">{customer.createdAt}</td>
                          
                          <td className="td_action">
                            <TableAction
                              actionItems={actionItems}
                              onActionItemClick={(item) =>
                                handleActionItemClick(item, customer.id)
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="content_footer">
              <Dropdown
                className="top show_rows sm"
                placeholder="please select"
                selectedValue={selectedValue}
                onClick={showTableRow}
                options={tableRow}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={5}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageCustomer;