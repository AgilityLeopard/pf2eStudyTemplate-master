<template>
    <div>
        <h1>Профиль</h1>

        <p>Email: {{ user.email }}</p>

        <button @click="logout">Выйти</button>
    </div>
</template>

<script>
export default {
    middleware: 'auth',

    data() {
        return {
            user: null
        }
    },

    async mounted() {
        const { data } = await this.$supabase.auth.getUser()
        this.user = data.user
    },

    methods: {
        async logout() {
            await this.$supabase.auth.signOut()
            this.$router.push('/login')
        }
    }
}
</script>