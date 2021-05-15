<template>
  <div>
    <!-- header -->
    <app-navbar></app-navbar>
    <div id="layoutSidenav">
      <app-sidenav></app-sidenav>
      <div id="layoutSidenav_content">
        <main>
          <slot></slot>
        </main>
        <app-footer></app-footer>
      </div>
    </div>

    <!-- footer -->
  </div>
</template>

<script>
import Navbar from "@/components/admin/inc/Navbar";
import Sidenav from "@/components/admin/inc/Sidenav";
import Footer from "@/components/admin/inc/Footer";

export default {
  components: {
    appNavbar: Navbar,
    appSidenav: Sidenav,
    appFooter: Footer
  }
};
</script>
