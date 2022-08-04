import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { changeActiveFilter, clearCompleted, selectTodos, selectActiveFilter } from '../redux/todos/todosSlice';


function ContentFooter() {
    const dispatch = useDispatch();
    const items = useSelector(selectTodos);
    const itemLeft = items.filter(item => !item.completed).length;

    const activeFilter = useSelector(selectActiveFilter);

    useEffect(() => {
        localStorage.setItem('activeFilter', activeFilter);
    }, [activeFilter]);

    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{itemLeft}</strong>
                &nbsp;
                item{itemLeft > 1 && 's'} left
            </span>

            <ul className="filters">
                <li>
                    <a href="#/" className={activeFilter === 'all' ? 'selected' : 'unselected'} onClick={() => dispatch(changeActiveFilter('all'))}>All</a>
                </li>
                <li>
                    <a href="#/" className={activeFilter === 'active' ? 'selected' : 'unselected'} onClick={() => dispatch(changeActiveFilter('active'))}>Active</a>
                </li>
                <li>
                    <a href="#/" className={activeFilter === 'completed' ? 'selected' : 'unselected'} onClick={() => dispatch(changeActiveFilter('completed'))}>Completed</a>
                </li>
            </ul>

            <button className="clear-completed" onClick={() => dispatch(clearCompleted())}>
                Clear completed
            </button>
        </footer>
    )
}

export default ContentFooter