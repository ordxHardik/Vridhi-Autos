import React from "react";

const Spinner = () => {
  return (
    <>
      <style>{`
                @keyframes spinRing {
                    to { transform: rotate(360deg); }
                }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.08); }
                }
                @keyframes overlayFade {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .jauter-spinner-overlay {
                    position: fixed;
                    top: 0; left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(240,240,240,0.85);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    backdrop-filter: blur(4px);
                    animation: overlayFade 0.25s ease;
                    gap: 16px;
                }
                .jauter-spinner-ring {
                    width: 52px;
                    height: 52px;
                    border: 5px solid #e0e0e0;
                    border-top-color: #c8f000;
                    border-right-color: #111;
                    border-radius: 50%;
                    animation: spinRing 0.7s linear infinite;
                }
                .jauter-spinner-logo {
                    background: #c8f000;
                    border-radius: 50px;
                    padding: 8px 18px;
                    font-size: 14px;
                    font-weight: 900;
                    color: #111;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    animation: pulse 1.4s ease-in-out infinite;
                }
                .jauter-spinner-logo-dot {
                    width: 10px;
                    height: 10px;
                    background: #111;
                    border-radius: 50%;
                }
            `}</style>
      <div className="jauter-spinner-overlay">
        <div className="jauter-spinner-ring" />
        <div className="jauter-spinner-logo">
          <span className="jauter-spinner-logo-dot" />
          Loading...
        </div>
      </div>
    </>
  );
};

export default Spinner;