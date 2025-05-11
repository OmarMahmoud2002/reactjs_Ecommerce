import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLanguage } from "../contexts/LanguageContext";

export default function Header() {
  const { totalQuantity } = useSelector((state) => state.cart);
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          {t('products')} Shop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav me-auto">
            <Link className="nav-link" to="/">
              {t('products')}
            </Link>
          </div>
          <div className="d-flex align-items-center">
            {/* Language Dropdown */}
            <div className="dropdown me-3">
              <select
                className="form-select"
                value={language}
                onChange={handleLanguageChange}
                aria-label="Language selector"
              >
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
            </div>

            {/* Cart Icon with Badge */}
            <Link to="/cart" className="position-relative me-3">
              <i className="bi bi-cart3 fs-4"></i>
              {totalQuantity > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalQuantity}
                  <span className="visually-hidden">items in cart</span>
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
