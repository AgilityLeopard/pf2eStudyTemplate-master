<template lang="html">
  <section class="about">
    <v-container grid-list-md>
      <v-row justify="center">
        <v-col :cols="12" sm="10" md="8" lg="8">
          <h1>About this page</h1>

          <!-- <p>
            This page is an <strong>inofficial</strong> fan page for the
            Warhammer 40k Role Playing Game Wrath & Glory. The game is currently
            published by
            <a href="https://www.cubicle7games.com/?p=3870">Cubical 7</a>.
          </p>

          <h2>The Character Generator</h2>

          <p>
            I was heavily motivated and inspired by
            <a href="https://www.reddit.com/user/althalin/"
              >reddit user althalin</a
            >
            and his
            <a href="http://apps.ajott.io/dh2chargen/"
              >Dark Heresy 2 Character Generator</a
            >. You should definitely check it out!
          </p> -->

          <!-- <p>
            Also, I quite often use the Official D&D Character Generator over at
            <a href="https://www.dndbeyond.com/">D&D Beyond</a>
            and draw inspiration how to organise the layout.
          </p> -->

          <p>
            Иконки с сайта
            <a href="https://game-icons.net/">game-icons.net</a>
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
