<script setup lang="ts">
import { onMounted } from 'vue';
import axios from '@/services/api.ts';
import { getStore, setID, setData } from '@/store/deviceFingerprint.ts';
import { Iuser } from '../types';
import Item from '@/components/item.vue';

const store = getStore();

const fetchData = async () => {
	try {
		const response = await axios.get('/Users');
		setData(response.data.find((data: Iuser) => data.userId === store.deviceFingerprint?.value));
		setID(store.data.value?.id);
	} catch (error) {
		console.error('Error fetching data:', error);
	}
	console.log(store.deviceFingerprint.value);
};

onMounted(() => {
	fetchData();
});
</script>

<template>
	<div class="todo__list" v-if="store.data?.value.todos">
		<div v-for="(item, index) in store.data.value.todos.reverse()" :key="index">
			<Item :item="item" :key="item.id" />
		</div>
		<!-- <p>Device Fingerprint in List.vue: {{ store.deviceFingerprint }}</p> -->
	</div>
</template>

<style lang="scss">
.todo__list {
	@include list-flex;
	gap: 0px;
	overflow-y: scroll;
}
</style>
