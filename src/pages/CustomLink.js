import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

function CustomLink({ to, icon, children, onClick, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, start: null });

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <li className={isActive ? "active" : ""}>
      <div className="link-wrapper">
        {icon(isActive)}
        <Link to={to} onClick={handleClick} {...props}>
          {children}
        </Link>
      </div>
      {isActive && <div className="rectangle" />}
    </li>
  );
}

export default CustomLink;
