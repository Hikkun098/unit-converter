import React from 'react';

interface CategoryCardProps {
  name: string;
  onClick: () => void;
}

export const CategoryCard = ({ name, onClick }: CategoryCardProps) => {
  return (
    <div 
      className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer border border-blue-200"
      onClick={onClick}
    >
      <div className="text-blue-500 font-medium text-center">{name}</div>
    </div>
  );
};