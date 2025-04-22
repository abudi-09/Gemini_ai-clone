import React, { useContext } from "react";
import "./main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
import DOMPurify from "dompurify";

export const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const handleCardClick = (prompt) => {
    if (!loading) {
      onSent(prompt, true); // Treat as a new prompt
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img className="img" src={assets.user_icon} alt="User Icon" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Suggest beautiful places to see on an upcoming road trip"
                  )
                }
              >
                <p className="p1">
                  Suggest beautiful places to see on an upcoming road trip
                </p>
                <img className="img1" src={assets.compass_icon} alt="Compass" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Discover hidden mountain passes, lakeside roads, and valleys"
                  )
                }
              >
                <p className="p1">
                  Discover hidden mountain passes, lakeside roads, and valleys
                </p>
                <img className="img1" src={assets.bulb_icon} alt="Idea" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Cruise through pine-scented forests, coastal cliffs, and golden deserts"
                  )
                }
              >
                <p className="p1">
                  Cruise through pine-scented forests, coastal cliffs, and
                  golden deserts
                </p>
                <img className="img1" src={assets.message_icon} alt="Chat" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "From starry night skies to waterfall-filled canyons — this road trip has it all"
                  )
                }
              >
                <p className="p1">
                  From starry night skies to waterfall-filled canyons — this
                  road trip has it all
                </p>
                <img className="img1" src={assets.code_icon} alt="Code" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            {loading ? (
              <div className="loader">
                <hr />
                <hr />
                <hr />
              </div>
            ) : (
              <>
                <div className="result-title">
                  <img src={assets.user_icon} alt="User Icon" />
                  <p>{recentPrompt || "No prompt entered"}</p>
                </div>
                <div className="result-data">
                  <img src={assets.gemini_icon} alt="Gemini Icon" />
                  {resultData ? (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(resultData),
                      }}
                    ></p>
                  ) : (
                    <p>No response received. Please try again.</p>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="text"
              type="text"
              placeholder="Enter your prompt here"
            />
            <img className="img2" src={assets.gallery_icon} alt="Gallery" />
            <img className="img2" src={assets.mic_icon} alt="Mic" />
            {input.trim() && (
              <img
                onClick={() => !loading && onSent(input, true)}
                className="img2"
                src={assets.send_icon}
                alt="Send"
              />
            )}
          </div>
          <p className="bottom-info">Made with ❤️ by Gemini AI Clone</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
