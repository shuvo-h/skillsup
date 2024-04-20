import Link from 'next/link';
import React from 'react';
// ISR: Incremental Static Re-Generation 
/*
    cache: 'force-cache' means it will fetch the data during 'build' and keep cache. So keep server running during build

*/
const ISR_Page = async () => {
    const data = await fetch(`http://localhost:5000/shoes`,{
        next:{
            revalidate: 10, // indicate ISR   // 10s    // It will recheck the fetched data from API if data changes in database, then it will re generate static html with new updated data, 
        }
    }).then(res=>res.json())
    console.log(data);
    return (
        <div>
            <h2>ISR Page(Incremental Static Re-Generation)</h2>
            <div className='my-4 text-center'>
                <Link href={"/data_fetch/ssg"}><button className="btn btn-outline btn-primary">SSG</button></Link>
                <Link href={"/data_fetch/ssr"}><button className="btn btn-outline btn-primary ml-2">SSR</button></Link>
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

export default ISR_Page;