import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (value) => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/users/register`,
        value
      );
      message.success("Registered Successfully");
      navigate("/login");
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("Something Went Wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("auth")) navigate("/");
  }, [navigate]);

  return (
    <>
      <style>{`
        .auth-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #fff8f4 0%, #ffe8d6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
        }
        .auth-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 40px 36px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 8px 32px rgba(238,75,11,0.12);
          border-top: 4px solid #ee4b0b;
        }
        .auth-card h1 {
          color: #ee4b0b;
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 4px;
          text-align: center;
        }
        .auth-card h3 {
          color: #888;
          font-size: 15px;
          font-weight: 400;
          text-align: center;
          margin-bottom: 28px;
        }
        .auth-card .ant-form-item-label > label {
          font-weight: 600;
          color: #444;
        }
        .auth-card .ant-input {
          border-radius: 8px !important;
          border-color: #ffcba4 !important;
          padding: 10px 12px !important;
        }
        .auth-card .ant-input:focus {
          border-color: #ee4b0b !important;
          box-shadow: 0 0 0 2px rgba(238,75,11,0.1) !important;
        }
        .auth-submit-btn {
          background: linear-gradient(135deg, #ff6a00, #ee4b0b) !important;
          border: none !important;
          border-radius: 8px !important;
          height: 40px !important;
          font-weight: 600 !important;
          font-size: 15px !important;
          padding: 0 28px !important;
        }
        .auth-submit-btn:hover {
          background: linear-gradient(135deg, #ee4b0b, #d94000) !important;
          box-shadow: 0 4px 12px rgba(238,75,11,0.3) !important;
        }
        .auth-footer-link a {
          color: #ee4b0b;
          font-weight: 600;
        }
        .auth-footer-link a:hover {
          color: #d94000;
          text-decoration: underline;
        }
        @media (max-width: 480px) {
          .auth-card {
            padding: 28px 20px;
          }
          .auth-card h1 {
            font-size: 22px;
          }
        }
      `}</style>

      <div className="auth-page">
        <div className="auth-card">
          <h1>Vridhi Autos</h1>
          <h3>Create your account</h3>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="name" label="Full Name"
              rules={[{ required: true, message: "Please enter your name" }]}>
              <Input placeholder="Enter your full name" />
            </Form.Item>
            <Form.Item name="userId" label="User ID"
              rules={[{ required: true, message: "Please enter a User ID" }]}>
              <Input placeholder="Choose a User ID" />
            </Form.Item>
            <Form.Item name="password" label="Password"
              rules={[{ required: true, message: "Please enter a password" }]}>
              <Input.Password placeholder="Choose a password" />
            </Form.Item>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <p className="auth-footer-link mb-0">
                Already registered? <Link to="/login">Login Here!</Link>
              </p>
              <Button className="auth-submit-btn" type="primary" htmlType="submit">
                Register
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;