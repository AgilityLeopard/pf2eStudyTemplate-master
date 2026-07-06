<template>
    <v-app>
        <v-container fill-height class="d-flex align-center justify-center">
            <v-card class="pa-6" max-width="400" width="100%" elevation="10">

                <v-card-title class="justify-center text-h5 font-weight-bold">
                    Вход
                </v-card-title>

                <v-card-text>
                    <v-form ref="form" v-model="valid">

                        <v-text-field v-model="email" label="Email" prepend-icon="mdi-email" :rules="emailRules"
                            outlined dense required />

                        <v-text-field v-model="password" label="Password" prepend-icon="mdi-lock"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword"
                            :rules="passwordRules" outlined dense required />

                        <v-btn color="primary" block large class="mt-4" :loading="loading" :disabled="!valid"
                            @click="login">
                            Войти
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


    middleware: 'guest',

    methods: {
        async login() {

            if (!this.$refs.form.validate()) return;
            this.loading = true;
            try {
                const { data, error } = await this.$supabase.auth.signIn({
                    email: this.email,
                    password: this.password
                })

                if (error) {
                    console.error('LOGIN ERROR:', error.message)
                    return // 🔥 ВАЖНО — стоп
                }

                const user = data?.user || data?.session?.user

                this.$store.commit('SET_USER', user)

                this.$router.push('/profile')
                this.loading = false;

            } catch (e) {
                console.error('EXCEPTION:', e)
            }
        }
    }
}
</script>

<style scoped>
.v-container {
    background: linear-gradient(135deg, #3f51b5, #5c6bc0);
}
</style>