import { useState } from "react";
import "./Cart.css";

export default function Cart({ cart = [], setCart }) {

  const [confirm, setConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const increase = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    ));
  };

  const decrease = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="cart">

      <h1>Your Cart</h1>

      {/* ✅ EMPTY CART FIX */}
      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Start adding products to see them here.</p>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cart.map(item => (
              <div className="cart-item" key={item.id}>

                <img src={item.thumbnail} alt="" />

                <div className="cart-info">
                  <h3>{item.title}</h3>

                  <p>Price: ${item.price}</p>

                  <div className="qty-controls">
                    <button onClick={() => decrease(item.id)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increase(item.id)}>+</button>
                  </div>

                  <p className="item-total">
                    Total: ${(item.price * item.qty).toFixed(2)}
                  </p>
                </div>

                <button className="remove-btn" onClick={() => removeItem(item.id)}>
                  ✕
                </button>

              </div>
            ))}
          </div>

          <div className="cart-footer">
            <h2>Total: ${totalPrice.toFixed(2)}</h2>

            <button className="checkout-btn" onClick={() => setConfirm(true)}>
              Checkout
            </button>
          </div>
        </>
      )}

      {/* CONFIRM */}
      {confirm && (
        <div className="popup">
          <div className="popup-box">
            <h3>Confirm Order?</h3>

            <button onClick={() => {
              setConfirm(false);
              setSuccess(true);
            }}>
              Finalize
            </button>

            <button onClick={() => setConfirm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* SUCCESS */}
      {success && (
        <div className="popup">
          <div className="popup-box">
            <h3>Order Placed Successfully 🎉</h3>

            <button onClick={() => {
              setSuccess(false);
              setCart([]);
            }}>
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
}