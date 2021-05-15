<template>
  <main>
    <div class="container-fluid">
      <h1 class="mt-4">Tapşırıq</h1>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link :to="{name:'AdminDashboard'}">İdarəetmə Paneli</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link :to="{name:'AdminTasks'}">Tapşırıqlar</router-link>
          </li>
          <li class="breadcrumb-item active">Tapşırıq</li>
        </ol>
      </nav>

      <div id="messages-area">
        <b-alert
          :show="failed"
          variant="danger"
          @dismissed="failed = false"
          dismissible
          >{{ messages.failed }}</b-alert
        >
      </div>

      <div class="card mb-4">
        <div class="card-body">
          <template v-if="task && Object.keys(task).length > 0">
            <h5 class="card-title mb-3">{{ task.caption }}</h5>

            <b-list-group>
              <b-list-group-item class="d-flex align-items-center">
                  <b-avatar
                    icon="clock-fill"
                    variant="primary"
                    size="2em"
                  ></b-avatar>
                  <h5 class="mt-0 mb-1 mx-2">Tarix:</h5>
                  <p class="mb-0">
                    {{ task.deadline | deadlineFilter }}
                  </p>
              </b-list-group-item>
              <b-list-group-item>
                <div class="d-flex align-items-center">
                  <b-avatar variant="primary" size="2em"></b-avatar>
                  <h5 class="mt-0 mb-1 mx-2">
                    {{ task.sharer.firstName }} {{ task.sharer.lastName }} - 
                    <span class="ml-5 font-weight-bold"
                      >{{ task.sharer.rating ? task.sharer.rating : "Yeni" }}
                      <b-icon-star-fill variant="warning"></b-icon-star-fill
                    ></span>
                  </h5>
                </div>
                <p class="mx-2">
                  <b-icon-envelope-fill></b-icon-envelope-fill>
                  <span class="mx-2">{{ task.sharer.email }}</span>
                  <br />
                  <b-icon-telephone-fill></b-icon-telephone-fill>
                  <span class="mx-2">{{ task.sharer.phoneNumber }}</span>
                </p>
              </b-list-group-item>
              <b-list-group-item>
                <div class="d-flex align-items-center">
                  <b-avatar
                    variant="primary"
                    size="2em"
                    icon="columns-gap"
                  ></b-avatar>
                  <h5 class="mt-0 mb-1 mx-2">Kategoriya:  </h5>
                  <div class="badge bg-primary" variant="primary">
                    {{ task.category.name }}
                  </div>
                </div>
              </b-list-group-item>
              <b-list-group-item>
                <div class="d-flex align-items-center">
                  <b-avatar
                    variant="primary"
                    size="2em"
                    icon="trophy-fill"
                  ></b-avatar>
                  <h5 class="mt-0 mb-1 mx-2">Mükafat:</h5>
                  <p class="mb-0">{{ task.price }} &#8380;</p>
                </div>
              </b-list-group-item>
              <b-list-group-item>
                <h5 class="card-title">Məlumat</h5>
                <p class="card-text">
                  {{ task.description }}
                </p>
              </b-list-group-item>
            </b-list-group>

            <template v-if="task.status == 'PROCESSING' && task.freelancer">
              <div class="d-flex align-items-center">
                <b-avatar variant="primary" size="2em" class="mr-3"></b-avatar>
                <span
                  >{{ task.freelancer.firstName }}
                  {{ task.freelancer.lastName }}
                  <div>
                    <small>{{ task.freelancer.email }}</small>
                    <small
                      >Telefon : +994 {{ task.freelancer.phoneNumber }}</small
                    >
                  </div></span
                >
                <span class="ml-5"
                  >{{ task.freelancer.rating ? task.freelancer.rating : 0 }}
                  <b-icon-star-fill variant="warning"></b-icon-star-fill
                ></span>
              </div>
            </template>

            <template v-else-if="task.status == 'OPEN'">
              <div class="table-responsive my-5">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">İstifadəçi adı</th>
                      <th scope="col">Reytinq</th>
                      <th scope="col">Əməliyyatlar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template
                      v-if="task.appliedUsers && task.appliedUsers.length > 0"
                    >
                      <tr
                        v-for="(user, index) in task.appliedUsers"
                        :key="index"
                      >
                        <td
                          @click="reviewFreelancerModal(user)"
                          style="cursor:pointer;"
                          :id="`review-freelancer-${user.id}`"
                        >
                          {{ user.firstName }} {{ user.lastName }}
                        </td>
                        <td>
                          {{ user.rating ? user.rating : "Yeni" }}
                          <b-icon-star-fill
                            variant="warning"
                          ></b-icon-star-fill>
                        </td>
                        <td></td>
                      </tr>
                    </template>

                    <template v-else>
                      <tr>
                        <td colspan="3" class="text-center text-secondary">
                          <em>{{ messages.noneApplied }}</em>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>

              <b-modal
                id="review-freelancer-modal"
                title="İstifadəçi məlumatları"
                modal-cancel="Geriyə"
                ok-only
                cancel-variant="secondary"
              >
                <b-list-group-item
                  >Ad : {{ freelancer.firstName }}</b-list-group-item
                >
                <b-list-group-item
                  >Soyad : {{ freelancer.lastName }}</b-list-group-item
                >
                <b-list-group-item
                  >Telefon : {{ freelancer.phoneNumber }}</b-list-group-item
                >
                <b-list-group-item
                  >Email : {{ freelancer.email }}</b-list-group-item
                >
                <b-list-group-item
                  >Reyting :
                  {{
                    freelancer.rating ? freelancer.rating : 0
                  }}</b-list-group-item
                >
              </b-modal>
            </template>

            <p class="card-text my-2">
              <button @click="deleteTaskModal" class="btn btn-danger">
                Tapşırığı sil
              </button>
            </p>

            <b-modal
              id="delete-task-modal"
              @cancel="deleteTaskMessageToUser = ''"
              modal-cancel="Geriyə"
              hide-header
              hide-footer
            >
              <b-overlay :show="deleteTaskOverlay" rounded="sm">
                <div class="card card-body">
                 
                  <form @submit.prevent="deleteTask">
                    <div class="form-group">
                      <label for="`deleteTaskMessageInput`"
                        >Tapşırığın silinmə səbəbi</label
                      >
                      <input
                        type="text"
                        class="form-control my-2"
                        id="deleteTaskMessageInput"
                        v-model="deleteTaskMessageToUser"
                        placeholder="Mesaj..."
                      />
                    </div>
                    <button type="submit" class="btn btn-danger">Sil</button>
                  </form>
                  
                </div>
              </b-overlay>
            </b-modal>
          </template>

          <template v-else>
            <app-loading></app-loading>
          </template>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Loading from "@/components/inc/Loading";

export default {
  components: {
    appLoading: Loading,
  },

  created() {
    this.$store.dispatch("tasks/fetchTask", this.$route.params.id);
  },

  data() {
    return {
      failed: false,

      deleteTaskMessageToUser: "",
      deleteTaskOverlay: false,

      freelancer: {}
    };
  },
  computed: {
    task() {
      return this.$store.getters['tasks/task'];
    },

    messages() {
      return this.$store.getters['messages/all'];
    },

  },

  methods: {
    deleteTask() {
      this.deleteTaskOverlay = true;
      this.$store.dispatch("tasks/deleteTask", {
          id: this.task.id,
          message: { reason: this.deleteTaskMessageToUser }
        })
        .then(res => {
          this.$router.replace({name:'AdminTasks'});
        })
        .catch(err => {
          this.failed = true;
          this.deleteTaskOverlay = false;
          this.$bvModal.hide("delete-task-modal");
        });
    },

    deleteTaskModal() {
      this.$bvModal.show("delete-task-modal");
    },

    reviewFreelancerModal(user) {
      this.freelancer = user;
      this.$bvModal.show("review-freelancer-modal");
    }
  },

  
};
</script>
