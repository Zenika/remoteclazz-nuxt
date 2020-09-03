<template>
  <div>
    <nav>
      <nuxt-link to="/">
        Go back home
      </nuxt-link>
    </nav>
    <h1>{{ cityName }}</h1>
    <pre>{{ closerWeather }}</pre>
    <section>
      <!-- TODO: print date in write format -->
      <time datetime="closerWeather.date">weather for {{ closerWeather.date }}</time>
      <article>
        <h2>
          Temperature
        </h2>
        <label>in {{ degreeToDisplay }} <input v-model="isCelsius" type="checkbox"></label>
        <p>
          {{ minTemp }} {{ degreeToDisplay }} to {{ maxTemp }} {{ degreeToDisplay }}
        </p>
      </article>
      <article>
        <h2>
          Wind
        </h2>
        <p>
          {{ WIND_FORCE[closerWeather.wind10m_max].legend }}
        </p>
        <p v-if="closerWeather.wind10m_max === 1">
          wind speed: below 0.3{{ speedToDisplay }}
        </p>
        <p v-else-if="closerWeather.wind10m_max === 8">
          wind speed: over 32.6{{ speedToDisplay }}
        </p>
        <p v-else>
          wind speed: from {{ fromWind }}{{ speedToDisplay }} to {{ toWind }}{{ speedToDisplay }}
        </p>
        <label>in {{ speedToDisplay }} <input v-model="isMeterPerSecond" type="checkbox"></label>
      </article>
    </section>
  </div>
</template>
<script>

const WIND_FORCE = {
  1: { from: -Infinity, to: 0.3, legend: 'calm' },
  2: { from: 0.3, to: 3.4, legend: 'light' },
  3: { from: 3.4, to: 8.0, legend: 'moderate' },
  4: { from: 8.0, to: 10.8, legend: 'fresh' },
  5: { from: 10.8, to: 17.2, legend: 'strong' },
  6: { from: 17.2, to: 24.5, legend: 'gale' },
  7: { from: 24.5, to: 32.6, legend: 'storm' },
  8: { from: 32.6, to: Infinity, legend: 'hurricane' }
}

export default {
  async fetch ({ store, params }) {
    await store.dispatch('fetchWeatherCity', params.city)
  },
  data () {
    return {
      isCelsius: true,
      isMeterPerSecond: true,
      WIND_FORCE
    }
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
    },
    minTemp () {
      return this.isCelsius ? this.closerWeather.temp2m.min : this.convertCelsiusToFahrenheit(this.closerWeather.temp2m.min)
    },
    maxTemp () {
      return this.isCelsius ? this.closerWeather.temp2m.max : this.convertCelsiusToFahrenheit(this.closerWeather.temp2m.max)
    },
    degreeToDisplay () {
      return `°${this.isCelsius ? 'C' : 'F'}`
    },
    fromWind () {
      return this.isMeterPerSecond ? WIND_FORCE[this.closerWeather.wind10m_max].from : this.convertMeterSecondToMileHour(WIND_FORCE[this.closerWeather.wind10m_max].from)
    },
    toWind () {
      return this.isMeterPerSecond ? WIND_FORCE[this.closerWeather.wind10m_max].to : this.convertMeterSecondToMileHour(WIND_FORCE[this.closerWeather.wind10m_max].to)
    },
    speedToDisplay () {
      return this.isMeterPerSecond ? 'm/s' : 'mph'
    }
  },
  methods: {
    convertCelsiusToFahrenheit (temperature) {
      return (temperature * 9 / 5) + 32
    },
    convertMeterSecondToMileHour (speed) {
      return speed * 2.237
    }
  }
}
</script>
