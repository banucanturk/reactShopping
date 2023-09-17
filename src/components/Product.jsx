import React, { useState, useEffect } from 'react';

const Product = ({ product, addToBasket }) => {
    const { id, title, price, img, stock } = product;
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        setQuantity(0);  // urun eklenirken miktari sifirladim
    }, [product]);

    const handleAddToBasket = () => {
        if (stock > 0) {
            setQuantity((prevQuantity) => prevQuantity + 1);
            addToBasket({ ...product, quantity: quantity + 1 });
        } else {
            alert("Üzgünüz, ürün stokta kalmadı.");
        }
    };

    return (
        <div>
            <h3>{title}</h3>
            <img src={img} alt="" />
            <p>{price} TL</p>
            <p>Mevcut Stok: {stock}</p>
            <div className="quantityControl">
                <button onClick={handleAddToBasket} disabled={stock === 0}>
                    {stock === 0 ? "Ürün Tükendi" : "Sepete Ekle"}
                </button>

            </div>
        </div>
    );
};

export default Product;
