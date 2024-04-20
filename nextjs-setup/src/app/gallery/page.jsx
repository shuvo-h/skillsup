import Image from 'next/image';
import React from 'react';
// import testImg from "../../assets/test_img.jpg"
import testImg from "@/assets/test_img.jpg"

export const metadata = {
    title:"Galary Meta Title",
    description:"Gallery meta description details"
}
const GalleryPage = () => {
    return (
        <div>
            <h1 className='text-center text-4xl'>Image Optimization</h1>
            <div className='text-center text-xl my-8'>
                <img 
                    width={500}
                    height={500}
                    className='mx-auto'
                    src="https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.jpg" 
                    alt="regular image" 
                />
                <h3>Regular Image(without optimize)</h3>
            </div>
            <div className='text-center text-xl my-8'>
                <Image 
                    className='mx-auto'
                    src="https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.jpg" 
                    alt="regular image" 
                    width={500}
                    height={500}
                    // fill={true}         // expand to full div with position:absolute
                />
                <h3>Optimized Image(With optimize)</h3>
            </div>
            <div className='text-center text-xl my-8'>
                <Image 
                    className='mx-auto'
                    src="https://t3.ftcdn.net/jpg/05/35/47/38/360_F_535473874_OWCa2ohzXXNZgqnlzF9QETsnbrSO9pFS.jpg" 
                    alt="regular image" 
                    width={500}
                    height={500}
                    // fill={true}         // expand to full div with position:absolute
                />
                <h3>Optimized Image(With optimize)</h3>
            </div>
            <div className='text-center text-xl my-8'>
                <Image 
                    className='mx-auto'
                    src={testImg} 
                    alt="regular image" 
                    width={500}
                    height={500}
                    // fill={true}         // expand to full div with position:absolute
                />
                <h3>Local Asset Image(With optimize)</h3>
            </div>
        </div>
    );
};

export default GalleryPage;