import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/settings">设置</Link>
      </li>
      <li>
        <Link to="/cars">函数式编程练习</Link>
      </li>
      <li>
        <Link to="/css-pane/">CSS Modules演示</Link>
      </li>
    </ul>
  );
}
