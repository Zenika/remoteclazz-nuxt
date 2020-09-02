import axios from 'axios'

const proxy = 'https://cors-anywhere.herokuapp.com:443/'

export const get = target => axios.get(`${proxy}https://www.metaweather.com/api/${target}`).then(response => response.data)

export const getPur = target => axios.get(`https://www.metaweather.com/api/${target}`).then(response => response.data)
