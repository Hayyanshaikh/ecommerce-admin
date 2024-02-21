import React,{ useState, useEffect } from 'react';
import * as Icons from "react-icons/tb";
import Languages from '../../api/languages.json'
import Currencies from '../../api/Currencies.json';
import Input from "../../components/common/Input.jsx";
import Textarea from "../../components/common/Textarea.jsx";
import Dropdown from "../../components/common/Dropdown.jsx";
import Thumbnail from "../../components/common/Thumbnail.jsx";
import MultiSelect from "../../components/common/MultiSelect.jsx";

const General = () => {
  const [fields, setFields] = useState({
    name: "",
    url: "",
    description: "",
    physicalAddress: "",
    email: "",
    phone: "",
    currency: "",
    language: "",
  });

  const handleInputChange = (key, value) => {
    setFields({
      ...fields,
      [key]: value,
    });
  };

  const currenciesOptions = Currencies.map(currency=>({
  	label:currency.name
  }))

  const handleCurrencySelect = (option) => {
    setFields({
    	...fields,
    	currency: option.label,
    })
  };

  const handleLanguageSelect = (option) => {
    setFields({
    	...fields,
    	language: option.label,
    })
  };

  const languagesWithCountries = Languages.reduce((languages, country) => {
	  country.languages.forEach(language => {
	    languages.push({ label: `${language} (${country.country})`, value: language });
	  });
	  return languages;
	}, []);
	return (
		<section>
			<div className="container">
				<div className="wrapper">
					<div className="sidebar">
						<div className="sidebar_item">
							<div className="column">
								<Thumbnail/>
							</div>
						</div>
					</div>
					<div className="content">
						<div className="content_item">
							<h2 className="sub_heading">Store Information</h2>
              <div className="column_2">
                <Input
                  type="text"
                  placeholder="Enter the website name"
                  label="Name"
                  icon={<Icons.TbSmartHome />}
                  value={fields.name}
                  onChange={(value) => handleInputChange("name", value)}
                />
              </div>
              <div className="column_2">
                <Input
                  type="url"
                  placeholder="Enter the website url"
                  label="URL"
                  icon={<Icons.TbLink />}
                  value={fields.url}
                  onChange={(value) => handleInputChange("url", value)}
                />
              </div>
              <div className="column">
                <Textarea
                  type="text"
                  placeholder="Enter the website description"
                  label="Description"
                  icon={<Icons.TbBook />}
                  value={fields.description}
                  onChange={(value) => handleInputChange("description", value)}
                />
              </div>
              <div className="column_2">
                <Input
                  type="text"
                  placeholder="Enter the physical address"
                  label="Physical address"
                  icon={<Icons.TbMapPin />}
                  value={fields.physicalAddress}
                  onChange={(value) => handleInputChange("physicalAddress", value)}
                />
              </div>
              <div className="column_2">
                <Input
                  type="email"
                  placeholder="Enter the email"
                  label="Email"
                  icon={<Icons.TbMail />}
                  value={fields.email}
                  onChange={(value) => handleInputChange("email", value)}
                />
              </div>
              <div className="column">
                <Input
                  type="tall"
                  placeholder="Enter the phone"
                  label="Phone"
                  icon={<Icons.TbPhone />}
                  value={fields.phone}
                  onChange={(value) => handleInputChange("phone", value)}
                />
              </div>
						</div>
						<div className="content_item">
							<h2 className="sub_heading">Localization</h2>
							<div className="column_2">
								<MultiSelect
					        placeholder="Select currency"
					        label="Select currency"
					        options={currenciesOptions}
					        isSelected={fields.currency}
					        onChange={handleCurrencySelect}
					      />
							</div>
							<div className="column_2">
								<MultiSelect
					        placeholder="Select Languages"
					        label="Select Languages"
					        options={languagesWithCountries}
					        isSelected={fields.language}
					        onChange={handleLanguageSelect}
					      />
							</div>		
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default General;