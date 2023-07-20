<script setup>
import PanelLayout from '@/components/layouts/PanelLayout.vue';
import CollapsibleList from './CollapsibleList.vue';

defineProps({
  lists: {
    type: Object,
    required: true,
  },
});
</script>

<template>
	<PanelLayout>
		<CollapsibleList
			v-for="(list, index) in lists"
			:key="list.id"
			:list="list"
			:label="`List ${index + 1}`"
		/>
	</PanelLayout>
</template>

<style lang="scss" scoped />
