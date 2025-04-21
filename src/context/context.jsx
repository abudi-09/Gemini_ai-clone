import React, { createContext, useState } from "react";
import runChat from "../config/geminiai";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState(""); // Fixed typo
  const [prevPrompts, setPrevPrompts] = useState([]); // Fixed typo
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delaypara (index , nextword ) =>{
     
  }

  const onSent = async (prompt) => {
    try {
      setLoading(true);
      setResultData("");
      setShowResult(true);
      setRecentPrompt(input); // Update recent prompt
      setPrevPrompts((prev) => [...prev, input]); // Add to prompt history
      console.log("Prompt sent:", input);
      const result = await runChat(input); // Get API response
      let responseArray = Response.split  ("**")
      let newArray ; 
      
      console.log("Gemini response:", result);
      setResultData(result); // Fix: Set resultData to the API response
      setInput(""); // Clear input
    } catch (error) {
      console.error("Error in onSent:", error);
      setResultData("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Ensure loading is false
    }
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    onSent,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
