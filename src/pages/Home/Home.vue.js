import Home from './Home';
import React from 'react';
import ReactDom from 'react-dom';

export default {
  render(createElement) {
    return createElement('div', {
      ref: 'main',
    });
  },
  mounted() {
    ReactDom.render(React.createElement(Home, null, null), this.$refs.main);
  },
};