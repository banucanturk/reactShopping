import React, { useState } from 'react';
import './App.css';
import Basket from './components/Basket';
import Product from './components/Product';
import Modal from './components/Modal';
import productsData from './data/product';
import useStickyState from './custom';

function App() {
  const [basket, setBasket] = useState([]);
  const [products, setProducts] = useState(productsData);
  const [isModalOpen, setIsModalOpen] = useStickyState(false);

  const addToBasket = (product) => {
    const { id } = product;
    const existingProductIndex = basket.findIndex((item) => item.id === id);

    if (existingProductIndex !== -1) {
      const updatedBasket = [...basket];
      updatedBasket[existingProductIndex].quantity += 1;
      setBasket(updatedBasket);
    } else {
      setBasket([...basket, { ...product, quantity: 1 }]);
    }

    // Stok durumunu guncelleme
    const updatedProducts = products.map((p) => {
      if (p.id === id && p.stock > 0) {
        return {
          ...p,
          stock: p.stock - 1,
        };
      }
      return p;
    });
    setProducts(updatedProducts);
  };

  const handleSaveProduct = (productData) => {
    const newProduct = {
      id: products.length + 1,
      ...productData,
    };

    setProducts([...products, newProduct]);
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const updateProductStock = (productId, newStock) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          stock: newStock,
        };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  return (
    <div className="App">

      <div className="main">
        <h2>Ürünler</h2>
        <button onClick={toggleModal}>Yeni Ürün Ekle</button>
        <div className="productList">
          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
              addToBasket={addToBasket}
              updateProductStock={updateProductStock}
            />
          ))}
        </div>
        <Basket basket={basket} updateBasket={setBasket} products={products} setProducts={setProducts} />

      </div>
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={toggleModal} onAddProduct={handleSaveProduct} />}

    </div>
  );
}

export default App;


