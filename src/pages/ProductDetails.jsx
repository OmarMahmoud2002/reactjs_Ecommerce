import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProductById } from '../apis/productsApi';
import { addToCart } from '../redux/slices/cartSlice';
import { useLanguage } from '../contexts/LanguageContext';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { t, dir } = useLanguage();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        setError('Failed to fetch product details. Please try again later.');
        setLoading(false);
      }
    };

    getProductDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center my-5"><div className="spinner-border" role="status"></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!product) {
    return <div className="alert alert-warning">Product not found</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  return (
    <div className="container my-5" dir={dir}>
      <div className="row">
        <div className="col-md-6">
          <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {product.images.map((image, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <img
                    src={image}
                    className="d-block w-100"
                    alt={`${product.title} - image ${index + 1}`}
                    style={{ height: '400px', objectFit: 'contain' }}
                  />
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <h1>{product.title}</h1>
          <p className="text-muted">{t('brand')}: {product.brand} | {t('category')}: {product.category}</p>
          <p>{product.description}</p>
          <div className="d-flex align-items-center mb-3">
            <h3 className="me-3">${product.price}</h3>
            <span className="badge bg-success me-2">{product.discountPercentage}% {t('off')}</span>
          </div>
          <p>
            <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
              {product.stock > 0 ? t('inStock') : t('outOfStock')}
            </span>
          </p>
          <div className="d-flex mb-3">
            <span>{t('rating')}: </span>
            <div className="ms-2">
              {[...Array(5)].map((_, i) => (
                <i
                  key={i}
                  className={`bi ${i < Math.round(product.rating) ? 'bi-star-fill' : 'bi-star'}`}
                  style={{ color: '#ffc107' }}
                ></i>
              ))}
              <span className="ms-1">({product.rating})</span>
            </div>
          </div>

          {/* Quantity selector */}
          {product.stock > 0 && (
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">{t('quantity')}:</label>
              <div className="input-group" style={{ width: '150px' }}>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  <i className="bi bi-dash"></i>
                </button>
                <input
                  type="number"
                  className="form-control text-center"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  max={product.stock}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => quantity < product.stock && setQuantity(quantity + 1)}
                >
                  <i className="bi bi-plus"></i>
                </button>
              </div>
            </div>
          )}

          <button
            className="btn btn-primary me-2"
            disabled={product.stock <= 0}
            onClick={handleAddToCart}
          >
            <i className="bi bi-cart-plus me-2"></i>
            {t('addToCart')}
          </button>
          <Link to="/" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            {t('backToProducts')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
