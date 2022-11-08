<template>
    <div class="container py-3 product-detail">
        <div class="text-center">
            <img src="https://i.im.ge/2022/08/22/Oh5X0J.NND-FINAL-logo-PNG.png" style="max-width: 80px; margin: auto;" alt=""/>
        </div>
        <hr>
        <h3 class="text-center pb-4">{{car.nama}}</h3>
        <nav aria-label="breadcrumb mb-3">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/">Home</router-link ></li>
                <li class="breadcrumb-item active" aria-current="page">Detail Mobil</li>
            </ol>
        </nav>
        <div class="glide mb-3">
            <div class="glide__track" data-glide-el="track">
                <ul class="glide__slides">
                    <li class="glide__slide" v-for="photo in car.photo_selling" :key="photo.id">
                        <img :src="photo.path" class="img-fluid" />
                    </li>
                </ul>
            </div>
            <div class="glide__arrows" data-glide-el="controls">
                <button class="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
                <button class="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
            </div>
        </div>
        <h5>Harga: Rp{{new Intl.NumberFormat('id-ID', {minimumFractionDigits: 0}).format(car.harga)}}</h5>
        <p class="mb-1">Dealer: {{car.nama_penjual}}</p>
        <p class="mb-1">No. Telp: {{car.no_hp}}</p>
        <p class="mb-1">Alamat: {{car.alamat}}</p>
        <p>Distributor: {{car.distributor}}</p>

        
        <div class="tabs">
            <div class="tab">
                <input type="checkbox" id="chck1">
                <label class="tab-label" for="chck1">Notes</label>
                <div class="tab-content">
                    <textarea disabled id="" style="resize: none;width: 100%; border-width: 0px; background-color: transparent;" rows="20" v-model="car.notes"></textarea>
                </div>
            </div>
            <div class="tab">
                <input type="checkbox" id="chck2">
                <label class="tab-label" for="chck2">Deskripsi</label>
                <div class="tab-content">
                    <table class="table">
                        <tr>
                            <td>KM</td>
                            <td>{{car.odometer}}</td>
                        </tr>
                        <tr>
                            <td>Merk</td>
                            <td>{{car.merk}}</td>
                        </tr>
                        <tr>
                            <td>Tipe</td>
                            <td>{{car.type}}</td>
                        </tr>
                        <tr>
                            <td>Tahun</td>
                            <td>{{car.tahun}}</td>
                        </tr>
                        <tr>
                            <td>Plat Nomor</td>
                            <td>{{car.plat_nomor}}</td>
                        </tr>
                        <tr>
                            <td>Warna</td>
                            <td>{{car.warna}}</td>
                        </tr>
                        <tr>
                            <td>Bahan Bakar</td>
                            <td>{{car.bahan_bakar}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import carApi from '@/api/cars'
    

    import '@glidejs/glide/dist/css/glide.core.min.css'
    import '@glidejs/glide/dist/css/glide.theme.min.css'
    import Glide, { Controls } from '@glidejs/glide/dist/glide.modular.esm'

    export default {
        setup() {
            const route = useRoute()
            const { car, fetchCar } = carApi()
            onMounted(() => {
                fetchCar(route.params.id).then(() => {
                    new Glide('.glide').mount({Controls})
                })
                
            })
            return { car }
        }
    }


</script>