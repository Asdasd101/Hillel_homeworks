import React, { useState } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Card from './components/Card';
import './App.css'

export default function App() {
  const [items, setItems] = useState([
    { id: 1, title: 'Перший проєкт', desc: 'Це базовий приклад адаптивної картки на Tailwind CSS.' },
    { id: 2, title: 'Компоненти React', desc: 'Усі компоненти ізольовані та отримують дані через пропси.' }
  ]);

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [newItem, ...prevItems]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans antialiased text-gray-800">
      <Header />

      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <section className="md:col-span-1">
          <Form onAddItem={handleAddItem} />
        </section>
        <section className="md:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Ваші картки ({items.length})</h2>
          
          {items.length === 0 ? (
            <p className="text-gray-500 text-sm italic">Список порожній. Додайте щось за допомогою форми ліворуч.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((item) => (
                <Card 
                  key={item.id} 
                  title={item.title} 
                  desc={item.desc} 
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="bg-gray-100 border-t border-gray-200 text-center py-4 text-xs text-gray-500">
        &copy; {new Date().getFullYear()} MyDashboard. Усі права захищено.
      </footer>
    </div>
  );
}