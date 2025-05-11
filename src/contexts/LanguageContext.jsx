import React, { createContext, useState, useContext, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          'products': 'Products',
          'cart': 'Cart',
          'addToCart': 'Add to Cart',
          'removeFromCart': 'Remove from Cart',
          'emptyCart': 'Your cart is empty',
          'continueShopping': 'Continue Shopping',
          'total': 'Total',
          'checkout': 'Checkout',
          'inStock': 'In Stock',
          'outOfStock': 'Out of Stock',
          'price': 'Price',
          'quantity': 'Quantity',
          'productDetails': 'Product Details',
          'backToProducts': 'Back to Products',
          'language': 'Language',
          'viewDetails': 'View Details',
          'previous': 'Previous',
          'next': 'Next',
          'brand': 'Brand',
          'category': 'Category',
          'rating': 'Rating',
          'off': 'OFF',
        }
      },
      ar: {
        translation: {
          'products': 'المنتجات',
          'cart': 'عربة التسوق',
          'addToCart': 'أضف إلى العربة',
          'removeFromCart': 'إزالة من العربة',
          'emptyCart': 'عربة التسوق فارغة',
          'continueShopping': 'مواصلة التسوق',
          'total': 'المجموع',
          'checkout': 'الدفع',
          'inStock': 'متوفر',
          'outOfStock': 'غير متوفر',
          'price': 'السعر',
          'quantity': 'الكمية',
          'productDetails': 'تفاصيل المنتج',
          'backToProducts': 'العودة إلى المنتجات',
          'language': 'اللغة',
          'viewDetails': 'عرض التفاصيل',
          'previous': 'السابق',
          'next': 'التالي',
          'brand': 'الماركة',
          'category': 'الفئة',
          'rating': 'التقييم',
          'off': 'خصم',
        }
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Create the language context
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
  const [dir, setDir] = useState(language === 'ar' ? 'rtl' : 'ltr');

  useEffect(() => {
    // Update language in i18next
    i18n.changeLanguage(language);

    // Update direction based on language
    const newDir = language === 'ar' ? 'rtl' : 'ltr';
    setDir(newDir);
    document.documentElement.dir = newDir;
    document.documentElement.lang = language;

    // Save language preference to localStorage
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'ar' : 'en');
  };

  const value = {
    language,
    dir,
    setLanguage,
    toggleLanguage,
    t: (key) => i18n.t(key),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
