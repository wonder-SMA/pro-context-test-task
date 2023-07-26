<script setup>
import IconButton from '@/components/layouts/ui/IconButton.vue';

defineProps({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['click']);
</script>

<template>
	<IconButton
		id="al"
		:aria-label="`${isOpen ? `Collapse ${label}` : `Open ${label}`}`"
		:title="`${isOpen ? 'Collapse' : 'Open'}`"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			:class="['arrow-icon', {rotated: isOpen}]"
			:style="{width: `${width}px`, height: `${height}px`}"
			@click="emit('click')"
		>

			<path d="M8.25 4.5l7.5 7.5-7.5 7.5" />
		</svg>
	</IconButton>
</template>

<style lang="scss" scoped>
.arrow-icon {
	transition: transform .2s;
}

.arrow-icon.rotated {
	transform: rotate(90deg);
}
</style>
