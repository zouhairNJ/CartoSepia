import { React, StrictMode } from "react";

// import ReactDOM from 'react-dom';
// import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";

// );
import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
