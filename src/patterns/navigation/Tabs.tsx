import { useState, useRef } from 'react';

export interface TabsProps {
	/** Tab labels */
	tabs?: string[];
	/** Index of the initially active tab */
	defaultTab?: number;
}

/** Keyboard-accessible tabs with arrow key navigation and ARIA roles */
const Tabs = ({
	tabs = ['Tab 1', 'Tab 2', 'Tab 3'],
	defaultTab = 0,
}: TabsProps) => {
	const [activeTab, setActiveTab] = useState(defaultTab);
	const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

	const activateTab = (nextIndex: number) => {
		tabsRef.current[nextIndex]?.focus();
		setActiveTab(nextIndex);
	};

	const onKeyDown = (
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

	return (
		<>
			<div className="tab flex" role="tablist" aria-label="Sample Tabs">
				{tabs.map((tab, index) => (
					<button
						key={tab}
						aria-controls={`tab-content-${index}`}
						aria-selected={activeTab === index}
						role="tab"
						tabIndex={activeTab === index ? 0 : -1}
						id={`tab-${index}`}
						className={`
							group w-15 h-10 cursor-pointer
							text-gray-600 text-sm font-semibold
							outline-none transition-colors duration-200
							${activeTab === index ? 'border-b-2 border-b-blue-500' : 'border-b border-b-gray-200'}
						`}
						ref={(el) => {
							tabsRef.current[index] = el;
						}}
						onClick={() => setActiveTab(index)}
						onKeyDown={(e) => onKeyDown(e, index)}
					>
						<span className="rounded px-1 group-focus-visible:ring-2 group-focus-visible:ring-blue-200 group-focus-visible:ring-offset-2">
							Tab {index + 1}
						</span>
					</button>
				))}
			</div>
			<div
				className="
					tab-content border border-gray-100
					p-4 w-100 h-50 rounded-xs m-auto mt-2"
			>
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
};

export default Tabs;
