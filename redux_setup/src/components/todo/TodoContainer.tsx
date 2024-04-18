import React, { useState } from 'react';
import TodoCard from './TodoCard';
import AddTodoModal from './AddTodoModal';
import TodoFilter from './TodoFilter';
import { useAppSelector } from '@/redux/storeHook';
import { dummyJsonApi } from '@/redux/api/api';

const TodoContainer = () => {
    const [priority,setPriority] = useState('');
    // from local redux state
    const {todos} = useAppSelector(state=>state.todo);
    // from server usinf RTK
    const {data,isLoading} = dummyJsonApi.useGetDummyAllTodoQuery(
        {page:1,limit:50,priority},
        {
            // pollingInterval: 30*1000,  // fetch every 30*1000ms
            // refetchOnMountOrArgChange: true , // if router change and come again to this route, fetch a new request
        }
    );
    
   
    
   

    if (isLoading) {
        return <p>Loading.....</p>
    }
    return (
        <div>
            <div className='flex justify-between mb-5'>
                <AddTodoModal />
                <TodoFilter priority={priority} setPriority={setPriority} />
            </div>
            <div className='bg-primary-gradient w-full h-full rounded-xl p-1'>
                <div className='bg-white p-5 w-full h-full rounded-xl space-y-2'>
                    {/* <div className='bg-white p-3 flex justify-center text-2xl font-semibold items-center rounded-md'>No task pending</div> */}
                    
                    
                    {
                        todos.map(todo =><TodoCard todo={todo} key={todo.id} /> )
                    }
                    {
                        data?.data?.todos.map(todo =><TodoCard todo={todo} key={todo.id} /> )
                    }
                </div>
            </div>
            
        </div>
    );
};

export default TodoContainer;