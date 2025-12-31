import DebouncedSearch from './patterns/DebouncedSearch';
import './App.css';
import ClickOutsideDropdown from './patterns/ClickOutsideDropdown';
import KeyboardToggle from './patterns/KeyboardToggle';
import Modal from './patterns/Modal';

const App = () => {
  return (
    <>
      <div className="container bg-white mx-auto rounded-4xl p-8">
        <h2 className="text-3xl mb-8">Jenny's UI Patterns Playground</h2>
        <div className="grid grid-cols-2 grid-rows-2 gap-6">
          <DebouncedSearch />
          <ClickOutsideDropdown />
          <KeyboardToggle />
          <Modal />
        </div>
      </div>
    </>
  );
};

export default App;
