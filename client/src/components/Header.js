import React, { useState } from "react";
import { Layout, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined, LoginOutlined, LogoutOutlined, PhoneOutlined, HomeOutlined, UnorderedListOutlined, CloseOutlined } from "@ant-design/icons";

const { Header } = Layout;

function AppHeader() {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("auth");
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
                @keyframes slideInFromRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutToRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }

                .jauter-header-wrap {
                    padding: 4px 20px;
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
                    display: none;
                    transition: transform 0.2s ease;
                }
                .jauter-menu-icon:active {
                    transform: scale(0.95);
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

                /* Mobile Nav Drawer */
                .jauter-mobile-nav-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 999;
                    animation: fadeIn 0.3s ease;
                }
                .jauter-mobile-nav-overlay.hidden {
                    animation: fadeOut 0.3s ease forwards;
                }

                .jauter-mobile-nav-drawer {
                    position: fixed;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    width: 220px;
                    background: #c8f000;
                    z-index: 1001;
                    display: flex;
                    flex-direction: column;
                    padding: 16px 12px;
                    box-shadow: -4px 0 16px rgba(0,0,0,0.15);
                    animation: slideInFromRight 0.35s ease;
                    overflow-y: auto;
                }
                .jauter-mobile-nav-drawer.closed {
                    animation: slideOutToRight 0.35s ease forwards;
                }

                .jauter-mobile-nav-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                .jauter-mobile-nav-title {
                    font-size: 16px;
                    font-weight: 800;
                    color: #111;
                    margin: 0;
                }
                .jauter-mobile-nav-close {
                    background: none;
                    border: none;
                    font-size: 20px;
                    color: #111;
                    cursor: pointer;
                    padding: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.2s ease;
                }
                .jauter-mobile-nav-close:active {
                    transform: scale(0.9);
                }

                .jauter-mobile-nav-items {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    flex: 1;
                }
                .jauter-mobile-nav-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 14px;
                    border-radius: 12px;
                    background: rgba(0, 0, 0, 0.08);
                    font-size: 15px;
                    font-weight: 700;
                    color: #111;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    border: 2px solid transparent;
                }
                .jauter-mobile-nav-item:active {
                    background: rgba(0, 0, 0, 0.15);
                    transform: scale(0.98);
                }
                .jauter-mobile-nav-item i {
                    font-size: 18px;
                }

                @media (max-width: 768px) {
                    .jauter-nav-menu { display: none; }
                    .jauter-logo { font-size: 17px; }
                    .jauter-menu-icon { display: inline-flex; }
                }
                @media (max-width: 480px) {
                    .jauter-header-wrap { padding: 8px 12px; }
                    .jauter-logo { font-size: 15px; }
                    .jauter-auth-btn span:not(.anticon) { display: none; }
                    .jauter-mobile-nav-drawer { width: 200px; }
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

                        {/* Mobile Menu Icon */}
                        <button
                            className="jauter-menu-icon"
                            onClick={() => setMobileNavOpen(!mobileNavOpen)}
                            style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                            ☰
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {mobileNavOpen && (
                <div
                    className="jauter-mobile-nav-overlay"
                    onClick={() => setMobileNavOpen(false)}
                />
            )}
            <div className={`jauter-mobile-nav-drawer ${!mobileNavOpen ? 'closed' : ''}`}>
                <div className="jauter-mobile-nav-header">
                    <h3 className="jauter-mobile-nav-title">Menu</h3>
                    <button
                        className="jauter-mobile-nav-close"
                        onClick={() => setMobileNavOpen(false)}
                    >
                        <CloseOutlined />
                    </button>
                </div>

                <div className="jauter-mobile-nav-items">
                    <div
                        className="jauter-mobile-nav-item"
                        onClick={() => {
                            navigate("/");
                            setMobileNavOpen(false);
                        }}
                    >
                        <HomeOutlined />
                        <span>Home</span>
                    </div>

                    <div
                        className="jauter-mobile-nav-item"
                        onClick={() => {
                            navigate("/items");
                            setMobileNavOpen(false);
                        }}
                    >
                        <UnorderedListOutlined />
                        <span>Items</span>
                    </div>

                    <div
                        className="jauter-mobile-nav-item"
                        onClick={() => {
                            navigate("/contact");
                            setMobileNavOpen(false);
                        }}
                    >
                        <PhoneOutlined />
                        <span>Contact Us</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AppHeader;