<template>
  <div>
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/admin"
        >{{ appName }} Admin</router-link
      >
      <button
        class="btn btn-link btn-sm order-1 order-lg-0"
        id="sidebarToggle"
        href="#"
      >
        <b-icon-justify></b-icon-justify>
      </button>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right v-if="admin">
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <b>{{ admin.firstName }} {{ admin.lastName }}</b>
            <b-icon-person-fill></b-icon-person-fill>
          </template>
          <b-dropdown-item class="text-center">
            <router-link to="/" class="btn btn-light">
              Geri dön
              <span class="ml-1">
                <b-icon-laptop></b-icon-laptop>
              </span>
            </router-link>
          </b-dropdown-item>
          <b-dropdown-item @click="logout" class="text-center">
            <button class="btn btn-danger">Çıxış</button>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(res => {
          window.location.replace("/login");
        })
        .catch(err => {
          alert("Failed!");
        });
    }
  },

  computed: {
    admin() {
      return this.$store.getters['user/user'];
    },
    appName() {
      return this.$store.state.appName;
    }
  }
};
</script>
