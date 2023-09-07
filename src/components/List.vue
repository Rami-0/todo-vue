<script setup lang="ts">
import { onMounted, computed } from 'vue';
import axios from '@/services/api.ts';
import { getStore, setID, setData } from '@/store/deviceFingerprint.ts';
import { Iuser } from '../types';
import Item from '@/components/Item.vue';

const store = getStore();

const fetchData = async () => {
  try {
    const response = await axios.get('/Users');
    setData(response.data.find((data: Iuser) => data.userId === store.deviceFingerprint?.value));
    setID(store.data.value?.id);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
	return null;
};

onMounted(() => {
  fetchData();
});

// Create a computed property that returns the reversed array
const reversedTodos = computed(() => {
  const todos = store.data.value.todos;
  if (todos && todos.length > 0) {
    return [...todos].reverse();
  }
  return [];
});
</script>

<template>
  <div class="todo__list" v-if="reversedTodos.length > 0">
    <div v-for="item in reversedTodos" :key="item.id">
      <Item :item="item" :key="item.id" />
    </div>
  </div>
  <span v-else>No Elements</span>
</template>

<style lang="scss">
.todo__list {
	@include list-flex;
	gap: 0px;
	overflow-y: scroll;
}
</style>
