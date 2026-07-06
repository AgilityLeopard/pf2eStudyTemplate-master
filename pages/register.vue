<template>
  <v-app>
    <v-container fill-height class="d-flex align-center justify-center">

      <v-card class="pa-6" max-width="400" width="100%" elevation="10">

        <v-card-title class="justify-center text-h5 font-weight-bold">
          Регистрация
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid">

            <v-text-field v-model="email" label="Email" prepend-icon="mdi-email" :rules="emailRules" outlined dense
              required />

            <v-text-field v-model="password" label="Password" prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword" :rules="passwordRules" outlined dense required />

            <v-btn color="primary" block large class="mt-4" :loading="loading" :disabled="!valid" @click="register">
              Создать аккаунт
            </v-btn>

          </v-form>
        </v-card-text>
      </v-card>
    </v-container>

  </v-app>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      loading: false,
      valid: false,

      emailRules: [
        v => !!v || "Email обязателен",
        v => /.+@.+\..+/.test(v) || "Неверный email"
      ],
      passwordRules: [
        v => !!v || "Пароль обязателен",
        v => v.length >= 6 || "Минимум 6 символов"
      ]
    };
  },
  methods: {
    async register() {
      const { error } = await this.$supabase.auth.signUp({
        email: this.email,
        password: this.password
      })

      if (error) {
        alert(error.message)
      } else {
        alert('Проверь почту')
      }
    }
  }
}
</script>

<style scoped>
.page {
  color: white;
  /* текст */
}

.input {
  color: black;
  /* текст внутри */
  background: white;
  /* фон */
  padding: 8px;
  margin-bottom: 10px;
}
</style>