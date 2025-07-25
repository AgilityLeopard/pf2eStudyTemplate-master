<template lang="html">
  <section class="about">
    <v-container grid-list-md>
      <v-row justify="center">
        <v-col :cols="12" sm="10" md="8" lg="8">
          <h1></h1>

          <p>
            Это не официальный Билдер, вдохновленный Pathbuilder2e и Wanderers
            Guide
          </p>

          <h2>Генератор персонажа и архив</h2>

          <!-- <p>
            Also, I quite often use the Official D&D Character Generator over at
            <a href="https://www.dndbeyond.com/">D&D Beyond</a>
            and draw inspiration how to organise the layout.
          </p> -->

          <p>
            Иконки с сайта
            <a href="https://game-icons.net/">game-icons.net</a>
          </p>

          <p>
            Перевод взят с сайта
            <a
              href="https://pf2e-ru-translation.readthedocs.io/ru/latest/index.html"
              >pf2e-ru-translation</a
            >
          </p>

          <p>
            Также взят перевод с модуля в фаундри (инфу можно найти в дискорде
            переводчика)
            <a href="https://discord.gg/NyzzcPSkZv">Discord Доктора</a>
          </p>

          <p />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script lang="js">
export default {
  head() {
    return {
      title: '',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'A fan page for the Warhammer 40k universe, especially the Wrath & Glory Role Playing game.',
        },
      ],
    };
  },
};
</script>

<style scoped lang="css"></style>
