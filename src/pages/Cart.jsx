import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../redux/slices/cartSlice';
import { useLanguage } from '../contexts/LanguageContext';

const Cart = () => {
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { t, dir } = useLanguage();

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (totalQuantity === 0) {
    return (
      <div className="container my-5" dir={dir}>
        <h2>{t('cart')}</h2>

        <div className="alert alert-info my-4">
          <p>{t('emptyCart')}</p>
          <Link to="/" className="btn btn-primary">
            {t('continueShopping')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5" dir={dir}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{t('cart')}</h2>
        <button
          className="btn btn-outline-danger"
          onClick={handleClearCart}
        >
          <i className="bi bi-trash me-2"></i>
          {t('emptyCart')}
        </button>
      </div>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th scope="col">{t('productDetails')}</th>
              <th scope="col">{t('price')}</th>
              <th scope="col">{t('quantity')}</th>
              <th scope="col">{t('total')}</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      className="me-3"
                    />
                    <div>
                      <h6 className="mb-0">{item.title}</h6>
                    </div>
                  </div>
                </td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <div className="input-group" style={{ width: '120px' }}>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <span className="form-control text-center">{item.quantity}</span>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </td>
                <td>${item.totalPrice.toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="row mt-4">
        <div className="col-md-6 offset-md-6">
          <div className="card">
            <div className="card-header">
              <h5>{t('cart')} {t('total')}</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>{t('total')}:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>{t('total')}:</strong>
                <strong>${totalAmount.toFixed(2)}</strong>
              </div>
              <div className="d-grid gap-2">
                <button className="btn btn-primary">
                  {t('checkout')}
                </button>
                <Link to="/" className="btn btn-outline-secondary">
                  {t('continueShopping')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
