import { get, getPur } from '@/api/utils'

export const state = () => ({
  franceId: 23424819,
  franceCities: [],
  currentWeather: null
})

export const getters = {
  getFranceId (state) {
    return state.franceId
  },
  getFranceCities: state => state.franceCities,
  getCurrentWeather: state => state.currentWeather
}

export const mutations = {
  addFranceCity (state, city) {
    state.franceCities.push(city)
  },
  setCurrentCity (state, weather) {
    state.currentWeather = weather
  }
}

export const actions = {
  async nuxtServerInit ({ commit, getters }) {
    const cities = await getPur(`location/${getters.getFranceId}`)
    cities.children.forEach(city => commit('addFranceCity', city))
  },
  async fetchWeatherCity ({ commit }, cityId) {
    const cityWeather = await get(`location/${cityId}`)
    commit('setCurrentCity', cityWeather)
  }
}
