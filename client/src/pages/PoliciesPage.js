import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import DefaultLayout from "./../components/DefaultLayout";
import "../styles/PoliciesPage.css";

const PoliciesPage = () => {
    const location = useLocation();

    useEffect(() => {
        // Handle anchor navigation
        if (location.hash) {
            const id = location.hash.replace("#", "");
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        }
    }, [location.hash]);

    return (
        <>
            <DefaultLayout>
                <style>{`
          .policies-wrapper {
            background: #f0f0f0 !important;
            min-height: 100vh !important;
            padding: 0 0 40px 0 !important;
            font-family: 'Inter', sans-serif !important;
          }

          .policies-container {
            max-width: 900px !important;
            margin: 0 auto !important;
            padding: 40px 24px !important;
          }

          .policies-header {
            text-align: center !important;
            margin-bottom: 48px !important;
            padding: 40px 24px !important;
            background: linear-gradient(135deg, #7c3aed 0%, #c8f000 100%) !important;
            border-radius: 20px !important;
            color: white !important;
          }

          .policies-title {
            font-size: clamp(28px, 6vw, 40px) !important;
            font-weight: 900 !important;
            margin: 0 0 10px 0 !important;
            color: white !important;
          }

          .policies-subtitle {
            font-size: clamp(14px, 3vw, 16px) !important;
            color: rgba(255,255,255,0.9) !important;
            margin: 0 !important;
          }

          /* Table of Contents */
          .policies-toc {
            background: white !important;
            border-radius: 16px !important;
            padding: 24px !important;
            margin-bottom: 32px !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important;
            border-left: 4px solid #c8f000 !important;
          }

          .policies-toc-title {
            font-size: 16px !important;
            font-weight: 700 !important;
            color: #111 !important;
            margin: 0 0 16px 0 !important;
            padding-bottom: 12px !important;
            border-bottom: 2px solid #f0f0f0 !important;
          }

          .policies-toc-list {
            list-style: none !important;
            margin: 0 !important;
            padding: 0 !important;
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
            gap: 12px !important;
          }

          .policies-toc-item a {
            display: inline-block !important;
            padding: 10px 16px !important;
            background: #f5f5f5 !important;
            border-radius: 8px !important;
            color: #7c3aed !important;
            text-decoration: none !important;
            font-weight: 600 !important;
            font-size: 13px !important;
            transition: all 0.3s ease !important;
          }

          .policies-toc-item a:hover {
            background: #c8f000 !important;
            color: #111 !important;
            transform: translateX(4px) !important;
          }

          /* Policy Section */
          .policy-section {
            background: white !important;
            border-radius: 16px !important;
            padding: 32px !important;
            margin-bottom: 24px !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important;
            scroll-margin-top: 100px !important;
          }

          .policy-section-title {
            font-size: clamp(20px, 5vw, 28px) !important;
            font-weight: 900 !important;
            color: #111 !important;
            margin: 0 0 20px 0 !important;
            padding-bottom: 16px !important;
            border-bottom: 3px solid #c8f000 !important;
            display: flex !important;
            align-items: center !important;
            gap: 12px !important;
          }

          .policy-section-icon {
            font-size: 28px !important;
          }

          .policy-content {
            color: #444 !important;
            line-height: 1.8 !important;
            font-size: 14px !important;
          }

          .policy-content h3 {
            font-size: 16px !important;
            font-weight: 700 !important;
            color: #222 !important;
            margin: 20px 0 12px 0 !important;
          }

          .policy-content p {
            margin: 12px 0 !important;
            color: #555 !important;
          }

          .policy-content ul,
          .policy-content ol {
            margin: 16px 0 !important;
            padding-left: 24px !important;
          }

          .policy-content li {
            margin: 8px 0 !important;
            color: #555 !important;
          }

          .policy-content li strong {
            color: #222 !important;
          }

          /* Back to Top Button */
          .policies-back-to-top {
            position: fixed !important;
            bottom: 30px !important;
            right: 30px !important;
            width: 50px !important;
            height: 50px !important;
            background: #c8f000 !important;
            border: none !important;
            border-radius: 50% !important;
            cursor: pointer !important;
            font-size: 20px !important;
            display: none !important;
            align-items: center !important;
            justify-content: center !important;
            box-shadow: 0 4px 12px rgba(200,240,0,0.3) !important;
            transition: all 0.3s ease !important;
            z-index: 100 !important;
          }

          .policies-back-to-top.show {
            display: flex !important;
          }

          .policies-back-to-top:hover {
            background: #7c3aed !important;
            color: white !important;
            transform: translateY(-4px) !important;
            box-shadow: 0 8px 20px rgba(124,58,237,0.4) !important;
          }

          /* Responsive */
          @media (max-width: 768px) {
            .policies-container {
              padding: 24px 16px !important;
            }

            .policies-header {
              padding: 30px 20px !important;
              margin-bottom: 32px !important;
            }

            .policies-title {
              font-size: clamp(24px, 5vw, 32px) !important;
              margin-bottom: 8px !important;
            }

            .policy-section {
              padding: 24px !important;
              margin-bottom: 20px !important;
            }

            .policy-section-title {
              font-size: clamp(18px, 4vw, 24px) !important;
              margin-bottom: 16px !important;
            }

            .policies-toc-list {
              grid-template-columns: 1fr !important;
            }

            .policies-back-to-top {
              bottom: 20px !important;
              right: 20px !important;
              width: 45px !important;
              height: 45px !important;
              font-size: 18px !important;
            }
          }

          @media (max-width: 480px) {
            .policies-container {
              padding: 16px 12px !important;
            }

            .policies-header {
              padding: 24px 16px !important;
              margin-bottom: 24px !important;
            }

            .policy-section {
              padding: 20px !important;
              border-radius: 12px !important;
            }

            .policy-content {
              font-size: 13px !important;
            }

            .policy-section-title {
              font-size: 18px !important;
              margin-bottom: 12px !important;
              gap: 8px !important;
            }

            .policy-section-icon {
              font-size: 24px !important;
            }

            .policies-back-to-top {
              bottom: 16px !important;
              right: 16px !important;
              width: 40px !important;
              height: 40px !important;
              font-size: 16px !important;
            }
          }
        `}</style>

                <div className="policies-wrapper">
                    {/* Header */}
                    <div className="policies-header">
                        <h1 className="policies-title">Our Policies</h1>
                        <p className="policies-subtitle">
                            Important information about how we conduct business
                        </p>
                    </div>

                    <div className="policies-container">
                        {/* Table of Contents */}
                        <div className="policies-toc">
                            <h2 className="policies-toc-title">Quick Navigation</h2>
                            <ul className="policies-toc-list">
                                <li className="policies-toc-item">
                                    <a href="#privacy">🔒 Privacy Policy</a>
                                </li>
                                <li className="policies-toc-item">
                                    <a href="#terms">📋 Terms & Conditions</a>
                                </li>
                                <li className="policies-toc-item">
                                    <a href="#refund">💰 Refund Policy</a>
                                </li>
                                <li className="policies-toc-item">
                                    <a href="#shipping">📦 Shipping Policy</a>
                                </li>
                                <li className="policies-toc-item">
                                    <a href="#return">🔄 Return Policy</a>
                                </li>
                            </ul>
                        </div>

                        {/* Privacy Policy */}
                        <div id="privacy" className="policy-section">
                            <h2 className="policy-section-title">
                                <span className="policy-section-icon">🔒</span>
                                Privacy Policy
                            </h2>
                            <div className="policy-content">
                                <p>
                                    At Vridhi Autos, we are committed to protecting your privacy. This Privacy Policy
                                    explains how we collect, use, disclose, and safeguard your information when you visit
                                    our website and use our services.
                                </p>

                                <h3>Information We Collect</h3>
                                <p>
                                    We may collect information about you in a variety of ways. The information we may
                                    collect on the site includes:
                                </p>
                                <ul>
                                    <li>
                                        <strong>Personal Data:</strong> Name, email address, phone number, address, and
                                        payment information when you make a purchase or contact us.
                                    </li>
                                    <li>
                                        <strong>Usage Data:</strong> Browser type, IP address, pages visited, and time spent
                                        on pages.
                                    </li>
                                    <li>
                                        <strong>Device Data:</strong> Device type, operating system, and unique device
                                        identifiers.
                                    </li>
                                </ul>

                                <h3>How We Use Your Information</h3>
                                <p>Vridhi Autos uses the collected information for various purposes:</p>
                                <ul>
                                    <li>To provide and maintain our services</li>
                                    <li>To process your transactions and send associated information</li>
                                    <li>To email regarding your order, product updates, and promotional materials</li>
                                    <li>To improve our website and services</li>
                                    <li>To monitor and analyze trends, usage, and activities</li>
                                </ul>

                                <h3>Data Security</h3>
                                <p>
                                    We use administrative, technical, and physical security measures to protect your
                                    personal information. However, no security system is impenetrable, and we cannot
                                    guarantee absolute security.
                                </p>

                                <h3>Contact Us</h3>
                                <p>
                                    If you have questions about this Privacy Policy, please contact us at{" "}
                                    <strong>support@vridhi-autos.com</strong> or call <strong>+91 9876543210</strong>.
                                </p>
                            </div>
                        </div>

                        {/* Terms & Conditions */}
                        <div id="terms" className="policy-section">
                            <h2 className="policy-section-title">
                                <span className="policy-section-icon">📋</span>
                                Terms & Conditions
                            </h2>
                            <div className="policy-content">
                                <p>
                                    These Terms and Conditions govern your access to and use of the Vridhi Autos website
                                    and services. By accessing and using this website, you accept these terms and
                                    conditions.
                                </p>

                                <h3>Use License</h3>
                                <p>
                                    Permission is granted to temporarily download one copy of the materials (information
                                    or software) on Vridhi Autos's website for personal, non-commercial transitory viewing
                                    only. This is the grant of a license, not a transfer of title, and under this license
                                    you may not:
                                </p>
                                <ul>
                                    <li>Modify or copy the materials</li>
                                    <li>Use the materials for any commercial purpose or for any public display</li>
                                    <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                                    <li>
                                        Transfer the materials to another person or "mirror" the materials on any other
                                        server
                                    </li>
                                    <li>Attempt to gain unauthorized access to any portion or feature of the website</li>
                                </ul>

                                <h3>Disclaimer</h3>
                                <p>
                                    The materials on Vridhi Autos's website are provided on an 'as is' basis. Vridhi
                                    Autos makes no warranties, expressed or implied, and hereby disclaims and negates all
                                    other warranties including, without limitation, implied warranties or conditions of
                                    merchantability, fitness for a particular purpose, or non-infringement of intellectual
                                    property or other violation of rights.
                                </p>

                                <h3>Limitations</h3>
                                <p>
                                    In no event shall Vridhi Autos or its suppliers be liable for any damages (including,
                                    without limitation, damages for loss of data or profit, or due to business
                                    interruption) arising out of the use of the Vridhi Autos website.
                                </p>

                                <h3>Accuracy of Materials</h3>
                                <p>
                                    The materials appearing on Vridhi Autos's website could include technical,
                                    typographical, or photographic errors. Vridhi Autos does not warrant that any of the
                                    materials on the website are accurate, complete, or current.
                                </p>
                            </div>
                        </div>

                        {/* Refund Policy */}
                        <div id="refund" className="policy-section">
                            <h2 className="policy-section-title">
                                <span className="policy-section-icon">💰</span>
                                Refund Policy
                            </h2>
                            <div className="policy-content">
                                <p>
                                    At Vridhi Autos, customer satisfaction is our priority. We offer a comprehensive
                                    refund policy to ensure you have peace of mind when shopping with us.
                                </p>

                                <h3>General Return/Refund Terms</h3>
                                <ul>
                                    <li>Refund requests must be made within 30 days of purchase</li>
                                    <li>Items must be unused and in original condition</li>
                                    <li>Product packaging must be intact and undamaged</li>
                                    <li>Original proof of purchase (receipt/invoice) must be provided</li>
                                </ul>

                                <h3>Eligibility</h3>
                                <p>You are eligible for a refund if:</p>
                                <ul>
                                    <li>The product was defective or damaged upon delivery</li>
                                    <li>The product does not match the description provided</li>
                                    <li>You received the wrong item</li>
                                    <li>The product is incompatible with your vehicle (if applicable)</li>
                                </ul>

                                <h3>Non-Refundable Items</h3>
                                <p>The following items are generally non-refundable:</p>
                                <ul>
                                    <li>Customized or personalized products</li>
                                    <li>Items that have been used or installed</li>
                                    <li>Items without original packaging or documentation</li>
                                </ul>

                                <h3>Refund Processing</h3>
                                <p>
                                    Once your refund request is approved, we will provide you with a return shipping
                                    label. Please ship the item back to us within 14 days. Refunds are typically processed
                                    within 5-7 business days after we receive and inspect the item.
                                </p>

                                <h3>Refund Methods</h3>
                                <p>
                                    Refunds will be issued to the original payment method used for the purchase. Please
                                    note that depending on your financial institution, it may take additional time for the
                                    refund to appear in your account.
                                </p>
                            </div>
                        </div>

                        {/* Shipping Policy */}
                        <div id="shipping" className="policy-section">
                            <h2 className="policy-section-title">
                                <span className="policy-section-icon">📦</span>
                                Shipping Policy
                            </h2>
                            <div className="policy-content">
                                <p>
                                    We are committed to delivering your orders quickly and safely. This Shipping Policy
                                    outlines how we handle the delivery of your purchases.
                                </p>

                                <h3>Shipping Locations</h3>
                                <p>
                                    We currently ship to all locations within India. International shipping may be
                                    available for select products. Please contact us for international shipping inquiries.
                                </p>

                                <h3>Shipping Speed</h3>
                                <ul>
                                    <li>
                                        <strong>Standard Shipping:</strong> 5-7 business days
                                    </li>
                                    <li>
                                        <strong>Express Shipping:</strong> 2-3 business days
                                    </li>
                                    <li>
                                        <strong>Overnight Shipping:</strong> 1 business day (select areas)
                                    </li>
                                </ul>

                                <h3>Shipping Costs</h3>
                                <p>
                                    Shipping costs are calculated based on order value, weight, and delivery location.
                                    Free shipping is available on orders above ₹5,000. You will see the exact shipping
                                    cost during checkout before confirming your purchase.
                                </p>

                                <h3>Order Tracking</h3>
                                <p>
                                    Once your order is shipped, you will receive a tracking number via email. You can use
                                    this number to track your package in real-time on our website or the courier's
                                    website.
                                </p>

                                <h3>Damaged or Lost Orders</h3>
                                <p>
                                    If your order arrives damaged or is lost in transit, please contact us immediately
                                    with photographic evidence. We will either send a replacement at no charge or issue a
                                    full refund.
                                </p>

                                <h3>Delivery Address</h3>
                                <p>
                                    Please ensure your delivery address is complete and accurate. We are not responsible
                                    for packages delivered to incorrect addresses provided by the customer.
                                </p>
                            </div>
                        </div>

                        {/* Return Policy */}
                        <div id="return" className="policy-section">
                            <h2 className="policy-section-title">
                                <span className="policy-section-icon">🔄</span>
                                Return Policy
                            </h2>
                            <div className="policy-content">
                                <p>
                                    We want you to be completely satisfied with your purchase. If for any reason you are
                                    not happy with your item, we offer a hassle-free return process.
                                </p>

                                <h3>Return Eligibility</h3>
                                <p>Items can be returned if they meet the following criteria:</p>
                                <ul>
                                    <li>The product is returned within 30 days of purchase</li>
                                    <li>The product is unused and in its original condition</li>
                                    <li>The product is in its original packaging with all accessories</li>
                                    <li>The product has no signs of wear or damage</li>
                                    <li>A valid proof of purchase is provided</li>
                                </ul>

                                <h3>How to Initiate a Return</h3>
                                <ol>
                                    <li>Contact our customer service team at support@vridhi-autos.com</li>
                                    <li>Provide your order number and reason for return</li>
                                    <li>We will provide you with a Return Authorization (RA) number</li>
                                    <li>
                                        Pack the item securely and clearly mark the RA number on the package
                                    </li>
                                    <li>Ship the package to us using the provided return label</li>
                                </ol>

                                <h3>Return Shipping</h3>
                                <p>
                                    For defective or damaged items, we cover the return shipping cost. For other returns,
                                    customers are responsible for return shipping costs. You can use any courier service,
                                    but we recommend using a trackable method.
                                </p>

                                <h3>Inspection and Processing</h3>
                                <p>
                                    Upon receiving your return, we will inspect the item within 3-5 business days. If the
                                    item meets our return criteria, we will initiate the refund. If the item does not meet
                                    the criteria, we will contact you to discuss options.
                                </p>

                                <h3>Restocking Fee</h3>
                                <p>
                                    A restocking fee of up to 10% may be applied for items that are not returned in
                                    original condition, have missing parts, or show signs of use.
                                </p>

                                <h3>Special Items</h3>
                                <p>
                                    The following items cannot be returned unless defective:
                                </p>
                                <ul>
                                    <li>Customized or made-to-order items</li>
                                    <li>Items that have been installed on a vehicle</li>
                                    <li>Clearance or final sale items</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>

            {/* Back to Top Button */}
            <button
                className="policies-back-to-top"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
                ↑
            </button>

            <script>{`
        // Show/hide back to top button
        window.addEventListener('scroll', function() {
          const btn = document.querySelector('.policies-back-to-top');
          if (window.pageYOffset > 300) {
            btn.classList.add('show');
          } else {
            btn.classList.remove('show');
          }
        });
      `}</script>
        </>
    );
};

export default PoliciesPage;
