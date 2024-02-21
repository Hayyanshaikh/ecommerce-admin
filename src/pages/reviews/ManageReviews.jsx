import * as Icons from "react-icons/tb";
import Reviews from "../../api/Reviews.json";
import Products from "../../api/Products.json";
import Customers from "../../api/Customers.json";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input.jsx";
import Badge from "../../components/common/Badge.jsx";
import Rating from "../../components/common/Rating.jsx";
import Button from "../../components/common/Button.jsx";
import CheckBox from "../../components/common/CheckBox.jsx";
import Dropdown from "../../components/common/Dropdown.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import TableAction from "../../components/common/TableAction.jsx";
import SelectOption from "../../components/common/SelectOption.jsx";

const ManageReviews = () => {
  const [bulkCheck, setBulkCheck] = useState(false);
  const [specificChecks, setSpecificChecks] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedValue, setSelectedValue] = useState(5);
    const navigate = useNavigate();
  const [tableRow, setTableRow] = useState([
    { value: 2, label: "2" },
    { value: 5, label: "5" },
    { value: 10, label: "10" },
  ]);

  const reviews = Reviews;
  const productIds = Reviews.map(review => review.product_id.toString());
  const customerIds = Reviews.map(review => review.customer_id.toString());

  const product = Products.filter(product => productIds.includes(product.id.toString()));
  const customer = Customers.filter(customer => customerIds.includes(customer.id.toString()));
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
      reviews.forEach((review) => {
        updateChecks[review.review_id] = true;
      });
      setSpecificChecks(updateChecks);
    } else {
      setSpecificChecks({});
    }
  };

  const handleCheckReview = (isCheck, id) => {
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
      navigate(`/reviews/${itemID}`);
    }
  };

  return (
    <section className="reviews">
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
                placeholder="Search Review..."
                className="sm table_search"
              />
              <div className="btn_parent">
                <Link to="/catalog/review/add" className="sm button">
                  <Icons.TbPlus />
                  <span>Create Review</span>
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
                      <th>Product</th>
                      <th>Customer</th>
                      <th>Stars</th>
                      <th>Comment</th>
                      <th>created at</th>
                      <th className="td_status">status</th>
                      <th>actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((review, key) => {
                      return (
                        <tr key={key}>
                          <td className="td_checkbox">
                            <CheckBox
                              onChange={(isCheck) =>
                                handleCheckReview(isCheck, review.review_id.toString())
                              }
                              isChecked={specificChecks[review.review_id.toString()] || false}
                            />
                          </td>
                          <td className="td_id">{review.review_id}</td>
                          <td>
                            <Link to={review.review_id}>{product[key].name}</Link>
                          </td>
                          <td>
                            <Link to={review.review_id}>{customer[key].name}</Link>
                          </td>
                          <td>
                            <Rating value={review.rating}/>
                          </td>
                          <td className="td_review">
                            <p>{review.review_text}</p>
                          </td>
                          <td>{review.review_date}</td>
                          <td className="td_status">
                          {review.status.toLowerCase() === "active" ||
                           review.status.toLowerCase() === "completed" ||
                           review.status.toLowerCase() === "approved" ||
                           review.status.toLowerCase() === "delivered" ||
                           review.status.toLowerCase() === "shipped" ||
                           review.status.toLowerCase() === "new" ||
                           review.status.toLowerCase() === "coming soon" ? (
                             <Badge
                               label={review.status}
                               className="light-success"
                             />
                           ) : review.status.toLowerCase() === "inactive" ||
                             review.status.toLowerCase() === "out of stock" ||
                             review.status.toLowerCase() === "rejected" ||
                             review.status.toLowerCase() === "locked" ||
                             review.status.toLowerCase() === "discontinued" ? (
                             <Badge
                               label={review.status}
                               className="light-danger"
                             />
                           ) : review.status.toLowerCase() === "on sale" ||
                               review.status.toLowerCase() === "featured" ||
                               review.status.toLowerCase() === "processing" ||
                               review.status.toLowerCase() === "pending" ? (
                             <Badge
                               label={review.status}
                               className="light-warning"
                             />
                           ) : review.status.toLowerCase() === "archive" ||
                               review.status.toLowerCase() === "pause" ? (
                             <Badge
                               label={review.status}
                               className="light-secondary"
                             />
                           ) : (
                             review.status
                           )}
                        </td>
                         
                          <td className="td_action">
                            <TableAction
                              actionItems={actionItems}
                              onActionItemClick={(item) =>
                                handleActionItemClick(item, review.review_id)
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

export default ManageReviews;