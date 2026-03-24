import React from "react";
import { Layout, Menu, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";

const { Header } = Layout;

function AppHeader() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("auth");

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
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
  ];

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#1890ff",
        padding: "0 20px",
      }}
    >
      <div style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>
        Vridhi Autos
      </div>

      <Menu
        theme="dark"
        mode="horizontal"
        items={menuItems}
        style={{
          flex: 1,
          marginLeft: "30px",
          backgroundColor: "transparent",
          border: "none",
        }}
      />

      <Space>
        {isLoggedIn && (
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={() => navigate("/cart")}
            style={{ backgroundColor: "white", color: "#1890ff" }}
          >
            Cart
          </Button>
        )}

        {!isLoggedIn ? (
          <Button
            type="primary"
            icon={<LoginOutlined />}
            onClick={() => navigate("/login")}
            style={{ backgroundColor: "white", color: "#1890ff" }}
          >
            Login
          </Button>
        ) : (
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{ backgroundColor: "white", color: "#1890ff" }}
          >
            Logout
          </Button>
        )}
      </Space>
    </Header>
  );
}

export default AppHeader;
