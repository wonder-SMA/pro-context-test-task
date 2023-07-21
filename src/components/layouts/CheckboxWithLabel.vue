<script setup>
import CheckBox from '../elements/ui/CheckBox.vue';

defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  checked: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['check']);
</script>

<template>
	<div class="checkbox-with-label">
		<CheckBox
			:id="id"
			:width="width"
			:height="height"
			:checked="checked"
			@check="emit('check', $event)"
		>
			<slot />
		</CheckBox>
		<span class="checkbox-with-label__label">{{ label }}</span>
	</div>
</template>

<style lang="scss" scoped>
.checkbox-with-label {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 12px;
}
</style>
