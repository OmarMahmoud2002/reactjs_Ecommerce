import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../apis/productsApi';
import { addToCart } from '../redux/slices/cartSlice';
import { useLanguage } from '../contexts/LanguageContext';

const ProductsList = () => {
  const dispatch = useDispatch();
  const { t, dir } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 10;

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const skip = currentPage * limit;
        const data = await fetchProducts(limit, skip);
        setProducts(data.products);
        setTotalProducts(data.total);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      }
    };

    getProducts();
  }, [currentPage]);

  const totalPages = Math.ceil(totalProducts / limit);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  if (loading) {
    return <div className="text-center my-5"><div className="spinner-border" role="status"></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  return (
    <div className="container" dir={dir}>
      <h2 className="my-4">{t('products')}</h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map((product) => (
          <div className="col" key={product.id}>
            <div className="card h-100">
              <img
                src={product.thumbnail}
                className="card-img-top"
                alt={product.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description.substring(0, 100)}...</p>
                <p className="card-text">
                  <strong>{t('price')}:</strong> ${product.price}
                </p>
                <p className="card-text">
                  <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                    {product.stock > 0 ? t('inStock') : t('outOfStock')}
                  </span>
                </p>
                <div className="d-flex justify-content-between">
                  <Link to={`/product-details/${product.id}`} className="btn btn-primary">
                    <i className="bi bi-eye me-1"></i> {t('viewDetails')}
                  </Link>
                  {product.stock > 0 && (
                    <button
                      className="btn btn-success"
                      onClick={() => handleAddToCart(product)}
                    >
                      <i className="bi bi-cart-plus"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center my-4">
        <nav aria-label="Product pagination">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handlePrevPage}>
                {t('previous')}
              </button>
            </li>
            {[...Array(totalPages).keys()].map((page) => (
              <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(page)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handleNextPage}>
                {t('next')}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProductsList;
