import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

import banner1 from '../assets/banner1.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';



const img: string[] = [banner1, banner2, banner3];

const CarouselSwiper = () => {
  return (
    <>
    <Swiper
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
     {
        img.map((item:any, index:any)=>{
            return(
                <>
                <SwiperSlide key={index}>
                    <img src={item} alt='img' />
                </SwiperSlide>
                </>
            )
        })
     }
    </Swiper>
  </>
  );
};

export default CarouselSwiper;
