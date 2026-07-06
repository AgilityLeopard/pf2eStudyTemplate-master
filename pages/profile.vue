<template>
    <v-container class="fill-height profile-bg" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" md="8" lg="5">

                <v-card class="rounded-xl elevation-12 overflow-hidden">

                    <!-- HEADER -->
                    <div class="profile-header"></div>

                    <!-- AVATAR -->
                    <div class="text-center avatar-wrapper">
                        <div class="avatar-container">

                            <v-avatar size="120" class="elevation-8">
                                <v-img :src="avatarSrc"></v-img>
                            </v-avatar>

                            <!-- overlay только при редактировании -->
                            <div v-if="isEditing" class="avatar-overlay" @click="$refs.fileInput.click()">
                                <v-icon color="white">mdi-camera</v-icon>
                            </div>

                        </div>

                        <input ref="fileInput" type="file" accept="image/*" hidden @change="uploadAvatar" />

                        <!-- имя -->
                        <h2 class="mt-3 font-weight-bold">
                            {{ isEditing ? editUser.username : (profile?.username || '') }}
                        </h2>

                        <p class="grey--text text-caption">
                            {{ profile?.email }}
                        </p>
                    </div>

                    <!-- ACTIONS -->
                    <v-row justify="center" class="mt-4 mb-2">

                        <template v-if="!isEditing">
                            <v-btn color="primary" rounded large @click="startEdit">
                                <v-icon left>mdi-pencil</v-icon>
                                Редактировать
                            </v-btn>
                        </template>

                        <template v-else>
                            <v-btn color="success" class="mr-2" rounded @click="saveProfile">
                                <v-icon left>mdi-content-save</v-icon>
                                Сохранить
                            </v-btn>

                            <v-btn outlined rounded @click="cancelEdit">
                                Отмена
                            </v-btn>
                        </template>

                    </v-row>

                    <v-divider></v-divider>

                    <!-- CONTENT -->
                    <v-card-text>

                        <!-- EDIT MODE -->
                        <v-form v-if="isEditing">

                            <v-text-field v-model="editUser.username" label="Имя" prepend-icon="mdi-account" outlined
                                dense />
                            <!-- 
                            <v-text-field v-model="editUser.email" label="Email" prepend-icon="mdi-email" outlined
                                dense /> -->

                        </v-form>

                        <!-- VIEW MODE -->
                        <v-list v-else dense>

                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon>mdi-account</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>{{ profile?.username }}</v-list-item-title>
                                    <v-list-item-subtitle>Имя</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon>mdi-email</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>{{ profile?.email }}</v-list-item-title>
                                    <v-list-item-subtitle>Email</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon>mdi-calendar</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>{{ profile?.created_at }}</v-list-item-title>
                                    <v-list-item-subtitle>Дата регистрации</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                        </v-list>

                    </v-card-text>

                </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            isEditing: false,
            avatarFile: null,
            avatarPreview: null,
            editUser: {

            }
        }
    },

    computed: {
        user() {
            return this.$store.state.user
        },
        profile() {
            return this.$store.state.profile
        },

        // 🔥 ВАЖНО: нормальный fallback
        avatarSrc() {
            return (
                this.avatarPreview ||
                this.editUser?.avatar_url ||
                this.profile?.avatar_url ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            )
        }
    },

    methods: {
        startEdit() {
            this.editUser = { ...this.profile }
            this.isEditing = true
        },

        async uploadAvatar(event) {
            const file = event.target.files[0]
            if (!file) return

            this.avatarFile = file

            // preview
            this.avatarPreview = URL.createObjectURL(file)
            this.editUser.avatar_url = this.avatarPreview
        },

        cancelEdit() {
            this.isEditing = false
            this.avatarPreview = null
            this.avatarFile = null
        },

        async saveProfile() {
            try {
                let avatarUrl = this.profile.avatar_url

                if (this.avatarFile) {
                    const filePath = `${this.user.id}/avatar.jpg`

                    await this.$supabase.storage
                        .from("avatars")
                        .remove([filePath])

                    const { error: uploadError } = await this.$supabase.storage
                        .from("avatars")
                        .upload(filePath, this.avatarFile, { upsert: true })

                    if (uploadError) throw uploadError

                    const { data } = this.$supabase.storage
                        .from("avatars")
                        .getPublicUrl(filePath)

                    avatarUrl = `${data.publicUrl}?v=${Date.now()}`
                }

                await this.$supabase
                    .from("profiles")
                    .update({
                        username: this.editUser.username,
                        email: this.editUser.email,
                        avatar_url: avatarUrl
                    })
                    .eq("userid", this.user.id)

                this.isEditing = false
                this.avatarFile = null
                this.avatarPreview = null

            } catch (e) {
                console.error(e)
            }
        }
    }
}
</script>

<style scoped>
.profile-bg {
    background: linear-gradient(135deg, #667eea, #764ba2);
}

.profile-header {
    height: 120px;
    background: linear-gradient(135deg, #3f51b5, #5c6bc0);
}

.avatar-wrapper {
    margin-top: -60px;
}

.avatar-container {
    position: relative;
    display: inline-block;
}

.avatar-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s;
}

.avatar-overlay:hover {
    background: rgba(0, 0, 0, 0.7);
}
</style>