import React, { useState } from 'react';

export default function Form({ onAddItem }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;

    onAddItem({ title, desc, id: Date.now() });
    
    setTitle('');
    setDesc('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 max-w-md mx-auto w-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Додати нову картку</h3>
      
      <div className="mb-4">
        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Заголовок</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введіть назву..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="mb-4">
        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Опис</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Додайте опис..."
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition shadow-sm"
      >
        Створити
      </button>
    </form>
  );
}