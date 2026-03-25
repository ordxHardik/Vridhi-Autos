import React from "react";
import { Button, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
const ItemList = ({ item }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.rootReducer);
  
  // Check if item is already in cart
  const isItemInCart = cartItems.some((cartItem) => cartItem._id === item._id);
  
  //update cart handler
  const handleAddTOCart = () => {
    if (!isItemInCart) {
      dispatch({
        type: "ADD_TO_CART",
        payload: { ...item, quantity: 1 },
      });
    }
  };
  
  const { Meta } = Card;
  return (
    <div>
      <Card
        style={{ width: 240, margin: 15 }}
      // cover={}
      >
        <img
          alt={item.name}
          src={`${process.env.REACT_APP_SERVER_URL}${item.image}`}
          style={{ height: 200, width: "100%", objectFit: "cover" }}
        />
        <Meta title={item.name} />
        <div className="item-button">
          <Button 
            onClick={() => handleAddTOCart()}
            disabled={isItemInCart}
          >
            {isItemInCart ? "Item Added to Cart" : "Add to Invoice"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ItemList;
