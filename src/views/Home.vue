<template>
    <div class="product-listing container py-3">
        <div class="text-center">
            <img src="https://i.im.ge/2022/08/22/Oh5X0J.NND-FINAL-logo-PNG.png" style="max-width: 80px; margin: auto;" alt=""/>
        </div>
        <hr>
        <div class="py-3 text-center">
            <form action="" @submit.prevent="onFilter">
                <input type="search" v-model="form.name" class="form-control" placeholder="Cari Nama Mobil">
                <p class="pt-2">Filter harga:</p>
                <Slider v-model="form.price_range" @update="onFilter" showTooltip="focus" :min="0" :max="2000000000" :format="(value) => {
                    return `Rp${new Intl.NumberFormat('id-ID', {minimumFractionDigits: 0}).format(value)}`
                }" />
                <button type="submit" style="display: none;"></button>
            </form>
        </div>
        <div v-if="!state.loading">
            <div v-if="cars.length > 0" class="row product-row">
                <div v-for="car in cars" :key="car.id" class="product-col">
                    <router-link :to="`detail/${car.id}`" class="product-grid">
                        <div v-if="car.unit_photo.length > 0" class="product-image">
                            <img :src="car.unit_photo[0].path"/>
                        </div>
                        <div class="product-title pt-2 pb-2 text-center">
                            <h3>{{car.nama}}</h3>
                            <p>Rp{{new Intl.NumberFormat('id-ID', {minimumFractionDigits: 0}).format(car.harga)}}</p>
                        </div>
                    </router-link>
                </div>
            </div>
            <div v-else>
                <h5 class="text-center">Data tidak ditemukan</h5>
            </div>
        </div>
        <div v-else>
            <h5 class="text-center">Sedang Memuat Data...</h5>
        </div>
    </div>
</template>

<script>
    import { useRouter, useRoute } from 'vue-router'
    import Slider from '@vueform/slider'
    import { onMounted, ref, reactive } from 'vue'
    import carApi from '@/api/cars'

    export default {
        components: {
            Slider,
        },
        setup() {
            const route = useRoute()
            const router = useRouter()
            let isLoading = ref(true)
            const state = reactive({
                loading: true
            })
            const form = reactive({
                name: typeof route.query.name !== 'undefined' ? route.query.name : null,
                price_range: [typeof route.query.min_price !== 'undefined' ? parseInt(route.query.min_price) : 0, typeof route.query.max_price !== 'undefined' ? parseInt(route.query.max_price) : 2000000000]
            })
            const { cars, fetchCars } = carApi()

            function loadData() {
                const formFilter = {
                    name: form.name,
                    min_price: form.price_range[0],
                    max_price: form.price_range[1]
                }
                // add url params
                let urlParams = {}
                Object.keys(formFilter).map(function(objectKey) {
                    if (objectKey == 'min_price' || objectKey == 'max_price') {
                        if (formFilter[objectKey] > 0 && formFilter[objectKey] < 2000000000) {
                            urlParams[objectKey] = formFilter[objectKey]
                        }
                    } else if (formFilter[objectKey] !== '' && formFilter[objectKey] !== null) {
                        urlParams[objectKey] = formFilter[objectKey]
                    }
                })
                router.push({ query: urlParams })
                // fetch data from api
                fetchCars(formFilter).then(() => {
                    state.loading = false
                })
            }

            function onFilter() {
                loadData()
            }

            onMounted(() => loadData())
            return { cars, isLoading, state, form, onFilter }
        }
    }


</script>