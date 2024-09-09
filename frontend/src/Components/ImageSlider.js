import React from 'react';
import SimpleImageSlider from "react-simple-image-slider";
import Image1 from '../Images/I1.jpg';
import Image2 from '../Images/I2.jpg'; 
import Image3 from '../Images/I3.jpg';
import Image4 from '../Images/I4.jpg';
import Image5 from '../Images/I5.jpg';

const images = [
    { url: Image1 }, 
    { url: Image2 }, 
    { url: Image3 }, 
    { url: Image4 }, 
    { url: Image5 }
];

const ImageSlider = () => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "35vh", 
            width: "100%", 
        }}>
            <SimpleImageSlider
                width={840}
                height={304}
                images={images}
                showBullets={true}
                showNavs={true}
                loop={true}
                autoPlay={true}
            />
        </div>
    );
};

export default ImageSlider;
