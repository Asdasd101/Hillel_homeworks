import React from 'react';
import { Task } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { moveTask } from './tasksSlice';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const dispatch = useAppDispatch();

  const handleMove = () => {
    const nextStatus = task.status === 'todo' ? 'inprogress' : 'done';
    dispatch(moveTask({ taskId: task.id, newStatus: nextStatus }));
  };

  return (
    <div className="p-4 mb-3 bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <h4 className="font-semibold text-slate-800 text-lg mb-1">{task.title}</h4>
      <p className="text-sm text-slate-600 mb-4">{task.description}</p>
      
      {task.status !== 'done' && (
        <button
          onClick={handleMove}
          className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 mt-2 transition-colors"
        >
          {task.status === 'todo' ? (
            <>В роботу <ArrowRight size={14} /></>
          ) : (
            <>Завершити <CheckCircle size={14} /></>
          )}
        </button>
      )}
    </div>
  );
};