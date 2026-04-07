import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";
import "../styles/Navbar.css";

const Navbar = () => {
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
            // Handle other actions
            console.log(`Navigate to ${action}`);
            alert(`${action.charAt(0).toUpperCase() + action.slice(1)} page - Coming soon!`);
        }
    };

    return (
        <footer className="navbar-footer">
            <div className="navbar-container">
                {/* Links Section */}
                <div className="navbar-links-wrapper">
                    {footerLinks.map((section, idx) => (
                        <div key={idx} className="navbar-section">
                            <h4 className="navbar-section-title">{section.title}</h4>
                            <ul className="navbar-links-list">
                                {section.links.map((link, linkIdx) => (
                                    <li key={linkIdx}>
                                        <button
                                            className="navbar-link"
                                            onClick={() => handleLinkClick(link.path, link.action)}
                                        >
                                            {link.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Info Section */}
                    <div className="navbar-section">
                        <h4 className="navbar-section-title">Connect With Us</h4>
                        <div className="navbar-contact-info">
                            <a href="tel:+919876543210" className="navbar-contact-item">
                                <PhoneOutlined />
                                <span>+91 9876543210</span>
                            </a>
                            <a href="mailto:jainhardik750@gmail.com"
                                target="_blank" rel="noopener noreferrer"
                                className="navbar-contact-item">
                                <MailOutlined />
                                <span>support@vridhi-autos.com</span>
                            </a>
                            <a href="https://www.instagram.com/vridhi_autos/"
                                target="_blank" rel="noopener noreferrer" className="navbar-contact-item">
                                <span>📷 @vridhi_autos</span>
                            </a>
                            <div className="navbar-contact-item">
                                <EnvironmentOutlined />
                                <span>Vridhi Autos, India</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="navbar-divider"></div>

                {/* Bottom Section */}
                <div className="navbar-bottom">
                    <div className="navbar-copyright">
                        <p>&copy; 2026 Vridhi Autos. All rights reserved.</p>
                    </div>
                    <div className="navbar-socials">
                        <a href="#facebook" className="navbar-social-link" title="Facebook">
                            f
                        </a>
                        <a href="#twitter" className="navbar-social-link" title="Twitter">
                            𝕏
                        </a>
                        <a href="#instagram" className="navbar-social-link" title="Instagram">
                            📷
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Navbar;
