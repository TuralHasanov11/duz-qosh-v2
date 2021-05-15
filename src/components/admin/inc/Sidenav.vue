<template>
  <div id="layoutSidenav_nav">
    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div class="sb-sidenav-menu">
        <div class="nav">
          <div class="sb-sidenav-menu-heading">Əsas</div>
          <router-link class="nav-link" :to="{name:'AdminDashboard'}">
            <div class="sb-nav-link-icon">
              <b-icon-clipboard-data></b-icon-clipboard-data>
            </div>
            İdarəetmə Paneli
          </router-link>
          <div class="sb-sidenav-menu-heading">Cədvəllər</div>
          <router-link class="nav-link" :to="{name:'AdminTasks'}">
            <div class="sb-nav-link-icon">
              <b-icon-file-earmark-text></b-icon-file-earmark-text>
            </div>
            Tapşırıqlar
          </router-link>
          <!-- <router-link class="nav-link" :to="{name:'AdminUsers'}">
            <div class="sb-nav-link-icon">
              <b-icon-file-earmark-text></b-icon-file-earmark-text>
            </div>
            İstifadəçilər
          </router-link> -->
          <router-link class="nav-link" :to="{name:'AdminCategories'}">
            <div class="sb-nav-link-icon">
             <b-icon-columns-gap></b-icon-columns-gap>
            </div>
            Kateqoriyalar
          </router-link>
         
        </div>
      </div>
    </nav>
  </div>
</template>
