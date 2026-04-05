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
            margin: -8px 0 24px 0;
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
            font-size: clamp(18px, 5vw, 20px);
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
            padding: 0 0 8px 0;
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
            font-size: clamp(11px, 2vw, 13px);
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
            padding: clamp(40px, 10vw, 60px) 20px;
            background: #fff;
            border-radius: 20px;
            color: #aaa;
            font-size: clamp(13px, 3vw, 15px);
          }

          /* ===== REVIEWS SECTION ===== */
          .hp-reviews-section {
            margin-top: 48px;
            padding-top: 40px;
            border-top: 2px solid #e0e0e0;
          }

          .hp-reviews-header {
            text-align: center;
            margin-bottom: 40px;
          }

          .hp-reviews-title {
            font-size: clamp(24px, 6vw, 28px);
            font-weight: 900;
            color: #111;
            margin-bottom: 8px;
          }

          .hp-reviews-subtitle {
            font-size: clamp(12px, 3vw, 14px);
            color: #888;
          }

          /* ── STAGGERED MASONRY LAYOUT ── */
          /* Outer scroll wrapper for mobile */
          .hp-reviews-scroll {
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
            padding-bottom: 12px;
          }
          .hp-reviews-scroll::-webkit-scrollbar { display: none; }

          /* The flex row of columns */
          .hp-reviews-grid {
            display: flex;
            align-items: flex-end;   /* cards sit at the bottom baseline */
            gap: 16px;
            padding: 60px 4px 4px;  /* top padding gives room for the tallest stagger */
            min-width: max-content;  /* keeps columns from wrapping on small screens */
          }

          /* Each review card — stagger via margin-bottom */
          .hp-review-card {
            background: #fff;
            border-radius: 20px;
            padding: 24px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            gap: 16px;
            width: 260px;           /* fixed width per card */
            flex-shrink: 0;
          }

          .hp-review-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          }

          /* Stagger: alternate cards up and down like the screenshot */
          /* Card 1 — short, sits high */
          .hp-review-card:nth-child(1) { margin-bottom: 60px; }
          /* Card 2 — medium height */
          .hp-review-card:nth-child(2) { margin-bottom: 30px; }
          /* Card 3 — tallest, sits at baseline (no extra margin) */
          .hp-review-card:nth-child(3) { margin-bottom: 0px; }
          /* Card 4 — medium */
          .hp-review-card:nth-child(4) { margin-bottom: 30px; }
          /* Card 5 — short again */
          .hp-review-card:nth-child(5) { margin-bottom: 60px; }

          /* Review header with avatar and name */
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

          .hp-review-info {
            flex: 1;
          }

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

          /* Star rating */
          .hp-review-stars {
            display: flex;
            gap: 4px;
            font-size: clamp(14px, 3vw, 16px);
          }

          .hp-review-stars .star {
            color: #ffd700;
          }

          /* Review text */
          .hp-review-text {
            font-size: clamp(12px, 2.5vw, 14px);
            line-height: 1.6;
            color: #666;
            flex: 1;
          }

          /* Review footer */
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

          .hp-review-helpful {
            display: flex;
            gap: 8px;
            font-size: 12px;
            color: #aaa;
          }

          .hp-review-helpful button {
            background: none;
            border: none;
            color: #888;
            cursor: pointer;
            font-size: 12px;
            transition: color 0.2s;
          }

          .hp-review-helpful button:hover {
            color: #c8f000;
          }

          /* Responsive — on small screens collapse to vertical single column */
          @media (max-width: 1024px) {
            .hp-items-grid {
              grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
              gap: 14px;
            }
            .hp-review-card {
              width: 240px;
              padding: 20px;
            }
          }

          @media (max-width: 768px) {
            .hp-wrapper {
              padding: 0 0 30px 0;
            }
            .hp-hero {
              margin: -8px 0 20px 0;
              padding: 30px 20px 24px;
              border-radius: 18px;
            }
            .hp-hero-icon-wrap {
              width: 60px;
              height: 60px;
              font-size: 28px;
              margin-bottom: 16px;
            }
            .hp-hero-btn {
              display: flex;
              width: 100%;
              justify-content: center;
              padding: 12px 24px;
              font-size: 14px;
            }
            .hp-cat-card {
              width: 100px;
            }
            .hp-cat-img {
              height: 75px;
            }
            .hp-items-grid {
              grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
              gap: 12px;
              padding: 0 2px;
            }
            .hp-reviews-title {
              font-size: clamp(20px, 6vw, 26px);
            }
            .hp-reviews-section {
              margin-top: 40px;
              padding-top: 30px;
            }
            .hp-review-card {
              width: 200px;
              padding: 16px;
            }
            .hp-review-card:nth-child(1) { margin-bottom: 45px; }
            .hp-review-card:nth-child(2) { margin-bottom: 22px; }
            .hp-review-card:nth-child(3) { margin-bottom: 0px; }
            .hp-review-card:nth-child(4) { margin-bottom: 22px; }
            .hp-review-card:nth-child(5) { margin-bottom: 45px; }
            .hp-reviews-grid {
              padding: 45px 4px 4px;
              gap: 12px;
            }
          }

          @media (max-width: 600px) {
            .hp-hero {
              padding: 24px 16px 20px;
              margin: -8px 0 18px 0;
            }
            .hp-hero-btn {
              display: flex;
              width: 100%;
              justify-content: center;
              padding: 11px 20px;
            }
            .hp-cat-card {
              width: 90px;
              margin-right: 10px;
            }
            .hp-cat-img {
              height: 65px;
            }
            .hp-items-grid {
              grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
              gap: 10px;
            }
            .hp-review-card {
              width: 170px;
              padding: 14px;
            }
            .hp-review-card:nth-child(1) { margin-bottom: 35px; }
            .hp-review-card:nth-child(2) { margin-bottom: 17px; }
            .hp-review-card:nth-child(3) { margin-bottom: 0px; }
            .hp-review-card:nth-child(4) { margin-bottom: 17px; }
            .hp-review-card:nth-child(5) { margin-bottom: 35px; }
          }

          @media (max-width: 480px) {
            .hp-wrapper {
              padding: 0 0 25px 0;
            }
            .hp-hero {
              padding: 20px 14px 18px;
              margin: -8px 0 16px 0;
              border-radius: 16px;
            }
            .hp-hero-icon-wrap {
              width: 52px;
              height: 52px;
              font-size: 24px;
              margin-bottom: 12px;
            }
            .hp-hero-btn {
              display: flex;
              width: 100%;
              justify-content: center;
            }
            .hp-reviews-grid {
              gap: 10px;
              padding: 35px 2px 2px;
            }
            .hp-review-card {
              width: 150px;
              padding: 12px;
            }
            .hp-review-card:nth-child(1) { margin-bottom: 30px; }
            .hp-review-card:nth-child(2) { margin-bottom: 15px; }
            .hp-review-card:nth-child(3) { margin-bottom: 0px; }
            .hp-review-card:nth-child(4) { margin-bottom: 15px; }
            .hp-review-card:nth-child(5) { margin-bottom: 30px; }
            .hp-review-header {
              gap: 10px;
            }
            .hp-review-avatar {
              width: 40px;
              height: 40px;
              font-size: 14px;
            }
            .hp-cat-card {
              width: 80px;
              margin-right: 8px;
            }
            .hp-cat-img {
              height: 55px;
            }
            .hp-items-grid {
              grid-template-columns: repeat(auto-fill, minmax(85px, 1fr));
              gap: 8px;
              padding: 0 1px;
            }
            .hp-review-helpful {
              font-size: 11px;
            }
            .hp-review-helpful button {
              font-size: 11px;
            }
          }

          @media (max-width: 360px) {
            .hp-hero {
              padding: 16px 12px 16px;
              margin: -8px 0 14px 0;
            }
            .hp-hero-btn {
              display: flex;
              width: 100%;
              justify-content: center;
            }
            .hp-cat-card {
              width: 70px;
              margin-right: 6px;
            }
            .hp-items-grid {
              grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
              gap: 6px;
            }
            .hp-review-card {
              width: 130px;
              padding: 10px;
            }
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

          {/* Reviews Section */}
          <div className="hp-reviews-section">
            <div className="hp-reviews-header">
              <h2 className="hp-reviews-title">What Our Customers Say</h2>
              <p className="hp-reviews-subtitle">Real reviews from real customers</p>
            </div>

            {/* Scrollable staggered row */}
            <div className="hp-reviews-scroll">
              <div className="hp-reviews-grid">

                {/* Review 1 */}
                <div className="hp-review-card">
                  <div className="hp-review-header">
                    <div className="hp-review-avatar">RM</div>
                    <div className="hp-review-info">
                      <div className="hp-review-name">Rajesh Mehta</div>
                      <div className="hp-review-date">2 weeks ago</div>
                    </div>
                  </div>
                  <div className="hp-review-stars">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <p className="hp-review-text">
                    Excellent quality auto parts! The delivery was fast and the packaging was perfect. The items arrived in perfect condition. Highly recommend this store to all vehicle owners.
                  </p>
                  <div className="hp-review-footer">
                    <span className="hp-review-rating-label">Verified Purchase</span>
                    <div className="hp-review-helpful">
                      <button>👍 Helpful</button>
                    </div>
                  </div>
                </div>

                {/* Review 2 */}
                <div className="hp-review-card">
                  <div className="hp-review-header">
                    <div className="hp-review-avatar">PS</div>
                    <div className="hp-review-info">
                      <div className="hp-review-name">Priya Singh</div>
                      <div className="hp-review-date">1 month ago</div>
                    </div>
                  </div>
                  <div className="hp-review-stars">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <p className="hp-review-text">
                    Great collection and competitive prices. Customer service is very responsive and helpful. Already recommended them to my friends. Keep up the good work!
                  </p>
                  <div className="hp-review-footer">
                    <span className="hp-review-rating-label">Verified Purchase</span>
                    <div className="hp-review-helpful">
                      <button>👍 Helpful</button>
                    </div>
                  </div>
                </div>

                {/* Review 3 */}
                <div className="hp-review-card">
                  <div className="hp-review-header">
                    <div className="hp-review-avatar">AK</div>
                    <div className="hp-review-info">
                      <div className="hp-review-name">Arjun Kumar</div>
                      <div className="hp-review-date">3 weeks ago</div>
                    </div>
                  </div>
                  <div className="hp-review-stars">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <p className="hp-review-text">
                    Outstanding service and quality. Found exactly what I needed for my car. The prices are reasonable and the checkout process was smooth. Will definitely order again!
                  </p>
                  <div className="hp-review-footer">
                    <span className="hp-review-rating-label">Verified Purchase</span>
                    <div className="hp-review-helpful">
                      <button>👍 Helpful</button>
                    </div>
                  </div>
                </div>

                {/* Review 4 */}
                <div className="hp-review-card">
                  <div className="hp-review-header">
                    <div className="hp-review-avatar">VP</div>
                    <div className="hp-review-info">
                      <div className="hp-review-name">Vikram Patel</div>
                      <div className="hp-review-date">10 days ago</div>
                    </div>
                  </div>
                  <div className="hp-review-stars">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <p className="hp-review-text">
                    Amazing experience! Fast delivery, authentic products, and excellent communication throughout. This is my go-to shop for all auto parts now. Highly satisfied!
                  </p>
                  <div className="hp-review-footer">
                    <span className="hp-review-rating-label">Verified Purchase</span>
                    <div className="hp-review-helpful">
                      <button>👍 Helpful</button>
                    </div>
                  </div>
                </div>

                {/* Review 5 */}
                <div className="hp-review-card">
                  <div className="hp-review-header">
                    <div className="hp-review-avatar">NS</div>
                    <div className="hp-review-info">
                      <div className="hp-review-name">Neha Sharma</div>
                      <div className="hp-review-date">5 days ago</div>
                    </div>
                  </div>
                  <div className="hp-review-stars">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <p className="hp-review-text">
                    Professional team, genuine products, and fantastic deals! I've been using their services for 6 months now and never had any issues. Truly a trusted brand!
                  </p>
                  <div className="hp-review-footer">
                    <span className="hp-review-rating-label">Verified Purchase</span>
                    <div className="hp-review-helpful">
                      <button>👍 Helpful</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Homepage;