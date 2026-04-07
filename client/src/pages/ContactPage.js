import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import Header from "../components/Header";
import { Button, Form, Input, message } from "antd";
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from "@ant-design/icons";
import axios from "axios";

const ContactPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/contact-us`, values);
      message.success("Thank you! We will get back to you soon.");
      form.resetFields();
    } catch (error) {
      message.error("Something went wrong. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <DefaultLayout>
        <style>{`
          /* ===== JAUTER CONTACT PAGE ===== */
          .contact-wrapper {
            background: #f0f0f0;
            min-height: 100vh;
            padding: 0 0 40px 0;
            font-family: 'Inter', sans-serif;
          }

          .contact-container {
            max-width: 750px;
            margin: 0 auto;
            padding: 0 16px;
          }

          /* ── COMPANY INFO SECTION ── */
          .contact-company-section {
            background: linear-gradient(135deg, #c8f000 0%, #b8e000 100%);
            border-radius: 24px;
            padding: 40px 28px;
            text-align: center;
            margin-bottom: 32px;
            box-shadow: 0 8px 24px rgba(200, 240, 0, 0.25);
            position: relative;
            overflow: hidden;
          }

          .contact-company-section::before {
            content: '';
            position: absolute;
            top: -50px;
            right: -50px;
            width: 150px;
            height: 150px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
          }

          .contact-company-logo {
            font-size: 48px;
            margin-bottom: 16px;
            display: inline-block;
          }

          .contact-company-name {
            font-size: 32px;
            font-weight: 900;
            color: #111;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
          }

          .contact-company-tagline {
            font-size: 14px;
            color: #333;
            margin-bottom: 24px;
            font-weight: 500;
          }

          .contact-company-info {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .contact-info-item {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            font-size: 16px;
            color: #111;
            font-weight: 600;
          }

          .contact-info-item .anticon {
            font-size: 20px;
            color: #111;
          }

          /* ── CONTACT FORM SECTION ── */
          .contact-form-section {
            background: #fff;
            border-radius: 24px;
            padding: 32px 28px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
          }

          .contact-form-title {
            font-size: 24px;
            font-weight: 900;
            color: #111;
            margin-bottom: 8px;
            text-align: center;
          }

          .contact-form-subtitle {
            font-size: 13px;
            color: #888;
            text-align: center;
            margin-bottom: 24px;
          }

          .contact-form-wrapper .ant-form-item {
            margin-bottom: 18px;
          }

          .contact-form-wrapper .ant-form-item-label > label {
            font-weight: 700;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #666;
          }

          .contact-form-wrapper .ant-input,
          .contact-form-wrapper .ant-input-textarea > textarea {
            border-radius: 12px !important;
            border: 2px solid #e8e8e8 !important;
            font-size: 14px !important;
            padding: 12px 16px !important;
            font-family: 'Inter', sans-serif;
            transition: all 0.2s ease;
          }

          .contact-form-wrapper .ant-input:focus,
          .contact-form-wrapper .ant-input-textarea > textarea:focus {
            border-color: #c8f000 !important;
            box-shadow: 0 0 0 3px rgba(200, 240, 0, 0.15) !important;
          }

          .contact-form-wrapper .ant-input-textarea-show-count {
            font-size: 12px;
            color: #aaa;
            margin-top: 4px;
          }

          /* Submit Button */
          .contact-submit-btn {
            width: 100% !important;
            background: #111 !important;
            border: none !important;
            border-radius: 50px !important;
            height: 48px !important;
            font-family: 'Inter', sans-serif !important;
            font-weight: 800 !important;
            font-size: 15px !important;
            color: #c8f000 !important;
            letter-spacing: 0.5px !important;
            transition: all 0.2s ease !important;
            margin-top: 8px !important;
          }

          .contact-submit-btn:hover {
            background: #222 !important;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2) !important;
            transform: translateY(-2px) !important;
            color: #d4ff00 !important;
          }

          .contact-submit-btn:active {
            transform: translateY(0) !important;
          }

          /* Responsive */
          @media (max-width: 768px) {
            .contact-company-section {
              padding: 32px 20px;
              margin-bottom: 24px;
            }

            .contact-company-name {
              font-size: 26px;
            }

            .contact-form-section {
              padding: 24px 20px;
            }
          }

          /* ── LOCATION SECTION ── */
          .contact-location-section {
            background: #fff;
            border-radius: 24px;
            padding: 32px 28px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
            margin-bottom: 32px;
          }

          .contact-location-title {
            font-size: 24px;
            font-weight: 900;
            color: #111;
            margin-bottom: 24px;
            text-align: center;
          }

          .contact-location-map {
            width: 100%;
            height: 200px;
            border-radius: 16px;
            overflow: hidden;
            border: 2px solid #e8e8e8;
          }

          .contact-location-map iframe {
            width: 100%;
            height: 100%;
            border: none;
          }

          @media (max-width: 768px) {
            .contact-location-section {
              padding: 24px 20px;
            }

            .contact-location-map {
              height: 300px;
            }
          }

          @media (max-width: 480px) {
            .contact-company-section {
              padding: 24px 16px;
              border-radius: 18px;
            }

            .contact-company-logo {
              font-size: 40px;
            }

            .contact-company-name {
              font-size: 22px;
            }

            .contact-location-section {
              padding: 20px 16px;
              border-radius: 18px;
            }

            .contact-location-title {
              font-size: 20px;
            }

            .contact-location-map {
              height: 250px;
            }

            .contact-form-section {
              padding: 20px 16px;
              border-radius: 18px;
            }

            .contact-form-title {
              font-size: 20px;
            }
          }
        `}</style>

        <div className="contact-wrapper">
          <div className="contact-container">
            {/* Company Info Section */}
            <div className="contact-company-section">
              <div className="contact-company-logo">🚗</div>
              <h1 className="contact-company-name">Vridhi Autos</h1>
              <p className="contact-company-tagline">Your Trusted Auto Parts Solutions</p>

              <div className="contact-company-info">
                <div className="contact-info-item">
                  <PhoneOutlined />
                  <span>+91 98765 43210</span>
                </div>
                <div className="contact-info-item">
                  <MailOutlined />
                  <span>support@vrdhiautos.com</span>
                </div>
                <div className="contact-info-item">
                  <EnvironmentOutlined />
                  <span>Delhi, India</span>
                </div>
              </div>
            </div>

            {/* Location Section with Map */}
            <div className="contact-location-section">
              <h2 className="contact-location-title">Our Location</h2>
              <div className="contact-location-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7001.598633262561!2d77.226708!3d28.665727000000004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd08b867101f%3A0x81ad851fbff81380!2sVridhi%20Autos!5e0!3m2!1sen!2sus!4v1775558058913!5m2!1sen!2sus"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vridhi Autos Location"
                ></iframe>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="contact-form-section">
              <h2 className="contact-form-title">Get In Touch</h2>
              <p className="contact-form-subtitle">We'd love to hear from you. Send us a message!</p>

              <Form
                layout="vertical"
                form={form}
                onFinish={handleSubmit}
                className="contact-form-wrapper"
              >
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[
                    { required: true, message: "Please enter your full name" },
                    { min: 3, message: "Name must be at least 3 characters" },
                  ]}
                >
                  <Input placeholder="John Doe" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input placeholder="john@example.com" />
                </Form.Item>

                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  rules={[
                    { required: true, message: "Please enter your phone number" },
                  ]}
                >
                  <Input placeholder="9876543210" />
                </Form.Item>

                <Form.Item
                  name="subject"
                  label="Subject"
                >
                  <Input placeholder="What is this about?" />
                </Form.Item>

                <Form.Item
                  name="message"
                  label="Message"
                >
                  <Input.TextArea
                    placeholder="Tell us what's on your mind..."
                    rows={5}
                    maxLength={500}
                    showCount
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="contact-submit-btn"
                >
                  Send Message
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default ContactPage;
