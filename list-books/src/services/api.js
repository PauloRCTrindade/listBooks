import axios from 'axios';

export const api = axios.create({
  baseURL:'https://gutendex.com'
})

export const getBooksApi = {
  data(route) {
     return api.get(route).then(response => response.data)
  }
}
export const getSearchBooksApi = {
  data(route) {
     return api.get(route).then(response => response.data)
  }
}