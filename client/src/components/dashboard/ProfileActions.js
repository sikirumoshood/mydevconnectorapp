import React from "react";
import { Link } from "react-router-dom";

export default function ProfileActions() {
  return (
    <div>
      <div className="btn-group mb-4" role="group">
        <Link
          to="/edit-profile"
          style={{ boxShadow: "0px -2px 5px #DEDEDE" }}
          className="btn btn-light mr-4"
        >
          <i className="fas fa-user-circle mr-1" style={{ color: "#0C4BE3" }} />{" "}
          Edit Profile
        </Link>
        <Link
          to="/add-experience"
          style={{ boxShadow: "0px -2px 5px #DEDEDE" }}
          className="btn btn-light mr-4"
        >
          <i className="fab fa-black-tie text-success mr-1" />
          Add Experience
        </Link>
        <Link
          to="/add-education"
          style={{ boxShadow: "0px -2px 5px #DEDEDE" }}
          className="btn btn-light mr-4"
        >
          <i className="fas fa-graduation-cap text-info text-warning mr-1" />
          Add Education
        </Link>
      </div>
    </div>
  );
}
