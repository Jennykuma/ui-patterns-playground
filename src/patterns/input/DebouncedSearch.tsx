import { useEffect, useState } from 'react';

export interface DebouncedSearchProps {
	/** Debounce duration in ms */
	delay?: number;
	/** String displayed in the search bar */
	placeholder?: string;
	/** Search is disabled */
	disabled?: boolean;
	/** Search is read only */
	readOnly?: boolean;
	/** Search handler */
	onSearch?: (value: string) => void;
}

/** Search input with debounced updates and inline clear action */
const DebouncedSearch = ({
	delay = 300,
	placeholder = 'Search something...',
	disabled = false,
	readOnly = false,
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
          w-md flex rounded-full h-12 bg-gray-100 mx-auto overflow-hidden
          border border-gray-200 disabled:border-0
					focus-within:outline-2 focus-within:outline-blue-600"
			>
				<input
					className="w-full outline-none text-sm px-6 disabled:bg-gray-200"
					aria-label="Search bar"
					type="text"
					readOnly={readOnly}
					disabled={disabled}
					placeholder={placeholder}
					value={searchValue}
					onChange={(event) => setSearchValue(event?.target.value)}
				/>
				{searchValue && !disabled && (
					<button
						type="button"
						aria-label="Clear search"
						className="pr-6 cursor-pointer self-center background-none"
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
