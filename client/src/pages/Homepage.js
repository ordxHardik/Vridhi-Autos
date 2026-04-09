import React, { useState, useEffect } from "react";
import DefaultLayout from "./../components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import ItemList from "../components/ItemList";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const TICKER_ITEMS = [
  "🚗 Drive Better with Premium Car Accessories",
  "💰 Best Prices, Guaranteed",
  "⭐ High-Quality Products",
  "🚘 Wide Range of Accessories",
  "🛡️ Customer Satisfaction First",
  "🚚 Fast & Reliable Delivery",
];

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

  // Duplicate items enough times so the scroll looks seamless
  const tickerContent = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <>
      <Header />

      {/* ── TICKER STRIP ── */}
      <div className="hp-ticker-outer">
        <div className="hp-ticker-track">
          {tickerContent.map((text, idx) => (
            <span key={idx} className="hp-ticker-item">
              {text}
              <span className="hp-ticker-sep" aria-hidden="true">|</span>
            </span>
          ))}
        </div>
      </div>

      <DefaultLayout>
        <style>{`
          /* ===== TICKER STRIP ===== */
          .hp-ticker-outer {
            width: 100%;
            background: #111;
            overflow: hidden;
            white-space: nowrap;
            padding: 10px 0;
            position: relative;
            /* sits right below the navbar, above the hero */
          }

          /* Fade edges */
          .hp-ticker-outer::before,
          .hp-ticker-outer::after {
            content: '';
            position: absolute;
            top: 0;
            width: 60px;
            height: 100%;
            z-index: 2;
            pointer-events: none;
          }
          .hp-ticker-outer::before {
            left: 0;
            background: linear-gradient(to right, #111, transparent);
          }
          .hp-ticker-outer::after {
            right: 0;
            background: linear-gradient(to left, #111, transparent);
          }

          .hp-ticker-track {
            display: inline-flex;
            align-items: center;
            animation: hp-ticker-scroll 30s linear infinite;
            /* will-change for GPU acceleration */
            will-change: transform;
          }

          /* Pause on hover */
          .hp-ticker-outer:hover .hp-ticker-track {
            animation-play-state: paused;
          }

          @keyframes hp-ticker-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }

          .hp-ticker-item {
            display: inline-flex;
            align-items: center;
            gap: 16px;
            font-family: 'Inter', 'DM Sans', sans-serif;
            font-size: clamp(11px, 2.5vw, 13px);
            font-weight: 600;
            color: #ffffff;
            letter-spacing: 0.3px;
            padding: 0 8px;
            white-space: nowrap;
          }

          .hp-ticker-sep {
            color: #c8f000;
            font-size: 16px;
            font-weight: 300;
            margin-left: 8px;
            opacity: 0.7;
          }

          /* ===== JAUTER HOMEPAGE STYLES ===== */

          .hp-wrapper {
            background: #f0f0f0 !important;
            min-height: 100vh !important;
            padding: 0 0 40px 0 !important;
            font-family: 'Inter', sans-serif !important;
          }

          /* Hero Section */
          .hp-hero {
            background: #e8e8e8 !important;
            border-radius: 24px !important;
            margin: -8px 0 24px 0 !important;
            padding: 40px 24px 32px !important;
            text-align: center !important;
            background-image:
              linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px) !important;
            background-size: 28px 28px !important;
            position: relative !important;
            overflow: hidden !important;
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
            font-size: clamp(13px, 4vw, 15px);
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
            font-size: clamp(18px, 5vw, 20px) !important;
            font-weight: 900 !important;
            color: #111 !important;
            margin-bottom: 16px !important;
            padding: 0 4px !important;
          }

          /* Category scroll */
          .hp-category-scroll {
            display: flex !important;
            flex-wrap: nowrap !important;
            gap: 0 !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
            margin-bottom: 24px !important;
            padding: 0 0 8px 0 !important;
            -webkit-overflow-scrolling: touch !important;
            width: 100% !important;
          }
          .hp-category-scroll::-webkit-scrollbar { display: none !important; }

          .hp-cat-card {
            flex-shrink: 0 !important;
            width: 120px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 0 !important;
            cursor: pointer !important;
            border-radius: 20px !important;
            overflow: hidden !important;
            border: 3px solid transparent !important;
            transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease !important;
            background: #fff !important;
            margin-right: 12px !important;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08) !important;
            padding: 0 !important;
          }
          .hp-cat-card:hover,
          .hp-cat-card:active,
          .hp-cat-card:focus {
            transform: translateY(-3px) !important;
            border-color: #c8f000 !important;
            box-shadow: 0 0 16px rgba(200, 240, 0, 0.6), 0 6px 16px rgba(0, 0, 0, 0.12) !important;
          }
          .hp-cat-card.active { 
            border-color: #111 !important;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08) !important;
          }

          .hp-cat-img {
            width: 100% !important;
            height: 90px !important;
            object-fit: cover !important;
            display: block !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .hp-cat-label {
            width: 100% !important;
            padding: 10px 6px !important;
            text-align: center !important;
            font-size: clamp(11px, 2vw, 13px) !important;
            font-weight: 700 !important;
            color: #111 !important;
            background: #fff !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            border-top: 1px solid #f0f0f0 !important;
            margin: 0 !important;
          }
          .hp-cat-card.active .hp-cat-label { background: #c8f000 !important; }

          /* Items grid */
          .hp-items-grid {
            display: grid !important;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)) !important;
            gap: 16px !important;
            padding: 0 4px !important;
          }

          /* Empty state */
          .hp-empty {
            text-align: center !important;
            padding: clamp(40px, 10vw, 60px) 20px !important;
            background: #fff !important;
            border-radius: 20px !important;
            color: #aaa !important;
            font-size: clamp(13px, 3vw, 15px) !important;
          }

          /* ===== REVIEWS SECTION ===== */
          .hp-reviews-section {
            margin-top: 48px !important;
            padding-top: 40px !important;
            border-top: 2px solid #e0e0e0 !important;
          }

          .hp-reviews-header {
            text-align: center !important;
            margin-bottom: 40px !important;
          }

          .hp-reviews-title {
            font-size: clamp(24px, 6vw, 28px) !important;
            font-weight: 900 !important;
            color: #111 !important;
            margin-bottom: 8px !important;
          }

          .hp-reviews-subtitle {
            font-size: clamp(12px, 3vw, 14px);
            color: #888;
          }

          .hp-reviews-scroll {
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
            padding-bottom: 12px;
          }
          .hp-reviews-scroll::-webkit-scrollbar { display: none; }

          .hp-reviews-grid {
            display: flex;
            align-items: flex-end;
            gap: 16px;
            padding: 60px 4px 4px;
            min-width: max-content;
          }

          .hp-review-card {
            background: #fff;
            border-radius: 20px;
            padding: 24px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            gap: 16px;
            width: 260px;
            flex-shrink: 0;
          }
          .hp-review-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          }
          .hp-review-card:nth-child(1) { margin-bottom: 60px; }
          .hp-review-card:nth-child(2) { margin-bottom: 30px; }
          .hp-review-card:nth-child(3) { margin-bottom: 0px; }
          .hp-review-card:nth-child(4) { margin-bottom: 30px; }
          .hp-review-card:nth-child(5) { margin-bottom: 60px; }

          .hp-review-header {
            display: flex;
            align-items: flex-start;
            gap: 12px;
          }

          .hp-review-avatar {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: linear-gradient(135deg, #c8f000, #7c3aed);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-weight: 900;
            font-size: 18px;
            flex-shrink: 0;
          }

          .hp-review-info { flex: 1; }

          .hp-review-name {
            font-size: clamp(13px, 2.5vw, 14px);
            font-weight: 800;
            color: #111;
            margin-bottom: 4px;
          }

          .hp-review-date {
            font-size: clamp(11px, 2vw, 12px);
            color: #aaa;
          }

          .hp-review-stars {
            display: flex;
            gap: 4px;
            font-size: clamp(14px, 3vw, 16px);
          }
          .hp-review-stars .star { color: #ffd700; }

          .hp-review-text {
            font-size: clamp(12px, 2.5vw, 14px);
            line-height: 1.6;
            color: #666;
            flex: 1;
          }

          .hp-review-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 12px;
            border-top: 1px solid #f0f0f0;
          }

          .hp-review-rating-label {
            font-size: 12px;
            font-weight: 700;
            color: #c8f000;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .hp-review-helpful { display: flex; gap: 8px; font-size: 12px; color: #aaa; }
          .hp-review-helpful button {
            background: none; border: none; color: #888;
            cursor: pointer; font-size: 12px; transition: color 0.2s;
          }
          .hp-review-helpful button:hover { color: #c8f000; }

          /* ===== RESPONSIVE ===== */
          @media (max-width: 1024px) {
            .hp-items-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 14px; }
            .hp-review-card { width: 240px; padding: 20px; }
          }

          @media (max-width: 768px) {
            .hp-ticker-item { font-size: 11px; gap: 12px; }
            .hp-ticker-outer { padding: 8px 0; }
            .hp-wrapper { padding: 0 0 30px 0; }
            .hp-hero { margin: -8px 0 20px 0; padding: 30px 20px 24px; border-radius: 18px; }
            .hp-hero-icon-wrap { width: 60px; height: 60px; font-size: 28px; margin-bottom: 16px; }
            .hp-hero-btn { width: 100%; justify-content: center; padding: 12px 24px; font-size: 14px; }
            .hp-cat-card { width: 100px; }
            .hp-cat-img { height: 75px; }
            .hp-items-grid { grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px; padding: 0 2px; }
            .hp-reviews-section { margin-top: 40px; padding-top: 30px; }
            .hp-review-card { width: 200px; padding: 16px; }
            .hp-review-card:nth-child(1) { margin-bottom: 45px; }
            .hp-review-card:nth-child(2) { margin-bottom: 22px; }
            .hp-review-card:nth-child(3) { margin-bottom: 0px; }
            .hp-review-card:nth-child(4) { margin-bottom: 22px; }
            .hp-review-card:nth-child(5) { margin-bottom: 45px; }
            .hp-reviews-grid { padding: 45px 4px 4px; gap: 12px; }
          }

          @media (max-width: 600px) {
            .hp-ticker-item { font-size: 10.5px; gap: 10px; padding: 0 4px; }
            .hp-hero { padding: 24px 16px 20px; margin: -8px 0 18px 0; }
            .hp-hero-btn { width: 100%; justify-content: center; padding: 11px 20px; }
            .hp-category-scroll { margin-bottom: 20px !important; padding: 0 0 8px 0 !important; }
            .hp-cat-card { width: 90px !important; margin-right: 10px !important; }
            .hp-cat-img { height: 65px; }
            .hp-items-grid { grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px; }
            .hp-review-card { width: 170px; padding: 14px; }
            .hp-review-card:nth-child(1) { margin-bottom: 35px; }
            .hp-review-card:nth-child(2) { margin-bottom: 17px; }
            .hp-review-card:nth-child(3) { margin-bottom: 0px; }
            .hp-review-card:nth-child(4) { margin-bottom: 17px; }
            .hp-review-card:nth-child(5) { margin-bottom: 35px; }
          }

          @media (max-width: 480px) {
            .hp-ticker-outer { padding: 7px 0; }
            .hp-ticker-item { font-size: 10px; gap: 8px; }
            .hp-ticker-sep { font-size: 13px; margin-left: 6px; }
            .hp-wrapper { padding: 0 0 25px 0; }
            .hp-hero { padding: 20px 14px 18px; margin: -8px 0 16px 0; border-radius: 16px; }
            .hp-hero-icon-wrap { width: 52px; height: 52px; font-size: 24px; margin-bottom: 12px; }
            .hp-hero-btn { width: 100%; justify-content: center; }
            .hp-category-scroll { margin-bottom: 18px !important; max-width: 100vw !important; margin-left: -1px !important; margin-right: -1px !important; padding: 0 1px 8px 1px !important; }
            .hp-reviews-grid { gap: 10px; padding: 35px 2px 2px; }
            .hp-review-card { width: 150px; padding: 12px; }
            .hp-review-card:nth-child(1) { margin-bottom: 30px; }
            .hp-review-card:nth-child(2) { margin-bottom: 15px; }
            .hp-review-card:nth-child(3) { margin-bottom: 0px; }
            .hp-review-card:nth-child(4) { margin-bottom: 15px; }
            .hp-review-card:nth-child(5) { margin-bottom: 30px; }
            .hp-review-header { gap: 10px; }
            .hp-review-avatar { width: 40px; height: 40px; font-size: 14px; }
            .hp-cat-card { width: 80px; margin-right: 8px; }
            .hp-cat-img { height: 55px; }
            .hp-items-grid { grid-template-columns: repeat(auto-fill, minmax(85px, 1fr)); gap: 8px; padding: 0 1px; }
            .hp-review-helpful button { font-size: 11px; }
          }

          @media (max-width: 360px) {
            .hp-hero { padding: 16px 12px 16px; margin: -8px 0 14px 0; }
            .hp-hero-btn { width: 100%; justify-content: center; }
            .hp-category-scroll { margin-bottom: 16px !important; max-width: 100vw !important; margin-left: -1px !important; margin-right: -1px !important; padding: 0 1px 8px 1px !important; }
            .hp-cat-card { width: 70px !important; margin-right: 6px !important; }
            .hp-items-grid { grid-template-columns: repeat(auto-fill, minmax(75px, 1fr)); gap: 6px; }
            .hp-review-card { width: 130px; padding: 10px; }
          }

          /* Reduce motion accessibility */
          @media (prefers-reduced-motion: reduce) {
            .hp-ticker-track { animation: none; }
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

          {/* Shop by Need */}
          <div className="hp-section-title">Shop by Need</div>
          <div className="hp-category-scroll">
            {categories.map((category) => {
              const getImageUrl = () => {
                if (!category.image) return 'https://via.placeholder.com/80?text=No+Image';
                let url = category.image;
                // Fix malformed URLs: https// -> https://, http// -> http://
                url = url.replace(/^(https?):\/+/, '$1://');
                // If it's a full URL, use it
                if (url.startsWith('http://') || url.startsWith('https://')) return url;
                // Otherwise treat as relative path
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

          {/* Reviews */}
          <div className="hp-reviews-section">
            <div className="hp-reviews-header">
              <h2 className="hp-reviews-title">What Our Customers Say</h2>
              <p className="hp-reviews-subtitle">Real reviews from real customers</p>
            </div>

            <div className="hp-reviews-scroll">
              <div className="hp-reviews-grid">

                <div className="hp-review-card">
                  <div className="hp-review-header">
                    <div className="hp-review-avatar">RM</div>
                    <div className="hp-review-info">
                      <div className="hp-review-name">Rajesh Mehta</div>
                      <div className="hp-review-date">2 weeks ago</div>
                    </div>
                  </div>
                  <div className="hp-review-stars">
                    <span className="star">★</span><span className="star">★</span>
                    <span className="star">★</span><span className="star">★</span><span className="star">★</span>
                  </div>
                  <p className="hp-review-text">Excellent quality auto parts! The delivery was fast and the packaging was perfect. The items arrived in perfect condition. Highly recommend this store to all vehicle owners.</p>
                  <div className="hp-review-footer">
                    <span className="hp-review-rating-label">Verified Purchase</span>
                    <div className="hp-review-helpful"><button>👍 Helpful</button></div>
                  </div>
                </div>

                <div className="hp-review-card">
                  <div className="hp-review-header">
                    <div className="hp-review-avatar">PS</div>
                    <div className="hp-review-info">
                      <div className="hp-review-name">Priya Singh</div>
                      <div className="hp-review-date">1 month ago</div>
                    </div>
                  </div>
                  <div className="hp-review-stars">
                    <span className="star">★</span><span className="star">★</span>
                    <span className="star">★</span><span className="star">★</span><span className="star">★</span>
                  </div>
                  <p className="hp-review-text">Great collection and competitive prices. Customer service is very responsive and helpful. Already recommended them to my friends. Keep up the good work!</p>
                  <div className="hp-review-footer">
                    <span className="hp-review-rating-label">Verified Purchase</span>
                    <div className="hp-review-helpful"><button>👍 Helpful</button></div>
                  </div>
                </div>

                <div className="hp-review-card">
                  <div className="hp-review-header">
                    <div className="hp-review-avatar">AK</div>
                    <div className="hp-review-info">
                      <div className="hp-review-name">Arjun Kumar</div>
                      <div className="hp-review-date">3 weeks ago</div>
                    </div>
                  </div>
                  <div className="hp-review-stars">
                    <span className="star">★</span><span className="star">★</span>
                    <span className="star">★</span><span className="star">★</span><span className="star">★</span>
                  </div>
                  <p className="hp-review-text">Outstanding service and quality. Found exactly what I needed for my car. The prices are reasonable and the checkout process was smooth. Will definitely order again!</p>
                  <div className="hp-review-footer">
                    <span className="hp-review-rating-label">Verified Purchase</span>
                    <div className="hp-review-helpful"><button>👍 Helpful</button></div>
                  </div>
                </div>

                <div className="hp-review-card">
                  <div className="hp-review-header">
                    <div className="hp-review-avatar">VP</div>
                    <div className="hp-review-info">
                      <div className="hp-review-name">Vikram Patel</div>
                      <div className="hp-review-date">10 days ago</div>
                    </div>
                  </div>
                  <div className="hp-review-stars">
                    <span className="star">★</span><span className="star">★</span>
                    <span className="star">★</span><span className="star">★</span><span className="star">★</span>
                  </div>
                  <p className="hp-review-text">Amazing experience! Fast delivery, authentic products, and excellent communication throughout. This is my go-to shop for all auto parts now. Highly satisfied!</p>
                  <div className="hp-review-footer">
                    <span className="hp-review-rating-label">Verified Purchase</span>
                    <div className="hp-review-helpful"><button>👍 Helpful</button></div>
                  </div>
                </div>

                <div className="hp-review-card">
                  <div className="hp-review-header">
                    <div className="hp-review-avatar">NS</div>
                    <div className="hp-review-info">
                      <div className="hp-review-name">Neha Sharma</div>
                      <div className="hp-review-date">5 days ago</div>
                    </div>
                  </div>
                  <div className="hp-review-stars">
                    <span className="star">★</span><span className="star">★</span>
                    <span className="star">★</span><span className="star">★</span><span className="star">★</span>
                  </div>
                  <p className="hp-review-text">Professional team, genuine products, and fantastic deals! I've been using their services for 6 months now and never had any issues. Truly a trusted brand!</p>
                  <div className="hp-review-footer">
                    <span className="hp-review-rating-label">Verified Purchase</span>
                    <div className="hp-review-helpful"><button>👍 Helpful</button></div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
      <Navbar />
    </>
  );
};

export default Homepage;