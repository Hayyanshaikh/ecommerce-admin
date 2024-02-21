import * as Icons from "react-icons/tb";
import React, { useState } from "react";
import Media from '../../pages/media/Media.jsx'
import Input from "../../components/common/Input.jsx";
import Modal from "../../components/common/Modal.jsx";
import Button from "../../components/common/Button.jsx";
import Dropdown from "../../components/common/Dropdown.jsx";
import Textarea from "../../components/common/Textarea.jsx";
import Thumbnail from "../../components/common/Thumbnail.jsx";
import Accordion from "../../components/common/Accordion.jsx";
import TextEditor from "../../components/common/TextEditor.jsx";

const AddPage = () => {
  const [fields, setFields] = useState({
    name: "",
    description: "",
    status: "",
    
    question: "",
    answer: "",
    isFeatured: "",
    image: "",
    pageLayout: "",
    metaLink: "",
    metaTitle: "",
    metaDescription: "",
  });

  const handleInputChange = (key, value) => {
    setFields({
      ...fields,
      [key]: value,
    });
  };

  const status = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "On hold", value: "on hold" },
    { label: "Discontinued", value: "discontinued" },
    { label: "Acquired", value: "acquired" },
    { label: "Merged", value: "merged" },
    { label: "Defunct", value: "defunct" },
  ];

  const handleStatusChange = (option) => {
    setFields({
      ...fields,
      status: option.label,
    });
  };

  const pageLayoutOptions = [
    { label: "Default", value: "default" },
    { label: "Blog Sidebar", value: "blogSidebar" },
    { label: "Full Width", value: "fullWidth" },
    { label: "Homepage", value: "homepage" },
    { label: "Coming Soon", value: "comingSoon" },
  ];

  const handleSelectPage = (selectedOptions) => {
    setFields({
      ...fields,
      pageLayout: selectedOptions.label,
    });
  };
  const [faqs, setFaqs] = useState([]);

  const handleFaqQuestion = (e) => {
    e.preventDefault();
    if (fields.question && fields.answer) {
      setFaqs([
        ...faqs,
        {
          question: fields.question,
          answer: fields.answer,
        },
      ]);
      setfields({
        ...fields,
        question: "",
        answer: "",
      });
    }
  };
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <section>
      <div className="container">
        <div className="wrapper">
          <div className="content">
            <div className="content_item">
              <h2 className="sub_heading">page details</h2>
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
                <TextEditor
                  label="Description"
                  placeholder="Enter a description"
                  value={fields.description}
                  onChange={(value) => handleInputChange("description", value)}
                />
              </div>
            </div>
            <div className="content_item">
              <h2 className="sub_heading">Add Question</h2>
              <div className="column">
                <Input
                  type="text"
                  placeholder="Enter the question"
                  icon={<Icons.TbQuestionMark />}
                  label="Question"
                  value={fields.question}
                  onChange={(value) => handleInputChange("question", value)}
                />
              </div>
              <div className="column">
                <Textarea
                  type="text"
                  placeholder="Enter the Answer"
                  icon={<Icons.TbCircleCheck />}
                  label="Answer"
                  value={fields.answer}
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
                <h2 className="meta_title">
                  {fields.metaTitle || fields.name}
                </h2>
                <p className="meta_link">{fields.metaLink}</p>
                <p className="meta_description">
                  {fields.metaDescription || fields.description}
                </p>
              </div>
              <div className="column">
                <Input
                  type="text"
                  placeholder="Enter the meta title"
                  label="Title"
                  value={fields.metaTitle || fields.name}
                  onChange={(value) => handleInputChange("metaTitle", value)}
                />
              </div>
              <div className="column">
                <Input
                  type="text"
                  placeholder="Enter the meta link"
                  label="Link"
                  value={fields.metaLink}
                  onChange={(value) => handleInputChange("metaLink", value)}
                />
              </div>
              <div className="column">
                <Textarea
                  type="text"
                  placeholder="Enter the meta description"
                  label="Description"
                  value={fields.metaDescription || fields.description}
                  onChange={(value) =>
                    handleInputChange("metaDescription", value)
                  }
                />
              </div>
            </div>
          </div>
          <div className="sidebar">
            <div className="sidebar_item">
              <h2 className="sub_heading">Published</h2>
              <Button
                label="Save & exit"
                className="sm"
                icon={<Icons.TbCircleCheck />}
              />
              <Button
                label="Save"
                className="sm success"
                icon={<Icons.TbCircleCheck />}
              />
            </div>
            <div className="sidebar_item">
              <h2 className="sub_heading">Status</h2>
              <div className="column">
                <Dropdown
                  placeholder="Select Status"
                  options={status}
                  onClick={handleStatusChange}
                  selectedValue={fields.status}
                />
              </div>
            </div>
            <div className="sidebar_item">
              <h2 className="sub_heading">pageLayout</h2>
              <div className="column">
                <Dropdown
                  options={pageLayoutOptions}
                  selectedValue={fields.pageLayout}
                  onClick={handleSelectPage}
                  placeholder="Select Page Layout"
                />
              </div>
            </div>

            <div className="sidebar_item">
              <h2 className="sub_heading">page image</h2>
              <div className="column">
                <Thumbnail onClick={openModal}/>
                 <Modal className="full" bool={isModalVisible} onClose={closeModal}>
                    <div className="modal-head">
                      <h2>Media</h2>
                    </div>
                    <div className="modal-body">
                      <Media/>
                    </div>
                    <div className="modal-footer">
                      <Button
                        label="close"
                        className="outline"
                        onClick={closeModal}
                      />
                      <Button
                        label="insert"
                        onClick={closeModal}
                      />
                    </div>
                  </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddPage;
