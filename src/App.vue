<template>
  <div id="app">
    <component :is="layout">
      <router-view :layout.sync="layout"></router-view>
    </component>
  </div>
</template>

<script>
export default {
  data() {
    return {
      layout: "div"
    };
  },
};
</script>
