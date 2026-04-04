import React from "react";
import { Layout, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined, LoginOutlined, LogoutOutlined, PhoneOutlined } from "@ant-design/icons";

const { Header } = Layout;

function AppHeader() {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("auth");

    const handleLogout = () => {
        localStorage.removeItem("auth");
        navigate("/login");
    };

    const menuItems = [
        { label: "Home", key: "home", onClick: () => navigate("/") },
        { label: "Items", key: "items", onClick: () => navigate("/items") },
        { label: "Contact Us", key: "contact", icon: <PhoneOutlined />, onClick: () => navigate("/contact") },
    ];

    return (
        <>
            <style>{`
                @keyframes slideDown {
                    from { transform: translateY(-100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .jauter-header-wrap {
                    padding: 10px 20px;
                    background: #e8e8e8;
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    animation: slideDown 0.4s ease;
                }
                .jauter-header-pill {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: #c8f000;
                    border-radius: 50px;
                    padding: 10px 20px;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
                }
                .jauter-logo {
                    font-size: 20px;
                    font-weight: 900;
                    color: #111;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    letter-spacing: -0.5px;
                    transition: transform 0.2s ease;
                }
                .jauter-logo:hover {
                    transform: scale(1.04);
                }
                .jauter-logo-dot {
                    width: 14px;
                    height: 14px;
                    background: #111;
                    border-radius: 50%;
                    display: inline-block;
                    flex-shrink: 0;
                }
                .jauter-header-right {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }
                .jauter-menu-icon {
                    font-size: 20px;
                    color: #111;
                    font-weight: 900;
                    cursor: pointer;
                    line-height: 1;
                }
                .jauter-nav-menu {
                    display: flex;
                    gap: 4px;
                    align-items: center;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }
                .jauter-nav-item {
                    padding: 6px 14px;
                    border-radius: 50px;
                    font-size: 14px;
                    font-weight: 700;
                    color: #111;
                    cursor: pointer;
                    transition: background 0.2s ease, transform 0.15s ease;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .jauter-nav-item:hover {
                    background: rgba(0,0,0,0.1);
                    transform: translateY(-1px);
                }
                .jauter-cart-pill {
                    background: #111;
                    color: #c8f000;
                    border-radius: 50px;
                    padding: 6px 14px;
                    font-weight: 800;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    border: none;
                }
                .jauter-cart-pill:hover {
                    background: #222;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                }
                .jauter-auth-btn {
                    background: #7c3aed !important;
                    color: white !important;
                    border: none !important;
                    border-radius: 50px !important;
                    font-weight: 700 !important;
                    height: 36px !important;
                    padding: 0 16px !important;
                    transition: all 0.2s ease !important;
                    display: flex !important;
                    align-items: center !important;
                    gap: 6px !important;
                }
                .jauter-auth-btn:hover {
                    background: #6d28d9 !important;
                    transform: translateY(-1px) !important;
                    box-shadow: 0 4px 12px rgba(124,58,237,0.35) !important;
                }

                @media (max-width: 768px) {
                    .jauter-nav-menu { display: none; }
                    .jauter-logo { font-size: 17px; }
                }
                @media (max-width: 480px) {
                    .jauter-header-wrap { padding: 8px 12px; }
                    .jauter-logo { font-size: 15px; }
                    .jauter-auth-btn span:not(.anticon) { display: none; }
                }
            `}</style>

            <div className="jauter-header-wrap">
                <div className="jauter-header-pill">
                    {/* Logo */}
                    <div className="jauter-logo" onClick={() => navigate("/")}>
                        <span className="jauter-logo-dot" />
                        Vridhi Autos
                    </div>

                    {/* Nav + Actions */}
                    <div className="jauter-header-right">
                        <ul className="jauter-nav-menu">
                            {menuItems.map((item) => (
                                <li key={item.key} className="jauter-nav-item" onClick={item.onClick}>
                                    {item.icon && item.icon} {item.label}
                                </li>
                            ))}
                        </ul>

                        <button className="jauter-cart-pill" onClick={() => navigate("/cart")}>
                            <ShoppingCartOutlined style={{ fontSize: "16px" }} />
                            Cart
                        </button>

                        <Button
                            className="jauter-auth-btn"
                            onClick={isLoggedIn ? handleLogout : () => navigate("/login")}
                            icon={isLoggedIn
                                ? <LogoutOutlined style={{ fontSize: "14px" }} />
                                : <LoginOutlined style={{ fontSize: "14px" }} />}
                        >
                            {isLoggedIn ? "Logout" : "Login"}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AppHeader;