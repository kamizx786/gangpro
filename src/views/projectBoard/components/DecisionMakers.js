import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DecisionMakerCard from "../../../components/decisionMakerCard/DecisionMakerCard";
import {
  emailTemplate,
  emailTemplateError,
} from "../../../store/selectors/projects/project.selector";
import { toastError, toastSuccess } from "../../../utils/helpers/helper";
import { getContactRolesAPI } from "../../../utils/requests/callLogs";
import { sendEmailToContactAPI } from "../../../utils/requests/projects";

const DecisionMakers = ({
  emailTemplates,
  handleSelectedTemplate,
  projectId,
  callLogHandler,
  contactRoles,
  getContactRoles,
  projectName
}) => {
  // const [contactRoles, setContactRoles] = useState([]);
  const templateError = useSelector(emailTemplateError());
  const emailTemplateBody = useSelector(emailTemplate());

  // useEffect(() => {
  //   getContactRoles();
  //   return function cleanup() {
  //     setContactRoles([]);
  //   };
  // }, []);

  // const getContactRoles = () => {
  //   getContactRolesAPI(projectId)
  //     .then((response) => {
  //       setContactRoles(response);
  //     })
  //     .catch(() => {});
  //   return;
  // };

  const sendEmailHandler = (
    contact,
    selectedTemplate,
    subject,
    body,
    handleCloseEmailModal
  ) => {
    const data = {
      temp_id: selectedTemplate?.id,
      company_id: contact?.company_id,
      contact_id: contact?.id,
      subject: subject,
      body: body,
    };
    sendEmailToContactAPI(projectId, data)
      .then(() => {
        toastSuccess("Email Sent Successfully");
        handleCloseEmailModal(true);
        getContactRoles();
      })
      .catch((error) => {
        toastError(error.data?.message || "something went wrong", {
          autoClose: false,
        });
      });

    return;
  };

  return (
    <div className="row row-cols-1 row-cols-md-2">
      {contactRoles?.length > 0 ? (
        contactRoles.map((contact) => (
          <DecisionMakerCard
            key={contact.id}
            contact={contact}
            callLogHandler={callLogHandler}
            emailTemplates={emailTemplates}
            templateError={templateError}
            emailTemplateBody={emailTemplateBody}
            handleSelectedTemplate={handleSelectedTemplate}
            handleSendEmail={sendEmailHandler}
            projectName={projectName}
          />
        ))
      ) : (
        <div className="text-center w-100">No contact available</div>
      )}
    </div>
  );
};

export default DecisionMakers;
