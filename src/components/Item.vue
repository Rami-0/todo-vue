<script setup lang="ts">
import { ref, watch } from 'vue';
import { Itodo } from '../types';
import { getStore } from '@/store/deviceFingerprint.ts';
import { cheers } from '../utils/cheers.ts';

import editIcon from '../assets/edit_icon.svg';
import ex from '../assets/ex_icon.svg';

const { item } = defineProps<{
	item: Itodo;
}>();

const store = getStore();

import { changeTodoStatus, updateTodo, deleteTodo } from '@/services/UserService.ts';

const isChecked = ref(item.checked);
const editedText = ref(item.value);
const isEditing = ref(false);

watch(
	() => item.checked,
	(newVal) => {
		isChecked.value = newVal;
	},
);

// Function to handle checkbox change
const handleChange = async () => {
	console.log(true);
	try {
		await changeTodoStatus(store.id.value, item.id, isChecked.value);
		cheers('success', 'changed');
	} catch (error) {
		cheers('error', 'not changed, try to refresh the page');
	}
};

const handleDeletion = async () => {
	console.log(true);
	try {
		await deleteTodo(store.id.value, item.id);
		cheers('success', 'deleted');
	} catch (error) {
		cheers('error', 'not changed, try to refresh the page');
	}
};

// Function to update the todo text
const updateText = async () => {
	try {
		await updateTodo(store.id.value, item.id, editedText.value);
		isEditing.value = false;
		cheers('warning', 'updated');
	} catch (error) {
		cheers('error', 'not changed, try to refresh the page');
	}
};

// Function to toggle edit mode
const toggleEditMode = () => {
	isEditing.value = !isEditing.value;
	if (!isEditing.value) {
		editedText.value = item.value;
	}
};
</script>

<template>
	<div class="list__item">
		<main>
			<div class="list__item__checkboxContainer">
				<input class="list__item__checkboxContainer--checkbox" v-if="!isEditing" type="checkbox" name="" id="" v-model="item.checked" @change="handleChange" />
				<span @change="handleChange" v-if="!isEditing" class="list__item__checkboxContainer--checkmark"></span>
			</div>

			<span class="list__item--text" v-if="!isEditing">{{ item.value }}</span>
			<input class="list__item--input" v-else type="text" v-model="editedText" />
		</main>

		<aside>
			<button class="list__item--button" v-if="isEditing" @click="updateText">Save</button>
			<button class="list__item--button" @click="toggleEditMode">
				<span v-if="!isEditing">
					<img :src="editIcon" alt="Edit Icon" width="20" />
				</span>
				<span v-else>
					<img :src="ex" alt="X icon" width="20" />
				</span>
			</button>
			<button class="list__item--button" v-if="!isEditing" @click="handleDeletion">
				<span>
					<img :src="ex" alt="X icon" width="20" />
				</span>
			</button>
		</aside>
	</div>
</template>

<style scoped lang="scss">
.list__item {
	padding: 10px;

	@include stretched-flex;

	main {
		@include stretched-flex;

		.list__item__checkboxContainer {
			display: block;
			position: relative;
			padding-left: 35px;
			height: 30px;
			width: 30px;
			cursor: pointer;
			font-size: 22px;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			.list__item__checkboxContainer--checkbox {
				position: absolute;
				opacity: 0;
				cursor: pointer;
				left: 0;
				z-index: 1;
				height: 100%;
				width: 100%;
			}
			.list__item__checkboxContainer--checkmark {
				position: absolute;
				transition: 0.4s;
				top: 0;
				left: 0;
				height: 30px;
				width: 30px;
				background-color: #eee;
				border-radius: 20px;
				outline: 2px solid $color-secondary;
			}
			.list__item__checkboxContainer--checkmark::after {
				content: '';
				position: absolute;
				display: none;
				left: 11px;
				top: 7px;
				width: 5px;
				height: 11px;
				border: solid white;
				border-width: 0 3px 3px 0;
				-webkit-transform: rotate(45deg);
				-ms-transform: rotate(45deg);
				transform: rotate(45deg);
			}
		}
		.list__item__checkboxContainer input:checked ~ .list__item__checkboxContainer--checkmark {
			background-color: $color-tertiary;
			outline: 0px solid $color-secondary;
			border: none;
		}
		.list__item__checkboxContainer input:hover ~ .list__item__checkboxContainer--checkmark {
			background-color: $color-tertiary;
			opacity: 0.7;
			outline: 0px solid $color-secondary;
		}
		.list__item__checkboxContainer input:checked ~ .list__item__checkboxContainer--checkmark::after {
			display: block;
		}
		.list__item--text {
			font-size: 18px;
			font-family: 'Poppins';
			font-weight: 300;
		}
		.list__item--input {
			border: none;
			font-family: 'Poppins';
			font-size: 18px;
			font-weight: 300;
		}
		.list__item--input:active {
			outline: 1px solid $color-secondary;
			border: none;
		}
	}
	aside {
		@include stretched-flex;
		.list__item--button {
			transition: 0.3s;
			border: none;
			width: fit-content;
			background: none;
			padding: 0 10px;
			cursor: pointer;
		}
		.list__item--button:hover {
			border-radius: 30px;
			background: $color-secondary;
		}
	}
}
</style>
