<template>
  <v-app dark>
    <v-container>
      <v-row justify="center">
        <v-col :cols="12" :md="8" class="text-center">
          <div v-if="error.statusCode === 404">
            <h1>Ошибка 404!</h1>
            <p>
              Этот регион не существует, или же может быть опасным. Двигайтесь
              аккуратно, Следопыт. Или перейдите на другую страницу
            </p>
          </div>
          <div v-else>
            <h1>Остановись, Челиаксец</h1>
            <p>Перейдите в другую страницу и попробуйте вызвать Асмодея там</p>
          </div>
          <NuxtLink to="/"> Home page </NuxtLink>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
  data() {
    return {
      pageNotFound: "404 Не найдено",
      otherError: "Неожиданная ошибка",
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
