import React from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartOutlined, CheckOutlined } from "@ant-design/icons";
import "../styles/ItemList.css";

const ItemList = ({ item }) => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.rootReducer);
    const isItemInCart = cartItems.some((cartItem) => cartItem._id === item._id);

    // Determine the image URL
    const getImageUrl = () => {
        if (!item.image) {
            return 'https://via.placeholder.com/180?text=No+Image';
        }

        let imageUrl = item.image;

        // Fix malformed URLs (e.g., https// -> https://)
        imageUrl = imageUrl.replace(/^(https?):\/\/([^/])/, '$1://$2');

        // If it's a full URL (Cloudinary or any other), use it as-is
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
            return imageUrl;
        }

        // If it's a relative path, prepend the server URL
        if (imageUrl.startsWith('/')) {
            return `${process.env.REACT_APP_SERVER_URL}${imageUrl}`;
        }

        // Fallback: treat as relative path
        return `${process.env.REACT_APP_SERVER_URL}/${imageUrl}`;
    };

    const handleAddToCart = () => {
        if (!isItemInCart) {
            dispatch({ type: "ADD_TO_CART", payload: { ...item, quantity: 1 } });
        }
    };


    return (
        <div className="jauter-item-card">
            <div className="jauter-item-img-wrap">
                <img
                    alt={item.name}
                    src={getImageUrl()}
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
    );
};

export default React.memo(ItemList);