<template>
    <div>
        <h1>Login</h1>

        <input v-model="email" placeholder="Email" hide-details solo flat class="input" />
        <input v-model="password" type="password" placeholder="Password" hide-details solo flat class="input" />

        <button @click="login">Войти</button>
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
        async login() {
            const { error } = await this.$supabase.auth.signIn({
                email: this.email,
                password: this.password
            })

            if (error) {
                alert(error.message)
            } else {
                this.$router.push('/profile')
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