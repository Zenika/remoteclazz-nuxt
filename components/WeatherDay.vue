<template>
  <section>
    <time datetime="weather.date">weather for {{ weatherDate }}</time>
    <h2>
      Temperature
    </h2>
    <p>
      {{ minTemp }} {{ degreeToDisplay }} to {{ maxTemp }} {{ degreeToDisplay }}
    </p>
    <h2>
      Wind
    </h2>
    <p>
      {{ WIND_FORCE[weather.wind10m_max].legend }}
    </p>
    <p v-if="weather.wind10m_max === 1">
      wind speed: below 0.3{{ speedToDisplay }}
    </p>
    <p v-else-if="weather.wind10m_max === 8">
      wind speed: over 32.6{{ speedToDisplay }}
    </p>
    <p v-else>
      wind speed: from {{ fromWind }}{{ speedToDisplay }} to {{ toWind }}{{ speedToDisplay }}
    </p>
  </section>
</template>
<script>

import { format, parse } from 'date-fns'

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
  name: 'WeatherDay',
  props: {
    weather: { type: Object, required: true },
    isCelsius: { type: Boolean, required: true },
    isMeterPerSecond: { type: Boolean, required: true },
    speedToDisplay: { type: String, required: true },
    degreeToDisplay: { type: String, required: true }
  },
  data () {
    return {
      WIND_FORCE
    }
  },
  computed: {
    weatherDate () {
      return format(parse(this.weather.date, 'yyyyMMdd', new Date()), 'dd-MM-yyyy')
    },
    minTemp () {
      return this.isCelsius ? this.weather.temp2m.min : this.convertCelsiusToFahrenheit(this.weather.temp2m.min)
    },
    maxTemp () {
      return this.isCelsius ? this.weather.temp2m.max : this.convertCelsiusToFahrenheit(this.weather.temp2m.max)
    },
    fromWind () {
      return this.isMeterPerSecond ? WIND_FORCE[this.weather.wind10m_max].from : this.convertMeterSecondToMileHour(WIND_FORCE[this.weather.wind10m_max].from)
    },
    toWind () {
      return this.isMeterPerSecond ? WIND_FORCE[this.weather.wind10m_max].to : this.convertMeterSecondToMileHour(WIND_FORCE[this.weather.wind10m_max].to)
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
