import * as Icons from "react-icons/tb";
import Brands from "../../api/Brands.json";
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

const ManageBrand = () => {
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
      ...brand,
      [key]: value,
    });
  };
  const brands = Brands;

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
      brands.forEach((brand) => {
        updateChecks[brand.id] = true;
      });
      setSpecificChecks(updateChecks);
    } else {
      setSpecificChecks({});
    }
  };

  const handleCheckBrand = (isCheck, id) => {
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
      navigate(`/brands/manage/${itemID}`);
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
    <section className="brands">
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
                placeholder="Search Brand..."
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
                      placeholder="Enter the brand name"
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
                      placeholder="Enter the brand price"
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
                <Link to="/catalog/brand/add" className="sm button">
                  <Icons.TbPlus />
                  <span>Create Brand</span>
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
                      <th className="td_id">id</th>
                      <th className="td_image">image</th>
                      <th>name</th>
                      <th>Is Featured</th>
                      <th>created at</th>
                      <th className="td_status">status</th>
                      <th className="td_action">#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brands.map((brand, key) => {
                      return (
                        <tr key={key}>
                          <td className="td_checkbox">
                            <CheckBox
                              onChange={(isCheck) =>
                                handleCheckBrand(isCheck, brand.id)
                              }
                              isChecked={specificChecks[brand.id] || false}
                            />
                          </td>
                          <td className="td_id">{brand.id}</td>
                          <td className="td_image">
                            <img src={brand.image} alt={brand.name} />
                          </td>
                          <td>
                            <Link to={brand.id.toString()}>{brand.name}</Link>
                          </td>
                          <td>
                          	<p>{brand.isFeatured ? "true" : "false"}</p>
                          </td>
                          {/* Add other fields as needed */}
                          <td>{brand.createdAt}</td>
                          <td className="td_status">
                            {brand.status.toLowerCase() === "active" ||
                             brand.status.toLowerCase() === "completed" ||
                             brand.status.toLowerCase() === "new" ||
                             brand.status.toLowerCase() === "coming soon" ? (
                               <Badge
                                 label={brand.status}
                                 className="light-success"
                               />
                             ) : brand.status.toLowerCase() === "inactive" ||
                               brand.status.toLowerCase() === "out of stock" ||
                               brand.status.toLowerCase() === "discontinued" ? (
                               <Badge
                                 label={brand.status}
                                 className="light-danger"
                               />
                             ) : brand.status.toLowerCase() === "on sale" ||
                                 brand.status.toLowerCase() === "featured" ||
                                 brand.status.toLowerCase() === "pending" ? (
                               <Badge
                                 label={brand.status}
                                 className="light-warning"
                               />
                             ) : brand.status.toLowerCase() === "archive" ||
                                 brand.status.toLowerCase() === "pause" ? (
                               <Badge
                                 label={brand.status}
                                 className="light-secondary"
                               />
                             ) : (
                               ""
                             )}
                          </td>
                          <td className="td_action">
                            <TableAction
                              actionItems={actionItems}
                              onActionItemClick={(item) =>
                                handleActionItemClick(item, brand.id)
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

export default ManageBrand;
