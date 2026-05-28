import { useState, useRef } from 'react';
import Card from '../components/Card';

const Tabs = () => {
	const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
	const [activeTab, setActiveTab] = useState(0);
	const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

	const activateTab = (nextIndex: number) => {
		tabsRef.current[nextIndex]?.focus();
		setActiveTab(nextIndex);
	};

	const onTabKeyDown = (
		e: React.KeyboardEvent<HTMLButtonElement>,
		index: number
	) => {
		const last = tabs.length - 1;

		if (e.key === 'ArrowRight') {
			e.preventDefault();
			activateTab(index === last ? 0 : index + 1);
		} else if (e.key === 'ArrowLeft') {
			e.preventDefault();
			activateTab(index === 0 ? last : index - 1);
		} else if (e.key === 'Home') {
			e.preventDefault();
			activateTab(0);
		} else if (e.key === 'End') {
			e.preventDefault();
			activateTab(last);
		}
	};

	const content = (
		<>
			<div
				className="tab flex gap-0.5"
				role="tablist"
				aria-label="Sample Tabs"
			>
				{tabs.map((tab, index) => (
					<button
						key={tab}
						aria-controls={`tab-content-${index}`}
						aria-selected={activeTab === index}
						role="tab"
						tabIndex={activeTab === index ? 0 : -1}
						id={`tab-${index}`}
						className={`
							w-20 h-10 cursor-pointer
							text-white text-sm
							${activeTab === index ? 'bg-pale-pink' : 'bg-sage-green hover:bg-sage-green/80'}`}
						ref={(el) => {
							tabsRef.current[index] = el;
						}}
						onClick={() => setActiveTab(index)}
						onKeyDown={(e) => onTabKeyDown(e, index)}
					>
						Tab {index + 1}
					</button>
				))}
			</div>
			<div className="tab-content border border-gray-300 rounded-md p-4">
				{tabs.map((_, index) => (
					<div
						role="tabpanel"
						key={index}
						id={`tab-content-${index}`}
						aria-labelledby={`tab-${index}`}
						hidden={activeTab !== index}
					>
						{`You are ${['awesome', 'amazing', 'fantastic'][index]}!`}
					</div>
				))}
			</div>
		</>
	);

	return (
		<Card
			patternName="Tabs"
			description="A keyboard-accessible tab interface that allows users to navigate between tabs using arrow keys, Home/End keys, and provides appropriate ARIA roles and attributes for screen readers"
		>
			{content}
		</Card>
	);
};

export default Tabs;
