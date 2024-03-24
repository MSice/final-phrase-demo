// <template>
//     <div class="my-resolve-page">
//         <div class="my-content">
//             <swiper
//                 :effect="'coverflow'"
//                 :grabCursor="true"
//                 :initialSlide="2"
//                 :centeredSlides="true"
//                 :slidesPerView="'auto'"
//                 loop
//                 :coverflowEffect="{
//                     rotate: 50,
//                     stretch: 0,
//                     depth: 100,
//                     modifier: 1
//                 }"
//                 :pagination="true"
//                 :modules="modules"
//             >
//                 <swiper-slide
//                     v-for="(item, index) in data"
//                     :key="index"
//                     class="my-swiper-item"
//                     style="width: 350px;height: 430px;background-color: #fff;"
//                 >
//                     <div class="my-swiper-item-box">
//                         <img
//                             style="width: 350px;height: 350px;"
//                             :src="item.src"
//                             alt=""
//                         >
//                         <div class="my-swiper-txt">{{ item.name }}</div>
//                     </div>
//                 </swiper-slide>
//             </swiper>
//         </div>
//     </div>
// </template>
// <script lang='ts' setup>
// import { EffectCoverflow, Pagination } from 'swiper';

// import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue.js';

// import 'swiper/swiper-bundle.min.css';

// import { ref, reactive } from 'vue';
// let modules = [EffectCoverflow, Pagination];
// let data = reactive([
//     { name: '应急管理', src: require('@/assets/images/喷画背景图.png') },
//     { name: '应急管理1', src: require('@/assets/images/喷画背景图.png') },
//     { name: '应急管理2', src: require('@/assets/images/喷画背景图.png') },
//     { name: '应急管理3', src: require('@/assets/images/喷画背景图.png') }
// ]);
// </script>
// <style scoped lang='less'>
// .my-resolve-page {
//     width: 100%;
//     height: 500px;
//     padding-top: 10px;

//     .my-title {
//         text-align: center;
//         margin-top: 10px;
//         font-size: 26px;
//         font-weight: 700;
//         color: #fff;
//     }

//     .my-title-en {
//         text-align: center;
//         margin-top: 10px;
//         margin-bottom: 10px;
//         font-weight: 700;
//         font-size: 24px;
//         color: #0057b6;
//     }

//     .my-content {
//         .my-swiper-item {
//             cursor: pointer;
//             overflow: hidden;

//             .my-swiper-item-box {
//                 color: #58596d;
//                 transition: all 0.5s;

//                 &:hover {
//                     transform: scale(1.04);
//                     color: #409eff !important;
//                 }
//             }

//             .my-swiper-txt {
//                 width: 100%;
//                 text-align: center;
//                 height: 80px;
//                 line-height: 80px;
//                 font-size: 21px;
//             }
//         }
//     }

//     .my-more {
//         width: 100%;
//         height: 60px;
//         display: flex;
//         justify-content: center;
//         align-items: center;

//         .my-more-btn {
//             width: 100px;
//             height: 40px;
//             line-height: 40px;
//             border-radius: 20px;
//             text-align: center;
//             background-color: #0057b6;
//             color: #fff;
//             cursor: pointer;

//             &:hover {
//                 background-color: #0058b6b7;
//             }
//         }
//     }
// }

// .swiper {
//     width: 100%;
//     padding-top: 50px;
//     padding-bottom: 50px;
// }

// .swiper-slide {
//     background-position: center;
//     background-size: cover;
//     width: 300px;
//     height: 300px;
// }

// .swiper-slide img {
//     display: block;
//     width: 100%;
// }
// </style>