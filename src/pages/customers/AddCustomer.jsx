import * as Icons from "react-icons/tb";
import React, { useState, useEffect } from "react";
import Modal from "../../components/common/Modal.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import Divider from "../../components/common/Divider.jsx";
import Toggler from "../../components/common/Toggler.jsx";
import CheckBox from "../../components/common/CheckBox.jsx";
import Dropdown from "../../components/common/Dropdown.jsx";
import Thumbnail from "../../components/common/Thumbnail.jsx";

const AddCustomer = () => {

  const [fields, setFields] = useState({
    name: "",
    email: "",
    date: "",
    password: "",
    passwordConfirm: "",
    isVendor: false,
    status: "",
    image: "",
  });
  const handleInputChange = (key, value) => {
    setFields({
      ...fields,
      [key]: value,
    });
  };

  const isVendorCheck = (isCheck) => {
    setFields({
      ...fields,
      isVendor: isCheck,
    });
  };

  const [status, setStatus] = useState([
    {
      value: "active",
      label: "active",
    },
    {
      value: "locked",
      label: "locked",
    },
  ]);

  const handleStatusSelect = (isSelect) => {
    setFields({
      ...fields,
      status: isSelect.label,
    });
  };
  return (
    <section>
      <div className="container">
        <div className="wrapper">
          <div className="content">
            <div className="content_item">
              <h2 className="sub_heading">Detail</h2>
              <div className="column">
                <Input
                  type="text"
                  placeholder="Enter the customer name"
                  label="Name"
                  icon={<Icons.TbUser />}
                  value={fields.name}
                  onChange={(value) => handleInputChange("name", value)}
                />
              </div>
              <div className="column">
                <Input
                  type="text"
                  placeholder="Enter the customer email"
                  label="Email"
                  icon={<Icons.TbMail />}
                  value={fields.email}
                  onChange={(value) => handleInputChange("email", value)}
                />
              </div>
              <div className="column">
                <Toggler
                  label="Is Vendor"
                  checked={fields.isVendor}
                  onChange={isVendorCheck}
                />
              </div>
              <div className="column">
                <Input
                  type="tel"
                  placeholder="Enter the customer phone"
                  label="Phone"
                  icon={<Icons.TbPhone />}
                  value={fields.phone}
                  onChange={(value) => handleInputChange("phone", value)}
                />
              </div>
              <div className="column">
                <Input
                  type="date"
                  placeholder="Enter the customer phone"
                  label="Date"
                  icon={<Icons.TbCalendar />}
                  value={fields.date}
                  onChange={(value) => handleInputChange("date", value)}
                />
              </div>
              <div className="column">
                <Input
                  type="password"
                  placeholder="Enter the customer password"
                  label="password"
                  icon={<Icons.TbLock />}
                  value={fields.password}
                  onChange={(value) => handleInputChange("password", value)}
                />
              </div>
              <div className="column">
                <Input
                  type="password"
                  placeholder="Enter the customer password confirmation"
                  label="password confirmation"
                  icon={<Icons.TbLockCheck />}
                  value={fields.passwordConfirm}
                  onChange={(value) => handleInputChange("passwordConfirm", value)}
                />
              </div>
            </div>
          </div>
          <div className="sidebar">
            <div className="sidebar_item">
              <h2 className="sub_heading">Publish</h2>
              <Button
                label="save & exit"
                icon={<Icons.TbDeviceFloppy />}
                className=""
              />
              <Button
                label="save"
                icon={<Icons.TbCircleCheck />}
                className="success"
              />
            </div>
            <div className="sidebar_item">
              <h2 className="sub_heading">Status</h2>
              <div className="column">
                <Dropdown
                  placeholder="select stock status"
                  selectedValue={fields.status}
                  onClick={handleStatusSelect}
                  options={status}
                  // className="sm"
                />
              </div>
            </div>
            <div className="sidebar_item">
              <h2 className="sub_heading">Image</h2>
              <div className="column">
                <Thumbnail
                  preloadedImage={fields.image}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AddCustomer