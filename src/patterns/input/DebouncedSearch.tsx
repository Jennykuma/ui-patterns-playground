import { useEffect, useState } from 'react';
import { LoaderCircle } from 'lucide-react';

export interface DebouncedSearchProps {
	/** Debounce duration in ms */
	delay?: number;
	/** Placeholder text for the search input */
	placeholder?: string;
	/** Search is disabled */
	disabled?: boolean;
	/** Search is read only */
	readOnly?: boolean;
	/** Whether an external search request is in flight. Overrides the internal debounce indicator */
	loading?: boolean;
	/** Called with the input value once the debounce delay has elapsed */
	onSearch?: (value: string) => void;
}

/** Search input with debounced updates and inline clear action */
const DebouncedSearch = ({
	delay = 300,
	placeholder = 'Search something...',
	disabled = false,
	readOnly = false,
	loading = false,
	onSearch = () => {},
}: DebouncedSearchProps) => {
	const [hasSearched, setHasSearched] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		setHasSearched(false);
		if (!searchValue) return;

		const timer = setTimeout(() => {
			onSearch(searchValue);
			setHasSearched(true);
		}, delay);

		return () => {
			clearTimeout(timer);
		};
	}, [searchValue]);

	return (
		<>
			<div
				className="
          w-md flex rounded-lg h-12 bg-gray-100 mx-auto overflow-hidden
          border border-gray-200 disabled:border-0
					focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-600"
			>
				{loading && (
					<LoaderCircle
						aria-hidden="true"
						className="animate-spin relative top-3.5 left-3 w-5 h-5 stroke-gray-400"
					/>
				)}
				<input
					className="w-full outline-none text-sm px-5 disabled:bg-gray-200"
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
						className="
							mr-5 cursor-pointer self-center background-none rounded
							outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
						onClick={() => setSearchValue('')}
						onMouseDown={(e) => e.preventDefault()}
					>
						✕
					</button>
				)}
			</div>
			<div role="status" aria-live="polite" className="text-sm mt-2">
				{loading && searchValue && (
					<p className="text-gray-600">Searching...</p>
				)}
				{hasSearched && searchValue && !loading && (
					<p className="text-green-700">
						Sent a fake search request!
					</p>
				)}
			</div>
		</>
	);
};

export default DebouncedSearch;
