import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "../components/Header";
const Home = lazy(() => import("../pages/Home/Home"));
const CssPane = lazy(() => import("../pages/CssPane/CssPane"));
const CarsProducts = lazy(() => import("../pages/CarsProducts"));
const Stories = lazy(() => import("../components/CheckboxGroup/stores"));

function Users() {
  return <h2>Users</h2>;
}

export default function LazyRouter() {
  return (
    <Router>
      <>
        <Header />
        <Suspense fallback={<div>loading...</div>}>
          <Route path="/" exact component={Home} />
          <Route path="/settings" exact component={Stories} />
          <Route path="/cars" component={CarsProducts} />
          <Route path="/users/" component={Users} />
          <Route path="/css-pane/" component={CssPane} />
        </Suspense>
      </>
    </Router>
  );
}
