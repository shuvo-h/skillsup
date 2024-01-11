import React from 'react';
import TodoCard from './TodoCard';
import AddTodoModal from './AddTodoModal';
import TodoFilter from './TodoFilter';
import { useAppSelector } from '@/redux/storeHook';
import { TodoDummyItem, dummyJsonApi } from '@/redux/api/api';

const TodoContainer = () => {
    // from local redux state
    const {todos} = useAppSelector(state=>state.todo);
    // from server usinf RTK
    const {data,isLoading} = dummyJsonApi.useGetDummyAllTodoQuery('');
   
    
    function transformTodo(originalTodo:TodoDummyItem) {
        return {
          id: String(originalTodo.id),
          title: originalTodo.todo,
          description: `User ${originalTodo.userId}'s task`,
          isCompleted: originalTodo.completed,
        };
      }

    if (isLoading) {
        return <p>Loading.....</p>
    }
    return (
        <div>
            <div className='flex justify-between mb-5'>
                <AddTodoModal />
                <TodoFilter />
            </div>
            <div className='bg-primary-gradient w-full h-full rounded-xl p-1'>
                <div className='bg-white p-5 w-full h-full rounded-xl space-y-2'>
                    {/* <div className='bg-white p-3 flex justify-center text-2xl font-semibold items-center rounded-md'>No task pending</div> */}
                    
                    
                    {
                        todos.map(todo =><TodoCard todo={todo} key={todo.id} /> )
                    }
                    {
                        data?.todos.map(todo =><TodoCard todo={transformTodo(todo)} key={todo.id} /> )
                    }
                </div>
            </div>
            
        </div>
    );
};

export default TodoContainer;