import React from 'react';

function Basket({ basket, updateBasket, products, setProducts }) {
    const getTotalPrice = () => {
        return basket.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const removeItem = (item) => {
        // Sepetten sectigim bir urunu cikarma
        const updatedBasket = basket.filter((basketItem) => basketItem.id !== item.id);
        updateBasket(updatedBasket);

        // Sepetten cikardigim urunun stok durumunu ve adet sayisini guncelledim
        const updatedProducts = products.map((product) => {
            if (product.id === item.id) {
                return {
                    ...product,
                    stock: product.stock + item.quantity,  // Stok durumu artır
                };
            }
            return product;
        });
        setProducts(updatedProducts);
    };

    return (
        <div className="basket">
            <h2>Sepet</h2>
            <div className="basketItems">
                {basket.map((item, index) => (
                    <div key={index} className="basketItem">
                        <div className="basketItemDetails">
                            <img src={item.img} alt={item.title} className="basketItemImage" />
                            <div className="basketItemInfo">
                                <p>{item.title}</p>
                                <p>Fiyat: {item.price} TL</p>
                                <p>Adet: {item.quantity}</p>
                                <div className="quantityBtnTotal">
                                    <button onClick={() => incrementItem(item)} className="quantityBtn">+</button>
                                    <button onClick={() => decrementItem(item)} className="quantityBtn">-</button>
                                </div>
                                <button onClick={() => removeItem(item)} className="removeItemButton">Sil</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <p className="basketTotal">
                Toplam Fiyat: {getTotalPrice()} TL
            </p>
        </div>
    );
}

export default Basket;
