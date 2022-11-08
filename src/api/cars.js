import { ref, getCurrentInstance } from 'vue'
import http from '@/api/http'

export default function cars() {
  const car = ref({})
  const cars = ref([])

  async function fetchCars(params = {}) {
    let url = 'get_unit_all_tayang'
    if (Object.keys(params).length > 0) {
      let urlParams = []
      Object.keys(params).map(function(objectKey) {
        if (params[objectKey] !== '' && params[objectKey] !== null) {
          urlParams.push(objectKey + '=' + params[objectKey])
        }
      })
      url += '?' + urlParams.join('&')
    }
    return http().get( url ).then(function (response) {
        if (response.data.meta.code === 200) {
          cars.value = response.data.data
        }
    }).catch(function (error) {
        console.log(error)
    })
  }

  async function fetchCar(carId) {
    return http().post( `getdetailunit/${carId}` ).then(function (response) {
        if (response.data.meta.code === 200) {
          car.value = response.data.data
        }
    }).catch(function (error) {
        console.log(error)
    })
  }

  return { fetchCars, fetchCar, car, cars }
}
