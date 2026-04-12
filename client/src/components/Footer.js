import React from "react";
import { useNavigate } from "react-router-dom";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";

const Footer = () => {
    const navigate = useNavigate();

    const footerLinks = [
        {
            title: "Help & Support",
            links: [
                { label: "Contact Us", path: "/contact" },
                { label: "FAQ", action: "faq" },
            ],
        },
        {
            title: "Policies",
            links: [
                { label: "Privacy Policy", path: "/policies#privacy" },
                { label: "Terms & Conditions", path: "/policies#terms" },
                { label: "Refund Policy", path: "/policies#refund" },
                { label: "Shipping Policy", path: "/policies#shipping" },
                { label: "Return Policy", path: "/policies#return" },
            ],
        },
        {
            title: "Company",
            links: [
                { label: "About Us", action: "about" },
                { label: "Blog", action: "blog" },
            ],
        },
    ];

    const handleLinkClick = (path, action) => {
        if (path) {
            navigate(path);
        } else {
            console.log(`Navigate to ${action}`);
            alert(`${action.charAt(0).toUpperCase() + action.slice(1)} page - Coming soon!`);
        }
    };

    return (
        <footer style={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
            borderTop: "3px solid #c8f000",
            marginTop: "60px",
            width: "100%",
            boxSizing: "border-box",
            fontFamily: "'Inter', sans-serif",
        }}>
            <style>{`
                /* ── FOOTER MAIN BODY ── */
                .va-footer-body {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 36px 32px 24px;
                    display: flex;
                    gap: 48px;
                    align-items: flex-start;
                }

                /* Left: logo block */
                .va-footer-brand {
                    flex: 0 0 220px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .va-footer-logo {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .va-footer-logo-icon {
                    width: 36px;
                    height: 36px;
                    background: #c8f000;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                    font-weight: 900;
                    color: #111;
                    flex-shrink: 0;
                }
                .va-footer-logo-name {
                    font-size: 17px;
                    font-weight: 800;
                    color: #fff;
                    letter-spacing: -0.3px;
                }
                .va-footer-tagline {
                    font-size: 13px;
                    color: #aaa;
                    line-height: 1.55;
                    margin: 0;
                }
                /* Contact items under tagline */
                .va-footer-contacts {
                    display: flex;
                    flex-direction: column;
                    gap: 7px;
                    margin-top: 4px;
                }
                .va-footer-contact-item {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    color: #bbb;
                    font-size: 12px;
                    text-decoration: none;
                    transition: color 0.2s;
                }
                .va-footer-contact-item:hover { color: #c8f000; }
                .va-footer-contact-item .anticon {
                    color: #c8f000;
                    font-size: 13px;
                    flex-shrink: 0;
                }
                /* Socials row */
                .va-footer-socials {
                    display: flex;
                    gap: 10px;
                    margin-top: 4px;
                }
                .va-footer-social-btn {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: rgba(200,240,0,0.12);
                    border: 1px solid rgba(200,240,0,0.3);
                    color: #c8f000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 13px;
                    font-weight: 700;
                    text-decoration: none;
                    transition: all 0.2s ease;
                    cursor: pointer;
                }
                .va-footer-social-btn:hover {
                    background: #c8f000;
                    color: #1a1a2e;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(200,240,0,0.25);
                }

                /* Right: link columns */
                .va-footer-links {
                    flex: 1;
                    display: flex;
                    gap: 0;
                    justify-content: flex-end;
                }
                .va-footer-col {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    padding-left: 24px;
                }
                .va-footer-col-title {
                    font-size: 13px;
                    font-weight: 700;
                    color: #fff;
                    margin: 0 0 4px;
                    letter-spacing: 0.2px;
                }
                .va-footer-col-list {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                .va-footer-col-btn {
                    background: none;
                    border: none;
                    color: #aaa;
                    font-size: 13px;
                    cursor: pointer;
                    padding: 0;
                    text-align: left;
                    font-family: inherit;
                    transition: color 0.2s;
                    line-height: 1.4;
                }
                .va-footer-col-btn:hover { color: #c8f000; }

                /* ── BOTTOM BAR ── */
                .va-footer-bottom {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 14px 32px;
                    border-top: 1px solid rgba(200,240,0,0.15);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 12px;
                    flex-wrap: wrap;
                }
                .va-footer-copy {
                    font-size: 12px;
                    color: #777;
                    margin: 0;
                }
                .va-footer-policy-links {
                    display: flex;
                    gap: 20px;
                    flex-wrap: wrap;
                }
                .va-footer-policy-btn {
                    background: none;
                    border: none;
                    color: #888;
                    font-size: 12px;
                    cursor: pointer;
                    padding: 0;
                    font-family: inherit;
                    text-decoration: underline;
                    text-underline-offset: 3px;
                    transition: color 0.2s;
                }
                .va-footer-policy-btn:hover { color: #c8f000; }

                /* ── RESPONSIVE ── */
                @media (max-width: 768px) {
                    .va-footer-body {
                        flex-direction: column;
                        gap: 28px;
                        padding: 28px 20px 20px;
                    }
                    .va-footer-brand { flex: none; width: 100%; }
                    .va-footer-links {
                        width: 100%;
                        justify-content: flex-start;
                        gap: 0;
                    }
                    .va-footer-col { padding-left: 0; padding-right: 16px; }
                    .va-footer-bottom { padding: 12px 20px; }
                    .va-footer-policy-links { gap: 14px; }
                }

                @media (max-width: 480px) {
                    .va-footer-body { padding: 22px 16px 16px; gap: 22px; }
                    .va-footer-links { flex-wrap: wrap; gap: 18px 0; }
                    .va-footer-col {
                        flex: 0 0 50%;
                        padding-left: 0;
                        padding-right: 12px;
                    }
                    .va-footer-col-title { font-size: 12px; }
                    .va-footer-col-btn { font-size: 12px; }
                    .va-footer-bottom {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 8px;
                        padding: 12px 16px;
                    }
                    .va-footer-policy-links { gap: 12px; }
                    .va-footer-copy { font-size: 11px; }
                    .va-footer-policy-btn { font-size: 11px; }
                }

                @media (max-width: 360px) {
                    .va-footer-col { flex: 0 0 100%; }
                    .va-footer-body { padding: 18px 14px 14px; }
                }

                @media (prefers-reduced-motion: reduce) {
                    .va-footer-social-btn,
                    .va-footer-col-btn,
                    .va-footer-contact-item { transition: none; }
                }
            `}</style>

            {/* ── MAIN BODY ── */}
            <div className="va-footer-body">

                {/* Brand / left column */}
                <div className="va-footer-brand">
                    <div className="va-footer-logo">
                        <div className="va-footer-logo-icon">🚗</div>
                        <span className="va-footer-logo-name">Vridhi Autos</span>
                    </div>
                    <p className="va-footer-tagline">
                        Premium car accessories with top-notch service and guaranteed quality.
                    </p>

                    {/* Contact details */}
                    <div className="va-footer-contacts">
                        <a href="tel:+919876543210" className="va-footer-contact-item">
                            <PhoneOutlined />
                            <span>+91 9876543210</span>
                        </a>
                        <a href="mailto:support@vridhi-autos.com" target="_blank" rel="noopener noreferrer" className="va-footer-contact-item">
                            <MailOutlined />
                            <span>support@vridhi-autos.com</span>
                        </a>
                        <a href="https://www.instagram.com/vridhi_autos/" target="_blank" rel="noopener noreferrer" className="va-footer-contact-item">
                            <span>📷 @vridhi_autos</span>
                        </a>
                        <div className="va-footer-contact-item">
                            <EnvironmentOutlined />
                            <span>Vridhi Autos, India</span>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="va-footer-socials">
                        <a href="#facebook" className="va-footer-social-btn" title="Facebook">f</a>
                        <a href="#twitter" className="va-footer-social-btn" title="Twitter">𝕏</a>
                        <a href="https://www.instagram.com/vridhi_autos/" target="_blank" rel="noopener noreferrer" className="va-footer-social-btn" title="Instagram">📷</a>
                    </div>
                </div>

                {/* Link columns / right side */}
                <div className="va-footer-links">
                    {footerLinks.map((section, idx) => (
                        <div key={idx} className="va-footer-col">
                            <p className="va-footer-col-title">{section.title}</p>
                            <ul className="va-footer-col-list">
                                {section.links.map((link, linkIdx) => (
                                    <li key={linkIdx}>
                                        <button
                                            className="va-footer-col-btn"
                                            onClick={() => handleLinkClick(link.path, link.action)}
                                        >
                                            {link.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── BOTTOM BAR ── */}
            <div className="va-footer-bottom">
                <p className="va-footer-copy">© 2026 Vridhi Autos. All rights reserved.</p>
                <div className="va-footer-policy-links">
                    <button className="va-footer-policy-btn" onClick={() => navigate("/policies#privacy")}>Privacy Policy</button>
                    <button className="va-footer-policy-btn" onClick={() => navigate("/policies#terms")}>Terms of Service</button>
                    <button className="va-footer-policy-btn" onClick={() => navigate("/policies#refund")}>Refund Policy</button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;