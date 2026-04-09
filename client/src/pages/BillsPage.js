import React, { useEffect, useState, useRef } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { Modal, Button, Table, message, Popconfirm } from "antd";
import "../styles/InvoiceStyles.css";

const BillsPage = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const getAllBills = async () => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/bills/get-bills`
      );
      // Sort bills by date in descending order (newest first)
      const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setBillsData(sortedData);
      dispatch({ type: "HIDE_LOADING" });
      console.log(sortedData);
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBills();
    //eslint-disable-next-line
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDeleteBill = async (billId) => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/bills/delete-bill/${billId}`
      );
      message.success("Bill deleted successfully");
      getAllBills();
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("Failed to delete bill");
      console.log(error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      ellipsis: true,
      width: 120,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      width: 140,
    },
    {
      title: "Organization",
      dataIndex: "organizationName",
      render: (text) => text || "-",
      width: 120,
    },
    {
      title: "Contact No",
      dataIndex: "customerNumber",
      width: 110,
    },
    {
      title: "Subtotal",
      dataIndex: "subTotal",
      render: (v) => `₹ ${v}`,
      width: 100,
    },
    {
      title: "Tax",
      dataIndex: "tax",
      render: (v) => `₹ ${v}`,
      width: 80,
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      render: (v) => <strong>₹ {v}</strong>,
      width: 100,
    },
    {
      title: "Order Date",
      dataIndex: "date",
      render: (date) => {
        if (!date) return "-";
        const orderDate = new Date(date);
        return orderDate.toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      },
      width: 110,
      sorter: (a, b) => new Date(b.date) - new Date(a.date),
      defaultSortOrder: "descend",
    },
    {
      title: "Actions",
      dataIndex: "_id",
      width: 90,
      render: (id, record) => (
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            className="bills-view-btn"
            onClick={() => {
              setSelectedBill(record);
              setPopupModal(true);
            }}
            title="View"
          >
            <EyeOutlined />
          </button>
          <Popconfirm
            title="Delete Bill"
            description="Are you sure you want to delete this bill?"
            onConfirm={() => handleDeleteBill(id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <button className="bills-delete-btn" title="Delete">
              <DeleteOutlined />
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <style>{`
        /* ===== JAUTER BILLS PAGE ===== */
        .bills-wrapper {
          background: #f0f0f0;
          min-height: 100vh;
          padding: 0 0 40px 0;
          font-family: 'Inter', sans-serif;
        }

        /* Page hero */
        .bills-hero {
          background: #111;
          border-radius: 24px;
          padding: 32px 24px;
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .bills-hero-left h1 {
          font-size: clamp(22px, 5vw, 32px);
          font-weight: 900;
          color: #c8f000;
          margin: 0 0 4px;
          line-height: 1.2;
        }
        .bills-hero-left p {
          color: #888;
          font-size: 14px;
          margin: 0;
        }
        .bills-hero-count {
          background: #c8f000;
          color: #111;
          border-radius: 20px;
          padding: 10px 20px;
          font-size: 15px;
          font-weight: 800;
          white-space: nowrap;
        }

        /* Table card */
        .bills-table-card {
          background: #fff;
          border-radius: 20px;
          overflow: auto;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        }
        .bills-table-card .ant-table {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          width: 100%;
        }
        .bills-table-card .ant-table-thead > tr > th {
          background: #f8f8f8 !important;
          font-weight: 800 !important;
          font-size: 12px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
          color: #555 !important;
          border-bottom: 2px solid #f0f0f0 !important;
          padding: 14px 16px !important;
          white-space: nowrap !important;
        }
        .bills-table-card .ant-table-tbody > tr > td {
          padding: 14px 16px !important;
          border-bottom: 1px solid #f8f8f8 !important;
          color: #333;
          white-space: nowrap;
        }
        .bills-table-card .ant-table-tbody > tr:hover > td {
          background: #fafff0 !important;
        }
        .bills-table-card .ant-table-wrapper {
          overflow-x: auto;
        }
        .bills-table-card .ant-table-wrapper::-webkit-scrollbar {
          height: 6px;
        }
        .bills-table-card .ant-table-wrapper::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .bills-table-card .ant-table-wrapper::-webkit-scrollbar-thumb {
          background: #c8f000;
          border-radius: 3px;
        }
        .bills-table-card .ant-table-wrapper::-webkit-scrollbar-thumb:hover {
          background: #b8e000;
        }

        /* View button */
        .bills-view-btn {
          background: #c8f000;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 12px;
          font-size: 16px;
          color: #111;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .bills-view-btn:hover {
          background: #b8e000;
          transform: scale(1.1);
        }

        /* Delete button */
        .bills-delete-btn {
          background: #ff4444;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 12px;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .bills-delete-btn:hover {
          background: #cc0000;
          transform: scale(1.1);
        }

        /* Modal */
        .bills-modal .ant-modal-content {
          border-radius: 20px !important;
          overflow: hidden;
        }
        .bills-modal .ant-modal-header {
          background: #111 !important;
          border: none !important;
          padding: 18px 24px !important;
        }
        .bills-modal .ant-modal-title {
          color: #c8f000 !important;
          font-weight: 800 !important;
          font-size: 17px !important;
        }
        .bills-modal .ant-modal-close-x {
          color: #fff !important;
        }
        .bills-modal .ant-modal-body {
          padding: 20px 24px !important;
        }

        /* Print button */
        .bills-print-btn {
          background: #c8f000 !important;
          border: none !important;
          border-radius: 50px !important;
          height: 42px !important;
          font-weight: 800 !important;
          font-size: 14px !important;
          color: #111 !important;
          padding: 0 24px !important;
        }
        .bills-print-btn:hover {
          background: #b8e000 !important;
          box-shadow: 0 4px 12px rgba(200,240,0,0.4) !important;
        }

        @media (max-width: 480px) {
          .bills-hero { padding: 22px 16px; }
        }
      `}</style>

      <div className="bills-wrapper">

        {/* Page Hero */}
        <div className="bills-hero">
          <div className="bills-hero-left">
            <h1>Invoice List</h1>
            <p>All generated bills and invoices</p>
          </div>
          <div className="bills-hero-count">
            {billsData.length} Invoice{billsData.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Table */}
        <div className="bills-table-card">
          <Table
            columns={columns}
            dataSource={billsData}
            bordered={false}
            scroll={{ x: 1000 }}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>

      {/* Invoice Modal */}
      {popupModal && (
        <Modal
          className="bills-modal"
          width={400}
          pagination={false}
          title="Invoice Details"
          open={popupModal}
          onCancel={() => setPopupModal(false)}
          footer={false}
        >
          <div id="invoice-POS" ref={componentRef}>
            <center id="top">
              <div className="logo" />
              <div className="info">
                <h2>VRIDHI Autos</h2>
                <p>Contact : 9971040275 | Delhi, India</p>
              </div>
            </center>

            <div id="mid">
              <div className="mt-2">
                <p>
                  Customer Name : <b>{selectedBill.customerName}</b><br />
                  Organization : <b>{selectedBill.organizationName || "-"}</b><br />
                  Phone No : <b>{selectedBill.customerNumber}</b><br />
                  Date : <b>{selectedBill.date.toString().substring(0, 10)}</b><br />
                </p>
                <hr style={{ margin: "5px" }} />
              </div>
            </div>

            <div id="bot">
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tabletitle">
                      <td className="item"><h2>Item</h2></td>
                      <td className="Hours"><h2>Qty</h2></td>
                      <td className="Rate"><h2>Price</h2></td>
                      <td className="Rate"><h2>Total</h2></td>
                    </tr>
                    {selectedBill.cartItems.map((item, idx) => (
                      <tr className="service" key={idx}>
                        <td className="tableitem"><p className="itemtext">{item.name}</p></td>
                        <td className="tableitem"><p className="itemtext">{item.quantity}</p></td>
                        <td className="tableitem"><p className="itemtext">{item.price}</p></td>
                        <td className="tableitem"><p className="itemtext">{item.quantity * item.price}</p></td>
                      </tr>
                    ))}
                    <tr className="tabletitle">
                      <td /><td />
                      <td className="Rate"><h2>GST</h2></td>
                      <td className="payment"><h2>Rs {selectedBill.tax}</h2></td>
                    </tr>
                    <tr className="tabletitle">
                      <td /><td />
                      <td className="Rate"><h2>Grand Total</h2></td>
                      <td className="payment"><h2><b>Rs {selectedBill.totalAmount}</b></h2></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="legalcopy">
                <p className="legal">
                  <strong>Thank you for your order!</strong> 18% GST application on total amount.
                  Please note that this is non refundable amount for any assistance please write email{" "}
                  <b>neonsports@example.com</b>
                </p>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end mt-3">
            <Button className="bills-print-btn" type="primary" onClick={handlePrint}>
              Print Invoice
            </Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default BillsPage;
