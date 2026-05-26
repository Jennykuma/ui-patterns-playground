import DebouncedSearch from './patterns/DebouncedSearch';
import ClickOutsideDropdown from './patterns/ClickOutsideDropdown';
import KeyboardToggle from './patterns/KeyboardToggle';
import Modal from './patterns/Modal';
import Tabs from './patterns/Tabs';
import Tooltips from './patterns/Tooltips';
import './App.css';

const App = () => {
	return (
		<>
			<div className="mx-auto rounded-4xl p-8">
				<h2 className="text-white text-3xl mb-8">
					Jenny's UI Patterns Playground
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<DebouncedSearch />
					<ClickOutsideDropdown />
					<KeyboardToggle />
					<Modal />
					<Tabs />
					<Tooltips />
				</div>
			</div>
		</>
	);
};

export default App;
