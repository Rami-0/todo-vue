<script setup lang="ts">
import { ref } from 'vue';

import { addTodos } from '@/services/UserService.ts';
import { getStore } from '@/store/deviceFingerprint.ts';
import { cheers } from '../utils/cheers';

const newTask = ref('');
const store = getStore();

const submitHandeler = async () => {
	const todoInput = newTask.value;
	try {
	  await addTodos(store?.id.value, [{ value: todoInput, checked: false, id: Date.now() }]);
		cheers('success', 'Added');
		newTask.value = ""; 
	} catch (e) {	
		cheers('error', 'Oops! Something went wrong');
	}
};
</script>

<template>
	<form class="todo__AddBar" @submit.prevent="submitHandeler">
		<input v-model="newTask" type="text" placeholder="Add your task" />
		<button type="submit">Add</button>
	</form>
	<!-- <p>Device Fingerprint in Add.vue: {{ store.deviceFingerprint }}</p> -->
</template>

<style lang="scss" scoped>
.todo__AddBar {
	display: flex;
	align-items: center;
	width: 100%;
	justify-content: space-between;
	position: relative;
	transition: 0.3s;
	input {
		width: 100%;
		height: 55px;
		border-radius: 30px;
		border: none;
		background: $color-secondary;
		padding: 0 20px;
		font-weight: 400;
		font-size: 18px;
	}
	input:focus {
		outline: none;
		border: 1px $color-tertiary solid;
	}
	button {
		position: absolute;
		right: 0;
		height: 55px;
		width: 120px;
		border-radius: 30px;
		border: none;
		background: $color-tertiary;
		color: white;
		font-weight: 500;
		font-size: 16px;
		transition: 0.3s;
		cursor: pointer;
	}
	button:hover {
		opacity: 0.7;
	}
}
</style>
