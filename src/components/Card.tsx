import type { ReactNode } from 'react';

interface CardProps {
  patternName: string;
  description?: string;
  children: ReactNode;
}

const Card = ({ patternName, description, children }: CardProps) => {
  const headingId = patternName.replace(/\s+/g, '-').toLowerCase();

  return (
    <section
      className="w-1/3 p-8 rounded-xl shadow-md text-left"
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="text-lg font-medium">
        {patternName}
      </h2>
      {description && (
        <p className="text-sm mb-4 text-gray-5w00">{description}</p>
      )}
      <div>{children}</div>
    </section>
  );
};

export default Card;
