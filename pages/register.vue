<template>
  <div>
    <h1>Register</h1>

    <input v-model="email" placeholder="Email" hide-details solo flat class="input" />
    <input v-model="password" type="password" placeholder="Password" hide-details solo flat class="input" />

    <button @click="register">Создать аккаунт</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
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