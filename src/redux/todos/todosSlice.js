import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

/*==*/
import axios from "axios";
export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
    return res.data;
});
export const addTodosAsync = createAsyncThunk('todos/addTodosAsync', async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`, data);
    return res.data;
});
export const toggleTodosAsync = createAsyncThunk('todos/toggleTodosAsync', async ({ id, data }) => {
    const res = await axios.patch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`, data);
    return res.data;
});
export const removeTodosAsync = createAsyncThunk('todos/removeTodosAsync', async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`);
    return id;
});
/*==*/

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [
            /*Backend olmadığında default gösterilecek veriler
                {
                    id: "1",
                    title: "React-1",
                    completed: true,
                },
                {
                    id: "2",
                    title: "rn React-2",
                    completed: false,
                },
                {
                    id: "3",
                    title: "React-3",
                    completed: false,
                },
            */
        ],
        isLoading: false,
        isAddLoading: false,
        error: null,
        errorAdd: null,
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
        /*
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
         */
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
        clearCompleted: (state) => {
            const filtered = state.items.filter(item => item.completed === false);
            state.items = filtered;
        },
    },
    /*==*/
    extraReducers: {
        //get
        [getTodosAsync.pending]: (state) => {
            state.isLoading = true;
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
        },
        [getTodosAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        },
        //add
        [addTodosAsync.pending]: (state) => {
            state.isAddLoading = true;

        },
        [addTodosAsync.fulfilled]: (state, action) => {
            state.items.push(action.payload);
            state.isAddLoading = false;

        },
        [addTodosAsync.rejected]: (state, action) => {
            state.errorAdd = action.error.message;
            state.isAddLoading = false;
        },
        //toggle
        [toggleTodosAsync.fulfilled]: (state, action) => {
            const { id, completed } = action.payload;
            const index = state.items.findIndex((item) => item.id === id);
            state.items[index].completed = completed;
        },
        //destroy
        [removeTodosAsync.fulfilled]: (state, action) => {
            const id = action.payload;
            const index = state.items.findIndex((item) => item.id === id);
            state.items.splice(index, 1);
        },
    }
    /*==*/

});

//Selectors
/*==*/
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
/*==*/

export default todosSlice.reducer;
export const { /*addNew,*/ toggle, destroy, changeActiveFilter, clearCompleted } = todosSlice.actions;