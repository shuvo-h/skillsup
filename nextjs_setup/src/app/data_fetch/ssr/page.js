import Link from 'next/link';
import React from 'react';
// SSR: Server Side Rendering
/*
    cache: 'no-store' means it will fetch the data every time user reload the page and generate html and send to user

*/
const SSR_Page = async () => {
    const data = await fetch(`http://localhost:5000/shoes`,{
        cache: "no-store"  // indicate SSR // it will not cache the fetched data
    }).then(res=>res.json())
    console.log(data);

    // if throw any error, it will be shown in root error.js file
    // throw new Error("Custom error from Server Component SSR -> src/app/error.js page display")

    return (
        <div>
            <h2>SSR Page(Server Side Rendering)</h2>
            <div className='my-4 text-center'>
                <Link href={"/data_fetch/ssg"}><button className="btn btn-outline btn-primary">SSG</button></Link>
                <Link href={"/data_fetch/isr"}><button className="btn btn-outline btn-primary ml-2">ISR</button></Link>
            </div>
            <div className='flex gap-4 flex-wrap'>
                {
                  data.map(shoe=><div className="card w-96 bg-base-100 shadow-xl" key={shoe.id}>
                    <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">
                        {shoe.title}
                        <div className="badge badge-secondary">BDT {shoe.price}</div>
                        </h2>
                        <p>{shoe.description}</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-outline btn-primary">Buy Now</button>
                        <button className="btn btn-outline btn-primary">Details</button>
                        </div>
                    </div>
                    </div>)  
                }
            </div>
            
        </div>
    );
};

export default SSR_Page;