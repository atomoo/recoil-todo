import React from 'react';
import {RecoilRoot} from 'recoil';
import './App.css';
import {Filter} from './components/Filter';
import {TodoList} from './components/TodoList';


function App() {
  return (
    <div className="app">
      <RecoilRoot>
        <Filter />
        <TodoList />
      </RecoilRoot>
    </div>
  );
}

export default App;
