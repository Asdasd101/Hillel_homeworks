import React from 'react';

export default function Card({ title, desc }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-md transition">
      <div>
        <h4 className="text-base font-bold text-gray-900 mb-2 break-words">{title}</h4>
        <p className="text-sm text-gray-600 leading-relaxed break-words">{desc}</p>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">Активно</span>
      </div>
    </div>
  );
}