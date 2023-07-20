<script setup>
import { computed } from 'vue';

const props = defineProps({
  itemSet: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['delete']);

const isMixColor = computed(() => props.itemSet.length !== 1);
const items = computed(() => isMixColor.value ? props.itemSet : props.itemSet[0].amount);
</script>

<template>
	<div class="list-block-item-set">
		<div
			class="list-block-item-set__item"
			v-for="(item, index) in items"
			:key="isMixColor ? index : item"
			:style="`background-color: ${isMixColor ? item.color : itemSet[0].color}`"
			@click="emit('delete', isMixColor ? item.id : itemSet[0].id, isMixColor ? index : item)"
		/>
	</div>
</template>

<style lang="scss" scoped>
.list-block-item-set {
	display: flex;
	flex-wrap: wrap;
	gap: 3px;

	.list-block-item-set__item {
		width: 10px;
		height: 10px;
		cursor: pointer;
		user-select: none;
		touch-action: manipulation;
	}
}
</style>
