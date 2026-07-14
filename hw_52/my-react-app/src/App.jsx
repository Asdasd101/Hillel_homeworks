import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchTasks } from './features/tasks/tasksThunks';
import { addTask } from './features/tasks/tasksSlice';
import { Column } from './features/columns/Column';
import { Loader2, AlertCircle, PlusCircle } from 'lucide-react';

export default function App() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.tasks);

  // Локальний стан
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo'); // Прибрали "as 'todo' | ..."

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Прибрали типізацію ": React.FormEvent" з аргументу е
  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      status: status,
    };

    dispatch(addTask(newTask));

    setTitle('');
    setDescription('');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="bg-white border-b border-slate-200 py-4 px-8 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight text-slate-950">
          Канбан Дошка Проекту
        </h1>
      </header>

      <main className="p-8 max-w-7xl mx-auto">
        <form 
          onSubmit={handleCreateTask} 
          className="mb-8 p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-end"
        >
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">Назва завдання</label>
            <input
              type="text"
              placeholder="Наприклад: Вивчити React Hooks"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <div className="flex-[2] min-w-[250px]">
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">Опис (необов'язково)</label>
            <input
              type="text"
              placeholder="Короткий опис деталей..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="min-w-[150px]">
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">Колонка</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)} // Прибрали "as ..."
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="todo">Черга (Беклог)</option>
              <option value="inprogress">В процесі</option>
              <option value="done">Готово</option>
            </select>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm"
          >
            <PlusCircle size={16} />
            Додати
          </button>
        </form>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="animate-spin text-blue-600" size={32} />
            <p className="text-sm text-slate-500 font-medium">Завантаження завдань...</p>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg max-w-md mx-auto my-10">
            <AlertCircle size={20} />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {!loading && !error && (
          <div className="flex flex-col md:flex-row gap-6 items-start overflow-x-auto pb-4">
            <Column title="Черга (Беклог)" status="todo" />
            <Column title="В процесі" status="inprogress" />
            <Column title="Готово" status="done" />
          </div>
        )}
      </main>
    </div>
  );
}