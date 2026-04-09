import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { Modal, Button, Table, Form, Input, Select, message, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Header from "../components/Header";

const ItemPage = () => {
  const dispatch = useDispatch();
  const [itemsData, setItemsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryModal, setCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState(null);
  const [itemImage, setItemImage] = useState(null);
  const [itemImagePreview, setItemImagePreview] = useState("");
  const [categoryImagePreview, setCategoryImagePreview] = useState("");
  const [form] = Form.useForm();
  const isLoggedIn = localStorage.getItem("auth");

  const checkLogin = () => {
    if (!isLoggedIn) {
      message.error("Please login to edit the items");
      return false;
    }
    return true;
  };

  const getAllItems = async () => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/items/get-item`
      );
      setItemsData(data);
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/categories/get-categories`
      );
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    getAllItems();
    //eslint-disable-next-line
  }, []);

  const handleDelete = async (record) => {
    if (!checkLogin()) return;
    try {
      dispatch({ type: "SHOW_LOADING" });
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/items/delete-item`,
        { itemId: record._id }
      );
      message.success("Item Deleted Successfully");
      getAllItems();
      setPopupModal(false);
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("Something Went Wrong");
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Item",
      dataIndex: "name",
      render: (name, record) => {
        const getImageUrl = () => {
          if (!record.image) return 'https://via.placeholder.com/180?text=No+Image';
          let url = record.image;
          // Fix malformed URLs: https// -> https://, http// -> http://
          url = url.replace(/^(https?):\/+/, '$1://');
          // If it's a full URL, use it
          if (url.startsWith('http://') || url.startsWith('https://')) return url;
          // Otherwise treat as relative path
          if (url.startsWith('/')) return `${process.env.REACT_APP_SERVER_URL}${url}`;
          return `${process.env.REACT_APP_SERVER_URL}/${url}`;
        };
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img
              src={getImageUrl()}
              alt={name}
              style={{ width: 48, height: 48, borderRadius: 10, objectFit: "cover", background: "#f5f5f5" }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/48?text=No+Image';
              }}
            />
            <span style={{ fontWeight: 700, color: "#111" }}>{name}</span>
          </div>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      responsive: ["sm"],
      render: (cat) => (
        <span className="item-cat-tag">{cat}</span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (p) => <strong style={{ color: "#7c3aed" }}>₹ {p}</strong>,
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            className="item-action-btn edit"
            onClick={() => {
              const isAuthenticated = localStorage.getItem("auth");
              if (!isAuthenticated) {
                message.error("Please login to edit the items");
                return;
              }
              setEditItem(record);
              setPopupModal(true);
            }}
          >
            <EditOutlined />
          </button>
          <button
            className="item-action-btn delete"
            onClick={() => handleDelete(record)}
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  const handleSubmit = async (value) => {
    if (!checkLogin()) return;
    if (!itemImage && !editItem) {
      message.error("Please upload an image");
      return;
    }
    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("price", value.price);
    formData.append("category", value.category);
    if (itemImage) formData.append("image", itemImage);

    if (editItem === null) {
      try {
        dispatch({ type: "SHOW_LOADING" });
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/items/add-item`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Item Added Successfully");
        getAllItems();
        setPopupModal(false);
        setItemImage(null);
        setItemImagePreview("");
        form.resetFields();
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        dispatch({ type: "HIDE_LOADING" });
        message.error("Something Went Wrong");
      }
    } else {
      try {
        dispatch({ type: "SHOW_LOADING" });
        formData.append("itemId", editItem._id);
        await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/items/edit-item`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Item Updated Successfully");
        getAllItems();
        setPopupModal(false);
        setEditItem(null);
        setItemImage(null);
        setItemImagePreview("");
        form.resetFields();
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        dispatch({ type: "HIDE_LOADING" });
        message.error("Something Went Wrong");
      }
    }
  };

  const handleAddCategory = async () => {
    if (!checkLogin()) return;
    if (newCategoryName.trim()) {
      if (!categories.find((cat) => cat.name === newCategoryName)) {
        if (!newCategoryImage) {
          message.error("Please upload an image for the category");
          return;
        }
        try {
          dispatch({ type: "SHOW_LOADING" });
          const formData = new FormData();
          formData.append("name", newCategoryName);
          formData.append("image", newCategoryImage);
          const res = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/api/categories/add-category`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          dispatch({ type: "HIDE_LOADING" });
          setCategories([...categories, res.data.data]);
          setNewCategoryName("");
          setNewCategoryImage(null);
          setCategoryImagePreview("");
          setCategoryModal(false);
          message.success("Category added successfully!");
        } catch (error) {
          dispatch({ type: "HIDE_LOADING" });
          message.error(error.response?.data?.message || "Error adding category");
        }
      } else {
        message.warning("Category already exists");
      }
    } else {
      message.error("Please enter a category name");
    }
  };

  return (
    <>
      <Header />
      <DefaultLayout>
        <style>{`
          /* ===== JAUTER ITEM PAGE ===== */
          .item-wrapper {
            background: #f0f0f0;
            min-height: 100vh;
            padding: 0 0 40px 0;
            font-family: 'Inter', sans-serif;
          }

          /* Hero bar */
          .item-hero {
            background: #111;
            border-radius: 24px;
            padding: 28px 24px;
            margin-bottom: 28px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            flex-wrap: wrap;
          }
          .item-hero h1 {
            font-size: clamp(20px, 4vw, 28px);
            font-weight: 900;
            color: #c8f000;
            margin: 0 0 4px;
          }
          .item-hero p {
            color: #888;
            font-size: 13px;
            margin: 0;
          }
          .item-hero-actions {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
          }

          /* Action buttons */
          .item-hero-btn {
            border: none !important;
            border-radius: 50px !important;
            height: 42px !important;
            font-weight: 800 !important;
            font-size: 14px !important;
            padding: 0 22px !important;
            cursor: pointer;
            transition: all 0.2s;
          }
          .item-hero-btn.primary {
            background: #c8f000 !important;
            color: #111 !important;
          }
          .item-hero-btn.primary:hover {
            background: #d4ff00 !important;
            box-shadow: 0 4px 12px rgba(200,240,0,0.35) !important;
          }
          .item-hero-btn.secondary {
            background: #fff !important;
            color: #111 !important;
            border: 2px solid #e0e0e0 !important;
          }
          .item-hero-btn.secondary:hover {
            border-color: #c8f000 !important;
            background: #fafff0 !important;
          }

          /* Category tag */
          .item-cat-tag {
            background: #f0f0f0;
            border-radius: 50px;
            padding: 4px 12px;
            font-size: 12px;
            font-weight: 700;
            color: #555;
          }

          /* Table action buttons */
          .item-action-btn {
            width: 34px;
            height: 34px;
            border: none;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 15px;
            cursor: pointer;
            transition: all 0.2s;
          }
          .item-action-btn.edit {
            background: #c8f000;
            color: #111;
          }
          .item-action-btn.edit:hover { background: #b8e000; transform: scale(1.1); }
          .item-action-btn.delete {
            background: #fee2e2;
            color: #dc2626;
          }
          .item-action-btn.delete:hover { background: #fca5a5; transform: scale(1.1); }

          /* Table card */
          .item-table-card {
            background: #fff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 4px 16px rgba(0,0,0,0.06);
          }
          .item-table-card .ant-table {
            font-family: 'Inter', sans-serif;
            font-size: 14px;
          }
          .item-table-card .ant-table-thead > tr > th {
            background: #f8f8f8 !important;
            font-weight: 800 !important;
            font-size: 12px !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
            color: #555 !important;
            border-bottom: 2px solid #f0f0f0 !important;
            padding: 14px 16px !important;
          }
          .item-table-card .ant-table-tbody > tr > td {
            padding: 14px 16px !important;
            border-bottom: 1px solid #f8f8f8 !important;
          }
          .item-table-card .ant-table-tbody > tr:hover > td {
            background: #fafff0 !important;
          }

          /* Modal */
          .item-modal .ant-modal-content { border-radius: 20px !important; overflow: hidden; }
          .item-modal .ant-modal-header {
            background: #111 !important;
            border: none !important;
            padding: 18px 24px !important;
          }
          .item-modal .ant-modal-title {
            color: #c8f000 !important;
            font-weight: 800 !important;
            font-size: 17px !important;
          }
          .item-modal .ant-modal-close-x { color: #fff !important; }
          .item-modal .ant-modal-body { padding: 20px 24px !important; }
          .item-modal .ant-form-item-label > label {
            font-weight: 700;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            color: #555;
          }
          .item-modal .ant-input,
          .item-modal .ant-select-selector {
            border-radius: 10px !important;
            border: 2px solid #e8e8e8 !important;
            height: 42px !important;
            font-size: 14px !important;
          }
          .item-modal .ant-input:focus,
          .item-modal .ant-select-focused .ant-select-selector {
            border-color: #c8f000 !important;
            box-shadow: 0 0 0 2px rgba(200,240,0,0.2) !important;
          }

          .item-modal-save-btn {
            background: #111 !important;
            border: none !important;
            border-radius: 50px !important;
            height: 42px !important;
            font-weight: 800 !important;
            font-size: 14px !important;
            color: #c8f000 !important;
            padding: 0 28px !important;
          }
          .item-modal-save-btn:hover {
            background: #222 !important;
            box-shadow: 0 4px 14px rgba(0,0,0,0.18) !important;
          }

          @media (max-width: 480px) {
            .item-hero { padding: 20px 16px; }
            .item-hero-actions { width: 100%; }
            .item-hero-btn { flex: 1; text-align: center; }
          }
        `}</style>

        <div className="item-wrapper">

          {/* Hero */}
          <div className="item-hero">
            <div>
              <h1>Item List</h1>
              <p>Manage your products and categories</p>
            </div>
            <div className="item-hero-actions">
              <Button
                className="item-hero-btn secondary"
                onClick={() => {
                  if (checkLogin()) {
                    setCategoryModal(true);
                  }
                }}
              >
                + Category
              </Button>
              <Button
                className="item-hero-btn primary"
                onClick={() => {
                  if (checkLogin()) {
                    setPopupModal(true);
                  }
                }}
              >
                + Add Item
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="item-table-card">
            <Table
              columns={columns}
              dataSource={itemsData}
              bordered={false}
              scroll={{ x: true }}
              rowKey="_id"
            />
          </div>
        </div>

        {/* Add/Edit Item Modal */}
        {popupModal && (
          <Modal
            className="item-modal"
            title={editItem !== null ? "Edit Item" : "Add New Item"}
            open={popupModal}
            onCancel={() => {
              setEditItem(null);
              setPopupModal(false);
              setItemImage(null);
              setItemImagePreview("");
              form.resetFields();
            }}
            footer={false}
          >
            <Form layout="vertical" initialValues={editItem} onFinish={handleSubmit} form={form}>
              <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter item name" }]}>
                <Input placeholder="Item name" />
              </Form.Item>
              <Form.Item name="price" label="Price" rules={[{ required: true, message: "Please enter item price" }]}>
                <Input type="number" placeholder="Price in ₹" />
              </Form.Item>
              <Form.Item label="Item Image">
                <Upload
                  accept="image/*"
                  maxCount={1}
                  beforeUpload={(file) => {
                    setItemImage(file);
                    const reader = new FileReader();
                    reader.onload = (e) => setItemImagePreview(e.target.result);
                    reader.readAsDataURL(file);
                    return false;
                  }}
                  onRemove={() => { setItemImage(null); setItemImagePreview(""); }}
                >
                  <Button icon={<PlusOutlined />}>Upload Image</Button>
                </Upload>
                {itemImagePreview && (
                  <div style={{ marginTop: 10, textAlign: "center" }}>
                    <img src={itemImagePreview} alt="Preview" height="80" width="80" style={{ borderRadius: 10 }} />
                  </div>
                )}
                {!itemImagePreview && editItem?.image && (
                  <div style={{ marginTop: 10, textAlign: "center" }}>
                    <img src={`${process.env.REACT_APP_SERVER_URL}${editItem.image}`} alt="Current" height="80" width="80" style={{ borderRadius: 10 }} />
                  </div>
                )}
              </Form.Item>
              <Form.Item name="category" label="Category" rules={[{ required: true, message: "Please select a category" }]}>
                <Select placeholder="Select a category" allowClear>
                  {categories.map((cat) => (
                    <Select.Option key={cat._id} value={cat.name}>{cat.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <div className="d-flex justify-content-end">
                <Button className="item-modal-save-btn" type="primary" htmlType="submit">
                  Save Item
                </Button>
              </div>
            </Form>
          </Modal>
        )}

        {/* Add Category Modal */}
        {categoryModal && (
          <Modal
            className="item-modal"
            title="Add New Category"
            open={categoryModal}
            onCancel={() => {
              setNewCategoryName("");
              setNewCategoryImage(null);
              setCategoryImagePreview("");
              setCategoryModal(false);
            }}
            footer={false}
          >
            <Form layout="vertical">
              <Form.Item label="Category Name">
                <Input
                  placeholder="Enter category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Category Image">
                <Upload
                  accept="image/*"
                  maxCount={1}
                  beforeUpload={(file) => {
                    setNewCategoryImage(file);
                    const reader = new FileReader();
                    reader.onload = (e) => setCategoryImagePreview(e.target.result);
                    reader.readAsDataURL(file);
                    return false;
                  }}
                  onRemove={() => { setNewCategoryImage(null); setCategoryImagePreview(""); }}
                >
                  <Button icon={<PlusOutlined />}>Upload Image</Button>
                </Upload>
              </Form.Item>
              {categoryImagePreview && (
                <div style={{ marginBottom: 16, textAlign: "center" }}>
                  <img src={categoryImagePreview} alt="Preview" height="80" width="80" style={{ borderRadius: 10 }} />
                </div>
              )}
              <div className="d-flex justify-content-end" style={{ gap: "10px" }}>
                <Button onClick={() => { setNewCategoryName(""); setNewCategoryImage(null); setCategoryImagePreview(""); setCategoryModal(false); }}>
                  Cancel
                </Button>
                <Button className="item-modal-save-btn" type="primary" onClick={handleAddCategory}>
                  Add Category
                </Button>
              </div>
            </Form>
          </Modal>
        )}
      </DefaultLayout>
    </>
  );
};

export default ItemPage;
