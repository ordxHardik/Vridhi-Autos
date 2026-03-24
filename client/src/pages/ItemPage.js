import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { Modal, Button, Table, Form, Input, Select, message } from "antd";
import Header from "../components/Header";
const ItemPage = () => {
  const dispatch = useDispatch();
  const [itemsData, setItemsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryModal, setCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState("");
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
        <img src={image} alt={record.name} height="60" width="60" />
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
    if (editItem === null) {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/items/add-item`,
          value
        );
        message.success("Item Added Succesfully");
        getAllItems();
        setPopupModal(false);
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
        await axios.put(
          `${process.env.REACT_APP_SERVER_URL}/api/items/edit-item`,
          {
            ...value,
            itemId: editItem._id,
          }
        );
        message.success("Item Updated Succesfully");
        getAllItems();
        setPopupModal(false);
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
        try {
          dispatch({
            type: "SHOW_LOADING",
          });
          const res = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/api/categories/add-category`,
            {
              name: newCategoryName,
              image: newCategoryImage,
            }
          );
          dispatch({ type: "HIDE_LOADING" });
          
          // Add new category to state
          setCategories([...categories, res.data.data]);
          setNewCategoryName("");
          setNewCategoryImage("");
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
            }}
            footer={false}
          >
            <Form
              layout="vertical"
              initialValues={editItem}
              onFinish={handleSubmit}
            >
              <Form.Item name="name" label="Name">
                <Input />
              </Form.Item>
              <Form.Item name="price" label="Price">
                <Input />
              </Form.Item>
              <Form.Item name="image" label="Image URL">
                <Input />
              </Form.Item>
              <Form.Item name="category" label="Category">
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
              setNewCategoryImage("");
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
              <Form.Item label="Category Image URL">
                <Input
                  placeholder="Enter image URL"
                  value={newCategoryImage}
                  onChange={(e) => setNewCategoryImage(e.target.value)}
                />
              </Form.Item>
              {newCategoryImage && (
                <div style={{ marginBottom: "15px", textAlign: "center" }}>
                  <p>Preview:</p>
                  <img
                    src={newCategoryImage}
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
                    setNewCategoryImage("");
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
