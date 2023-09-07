import axios from '@/services/api.ts';
import { getStore, setID } from '@/store/deviceFingerprint.ts';
import { Iuser } from '../types';
import { cheers } from './cheers';
// Function to check if the user has an account and save it if possible

export async function checkAndSaveUserAccount() {
	const store = getStore();

	try {
		// Fetch user data based on the fingerprint
		const response = await axios.get('/Users');
		const userData: Iuser | undefined = response.data.find((data: Iuser) => data.userId === store.deviceFingerprint?.value);

		if (!userData) {
      cheers('warning', 'new user');
			// User doesn't have an account
			const emptySlot = response.data.find((data: Iuser) => data.userId === '');

			if (emptySlot) {
				emptySlot.userId = store?.deviceFingerprint.value;
				await axios.put(`/Users/${emptySlot.id}`, emptySlot);
				cheers('success', 'User account saved successfully');
        setID(emptySlot.id);
			} else {
        cheers('error', 'No empty Chairs available. Come back later.');
      }
		} else {
      // User already has an account
      cheers('info', 'Welcome Back!');
		}
	} catch (error) {
    cheers('error', 'Try again!');
	}
}
