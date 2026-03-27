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

  const filteredItems = itemsData.filter((i) => i.category === selecedCategory);

  return (
    <>
      <Header />
      <DefaultLayout>
        <style>{`
          /* ===== JAUTER HOMEPAGE STYLES ===== */

          .hp-wrapper {
            background: #f0f0f0;
            min-height: 100vh;
            padding: 0 0 40px 0;
            font-family: 'Inter', sans-serif;
          }

          /* Hero Section */
          .hp-hero {
            background: #e8e8e8;
            border-radius: 24px;
            margin: 0 0 24px 0;
            padding: 40px 24px 32px;
            text-align: center;
            background-image:
              linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
            background-size: 28px 28px;
            position: relative;
            overflow: hidden;
          }

          .hp-hero-icon-wrap {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: #c8f000;
            border-radius: 20px;
            width: 72px;
            height: 72px;
            margin: 0 auto 20px;
            font-size: 34px;
          }

          .hp-hero-title {
            font-size: clamp(28px, 6vw, 40px);
            font-weight: 900;
            color: #111;
            line-height: 1.15;
            margin-bottom: 10px;
          }

          .hp-hero-sub {
            font-size: 15px;
            color: #666;
            margin-bottom: 24px;
          }

          .hp-hero-btn {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: #7c3aed;
            color: #fff;
            border: none;
            border-radius: 50px;
            padding: 14px 28px;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            transition: background 0.2s, transform 0.2s;
          }
          .hp-hero-btn:hover {
            background: #6d28d9;
            transform: translateY(-2px);
          }
          .hp-hero-btn-dot {
            width: 10px;
            height: 10px;
            background: #c8f000;
            border-radius: 50%;
            display: inline-block;
          }

          /* Section title */
          .hp-section-title {
            font-size: 20px;
            font-weight: 900;
            color: #111;
            margin-bottom: 16px;
            padding: 0 4px;
          }

          /* Category scroll */
          .hp-category-scroll {
            display: flex;
            flex-wrap: nowrap;
            gap: 0;
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
            margin-bottom: 24px;
          }
          .hp-category-scroll::-webkit-scrollbar { display: none; }

          /* Each category card — vertical stack like the screenshot */
          .hp-cat-card {
            flex-shrink: 0;
            width: 120px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0;
            cursor: pointer;
            border-radius: 20px;
            overflow: hidden;
            border: 3px solid transparent;
            transition: border-color 0.2s, transform 0.2s;
            background: #fff;
            margin-right: 12px;
          }
          .hp-cat-card:hover {
            transform: translateY(-3px);
            border-color: #c8f000;
          }
          .hp-cat-card.active {
            border-color: #111;
          }

          .hp-cat-img {
            width: 100%;
            height: 90px;
            object-fit: cover;
            display: block;
          }

          .hp-cat-label {
            width: 100%;
            padding: 10px 6px;
            text-align: center;
            font-size: 13px;
            font-weight: 700;
            color: #111;
            background: #fff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            border-top: 1px solid #f0f0f0;
          }
          .hp-cat-card.active .hp-cat-label {
            background: #c8f000;
          }

          /* Items grid */
          .hp-items-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 16px;
            padding: 0 4px;
          }

          /* Empty state */
          .hp-empty {
            text-align: center;
            padding: 60px 20px;
            background: #fff;
            border-radius: 20px;
            color: #aaa;
            font-size: 15px;
          }

          /* Responsive */
          @media (max-width: 768px) {
            .hp-items-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 12px;
            }
          }
          @media (max-width: 400px) {
            .hp-cat-card { width: 100px; }
            .hp-cat-img { height: 70px; }
          }
        `}</style>

        <div className="hp-wrapper">

          {/* Hero Banner */}
          <div className="hp-hero">
            <div className="hp-hero-icon-wrap">🚗</div>
            <div className="hp-hero-title">
              Smart Gear.<br />Smarter Prices.
            </div>
            <p className="hp-hero-sub">
              Experience Top-Notch Service and Results with a Team You Can Rely On
            </p>
            <button
              className="hp-hero-btn"
              onClick={() => {
                document.querySelector(".hp-category-scroll")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Shop Now <span className="hp-hero-btn-dot" />
            </button>
          </div>

          {/* Shop by Need — Category Tabs */}
          <div className="hp-section-title">Shop by Need</div>
          <div className="hp-category-scroll">
            {categories.map((category) => (
              <div
                key={category._id}
                className={`hp-cat-card ${selecedCategory === category.name ? "active" : ""}`}
                onClick={() => setSelecedCategory(category.name)}
              >
                <img
                  className="hp-cat-img"
                  src={`${process.env.REACT_APP_SERVER_URL}${category.image}`}
                  alt={category.name}
                />
                <div className="hp-cat-label">{category.name}</div>
              </div>
            ))}
          </div>

          {/* Best Sellers / Items */}
          <div className="hp-section-title">
            {selecedCategory || "Items"}
          </div>

          {filteredItems.length > 0 ? (
            <div className="hp-items-grid">
              {filteredItems.map((item) => (
                <ItemList key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="hp-empty">
              No items found in this category.
            </div>
          )}
        </div>
      </DefaultLayout>
    </>
  );
};

export default Homepage;