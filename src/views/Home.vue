<template>
    <div class="container py-5">
        <h3 class="text-center pb-4">Nego & Deal</h3>
        <div class="row">
            <div v-for="car in cars" :key="car.id" class="col-6 col-md-3 mb-4">
                <router-link :to="`detail/${car.id}`" class="product-grid">
                    <div v-if="car.unit_photo.length > 0" class="product-image">
                        <img :src="car.unit_photo[0].path"/>
                    </div>
                    <div class="product-title pt-2 pb-2 text-center">
                        <h3>{{car.nama}}</h3>
                        <p>Rp{{car.harga}}</p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { onMounted } from 'vue'
    import carApi from '@/api/cars'

    export default {
        setup() {
            const { cars, fetchCars } = carApi()
            onMounted(() => fetchCars());
            return { cars };
        }
    }


</script>