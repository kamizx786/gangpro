import React from "react";
import { Form } from "react-bootstrap";
import "./Past.css";

const Past = ({ isEditMode, intialState, handleOnChange }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      intialState.past_performance_image(e.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="past">
      <div className="past_img">
        {isEditMode ? (
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        ) : (
          intialState.past_performance_image && (
            <img
              className="past_img"
              src={intialState.past_performance_image}
              alt="Uploaded"
            />
          )
        )}
      </div>

      <div className="performance">
        <h1>Past Performance</h1>
        {isEditMode ? (
          <Form.Control
            as="textarea"
            rows="5"
            cols={65}
            name="past_performance"
            placeholder="Enter Past Performance (use = to display in cols and rows)"
            value={intialState.past_performance}
            onChange={handleOnChange}
          />
        ) : (
          <table className="performance-table">
            <tbody>
              {intialState.past_performance.split("=").map(
                (item, index) =>
                  index % 2 === 0 && (
                    <tr key={index}>
                      <td>{item}</td>
                      <td>
                        {intialState.past_performance.split("=")[index + 1] ||
                          ""}
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Past;
