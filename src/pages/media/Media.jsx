import * as Icons from "react-icons/tb";
import MediaData from '../../api/Media.json';
import React, { useState, useEffect } from "react";
import Modal from "../../components/common/Modal.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import Divider from "../../components/common/Divider.jsx";
import CheckBox from "../../components/common/CheckBox.jsx";
import Dropdown from "../../components/common/Dropdown.jsx";
import FileUpload from "../../components/common/FileUpload.jsx";
import Breadcrumb from "../../components/common/Breadcrumb.jsx";
import TextEditor from "../../components/common/TextEditor.jsx";
import TableAction from "../../components/common/TableAction.jsx";
import MultiSelect from "../../components/common/MultiSelect.jsx";

const Media = () => {
  const [layout, setLayout] = useState(true);
  const [fileDetails, setFileDetails] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [updatedMedia, setUpdatedMedia] = useState(MediaData);
  const [fields, setFields] = useState({
    mediaSearch: "",
    folderName:"",
    filterMedia:""
  });

  const handleInputChange = (key, value) => {
    if (key === "mediaSearch") {
      const regex = new RegExp(value, 'i');
        setUpdatedMedia(MediaData.filter((media) => regex.test(media.name)));
    }

    setFields({
      ...fields,
      [key]: value,
    });

  };

  const breadcrumb = [
    {label:"all",url:"/"},
    {label:"Stores",url:"/"}
  ];

  const handleMediaLayout = () => {
    setLayout(!layout)
  }

  const handleFolderPlusClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSelectFolder = (id) => {
    const fileDetail = MediaData.find(detail=> detail.id === id)
    setFileDetails(fileDetail);
  }

  const options = [
    { label: 'images', value: 'image' },
    { label: 'videos', value: 'videos' },
    { label: 'document', value: 'document' },
  ];
  const handleOptionClick = (option) => {
    setFields({
      ...fields,
      filterMedia:option.label
    })
  };

  return (
    <section>
      <div className="container">
        <div className="wrapper">
          <div className="content">
            <div className="content_item">
              <div className="colum">
                <div className="media_actions">
                  <Button label="Upload" icon={<Icons.TbCloudUpload/>} className="sm"/>
                  <Button label="Download" icon={<Icons.TbCloudDownload/>} className="sm"/>
                  <Button label="Create folder" onClick={handleFolderPlusClick} icon={<Icons.TbFolderPlus/>} className="sm"/>
                  <Button label="Refresh" icon={<Icons.TbReload/>} className="sm"/>
                  {/*<Button label="Filter (Everything)" icon={<Icons.TbFilter/>} className="sm"/>*/}
                  <Dropdown
                    placeholder="Filter (Everything)"
                    options={options}
                    icon={<Icons.TbFilter/>}
                    className="sm absolute"
                    selectedValue={`Filter (${fields.filterMedia})`}
                    onClick={handleOptionClick}
                  />

                </div>
              </div>
              <div className="column">
                <Input
                  type="text"
                  placeholder="Enter the product name"
                  icon={<Icons.TbSearch />}
                  value={fields.mediaSearch}
                  onChange={(value) => handleInputChange("mediaSearch", value)}
                />
              </div>
              <div className="column">
                <div className="media_filter_head">
                  <Breadcrumb items={breadcrumb} />
                  <div className="add_folder media_icon" onClick={handleFolderPlusClick}>
                    <Icons.TbFolderPlus/>
                  </div>
                  <Modal bool={isModalVisible} onClose={closeModal}>
                    <div className="modal-head">
                      <h2>Add folder</h2>
                      <Button
                        label="create folder"
                        className="sm"
                      />
                    </div>
                    <div className="modal-body">
                      <Input
                        type="text"
                        placeholder="Folder name"
                        icon={<Icons.TbFolderPlus />}
                        value={fields.folderName}
                        onChange={(value) => handleInputChange("folderName", value)}
                      />
                    </div>
                  </Modal>
                  <div className="media_filter">
                    <div className="media_filter_item media_icon">
                      <Icons.TbFilter/>
                    </div>
                    <div className="media_filter_item media_icon">
                      <Icons.TbSortAscending/>
                    </div>
                    <div className="media_filter_item media_icon" onClick={handleMediaLayout}>
                      <Icons.TbLayoutGrid/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className={`media_${layout ? "grid" : "flex"}`}>
                  {
                    updatedMedia.map((file, key) =>(
                      <div className="media_grid_item" key={key} onClick={()=>handleSelectFolder(file.id)}>
                        {
                          file.type === "folder" ? <Icons.TbFolder/> : (
                            <figure>
                              <img src={file.link} alt=""/>
                            </figure>
                          )
                        }
                        <span className="line_clamp">{file.name}</span>
                        <span className="media_item_date line_clamp">{file.createdAt}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="sidebar">
            <div className="sidebar_item">
              {
                fileDetails && (
                  <>
                    <div className="media_preview_icon">
                      {
                        fileDetails.type === "folder" ? (
                          <Icons.TbFolder/>
                        ) : (
                          <figure>
                            <img src={fileDetails.link} alt=""/>
                          </figure>
                        )
                      }
                    </div>
                    <Divider/>
                    <h2 className="sub_heading">details:</h2>
                    <div className="media_preview_content">
                      <div className="media_preview_content_item">
                        <b>Name:</b>
                        <span className="line_clamp">{fileDetails.name}</span>
                      </div>
                      <div className="media_preview_content_item">
                        <b>Link:</b>
                        <span className="line_clamp">{fileDetails.link}</span>
                      </div>
                      <div className="media_preview_content_item">
                        <b>file type:</b>
                        <span className="line_clamp">{fileDetails.type}</span>
                      </div>
                      <div className="media_preview_content_item">
                        <b>File Size:</b>
                        <span className="line_clamp">{fileDetails.size}</span>
                      </div>
                      <div className="media_preview_content_item">
                        <b>Last modify date:</b>
                        <span className="line_clamp">{fileDetails.modifyDate}</span>
                      </div>
                    </div>
                    <Button
                      label="Download"
                      className="sm full"
                    />
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Media