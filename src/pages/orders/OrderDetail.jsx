import React from "react";
import * as Icons from "react-icons/tb";
import Orders from "../../api/Orders.json";
import Products from "../../api/Products.json";
import Customers from "../../api/Customers.json";
import { Link, useParams } from "react-router-dom";
import Badge from "../../components/common/Badge.jsx";
import Rating from "../../components/common/Rating.jsx";
import Button from "../../components/common/Button.jsx";
import Profile from "../../components/common/Profile.jsx";
import truck from '../../images/common/delivery-truck.gif'
// import truck from '../../images/common/delivery-truck-2.gif'
// import truck from '../../images/common/delivery-truck-3.gif'

const OrderDetail = () => {
  const { orderID } = useParams();

  // Find the specific order using orderID from URL params
  const order = Orders.find(
    (order) => order.id.toString() === orderID.toString()
  );

  const customer = Customers.find(
    (customer) => customer.id.toString() === order.customer_id.toString()
  );

  const products = order.products.map((productID) => {
    const product = Products.find(
      (product) => product.id.toString() === productID.product_id.toString()
    );
    return {
      ...product,
      quantity: productID.quantity,
    };
  });
  const handleInvoice = () => {
    alert("Under Construction invoice page");
  }
  return (
    <section className="orders">
      <div className="container">
        <div className="wrapper">
          <div className="content">
            <div className="content_item">
              <h2 className="sub_heading">
                <span>Order #{order.id}</span>
                <Button
                  icon={<Icons.TbDownload/>}
                  label="invoice"
                  className="bg_light_success sm"
                  onClick={handleInvoice}
                />
              </h2>
              <table className="bordered">
                <thead>
                  <tr>
                    <th>image</th>
                    <th>name</th>
                    <th>Item price</th>
                    <th>Quantity</th>
                    <th>Rating</th>
                    <th>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img src={product.images.thumbnail} alt="" />
                      </td>
                      <td>
                        <Link
                          to={`/catalog/product/manage/${product.id.toString()}`}
                        >
                          {product.name}
                        </Link>
                      </td>
                      <td>${product.price}</td>
                      <td>{product.quantity}</td>
                      <td>
                        <Rating value={product.ratings.average_rating} />
                      </td>
                      <td>${product.price * product.quantity}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="5" className="td_no_p"><b>Sub Total</b></td>
                    <td colSpan="1" className="td_no_p"><b>$359.96</b></td>
                  </tr>
                  <tr>
                    <td colSpan="5" className="td_no_p"><b>Discount (VELZON15) : :</b></td>
                    <td colSpan="1" className="td_no_p"><b>-$53.99</b></td>
                  </tr>
                  <tr>
                    <td colSpan="5" className="td_no_p"><b>Shipping Charge :</b></td>
                    <td colSpan="1" className="td_no_p"><b>$65.00</b></td>
                  </tr>
                  <tr>
                    <td colSpan="5" className="td_no_p"><b>Estimated Tax :</b></td>
                    <td colSpan="1" className="td_no_p"><b>$44.99</b></td>
                  </tr>
                  <tr>
                    <td colSpan="5" className="td_no_p"><b>Total amount</b></td>
                    <td colSpan="1" className="td_no_p"><b>$44.99</b></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="content_item">
              <h2 className="sub_heading">
                <span>Order Status</span>
                <Button
                  icon={<Icons.TbMapPin/>}
                  label="address change"
                  className="bg_light_primary sm right"
                />
                <Button
                  icon={<Icons.TbShoppingCartCancel/>}
                  label="Cancel order"
                  className="bg_light_danger sm"
                />
              </h2>
              <div className="order_status">
                {order.order_status.map((status, index) => (
                  <div key={index} className="order_status_item">
                    <div className="order_status_icon">
                      {
                        status.status.toLowerCase() === "order placed" ? (
                          <Icons.TbChecklist/>
                        ) :
                        status.status.toLowerCase() === "processing" ? (
                          <Icons.TbReload/>
                        ) :
                        status.status.toLowerCase() === "packed" ? (
                          <Icons.TbPackage/>
                        ) : 
                        status.status.toLowerCase() === "shipping" ? (
                          <Icons.TbTruckDelivery/>
                        ) : 
                        status.status.toLowerCase() === "out for delivery" ? (
                          <Icons.TbTruckLoading/>
                        ) : 
                        status.status.toLowerCase() === "delivered" ? (
                          <Icons.TbShoppingBagCheck/>
                        ) : ""
                      }
                    </div>
                    <div className="order_status_content">
                      <h3>{status.status}</h3>
                      <h5>{status.description}</h5>
                      <p>{status.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="sidebar">
            <div className="sidebar_item">
              <div className="logistics_item">
                <img src={truck} alt="" height="100px"/>
                <p> <b>Order Date: </b> {order.order_date}</p>
                <p>
                  <b>Shipping Address: </b>
                  {order.shipping_address.street},{" "}
                  {order.shipping_address.city}, {order.shipping_address.state},{" "}
                  {order.shipping_address.zip}
                </p>
              </div>
            </div>
            <div className="sidebar_item">
              <h2 className="sub_heading">Payment Details:</h2>

              <div className="column">
                <div className="detail_list">
                  <div className="detail_list_item">
                    <b>Transaction ID:</b>
                    <p>{order.payment_details.transaction_id}</p>
                  </div>
                  <div className="detail_list_item">
                    <b>Payment Method:</b>
                    <p>{order.payment_details.payment_method}</p>
                  </div>
                  <div className="detail_list_item">
                    <b>Amount:</b>
                    <p>${order.payment_details.amount}</p>
                  </div>
                  <div className="detail_list_item">
                    <b>Payment Status:</b>
                      {order.payment_details.status.toLowerCase() === "active" ||
                      order.payment_details.status.toLowerCase() === "completed" ||
                      order.payment_details.status.toLowerCase() === "approved" ||
                      order.payment_details.status.toLowerCase() === "delivered" ||
                      order.payment_details.status.toLowerCase() === "success" ||
                      order.payment_details.status.toLowerCase() === "shipped" ||
                      order.payment_details.status.toLowerCase() === "new" ||
                      order.payment_details.status.toLowerCase() === "coming soon" ? (
                        <Badge label={order.payment_details.status} className="light-success" />
                      ) : order.payment_details.status.toLowerCase() === "inactive" ||
                        order.payment_details.status.toLowerCase() === "out of stock" ||
                        order.payment_details.status.toLowerCase() === "rejected" ||
                        order.payment_details.status.toLowerCase() === "locked" ||
                        order.payment_details.status.toLowerCase() === "discontinued" ? (
                        <Badge label={order.payment_details.status} className="light-danger" />
                      ) : order.payment_details.status.toLowerCase() === "on sale" ||
                        order.payment_details.status.toLowerCase() === "featured" ||
                        order.payment_details.status.toLowerCase() === "shipping" ||
                        order.payment_details.status.toLowerCase() === "processing" ||
                        order.payment_details.status.toLowerCase() === "pending" ? (
                        <Badge label={order.payment_details.status} className="light-warning" />
                      ) : order.payment_details.status.toLowerCase() === "archive" ||
                        order.payment_details.status.toLowerCase() === "pause" ? (
                        <Badge
                          label={order.payment_details.status}
                          className="light-secondary"
                        />
                      ) : (
                        order.payment_details.status
                      )}
                  </div>
                </div>
              </div>
            </div>
            <div className="sidebar_item">
              <h2 className="sub_heading">Customer Details:</h2>
              <div className="column">
                <Profile
                  name={customer.name}
                  slogan="customer"
                  link={`/customers/manage/${customer.id}`}
                  src={customer.image}
                />
              </div>
              <div className="column">
                <div className="detail_list">
                  <div className="detail_list_item">
                    <Icons.TbMail />
                    <p>{customer.contact.email}</p>
                  </div>
                  <div className="detail_list_item">
                    <Icons.TbPhone />
                    <p>{customer.contact.phone}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="sidebar_item">
              <h2 className="sub_heading">shipping Address:</h2>
              <div className="column">
                <div className="detail_list">
                  <div className="detail_list_item">
                    <Icons.TbPoint />
                    <p>{order.shipping_address.street}</p>
                  </div>
                  <div className="detail_list_item">
                    <Icons.TbPoint />
                    <p>{order.shipping_address.city}</p>
                  </div>
                  <div className="detail_list_item">
                    <Icons.TbPoint />
                    <p>{order.shipping_address.state}</p>
                  </div>
                  <div className="detail_list_item">
                    <Icons.TbPoint />
                    <p>{order.shipping_address.zip}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="sidebar_item">
              <h2 className="sub_heading">Billing Address:</h2>
              <div className="column">
                <div className="detail_list">
                  <div className="detail_list_item">
                    <Icons.TbPoint />
                    <p>{order.billing_address.street}</p>
                  </div>
                  <div className="detail_list_item">
                    <Icons.TbPoint />
                    <p>{order.billing_address.city}</p>
                  </div>
                  <div className="detail_list_item">
                    <Icons.TbPoint />
                    <p>{order.billing_address.state}</p>
                  </div>
                  <div className="detail_list_item">
                    <Icons.TbPoint />
                    <p>{order.billing_address.zip}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;
