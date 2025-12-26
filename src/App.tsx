import DebouncedSearch from './patterns/DebouncedSearch';
import './App.css';
import ClickOutsideDropdown from './patterns/ClickOutsideDropdown';

const App = () => {
  return (
    <>
      <div className="container bg-white mx-auto rounded p-8">
        <h2 className="text-3xl mb-8">Jenny's UI Interactions Playground</h2>
        <div className="flex gap-4">
          <DebouncedSearch />
          <DebouncedSearch />
          <DebouncedSearch />
          <ClickOutsideDropdown />
        </div>
      </div>
    </>
  );
};

export default App;
