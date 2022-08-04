import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addTodosAsync } from '../redux/todos/todosSlice';
import Adding from './Adding';
import Error from './Error';

function Form() {

    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const isAddLoading = useSelector((state) => state.todos.isAddLoading);
    const error = useSelector((state) => state.todos.errorAdd);


    const handleSubmit = async (e) => {
        if (!title) {
            e.preventDefault();
            return;
        }
        e.preventDefault();
        await dispatch(/*addNew*/addTodosAsync({ title }));
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit} className='addForm'>
            <input disabled={isAddLoading} className="new-todo" placeholder="What needs to be done?" autoFocus value={title} onChange={(e) => setTitle(e.target.value)} />

            {
                isAddLoading && <Adding />//isAddLoading varsa bunu göster anlamı taşıyan ifade

            }
            {
                error && <Error message={error} />
            }

        </form>
    );
}

export default Form;