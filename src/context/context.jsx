import React, { createContext, useState } from "react";
import runChat from "../config/geminiai";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentpromopt, setRecentpromopt] = useState();
  const [pevpromopts, setPevpromopts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const onSent = async (prompt) => {
    try {
      setLoading(true);
      console.log("Prompt sent:", prompt);
      const result = await runChat(prompt);
      console.log("Gemini response:", result);
      setResultData(result);
      setShowResult(true);
    } catch (error) {
      console.error("Error in onSent:", error);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    input,
    setInput,
    recentpromopt,
    setRecentpromopt,
    pevpromopts,
    setPevpromopts,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    onSent,
  };

  // Return the provider with the value prop
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
