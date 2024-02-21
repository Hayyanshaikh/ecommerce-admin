import React,{ useState } from 'react';
import * as Icons from "react-icons/tb";
import Products from '../../api/Products.json';
import Customers from '../../api/Customers.json';
import Modal from "../../components/common/Modal.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import Profile from "../../components/common/Profile.jsx";
import Dropdown from "../../components/common/Dropdown.jsx";
import MultiSelect from "../../components/common/MultiSelect.jsx";

const AddOrder = () => {
  const [fields, setFields] = useState({
    name: "",
    paymentMethodOptions: null,
    customerOptions: null,
  });
	const [searchResults, setSearchResults] = useState(Products);
	const [selectedProducts, setSelectedProducts] = useState([]);
	const [customerDetail, setCustomerDetail] = useState(null);

  const handleInputChange = (fieldName, value) => {
    setFields({ ...fields, [fieldName]: value });

    const filteredResults = Products.filter(result =>
      result.name.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  const handleSelectProduct = (id) => {
  	const select = Products.find(result =>
  		result.id === id
    );

    setSelectedProducts([...selectedProducts,select]);
    setFields({ ...fields, name:"" });
  }

  const handleDeleteProduct = (id) => {
  	const updatedProducts = selectedProducts.filter(result =>
  		result.id !== id
    );

    setSelectedProducts(updatedProducts)
  }

  
  const paymentMethods = [
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'debit_card', label: 'Debit Card' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'COD', label: 'COD (Cash on delivery)' },
	];

  const customersOptions = Customers.map(customer=>({
  	label:customer.name,
  	value:customer.id,
  }));


  const handlePaymentMethodSelect = (option) => {
    setFields({ ...fields, paymentMethodOptions:option.label });
  };

  const handleCustomerSelect = (option) => {
    setFields({ ...fields, customerOptions:option.label });
  	const customerDetail = Customers.find(customer=>{
  		if (option[0] === customer.name) {
  			return customer;
  		}
  	})
  	console.log(option);
  	setCustomerDetail(customerDetail);
  };
	return (
		<section>
			<div className="container">
				<div className="wrapper">
					<div className="content">
						<div className="content_item">
							<h2 className="sub_heading">Create order</h2>
              <div className="column">
                <Input
                  type="text"
                  placeholder="Product Name"
                  label="Name"
                  value={fields.name}
                  onChange={(value) => handleInputChange("name", value)}
                />
                {
		                <div className="search-results-container">
							        <table className="bordered">
										    <thead>
										      <tr>
										        <th>ID</th>
										        <th>Image</th>
										        <th>Name</th>
										        <th>price</th>
										        <th className="td_action">#</th>
										      </tr>
										    </thead>
										    <tbody>
										      {searchResults.map((result) => (
										        <tr key={result.id} className="search-results-row">
										          <td className="td_id">{result.id}</td>
										          <td className="td_image">
										          	<img src={result.images.thumbnail} alt=""/>
										          </td>
										          <td>{result.name}</td>
										          <td>{result.price}</td>
										          <td className="td_action">
										          	<Button
										          		label="add"
										          		icon={<Icons.TbPlus/>}
										          		className="success sm"
										          		onClick={()=>handleSelectProduct(result.id)}
										          	/>
										          </td>
										        </tr>
										      ))}
										    </tbody>
										  </table>
							      </div>
                }
              </div>
							<h2 className="sub_heading">seleced order</h2>
			        {
			        	selectedProducts.length !== 0 ? (
			        		<table className="bordered">
								    <thead>
								      <tr>
								        <th>ID</th>
								        <th>Image</th>
								        <th>Name</th>
								        <th>Price</th>
								        <th className="td_action">#</th>
								      </tr>
								    </thead>
								    <tbody>
								      {selectedProducts.map((selected) => (
								        <tr key={selected.id} className="search-results-row">
								          <td className="td_id">{selected.id}</td>
								          <td className="td_image">
								          	<img src={selected.images.thumbnail} alt=""/>
								          </td>
								          <td className="">{selected.name}</td>
								          <td className="">{selected.price}</td>
								          <td className="td_action">
								          	<Button
								          		label="Delete"
								          		icon={<Icons.TbX/>}
								          		className="danger sm"
								          		onClick={()=>handleDeleteProduct(selected.id)}
								          	/>
								          </td>
								        </tr>
								      ))}
								    </tbody>
								  </table>
			        	) : ""
			        }
						</div>
					</div>
					<div className="sidebar">
						<div className="sidebar_item">
						  <h2 className="sub_heading">select Customer</h2>
							<div className="column">
								<MultiSelect
					        placeholder="Select an option"
					        options={customersOptions}
					        isSelected={fields.customerOptions}
					        onChange={handleCustomerSelect}
					      />
							</div>
						  <h2 className="sub_heading">Customer Details:</h2>
						  {
						  	customerDetail != null ? (
						  		<>
						  			<div className="column">
									    <Profile
									      name={customerDetail.name}
									      slogan="customer"
									      link={`/customers/manage/${customerDetail.id}`}
									      src={customerDetail.image}
									    />
									  </div>
									  <div className="column">
									    <div className="detail_list">
									      <div className="detail_list_item">
									        <Icons.TbMail />
									        <p>{customerDetail.contact.email}</p>
									      </div>
									      <div className="detail_list_item">
									        <Icons.TbPhone />
									        <p>{customerDetail.contact.phone}</p>
									      </div>
										    <div className="detail_list_item">
										      <Icons.TbPoint />
										      <p>{customerDetail.addresses[0].street}</p>
										    </div>
										    <div className="detail_list_item">
										      <Icons.TbPoint />
										      <p>{customerDetail.addresses[0].city}</p>
										    </div>
										    <div className="detail_list_item">
										      <Icons.TbPoint />
										      <p>{customerDetail.addresses[0].state}</p>
										    </div>
										    <div className="detail_list_item">
										      <Icons.TbPoint />
										      <p>{customerDetail.addresses[0].zip}</p>
										    </div>
										  </div>
										</div>
						  		</>
						  	)  : ""
						  }
						</div>
						<div className="sidebar_item">
							<h2 className="sub_heading">Publish</h2>
							<div className="column">
								<Dropdown
					        placeholder="Select an option"
					        options={paymentMethods}
					        selectedValue={fields.paymentMethodOptions}
					        onClick={handlePaymentMethodSelect}
					      />
							</div>
								<Button
									className="success sm"
									label="create"
									icon={<Icons.TbPlus/>}
								/>
								<Button
									className="sm"
									label="Discard"
									icon={<Icons.TbX/>}
								/>
						</div>
						<div className="sidebar_item">
							<h2 className="sub_heading">payment</h2>
							<div className="column">
								<ul className="payment_list">
								  <li>
								    <span>Sub amount:</span>
								    <b>$123</b>
								  </li>
								  <li>
								    <span>Tax Amount:</span>
								    <b>$123</b>
								  </li>
								  <li>
								    <span>Promotion amount:</span>
								    <b>$123</b>
								  </li>
								  <li>
								    <span>add discount:</span>
								    <b>$123</b>
								  </li>
								  <li>
								    <span>Total amount:</span>
								    <b>$123</b>
								  </li>
								</ul>
							</div>
						</div>

					</div>
				</div>
			</div>
		</section>
	)
}

export default AddOrder