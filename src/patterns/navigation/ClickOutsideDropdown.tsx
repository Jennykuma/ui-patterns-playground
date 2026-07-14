import { useState, useRef, useEffect } from 'react';

export interface ClickOutsideDropdownProps {
  /** Menu items displayed in the dropdown */
  items?: string[];
}

/** Dropdown that closes on outside click or Escape, using refs and document event listeners */
const ClickOutsideDropdown = ({
  items = ['Item 1', 'Item 2', 'Item 3'],
}: ClickOutsideDropdownProps) => {
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

  return (
    <div ref={containerRef}>
      <button
        className="dropdown-btn bg-sage-green p-1.5 rounded-md text-sm text-white cursor-pointer"
        aria-controls="dropdown"
        aria-expanded={showDropdown}
        onClick={() => setShowDropdown(true)}
      >
        Click me!
      </button>
      {showDropdown && (
        <div
          id="dropdown"
          role="menu"
          className="dropdown border border-gray-200 mt-1 p-1"
        >
          <ul>
            {items.map((item) => (
              <li
                key={item}
                className="hover:bg-gray-100 text-sm cursor-pointer"
                role="menuitem"
                onClick={() => alert(`You have clicked ${item}!`)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClickOutsideDropdown;
