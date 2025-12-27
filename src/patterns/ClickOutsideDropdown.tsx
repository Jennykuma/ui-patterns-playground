import { useState, useRef, useEffect } from 'react';
import Card from '../components/Card';

const ClickOutsideDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!showDropdown) return;
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [showDropdown]);

  const handleClick = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (containerRef.current && e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  const content = (
    <div ref={containerRef}>
      <button
        className="dropdown-btn bg-sage-green p-1.5 rounded-md text-sm text-white"
        aria-expanded={showDropdown}
        onClick={() => setShowDropdown(true)}
      >
        Click me!
      </button>
      {showDropdown && (
        <div className="dropdown border border-gray-200 mt-1 p-1">
          <ul>
            {[1, 2, 3].map((num: number) => {
              return (
                <li
                  className="hover:bg-gray-100 text-sm"
                  role="menuitem"
                  onClick={() => alert(`You have clicked item ${num}!`)}
                >
                  item {num}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <Card
      patternName="Click-Outside Dropdown"
      description="A dropdown that dismisses on outside clicks and Escape, using refs and document event listeners"
    >
      {content}
    </Card>
  );
};

export default ClickOutsideDropdown;
