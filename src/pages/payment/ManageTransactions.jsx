import * as Icons from "react-icons/tb";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input.jsx";
import Badge from "../../components/common/Badge.jsx";
import Transactions from '../../api/Transactions.json';
import Button from "../../components/common/Button.jsx";
import CheckBox from "../../components/common/CheckBox.jsx";
import Dropdown from "../../components/common/Dropdown.jsx";
import Offcanvas from "../../components/common/Offcanvas.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import TableAction from "../../components/common/TableAction.jsx";
import RangeSlider from "../../components/common/RangeSlider.jsx";
import MultiSelect from "../../components/common/MultiSelect.jsx";

const ManageTransactions = () => {
  const [fields, setFields] = useState({
    name: "",
    sku: "",
    store: "",
    status: "",
    priceRange: [0,100],
  });
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
  const handleInputChange = (key, value) => {
    setFields({
      ...transaction,
      [key]: value,
    });
  };
  const transactions = Transactions;

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
      transactions.forEach((transaction) => {
        updateChecks[transaction.id] = true;
      });
      setSpecificChecks(updateChecks);
    } else {
      setSpecificChecks({});
    }
  };

  const handleCheckProduct = (isCheck, id) => {
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
      navigate(`/payment/transactions/${itemID}`);
    }
  };

  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const handleToggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  const handleCloseOffcanvas = () => {
    setIsOffcanvasOpen(false);
  };

  const handleSliderChange = (newValues) => {
    setFields({
      ...fields,
      priceRange: newValues,
    })
  };

  const stores = [
      { label: 'FashionFiesta' },
      { label: 'TechTreasures' },
      { label: 'GadgetGrove' },
      { label: 'HomeHarbor' },
      { label: 'HealthHaven' },
      { label: 'BeautyBoutique' },
      { label: "Bookworm's Haven" },
      { label: 'PetParadise' },
      { label: 'FoodieFinds' }
  ];
const status = [
    { label: 'In Stock' },
    { label: 'Out of Stock' },
    { label: 'Available Soon' },
    { label: 'Backorder' },
    { label: 'Refurbished' },
    { label: 'On Sale' },
    { label: 'Limited Stock' },
    { label: 'Discontinued' },
    { label: 'Coming Soon' },
    { label: 'New Arrival' },
    { label: 'Preorder' },
];
  const handleSelectStore = (selectedValues) => {
    setFields({
      ...fields,
      store: selectedValues,
    })
  };

  const handleSelectStatus = (selectedValues) => {
    setFields({
      ...fields,
      status: selectedValues.label,
    })
  };


  return (
    <section className="transactions">
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
              <Button
                label="Advance Filter"
                className="sm"
                icon={<Icons.TbFilter />}
                onClick={handleToggleOffcanvas}
              />
              <Input
                placeholder="Search Transaction..."
                className="sm table_search"
              />
              <Offcanvas
                isOpen={isOffcanvasOpen}
                onClose={handleCloseOffcanvas}
              >
                <div className="offcanvas-head">
                  <h2>Advance Search</h2>
                </div>
                <div className="offcanvas-body">
                  <div className="column">
                    <Input
                      type="text"
                      placeholder="Enter the transaction name"
                      label="Name"
                      value={fields.name}
                      onChange={(value) => handleInputChange("name", value)}
                    />
                  </div>
                  <div className="column">
                    <Input
                      type="text"
                      label="Price"
                      value={fields.price}
                      placeholder="Enter the transaction price"
                      onChange={(value) => handleInputChange("price", value)}
                    />
                  </div>
                  <div className="column">
                    <MultiSelect
                      options={stores}
                      placeholder="Select Store"
                      label="Store"
                      isSelected={fields.store}
                      onChange={handleSelectStore}
                    />
                  </div>
                  <div className="column">
                    <Dropdown
                      options={status}
                      placeholder="Select Store"
                      label="Store"
                      selectedValue={fields.status}
                      onClick={handleSelectStatus}
                    />
                  </div>
                  <div className="column">
                    <RangeSlider label="Price range" values={fields.priceRange} onValuesChange={handleSliderChange} />
                  </div>
                </div>
                <div className="offcanvas-footer">
                  <Button
                    label="Discard"
                    className="sm outline"
                    icon={<Icons.TbX />}
                    onClick={handleCloseOffcanvas}
                  />
                  <Button
                    label="Filter"
                    className="sm"
                    icon={<Icons.TbFilter />}
                    onClick={handleCloseOffcanvas}
                  />
                </div>
              </Offcanvas>
              <div className="btn_parent">
                <Button
                  label="Reload"
                  icon={<Icons.TbRefresh />}
                  className="sm"
                />
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
                      <th className="td_id">Id</th>
                      <th className="td_id">Charge id</th>
                      <th>Payer name</th>
                      <th className="td_price">Amount</th>
                      <th className="td_date">Payment channel</th>
                      <th>Status</th>
                      <th className="td_date">Created at</th>
                      <th>Operations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, key) => {
                      return (
                        <tr key={key}>
                          <td className="td_checkbox">
                            <CheckBox
                              onChange={(isCheck) =>
                                handleCheckProduct(isCheck, transaction.id)
                              }
                              isChecked={specificChecks[transaction.id] || false}
                            />
                          </td>
                        <td className="td_id">{transaction.id}</td>
                        <td className="td_id">{transaction.chargeId}</td>
                        <td>
                          <Link to={transaction.id}>
                            {transaction.payerName}
                          </Link>
                        </td>
                        <td className="td_price">{transaction.amount}</td>
                        <td className="td_date">{transaction.paymentChannel}</td>
                        <td className="td_status">
                            {transaction.status.toLowerCase() === "active" ||
                             transaction.status.toLowerCase() === "completed" ||
                             transaction.status.toLowerCase() === "new" ||
                             transaction.status.toLowerCase() === "published" ||
                             transaction.status.toLowerCase() === "coming soon" ? (
                               <Badge
                                 label={transaction.status}
                                 className="light-success"
                               />
                             ) : transaction.status.toLowerCase() === "inactive" ||
                               transaction.status.toLowerCase() === "out of stock" ||
                               transaction.status.toLowerCase() === "discontinued" ? (
                               <Badge
                                 label={transaction.status}
                                 className="light-danger"
                               />
                             ) : transaction.status.toLowerCase() === "on sale" ||
                                 transaction.status.toLowerCase() === "featured" ||
                                 transaction.status.toLowerCase() === "pending" ? (
                               <Badge
                                 label={transaction.status}
                                 className="light-warning"
                               />
                             ) : transaction.status.toLowerCase() === "archive" ||
                                  transaction.status.toLowerCase() === "draft" ||
                                 transaction.status.toLowerCase() === "pause" ? (
                               <Badge
                                 label={transaction.status}
                                 className="light-secondary"
                               />
                             ) : (
                               "No status"
                             )}
                          </td>
                        <td className="td_date">{transaction.createdAt}</td>
                          <td className="td_action">
                            <TableAction
                              actionItems={actionItems}
                              onActionItemClick={(item) =>
                                handleActionItemClick(item, transaction.id)
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

export default ManageTransactions;
