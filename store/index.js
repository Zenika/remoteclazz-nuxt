import Vue from 'vue'

export const state = () => ({
  currentWeather: null,
  latLongMap: {
    SINGAPOUR: [1.295600, 103.858995],
    BORDEAUX: [44.848089, -0.571017],
    BREST: [48.389397, -4.499237],
    MONTREAL: [45.523000, -73.581700],
    GRENOBLE: [45.183916, 5.703630],
    LYON: [45.767443, 4.858798],
    RENNES: [48.113409, -1.661249],
    NANTES: [47.207408, -1.556187],
    LILLE: [50.648670, 3.075520],
    PARIS: [48.878932, 2.328487]
  }
})

export const getters = {
  getMapPosition: state => state.latLongMap,
  getCityPosition: (state, getters) => cityName => getters.getMapPosition[cityName],
  getCities: state => Object.keys(state.latLongMap),
  getCurrentWeather: state => state.currentWeather
}

export const mutations = {
  setCurrentCity (state, weather) {
    state.currentWeather = weather
  },
  addNewCity (state, { name, position }) {
    Vue.set(state.latLongMap, name, position)
  }
}

export const actions = {
  async fetchWeatherCity ({ commit, getters }, cityName) {
    const [lat, long] = getters.getMapPosition[cityName]
    const cityWeather = await fetch(`http://www.7timer.info/bin/api.pl?lon=${long}&lat=${lat}&product=civillight&output=json`).then(response => response.json())
    commit('setCurrentCity', cityWeather)
  },
  addNewCity ({ commit }, { name, latitude, longitude }) {
    const position = [latitude, longitude]
    commit('addNewCity', { name, position })
  }
}
