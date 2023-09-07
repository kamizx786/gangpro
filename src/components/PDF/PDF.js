import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./versionbutton.css";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { DeleteStatement, GetTotalStatement, GetUserSpeicificStatement } from "../../store/actions/PDF/pdf.actions";
import { useSelector } from "react-redux";
import { Button, Modal, FormControl } from "react-bootstrap";

const PDF = () => {
  const {pdfs,loading} = useSelector((state) => state.pdf);
  const [ok, setOk] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to control the pop-up
  const [DeleteName, setDeleteName] = useState(""); // State to control the pop-up
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const onClick = () => {
    setOk(true);
  };
const handleDelete=(p)=>{
setDeleteName(p)
setShowPopup(true);
}
const ConfirmDelete=()=>{
dispatch(DeleteStatement(DeleteName,setShowPopup))
}
const handleEdit=(p)=>{
  dispatch(GetUserSpeicificStatement(p,navigate))
}
  useEffect(()=>{
  dispatch(GetTotalStatement());
  },[])
  return (
    <>
      {!ok ? (
        <div className="CCP_List">
          <h1 className="head">CCP PDFS</h1>
          {pdfs?.map((p)=>{
            return(
              <div className="pdf_list">
              {p}
              <span className="icons">
                {" "}
                <AiOutlineEdit cursor="pointer"  onClick={()=>handleEdit(p)} size={20} color="blue" />{" "}
                <AiFillDelete cursor="pointer" onClick={()=>handleDelete(p)} size={20} color="red" />
              </span>
            </div>  
            )
          })

          }
       
          <Button onClick={onClick} className="btn" variant="primary" size="lg">
            Create New
          </Button>
        </div>
      ) : (
        <div className="version">
          <Link className="link" to="/pdf/Version-A">
            <div className="v_box">Version A</div>
          </Link>
          <Link className="link" to="/pdf/Version-B">
            <div className="v_box">Version B</div>
          </Link>
        </div>
      )}
       <Modal show={showPopup} onHide={()=>setShowPopup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you Sure You want to Delete?</Modal.Title>
        </Modal.Header>
                <Modal.Footer>
          <Button variant="secondary" size="lg" onClick={()=>setShowPopup(false)}>
            Close
          </Button>
          {/* <Button variant="primary" size="lg" onClick={handlePrint}>
            Print
          </Button> */}
          <Button disabled={loading} variant="primary" size="lg" onClick={ConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PDF;
