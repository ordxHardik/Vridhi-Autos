import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
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

  // ── OLD SUBTOTAL FUNCTION (WITH GST) ──
  // useEffect(() => {
  //   let temp = 0;
  //   cartItems.forEach((item) => (temp += item.price * item.quantity));
  //   setSubTotal(temp);
  // }, [cartItems]);

  // ── NEW SUBTOTAL FUNCTION (WITHOUT GST) ──
  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    setSubTotal(total);
  }, [cartItems]);

  const handleSubmit = async (value) => {
    if (subTotal < 10000) {
      message.error("Cart value must be above ₹10,000 to create an invoice.");
      return;
    }
    try {
      const auth = localStorage.getItem("auth");
      const newObject = {
        ...value,
        cartItems,
        subTotal,
        tax: 0,
        totalAmount: Number(subTotal),
        userId: auth ? JSON.parse(auth)._id : null,
      };
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/bills/add-bills`, newObject);
      message.success("Bill Generated");
      dispatch({ type: "CLEAR_CART" });
      localStorage.removeItem("cartItems");
      navigate("/bills");
    } catch (error) {
      message.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── PAGE WRAPPER — white background ── */
        .jauter-cart-wrapper {
          background: #ffffff;
          min-height: 100vh;
          padding: 20px 16px 40px;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── TOP NAV BAR ── */
        .jauter-cart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #111;
          border-radius: 50px;
          padding: 12px 18px;
          margin-bottom: 24px;
          max-width: 540px;
          margin-left: auto;
          margin-right: auto;
        }
        .jauter-cart-logo {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 900;
          color: #c8f000;
          display: flex;
          align-items: center;
          gap: 8px;
          letter-spacing: -0.3px;
        }
        .jauter-cart-logo-dot {
          width: 12px;
          height: 12px;
          background: #c8f000;
          border-radius: 50%;
          display: inline-block;
        }
        .jauter-nav-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .jauter-home-btn {
          background: #c8f000;
          border: none;
          border-radius: 50px;
          height: 36px;
          padding: 0 16px;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 13px;
          color: #111;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .jauter-home-btn:hover {
          background: #d4ff00;
          transform: scale(1.04);
        }
        .jauter-cart-count-chip {
          background: #333;
          color: #c8f000;
          border-radius: 50px;
          padding: 4px 12px;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 800;
        }

        /* ── HERO CARD — light grey on white page ── */
        .jauter-hero-card {
          background: #f5f5f5;
          border-radius: 24px;
          padding: 32px 24px 28px;
          text-align: center;
          margin-bottom: 24px;
          position: relative;
          overflow: hidden;
          max-width: 540px;
          margin-left: auto;
          margin-right: auto;
        }
        .jauter-hero-card::after {
          content: '';
          position: absolute;
          top: -30px; right: -30px;
          width: 120px; height: 120px;
          background: #c8f000;
          border-radius: 50%;
          opacity: 0.3;
        }
        .jauter-hero-icon-wrap {
          background: #c8f000;
          border-radius: 18px;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 14px;
          position: relative;
          z-index: 1;
        }
        .jauter-hero-title {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 900;
          color: #111;
          line-height: 1.15;
          margin-bottom: 10px;
          letter-spacing: -0.5px;
          position: relative;
          z-index: 1;
        }
        .jauter-hero-subtitle {
          color: #888;
          font-size: 13px;
          line-height: 1.5;
          max-width: 280px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── CART SECTION — lime green pill/card ── */
        .jauter-cart-section {
          background: #b5e400;
          border-radius: 28px;
          padding: 20px 16px 20px;
          max-width: 540px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          overflow: hidden;
        }
        /* dot pattern inside green section only */
        .jauter-cart-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px);
          background-size: 20px 20px;
          pointer-events: none;
          border-radius: 28px;
        }

        /* ── SECTION LABEL ── */
        .jauter-section-title {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 800;
          color: #111;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          margin-bottom: 14px;
          position: relative;
          z-index: 1;
        }

        /* ── CART ITEM CARD ── */
        .jauter-cart-item {
          background: #fff;
          border-radius: 18px;
          padding: 14px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 1;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .jauter-cart-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }
        .jauter-item-img {
          width: 64px;
          height: 64px;
          border-radius: 14px;
          object-fit: cover;
          flex-shrink: 0;
          background: #f0f0f0;
        }
        .jauter-item-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .jauter-item-name {
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #111;
          margin-bottom: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .jauter-item-price {
          font-size: 14px;
          font-weight: 700;
          color: #111;
        }

        /* Qty pill — dark */
        .jauter-qty-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #111;
          border-radius: 50px;
          padding: 7px 14px;
          flex-shrink: 0;
        }
        .jauter-qty-btn {
          cursor: pointer;
          font-size: 16px;
          color: #c8f000;
          display: flex;
          align-items: center;
          transition: transform 0.15s ease;
        }
        .jauter-qty-btn:hover { transform: scale(1.2); }
        .jauter-qty-num {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: 14px;
          min-width: 18px;
          text-align: center;
          color: #fff;
        }

        /* Delete button */
        .jauter-delete-btn {
          cursor: pointer;
          font-size: 14px;
          color: #111;
          background: #c8f000;
          border-radius: 50%;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s ease;
          position: relative;
          z-index: 1;
        }
        .jauter-delete-btn:hover {
          background: #ff3b3b;
          color: #fff;
          transform: scale(1.1);
        }

        /* ── EMPTY STATE ── */
        .jauter-empty {
          text-align: center;
          padding: 40px 20px;
          color: #555;
          font-size: 14px;
          background: #fff;
          border-radius: 18px;
          position: relative;
          z-index: 1;
        }

        /* ── TOTALS CARD — dark, inside green section ── */
        .jauter-subtotal-card {
          background: #111;
          border-radius: 22px;
          padding: 20px;
          margin-top: 10px;
          position: relative;
          z-index: 1;
          overflow: hidden;
        }
        .jauter-subtotal-card::before {
          content: '';
          position: absolute;
          bottom: -35px; right: -35px;
          width: 110px; height: 110px;
          background: #c8f000;
          border-radius: 50%;
          opacity: 0.13;
        }
        .jauter-subtotal-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          font-size: 13px;
          color: #888;
        }
        .jauter-subtotal-row span:last-child {
          color: #ccc;
          font-weight: 500;
        }
        .jauter-grand-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #2a2a2a;
          padding-top: 14px;
          margin-top: 10px;
        }
        .jauter-grand-label {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
        }
        .jauter-grand-amount {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 900;
          color: #c8f000;
          letter-spacing: -0.5px;
        }
        .jauter-invoice-btn {
          width: 100% !important;
          margin-top: 16px !important;
          background: #c8f000 !important;
          border: none !important;
          border-radius: 50px !important;
          height: 50px !important;
          font-family: 'Syne', sans-serif !important;
          font-weight: 900 !important;
          font-size: 15px !important;
          color: #111 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 10px !important;
          transition: all 0.2s ease !important;
          position: relative !important;
          z-index: 1 !important;
          cursor: pointer !important;
        }
        .jauter-invoice-btn:hover {
          background: #d4ff00 !important;
          box-shadow: 0 6px 20px rgba(200,240,0,0.4) !important;
          transform: translateY(-2px) !important;
        }
        .jauter-invoice-btn-dot {
          width: 8px;
          height: 8px;
          background: #111;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ── MODAL ── */
        .jauter-modal .ant-modal-content {
          border-radius: 24px !important;
          overflow: hidden !important;
          padding: 0 !important;
        }
        .jauter-modal .ant-modal-header {
          background: #111 !important;
          border: none !important;
          padding: 18px 24px !important;
          margin: 0 !important;
        }
        .jauter-modal .ant-modal-title {
          font-family: 'Syne', sans-serif !important;
          color: #c8f000 !important;
          font-weight: 900 !important;
          font-size: 17px !important;
        }
        .jauter-modal .ant-modal-close { color: #888 !important; top: 14px !important; }
        .jauter-modal .ant-modal-body { padding: 20px 24px 24px !important; }
        .jauter-modal .ant-form-item-label > label {
          font-weight: 600; font-size: 13px; color: #444;
        }
        .jauter-modal .ant-input,
        .jauter-modal .ant-select-selector {
          border-radius: 12px !important;
          border-color: #e8e8e8 !important;
          height: 44px !important;
          font-size: 14px !important;
          background: #fafafa !important;
        }
        .jauter-modal-summary {
          background: #f5f5f5;
          border-radius: 14px;
          padding: 14px 16px;
          margin-bottom: 16px;
        }
        .jauter-modal-summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #666;
          margin-bottom: 6px;
        }
        .jauter-modal-summary-row.total {
          border-top: 1px solid #e0e0e0;
          padding-top: 10px;
          margin-top: 6px;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 15px;
          color: #111;
        }
        .jauter-modal-summary-row.total span:last-child { color: #111; }
        .jauter-modal-submit {
          width: 100% !important;
          background: #c8f000 !important;
          border: none !important;
          border-radius: 50px !important;
          height: 48px !important;
          font-family: 'Syne', sans-serif !important;
          font-weight: 900 !important;
          font-size: 15px !important;
          color: #111 !important;
          transition: all 0.2s ease !important;
        }
        .jauter-modal-submit:hover {
          background: #d4ff00 !important;
          box-shadow: 0 4px 14px rgba(200,240,0,0.4) !important;
        }

        @media (max-width: 540px) {
          .jauter-cart-wrapper { padding: 16px 12px 32px; }
          .jauter-hero-title { font-size: 22px; }
          .jauter-cart-item { padding: 12px; }
          .jauter-item-img { width: 56px; height: 56px; }
          .jauter-qty-controls { padding: 6px 10px; gap: 8px; }
          .jauter-grand-amount { font-size: 20px; }
        }
      `}</style>

      <div className="jauter-cart-wrapper">

        {/* ── Top Nav ── */}
        <div className="jauter-cart-header">
          <div className="jauter-cart-logo">
            <span className="jauter-cart-logo-dot" />
            Vridhi Autos
          </div>
          <div className="jauter-nav-right">
            <span className="jauter-cart-count-chip">{cartItems.length} items</span>
            <button className="jauter-home-btn" onClick={() => navigate("/")}>
              <HomeOutlined style={{ fontSize: 14 }} />
              Home
            </button>
          </div>
        </div>

        {/* ── Hero Card ── */}
        <div className="jauter-hero-card">
          <div className="jauter-hero-icon-wrap">
            <ShoppingCartOutlined style={{ color: "#111", fontSize: 26 }} />
          </div>
          <div className="jauter-hero-title">
            Your Cart.<br />Your Invoice.
          </div>
          <p className="jauter-hero-subtitle">
            Review your items and generate a professional invoice instantly.
          </p>
        </div>

        {/* ── Cart Section (lime green) ── */}
        <div className="jauter-cart-section">
          <div className="jauter-section-title">Cart Items</div>

          {cartItems.length === 0 ? (
            <div className="jauter-empty">
              🛒 Your cart is empty. Add some items from the homepage!
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
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
              ))}

              {/* Totals inside green section */}
              <div className="jauter-subtotal-card">
                <div className="jauter-subtotal-row">
                  <span>Subtotal</span>
                  <span>₹ {subTotal}</span>
                </div>
                <div className="jauter-subtotal-row">
                  {/* <span>GST (18%)</span> */}
                  {/* <span>₹ {((subTotal / 100) * 18).toFixed(2)}</span> */}
                </div>
                <div className="jauter-grand-total">
                  <span className="jauter-grand-label">Grand Total</span>
                  <span className="jauter-grand-amount">
                    ₹ {Number(subTotal).toFixed(2)}
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
            </>
          )}
        </div>

      </div>

      {/* ── Invoice Modal ── */}
      <Modal
        className="jauter-modal"
        title="Create Invoice"
        open={billPopup}
        onCancel={() => setBillPopup(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="customerName"
            label="Customer Name"
            rules={[{ required: true, message: "Please enter customer name" }]}
          >
            <Input placeholder="Customer Name" />
          </Form.Item>
          <Form.Item
            name="customerNumber"
            label="Contact Number"
            rules={[{ required: true, message: "Please enter contact number" }]}
          >
            <Input placeholder="Contact Number" />
          </Form.Item>
          <Form.Item
            name="customerEmail"
            label="Email Address"
            rules={[
              { required: true, message: "Please enter email address" },
              { type: "email", message: "Please enter a valid email" }
            ]}
          >
            <Input placeholder="customer@example.com" />
          </Form.Item>
          <Form.Item
            name="paymentMode"
            label="Payment Method"
            rules={[{ required: true, message: "Please select payment method" }]}
          >
            <Select placeholder="Select payment method">
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
            </Select>
          </Form.Item>
          <div className="jauter-modal-summary">
            <div className="jauter-modal-summary-row">
              <span>Subtotal</span><span>₹ {Number(subTotal).toFixed(2)}</span>
            </div>
            <div className="jauter-modal-summary-row total">
              <span>Grand Total</span>
              <span>₹ {Number(subTotal).toFixed(2)}</span>
            </div>
          </div>
          <Button className="jauter-modal-submit" type="primary" htmlType="submit">
            Place Order
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default CartPage;