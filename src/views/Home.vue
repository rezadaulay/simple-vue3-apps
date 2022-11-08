<template>
    <div class="container py-5">
        <h3 class="text-center pb-4">Nego & Deal</h3>
        <div v-if="!state.loading" class="row">
            <div v-for="car in cars" :key="car.id" class="col-6 col-md-3 mb-4">
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
            <h5 class="text-center">Sedang Memuat Data...</h5>
        </div>
    </div>
</template>

<script>
    import { onMounted, ref, reactive } from 'vue'
    import carApi from '@/api/cars'

    export default {
        setup() {
            let isLoading = ref(true)
            const state = reactive({
                loading: true
            })
            const { cars, fetchCars } = carApi()
            onMounted(() => {
                fetchCars().then(() => {
                    state.loading = false
                })
            })
            return { cars, isLoading, state }
        }
    }


</script>