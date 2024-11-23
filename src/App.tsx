import { useState } from 'react';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import './App.css';

//2.Let`s replace our if`s with  switch.

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
  let [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Rest API', isDone: false },
    { id: v1(), title: 'GraphQL', isDone: false },
  ]);

  function removeTask(id: string) {
    const filteredTasks = tasks.filter(t => t.id !== id);
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    const task = { id: v1(), title: title, isDone: false };
    const newTasks = [task, ...tasks];
    setTasks(newTasks);
  }

  const [filter, setFilter] = useState<FilterValuesType>('all');

  const filteredTasks = (): TaskType[] => {
    let tasksForTodolist = tasks;

    if (filter === 'active') {
      return (tasksForTodolist = tasks.filter(t => !t.isDone));
    } else if (filter === 'completed') {
      return (tasksForTodolist = tasks.filter(t => t.isDone));
    }
    return tasksForTodolist;
  };
  const tasksForTodolist = filteredTasks();

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  return (
    <div className='App'>
      <Todolist
        title='What to learn'
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
