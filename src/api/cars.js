import { ref, getCurrentInstance } from 'vue'

export default function cars() {
  const car = ref({})
  const cars = ref([])

  const app = getCurrentInstance()

  async function fetchCars() {
    return app.appContext.config.globalProperties.$http.get( `get_unit_all_tayang` ).then(function (response) {
        if (response.data.meta.code === 200) {
          cars.value = response.data.data
        }
    }).catch(function (error) {
        console.log(error)
    })
  }

  async function fetchCar(carId) {
    return app.appContext.config.globalProperties.$http.post( `getdetailunit/${carId}` ).then(function (response) {
        if (response.data.meta.code === 200) {
          car.value = response.data.data
        }
    }).catch(function (error) {
        console.log(error)
    })
  }

  return { fetchCars, fetchCar, car, cars }
}
