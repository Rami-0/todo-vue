<script setup lang="ts">
import { onBeforeMount } from 'vue';

import Add from '@/components/Add.vue';
import List from '@/components/List.vue';

import DeviceFingerprintService from '@/services/DeviceFingerprintService.js';
import { setDeviceFingerprint } from '@/store/deviceFingerprint.ts';

import { checkAndSaveUserAccount } from '@/utils/requests.ts';

onBeforeMount(() => {
	checkAndSaveUserAccount();
	// Use the onBeforeMount hook to fetch the device fingerprint
	DeviceFingerprintService.generateDeviceFingerprint().then((fingerprint: any) => {
		setDeviceFingerprint(fingerprint);
	});
});
console.clear();
</script>

<template>
	<!-- dev -->
	<main class="todo__container">
		<h1>To-do List <strong id="note-icon">📝</strong></h1>
		<Add />
		<List />
	</main>
	<code class="code">note: this App is slow because it's working on mockApi be patient and enjoy! <strong><a target="_blank" href="https://github.com/Rami-0/todo-vue">Github</a></strong> </code>
</template>

<style scoped lang="scss">
.todo__container {
	@include list-flex;
	width: 621px;
	height: 666px;
	background: $bkg;
	padding: $padding;
	border-radius: 15px;
	-webkit-box-shadow: $shadow;
	-moz-box-shadow: $shadow;
	gap: 30px;
	box-shadow: $shadow;
	> h1 {
		color: $color-primary;
		align-self: flex-start;
	}
}
@media (max-width: 768px) {
	.todo__container {
		width: 120%;
		height: 120%;
		scale: 0.7;
	}
	.code {
		margin: 40px;
	}
}
</style>
