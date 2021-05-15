<template>
  <div class="container py-4">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-8 col-md-6">
      <div class="card text-dark bg-light">
      <div class="card-body">
        <b-alert :show="failed" variant="danger" ref="failed">{{messages.auth.incorrectCredentials}}</b-alert>
        <form @submit.prevent="onSubmit()">
          <div class="row form-group">
            <div class="col-md-12 mb-3 mb-md-0 form-item">
              <label class="font-weight-bold" for="email">E-mail</label>
              <div class="input-group">
                <div class="input-group-text">
                  <b-icon-person-fill></b-icon-person-fill>
                </div>
                <input type="email" class="form-control" id="email"
                  v-model="user.email" @blur="$v.user.email.$touch()"
                  :class="{ 'is-invalid': $v.user.email.$error }"
                />
                <div class="invalid-feedback" v-if="!$v.user.email.required">
                  E-mail {{ messages.required }}
                </div>
              </div>
            </div>
          </div>
          <div class="row form-group">
            <div class="col-md-12 mb-3 mb-md-0">
              <label class="font-weight-bold" for="password">Şifrə</label>
              <div class="input-group">
                <div class="input-group-text">
                  <b-icon-lock-fill></b-icon-lock-fill>
                </div>
                <input type="password" id="password" class="form-control" 
                  v-model="user.password" @blur="$v.user.password.$touch()"
                  :class="{ 'is-invalid': $v.user.password.$error }"
                />
                <div class="invalid-feedback" v-if="!$v.user.password.required">
                  Şifrə {{ messages.required }}
                </div>
              </div>
            </div>
          </div>
          <div class="col-auto my-3">
            <div class="row form-group">
              <div class="col-md-12">
                <button type="submit" class="btn btn-primary px-2 py-2" 
                  :class="{ 'button-disabled': $v.$invalid }" 
                  :disabled="$v.$invalid || loading"
                >
                  <template v-if="loading">
                    <b-spinner small></b-spinner>
                    <span class="sr-only">Yüklənir...</span>
                  </template>
                  <template v-else>Daxil Ol</template>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
      </div>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      loading: false,
      user: {
        email: "",
        password: ""
      },
      failed: false
    };
  },
  created() {
    if (this.$store.getters.isAuthenticated) {
      this.$router.replace("/");
    } else {
      this.$emit(`update:layout`, AppLayout);
    }
  },
  computed: {
    messages() {
      return this.$store.getters['messages/all'];
    }
  },
  methods: {
    onSubmit() {
      // makovod611@aprimail.com
      // makovod
     this.$store.dispatch("user/login", {username: this.user.email, password: this.user.password})
        .then(res => {
          window.location.replace("/");
        })
        .catch(err => {
          this.loading = false;
          this.failed = true;
          this.$refs["failed"].$el.scrollIntoView({
            block: "end",
            scrollBehavior: "smooth"
          });
        });
    }
  },
  validations: {
    user: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  }
};
</script>
