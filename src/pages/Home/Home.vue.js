import Home from './Home';
import React from 'react';
import { render } from 'react-dom';
import Vue from 'vue/dist/vue.esm.js';

export default Vue.extend({
  template: '<div ref="main"></div>',
  name: 'Home',
  mounted() {
    render(React.createElement(Home, null, null), this.$refs.main);
  },
});