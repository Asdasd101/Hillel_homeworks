import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectTasksByStatus } from '../tasks/tasksSlice';
import { TaskCard } from '../tasks/TaskCard';

interface ColumnProps {
  title: string;
  status: 'todo' | 'inprogress' | 'done';
}

export const Column: React.FC<ColumnProps> = ({ title, status }) => {
  const tasks = useAppSelector(selectTasksByStatus(status));

  const getHeaderColor = () => {
    switch (status) {
      case 'todo': return 'bg-slate-100 text-slate-700';
      case 'inprogress': return 'bg-blue-50 text-blue-700';
      case 'done': return 'bg-emerald-50 text-emerald-700';
    }
  };

  return (
    <div className="flex flex-col flex-1 min-w-[300px] bg-slate-50/50 rounded-xl p-4 border border-slate-200">
      <div className={`px-3 py-1.5 rounded-md font-medium text-sm mb-4 inline-self-start ${getHeaderColor()}`}>
        {title} <span className="ml-1.5 opacity-60">{tasks.length}</span>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-8 text-sm text-slate-400 border border-dashed border-slate-200 rounded-lg">
            Немає завдань
          </div>
        )}
      </div>
    </div>
  );
};