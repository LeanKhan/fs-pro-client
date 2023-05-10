<template>
  <form ref="form" @submit.prevent="login">
    <v-card>
      <v-card-text>
        <template v-if="!showForgotSection">
          <h3>Login to FSPro</h3>

          <v-text-field
            v-model="form.Username"
            required
            type="text"
            label="Username"
            :disabled="loading"
            :loading="loading"
            color="green"
          />

          <v-text-field
            v-model="form.Password"
            required
            type="text"
            label="Password"
            :disabled="loading"
            :loading="loading"
            color="green"
          />
        </template>

        <template v-else>
          <[object Object]>Change Password</[object Object]>

          <v-text-field
            v-model="newForm.Username"
            required
            type="text"
            label="Username"
            :disabled="loading"
            :loading="loading"
            color="pink"
          />

          <v-text-field
            v-model="newForm.NewPassword"
            required
            type="text"
            label="New Password"
            :disabled="loading"
            :loading="loading"
            color="pink"
          />
        </template>
        <!-- Forgot Password -->
        <div>
          Forgot your password?
          <v-btn variant="outlined flat" @click="showForgot">
            Yup, ama fish eater
          </v-btn>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          v-if="!showForgotSection"
          color="green-darken-2"
          block
          :loading="loading"
          @click="login"
        >
          Login
        </v-btn>

        <v-btn
          v-else
          color="pink-darken-2"
          block
          :loading="loading"
          @click="submitNewPassword"
        >
          Change Password
        </v-btn>
      </v-card-actions>
    </v-card>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
@Component({})
export default class Login extends Vue {
  form = {
    Username: '',
    Password: ''
  };

  newForm = {
    Username: '',
    NewPassword: ''
  };

  public loading = false;

  public showForgotSection = false;

  login() {
    this.loading = true;
    this.$axios
      .post(
        '/users/login',
        { data: { ...this.form } },
        { withCredentials: true }
      )
      .then(response => {
        console.log('Response => ', response.data);
        if (response.data.success) {
          this.$store.dispatch('SHOW_TOAST', {
            message: 'Signed in Successfully!',
            style: 'success'
          });

          this.$store.dispatch('SET_USER', {
            username: response.data.payload.Username,
            userID: response.data.payload._id,
            clubs: response.data.payload.Clubs,
            session: response.data.payload.Session,
            isAdmin: response.data.payload.isAdmin,
            avatar: response.data.payload.Avatar,
            fullname: response.data.payload.FullName
          });
        } else {
          this.$store.dispatch('SHOW_TOAST', {
            message: response.data.message,
            style: 'error'
          });
        }

        this.$socket.client.emit('authenticate');

        this.$router.push('/u');
      })
      .catch(response => {
        console.error('Error logging in! ', response);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  submitNewPassword() {
    this.loading = true;
    this.$axios
      .post('/users/change-password', this.newForm, { withCredentials: true })
      .then(response => {
        console.log('Response => ', response.data);
        if (response.data.success) {
          this.$store.dispatch('SET_USER', {
            username: response.data.payload.Username,
            userID: response.data.payload._id,
            clubs: response.data.payload.Clubs,
            session: response.data.payload.Session,
            isAdmin: response.data.payload.isAdmin,
            avatar: response.data.payload.Avatar,
            fullname: response.data.payload.FullName
          });
        }

        this.$socket.client.emit('authenticate');

        this.$router.push('/u');
      })
      .catch(response => {
        console.log('Error changing password in! ', response.data);
      })
      .finally(() => {
        this.showForgotSection = false;
        this.loading = false;
      });
  }

  showForgot() {
    this.showForgotSection = true;
  }
}
</script>

<style></style>
