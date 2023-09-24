import React, { useState } from 'react';
import useStickyState from '../custom';

const Modal = ({ isOpen, onClose, onAddProduct }) => {
    const [newProduct, setNewProduct] = useStickyState({
        title: '',
        price: 0,
        img: '',
        stock: 0
    });


    const handleClose = () => {
        onClose(); // modal penceresini kapatir
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleAddProduct = () => {
        console.log("Yeni ürün bilgileri:", newProduct);
        onAddProduct(newProduct);
        setNewProduct({
            title: '',
            price: 0,
            img: '',
            stock: 0
        });
        onClose();
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modalContent">
                <span className="closeButton" onClick={handleClose}>Kapat</span>
                <h2>Yeni Ürün Ekle</h2>
                <label htmlFor="title">Ürün Adı:</label>
                <input type="text" id="title" name="title" value={newProduct.title} onChange={handleInputChange} />
                <label htmlFor="price">Fiyat:</label>
                <input type="number" id="price" name="price" value={newProduct.price} onChange={handleInputChange} />
                <label htmlFor="img">Resim URL:</label>
                <input type="text" id="img" name="img" value={newProduct.img} onChange={handleInputChange} />
                <label htmlFor="stock">Stok:</label>
                <input type="number" id="stock" name="stock" value={newProduct.stock} onChange={handleInputChange} />
                <button onClick={handleAddProduct}>Ekle</button>
            </div>
        </div>
    );
};

export default Modal;
