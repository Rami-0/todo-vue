import { ref } from 'vue';

const deviceFingerprint = ref();
const id = ref();
const data = ref([]);

export function setDeviceFingerprint(fingerprint: string) {
	deviceFingerprint.value = fingerprint;
}

export function setID(newId: any) {
	id.value = newId;
}

export function setData(newData: any) {
	data.value = newData;
}

export function getStore() {
	return {
    deviceFingerprint,
    id,
    data
  };
}
