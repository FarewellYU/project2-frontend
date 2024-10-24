import axios from 'axios'
const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/FarewellYU/Project2-DB',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
export default {
  getCountries(perPage: number, page: number) {
    return apiClient.get(`/countries?_limit=${perPage}&_page=${page}`)
  },
  // getCountries() {
  //   return apiClient.get('/countries')
  // },
  getCountry(id: string) {
    return apiClient.get('/countries/' + id)
  }
}
