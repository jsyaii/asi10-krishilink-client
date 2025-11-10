import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "Grow Green Live Clean",
      subtitle: "Bring freshness and positivity into your home.",
      img: "https://i.ibb.co.com/PGzHDk6V/still-life-with-indoor-plants.jpg",
    
    },
    {
      id: 2,
      title: "Nurture Yourself ",
      subtitle: "Discover beautiful indoor plants and their care tips.",
      img: "https://i.ibb.co.com/RpyH7hwF/indoor-plants-studio-1.jpg",
    },
    {
      id: 3,
      title: "Sustainably Beautiful",
      subtitle: "Because every plant deserves a loving home.and u deserve peace",
    //   img: "https://i.ibb.co.com/qMHfHWLQ/indoor-plants-studio.jpg",
        img: "https://i.ibb.co.com/mKR9gfy/indoor-plants-studio-2.jpg",
    },
  ];

  return (
    <div className="w-full h-[80vh] overflow-hidden">


      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full object-[center_top] bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-6">
                <motion.h1
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl md:text-6xl font-bold mb-3 text-green-200"
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-lg md:text-xl max-w-xl mt-10"
                >
                  {slide.subtitle}
                </motion.p>
                <button className="btn btn-success border-2 mt-20 border-green-250">Shop Now</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
