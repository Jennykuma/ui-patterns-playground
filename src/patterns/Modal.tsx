import { useEffect, useRef, useState } from 'react';
import Card from '../components/Card';

const Modal = () => {
	const [isOpen, setIsOpen] = useState(false);
	const backdropRef = useRef<HTMLDivElement | null>(null);
	const previousFocus = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (!isOpen) return;

		document.addEventListener('keydown', handleKeydown);

		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	}, [isOpen]);

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			closeModal();
		}
	};

	const openModal = () => {
		previousFocus.current = document.activeElement as HTMLElement | null;
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
		if (previousFocus.current) {
			previousFocus.current.focus();
		}
	};

	const content = (
		<>
			<button
				className="bg-sage-green p-1.5 rounded-md text-sm text-white cursor-pointer"
				onClick={openModal}
			>
				Open modal
			</button>
			{isOpen && (
				<div
					ref={backdropRef}
					className="fixed inset-0 flex flex-col justify-center items-center bg-gray-600/50"
					onClick={closeModal}
				>
					<div
						className="rounded-lg p-8 w-1/3 bg-white"
						role="dialog"
						onClick={(e) => e.stopPropagation()}
						aria-modal="true"
						aria-labelledby="modal-title"
					>
						<span id="modal-title" className="text-2xl">
							Modal title
						</span>
						<p className="mt-5">This is the modal description!</p>
						<div className="flex float-right">
							<button
								className="bg-gray-200 mt-4 p-2 rounded-md text-sm cursor-pointer"
								onClick={closeModal}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);

	return (
		<Card
			patternName="Modal"
			description="A modal dialog that opens from a button and closes on Escape or click outside, exploring event handling and basic focus management"
		>
			{content}
		</Card>
	);
};

export default Modal;
