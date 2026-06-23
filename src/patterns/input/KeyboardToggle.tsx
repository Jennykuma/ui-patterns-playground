import { useState } from 'react';
import classNames from 'classnames';

export interface KeyboardToggleProps {
	/** Text rendered next to the switch, also used as its accessible label */
	label?: string;
	/** Initial checked state when the toggle is first rendered */
	defaultChecked?: boolean;
	/** Prevents the toggle from being focused or switched */
	disabled?: boolean;
	/** Called with the new checked value whenever the toggle is switched */
	onChange?: (value: boolean) => void;
}

/** A keyboard-accessible toggle switch that supports mouse and Enter/Space interactions, demonstrating accessible state control */
const KeyboardToggle = ({
	label = 'Keyboard Toggle',
	defaultChecked = false,
	disabled = false,
	onChange,
}: KeyboardToggleProps) => {
	const [isChecked, setIsChecked] = useState(defaultChecked);

	const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (disabled) return;
		if (e.key === 'Enter') {
			e.preventDefault();
			setIsChecked((value) => !value);
		}
	};

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const checked = e.currentTarget.checked;
		setIsChecked(checked);
		onChange?.(checked);
	};

	return (
		<>
			<label className="inline-flex cursor-pointer">
				<input
					id="keyboard-toggle-input"
					aria-checked={isChecked}
					aria-disabled={disabled}
					aria-labelledby="keyboard-toggle-label"
					className="sr-only peer"
					type="checkbox"
					role="switch"
					checked={isChecked}
					disabled={disabled}
					onChange={handleOnChange}
					onKeyDown={handleKeydown}
				/>
				<div
					className={classNames(`
						relative w-8 h-4
						rounded-full mr-2 mt-0.5 peer
						peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
						bg-neutral-${disabled && !isChecked ? '200' : '300'}
						peer-checked:bg-${disabled ? 'blue-300' : 'blue-500'}
						after:ring-${disabled ? 'gray-200' : 'gray-300'}
						peer-checked:after:translate-x-full
						after:content-[''] after:absolute
						after:border-0 after:bg-white
						after:top-[0.5] after:start-[0.5]
						after:ring-1 after:ring-gray-200
						after:rounded-full after:h-4 after:w-4 after:transition-all`)}
				/>
				<span id="keyboard-toggle-label" className="text-sm">
					{label}
				</span>
			</label>
		</>
	);
};

export default KeyboardToggle;
