import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Modal, message, Form, Input, Select } from "antd";

const CartPage = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [billPopup, setBillPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.rootReducer);

  const handleDecreament = (record) => {
    if (record.quantity !== 1) {
      dispatch({ type: "UPDATE_CART", payload: { ...record, quantity: record.quantity - 1 } });
    }
  };

  const handleIncreament = (record) => {
    dispatch({ type: "UPDATE_CART", payload: { ...record, quantity: record.quantity + 1 } });
  };

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => (temp += item.price * item.quantity));
    setSubTotal(temp);
  }, [cartItems]);

  const handleSubmit = async (value) => {
    if (subTotal < 10000) {
      message.error("Cart value must be above ₹10,000 to create an invoice.");
      return;
    }
    try {
      const auth = localStorage.getItem("auth");
      if (!auth) {
        message.error("Please login to create an invoice");
        navigate("/login");
        return;
      }
      const newObject = {
        ...value,
        cartItems,
        subTotal,
        tax: Number(((subTotal / 100) * 18).toFixed(2)),
        totalAmount: Number(subTotal) + Number(((subTotal / 100) * 18).toFixed(2)),
        userId: JSON.parse(auth)._id,
      };
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/bills/add-bills`, newObject);
      message.success("Bill Generated");
      navigate("/bills");
    } catch (error) {
      message.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <DefaultLayout>
      <style>{`
        .jauter-cart-wrapper {
          background: #f0f0f0;
          min-height: 100vh;
          padding: 24px 16px;
          font-family: 'Inter', sans-serif;
        }

        /* Header */
        .jauter-cart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #c8f000;
          border-radius: 50px;
          padding: 12px 20px;
          margin-bottom: 24px;
        }
        .jauter-cart-logo {
          font-size: 20px;
          font-weight: 900;
          color: #111;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .jauter-cart-logo-dot {
          width: 16px;
          height: 16px;
          background: #111;
          border-radius: 50%;
          display: inline-block;
        }
        .jauter-cart-badge {
          background: #111;
          color: #c8f000;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 14px;
        }

        /* Hero card */
        .jauter-hero-card {
          background: #e8e8e8;
          border-radius: 24px;
          padding: 32px 20px;
          text-align: center;
          margin-bottom: 24px;
          background-image: 
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .jauter-hero-icon {
          background: #c8f000;
          border-radius: 20px;
          width: 72px;
          height: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          font-size: 32px;
        }
        .jauter-hero-title {
          font-size: 28px;
          font-weight: 900;
          color: #111;
          line-height: 1.2;
          margin-bottom: 8px;
        }
        .jauter-hero-subtitle {
          color: #666;
          font-size: 14px;
          margin-bottom: 0;
        }

        /* Section title */
        .jauter-section-title {
          font-size: 22px;
          font-weight: 900;
          color: #111;
          margin-bottom: 16px;
        }

        /* Cart item cards */
        .jauter-cart-item {
          background: #ffffff;
          border-radius: 20px;
          padding: 16px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 14px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .jauter-cart-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
        }
        .jauter-item-img {
          width: 70px;
          height: 70px;
          border-radius: 14px;
          object-fit: cover;
          flex-shrink: 0;
          background: #f5f5f5;
        }
        .jauter-item-info {
          flex: 1;
          min-width: 0;
        }
        .jauter-item-name {
          font-size: 15px;
          font-weight: 700;
          color: #111;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .jauter-item-price {
          font-size: 16px;
          font-weight: 800;
          color: #7c3aed;
        }
        .jauter-qty-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #C8F000;
  border-radius: 50px;
  padding: 6px 12px;
}
.jauter-qty-num {
  font-weight: 800;
  font-size: 15px;
  min-width: 20px;
  text-align: center;
  color: #ffffff;
}
        .jauter-qty-btn {
  cursor: pointer;
  font-size: 18px;
  color: #111;
  transition: color 0.2s ease, transform 0.15s ease;
  display: flex;
  align-items: center;
}
.jauter-qty-btn:hover {
  color: #c8f000;
  transform: scale(1.2);
}
        .jauter-qty-num {
          font-weight: 800;
          font-size: 15px;
          min-width: 20px;
          text-align: center;
          color: #111;
        }
        .jauter-delete-btn {
  cursor: pointer;
  font-size: 16px;
  color: #999;
  background: #C8F000;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
  line-height: 1;
}
.jauter-delete-btn:hover {
  background: #da0202;
  color: #e53e3e;
}

        /* Empty state */
        .jauter-empty {
          text-align: center;
          padding: 40px 20px;
          color: #aaa;
          font-size: 15px;
          background: white;
          border-radius: 20px;
        }

        /* Subtotal card */
        .jauter-subtotal-card {
          background: #111;
          border-radius: 24px;
          padding: 24px 20px;
          margin-top: 20px;
          color: white;
        }
        .jauter-subtotal-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          font-size: 14px;
          color: #aaa;
        }
        .jauter-subtotal-row span:last-child {
          color: #fff;
          font-weight: 600;
        }
        .jauter-grand-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #333;
          padding-top: 14px;
          margin-top: 8px;
        }
        .jauter-grand-label {
          font-size: 16px;
          font-weight: 700;
          color: #fff;
        }
        .jauter-grand-amount {
          font-size: 22px;
          font-weight: 900;
          color: #c8f000;
        }
        .jauter-invoice-btn {
          width: 100%;
          margin-top: 16px;
          background: #c8f000 !important;
          border: none !important;
          border-radius: 50px !important;
          height: 50px !important;
          font-weight: 800 !important;
          font-size: 16px !important;
          color: #111 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
          transition: all 0.2s !important;
        }
        .jauter-invoice-btn:hover {
          background: #d4ff00 !important;
          box-shadow: 0 4px 16px rgba(200,240,0,0.4) !important;
          transform: translateY(-1px);
        }
        .jauter-invoice-btn-dot {
          width: 10px;
          height: 10px;
          background: #111;
          border-radius: 50%;
          display: inline-block;
        }

        /* Modal styling */
        .jauter-modal .ant-modal-content {
          border-radius: 20px !important;
          overflow: hidden;
        }
        .jauter-modal .ant-modal-header {
          background: #111 !important;
          border: none !important;
          padding: 20px 24px !important;
        }
        .jauter-modal .ant-modal-title {
          color: #c8f000 !important;
          font-weight: 800 !important;
          font-size: 18px !important;
        }
        .jauter-modal .ant-modal-close {
          color: #fff !important;
        }
        .jauter-modal .ant-modal-body {
          padding: 20px 24px !important;
        }
        .jauter-modal .ant-form-item-label > label {
          font-weight: 600;
          color: #333;
        }
        .jauter-modal .ant-input,
        .jauter-modal .ant-select-selector {
          border-radius: 10px !important;
          border-color: #e0e0e0 !important;
          height: 42px !important;
          font-size: 14px !important;
        }
        .jauter-modal-summary {
          background: #f8f8f8;
          border-radius: 14px;
          padding: 14px 16px;
          margin-bottom: 16px;
        }
        .jauter-modal-summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #555;
          margin-bottom: 6px;
        }
        .jauter-modal-summary-row.total {
          border-top: 1px solid #e0e0e0;
          padding-top: 10px;
          margin-top: 6px;
          font-weight: 800;
          font-size: 16px;
          color: #111;
        }
        .jauter-modal-summary-row.total span:last-child {
          color: #7c3aed;
        }
        .jauter-modal-submit {
          width: 100%;
          background: #c8f000 !important;
          border: none !important;
          border-radius: 50px !important;
          height: 46px !important;
          font-weight: 800 !important;
          font-size: 15px !important;
          color: #111 !important;
        }
        .jauter-modal-submit:hover {
          background: #d4ff00 !important;
          box-shadow: 0 4px 12px rgba(200,240,0,0.4) !important;
        }

        @media (max-width: 480px) {
          .jauter-cart-item { gap: 10px; padding: 12px; }
          .jauter-item-img { width: 55px; height: 55px; }
          .jauter-hero-title { font-size: 22px; }
          .jauter-qty-controls { padding: 4px 10px; }
        }
      `}</style>

      <div className="jauter-cart-wrapper">

        {/* Header pill */}
        <div className="jauter-cart-header">
          <div className="jauter-cart-logo">
            <span className="jauter-cart-logo-dot" />
            Vridhi Autos
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "22px", color: "#111" }}>☰</span>
            <div className="jauter-cart-badge">{cartItems.length}</div>
          </div>
        </div>

        {/* Hero card */}
        <div className="jauter-hero-card">
          <div className="jauter-hero-icon">
            <ShoppingCartOutlined style={{ color: "#111" }} />
          </div>
          <div className="jauter-hero-title">
            Your Cart.<br />Your Invoice.
          </div>
          <p className="jauter-hero-subtitle">
            Review your items and generate a professional invoice instantly.
          </p>
        </div>

        {/* Cart Items */}
        <div className="jauter-section-title">Cart Items</div>

        {cartItems.length === 0 ? (
          <div className="jauter-empty">
            🛒 Your cart is empty. Add some items from the homepage!
          </div>
        ) : (
          cartItems.map((item) => (
            <div className="jauter-cart-item" key={item._id}>
              <img
                className="jauter-item-img"
                src={`${process.env.REACT_APP_SERVER_URL}${item.image}`}
                alt={item.name}
              />
              <div className="jauter-item-info">
                <div className="jauter-item-name">{item.name}</div>
                <div className="jauter-item-price">₹ {item.price}</div>
              </div>
              <div className="jauter-qty-controls">
                <span className="jauter-qty-btn" onClick={() => handleDecreament(item)}>
                  <MinusCircleOutlined />
                </span>
                <span className="jauter-qty-num">{item.quantity}</span>
                <span className="jauter-qty-btn" onClick={() => handleIncreament(item)}>
                  <PlusCircleOutlined />
                </span>
              </div>
              <div
                className="jauter-delete-btn"
                onClick={() => dispatch({ type: "DELETE_FROM_CART", payload: item })}
              >
                <DeleteOutlined />
              </div>
            </div>
          ))
        )}

        {/* Subtotal card */}
        {cartItems.length > 0 && (
          <div className="jauter-subtotal-card">
            <div className="jauter-subtotal-row">
              <span>Subtotal</span>
              <span>₹ {subTotal}</span>
            </div>
            <div className="jauter-subtotal-row">
              <span>GST (18%)</span>
              <span>₹ {((subTotal / 100) * 18).toFixed(2)}</span>
            </div>
            <div className="jauter-grand-total">
              <span className="jauter-grand-label">Grand Total</span>
              <span className="jauter-grand-amount">
                ₹ {(Number(subTotal) + Number(((subTotal / 100) * 18).toFixed(2))).toFixed(2)}
              </span>
            </div>
            <Button
              className="jauter-invoice-btn"
              onClick={() => {
                if (subTotal >= 10000) {
                  setBillPopup(true);
                } else {
                  message.error("Cart value must be above ₹10,000 to create an invoice.");
                }
              }}
            >
              Create Invoice <span className="jauter-invoice-btn-dot" />
            </Button>
          </div>
        )}
      </div>

      {/* Invoice Modal */}
      <Modal
        className="jauter-modal"
        title="Create Invoice"
        open={billPopup}
        onCancel={() => setBillPopup(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="customerName" label="Customer Name"
            rules={[{ required: true, message: "Please enter customer name" }]}>
            <Input placeholder="Customer Name" />
          </Form.Item>
          <Form.Item name="customerNumber" label="Contact Number"
            rules={[{ required: true, message: "Please enter contact number" }]}>
            <Input placeholder="Contact Number" />
          </Form.Item>
          <Form.Item name="paymentMode" label="Payment Method"
            rules={[{ required: true, message: "Please select payment method" }]}>
            <Select placeholder="Select payment method">
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
            </Select>
          </Form.Item>
          <div className="jauter-modal-summary">
            <div className="jauter-modal-summary-row">
              <span>Subtotal</span><span>₹ {subTotal}</span>
            </div>
            <div className="jauter-modal-summary-row">
              <span>GST (10%)</span>
              <span>₹ {((subTotal / 100) * 10).toFixed(2)}</span>
            </div>
            <div className="jauter-modal-summary-row total">
              <span>Grand Total</span>
              <span>₹ {(Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))).toFixed(2)}</span>
            </div>
          </div>
          <Button className="jauter-modal-submit" type="primary" htmlType="submit">
            Generate Bill
          </Button>
        </Form>
      </Modal>
    </DefaultLayout>
  );
};

export default CartPage;