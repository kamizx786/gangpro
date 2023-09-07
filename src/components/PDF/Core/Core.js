import React from "react";
import { Form } from "react-bootstrap";
import "./Core.css";

const Core = ({ isEditMode, intialState, handleOnChange,page }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      intialState.core_competencies_image(e.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="core">
        <div>
          <h1 className="core_h">Core Competencies</h1>
          {isEditMode ? (
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter Core Competencies (use = to make bullets)"
              name="core_competencies"
              value={intialState.core_competencies}
              onChange={handleOnChange}
            />
          ) : (
            <ul className="core-list">
              {intialState.core_competencies.split("=").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        <div>
  {isEditMode ? (
    <div className="edit-core">
      <div className="edit_core_info">
        <Form.Label>Core Competencies Info</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="core_competencies_info"
          value={intialState.core_competencies_info}
          onChange={handleOnChange}
        />
      </div>
    </div>
  ) : (
    <div>
      {intialState.core_competencies_info.split("=").map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  )}
</div>{page!=="VersionB"&&
        <div className="core_img">
          {isEditMode ? (
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          ) : (
            intialState.core_competencies_image && (
              <img
                className="core_img"
                src={intialState.core_competencies_image}
                alt="Uploaded"
              />
            )
          )}
        </div>}
      </div>
    </>
  );
};

export default Core;
