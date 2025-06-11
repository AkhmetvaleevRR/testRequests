<template>
  <div class="request-card" @click="$emit('click')">
    <h3 class="title">{{ request.title }}</h3>
    <div class="meta">
      <span class="category">{{ request.category }}</span>
      <span class="date">{{ formattedDate }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Request } from '@/entities/request/model/types';


const props = defineProps<{
  request: Request;
}>();

const formattedDate = computed(() => 
  typeof(props.request.createdAt) === 'string'? (new Date (props.request.createdAt)).toLocaleString() : props.request.createdAt?.toLocaleString()
);

</script>

<style scoped>
.request-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  transition: all 0.2s;
}

.request-card:hover {
  background-color: #f5f5f5;
  transform: translateY(-2px);
}

.title {
  margin: 0 0 8px 0;
  color: #333;
}

.meta {
  display: flex;
  gap: 10px;
  font-size: 0.9em;
  color: #666;
}
</style>