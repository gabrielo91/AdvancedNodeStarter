import React from "react";
import { Link } from "react-router-dom";
import BlogList from "./blogs/BlogList";

const Dashboard = () => {
  return (
    <div>
      <BlogList />
      <div className="fixed-action-btn">
        <Link
          data-cy="add-blog-button"
          to="/blogs/new"
          className="btn-floating btn-large red"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
