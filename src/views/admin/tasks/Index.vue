<template>
  <main>
    <div class="container-fluid">
      <h1 class="mt-4">Tapşırıqlar</h1>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link :to="{name:'AdminDashboard'}">İdarəetmə Paneli</router-link>
          </li>
          <li class="breadcrumb-item active">Tapşırıqlar</li>
        </ol>
      </nav>

      <div id="messages-area" ref="messagesArea">
        <b-alert
          :show="failed"
          variant="danger"
          @dismissed="failed = false"
          dismissible
          >{{ messages.failed }}</b-alert
        >

        

        <b-alert
          :show="deletedSuccess"
          variant="success"
          @dismissed="deletedSuccess = false"
          dismissible
        >
          No# :
          <b>{{ taskToDelete.id }}</b>
          {{ messages.deleted }}
        </b-alert>
      </div>

        

      <div class="card mb-4">
        <div class="card-header"><b-icon-table></b-icon-table> Tapşırıqlar</div>
        <div class="card-body">

          <div class="row">
            <div class="col-12 col-lg-6">
              <b-form-group
                label="Filter"
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
          </div>
          
            <div class="table-responsive">
              <b-table id="tasks-table"
                :busy="!tasks || !tasks.length"
                :items="tasks" :fields="fields"
                :sort-desc.sync="sortDesc" sort-icon-left
                :filter="filter" :filter-included-fields="filterOn"
                responsive="sm"
              >
              
                <template v-slot:cell(id)="data">{{ data.item.id }}</template>

                <template v-slot:cell(caption)="data">{{
                  data.item.caption
                }}</template>

                <template v-slot:cell(category)="data">
                  <div v-if="data.value">{{ data.value.name }}</div>
                </template>

                <template v-slot:cell(price)="data"
                  >{{ data.item.price ? data.item.price : 0 }} AZN</template
                >

                <template v-slot:cell(sharer)="data">
                  <div v-if="data.value">
                    {{ data.value.firstName }} {{ data.value.lastName }}
                  </div>
                </template>

                <template v-slot:cell(operations)="data">
                  <button
                    class="btn btn-danger mx-1"
                    @click="deleteTaskModal(data)"
                  >
                    <b-icon-trash-fill></b-icon-trash-fill>
                  </button>
                  <router-link
                    tag="a"
                    :to="{name:'AdminTasksShow', params:{task:data.item.id}}"
                    class="btn btn-info"
                  >
                    Ətraflı <b-icon-folder-fill></b-icon-folder-fill>
                  </router-link>
                </template>

                <template #table-busy>
                  <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Yüklənir...</strong>
                  </div>
                </template>
              </b-table>
            </div>

            <nav aria-label="...">
              <ul class="pagination">
                <li class="page-item" :class="{disabled:!prevPage}">
                  <router-link tag="a" class="page-link" :to="{ name: 'AdminTasks', query: { page: prevPage }}"> <span aria-hidden="true">&laquo;</span></router-link>
                </li>
                <li class="page-item" :class="{disabled:!nextPage}">
                  <router-link tag="a" class="page-link" :to="{ name: 'AdminTasks', query: { page: nextPage }}"> <span aria-hidden="true">&raquo;</span></router-link>
                </li>
              </ul>
              <p>Səhifə: {{this.currentPage}}</p>
            </nav>

            

            <!-- <app-pagination :items="{route:'AdminTasks', per_page:pagination.tasksPerPage}"></app-pagination> -->

          <b-modal
            id="delete-task-modal"
            @cancel="deleteTaskMessageToUser = ''"
            modal-cancel="Geriyə"
            hide-footer
          >
            <b-overlay :show="deleteTaskOverlay" rounded="sm">
                <form @submit.prevent="deleteTask">

                  <div class="form-group">
                    <label :for="`deleteTaskMessageInput-${taskToDelete.id}`"
                      >{{ taskToDelete.caption }} adlı tapşırığın silinmə
                      səbəbi</label
                    >
                    <input
                      type="text"
                      class="form-control my-2"
                      :id="`deleteTaskMessageInput-${taskToDelete.id}`"
                      v-model="deleteTaskMessageToUser"
                      placeholder="Mesaj..."
                    />
                  </div>
                
                  <button type="submit" class="btn btn-danger">Sil</button>
                </form>
            </b-overlay>
          </b-modal>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Loading from "@/components/inc/Loading";
import Pagination from '@/components/inc/Pagination';

export default {
  components: {
    appLoading: Loading,
    appPagination:Pagination
  },

  created(){
    this.$store.dispatch('tasks/fetchTasks', this.$route.query.page);
  },
  data() {
    return {
      filter:null,
      filterOn: [],

      page: 1,
      failed: false,
      deletedSuccess: false,

      taskToDelete: {},
      deleteTaskMessageToUser: "",
      deleteTaskOverlay: false,

      sortDesc: false,
      fields: [
        { key: "id", label:"ID", sortable: true },
        { key: "caption", label:"Başlıq", sortable: true },
        { key: "category", label:"Kateqoriya", sortable: true },
        { key: "price", label:"Mükafat", sortable: true },
        { key: "sharer", label:"Paylaşan İstifadəçi", sortable: true },
        { key: "operations", label:"Əməliyyatlar" }
      ],
    };
  },
  computed: {
    tasks() {
      return this.$store.getters['tasks/tasks'];
    },

    pagination() {
      return this.$store.getters['tasks/pagination'];
    },

    messages() {
      return this.$store.getters['messages/all'];
    },

    prevPage(){
      return this.$route.query.page>1?this.$route.query.page-1:null;
    },

    nextPage(){
      if(this.tasks && this.tasks.length == this.pagination.tasksPerPage){
        return this.$route.query.page > 1 ? this.$route.query.page + 1 : 2;
      }
      return null;
    },

    currentPage(){
      return this.$route.query.page ? this.$route.query.page : 1;
    }
  },

  methods: {
    
    deleteTask() {
      this.deleteTaskOverlay = true;
      this.$store.dispatch("tasks/deleteTask", {
          taskId: this.taskToDelete.id,
          message: { reason: this.deleteTaskMessageToUser }
        })
        .then(res => {
          this.deletedSuccess = true;
          this.deleteTaskOverlay = false;
          this.$bvModal.hide("delete-task-modal");
          this.deleteTaskMessageToUser = "";
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        })
        .catch(err => {
          this.failed = true;
          this.deleteTaskOverlay = false;
          this.taskToDelete = {};
          this.deleteTaskMessageToUser = "";
          this.$bvModal.hide("delete-task-modal");
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        });
    },

    deleteTaskModal(task) {
      this.taskToDelete = task.item;
      this.$bvModal.show("delete-task-modal");
    }
  },

   watch: {
      $route(to, from) {
          this.$store.dispatch('tasks/fetchTasks', to.query.page);
      }
  },
};
</script>
