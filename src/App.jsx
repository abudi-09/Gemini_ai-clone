import React from "react";
import Sidebar from "./component/sidebar/sidebar";
import Main from "./component/main/main";
import { Context } from "./context/context";
export const App = () => {
  return (
    <>
      <Sidebar />
      <Main />
      <Context />
    </>
  );
};
export default App;
