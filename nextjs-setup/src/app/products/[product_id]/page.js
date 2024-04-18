import React from 'react';

const DynamicRoute = ({params,searchParams}) => {
    console.log(params,searchParams);
    return (
        <div>
            DynamicRoute {JSON.stringify({params,searchParams})}
        </div>
    );
};

export default DynamicRoute;