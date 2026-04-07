import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import Header from "../components/Header";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (value) => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/users/login`,
        value
      );
      dispatch({ type: "HIDE_LOADING" });
      if (res.data.message === "Login Fail") {
        return message.error("User Not Found");
      } else {
        message.success("User Logged-In Successfully");
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      }
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
      <Header />
      <style>{`
        .auth-page {
          min-height: 100vh;
          background: #f0f0f0;
          background-image:
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          font-family: 'Inter', sans-serif;
        }

        .auth-container {
          width: 100%;
          max-width: 420px;
        }

        /* Brand pill at top */
        .auth-brand-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #c8f000;
          border-radius: 50px;
          padding: 10px 20px;
          margin-bottom: 20px;
          font-size: 18px;
          font-weight: 900;
          color: #111;
        }
        .auth-brand-dot {
          width: 14px;
          height: 14px;
          background: #111;
          border-radius: 50%;
          display: inline-block;
        }

        .auth-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 36px 32px;
          width: 100%;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }

        .auth-card-title {
          font-size: 26px;
          font-weight: 900;
          color: #111;
          margin-bottom: 4px;
          line-height: 1.2;
        }
        .auth-card-sub {
          font-size: 14px;
          color: #888;
          margin-bottom: 28px;
        }

        .auth-card .ant-form-item-label > label {
          font-weight: 700;
          font-size: 13px;
          color: #333;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }
        .auth-card .ant-input,
        .auth-card .ant-input-password {
          border-radius: 12px !important;
          border: 2px solid #e8e8e8 !important;
          padding: 12px 14px !important;
          font-size: 14px !important;
          transition: border-color 0.2s !important;
        }
        .auth-card .ant-input:focus,
        .auth-card .ant-input-focused,
        .auth-card .ant-input-password:focus-within {
          border-color: #c8f000 !important;
          box-shadow: 0 0 0 3px rgba(200,240,0,0.2) !important;
        }

        .auth-test-creds {
          background: #f8f8f8;
          border: 2px dashed #ddd;
          border-radius: 12px;
          padding: 10px 14px;
          font-size: 13px;
          color: #666;
          font-weight: 500;
          text-align: center;
          margin-bottom: 16px;
        }

        .auth-submit-btn {
          background: #111 !important;
          border: none !important;
          border-radius: 50px !important;
          height: 46px !important;
          font-weight: 800 !important;
          font-size: 15px !important;
          padding: 0 32px !important;
          color: #c8f000 !important;
          transition: all 0.2s !important;
        }
        .auth-submit-btn:hover {
          background: #222 !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.18) !important;
        }

        .auth-footer-link {
          font-size: 13px;
          color: #888;
        }
        .auth-footer-link a {
          color: #7c3aed;
          font-weight: 700;
          text-decoration: none;
        }
        .auth-footer-link a:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .auth-card { padding: 24px 20px; border-radius: 18px; }
          .auth-card-title { font-size: 22px; }
        }
      `}</style>

      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-brand-pill">
            <span className="auth-brand-dot" />
            Vridhi Autos
          </div>

          <div className="auth-card">
            <div className="auth-card-title">Welcome back.</div>
            <div className="auth-card-sub">Login to your account to continue</div>

            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                name="userId"
                label="User ID"
                rules={[{ required: true, message: "Please enter your User ID" }]}
              >
                <Input placeholder="Enter your User ID" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Please enter your password" }]}
              >
                <Input.Password placeholder="Enter your password" />
              </Form.Item>

              {/* <div className="auth-test-creds">
                Test — UserId: <strong>123</strong> | Password: <strong>123</strong>
              </div> */}

              <div className="d-flex justify-content-between align-items-center" style={{ gap: "12px" }}>
                <p className="auth-footer-link mb-0">
                  New user? <Link to="/register">Register Here!</Link>
                </p>
                <Button className="auth-submit-btn" type="primary" htmlType="submit">
                  Login →
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
