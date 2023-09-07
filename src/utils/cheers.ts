import { useToast } from 'vue-toastification';

const toast = useToast();

export const cheers = (type: 'success' | 'warning' | 'error' | 'info', text: string) => {
	const options = {
		timeout: 2500,
		closeOnClick: true,
		pauseOnFocusLoss: true,
		pauseOnHover: true,
		draggable: true,
		draggablePercent: 0.6,
		showCloseButtonOnHover: false,
		hideProgressBar: false,
		rtl: false,
	};
	switch (type) {
		case 'success':
			return toast.success(text, options);
		case 'warning':
			return toast.warning(text, options);
		case 'error':
			return toast.error(text, options);
		case 'info':
			return toast.info(text, options);
	}
};
