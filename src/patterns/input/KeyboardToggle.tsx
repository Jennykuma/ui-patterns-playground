import { useState } from 'react';

export interface KeyboardToggleProps {
	label?: string;
	defaultChecked?: boolean;
	onChange?: (value: boolean) => void;
}

/** A keyboard-accessible toggle switch that supports mouse and Enter/Space interactions, demonstrating accessible state control */
const KeyboardToggle = ({
	label = 'Keyboard Toggle',
	defaultChecked = false,
}: KeyboardToggleProps) => {
	const [isChecked, setIsChecked] = useState(defaultChecked);

	const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			setIsChecked((value) => !value);
		}
	};

	return (
		<>
			<label className="inline-flex cursor-pointer">
				<input
					id="keyboard-toggle-input"
					aria-checked={isChecked}
					aria-labelledby="keyboard-toggle-label"
					className="sr-only peer"
					type="checkbox"
					role="switch"
					checked={isChecked}
					onChange={(e) => setIsChecked(e.currentTarget.checked)}
					onKeyDown={handleKeydown}
				/>
				<div
					className="
						relative bg-neutral-300 w-8 h-4
						rounded-full mr-2 mt-0.5 peer
						peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-100
						peer-checked:bg-pink-200 peer-checked:after:translate-x-full
						after:content-[''] after:absolute
						after:border-0 after:bg-white
						after:top-[0.5] after:start-[0.5]
						after:ring-1 after:ring-pink-100
						after:rounded-full after:h-4 after:w-4 after:transition-all"
				/>
				<span id="keyboard-toggle-label" className="text-sm">
					{label}
				</span>
			</label>
		</>
	);
};

export default KeyboardToggle;
