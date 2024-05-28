import getImageUrl from "../../../../helpers/getImageUrl";
import styles from './offer-gallery.module.scss';
import { useState } from "react";
import LoopGalleryImages from "./loop/LoopGalleryImages";
import Lightbox from "../../../parts/lightbox/Lightbox";
import offerImagePlaceholder from '../../../../images/offer/offer-image-placeholder.png';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

const OfferGallery = ({ images }) => {
    const [isLightboxActive, setIsLightboxActive] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [zoomLevel, setZoomLevel] = useState(1);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setMousePosition({ x, y });
        setZoomLevel(2);
    };

    const openLightbox = (index) => {
        setIsLightboxActive(true);
        setActiveIndex(index);
    };

    return (
        <div className={styles.offer_gallery}>
            {/*<div className={styles.main_image_wrapper} onClick={() => openLightbox(1)} onMouseMove={handleMouseMove} onMouseLeave={() => setZoomLevel(1)}>*/}
            {/*    <img src={getImageUrl(images[0]) ? getImageUrl(images[0]) : offerImagePlaceholder} className={styles.main_image} style={{*/}
            {/*        transform: `scale(${zoomLevel})`,*/}
            {/*        transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`*/}
            {/*    }} />*/}
            {/*</div>*/}
            <div>
                <Swiper
                    style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                    }}
                    loop={true}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className={styles.mySwiper2} // Adding custom class
                >
                    {images && images.length > 0 ? images.map((image, index) => (
                        <SwiperSlide key={index} className={styles.swiper_slide} onClick={() => openLightbox(index)}>
                            <img src={getImageUrl(image)} alt={`Slide ${index}`} />
                        </SwiperSlide>
                    )) : (
                        <SwiperSlide className={styles.swiper_slide}>
                            <img src={offerImagePlaceholder} alt="Placeholder" />
                        </SwiperSlide>
                    )}
                </Swiper>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={3}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className={styles.mySwiper} // Adding custom class
                >
                    {images && images.length > 0 ? images.map((image, index) => (
                        <SwiperSlide key={index} className={styles.swiper_slide}>
                            <img src={getImageUrl(image)} alt={`Thumb ${index}`} className={styles.image_slider} />
                        </SwiperSlide>
                    )) : (
                        <SwiperSlide className={styles.swiper_slide}>
                            <img src={offerImagePlaceholder} alt="Placeholder" className={styles.image_slider} />
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
            <LoopGalleryImages images={images} openLightbox={openLightbox} />
            <Lightbox images={images} active={isLightboxActive} setActive={setIsLightboxActive} currentIndex={activeIndex} setCurrentIndex={setActiveIndex} />
        </div>
    );
}

export default OfferGallery;