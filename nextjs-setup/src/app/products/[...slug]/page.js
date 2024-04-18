import React from 'react';

const CatchAllRoutes = ({params,searchParams}) => {
    console.log({params,searchParams});
    return (
        <div>
            CatchAllRoutes {JSON.stringify({params,searchParams})}
        </div>
    );
};

export default CatchAllRoutes;