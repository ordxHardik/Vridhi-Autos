import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Table } from "antd";

const CutomerPage = () => {
  const [billsData, setBillsData] = useState([]);
  const dispatch = useDispatch();

  const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/bills/get-bills`
      );
      setBillsData(data);
      dispatch({ type: "HIDE_LOADING" });
      console.log(data);
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBills();
    //eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      width: 120,
      ellipsis: true,
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
      width: 140,
    },
    {
      title: "Contact No",
      dataIndex: "customerNumber",
      width: 130,
    },
    {
      title: "Email",
      dataIndex: "customerEmail",
      width: 180,
      ellipsis: true,
    },
    {
      title: "Order Date",
      dataIndex: "date",
      width: 160,
      render: (date) => {
        if (!date) return "-";
        const orderDate = new Date(date);
        return orderDate.toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      defaultSortOrder: "descend",
    },
  ];

  return (
    <DefaultLayout>
      <style>{`
        .customer-page-wrapper {
          padding: 20px 16px;
          background: #ffffff;
          min-height: 100vh;
        }

        .customer-page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .customer-page-title {
          font-size: 32px;
          font-weight: 900;
          color: #ffffff;
          background: linear-gradient(135deg, #c8f000 0%, #b5e400 100%);
          padding: 16px 28px;
          border-radius: 16px;
          margin: 0;
          letter-spacing: -0.5px;
          box-shadow: 0 8px 24px rgba(200, 240, 0, 0.25);
          display: inline-block;
          transition: all 0.3s ease;
        }

        .customer-page-title:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(200, 240, 0, 0.35);
        }

        .customer-page-meta {
          display: flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
        }

        .customer-page-badge {
          background: #111111;
          color: #c8f000;
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        /* Table Responsive Styles */
        .customer-table-wrapper {
          background: #ffffff;
          border-radius: 16px;
          overflow: auto;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        }
        .customer-table-wrapper::-webkit-scrollbar {
          height: 8px;
        }
        .customer-table-wrapper::-webkit-scrollbar-track {
          background: #f0f0f0;
        }
        .customer-table-wrapper::-webkit-scrollbar-thumb {
          background: #c8f000;
          border-radius: 4px;
        }
        .customer-table-wrapper::-webkit-scrollbar-thumb:hover {
          background: #b8e000;
        }

        .customer-table-wrapper .ant-table {
          font-family: 'Open Sans', sans-serif;
          width: 100%;
        }

        .customer-table-wrapper .ant-table-thead > tr > th {
          background: #111111 !important;
          color: #c8f000 !important;
          font-weight: 700 !important;
          font-size: 13px !important;
          letter-spacing: 0.5px !important;
          padding: 14px 12px !important;
          text-transform: uppercase;
          border: none !important;
          white-space: nowrap !important;
        }

        .customer-table-wrapper .ant-table-tbody > tr {
          transition: background 0.2s ease;
        }

        .customer-table-wrapper .ant-table-tbody > tr:hover > td {
          background: #f5f5f5 !important;
        }

        .customer-table-wrapper .ant-table-tbody > tr > td {
          padding: 14px 12px !important;
          border-color: #e8e8e8 !important;
          font-size: 14px !important;
          color: #333 !important;
          white-space: nowrap;
        }

        .customer-table-wrapper .ant-table-tbody > tr:last-child > td {
          border-bottom: none !important;
        }

        .customer-table-wrapper .ant-table-cell {
          word-break: break-word;
        }

        /* Empty State */
        .customer-empty-state {
          text-align: center;
          padding: 48px 20px;
          color: #888;
          font-size: 16px;
        }

        .customer-empty-state-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .customer-page-wrapper {
            padding: 16px 12px;
          }

          .customer-page-header {
            margin-bottom: 20px;
          }

          .customer-page-title {
            font-size: 24px;
            padding: 12px 20px;
            width: 100%;
            text-align: center;
          }

          .customer-page-meta {
            width: 100%;
            justify-content: center;
          }

          .customer-table-wrapper .ant-table-thead > tr > th {
            font-size: 12px !important;
            padding: 10px 8px !important;
          }

          .customer-table-wrapper .ant-table-tbody > tr > td {
            padding: 10px 8px !important;
            font-size: 13px !important;
          }
        }

        @media (max-width: 480px) {
          .customer-page-wrapper {
            padding: 12px 8px;
          }

          .customer-page-title {
            font-size: 20px;
            padding: 10px 16px;
            letter-spacing: -0.3px;
          }

          .customer-page-badge {
            font-size: 11px;
            padding: 6px 12px;
          }

          .customer-table-wrapper .ant-table {
            font-size: 12px;
          }

          .customer-table-wrapper .ant-table-thead > tr > th {
            font-size: 11px !important;
            padding: 8px 6px !important;
          }

          .customer-table-wrapper .ant-table-tbody > tr > td {
            padding: 8px 6px !important;
            font-size: 12px !important;
          }

          .customer-table-wrapper .ant-table-cell {
            font-size: 12px !important;
          }
        }

        @media (max-width: 360px) {
          .customer-page-title {
            font-size: 18px;
            padding: 8px 12px;
          }

          .customer-table-wrapper .ant-table-thead > tr > th {
            font-size: 10px !important;
            padding: 6px 4px !important;
          }

          .customer-table-wrapper .ant-table-tbody > tr > td {
            padding: 6px 4px !important;
            font-size: 11px !important;
          }
        }
      `}</style>

      <div className="customer-page-wrapper">
        <div className="customer-page-header">
          <h1 className="customer-page-title">👥 Customer Records</h1>
          <div className="customer-page-meta">
            <div className="customer-page-badge">Total Customers</div>
            <div className="customer-page-badge">{billsData.length}</div>
          </div>
        </div>

        <div className="customer-table-wrapper">
          {billsData.length === 0 ? (
            <div className="customer-empty-state">
              <div className="customer-empty-state-icon">📋</div>
              <p>No customer records found</p>
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={billsData}
              pagination={{ pageSize: 10, showSizeChanger: true }}
              rowKey="_id"
              scroll={{ x: 1000 }}
              bordered={false}
            />
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CutomerPage;
