 import React, { createContext, useState, useRef } from "react";
import runChat from "../config/geminiai";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const timerRefs = useRef([]); // Store timer IDs to cancel them

  const delaypara = (index, nextSegment) => {
    const timer = setTimeout(() => {
      setResultData((prev) => prev + nextSegment);
    }, 75 * index);
    timerRefs.current.push(timer); // Store the timer ID
  };

  const clearTimers = () => {
    timerRefs.current.forEach((timer) => clearTimeout(timer)); // Clear all timers
    timerRefs.current = []; // Reset the array
  };

  const onSent = async (prompt, isNewPrompt = false) => {
    try {
      setLoading(true);
      setResultData(""); // Clear previous result
      clearTimers(); // Cancel any ongoing timers
      setShowResult(true); // Show result section

      // Use prompt if provided (e.g., from Sidebar), otherwise use input
      const effectivePrompt = prompt || input;
      console.log(
        "onSent called with prompt:",
        prompt,
        "isNewPrompt:",
        isNewPrompt,
        "effectivePrompt:",
        effectivePrompt
      );
      const result = await runChat(effectivePrompt); // Get API response

      // Add to prevPrompts only for new prompts
      if (isNewPrompt && effectivePrompt.trim()) {
        setPrevPrompts((prev) => {
          const newPrompts = [...prev, effectivePrompt];
          console.log("Updated prevPrompts:", newPrompts);
          return newPrompts.slice(-10); // Limit to 10 prompts
        });
      }

      console.log("Gemini response:", result);

      // Process response for bold text
      let responseArray = result.split("**");
      let newResponse = "";
      for (let i = 0; i < responseArray.length; i++) {
        if (i % 2 === 0) {
          newResponse += responseArray[i]; // Non-bold text
        } else {
          newResponse += `<b>${responseArray[i]}</b>`; // Bold text
        }
      }

      // Split into segments, preserving HTML tags
      const segments = [];
      let currentSegment = "";
      let insideTag = false;

      for (let i = 0; i < newResponse.length; i++) {
        const char = newResponse[i];
        if (char === "<") {
          insideTag = true;
          if (currentSegment) {
            segments.push(currentSegment + " ");
            currentSegment = "";
          }
        } else if (char === ">") {
          insideTag = false;
        }

        currentSegment += char;

        if (!insideTag && char === " " && currentSegment.trim()) {
          segments.push(currentSegment);
          currentSegment = "";
        }
      }
      if (currentSegment) {
        segments.push(currentSegment);
      }

      // Set recentPrompt after the response is processed
      setRecentPrompt(effectivePrompt);

      // Append segments with typewriter effect
      for (let i = 0; i < segments.length; i++) {
        delaypara(i, segments[i]);
      }

      // Only clear input if the prompt came from the input box
      if (!prompt) {
        setInput(""); // Clear input only for user-typed prompts
      }
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
