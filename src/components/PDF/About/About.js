import React from "react";
import { Form } from "react-bootstrap";
import "./About.css";

const About = ({ isEditMode, intialState, handleOnChange }) => {
  return (
    <div className="About">
      <h1 className="about_h">About Us</h1>

      {isEditMode ? (
        <Form.Control
          className="edit-textarea"
          as="textarea"
          rows={3}
          name="about_us"
          value={intialState.about_us}
          onChange={handleOnChange}
        />
      ) : (
        <div className="about-content">{intialState.about_us}</div>
      )}
    </div>
  );
};

export default About;
