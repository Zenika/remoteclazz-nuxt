<template>
  <div>
    <header>
      <h1>
        Zenika Cities weather
      </h1>
      <h2>
        The best weather app in Nuxt
      </h2>
    </header>
    <section>
      <h2>
        Offices
      </h2>
      <article v-for="city in cities" :key="city">
        <nuxt-link :to="`city/${city}`">
          <p>
            {{ city }}
          </p>
        </nuxt-link>
      </article>
    </section>
    <footer>
      <p>
        Developed by
        <a href="https://github.com/P0ppoff" rel="nofollow">Jules Hablot</a> with
        <a href="http://www.7timer.info/index.php" rel="nofollow">7Timer!</a> for
        <a href="https://zenika.com/" rel="nofollow">Zenika</a> with ❤️
      </p>
    </footer>
  </div>
</template>
<script>
export default {
  computed: {
    cities () {
      return this.$store.getters.getCities
    }
  }
  // example https://www.metaweather.com/fr/2151330/
  // TODO: add switch Celsius / Fahrenheit
  // TODO: add switch mph/miles / kph/kilometres
  // TODO: add form feeling wrong ? with random response : success or error
}
</script>
