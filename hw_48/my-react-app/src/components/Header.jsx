import React from 'react';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">MyDashboard</h1>
        <nav className="space-x-4 text-sm font-medium">
          <a href="#" className="hover:text-blue-200 transition">Головна</a>
          <a href="#" className="hover:text-blue-200 transition">Про нас</a>
        </nav>
      </div>
    </header>
  );
}