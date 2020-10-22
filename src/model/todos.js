import {useCallback, useMemo} from 'react';
import {atom, selector, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';

export const todoState = atom({key: 'todoState', default: []});

export const filterState = atom({key: 'filterState', default: ''});

export const filteredTodoState = selector({
    key: 'filteredTodoState',
    get: ({get}) => {
        const todoList = get(todoState);
        const filter = get(filterState);
        if (filter) {
            return todoList.filter(todo => todo.detail.includes(filter));
        }
        return todoList;
    }
});

export const useTodoStore = () => {
    const setTodos = useSetRecoilState(todoState);
    const [filter, setFilter] = useRecoilState(filterState);
    const todos = useRecoilValue(filteredTodoState);

    const updateTodo = useCallback(
        todo => {
            setTodos(todos => {
                return todos.map(t => {
                    if (t.id === todo.id) {
                        return {
                            ...t,
                            ...todo
                        };
                    }
                    return {...t};
                });
            });
        },
        [setTodos]
    );

    const addTodo = useCallback(
        todo => {
            setTodos(todos => [...todos, todo])
        },
        [setTodos]
    );

    const resetTodos = useCallback(
        todos => {
            setTodos(todos);
        },
        [setTodos]
    );


    const store = useMemo(
        () => ({
            todos,
            filter,
            setFilter,
            updateTodo,
            addTodo,
            resetTodos
        }),
        [todos, filter, setFilter, updateTodo, addTodo, resetTodos]
    );

    return store;
};


const opts = {
    atom: {
        todos: [],
        filter: ''
    },
    selector: {
        filterTodos: ({todos, filter}) => {
            if (filter) {
                return todos.filter(todo => todo.detail.includes(filter));
            }
            return todos;
        }
    },
    dispatcher: {

    }
}

function useStore(opts) {
    return opts.atom;
}
