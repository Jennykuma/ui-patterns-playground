import { useState, useRef } from 'react';
import { CircleCheck, CircleX } from 'lucide-react';

export interface ToastProps {
	/** How long the toast stays visible in ms */
	duration?: number;
}

/** Temporary success and error notifications that slide in and auto-dismiss */
const Toast = ({ duration = 3000 }: ToastProps) => {
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
		}, duration);

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
				border border-green-200 rounded-xl shadow-lg
				fixed top-4 right-4 z-50
				transform transition-opacity duration-300 ease-out
			`}
		>
			<CircleCheck
				aria-hidden="true"
				className="shrink-0 w-8 h-8 text-green-500"
			/>
			<div className="flex flex-col justify-center">
				<span className="font-semibold text-green-500">Success</span>
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
				border border-red-200 rounded-xl shadow-lg
				fixed top-4 right-4 z-50
				transform transition-opacity duration-300 ease-out
			`}
		>
			<CircleX
				aria-hidden="true"
				className="shrink-0 w-8 h-8 text-red-500"
			/>
			<div className="flex flex-col justify-center">
				<span className="font-semibold text-red-500">Error</span>
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
				className="bg-blue-500 hover:bg-blue-400 transition-colors duration-200 p-1.5 rounded-md text-sm font-semibold text-white cursor-pointer"
				onClick={() => handleSubmit('success')}
			>
				Submit
			</button>
			<button
				className="bg-red-500 hover:bg-red-600 transition-colors duration-200 p-1.5 rounded-md text-sm font-semibold text-white cursor-pointer"
				onClick={() => handleSubmit('error')}
			>
				Submit with error
			</button>
		</div>
	);

	return (
		<>
			{content}
			{successToast}
			{errorToast}
		</>
	);
};

export default Toast;
