import { useState } from 'react';
import Card from '../components/Card';

const KeyboardToggle = () => {
  const [isOn, setIsOn] = useState(false);

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setIsOn(!isOn);
    }
  };

  const content = (
    <>
      <label className="inline-flex cursor-pointer">
        <input
          className="sr-only peer"
          type="checkbox"
          role="switch"
          checked={isOn}
          onChange={() => setIsOn((value) => !value)}
          onKeyDown={handleKeydown}
        />
        <div
          className="relative bg-neutral-300 w-8 h-4
          rounded-full mr-2 mt-0.5 peer
          peer-focus-visible:outline-none peer-focus-visible:ring-4 peer-focus-visible:ring-pink-100
          peer-checked:bg-pink-200 peer-checked:after:translate-x-full
          after:content-[''] after:absolute
          after:border-0 after:bg-white
          after:top-[0.5] after:start-[0.5]
          after:ring-1 after:ring-pink-100
          after:rounded-full after:h-4 after:w-4 after:transition-all"
        />
        <span className="text-sm">Toggle switch</span>
      </label>
    </>
  );

  return (
    <Card
      patternName="Keyboard Toggle"
      description="A keyboard-accessible toggle switch that supports mouse and Enter/Space interactions, demonstrating accessible state control"
    >
      {content}
    </Card>
  );
};

export default KeyboardToggle;
