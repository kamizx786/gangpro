import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { updatePlanRoom } from "../../store/actions/gc_qualify/gcQualify.actions";
import { useDispatch, useSelector } from "react-redux";
import { isSubscriptionActive } from "../../utils/helpers/helper";
import styled from "styled-components";
const StyledTextArea = styled(Form.Control)`
  @media (max-width: 576px) {
    width: 110px;
  }
`;

const NotesContainer = ({
  row,
  handleSetLoginModal,
  handleSetPaymentModal,
  handleSetFreeMode,
  price_id,
  free_mode_count,
  user,
}) => {
  const [note, setNote] = useState(row.max_note);
  const [showButton, setShowButton] = useState(false);
  const { loading } = useSelector((state) => state.planRoomUpdate);
  const boxRef = useRef();
  const dispatch = useDispatch();

  const handleNoteClick = (e) => {
    // ref.current.style.color = "red";
    // setNote(true);
    setNote(e.target.value);
    if (note !== "") {
      setShowButton(true);
    }
  };

  const handleSaveNote = () => {
    if (!user) {
      handleSetLoginModal();
    } else if (!isSubscriptionActive(user, price_id, user, free_mode_count)) {
      handleSetPaymentModal();
    } else {
      handleSetFreeMode();
      if (note !== "") {
        dispatch(updatePlanRoom({ note, company_account_id: row.id }));
      }
      setShowButton(false);
    }
  };

  return (
    <div>
      <StyledTextArea
        id={row.id}
        as="textarea"
        rows={note ? "3" : "1"}
        key={row.id}
        value={note}
        onChange={(e) => handleNoteClick(e)}
      />
      {showButton && (
        <Button
          type="submit"
          variant="primary"
          className="p-3  col-md-3"
          onClick={handleSaveNote}
          disabled={loading}
        >
          Save
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          <span className="visually-hidden">Loading...</span>{" "}
        </Button>
      )}
    </div>
  );
};

export default NotesContainer;
