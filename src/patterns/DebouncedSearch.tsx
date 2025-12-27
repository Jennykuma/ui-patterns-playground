import { useEffect, useState } from 'react';
import Card from '../components/Card';

const DebouncedSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [showSearching, setShowSearching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSearching(true);
    }, 300);

    return () => {
      clearTimeout(timer);
      setShowSearching(false);
    };
  }, [searchValue]);

  const content = (
    <>
      <div
        className="
          flex rounded-full h-12 bg-gray-200 px-4 py-3 mx-auto overflow-hidden
          border-2 border-transparent
          focus-within:border-blue-400"
      >
        <input
          className="w-full outline-none text-sm pr-6"
          type="text"
          placeholder="Search something..."
          value={searchValue}
          onChange={(event) => setSearchValue(event?.target.value)}
        />
        {searchValue && (
          <button
            type="button"
            aria-label="Clear search"
            className="cursor-pointer self-center"
            onClick={() => setSearchValue('')}
            onMouseDown={(e) => e.preventDefault()}
          >
            ✕
          </button>
        )}
      </div>
      <div className="text-sm mt-2 text-green-700">
        {showSearching && searchValue && <p>Sent a fake search request!</p>}
      </div>
    </>
  );

  return (
    <Card
      patternName="Debounced Search"
      description="Search input with debounced updates and inline clear action"
    >
      {content}
    </Card>
  );
};

export default DebouncedSearch;
