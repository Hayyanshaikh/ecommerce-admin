import React, { useState, useEffect, useRef } from "react";
import * as Icons from "react-icons/tb";

const Tagify = ({ tagsData }) => {
  const [tags, setTags] = useState([]);
  const [bool, setBool] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(
    tagsData.map((tag) => tag.label)
  );
  const dropdownRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const filteredTags = tagsData.filter((tag) =>
      tag.label.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredOptions(filteredTags.map((tag) => tag.label));
  };

  const handleInputKeyPress = (e) => {
    if (
      e.key === "Enter" &&
      inputValue.trim() !== "" &&
      !tags.includes(inputValue.trim())
    ) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
      setFilteredOptions(tagsData.map((tag) => tag.label));
    }
  };

  const handleDropdownSelect = (option) => {
    setBool(!bool);
    if (!tags.includes(option)) {
      setTags([...tags, option]);
      setInputValue("");
      setFilteredOptions(tagsData.map((tag) => tag.label));
    }
  };

  const handleTagRemove = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    setFilteredOptions(tagsData.map((tag) => tag.label));
  };

  const inputClickHandle = () => {
    setBool(!bool);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setBool(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="tags input_field">
      <div className="tag-input-container">
        <div className="selected_tags">
          {tags.map((tag, index) => (
            <div key={index} className="selected_tag">
              {tag}
              <Icons.TbX
                className="remove_tags"
                onClick={() => handleTagRemove(tag)}
              />
            </div>
          ))}
        </div>
        <div className="multi_input">
          <input
            type="text"
            placeholder="Add tags..."
            className={bool ? "active" : ""}
            value={inputValue}
            onClick={inputClickHandle}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
          />
          <Icons.TbChevronDown className="chevron_down" />
        </div>
        <ul
          className={`select_dropdown ${bool ? "active" : ""}`}
          ref={dropdownRef}
        >
          {filteredOptions.map((option, index) => (
            <li
              className="select_dropdown_item"
              key={index}
              onClick={() => handleDropdownSelect(option)}
            >
              <button>{option}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tagify;
