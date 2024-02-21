import React from 'react';
import * as Icons from "react-icons/tb";
import Orders from '../../api/Orders.json'; // Import Orders data
import { Link,useParams } from 'react-router-dom';
import Customers from '../../api/Customers.json';
import Transactions from '../../api/Transactions.json';
import Profile from "../../components/common/Profile.jsx";

const TransactionDetail = () => {
  const { transactionId } = useParams();

  const transaction = Transactions.find(transaction => transaction.id === transactionId);
  const customer = Customers.find(customer => customer.id.toString() === transaction.customerID.toString());
  const order = Orders.find(order => order.id.toString() === transaction.orderId.toString());

  return (
    <section className="transaction-detail">
      <div className="container">
        <div className="wrapper">
          <div className="content">
            <div className="content_item">
              {transaction ? (
                <table className="bordered normal">
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="td_id">ID</td>
                      <td>{transaction.id}</td>
                    </tr>
                    <tr>
                      <td className="td_id">Charge ID</td>
                      <td>{transaction.chargeId}</td>
                    </tr>
                    <tr>
                      <td className="td_id">Payer Name</td>
                      <td>{customer.name}</td>
                    </tr>
                    <tr>
                      <td className="td_id">Amount</td>
                      <td>{transaction.amount}</td>
                    </tr>
                    <tr>
                      <td className="td_id">Payment Channel</td>
                      <td>{transaction.paymentChannel}</td>
                    </tr>
                    <tr>
                      <td className="td_id">Customer ID</td>
                      <td>{transaction.customerID}</td>
                    </tr>
                    <tr>
                      <td className="td_id">Status</td>
                      <td>{transaction.status}</td>
                    </tr>
                    <tr>
                      <td className="td_id">Created At</td>
                      <td>{transaction.createdAt}</td>
                    </tr>
                    <tr>
                      <td className="td_id">Order ID</td>
                      <td>
                        <Link to={`/orders/manage/${order.id}`}>#{order.id}</Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="td_id">Order Date</td>
                      <td>{order.order_date}</td>
                    </tr>
                    <tr>
                      <td className="td_id">Order Status</td>
                      <td>{order.status}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p>Transaction not found</p>
              )}
            </div>
          </div>
          <div className="sidebar">
            <div className="sidebar_item">
              <h2 className="sub_heading">Customer Details:</h2>
              <div className="column">
                {customer && (
                  <Profile
                    name={customer.name}
                    slogan="customer"
                    link={`/customers/manage/${customer.id}`}
                    src={customer.image}
                  />
                )}
              </div>
              <div className="column">
                {customer && (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TransactionDetail;