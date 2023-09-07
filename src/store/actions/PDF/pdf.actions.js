import { toast } from "react-toastify";
import { CapabilityStatement, DeleteUserStatement, GetSpecificStatement, TotalStatement } from "../../../utils/requests/pdf";
import { PDFSAVING_SUCCESS, PDFSAVING_START, PDFSAVING_FAILED, GetTotalStatement_FAILED, GetTotalStatement_SUCCESS, GetSpecificStatement_SUCCESS, GetSpecificStatement_FAILED } from "../../actionTypes";

export const SavingPDFStart = () => {
  return {
    type: PDFSAVING_START,
  };
};

export const SavingPDFSuccess = (data) => {
  return {
    type: PDFSAVING_SUCCESS,
    data,
  };
};

export const SavingPDFFailed = (Error) => {
  return {
    type: PDFSAVING_FAILED,
    Error,
  };
};
export const GetTotalStatementSuccess = (data) => {
  return {
    type: GetTotalStatement_SUCCESS,
    data,
  };
};

export const GetSpecificStatementFailed = (Error) => {
  return {
    type: GetTotalStatement_FAILED,
    Error,
  };
};

export const GetSpecificStatementSuccess = (data) => {
  return {
    type: GetSpecificStatement_SUCCESS,
    data,
  };
};

export const GetTotalStatementFailed = (Error) => {
  return {
    type: GetSpecificStatement_FAILED,
    Error,
  };
};

export const SaveCapabilityStatement = (PDFDetail, setIsEditMode, setShowPopup) => {
  return async (dispatch) => {
    dispatch(SavingPDFStart());

    return CapabilityStatement(PDFDetail)
      .then(async (response) => {
        await dispatch(SavingPDFSuccess(response));
        toast.success("PDF Save Successful");
        setIsEditMode(false)
        setShowPopup(false);
      })
      .catch((error) => {
        toast.error("PDF Saving Failed")
        dispatch(SavingPDFFailed("PDF Saving Failed"));
        setIsEditMode(false)
        setShowPopup(false);
      });
  };
};

export const GetTotalStatement = () => {
  let user =JSON.parse(localStorage.getItem("user"));
    if (!user) {
      return toast.error("Please Login")
    }
  return async (dispatch) => {
    return TotalStatement(user.id)
      .then(async (response) => {
        await dispatch(GetTotalStatementSuccess(response));
      })
      .catch((error) => {
        toast.error("Get Total Statement  Failed Failed")
        dispatch(GetTotalStatementFailed("Get Total Statement  Failed"));
      });
  };
};
export const DeleteStatement = (name,setShowPopup) => {
  let user =JSON.parse(localStorage.getItem("user"));
    if (!user) {
      return toast.error("Please Login")
    }
  return async (dispatch) => {
    return DeleteUserStatement(user.id,name)
      .then(async (response) => {
        await dispatch(GetTotalStatement());
        toast.success("Statement Deleted")
        setShowPopup(false)
      })
      .catch((error) => {
        toast.error("Statement Deleted Failed")
      });
  };
};
export const GetUserSpeicificStatement = (name,navigate) => {
  let user =JSON.parse(localStorage.getItem("user"));
    if (!user) {
      return toast.error("Please Login")
    }
  return async (dispatch) => {
    return GetSpecificStatement(user.id,name)
      .then(async (response) => {
        const {version,pdf_name}=response
        await dispatch(GetSpecificStatementSuccess(response));
        if(version==="A"){
          navigate(`/pdf/Version-A?${pdf_name}`)
        }else{
          navigate(`/pdf/Version-B?${pdf_name}`)
        }
      })
      .catch((error) => {
        toast.error("Get Statement Failed")
        dispatch(GetSpecificStatement_FAILED("Get Statement Failed"));
      });
  };
};


