import React from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import TagDetails from "./pages/TagDetails";
import Playground from "./pages/Playground";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";

const active = ({ isActive }) => ({ opacity: isActive ? 1 : 0.7, fontWeight: isActive ? 700 : 500 });

export default function App() {
  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className="nav">
            <Link to="/">
              <div>
                <div className="badge">HTML Tags Tutor</div>
                <div className="small">Інтерактивний посібник</div>
              </div>
            </Link>
            <div className="navlinks">
              <NavLink to="/" style={active} className="btn">Теги</NavLink>
              <NavLink to="/playground" style={active} className="btn">Спробуй</NavLink>
              <NavLink to="/quiz" style={active} className="btn">Тест</NavLink>
              <NavLink to="/results" style={active} className="btn">Результати</NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tags/:slug" element={<TagDetails />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </>
  );
}
