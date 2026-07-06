import { useState } from 'react';
import classNames from 'classnames';
import { ChevronDown } from 'lucide-react';

export interface AccordionProps {
	/** Section labels */
	sections?: string[];
	/** Index of the initially active section */
	defaultSection?: number | null;
}

const Accordion = ({
	sections = ['Section 1', 'Section 2', 'Section 3', 'Section 4'],
	defaultSection = 0,
}: AccordionProps) => {
	const [activeSection, setActiveSection] = useState(defaultSection);
	const lastSection = sections.length - 1;

	const handleClickSection = (index: number) => {
		if (activeSection === index) {
			setActiveSection(null);
			return;
		}
		setActiveSection(index);
	};

	return (
		<div className="accordion">
			{sections.length > 0 &&
				sections.map((section, index) => {
					const isOpen = activeSection === index;

					return (
						<div className="accordion-item">
							<h3>
								<button
									id={`accordion-header-${index}`}
									aria-controls={`accordion-panel-${index}`}
									aria-expanded={index === activeSection}
									className={classNames(
										'header w-100 p-4 font-semibold cursor-pointer',
										'flex justify-between text-primary',
										'border-x-2 border-x-gray-400',
										index !== lastSection &&
											'border-b border-b-gray-200',
										index === 0 &&
											'rounded-t-md border-t-2 border-t-gray-400',
										index === lastSection &&
											activeSection !== lastSection &&
											'rounded-b-md border-b-2 border-b-gray-400'
									)}
									onClick={() => handleClickSection(index)}
								>
									{section}
									<ChevronDown
										className={classNames(
											'stroke-primary transition duration-300',
											isOpen && 'rotate-180'
										)}
									/>
								</button>
							</h3>
							{isOpen && (
								<div
									id={`accordion-panel-${index}`}
									aria-labelledby={`accordion-header-${index}`}
									role="region"
									className={classNames(
										'p-4 border-x-2 border-x-gray-400',
										isOpen && 'border-b border-b-gray-200',
										activeSection === lastSection &&
											'rounded-b-md border-b-2 border-b-gray-400 border-t border-t-gray-200'
									)}
								>
									We are inside {section}
								</div>
							)}
						</div>
					);
				})}
		</div>
	);
};

export default Accordion;
