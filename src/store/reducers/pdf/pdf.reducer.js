import { updateObject } from "../../../utils/helpers/helper";
import { PDFSAVING_FAILED, PDFSAVING_SUCCESS, PDFSAVING_START, GetTotalStatement_SUCCESS, GetTotalStatement_FAILED, GetSpecificStatement_SUCCESS, GetSpecificStatement_FAILED } from "../../actionTypes/index";

const initialState = {
  error: null,
  loading: false,
  pdfs: [],
  values: {
    id: "",
    pdf_name: "",
    logo_url: "",
    version: "",
    company_info: "Construction Clean Partners LLC",
    company_address1: "715 Peachtree St, Ste 100",
    company_address2: "Atlanta, GA 30308",
    owner_name: "Aduvie Okoh",
    owner_email: "aduvie@final‐clean.com",
    owner_phone: "(202) 544-1353",
    url: "https://final‐clean.com/",
    about_us:
      "Construction Clean Partners works with commercial general contractors as a subcontractor completing the post construction final clean scope. We estimate cleaning bids via the plans and physical site visit walk throughs. CCP mobilizes employee labor and equipment to new construction and renovation commercial projects to help clean interior building sites.",
    core_competencies:
      "Interior post construction cleanup=Pressure washing=Window washing=Covid disinfection and sanitation",
    core_competencies_image: "https://res.cloudinary.com/die5mkbau/image/upload/v1694085238/ccp-logo_wryb63.png",
    core_competencies_info: "Scope – Final clean = NAICS – 561720 = DUNS – 067345638",
    past_performance:
      "Canaan Crossing=Woda Cooper Companies=Allora At the Exchange=CORE Construction=Intrada Westside=JM Wilkerson=Harris County Carver Middle School=Freeman & Associates",
    past_performance_image: "https://res.cloudinary.com/die5mkbau/image/upload/v1694085238/ccp-logo_wryb63.png",
    difference:
      "We have been awarded contracts in over 41 cities. We have 9 managers and offices located around the USA that can supervise our local labor and equipment. CCP can get a site visit to confirm scope and pricing within 48 hours notice anywhere in the USA. We will always mobilize within an hour of your job site.",
  }
};

const StartSavingPDF = (state) => {
  return updateObject(state, {
    loading: true,
    error: null,
  });
};
const SavingPDFSuccess = (state, action) => {
  return updateObject(state, {
    values:action.data,
    loading:false
  });
};

const PDFSavingFail = (state, action) => {
  return updateObject(state, {
    error: action.Error,
    loading: false,
  });
};
const GetTotalStatementFail = (state, action) => {
  return updateObject(state, {
    error: action.Error,
    loading: false,
  });
};

const GetTotalStatementSuccess = (state, action) => {
  return updateObject(state, action.data);
};
const GetSpecificStatementFail = (state, action) => {
  return updateObject(state, {
    error: action.Error,
    loading: false,
  });
};

const GetSpecificStatementSuccess = (state, action) => {
  const values={values:action.data}
  return updateObject(state, values);
};

export const pdfReducer = (state = initialState, action) => {
  switch (action.type) {
    case PDFSAVING_START:
      return StartSavingPDF(state, action);
    case PDFSAVING_SUCCESS:
      return SavingPDFSuccess(state, action);
    case PDFSAVING_FAILED:
      return PDFSavingFail(state, action);
    case GetTotalStatement_SUCCESS:
    return GetTotalStatementSuccess(state, action);
    case GetTotalStatement_FAILED:
    return GetTotalStatementFail(state, action);
    case GetSpecificStatement_SUCCESS:
      return GetSpecificStatementSuccess(state, action);
      case GetSpecificStatement_FAILED:
      return GetSpecificStatementFail(state, action);
    default:
      return state;
  }
};
