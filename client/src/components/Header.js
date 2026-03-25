import React, { useState } from "react";
import { Layout, Menu, Button, Space, Modal, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined, LoginOutlined, LogoutOutlined, PhoneOutlined } from "@ant-design/icons";
import axios from "axios";

const { Header } = Layout;

function AppHeader() {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("auth");
    const [contactModal, setContactModal] = useState(false);
    const [form] = Form.useForm();

    const handleLogout = () => {
        localStorage.removeItem("auth");
        navigate("/login");
    };

    const handleContactSubmit = async (values) => {
        try {
            await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/users/contact-us`,
                values
            );
            message.success("Contact information sent successfully!");
            form.resetFields();
            setContactModal(false);
        } catch (error) {
            message.error("Failed to send contact information");
            console.log(error);
        }
    };

    const menuItems = [
        {
            label: "Home",
            key: "home",
            onClick: () => navigate("/"),
        },
        {
            label: "Items",
            key: "items",
            onClick: () => navigate("/items"),
        },
        {
            label: "Contact Us",
            key: "contact",
            icon: <PhoneOutlined />,
            onClick: () => setContactModal(true),
        },
    ];

    return (
        <>
            <Header
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#1890ff",
                    padding: "0 24px",
                    position: "sticky",
                    top: 0,
                    zIndex: 1000,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
            >
                {/* Logo */}
                <div
                    style={{
                        color: "white",
                        fontSize: "20px",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/")}
                >
                    Vridhi Autos
                </div>

                {/* Nav Links */}
                <Menu
                    theme="dark"
                    mode="horizontal"
                    items={menuItems}
                    style={{
                        flex: 1,
                        marginLeft: "30px",
                        backgroundColor: "transparent",
                        border: "none",
                        lineHeight: "64px",
                    }}
                />

                {/* Right Side: Cart + Login/Logout */}
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<ShoppingCartOutlined style={{ fontSize: "20px", color: "white" }} />}
                        onClick={() => navigate("/cart")}
                        style={{
                            color: "white",
                            fontWeight: "500",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                        }}
                    >
                        Cart
                    </Button>

                    {!isLoggedIn ? (
                        <Button
                            icon={<LoginOutlined />}
                            onClick={() => navigate("/login")}
                            style={{
                                backgroundColor: "white",
                                color: "#1890ff",
                                fontWeight: "500",
                                border: "none",
                            }}
                        >
                            Login
                        </Button>
                    ) : (
                        <Button
                            icon={<LogoutOutlined />}
                            onClick={handleLogout}
                            style={{
                                backgroundColor: "white",
                                color: "#1890ff",
                                fontWeight: "500",
                                border: "none",
                            }}
                        >
                            Logout
                        </Button>
                    )}
                </Space>
            </Header>

            {/* Contact Us Modal */}
            <Modal
                title="Contact Us"
                open={contactModal}
                onCancel={() => setContactModal(false)}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleContactSubmit}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            { required: true, message: "Please enter your name" },
                        ]}
                    >
                        <Input placeholder="Your Name" />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[
                            { required: true, message: "Please enter your phone number" },
                            { pattern: /^[0-9]{10}$/, message: "Please enter a valid 10-digit phone number" },
                        ]}
                    >
                        <Input placeholder="10-digit phone number" />
                    </Form.Item>

                    <Form.Item
                        name="organizationName"
                        label="Organization Name"
                        rules={[
                            { required: true, message: "Please enter your organization name" },
                        ]}
                    >
                        <Input placeholder="Your Organization Name" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email (Optional)"
                        rules={[
                            { type: "email", message: "Please enter a valid email address" },
                        ]}
                    >
                        <Input placeholder="your.email@example.com" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Send
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default AppHeader;