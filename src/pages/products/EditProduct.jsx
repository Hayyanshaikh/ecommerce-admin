import * as Icons from "react-icons/tb";
import Tags from "../../api/Tags.json";
import Taxes from "../../api/Taxes.json";
import Labels from "../../api/Labels.json";
import Products from "../../api/Products.json";
import Categories from "../../api/Categories.json";
import React, { useState, useEffect } from "react";
import Variations from "../../api/Variations.json";
import Colloctions from "../../api/Colloctions.json";
import Modal from "../../components/common/Modal.jsx";
import Input from "../../components/common/Input.jsx";
import NotFound from '../../pages/error/NotFound.jsx';
import Tagify from "../../components/common/Tagify.jsx";
import Button from "../../components/common/Button.jsx";
import Attributes from "../../api/ProductAttributes.json";
import Divider from "../../components/common/Divider.jsx";
import { useParams, Routes, Route} from "react-router-dom";
import CheckBox from "../../components/common/CheckBox.jsx";
import Dropdown from "../../components/common/Dropdown.jsx";
import Textarea from "../../components/common/Textarea.jsx";
import Offcanvas from "../../components/common/Offcanvas.jsx";
import Accordion from "../../components/common/Accordion.jsx";
import FileUpload from "../../components/common/FileUpload.jsx";
import TextEditor from "../../components/common/TextEditor.jsx";
import MultiSelect from "../../components/common/MultiSelect.jsx";
import ManageProduct from "../../pages/products/ManageProduct.jsx";

const EditProduct = ({ productData }) => {
  const {productId} = useParams();
  const getProduct = Products.find(product=> product.id.toString() === productId.toString());
  if (!getProduct) {
    return <Routes>
      <Route path="*" element={<NotFound title="product not found" message="Sorry, the product details you are looking for could not be found."/>}/>
    </Routes>
  }

  const [product, setProduct] = useState({
    name: getProduct.name,
    description: getProduct.description,
    sku: getProduct.sku,
    priceSale: getProduct.salePrice,
    price: getProduct.price,
    costPerItem: getProduct.costPerItem,
    profit: "",
    margin: "",
    barcode: "",
    quantity: getProduct.inventory.quantity,
    question: "",
    answer: "",
    metaLink: "http://localhost:5173/catalog/product",
    metaTitle: "",
    metaDescription: "",
  });

  useEffect(() => {
    const profit = product.price - product.costPerItem;
    const margin = profit / product.price * 100;
    setProduct({
      ...product,
      profit: profit,
      margin: margin ? margin : '',
    });
  }, [product.price,product.costPerItem,setProduct])

  const [selectOptions, setSelectOptions] = useState([
    {
      value: "success",
      label: "in stock",
    },
    {
      value: "danger",
      label: "out of stock",
    },
    {
      value: "warning",
      label: "On backorder",
    },
  ]);

  const [selectedValue, setSelectedValue] = useState({
    stockValue: getProduct.inventory.in_stock ? "in stock" : "out of stock",
    attribute: "",
    attributeValue: "",
    categoriesValue: getProduct.category,
  });

  const handleInputChange = (key, value) => {
    setProduct({
      ...product,
      [key]: value,
    });
    // setProduct({
    //   ...product,
    // });
  };


  const handleStockSelect = (selectedOption) => {
    setSelectedValue({
      ...selectedValue,
      stockValue: selectedOption.label,
    });
  };

  const attributes = Attributes.map((attribute) => ({
    label: attribute.name,
    value: attribute.name,
  }));

  const [attributeOption, setAttributeOption] = useState(attributes);

  const handleAttributeSelect = (selectedOption) => {
    setSelectedValue({
      ...selectedValue,
      attribute: selectedOption.label,
    });
  };

  const [faqs, setFaqs] = useState([]);

  const handleFaqQuestion = (e) => {
    e.preventDefault();
    if (product.question && product.answer) {
      setFaqs([
        ...faqs,
        {
          question: product.question,
          answer: product.answer,
        },
      ]);
      setProduct({
        ...product,
        question: "",
        answer: "",
      });
    }
  };


  const category = Categories.map(category => ({
    label: category.name
  }));

  const [tags, setTags] = useState(Tags);
  const [taxes, setTaxes] = useState(Taxes);
  const [colloctions, setColloctions] = useState(Colloctions);
  const [labels, setLabels] = useState(Labels);

  const handleCheckTax = (id, checked) => {
    setTaxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id ? { ...checkbox, isChecked: checked } : checkbox
      )
    );
  };
  const handleCheckCollection = (id, checked) => {
    setColloctions((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id ? { ...checkbox, isChecked: checked } : checkbox
      )
    );
  };
  const handleCheckLabels = (id, checked) => {
    setLabels((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id ? { ...checkbox, isChecked: checked } : checkbox
      )
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getAttributesString = (attributes) => {
    const availableAttributes = Object.values(attributes).filter(value => value);
    return availableAttributes.join(' / ');
  };

  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const handleOpenOffcanvas = () => {
    setIsOffcanvasOpen(true);
  };

  const handleCloseOffcanvas = () => {
    setIsOffcanvasOpen(false);
  };

  return (
    <section>
      <div className="container">
        <div className="wrapper">
          <div className="content">
            <div className="content_item">
              <h2 className="sub_heading">Product Info</h2>
              <div className="column">
                <Input
                  type="text"
                  placeholder="Enter the product name"
                  label="Name"
                  icon={<Icons.TbShoppingCart />}
                  value={product.name}
                  onChange={(value) => handleInputChange("name", value)}
                />
              </div>
              <div className="column">
                <TextEditor
                  label="Description"
                  placeholder="Enter a description"
                  value={product.description}
                  onChange={(value) => handleInputChange("description", value)}
                />
              </div>  
            </div>
            <div className="content_item">
              <FileUpload/>
            </div>
            <div className="content_item">
              <h2 className="sub_heading">Pricing</h2>
              <div className="column_2">
                <Input
                  type="number"
                  placeholder="Enter the product Price"
                  icon={<Icons.TbCoin />}
                  label="Price"
                  value={product.price}
                  onChange={(value) => handleInputChange("price", value)}
                />
              </div>
              <div className="column_2">
                <Input
                  type="number"
                  placeholder="Enter the product Price sale"
                  icon={<Icons.TbCoin />}
                  label="Price sale"
                  value={product.priceSale}
                  onChange={(value) => handleInputChange("priceSale", value)}
                />
              </div>
              <div className="column_3">
                <Input
                  type="number"
                  icon={<Icons.TbCoin />}
                  placeholder="Cost Per Item"
                  label="Cost Per Item"
                  value={product.costPerItem}
                  onChange={(value) => handleInputChange("costPerItem", value)}
                />
              </div>
              <div className="column_3">
                <Input
                  type="number"
                  placeholder="- -"
                  label="Profit"
                  readOnly={true}
                  value={product.profit}
                />
              </div>
              <div className="column_3">
                <Input
                  type="text"
                  placeholder="- -"
                  label="Margin"
                  readOnly={true}
                  value={`${product.margin ? product.margin.toFixed(2) : "- -"}%`}
                />
              </div>
            </div>
            <div className="content_item">
              <h2 className="sub_heading">
                <span>Variantions</span>
                <Button
                  label="add Variant"
                  icon={<Icons.TbPlus />}
                  onClick={openModal}
                  className="sm"
                />
              </h2>

              <table className="bordered">
                <thead>
                  <tr>
                    <th>Variant</th>
                    {Attributes.map((attribute,key) => (
                      <th key={key}>{attribute.name}</th>
                    ))}
                    <th>Price</th>
                    <th colSpan="2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Variations.map((variation,key) => (
                    <tr key={key}>
                      <td>{getAttributesString(variation.attributes)}</td>
                      {Attributes.map((attribute) => (
                        <td key={attribute.id}>
                          {variation.attributes[attribute.name]
                            ? variation.attributes[attribute.name]
                            : "-"}
                        </td>
                      ))}
                      <td>${variation.price.toFixed(2)}</td>
                      <td className="action">
                        <div className="actions">
                          <Button
                            icon={<Icons.TbPencil />}
                            className="sm info"
                            onClick={handleOpenOffcanvas}
                          />
                          <Button
                            icon={<Icons.TbTrash />}
                            className="sm danger"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Offcanvas isOpen={isOffcanvasOpen} onClose={handleCloseOffcanvas} className="lg">
                <div className="offcanvas-head">
                  <h2>black / medium / polyester</h2>
                </div>
                <div className="offcanvas-body">
                  <div className="content_item">
                    <h2 className="sub_heading">Options</h2>
                    <div className="column_3">
                      <Input
                        type="text"
                        placeholder="Enter the product Price"
                        className="sm"
                        label="Color"
                        icon={<Icons.TbTrash className="trash"/>}
                        value="Black"
                        onChange={(value) => handleInputChange("price", value)}
                      />
                    </div>
                    <div className="column_3">
                      <Input
                        type="text"
                        placeholder="Enter the product Price sale"
                        className="sm"
                        label="Size"
                        icon={<Icons.TbTrash className="trash"/>}
                        value="Medium"
                        onChange={(value) => handleInputChange("priceSale", value)}
                      />
                    </div>
                    <div className="column_3">
                      <Input
                        type="text"
                        placeholder="Enter the product Price sale"
                        className="sm"
                        label="Material"
                        icon={<Icons.TbTrash className="trash"/>}
                        value="Polyester"
                        onChange={(value) => handleInputChange("priceSale", value)}
                      />
                    </div>
                  </div>
                  <div className="content_item">
                    <h2 className="sub_heading">Pricing</h2>
                    <div className="column_2">
                      <Input
                        type="number"
                        placeholder="Enter the product Price"
                        className="sm"
                        label="Variant Price"
                        value={product.price}
                        onChange={(value) => handleInputChange("price", value)}
                      />
                    </div>
                    <div className="column_2">
                      <Input
                        type="number"
                        placeholder="Enter the product Price sale"
                        className="sm"
                        label="Variant Price sale"
                        value={product.priceSale}
                        onChange={(value) => handleInputChange("priceSale", value)}
                      />
                    </div>
                    <div className="column_3">
                      <Input
                        type="number"
                        placeholder="Cost Per Item"
                        className="sm"
                        label="Variant Cost Per Item"
                        value={product.costPerItem}
                        onChange={(value) => handleInputChange("costPerItem", value)}
                      />
                    </div>
                    <div className="column_3">
                      <Input
                        type="number"
                        placeholder="- -"
                        className="sm"
                        label="Variant Profit"
                        readOnly={true}
                        value={product.profit}
                      />
                    </div>
                    <div className="column_3">
                      <Input
                        type="text"
                        placeholder="- -"
                        className="sm"
                        label="Variant Margin"
                        readOnly={true}
                        value={`${product.margin ? product.margin : "- -"}%`}
                      />
                    </div>
                  </div>
                </div>
                <div className="offcanvas-footer">
                  <Button
                    label="close"
                    className="outline"
                    onClick={handleCloseOffcanvas}
                  />
                  <Button
                    label="save"
                    className=""
                    onClick={handleCloseOffcanvas}
                  />
                </div>
              </Offcanvas>

              <Modal bool={isModalOpen} onClose={closeModal} className="sm">
                  <div className="modal-head">
                    <h2>add variation</h2>
                  </div>
                  <div className="modal-body">
                    
                    <div className="content_item">
                      <div className="column">
                        <Dropdown
                          placeholder="select attribute"
                          label="Select attribute"
                          selectedValue={selectedValue.attribute}
                          onClick={handleAttributeSelect}
                          options={attributeOption}
                          className="sm"
                        />
                      </div>
                      <Divider label={`${selectedValue.attribute} options`}>
                        <Button label="add option" className="right text" />
                      </Divider>
                      <div className="column">
                        <Input
                          type="text"
                          icon={<Icons.TbTrash className="trash" />}
                          placeholder="Enter the product option"
                          className="sm"
                          // value={product.sku}
                          // onChange={(value) => handleInputChange("sku", value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <Button
                        label="discard"
                        onClick={closeModal}
                        className="sm outline"
                      />
                      <Button
                        label="save"
                        onClick={closeModal}
                        className="sm"
                      />
                  </div>
              </Modal>
            </div>
            <div className="content_item">
              <h2 className="sub_heading">Add Question</h2>
              <div className="column">
                <Input
                  type="text"
                  placeholder="Enter the question"
                  icon={<Icons.TbQuestionMark />}
                  label="Question"
                  value={product.question}
                  onChange={(value) => handleInputChange("question", value)}
                />
              </div>
              <div className="column">
                <Textarea
                  type="text"
                  placeholder="Enter the Answer"
                  icon={<Icons.TbCircleCheck />}
                  label="Answer"
                  value={product.answer}
                  onChange={(value) => handleInputChange("answer", value)}
                />
              </div>

              <Button
                label="Add Question"
                icon={<Icons.TbCheck />}
                className="sm right"
                onClick={handleFaqQuestion}
              />
            </div>
            {!faqs.length == 0 ? (
              <div className="content_item">
                <h2 className="sub_heading">FAQ's</h2>
                {faqs.map((faq, key) => {
                  return (
                    <div className="column" key={key}>
                      <Accordion title={faq.question}>
                        <p>{faq.answer}</p>
                      </Accordion>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
            <div className="content_item meta_data">
              <div className="column">
                <span>Search engine listing</span>
                <h2 className="meta_title">{product.metaTitle || product.name}</h2>
                <p className="meta_link">{`${product.metaLink}/${product.name}`}</p>
                <p className="meta_description">{product.metaDescription || product.description}</p>
              </div>
              <div className="column">
                <Input
                  type="text"
                  placeholder="Enter the meta title"
                  label="Title"
                  value={product.metaTitle || product.name}
                  onChange={(value) => handleInputChange("metaTitle", value)}
                />
              </div>
              <div className="column">
                <Input
                  type="text"
                  placeholder="Enter the meta link"
                  label="Link"
                  value={`${product.metaLink}/${product.metaTitle || product.name}`}
                  onChange={(value) => handleInputChange("metaLink", value)}
                />
              </div>
              <div className="column">
                <Textarea
                  type="text"
                  placeholder="Enter the meta description"
                  label="Description"
                  value={product.metaDescription || product.description}
                  onChange={(value) => handleInputChange("metaDescription", value)}
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
              <h2 className="sub_heading">Stock status</h2>
              <div className="column">
                <Dropdown
                  placeholder="select stock status"
                  selectedValue={selectedValue.stockValue}
                  onClick={handleStockSelect}
                  options={selectOptions}
                  className="sm"
                />
              </div>
            </div>
            <div className="sidebar_item">
              <h2 className="sub_heading">Categories</h2>
              <MultiSelect
                className="sm"
                isMulti={true}
                isSelected={selectedValue.categoriesValue}
                options={category}
                placeholder="Select options..."
              />
            </div>
            <div className="sidebar_item">
              <h2 className="sub_heading">
                <span>quantity</span>
              </h2>
              <div className="column">
                <Input
                  type="number"
                  placeholder="Enter the product quantity"
                  value={product.quantity}
                  onChange={(value) => handleInputChange("quantity", value)}
                  className="sm"
                />
              </div>
            </div>
            <div className="sidebar_item">
              <h2 className="sub_heading">Taxes</h2>
              <div className="sidebar_checkboxes">
                {taxes.map((tax) => (
                  <CheckBox
                    key={tax.id}
                    id={tax.id}
                    label={`${tax.name} ${tax.percentage}`}
                    isChecked={tax.isChecked}
                    onChange={(isChecked) => handleCheckTax(tax.id, isChecked)}
                  />
                ))}
              </div>
            </div>
            <div className="sidebar_item">
              <h2 className="sub_heading">Product collections</h2>
              <div className="sidebar_checkboxes">
                {colloctions.map((collection) => (
                  <CheckBox
                    key={collection.id}
                    id={collection.id}
                    label={`${collection.name}`}
                    isChecked={collection.isChecked}
                    onChange={(isChecked) =>
                      handleCheckCollection(collection.id, isChecked)
                    }
                  />
                ))}
              </div>
            </div>
            <div className="sidebar_item">
              <h2 className="sub_heading">Labels</h2>
              <div className="sidebar_checkboxes">
                {labels.map((label) => (
                  <CheckBox
                    key={label.id}
                    id={label.id}
                    label={`${label.name}`}
                    isChecked={label.isChecked}
                    onChange={(isChecked) =>
                      handleCheckLabels(label.id, isChecked)
                    }
                  />
                ))}
              </div>
            </div>
            <div className="sidebar_item">
              <h2 className="sub_heading">tags</h2>
              <Tagify
                tagsData={Tags}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProduct;
