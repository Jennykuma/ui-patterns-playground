import { useState } from 'react';
import Card from '../components/Card';

const Tooltips = () => {
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

	const content = (
		<>
			<button
				aria-describedby="button-tooltip"
				className="bg-sage-green p-1.5 rounded-md text-sm text-white cursor-pointer mb-3"
				onMouseEnter={() => setShowTooltip(true)}
				onMouseLeave={handleHideTooltip}
				onFocus={() => setShowTooltip(true)}
				onBlur={handleHideTooltip}
				onKeyDown={(e) => handleKeydown(e)}
			>
				Hover over me!
			</button>
			{showTooltip && (
				<>
					<div
						role="tooltip"
						id="button-tooltip"
						className={`w-50 bg-gray-800 text-white text-sm rounded-md p-2 ${showTooltip ? 'block' : 'hidden'}`}
					>
						This is a tooltip!
					</div>
					<div className="caret-up"></div>
				</>
			)}
		</>
	);

	return (
		<Card
			patternName="Tooltips"
			description="A tooltip is a small pop-up box that appears when a user hovers over an element, focuses on it, or touches it"
		>
			{content}
		</Card>
	);
};

export default Tooltips;
