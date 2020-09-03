<template>
  <section>
    <h1>{{ cityName }}</h1>
    <pre>{{ closerWeather }}</pre>
    <nav>
      <nuxt-link to="/">
        Go back home
      </nuxt-link>
    </nav>
  </section>
</template>
<script>
export default {
  async fetch ({ store, params }) {
    await store.dispatch('fetchWeatherCity', params.city)
  },
  computed: {
    cityName () {
      return this.$route.params.city
    },
    weather () {
      return this.$store.getters.getCurrentWeather
    },
    closerWeather () {
      return this.weather.dataseries[0]
    }
  }
}
</script>
