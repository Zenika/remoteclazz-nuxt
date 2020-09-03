<template>
  <div>
    <nav>
      <nuxt-link to="/">
        Go back home
      </nuxt-link>
    </nav>
    <h1>{{ cityName }}</h1>
    <label>in {{ speedToDisplay }} <input v-model="isMeterPerSecond" type="checkbox"></label>
    <label>in {{ degreeToDisplay }} <input v-model="isCelsius" type="checkbox"></label>
    <client-only placeholder="Map loading...">
      <l-map :zoom="13" style="height: 350px" :center="position">
        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        <l-marker :lat-lng="position" />
      </l-map>
    </client-only>
    <details>
      <summary>
        <weather-day
          :weather="closerWeather"
          :is-celsius="isCelsius"
          :is-meter-per-second="isMeterPerSecond"
          :speed-to-display="speedToDisplay"
          :degree-to-display="degreeToDisplay"
        />
      </summary>
      <weather-day
        v-for="weather in lastWeathers"
        :key="weather.date"
        :weather="weather"
        :is-celsius="isCelsius"
        :is-meter-per-second="isMeterPerSecond"
        :speed-to-display="speedToDisplay"
        :degree-to-display="degreeToDisplay"
      />
    </details>
  </div>
</template>
<script>
import WeatherDay from '@/components/WeatherDay'

export default {
  components: { WeatherDay },
  async fetch ({ store, params }) {
    await store.dispatch('fetchWeatherCity', params.city)
  },
  data () {
    return {
      isCelsius: true,
      isMeterPerSecond: true
    }
  },
  computed: {
    cityName () {
      return this.$route.params.city
    },
    weathers () {
      return this.$store.getters.getCurrentWeather
    },
    position () {
      return this.$store.getters.getCityPosition(this.cityName)
    },
    closerWeather () {
      return this.weathers.dataseries[0]
    },
    lastWeathers () {
      const [, ...lastWeathers] = this.weathers.dataseries
      return lastWeathers
    },
    speedToDisplay () {
      return this.isMeterPerSecond ? 'm/s' : 'mph'
    },
    degreeToDisplay () {
      return `°${this.isCelsius ? 'C' : 'F'}`
    }
  }
}
</script>
