import React from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartOutlined, CheckOutlined } from "@ant-design/icons";

const ItemList = ({ item }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.rootReducer);
  const isItemInCart = cartItems.some((cartItem) => cartItem._id === item._id);

  const handleAddToCart = () => {
    if (!isItemInCart) {
      dispatch({ type: "ADD_TO_CART", payload: { ...item, quantity: 1 } });
    }
  };

  return (
    <div>
      <style>{`
                @keyframes cardPop {
                    from { opacity: 0; transform: scale(0.95) translateY(8px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }

                .jauter-item-card {
                    background: #ffffff;
                    border-radius: 20px;
                    overflow: hidden;
                    width: 220px;
                    margin: 8px;
                    box-shadow: 0 2px 12px rgba(0,0,0,0.07);
                    transition: transform 0.25s ease, box-shadow 0.25s ease;
                    animation: cardPop 0.35s ease;
                    border: 1.5px solid #eeeeee;
                }
                .jauter-item-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 12px 28px rgba(0,0,0,0.13);
                    border-color: #c8f000;
                }
                .jauter-item-img-wrap {
                    position: relative;
                    overflow: hidden;
                    background: #f5f5f5;
                }
                .jauter-item-img-wrap img {
                    width: 100%;
                    height: 180px;
                    object-fit: cover;
                    transition: transform 0.35s ease;
                    display: block;
                }
                .jauter-item-card:hover .jauter-item-img-wrap img {
                    transform: scale(1.06);
                }
                .jauter-item-body {
                    padding: 14px;
                }
                .jauter-item-name {
                    font-size: 14px;
                    font-weight: 800;
                    color: #111;
                    margin-bottom: 6px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .jauter-item-price {
                    font-size: 15px;
                    font-weight: 700;
                    color: #7c3aed;
                    margin-bottom: 12px;
                }
                .jauter-add-btn {
                    width: 100%;
                    border-radius: 50px !important;
                    font-weight: 700 !important;
                    height: 38px !important;
                    border: none !important;
                    font-size: 13px !important;
                    transition: all 0.2s ease !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    gap: 6px !important;
                }
                .jauter-add-btn:not(:disabled) {
                    background: #111 !important;
                    color: #c8f000 !important;
                }
                .jauter-add-btn:not(:disabled):hover {
                    background: #222 !important;
                    transform: translateY(-2px) !important;
                    box-shadow: 0 6px 14px rgba(0,0,0,0.18) !important;
                }
                .jauter-add-btn:disabled {
                    background: #c8f000 !important;
                    color: #111 !important;
                    opacity: 1 !important;
                    cursor: not-allowed;
                }

                @media (max-width: 480px) {
                    .jauter-item-card { width: 100%; margin: 6px 0; }
                }
            `}</style>

      <div className="jauter-item-card">
        <div className="jauter-item-img-wrap">
          <img
            alt={item.name}
            src={`${process.env.REACT_APP_SERVER_URL}${item.image}`}
          />
        </div>
        <div className="jauter-item-body">
          <div className="jauter-item-name">{item.name}</div>
          {item.price && (
            <div className="jauter-item-price">₹ {item.price}</div>
          )}
          <Button
            className="jauter-add-btn"
            onClick={handleAddToCart}
            disabled={isItemInCart}
            icon={isItemInCart ? <CheckOutlined /> : <ShoppingCartOutlined />}
          >
            {isItemInCart ? "Added to Cart" : "Add to Invoice"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItemList;