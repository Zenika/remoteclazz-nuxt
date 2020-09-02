<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img
              :src="`https://www.metaweather.com//static/img/weather/${weather.consolidated_weather[0].weather_state_abbr}.svg`"
              alt="Placeholder image"
            >
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">
            {{ weather.title }}
          </p>
          <p class="subtitle is-6">
            {{ weather.consolidated_weather[0].weather_state_name }}
          </p>
        </div>
      </div>

      <div class="content">
        <p>
          Sunrise:
          <time datetime="2016-1-1">{{ weather.sun_rise }}</time>
        </p>
        <p>
          Sunset:
          <time datetime="2016-1-1">{{ weather.sun_set }}</time>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async fetch ({ store, params }) {
    await store.dispatch('fetchWeatherCity', params.city)
  },
  computed: {
    weather () {
      return this.$store.getters.getCurrentWeather
    }
  }
}
</script>
