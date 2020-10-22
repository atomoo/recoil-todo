import React, {useCallback} from 'react';
import {Button, Input} from 'antd';
import {useTodoStore} from '../model/todos';

export function Filter() {
    const {filter, setFilter, addTodo} = useTodoStore();

    const onChange = useCallback(e => {
        setFilter(e.target.value);
    }, [setFilter]);

    const add = useCallback(
        () => {
            if (filter) {
                addTodo(
                    {
                        id: Math.round(Math.random() * 100000),
                        detail: filter
                    }
                );
                setFilter('')
            }
        },
        [addTodo, filter, setFilter]
    );


    return <div style={{display: 'flex'}}>
        <Input value={filter} onChange={onChange} />
        <Button type="primary" onClick={add}>Add</Button>
    </div>
}
