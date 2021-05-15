<template>
  <main>
    <div class="container-fluid">
      <h1 class="mt-4">Kateqoriyalar</h1>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link :to="{name:'Admin'}">İdarəetmə Paneli</router-link>
          </li>
          <li class="breadcrumb-item active">Kateqoriyalar</li>
        </ol>
      </nav>

      <div class="card mb-4">
        <div class="card-header"><b-icon-table></b-icon-table> Kateqoriyalar</div>
        <div class="card-body">
          
          <div class="col-12 col-lg-6">
              <b-form-group
                label-for="filter-input"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                class="mb-0"
              >
                <b-input-group size="sm">
                  <b-form-input
                    id="filter-input"
                    v-model="filter"
                    type="search"
                    placeholder="Axtar"
                  ></b-form-input>

                  <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''">Sıfırla</b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </div>

            <hr>

            <div class="table-responsive">
              <b-table id="tasks-table"
                :busy="!categories || !categories.length"
                :items="categories" 
                :fields="fields"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc" 
                sort-icon-left
                :filter="filter" :filter-included-fields="filterOn"
                responsive="sm" hover 
              >
              
                <template v-slot:cell(id)="data">{{ data.item.id }}</template>

                <template v-slot:cell(name)="data">
                  {{ data.item.name}}</template>

                <template v-slot:cell(numberOfTasks)="data">
                  {{data.item.numberOfTasks}}
                </template>

                <template v-slot:cell(operations)="data">
                  <!-- <router-link
                    tag="a"
                    :to="{name:'AdminCategoriesShow', params:{category:data.item.id}}"
                    class="btn btn-info"
                  >
                    Tapşıqırlar <b-icon-folder-fill></b-icon-folder-fill>
                  </router-link> -->
                </template>

                <template #table-busy>
                  <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Yüklənir...</strong>
                  </div>
                </template>
              </b-table>
            </div>

          </div>
          
            

        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Loading from "@/components/inc/Loading";
export default {
  components: {
    appLoading: Loading
  },
  created(){
    this.$store.dispatch('categories/fetchCategories');
  },
  data() {
    return {
      isBusy: true,
      filter:null,
      sortBy: 'name',
      filterOn: [],

      failed: false,
      sortDesc: false,
      fields: [
        { key: "id", label:"ID", sortable: true },
        { key: "name", label:"Ad", sortable: true },
        { key: "numberOfTasks", label:"Tapşırıq sayı", sortable: true },
        { key: "operations", label:"Əməliyyatlar" }
      ]
    };
  },
  computed: {
    categories() {
      return this.$store.getters['categories/categories'];
    },
  },

};
</script>
