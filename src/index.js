import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { registerServiceWorker } from "./config/serviceWorker";
import { StateProvider } from "./config/StateProvider";

ReactDOM.render(
  <React.StrictMode>
    {/* <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider> */}
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

registerServiceWorker();
// reportWebVitals();
