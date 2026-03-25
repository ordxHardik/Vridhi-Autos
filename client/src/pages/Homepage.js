import React, { useState, useEffect } from "react";
import DefaultLayout from "./../components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import ItemList from "../components/ItemList";
import Header from "../components/Header";

const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selecedCategory, setSelecedCategory] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({ type: "SHOW_LOADING" });
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/items/get-item`
        );
        setItemsData(data);
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/categories/get-categories`
        );
        setCategories(data);
        if (data.length > 0) {
          setSelecedCategory(data[0].name);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
    getAllItems();
  }, [dispatch]);

  return (
    <>
      <Header />
      <DefaultLayout>

        {/* Category Tabs */}
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            gap: "10px",
            padding: "16px 12px",
            backgroundColor: "#657691",
            borderRadius: "8px",
            marginBottom: "24px",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className="category-scroll"
        >
          {categories.map((category) => (
            <div
              key={category._id}
              onClick={() => setSelecedCategory(category.name)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "30px",
                cursor: "pointer",
                backgroundColor:
                  selecedCategory === category.name ? "#1890ff" : "#ffffff",
                color:
                  selecedCategory === category.name ? "#fbfbfb" : "#333333",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                transition: "all 0.25s ease",
                fontWeight: selecedCategory === category.name ? "600" : "400",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <img
                src={`${process.env.REACT_APP_SERVER_URL}${category.image}`}
                alt={category.name}
                style={{
                  height: "32px",
                  width: "48px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
              <h4
                style={{
                  margin: 0,
                  fontSize: "14px",
                  textTransform: "uppercase",
                }}
              >
                {category.name}
              </h4>
            </div>
          ))}
        </div>

        {/* Items Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
            padding: "0 4px",
          }}
        >
          {itemsData
            .filter((i) => i.category === selecedCategory)
            .map((item) => (
              <ItemList key={item._id} item={item} />
            ))}
        </div>

        {/* Empty State */}
        {itemsData.filter((i) => i.category === selecedCategory).length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#999",
              fontSize: "16px",
            }}
          >
            No items found in this category.
          </div>
        )}

      </DefaultLayout>
    </>
  );
};

export default Homepage;