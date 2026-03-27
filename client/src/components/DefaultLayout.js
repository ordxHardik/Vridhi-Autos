import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
    MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, LogoutOutlined,
    HomeOutlined, CopyOutlined, UnorderedListOutlined, ShoppingCartOutlined, GithubOutlined,
} from "@ant-design/icons";
import "../styles/DefaultLayout.css";
import Spinner from "./Spinner";

const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
    const navigate = useNavigate();
    const { cartItems, loading } = useSelector((state) => state.rootReducer);
    const [collapsed, setCollapsed] = useState(false);
    const isLoggedIn = localStorage.getItem("auth");

    const toggle = () => setCollapsed(!collapsed);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <Layout>
            <style>{`
                @keyframes fadeSlideIn {
                    from { opacity: 0; transform: translateX(-16px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes contentFade {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                /* Sider */
                .jauter-sider {
                    background: #111111 !important;
                    box-shadow: 2px 0 16px rgba(0,0,0,0.2);
                }
                .jauter-sider .ant-layout-sider-children {
                    background: transparent;
                    display: flex;
                    flex-direction: column;
                }
                .jauter-sider .ant-menu {
                    background: transparent !important;
                    border: none !important;
                    padding: 0 8px;
                }
                .jauter-sider .ant-menu-item {
                    color: #aaaaaa !important;
                    border-radius: 12px !important;
                    margin: 3px 0 !important;
                    font-weight: 600;
                    transition: all 0.2s ease !important;
                    animation: fadeSlideIn 0.3s ease;
                }
                .jauter-sider .ant-menu-item:hover {
                    background-color: #1e1e1e !important;
                    color: #c8f000 !important;
                    transform: translateX(4px);
                }
                .jauter-sider .ant-menu-item-selected {
                    background-color: #c8f000 !important;
                    color: #111 !important;
                }
                .jauter-sider .ant-menu-item-selected .anticon {
                    color: #111 !important;
                }
                .jauter-sider .ant-menu-item a {
                    color: inherit !important;
                }
                .jauter-sider .ant-layout-sider-trigger {
                    background: #1e1e1e !important;
                    color: #c8f000 !important;
                    border-top: 1px solid #2a2a2a;
                }

                /* Sider logo */
                .jauter-sider-logo {
                    text-align: center;
                    padding: 20px 12px 16px;
                    border-bottom: 1px solid #2a2a2a;
                    margin-bottom: 8px;
                }
                .jauter-sider-logo-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: #c8f000;
                    border-radius: 50px;
                    padding: 8px 16px;
                    font-size: 14px;
                    font-weight: 900;
                    color: #111;
                    letter-spacing: -0.3px;
                }
                .jauter-sider-logo-dot {
                    width: 10px;
                    height: 10px;
                    background: #111;
                    border-radius: 50%;
                    flex-shrink: 0;
                }
                .jauter-sider-logo-collapsed {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    background: #c8f000;
                    border-radius: 50%;
                    width: 36px;
                    height: 36px;
                    font-size: 13px;
                    font-weight: 900;
                    color: #111;
                }

                /* Sider footer */
                .jauter-sider-footer {
                    margin-top: auto;
                    padding: 12px;
                    text-align: center;
                    font-size: 11px;
                    color: #555;
                    border-top: 1px solid #2a2a2a;
                }
                .jauter-sider-footer a {
                    color: #c8f000;
                    text-decoration: none;
                    font-weight: 600;
                }
                .jauter-sider-footer a:hover {
                    text-decoration: underline;
                }

                /* Header */
                .jauter-layout-header {
                    background: #f0f0f0 !important;
                    border-bottom: 1px solid #e0e0e0;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 16px !important;
                    box-shadow: none;
                }
                .jauter-trigger {
                    font-size: 18px;
                    color: #111;
                    cursor: pointer;
                    padding: 8px;
                    border-radius: 10px;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                }
                .jauter-trigger:hover {
                    background: #e0e0e0;
                    color: #111;
                }
                .jauter-cart-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: #111;
                    color: #c8f000;
                    border-radius: 50px;
                    padding: 6px 14px;
                    cursor: pointer;
                    font-weight: 700;
                    font-size: 14px;
                    transition: all 0.2s ease;
                    position: relative;
                }
                .jauter-cart-wrapper:hover {
                    background: #222;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                }
                .jauter-cart-wrapper .anticon {
                    font-size: 18px;
                    color: #c8f000 !important;
                }
                .jauter-cart-count {
                    background: #c8f000;
                    color: #111;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 11px;
                    font-weight: 800;
                    flex-shrink: 0;
                }

                /* Content */
                .jauter-content {
                    background: #f0f0f0 !important;
                    margin: 16px !important;
                    padding: 24px !important;
                    border-radius: 20px !important;
                    min-height: 280px;
                    animation: contentFade 0.4s ease;
                }

                @media (max-width: 768px) {
                    .jauter-content { margin: 8px !important; padding: 14px !important; }
                }
                @media (max-width: 480px) {
                    .jauter-content { margin: 6px !important; padding: 10px !important; border-radius: 14px !important; }
                }
            `}</style>

            {loading && <Spinner />}

            {isLoggedIn && (
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    className="jauter-sider"
                    breakpoint="md"
                    collapsedWidth={80}
                >
                    <div className="jauter-sider-logo">
                        {!collapsed ? (
                            <div className="jauter-sider-logo-pill">
                                <span className="jauter-sider-logo-dot" />
                                Vridhi Autos
                            </div>
                        ) : (
                            <div className="jauter-sider-logo-collapsed">VA</div>
                        )}
                    </div>

                    <Menu mode="inline" defaultSelectedKeys={[window.location.pathname]}>
                        <Menu.Item key="/" icon={<HomeOutlined />}><Link to="/">Home</Link></Menu.Item>
                        <Menu.Item key="/bills" icon={<CopyOutlined />}><Link to="/bills">Bills</Link></Menu.Item>
                        <Menu.Item key="/items" icon={<UnorderedListOutlined />}><Link to="/items">Items</Link></Menu.Item>
                        <Menu.Item key="/customers" icon={<UserOutlined />}><Link to="/customers">Customers</Link></Menu.Item>
                        <Menu.Item key="/dev" icon={<GithubOutlined />}>
                            <a href="https://github.com/ishanaudichya/business-erp-mern" target="_blank" rel="noopener noreferrer">
                                Git Repo
                            </a>
                        </Menu.Item>
                        <Menu.Item key="/logout" icon={<LogoutOutlined />}
                            onClick={() => { localStorage.removeItem("auth"); navigate("/login"); }}>
                            Logout
                        </Menu.Item>
                    </Menu>

                    <div className="jauter-sider-footer">
                        {!collapsed && (<>Under ESPL<br /></>)}
                        <a href="https://ishanaudichya.netlify.app/">
                            {collapsed ? "IA" : "Ishan Audichya"}
                        </a>
                    </div>
                </Sider>
            )}

            <Layout className="site-layout">
                <Header className="jauter-layout-header">
                    {isLoggedIn && (
                        React.createElement(
                            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                            { className: "jauter-trigger", onClick: toggle }
                        )
                    )}
                    <div className="jauter-cart-wrapper" onClick={() => navigate("/cart")}>
                        <ShoppingCartOutlined />
                        Cart
                        {cartItems.length > 0 && (
                            <span className="jauter-cart-count">{cartItems.length}</span>
                        )}
                    </div>
                </Header>

                <Content className="jauter-content">
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default DefaultLayout;