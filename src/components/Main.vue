<script setup lang="ts">
const { msg } = defineProps<{ msg: string }>();
</script>

<template>
	<h1>{{ msg }}</h1>
</template>

<style lang="scss" scoped>
h1{
  color: $color-primary;
}
</style>
