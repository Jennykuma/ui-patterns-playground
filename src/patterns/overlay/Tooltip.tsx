import { useState } from 'react';

export interface TooltipProps {
	/** Content displayed inside the tooltip */
	text?: string;
	/** Label on the trigger button */
	label?: string;
}

/** Tooltip that appears on hover or focus and dismisses on Escape or blur */
const Tooltip = ({
	text = 'This is a tooltip!',
	label = 'Hover over me!',
}: TooltipProps) => {
	const [showTooltip, setShowTooltip] = useState(false);

	const handleHideTooltip = () => {
		setTimeout(() => {
			setShowTooltip(false);
		}, 200);
	};

	const handleKeydown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
		if (e.key === 'Escape') {
			setShowTooltip(false);
		}
	};

	return (
		<div className="relative inline-block">
			<button
				aria-describedby="button-tooltip"
				className="
					bg-blue-500 hover:bg-blue-400 transition-colors duration-200
					p-1.5 rounded-md text-sm text-white font-semibold cursor-pointer"
				aria-label={label}
				onMouseEnter={() => setShowTooltip(true)}
				onMouseLeave={handleHideTooltip}
				onFocus={() => setShowTooltip(true)}
				onBlur={handleHideTooltip}
				onKeyDown={(e) => handleKeydown(e)}
			>
				{label}
			</button>
			{showTooltip && (
				<div
					role="tooltip"
					id="button-tooltip"
					className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-40 bg-gray-800 text-white text-sm rounded-md p-2 z-10"
				>
					{text}
				</div>
			)}
		</div>
	);
};

export default Tooltip;
