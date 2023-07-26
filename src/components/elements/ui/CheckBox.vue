<script setup>
defineProps({
  id: {
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

const onCheck = (event) => {
  if (event.target.classList.contains('custom-checkbox__input')) {
    emit('check', event.target.checked);
  } else if (
    event.target.classList.contains('custom-checkbox__mark') ||
    event.target.parentElement.classList.contains('custom-checkbox__mark')
  ) {
    emit('check', false);
  }
};

const onKeyDown = (event) => {
  if (event.code === 'Space') {
    event.target.firstChild.click();
  }
};
</script>

<template>
	<div class="custom-checkbox" @click="onCheck" @keydown="onKeyDown" :tabindex="0">
		<input class="custom-checkbox__input" type="checkbox" :id="id" :checked="checked" />
		<label
			class="custom-checkbox__label"
			:for="id"
			:style="{width: `${width}px`, height: `${height}px`}"
		>
			<slot />
		</label>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="custom-checkbox__mark"
			:style="{width: `${width}px`, height: `${height}px`}"
		>
			<path d="M4.5 12.75l6 6 9-13.5" />
		</svg>
	</div>
</template>

<style lang="scss" scoped>
.custom-checkbox {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	outline-offset: 4px;

	.custom-checkbox__input {
		position: absolute;
		width: 0;
		height: 0;
		opacity: 0;
	}

	.custom-checkbox__label {
		border: 1.5px solid black;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.custom-checkbox__input:checked ~ .custom-checkbox__mark {
		display: block;
	}

	.custom-checkbox__mark {
		position: absolute;
		display: none;
	}
}
</style>
