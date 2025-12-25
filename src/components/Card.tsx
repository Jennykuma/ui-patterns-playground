import type { ReactNode } from 'react';

interface CardProps {
  patternName: string;
  description?: string;
  children: ReactNode;
}

const Card = ({ patternName, description, children }: CardProps) => {
  return (
    <div className="w-1/3 p-8 rounded-xl shadow-xl text-left">
      <h2 className="text-lg font-medium">{patternName}</h2>
      <p>{description}</p>
      <div>{children}</div>
    </div>
  );
};

export default Card;
