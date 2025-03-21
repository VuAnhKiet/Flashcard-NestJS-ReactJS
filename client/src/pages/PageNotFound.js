import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className="Page">
      <div className="error-container">
        <h1 className="h1pnf">404</h1>
        <p className="ppnf">
          Oops! The page you're looking for is not here.
        </p>
        <Link className="back" to="/">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
