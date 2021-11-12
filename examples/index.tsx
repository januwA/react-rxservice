import "reflect-metadata";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/app";
import About from "./pages/about";
import Todos from "./pages/todos";
import TestPage from "./pages/test";
import SetMapPage from "./pages/set-map";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="about" element={<About />} />
      <Route path="todos" element={<Todos />} />
      <Route path="set-map" element={<SetMapPage />} />
      <Route path="test" element={<TestPage />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
