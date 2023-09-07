import React, { useRef } from "react";
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";

import "./Dropdown.css";

const Dropdown = ({ children, title, customClassName }) => {
  const dropdownRef = useRef(null);

  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const onClick = () => {
    return setIsActive(!isActive);
  };
  return (
    <div className="container-dropdown">
      <div className="menu-container">
        <button onClick={onClick} className="menu-trigger">
          <span>{title}</span>
        </button>
        <nav
          ref={dropdownRef}
          className={`c-dropdown-menu ${customClassName} ${
            isActive ? "active" : "inactive"
          }`}
        >
          {children}
        </nav>
      </div>
    </div>
  );
};

export default Dropdown;
