import { useEffect, useState } from "react"

const data = [
  {
    "id": "1",
    "url": "https://picsum.photos/id/1018/800/600",
    "alt": "A person looking at a mountain view",
    "duration": 3000
  },
  {
    "id": "2",
    "url": "https://picsum.photos/id/1020/800/600",
    "alt": "Forest path with sunbeams",
    "duration": 4500
  },
  {
    "id": "3",
    "url": "https://picsum.photos/id/1021/800/600",
    "alt": "Lake with reflections of trees",
    "duration": 2500
  },
  {
    "id": "4",
    "url": "https://picsum.photos/id/1025/800/600",
    "alt": "Dog playing in the water",
    "duration": 4000
  },
  {
    "id": "5",
    "url": "https://picsum.photos/id/1031/800/600",
    "alt": "Desert landscape with sand dunes",
    "duration": 3500
  },
  {
    "id": "6",
    "url": "https://picsum.photos/id/1033/800/600",
    "alt": "Night sky with stars and milky way",
    "duration": 5000
  }
]

export default function ImageSlideshow(){
    const [images, setImages] = useState(data);
    const [imagesIndex, setImagesIndex] = useState(0);

    useEffect(() => {
        let timeoutId = setTimeout(function incrementIndex() {
            setImagesIndex((prev) => {
                const nextIdx = prev > images.length-2 ? 0 : prev+1;
                timeoutId = setTimeout(incrementIndex, images[nextIdx].duration);
                return nextIdx;
            })
        }, images[imagesIndex].duration);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <img src={images[imagesIndex].url} alt={images[imagesIndex].alt} />
    )
}