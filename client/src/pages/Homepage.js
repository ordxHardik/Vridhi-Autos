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

  //useEffect
  useEffect(() => {
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

        // Set first category as default if available
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
        <div className="d-flex">
          {categories.map((category) => (
            <div
              key={category._id}
              className={`d-flex category ${selecedCategory === category.name && "category-active"
                }`}
              onClick={() => setSelecedCategory(category.name)}
            >
              <h4 className="text-uppercase text-white">{category.name}</h4>
              <img
                src={`${process.env.REACT_APP_SERVER_URL}${category.image}`}
                alt={category.name}
                height="40"
                width="60"
              />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {itemsData
            .filter((i) => i.category === selecedCategory)
            .map((item) => (
              <div>
                <ItemList key={item.id} item={item} />
              </div>
            ))}
        </div>
      </DefaultLayout>
    </>
  );
};

export default Homepage;
