import * as Icons from "react-icons/tb";
import Pages from "../../api/Pages.json";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input.jsx";
import Badge from "../../components/common/Badge.jsx";
import Button from "../../components/common/Button.jsx";
import CheckBox from "../../components/common/CheckBox.jsx";
import Dropdown from "../../components/common/Dropdown.jsx";
import Offcanvas from "../../components/common/Offcanvas.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import TableAction from "../../components/common/TableAction.jsx";
import RangeSlider from "../../components/common/RangeSlider.jsx";
import MultiSelect from "../../components/common/MultiSelect.jsx";

const ManagePages = () => {
  const [fields, setFields] = useState({
    name: "",
    sku: "",
    store: "",
    status: "",
    priceRange: [0, 100],
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
      ...page,
      [key]: value,
    });
  };
  const pages = Pages;

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
      pages.forEach((page) => {
        updateChecks[page.id] = true;
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
      navigate(`/pages/${itemID}`);
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
    });
  };

  const stores = [
    { label: "FashionFiesta" },
    { label: "TechTreasures" },
    { label: "GadgetGrove" },
    { label: "HomeHarbor" },
    { label: "HealthHaven" },
    { label: "BeautyBoutique" },
    { label: "Bookworm's Haven" },
    { label: "PetParadise" },
    { label: "FoodieFinds" },
  ];
  const status = [
    { label: "In Stock" },
    { label: "Out of Stock" },
    { label: "Available Soon" },
    { label: "Backorder" },
    { label: "Refurbished" },
    { label: "On Sale" },
    { label: "Limited Stock" },
    { label: "Discontinued" },
    { label: "Coming Soon" },
    { label: "New Arrival" },
    { label: "Preorder" },
  ];
  const handleSelectStore = (selectedValues) => {
    setFields({
      ...fields,
      store: selectedValues,
    });
  };

  const handleSelectStatus = (selectedValues) => {
    setFields({
      ...fields,
      status: selectedValues.label,
    });
  };

  return (
    <section className="pages">
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
              <Input placeholder="Search Page..." className="sm table_search" />
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
                      placeholder="Enter the page name"
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
                      placeholder="Enter the page price"
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
                    <RangeSlider
                      label="Price range"
                      values={fields.priceRange}
                      onValuesChange={handleSliderChange}
                    />
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
                <Link to="/pages/add" className="sm button">
                  <Icons.TbPlus />
                  <span>Create Page</span>
                </Link>
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
                      <th>ID</th>
                      <th>Name</th>
                      <th>Template</th>
                      <th>Publish</th>
                      <th>Status</th>
                      <th>Operations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pages.map((page, key) => (
                      <tr key={key}>
                        <td className="td_checkbox">
                          <CheckBox
                            onChange={(isCheck) => handleCheckProduct(isCheck, page.id)}
                            isChecked={specificChecks[page.id] || false}
                          />
                        </td>
                        <td className="td_id">{page.id}</td>
                        <td>
                          <Link to={page.id}>{page.title}</Link>
                        </td>
                        <td className="td_date">{page.template}</td>
                        <td className="td_date">{page.publish}</td>
                        <td className="td_status">
                            {page.status.toLowerCase() === "active" ||
                             page.status.toLowerCase() === "completed" ||
                             page.status.toLowerCase() === "new" ||
                             page.status.toLowerCase() === "published" ||
                             page.status.toLowerCase() === "coming soon" ? (
                               <Badge
                                 label={page.status}
                                 className="light-success"
                               />
                             ) : page.status.toLowerCase() === "inactive" ||
                               page.status.toLowerCase() === "out of stock" ||
                               page.status.toLowerCase() === "discontinued" ? (
                               <Badge
                                 label={page.status}
                                 className="light-danger"
                               />
                             ) : page.status.toLowerCase() === "on sale" ||
                                 page.status.toLowerCase() === "featured" ||
                                 page.status.toLowerCase() === "pending" ? (
                               <Badge
                                 label={page.status}
                                 className="light-warning"
                               />
                             ) : page.status.toLowerCase() === "archive" ||
                                  page.status.toLowerCase() === "draft" ||
                                 page.status.toLowerCase() === "pause" ? (
                               <Badge
                                 label={page.status}
                                 className="light-secondary"
                               />
                             ) : (
                               "No status"
                             )}
                          </td>
                        <td className="td_action">
                          <TableAction
                            actionItems={actionItems}
                            onActionItemClick={(item) => handleActionItemClick(item, page.id)}
                          />
                        </td>
                      </tr>
                    ))}
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

export default ManagePages;
