import React, { useEffect, useState } from "react";
import "./PDF.css";
import Head from "../Head/Head";
import About from "../About/About";
import Core from "../Core/Core";
import Past from "../Past Performance/Past";
import CCP from "../CCP/CCP";
import { FaEdit } from "react-icons/fa";
import { Button, Modal, FormControl } from "react-bootstrap";
import ColorPicker from "../Color/ColorPicker";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GetUserSpeicificStatement, SaveCapabilityStatement } from "../../../store/actions/PDF/pdf.actions";
import { useLocation, useNavigate } from 'react-router-dom';


const PDFVersion_B = () => {
  const Data = useSelector((state) => state.pdf);
  const pdf=Data.values
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()
  const queryString = location?.search; // This will be "?Salman.pdf"
  // Remove the leading "?" character
  const queryParamValue = queryString.slice(1);
  const [intialState, setIntialState] = useState({
    userId: 2,
    version:"B",
    pdf_name: pdf?.pdf_name,
    company_info: pdf.company_info,
    company_address1: pdf.company_address1,
    company_address2: pdf.company_address2,
    owner_name: pdf.owner_name,
    owner_email: pdf.owner_email,
    owner_phone: pdf.owner_phone,
    url: pdf.url,
    about_us: pdf.about_us,
    core_competencies: pdf.core_competencies,
    core_competencies_info: pdf.core_competencies_info,
    past_performance: pdf.past_performance,
    past_performance_image: pdf.past_performance_image,
    difference: pdf.difference,
  });
  const [borderColor, setBorderColor] = useState("black");
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to control the pop-up
  const [logoUrl, setLogoUrl] = useState("");
  const [pdfName, setPdfName] = useState("");


  useEffect(() => {
    if (queryParamValue) {
      dispatch(GetUserSpeicificStatement(queryParamValue, navigate))
      setIntialState({
        ...intialState,pdf
      })
    }
  }, [queryParamValue]);
  useEffect(() => {
    setIntialState(
    {
    userId: 2,
    version: "B",
    pdf_name: pdf?.pdf_name,
    company_info: pdf.company_info,
    company_address1: pdf.company_address1,
    company_address2: pdf.company_address2,
    owner_name: pdf.owner_name,
    owner_email: pdf.owner_email,
    owner_phone: pdf.owner_phone,
    url: pdf.url,
    about_us: pdf.about_us,
    core_competencies: pdf.core_competencies,
    core_competencies_image: pdf.core_competencies_image,
    core_competencies_info: pdf.core_competencies_info,
    past_performance: pdf.past_performance,
    past_performance_image: pdf.past_performance_image,
    difference: pdf.difference,
  }
    );
  }, [pdf]);

  const handleOnChange = (e) => {

    setIntialState({
      ...intialState, [e.target.name]: e.target.value
    });
  };
  const handleEditClick = () => {
    setIsEditMode(true);
  };
  const handleBorderColorChange = (color) => {
    setBorderColor(color);
  };

  const handlePopup = (e) => {
    e.preventDefault();
    setIsEditMode(false);
    setShowPopup(true); // Show the pop-up
  };
  const handleSave = (e) => {
    // Check if any field is empty
    const isEmptyField = Object.values(intialState).some((value) => value === "");

    if (isEmptyField) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    dispatch(SaveCapabilityStatement(intialState, setIsEditMode, setShowPopup))

    // Show only the content within the PDF div
   // const pdfContainer = document.getElementById("pdfContainer");
   // const originalDisplayStyle = pdfContainer.style.display;
   // pdfContainer.style.display = "flex";

    // Print the content
    //window.print();

    // Restore the original display style
   // pdfContainer.style.display = originalDisplayStyle;
  };


  // const handlePrint = (e) => {
  //   e.preventDefault();

  // };

  const handleClose = () => {
    setShowPopup(false); // Close the pop-up
  };

  return (
    <>
      <div className="edit">
        <ColorPicker
          borderColor={borderColor}
          onBorderColorChange={handleBorderColorChange}
        />
        {!isEditMode && <div className="edit-button" onClick={handleEditClick}>
          <FaEdit size={20} />
        </div>}
        {isEditMode && <Button variant="danger" size="lg" onClick={() => setIsEditMode(false)}>
          Cancel
        </Button>}
      </div>
      <div id="pdfContainer" className="PDF" style={{ borderColor }}>
        <div className="PDF_main">
          <Head
            handleOnChange={handleOnChange}
            intialState={intialState}
            isEditMode={isEditMode}
            Logo_Url={Data?.logo_url}
          />
          <About
            handleOnChange={handleOnChange}
            intialState={intialState}
            isEditMode={isEditMode}
          />
          <Core
            handleOnChange={handleOnChange}
            intialState={intialState}
            isEditMode={isEditMode}
            page="VersionB"
          />
          <Past
            handleOnChange={handleOnChange}
            intialState={intialState}
            isEditMode={isEditMode}
          />
          <CCP
            handleOnChange={handleOnChange}
            intialState={intialState}
            isEditMode={isEditMode}
            page="VersionB"
          />
        </div>
      </div>

      <Button variant="primary" size="lg" onClick={handlePopup}>
        Save
      </Button>

      {/* Modal for PDF Name and Print */}
      <Modal show={showPopup} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set PDF Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            type="text"
            value={intialState.pdf_name}
            name="pdf_name"
            placeholder="Enter pdf name"
            onChange={handleOnChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="lg" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" size="lg" onClick={handlePrint}>
            Print
          </Button> */}
          <Button disabled={Data.loading} variant="primary" size="lg" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PDFVersion_B;
