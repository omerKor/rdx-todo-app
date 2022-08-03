import { createSlice, nanoid } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [
            {
                id: "1",
                title: "learn React-1",
                completed: true,
            },
            {
                id: "2",
                title: "learn React-2",
                completed: false,
            },
            {
                id: "3",
                title: "learn React-3",
                completed: false,
            },
        ],
        activeFilter: 'all',
    },
    reducers: {
        addNew: {
            reducer: (state, action) => {
                state.items.push(action.payload)
            },
            prepare: ({ title }) => {
                return {
                    payload: {
                        id: nanoid,
                        completed: false,
                        title
                    }
                }
            },
        },
        toggle: (state, action) => {
            const { id } = action.payload;
            const item = state.items.find(item => item.id === id);
            item.completed = !item.completed;
        },
        destroy: (state, action) => {
            const id = action.payload;
            const filtered = state.items.filter(item => item.id !== id);
            state.items = filtered;
        },
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
        clearCompleted: (state) => {
            const filtered = state.items.filter(item => item.completed === false);
            state.items = filtered;
        },
    },
});

//Selectors
export const selectActiveFilter = state => state.todos.activeFilter;
export const selectTodos = state => state.todos.items;
export const selectFilteredTodos = (state) => {
    if (state.todos.activeFilter === 'all') {
        return state.todos.items;
    }
    return state.todos.items.filter((todo) =>
        state.todos.activeFilter === 'active' ? todo.completed === false : todo.completed === true,
    );
};

export default todosSlice.reducer;
export const { addNew, toggle, destroy, changeActiveFilter, clearCompleted } = todosSlice.actions;