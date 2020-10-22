import React, {useState, useEffect} from 'react';
import {Button, List} from 'antd';
import {queryList} from '../mock/todoData';
import {useTodoStore} from '../model/todos';
import {useCallback} from 'react';

function TodoItem({item}) {
    const {updateTodo} = useTodoStore();

    const toggleCompleted = useCallback(
        () => {
            updateTodo({...item, completed: !item.completed});
        },
        [updateTodo, item]
    );

    if (item.completed) {
        return <List.Item
            style={{textDecoration: 'line-through'}}
            actions={[<Button type="link" onClick={toggleCompleted}>继续</Button>]}
        >
            {item.detail}
        </List.Item>;
    }
    return <List.Item actions={[<Button type="link" onClick={toggleCompleted}>完成</Button>]}>
        {item.detail}
    </List.Item>;
}

export const TodoList = () => {
    const {todos, resetTodos} = useTodoStore();
    const [loading, setLoading] = useState(true);

    useEffect(
        () => {
            (async () => {
                const data = await queryList();
                setLoading(false);
                resetTodos(data);
            })()
        },
        [resetTodos]
    );

    return <div>
        <List loading={loading} dataSource={todos} renderItem={item => <TodoItem item={item} />} />
    </div>
};
