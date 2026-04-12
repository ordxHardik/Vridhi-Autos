import React, { useState, useEffect } from "react";
import DefaultLayout from "./../components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import ItemList from "../components/ItemList";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Homepage.css";

const TICKER_ITEMS = [
  "🚗 Drive Better with Premium Car Accessories",
  "💰 Best Prices, Guaranteed",
  "⭐ High-Quality Products",
  "🚘 Wide Range of Accessories",
  "🛡️ Customer Satisfaction First",
  "🚚 Fast & Reliable Delivery",
];

const REVIEWS = [
  {
    initials: "RM",
    name: "Rajesh Mehta",
    date: "2 weeks ago",
    text: "Excellent quality auto parts! The delivery was fast and the packaging was perfect. The items arrived in perfect condition. Highly recommend this store to all vehicle owners.",
  },
  {
    initials: "PS",
    name: "Priya Singh",
    date: "1 month ago",
    text: "Great collection and competitive prices. Customer service is very responsive and helpful. Already recommended them to my friends. Keep up the good work!",
  },
  {
    initials: "AK",
    name: "Arjun Kumar",
    date: "3 weeks ago",
    text: "Outstanding service and quality. Found exactly what I needed for my car. The prices are reasonable and the checkout process was smooth. Will definitely order again!",
  },
  {
    initials: "VP",
    name: "Vikram Patel",
    date: "10 days ago",
    text: "Amazing experience! Fast delivery, authentic products, and excellent communication throughout. This is my go-to shop for all auto parts now. Highly satisfied!",
  },
  {
    initials: "NS",
    name: "Neha Sharma",
    date: "5 days ago",
    text: "Professional team, genuine products, and fantastic deals! I've been using their services for 6 months now and never had any issues. Truly a trusted brand!",
  },
];

// Pre-generate duplicated content for marquee animations
const TICKER_CONTENT = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
const REVIEW_CONTENT = [...REVIEWS, ...REVIEWS, ...REVIEWS];

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
        dispatch({ type: "HIDE_LOADING" });
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

      {/* ── TICKER STRIP ── */}
      <div className="hp-ticker-outer">
        <div className="hp-ticker-track">
          {TICKER_CONTENT.map((text, idx) => (
            <span key={idx} className="hp-ticker-item">
              {text}
              <span className="hp-ticker-sep" aria-hidden="true">|</span>
            </span>
          ))}
        </div>
      </div>

      <DefaultLayout>
        <div className="hp-wrapper">

          {/* Hero */}
          <div className="hp-hero">
            <div className="hp-hero-icon-wrap">🚗</div>
            <div className="hp-hero-title">Smart Gear.<br />Smarter Prices.</div>
            <p className="hp-hero-sub">
              Experience Top-Notch Service and Results with a Team You Can Rely On
            </p>
            <button
              className="hp-hero-btn"
              onClick={() => document.querySelector(".hp-category-scroll")?.scrollIntoView({ behavior: "smooth" })}
            >
              Shop Now <span className="hp-hero-btn-dot" />
            </button>
          </div>

          {/* Categories */}
          <div className="hp-section-title">Shop by Need</div>
          <div className="hp-category-scroll">
            {categories.map((category) => {
              const getImageUrl = () => {
                if (!category.image) return 'https://via.placeholder.com/80?text=No+Image';
                let url = category.image;
                url = url.replace(/^(https?):\/+/, '$1://');
                if (url.startsWith('http://') || url.startsWith('https://')) return url;
                if (url.startsWith('/')) return `${process.env.REACT_APP_SERVER_URL}${url}`;
                return `${process.env.REACT_APP_SERVER_URL}/${url}`;
              };
              return (
                <div
                  key={category._id}
                  className={`hp-cat-card ${selecedCategory === category.name ? "active" : ""}`}
                  onClick={() => setSelecedCategory(category.name)}
                >
                  <img
                    className="hp-cat-img"
                    src={getImageUrl()}
                    alt={category.name}
                    onError={(e) => {
                      if (!e.target.src.includes('placeholder'))
                        e.target.src = 'https://via.placeholder.com/80?text=' + category.name;
                    }}
                  />
                  <div className="hp-cat-label">{category.name}</div>
                </div>
              );
            })}
          </div>

          {/* Items */}
          <div className="hp-section-title">{selecedCategory || "Items"}</div>
          {filteredItems.length > 0 ? (
            <div className="hp-items-grid">
              {filteredItems.map((item) => (
                <ItemList key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="hp-empty">No items found in this category.</div>
          )}

          {/* ── REVIEWS MARQUEE ── */}
          <div className="hp-reviews-section">
            <div className="hp-reviews-header">
              <h2 className="hp-reviews-title">What Our Customers Say</h2>
              <p className="hp-reviews-subtitle">Real reviews from real customers</p>
            </div>

            <div className="hp-reviews-marquee-outer">
              <div className="hp-reviews-marquee-track">
                {REVIEW_CONTENT.map((review, idx) => (
                  <div className="hp-review-card" key={idx}>
                    <div className="hp-review-header">
                      <div className="hp-review-avatar">{review.initials}</div>
                      <div className="hp-review-info">
                        <div className="hp-review-name">{review.name}</div>
                        <div className="hp-review-date">{review.date}</div>
                      </div>
                    </div>
                    <div className="hp-review-stars">
                      <span className="star">★</span><span className="star">★</span>
                      <span className="star">★</span><span className="star">★</span><span className="star">★</span>
                    </div>
                    <p className="hp-review-text">{review.text}</p>
                    <div className="hp-review-footer">
                      <span className="hp-review-rating-label">Verified Purchase</span>
                      <div className="hp-review-helpful"><button>👍 Helpful</button></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        <Footer />
      </DefaultLayout>
    </>
  );
};

export default Homepage;