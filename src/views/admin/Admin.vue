<template>
  <div id="admin">
    <router-view></router-view>
  </div>
</template>

<script>
import AdminLayout from "@/layouts/AdminLayout";

export default {
  created() {
    this.$emit(`update:layout`, AdminLayout);
  }
};
</script>
