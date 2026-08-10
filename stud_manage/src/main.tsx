// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./styles/Navbar.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "./styles/theme.css";
// import App from "./App";


// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

// import "./styles/Navbar.css";
// import "./styles/theme.css";

// import App from "./App";

// ReactDOM.createRoot(
//     document.getElementById("root")!
// ).render(

//     <React.StrictMode>

//         <BrowserRouter>

//             <App />

//         </BrowserRouter>

//     </React.StrictMode>

// );


import React from "react";
import ReactDOM from "react-dom/client";

import {
    BrowserRouter
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./styles/Navbar.css";
import "./styles/theme.css";

import App from "./App";

import {
    ThemeProvider
} from "./context/ThemeContext";


ReactDOM.createRoot(
    document.getElementById("root")!
).render(

    <React.StrictMode>

        <BrowserRouter>

            <ThemeProvider>

                <App />

            </ThemeProvider>

        </BrowserRouter>

    </React.StrictMode>

);