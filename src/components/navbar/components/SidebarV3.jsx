import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink, useNavigate } from "react-router-dom";
import homeIcon from "../../../assets/img/sidebar/svg/home.svg";
import projectIcon from "../../../assets/img/sidebar/svg/projects.svg";
import calculatorIcon from "../../../assets/img/sidebar/svg/calculator.svg";
import proposalIcon from "../../../assets/img/sidebar/svg/proposal.svg";
import prequalifyIcon from "../../../assets/img/sidebar/svg/prequalify.svg";
import my_companyIcon from "../../../assets/img/sidebar/svg/my_company.jpg";
import forgot_passwordIcon from "../../../assets/img/sidebar/svg/forgot_password.svg";
import { getManageUserBilling } from "../../../store/actions/users/users.actions";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/actions/authentication.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faCreditCard,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

const sideBarList = [
  {
    name: "Home",
    to: "/",
    icon: homeIcon,
    divider: true,
  },
  {
    name: "Projects",
    to: "/project_board",
    // "icon": "../../../assets/img/sidebar/projects.png",
    icon: projectIcon,
    divider: false,
  },
  {
    name: "Cleanup Calculator",
    to: "/cleanup_calculator_overview",
    icon: calculatorIcon,
    divider: false,
  },
  {
    name: "Cleanup Proposal",
    to: "/proposal",
    icon: proposalIcon,
    divider: false,
  },
  {
    name: "Planify",
    to: "/planify",
    icon: prequalifyIcon,
    divider: true,
  },
  {
    name: "Prequel Masterkey",
    to: "/prequel-masterkey",
    icon: my_companyIcon,
    divider: false,
  },

  {
    name: "Password Reset",
    to: "/password_reset",
    icon: forgot_passwordIcon,
    divider: false,
  },
];

// function SidebarV3({ name, ...props }) {
function SidebarV3({
  show,
  toggleSideBarHandler,
  closeSidebarHandler,
  ...props
}) {
  //   const [show, setShow] = useState(false);

  //   const handleClose = () => setShow(false);
  //   const toggleShow = () => setShow((s) => !s);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading: billingLoader, disabled } = useSelector(
    (state) => state.manageUserBilling
  );
  const navigate = useNavigate();

  const onLogoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  const handleManageBilling = (e) => {
    e.preventDefault();
    dispatch(getManageUserBilling(user?.customer));
  };
  const closeSidebar = (e, link) => {
    e.preventDefault();
    toggleSideBarHandler(false);
    navigate(link);
  };
  return (
    <>
      <Button
        variant="none"
        onClick={toggleSideBarHandler}
        className="p-0 fs-1"
      >
        <span className="sidebar-open-v2">&#9776;</span>
      </Button>
      <Offcanvas show={show} onHide={closeSidebarHandler} {...props}>
        <Offcanvas.Header>
          {/* <Offcanvas.Title>Offcanvas</Offcanvas.Title> */}
          <Offcanvas.Title onClick={toggleSideBarHandler} role="button">
            <span className="sidebar-open-v2">&#9776;</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          {sideBarList.map((list, index) => {
            return (
              <div key={index}>
                <NavLink
                  to={list.to}
                  className="sidebar-links px-lg-4"
                  onClick={(e) => closeSidebar(e, list.to)}
                >
                  <img src={list.icon} style={{ width: 60 }} alt="home" />
                  <span>{list.name}</span>
                </NavLink>
                {list.divider ? (
                  <div className="sidebar-divider my-4"></div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
          {user && user?.subscriptions?.length > 0 && (
            <div>
              <NavLink
                to="/"
                className="sidebar-links my-3 "
                onClick={handleManageBilling}
                disabled={disabled}
              >
                {/*<img src={my_companyIcon} style={{ width: 60 }} alt="home" />*/}
                <FontAwesomeIcon
                  icon={faCreditCard}
                  size="xl"
                  style={{ width: 60 }}
                  className="cursor-pointer ms-lg-4 "
                />
                <span className="">
                  Billing
                  {billingLoader && (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                  <span className="visually-hidden">Loading...</span>
                </span>
              </NavLink>
              <div>
                <NavLink to="/pricing" className="sidebar-links my-3 ">
                  <FontAwesomeIcon
                    icon={faMoneyBill}
                    size="xl"
                    style={{ width: 60 }}
                    className="cursor-pointer ms-lg-4 "
                  />
                  <span className="">Pricing</span>
                </NavLink>
              </div>
            </div>
          )}
          {user && (
            <div>
              <NavLink
                to="/"
                className="sidebar-links px-lg-4"
                onClick={onLogoutHandler}
              >
                <img src={my_companyIcon} style={{ width: 60 }} alt="home" />
                <span>Logout</span>
              </NavLink>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

// function Example() {
//   return (
//     <>
//   {options.map((props, idx) => (
//     <OffCanvasExample key={idx} {...props} />
//   ))}
//     </>
//   );
// }

// render(<Example />);

export default SidebarV3;
