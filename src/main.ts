import React from "react";
import { render } from "react-dom";
import App from "./App";
import Vue from 'vue';
import VueApp from './App.vue';

const root = document.getElementById("root");
const app = document.getElementById("app");
if (root) {
  render(React.createElement(App, null, null), root);
} else {
  new Vue({
    el: app,
    render: h => h(VueApp)
  });
}
