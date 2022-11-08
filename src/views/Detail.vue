<template>
    <div class="container py-5">
        <h3 class="text-center pb-4">{{car.nama}}</h3>
        
    </div>
</template>

<script>
    import { onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import carApi from '@/api/cars'

    export default {
        setup() {
            const route = useRoute()
            const { car, fetchCar } = carApi()
            onMounted(() => fetchCar(route.params.id));
            return { car };
        }
    }


</script>