import React from "react";
import { Form } from "react-bootstrap";
import "./Head.css";

const Head = ({ isEditMode, intialState, handleOnChange,Logo_Url}) => {
  return (
    <>
      <div className="head">
        <div className="main">
          <div className="logo">
            <img className="logo" src={Logo_Url?Logo_Url:"../ccp-logo.png"} alt="default-logo" />
          </div>
          <div className="heading">
            <h2 className="head_h">CAPABILTIES STATEMENT</h2>
          </div>
        </div>

        <div className="info">
          {isEditMode ? (
            <>
              <Form.Control
                className="edit"
                type="text"
                placeholder="compony info"
                name="company_info"
                value={intialState.company_info}
                onChange={handleOnChange}
              />
              <Form.Control
                className="edit"
                type="text"
                name="company_address1"
                placeholder="company address 1"
                value={intialState.company_address1}
                onChange={handleOnChange}
              />
              <Form.Control
                className="edit"
                type="text"
                placeholder="companyAddress2"
                name="company_address2"
                value={intialState.company_address2}
                onChange={handleOnChange}
              />
              <Form.Control
                className="edit"
                type="text"
                name="owner_name"
                value={intialState.owner_name}
                onChange={handleOnChange}
              />
              <Form.Control
                className="edit"
                type="text"
                name="owner_phone"
                value={intialState.owner_phone}
                onChange={handleOnChange}
              />
              <Form.Control
                className="edit"
                type="text"
                name="owner_email"
                value={intialState.owner_email}
                onChange={handleOnChange}
              />
              <Form.Control
                className="edit-textarea"
                as="textarea"
                name="url"
                value={intialState.url}
                onChange={handleOnChange}
              />
            </>
          ) : (
            <>
              <p className="company-info">{intialState.company_info}</p>
              <p className="company-address">{intialState.company_address1}</p>
              <p className="company-address">{intialState.company_address2}</p>
              <p className="owner-info">{intialState.owner_name}</p>
              <p className="owner-info">{intialState.owner_phone}</p>
              <p className="owner-info">{intialState.owner_email}</p>
              <p className="website">
                <a href={intialState.url}>{intialState.url}</a>
              </p>
            </>
          )}
        </div>
      </div>
      <div className="line"></div>
    </>
  );
};

export default Head;
