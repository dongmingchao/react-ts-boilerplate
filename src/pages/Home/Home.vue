<template>
  <div ref="main"></div>
</template>

<script>
import Home from './Home';
import React from 'react';
import { render } from 'react-dom';

export default {
  name: 'Home',
  mounted() {
    render(React.createElement(Home, null, null), this.$refs.main);
  }
}
</script>

<style>

</style>