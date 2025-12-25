import DebouncedSearch from './patterns/DebouncedSearch';
import './App.css';

const App = () => {
  return (
    <>
      <div className="container bg-white mx-auto rounded p-8">
        <h1 className="text-3xl mb-8">Jenny's UI Interactions Playground</h1>
        <div className="flex">
          <DebouncedSearch />
        </div>
      </div>
    </>
  );
};

export default App;
