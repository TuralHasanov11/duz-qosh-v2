<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col mb-5">

        <div id="messages-area" ref="messagesArea">
            <b-alert
              :show="failed"
              variant="danger"
              @dismissed="failed = false"
              dismissible
              >{{ messages.failed }}</b-alert
            >
          </div>

          <template v-if="task && Object.keys(task).length > 0">
            <form
              @submit.prevent="onSubmit()"
              class="p-md-5 bg-white"
              method="post"
            >
              <div class="row form-group">
                <div class="col-md-12 mb-3 mb-md-0">
                  <label class="font-weight-bold" for="title">Başlıq</label>
                  <input
                    type="text"
                    v-model="task.caption"
                    id="title"
                    class="form-control"
                    placeholder
                    @blur="$v.task.caption.$touch()"
                    :class="{ 'is-invalid': $v.task.caption.$error }"
                  />
                  <small
                    :class="{ 'invalid-feedback': !$v.task.caption.minLength }"
                    >{{ messages.caption.minLength }}</small
                  >
                  <div
                    class="invalid-feedback"
                    v-if="!$v.task.caption.required"
                  >
                    {{ messages.required }}
                  </div>
                </div>
              </div>

              <div class="row form-group">
                <div class="col-md-12">
                  <h3>Məlumat</h3>
                </div>
                <div class="col-md-12 mb-3 mb-md-0">
                  <textarea
                    name
                    v-model="task.description"
                    class="form-control"
                    cols="30"
                    rows="5"
                    @blur="$v.task.description.$touch()"
                    :class="{ 'is-invalid': $v.task.description.$error }"
                  ></textarea>
                  <small
                    :class="{
                      'invalid-feedback': !$v.task.description.minLength
                    }"
                    >{{ messages.description.minLength }}</small
                  >
                  <div
                    class="invalid-feedback"
                    v-if="!$v.task.description.required"
                  >
                    {{ messages.required }}
                  </div>
                </div>
              </div>

              <div class="row form-group">
                <div class="col-md-12 mb-3 mb-md-0">
                  <label class="font-weight-bold">Kategoriya seçin</label>
                  <b-form-select
                    v-model="task.category.id"
                    :options="categories"
                    @change="$v.task.category.id.$touch()"
                    value-field="id"
                    text-field="name"
                    :state="$v.task.category.id.$invalid == true ? false : null"
                  ></b-form-select>
                  <div
                    class="invalid-feedback"
                    v-if="
                      !$v.task.category.id.required ||
                        !$v.task.category.id.numeric
                    "
                  >
                    {{ messages.category.required }}
                  </div>
                </div>
              </div>

              <div class="row form-group">
                <div class="col-md-12 mb-3 mb-md-0">
                  <label class="font-weight-bold">Tarix</label>
                  <div class="row form-group ml-md-3">
                    <div class="col-md-12 mb-3 mb-md-0">
                      <label for="task-date-picker">Gün Seçin:</label>
                      <b-form-datepicker
                        id="task-date-picker"
                        v-model="task.deadlineDate"
                        v-bind="date.labels[date.locale] || {}"
                        :locale="date.locale"
                        :start-weekday="date.weekday"
                        direction="ltr"
                        today-button
                        reset-button
                        close-button
                        class="mb-2"
                        :min="minDateTime"
                        @input="$v.task.deadlineDate.$touch()"
                        :state="
                          $v.task.deadlineDate.$invalid == false &&
                          timeValid == true
                            ? null
                            : false
                        "
                      ></b-form-datepicker>
                    </div>
                  </div>

                  <div class="row form-group ml-md-3">
                    <div class="col-md-12 mb-3 mb-md-0">
                      <label for="task-time-picker">Vaxt Seçin:</label>
                      <b-form-timepicker
                        id="task-time-picker"
                        v-model="task.deadlineTime"
                        :locale="time.locale"
                        placeholder="Vaxt Seçin"
                        v-bind="time.labels[time.locale] || {}"
                        now-button
                        reset-button
                        close-button
                        @input="$v.task.deadlineTime.$touch()"
                        :state="timeValid ? null : false"
                      ></b-form-timepicker>
                    </div>
                  </div>
                  <div class="ml-md-3">
                    <small :class="{ 'text-danger': !timeValid }">
                      {{ messages.deadline.correct }}
                    </small>
                  </div>
                </div>
              </div>

              <div class="row form-group">
                <div class="col-md-12 mb-3 mb-md-0">
                  <label class="font-weight-bold" for="price">Qiymət</label>
                  <input
                    type="text"
                    v-model="task.price"
                    id="price"
                    class="form-control"
                    placeholder="AZN"
                    @blur="$v.task.price.$touch()"
                    :class="{ 'is-invalid': $v.task.price.$error }"
                  />
                  <small
                    :class="{ 'invalid-feedback': !$v.task.price.numeric }"
                    >{{ messages.price.numeric }}</small
                  >
                  <div class="invalid-feedback" v-if="!$v.task.price.required">
                    {{ messages.required }}
                  </div>
                </div>
              </div>

              <div class="row form-group">
                <div class="col-md-12">
                  <button
                    type="submit"
                    class="btn btn-success"
                    :disabled="$v.$invalid || !timeValid || loadingSubmit"
                  >
                    <span v-if="loadingSubmit">
                      <b-spinner small></b-spinner>
                    </span>
                    <span v-else>
                      <b-icon-file-earmark-arrow-up-fill></b-icon-file-earmark-arrow-up-fill
                      >Yenilə
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </template>

          <template v-else>
            <app-loading></app-loading>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  minLength,
  numeric
} from "vuelidate/lib/validators";
import Loading from "@/components/inc/Loading";

export default {
  components: {
    appLoading: Loading
  },

  created() {
    this.$store.dispatch("tasks/fetchTask", this.$route.params.task);
  },

  data() {
    return {
      failed: false,

      loadingSubmit: false,
      date: {
        value: "",
        locale: "az",
        weekday: 1,
        labels: {
          az: {
            labelPrevYear: "Əvvəlki İl",
            labelPrevMonth: "Əvvəlki Ay",
            labelCurrentMonth: "Hazırki Ay",
            labelNextMonth: "Sonrakı Ay",
            labelNextYear: "Sonrakı İl",
            labelToday: "Bugün",
            labelSelected: "Seçilmiş Tarix",
            labelNoDateSelected: "Tarix Seçin",
            labelCalendar: "Təqvim",
            labelNav: "Təqvim Naviqasiyası",
            labelHelp: "Seçmək istədiyiniz günü klik-ləyin",
            labelTodayButton: "Bu Gün",
            labelCloseButton: "Bağla",
            labelResetButton: "Sıfırla"
          }
        }
      },
      time: {
        value: "",
        locale: "az",
        labels: {
          az: {
            labelHours: "Saat",
            labelMinutes: "Dəqiqə",
            labelIncrement: "Artır",
            labelDecrement: "Azalt",
            labelSelected: "Seçilmiş Vaxt",
            labelNoTimeSelected: "Vaxt Seçilməyib",
            labelCloseButton: "Bağla",
            labelNowButton: "Hazırki Vaxt",
            labelResetButton: "Sıfırla"
          }
        }
      },
      minDateTime: new Date()
    };
  },
  methods: {
    onSubmit() {
      this.loadingSubmit = true;
      this.$store
        .dispatch("tasks/updateTask", {
          id: this.task.id,
          caption: this.task.caption,
          description: this.task.description,
          price: this.task.price,
          categoryId: this.task.category.id,
          deadline: this.task.deadlineDate + "T" + this.task.deadlineTime + "Z"
        })
        .then(res => {
          this.loadingSubmit = false;
          this.$router.replace({name:'AdminTasksShow', params:{task:this.task.id}});
        })
        .catch(err => {
          this.failed = true;
        });
    }
  },
  validations: {
    task: {
      caption: {
        required,
        minLength: minLength(4)
      },
      description: {
        required,
        minLength: minLength(20)
      },
      price: {
        required,
        numeric
      },
      deadlineDate: {
        required
      },
      deadlineTime: {
        required
      }
    }
  },

  computed: {
    messages() {
      return this.$store.getters['messages/all'];
    },

    task() {
      return this.$store.getters['tasks/task'];
    },

    categories() {
      return this.$store.getters['categories/categories'];
    },

    timeValid() {
      if (!this.$v.task.deadlineDate.$invalid) {
        let minDate = new Date();
        if (this.taskDeadline > minDate) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },

    taskDeadline() {
      let date = `${this.task.deadlineDate}T${this.task.deadlineTime}+04:00`;
      return new Date(date);
    }
  },

};
</script>
