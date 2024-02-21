import React from "react";
import * as Icons from "react-icons/tb";
import { Link,useParams } from "react-router-dom";
import Reviews from "../../api/Reviews.json";
import Products from "../../api/Products.json";
import Customers from "../../api/Customers.json";
import Badge from "../../components/common/Badge.jsx";
import Rating from "../../components/common/Rating.jsx";
import Button from "../../components/common/Button.jsx";
import Profile from "../../components/common/Profile.jsx";

const ReviewsDetail = () => {
  const { reviewid } = useParams();

  const review = Reviews.find((review) => {
    return review.review_id.toString() === reviewid.toString();
  });

  const customer = Customers.find((customer) => {
    return customer.id.toString() === review.customer_id.toString()
  })

  const product = Products.find((product) => {
    return product.id.toString() === review.product_id.toString()
  })

  console.log(review,product);

  const customerData = {
    name: customer.name,
    src: customer.image,
    slogan: customer.contact.email,
    link: `/customers/manage/${customer.id}`,
  };
  return (
    <section className="manage_event">
      <div className="container">
        <div className="wrapper">
          <div className="content">
            <div className="content_item">
              <h2 className="sub_heading">Review</h2>
              <div className="column">
                <div className="review">
                  <div className="review_head">
                    <Profile {...customerData} />

                    <p className="review_detail_text">
                      <Icons.TbClockHour3 />
                      {review.review_date && review.review_date}
                    </p>
                  </div>
                  <div className="review_body">
                    <p className="review_detail_text">
                      {review.review_text && review.review_text}
                    </p>

                    <div className="rated">
                      <Rating value={review.rating && review.rating} />
                      {review.status.toLowerCase() === "active" ||
                      review.status.toLowerCase() === "completed" ||
                      review.status.toLowerCase() === "approved" ||
                      review.status.toLowerCase() === "delivered" ||
                      review.status.toLowerCase() === "shipped" ||
                      review.status.toLowerCase() === "new" ||
                      review.status.toLowerCase() === "coming soon" ? (
                        <Badge label={review.status} className="light-success" />
                      ) : review.status.toLowerCase() === "inactive" ||
                        review.status.toLowerCase() === "out of stock" ||
                        review.status.toLowerCase() === "rejected" ||
                        review.status.toLowerCase() === "locked" ||
                        review.status.toLowerCase() === "discontinued" ? (
                        <Badge label={review.status} className="light-danger" />
                      ) : review.status.toLowerCase() === "on sale" ||
                        review.status.toLowerCase() === "featured" ||
                        review.status.toLowerCase() === "processing" ||
                        review.status.toLowerCase() === "pending" ? (
                        <Badge label={review.status} className="light-warning" />
                      ) : review.status.toLowerCase() === "archive" ||
                        review.status.toLowerCase() === "pause" ? (
                        <Badge
                          label={review.status}
                          className="light-secondary"
                        />
                      ) : (
                        review.status
                      )}
                    </div>  
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sidebar">
            <div className="sidebar_item">
              <h2 className="sub_heading">published</h2>
              <Button
                label="delete"
                className="danger"
                icon={<Icons.TbTrash />}
              />
              {review.status && review.status === "published" ? (
                <Button
                  label="unpublished"
                  className="danger"
                />
              ) : (
                <Button
                  label="published"
                  className="success"
                />
              )}
            </div>
            <div className="sidebar_item">
              <h2 className="sub_heading">Product</h2>
              <div className="sidebar_product">
                <figure className="sidebar_product_img">
                  <img src={product.images.thumbnail} alt=""/>
                </figure>
                <div className="sidebar_product_content">
                  <Link to={`/catalog/product/manage/${product.id}`} className="sidebar_product_title">{product.name}</Link>
                  <p className="sidebar_product_brand">{product.brand}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsDetail;
