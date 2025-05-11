import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center my-5">
      <h2>404 - Page Not Found</h2>
      <p className="mt-3">The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Go to Products List
      </Link>
    </div>
  );
}
