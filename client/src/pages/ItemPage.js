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
  const getAllItems = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/items/get-item`
      );
      setItemsData(data);
      dispatch({ type: "HIDE_LOADING" });
      console.log(data);
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(error);
    }
  };

  // Fetch categories from MongoDB
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

  //useEffect
  useEffect(() => {
    fetchCategories();
    getAllItems();
    //eslint-disable-next-line
  }, []);

  //handle deleet
  const handleDelete = async (record) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/items/delete-item`,
        { itemId: record._id }
      );
      message.success("Item Deleted Succesfully");
      getAllItems();
      setPopupModal(false);
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("Something Went Wrong");
      console.log(error);
    }
  };

  //able data
  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={`${process.env.REACT_APP_SERVER_URL}${image}`} alt={record.name} height="60" width="60" />
      ),
    },
    { title: "Price", dataIndex: "price" },

    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EditOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setEditItem(record);
              setPopupModal(true);
            }}
          />
          <DeleteOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  // handle form  submit
  const handleSubmit = async (value) => {
    if (!itemImage && !editItem) {
      message.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("price", value.price);
    formData.append("category", value.category);

    if (itemImage) {
      formData.append("image", itemImage);
    }

    if (editItem === null) {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/items/add-item`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
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
        console.log(error);
      }
    } else {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        formData.append("itemId", editItem._id);
        await axios.put(
          `${process.env.REACT_APP_SERVER_URL}/api/items/edit-item`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
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
        console.log(error);
      }
    }
  };

  // Handle add new category
  const handleAddCategory = async () => {
    if (newCategoryName.trim()) {
      if (!categories.find(cat => cat.name === newCategoryName)) {
        if (!newCategoryImage) {
          message.error("Please upload an image for the category");
          return;
        }
        try {
          dispatch({
            type: "SHOW_LOADING",
          });

          const formData = new FormData();
          formData.append("name", newCategoryName);
          formData.append("image", newCategoryImage);

          const res = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/api/categories/add-category`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          dispatch({ type: "HIDE_LOADING" });

          // Add new category to state
          setCategories([...categories, res.data.data]);
          setNewCategoryName("");
          setNewCategoryImage(null);
          setCategoryImagePreview("");
          setCategoryModal(false);
          message.success("Category added successfully!");
        } catch (error) {
          dispatch({ type: "HIDE_LOADING" });
          console.log(error);
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
        <div className="d-flex justify-content-between">
          <h1>Item List</h1>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button type="primary" onClick={() => setCategoryModal(true)}>
              Add Category
            </Button>
            <Button type="primary" onClick={() => setPopupModal(true)}>
              Add Item
            </Button>
          </div>
        </div>

        <Table columns={columns} dataSource={itemsData} bordered />

        {popupModal && (
          <Modal
            title={`${editItem !== null ? "Edit Item " : "Add New Item"}`}
            visible={popupModal}
            onCancel={() => {
              setEditItem(null);
              setPopupModal(false);
              setItemImage(null);
              setItemImagePreview("");
              form.resetFields();
            }}
            footer={false}
          >
            <Form
              layout="vertical"
              initialValues={editItem}
              onFinish={handleSubmit}
              form={form}
            >
              <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter item name" }]}>
                <Input />
              </Form.Item>
              <Form.Item name="price" label="Price" rules={[{ required: true, message: "Please enter item price" }]}>
                <Input type="number" />
              </Form.Item>
              <Form.Item label="Item Image" rules={[{ required: !editItem || !editItem.image, message: "Please upload an image" }]}>
                <div>
                  <Upload
                    accept="image/*"
                    maxCount={1}
                    beforeUpload={(file) => {
                      setItemImage(file);
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        setItemImagePreview(e.target.result);
                      };
                      reader.readAsDataURL(file);
                      return false;
                    }}
                    onRemove={() => {
                      setItemImage(null);
                      setItemImagePreview("");
                    }}
                  >
                    <Button icon={<PlusOutlined />}>Upload Image</Button>
                  </Upload>
                  {itemImagePreview && (
                    <div style={{ marginTop: "10px", textAlign: "center" }}>
                      <p>Preview:</p>
                      <img src={itemImagePreview} alt="Item Preview" height="80" width="80" style={{ borderRadius: "4px" }} />
                    </div>
                  )}
                  {!itemImagePreview && editItem && editItem.image && (
                    <div style={{ marginTop: "10px", textAlign: "center" }}>
                      <p>Current Image:</p>
                      <img src={`${process.env.REACT_APP_SERVER_URL}${editItem.image}`} alt="Current Item" height="80" width="80" style={{ borderRadius: "4px" }} />
                    </div>
                  )}
                </div>
              </Form.Item>
              <Form.Item name="category" label="Category" rules={[{ required: true, message: "Please select a category" }]}>
                <Select
                  placeholder="Select a category"
                  allowClear
                >
                  {categories.map((cat) => (
                    <Select.Option key={cat._id} value={cat.name}>
                      {cat.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <div className="d-flex justify-content-end">
                <Button type="primary" htmlType="submit">
                  SAVE
                </Button>
              </div>
            </Form>
          </Modal>
        )}

        {categoryModal && (
          <Modal
            title="Add New Category"
            visible={categoryModal}
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
                    reader.onload = (e) => {
                      setCategoryImagePreview(e.target.result);
                    };
                    reader.readAsDataURL(file);
                    return false;
                  }}
                  onRemove={() => {
                    setNewCategoryImage(null);
                    setCategoryImagePreview("");
                  }}
                >
                  <Button icon={<PlusOutlined />}>Upload Image</Button>
                </Upload>
              </Form.Item>
              {categoryImagePreview && (
                <div style={{ marginBottom: "15px", textAlign: "center" }}>
                  <p>Preview:</p>
                  <img
                    src={categoryImagePreview}
                    alt="Category Preview"
                    height="80"
                    width="80"
                    style={{ borderRadius: "4px" }}
                  />
                </div>
              )}
              <div className="d-flex justify-content-end" style={{ gap: "10px" }}>
                <Button
                  onClick={() => {
                    setNewCategoryName("");
                    setNewCategoryImage(null);
                    setCategoryImagePreview("");
                    setCategoryModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="primary" onClick={handleAddCategory}>
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
