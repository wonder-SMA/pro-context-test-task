<script setup>
import PanelLayout from '@/components/layouts/PanelLayout.vue';
import ListBlock from './ListBlock.vue';

defineProps({
  lists: {
    type: Object,
    required: true,
  },
});
</script>

<template>
	<PanelLayout>
		<ListBlock
			v-for="(list, index) in lists"
			:key="list.id"
			:list="list"
			:label="`List ${index + 1}`"
		/>
	</PanelLayout>
</template>

<style lang="scss" scoped />
