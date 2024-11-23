import { useState } from 'react';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import './App.css';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
  let [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Rest API', isDone: false },
    { id: v1(), title: 'GraphQL', isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterValuesType>('all');

  const removeTask = (id: string) => setTasks(tasks.filter(t => t.id !== id));

  const addTask = (title: string) => {
    const task = { id: v1(), title: title, isDone: false };
    setTasks([task, ...tasks]);
  };

  const filteredTasks = (): TaskType[] => {
    switch (filter) {
      case 'active':
        return tasks.filter(t => !t.isDone);
      case 'completed':
        return tasks.filter(t => t.isDone);
      default:
        return tasks;
    }
  };
  const tasksForTodolist = filteredTasks();

  const changeFilter = (value: FilterValuesType) => setFilter(value);

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
