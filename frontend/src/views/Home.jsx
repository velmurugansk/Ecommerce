import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import img1 from '../assets/banner/img1.jpg';
import img2 from '../assets/banner/img2.jpg';
import img3 from '../assets/banner/img3.jpg';
import img4 from '../assets/banner/img4.jpg';
import img5 from '../assets/banner/img5.jpg';
import img6 from '../assets/banner/img6.jpg';
import { useState, useEffect } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";


const Home = () => {

    const [productlist, setProductlist] = useState([]);

    const fetchProductlist = () => {
        api.get('product/list')
            .then(response => {
                if (response.data.status) {
                    setProductlist(response.data.data);
                } else {
                    console.log(response.data.message)
                }
            })
            .catch(error => {
                console.log(error)
            });

    }

    useEffect(() => {
        fetchProductlist()
    }, [])

    return (
        <div className="px-4 pt-20 xl:px-24 xl:pt-20">
            <Swiper slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}                
                modules={[Pagination, Autoplay]}
                className="mySwiper">
                <SwiperSlide><img src={img1} alt="baner" /></SwiperSlide>
                <SwiperSlide><img src={img2} alt="baner" /></SwiperSlide>
                <SwiperSlide><img src={img3} alt="baner" /></SwiperSlide>
                <SwiperSlide><img src={img4} alt="baner" /></SwiperSlide>
                <SwiperSlide><img src={img5} alt="baner" /></SwiperSlide>
                <SwiperSlide><img src={img6} alt="baner" /></SwiperSlide>
            </Swiper>
            <div className="my-5">
                <Swiper
                    slidesPerView={6}
                    spaceBetween={5}
                    breakpoints={{
                        320:{
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                    centeredSlides={true}
                    centeredSlidesBounds={true}
                >
                    {productlist && productlist.length > 0 ? productlist.map(item => {                           
                        let productId = CryptoJS.AES.encrypt(item._id, 'productseasy').toString(); 
                        productId = encodeURIComponent(productId);                                    
                        return <SwiperSlide key={item.title}><Link to={`/products/${productId}`}><div className="flex flex-col items-center justify-center">
                            <img className="h-36 w-fit object-contain" src={item.thumbnail} alt="product image" />
                            <p className="mb-1">{item.title}</p></div></Link></SwiperSlide>
                    }) : ''}
                </Swiper>

            </div>
        </div>
    )
}

export default Home