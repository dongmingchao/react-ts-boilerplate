import React, { Suspense, lazy } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "../components/Header";
const Home = lazy(() => import("../pages/Home/Home"));
const CssPane = lazy(() => import("../pages/CssPane/CssPane"));
const CarsProducts = lazy(() => import("../pages/CarsProducts"));

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
          <Route path="/cars" component={CarsProducts} />
          <Route path="/users/" component={Users} />
          <Route path="/css-pane/" component={CssPane} />
        </Suspense>
      </>
    </Router>
  );
}
