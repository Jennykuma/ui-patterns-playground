import type { ReactNode } from 'react';

interface CardProps {
  patternName: string;
  description?: string;
  children: ReactNode;
}

const Card = ({ patternName, description, children }: CardProps) => {
  return (
    <div className="w-1/3 p-8 rounded-xl shadow-md text-left">
      <h2 className="text-lg font-medium">{patternName}</h2>
      <p className="text-sm mb-4 text-gray-5w00">{description}</p>
      <div>{children}</div>
    </div>
  );
};

export default Card;
