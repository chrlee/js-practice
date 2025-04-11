import { useState } from 'react';
import { faker } from '@faker-js/faker';
import './ImageCarousel.css'

const images = Array.from({ length: 6 }).map(() => faker.image.urlPicsumPhotos());

export default function() {
    const [imageIndex, setImageIndex] = useState(0);
    const incrementIndex = () => {
        if(imageIndex < images.length-1) setImageIndex(imageIndex+1);
    }
    const decrementIndex = () => {
        if(imageIndex > 0) setImageIndex(imageIndex-1);
    }

    return(
        <div className="carouselContainer">
            <div className="imageContainer">
                <img src={images[imageIndex]} />
            </div>
            <div className="controlsContainer">
                <button onClick={decrementIndex}>{'<'}</button>
                <div className="descriptionContainer">
                    {faker.lorem.sentence()}
                </div>
                <button onClick={incrementIndex}>{'>'}</button>
            </div>
        </div>
    );
}