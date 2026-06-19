import { useEffect, useState } from 'react';

export interface DebouncedSearchProps {
	/** Debounce duration in ms */
	delay?: number;
	/** String displayed in the search bar */
	placeholder?: string;
	/** Search handler */
	onSearch?: (value: string) => void;
}

/** Search input with debounced updates and inline clear action */
const DebouncedSearch = ({
	delay = 300,
	placeholder = 'Search something...',
}: DebouncedSearchProps) => {
	const [searchValue, setSearchValue] = useState('');
	const [showSearching, setShowSearching] = useState(false);

	useEffect(() => {
		setShowSearching(false);
		if (!searchValue) return;

		const timer = setTimeout(() => {
			setShowSearching(true);
		}, delay);

		return () => {
			clearTimeout(timer);
			setShowSearching(false);
		};
	}, [searchValue]);

	return (
		<>
			<div
				className="
          w-md flex rounded-full h-12 bg-gray-200 px-4 py-3 mx-auto overflow-hidden
          border-2 border-transparent
          focus-within:border-blue-400"
			>
				<input
					className="w-full outline-none text-sm pr-6"
					aria-label="Search bar"
					type="text"
					placeholder={placeholder}
					value={searchValue}
					onChange={(event) => setSearchValue(event?.target.value)}
				/>
				{searchValue && (
					<button
						type="button"
						aria-label="Clear search"
						className="cursor-pointer self-center background-none"
						onClick={() => setSearchValue('')}
						onMouseDown={(e) => e.preventDefault()}
					>
						✕
					</button>
				)}
			</div>
			<div className="text-sm mt-2 text-green-700">
				{showSearching && searchValue && (
					<p>Sent a fake search request!</p>
				)}
			</div>
		</>
	);
};

export default DebouncedSearch;
