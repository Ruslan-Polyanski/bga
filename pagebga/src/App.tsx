import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, addDataTC, DataItem, Teacher } from './store';
import { Dispatch } from 'redux';
import { Card } from './components/card';
import { setDataServer } from './api';

const dataSelector = (store: RootState) => store.data;
const teachersSelector = (store: RootState) => store.teachers;

function App() {

  const data: DataItem[] = useSelector(dataSelector);
  const teachers: Teacher[] = useSelector(teachersSelector);

  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    dispatch(addDataTC())
  }, [dispatch])

  const dataToServer = {
    data: data,
    teachers: teachers,
  };

  return (
    <>
      <div className="App">
        {data.map(item => <Card key={item.uniqueId} {...item} />)}
      </div>
      <button onClick={() => setDataServer(dataToServer)}>Сохранить</button>
    </>
  );
}

export default App;
