const nodemailer = require("nodemailer");

// Create email transporter (you'll need to configure these environment variables)
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify transporter connectivity on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("Email transporter error:", error);
  } else {
    console.log("Email service is ready to send messages");
  }
});

// Generate HTML email template for order confirmation
const generateOrderEmailHTML = (orderData) => {
  const { customerName, cartItems, subTotal, totalAmount } = orderData;

  const itemsHTML = cartItems
    .map(
      (item, index) => `
    <tr style="border-bottom: 1px solid #e0e0e0; padding: 12px 0;">
      <td style="padding: 12px; text-align: left;">${item.name || "Item"}</td>
      <td style="padding: 12px; text-align: center;">₹${(item.price || 0).toFixed(2)}</td>
      <td style="padding: 12px; text-align: center;">${item.quantity || 1}</td>
      <td style="padding: 12px; text-align: right;">₹${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</td>
    </tr>
  `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Arial', sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; background: #f5f5f5; }
          .header { background: linear-gradient(135deg, #c8f000 0%, #b8e000 100%); padding: 30px; text-align: center; }
          .header h1 { margin: 0; color: #111; font-size: 28px; }
          .content { background: white; padding: 30px; }
          .order-details { margin: 20px 0; }
          .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .items-table th { background: #f0f0f0; padding: 12px; text-align: left; font-weight: bold; color: #111; }
          .total-row { font-weight: bold; font-size: 16px; }
          .footer { background: #111; color: #c8f000; padding: 20px; text-align: center; font-size: 12px; }
          .highlight { color: #c8f000; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚗 Vridhi Autos</h1>
            <p style="margin: 10px 0; color: #666;">Order Confirmation</p>
          </div>

          <div class="content">
            <h2 style="color: #111;">Hi ${customerName},</h2>
            <p>Thank you for your order! We've received your order and are processing it. Below is a summary of your purchase:</p>

            <div class="order-details">
              <h3 style="color: #111; border-bottom: 2px solid #c8f000; padding-bottom: 10px;">Order Summary</h3>
              
              <table class="items-table">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th style="text-align: center;">Price</th>
                    <th style="text-align: center;">Quantity</th>
                    <th style="text-align: right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHTML}
                </tbody>
              </table>

              <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #c8f000; margin-top: 20px;">
                <p style="margin: 8px 0;"><strong>Subtotal:</strong> <span style="float: right;">₹${Number(subTotal).toFixed(2)}</span></p>
                <p style="margin: 8px 0; font-size: 16px;" class="total-row"><strong>Total Amount:</strong> <span style="float: right; color: #c8f000;">₹${Number(totalAmount).toFixed(2)}</span></p>
              </div>
            </div>

            <p style="margin-top: 20px; color: #666; font-size: 14px;">
              If you have any questions about your order, please don't hesitate to contact us at <strong>+91 98765 43210</strong> or reply to this email.
            </p>
          </div>

          <div class="footer">
            <p style="margin: 0;">Vridhi Autos © 2024</p>
            <p style="margin: 5px 0; font-size: 11px;">Your Trusted Auto Parts Solutions</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Send order confirmation email
const sendOrderConfirmationEmail = async (orderData) => {
  try {
    if (!orderData.customerEmail) {
      console.warn("No customer email provided for order confirmation");
      return { success: false, message: "No customer email provided" };
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: orderData.customerEmail,
      subject: `Order Confirmation - Vridhi Autos | ₹${Number(orderData.totalAmount).toFixed(2)}`,
      html: generateOrderEmailHTML(orderData),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Order confirmation email sent to customer:", orderData.customerEmail);
    return { success: true, message: "Customer email sent successfully" };
  } catch (error) {
    console.error("❌ Error sending customer email:", error.message);
    return { success: false, message: error.message };
  }
};

// Send admin notification email
const sendAdminNotificationEmail = async (orderData) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

    const itemsHTML = orderData.cartItems
      .map(
        (item) => `
    <tr style="border-bottom: 1px solid #e0e0e0;">
      <td style="padding: 12px;">${item.name || "Item"}</td>
      <td style="padding: 12px; text-align: center;">₹${(item.price || 0).toFixed(2)}</td>
      <td style="padding: 12px; text-align: center;">${item.quantity || 1}</td>
      <td style="padding: 12px; text-align: right;">₹${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</td>
    </tr>
  `
      )
      .join("");

    const adminHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Arial', sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; background: #f5f5f5; }
          .header { background: linear-gradient(135deg, #c8f000 0%, #b8e000 100%); padding: 30px; text-align: center; }
          .header h1 { margin: 0; color: #111; font-size: 28px; }
          .content { background: white; padding: 30px; }
          .order-details { margin: 20px 0; }
          .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .items-table th { background: #f0f0f0; padding: 12px; text-align: left; font-weight: bold; color: #111; }
          .footer { background: #111; color: #c8f000; padding: 20px; text-align: center; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚗 Vridhi Autos - New Order Received</h1>
          </div>

          <div class="content">
            <h2 style="color: #111; border-bottom: 2px solid #c8f000; padding-bottom: 10px;">New Order Alert</h2>
            
            <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #c8f000; margin: 20px 0;">
              <p style="margin: 8px 0;"><strong>Customer Name:</strong> ${orderData.customerName}</p>
              <p style="margin: 8px 0;"><strong>Organization:</strong> ${orderData.organizationName || "N/A"}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> ${orderData.customerEmail}</p>
              <p style="margin: 8px 0;"><strong>Phone:</strong> ${orderData.customerNumber}</p>
              <p style="margin: 8px 0;"><strong>Payment Mode:</strong> ${(orderData.paymentMode || "Not specified").toUpperCase()}</p>
            </div>

            <h3 style="color: #111; border-bottom: 2px solid #c8f000; padding-bottom: 10px;">Order Items</h3>
            
            <table class="items-table">
              <thead>
                <tr style="background: #f0f0f0;">
                  <th>Item Name</th>
                  <th style="text-align: center;">Price</th>
                  <th style="text-align: center;">Qty</th>
                  <th style="text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
              </tbody>
            </table>

            <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #c8f000; margin-top: 20px;">
              <p style="margin: 8px 0;"><strong>Subtotal:</strong> <span style="float: right;">₹${Number(orderData.subTotal).toFixed(2)}</span></p>
              <p style="margin: 8px 0;"><strong>Tax:</strong> <span style="float: right;">₹${Number(orderData.tax || 0).toFixed(2)}</span></p>
              <p style="margin: 8px 0; font-size: 16px; color: #c8f000;"><strong>Total Amount:</strong> <span style="float: right;">₹${Number(orderData.totalAmount).toFixed(2)}</span></p>
            </div>

            <p style="margin-top: 20px; color: #666; font-size: 14px;">
              <strong>Order Date:</strong> ${new Date(orderData.date).toLocaleString('en-IN')}
            </p>
          </div>

          <div class="footer">
            <p style="margin: 0;">Vridhi Autos © 2024</p>
          </div>
        </div>
      </body>
    </html>
  `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: `[NEW ORDER] ${orderData.customerName} - ₹${Number(orderData.totalAmount).toFixed(2)}`,
      html: adminHTML,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Admin notification email sent to:", adminEmail);
    return { success: true, message: "Admin notification sent successfully" };
  } catch (error) {
    console.error("❌ Error sending admin email:", error.message);
    return { success: false, message: error.message };
  }
};

module.exports = {
  sendOrderConfirmationEmail,
  sendAdminNotificationEmail,
};
