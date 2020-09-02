<template>
  <div class="container">
    <section class="hero is-info is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            World weather
          </h1>
          <h2 class="subtitle">
            The best weather app in Nuxt
          </h2>
        </div>
      </div>
    </section>
    <!--<nav class="level">
      <p class="level-item">
        <strong>All</strong>
      </p>
      <p class="level-item">
        <a>Published</a>
      </p>
      <p class="level-item">
        <a>Drafts</a>
      </p>
      <p class="level-item">
        <a>Deleted</a>
      </p>
      <p class="level-item">
        <a class="button is-success">New</a>
      </p>
    </nav>-->
    <section class="section">
      <div class="container">
        <h1 class="title">
          France cities
        </h1>
      </div>
    </section>
    <div class="container is-fluid mb-6">
      <div class="tile is-ancestor is-vertical is-8">
        <article v-for="city in cities" :key="city.woeid" class="tile is-child">
          <nuxt-link :to="`city/${city.woeid}`" class="tile is-child box">
            <p>
              {{ city.title }}
            </p>
          </nuxt-link>
        </article>
      </div>
    </div>
    <footer class="footer">
      <p class="content has-text-centered">
        Developed by
        <a href="https://github.com/P0ppoff" rel="nofollow">Jules Hablot</a> with
        <a href="https://bulma.io/" rel="nofollow">Bulma</a>and
        <a href="https://www.metaweather.com/" rel="nofollow">MetaWeather</a> for
        <a href="https://zenika.com/" rel="nofollow">Zenika</a> with ❤️
      </p>
    </footer>
  </div>
</template>
<script>
export default {
  computed: {
    cities () {
      return this.$store.getters.getFranceCities
    }
  }
  // example https://www.metaweather.com/fr/2151330/
  // TODO: add switch Celsius / Fahrenheit
  // TODO: add switch mph/miles / kph/kilometres
  // TODO: add form feeling wrong ? with random response : success or error
}
</script>
