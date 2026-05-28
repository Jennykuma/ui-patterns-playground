import { useState, useRef } from 'react';
import Card from '../components/Card';
import { CircleCheck, CircleX } from 'lucide-react';

const Toast = () => {
	const [showSuccessToast, setShowSuccessToast] = useState(false);
	const [showErrorToast, setShowErrorToast] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleSubmit = (type: 'success' | 'error') => {
		if (type === 'success') {
			setShowSuccessToast(true);
			setShowErrorToast(false);
		} else {
			setShowErrorToast(true);
			setShowSuccessToast(false);
		}
		timeoutRef.current = setTimeout(() => {
			if (type === 'success') {
				setShowSuccessToast(false);
			} else {
				setShowErrorToast(false);
			}
		}, 3000); // Hide toast after 3 seconds

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			setShowSuccessToast(false);
			setShowErrorToast(false);
		};
	};

	const successToast = (
		<div
			role="status"
			className={`
				${showSuccessToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}
				flex items-center gap-4
				h-24 w-80 bg-white p-4 text-sm text-gray-800 
				border border-green-500 rounded-xl shadow-lg
				fixed top-4 right-4 z-50
				transform transition-transform transition-opacity duration-300 ease-out
			`}
		>
			<CircleCheck
				aria-hidden="true"
				className="shrink-0 w-8 h-8 text-green-500"
			/>
			<div className="flex flex-col justify-center">
				<span className="font-bold text-green-500">Success</span>
				<p className="text-xs text-gray-500">
					This toast will disappear after 3 seconds. Enjoy the moment!
				</p>
			</div>
		</div>
	);

	const errorToast = (
		<div
			role="alert"
			className={`
				${showErrorToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}
				flex items-center gap-4
				h-24 w-80 bg-white p-4 text-sm text-gray-800 
				border border-red-500 rounded-xl shadow-lg
				fixed top-4 right-4 z-50
				transform transition-transform transition-opacity duration-300 ease-out
			`}
		>
			<CircleX
				aria-hidden="true"
				className="shrink-0 w-8 h-8 text-red-500"
			/>
			<div className="flex flex-col justify-center">
				<span className="font-bold text-red-500">Error</span>
				<p className="text-xs text-gray-500">
					API request failed. Please try again later. Contact support
					if the issue persists.
				</p>
			</div>
		</div>
	);

	const content = (
		<div className="flex gap-2">
			<button
				className="bg-sage-green p-1.5 rounded-md text-sm text-white cursor-pointer"
				onClick={() => handleSubmit('success')}
			>
				Submit
			</button>
			<button
				className="bg-red-500 p-1.5 rounded-md text-sm text-white cursor-pointer"
				onClick={() => handleSubmit('error')}
			>
				Submit with error
			</button>
		</div>
	);

	return (
		<Card
			patternName="Toast"
			description="A toast is a temporary message that appears on the screen to provide feedback. They typically disappear after a short duration"
		>
			{content}
			{successToast}
			{errorToast}
		</Card>
	);
};

export default Toast;
