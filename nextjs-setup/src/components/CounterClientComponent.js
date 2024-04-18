"use client"
import React, { useState } from 'react';

const CounterClientComponent = () => {
    const [count,setCount] = useState(0)
    return (
        <div>
            <h1>{count}</h1>
            <button className="btn btn-accent" onClick={()=>setCount(count+1)}>Increase</button>
            <button className="btn btn-accent ml-4" onClick={()=>setCount(count-1)}>Decrease</button>
        </div>
    );
};

export default CounterClientComponent;