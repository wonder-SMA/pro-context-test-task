<script setup>
import { ref, onMounted } from 'vue';
import CheckboxWithLabel from '@/components/layouts/CheckboxWithLabel.vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['check', 'changeColor', 'changeAmount']);

const inputRef = ref(null);

onMounted(() => {
  // Устанавливаем начальный размер поля ввода при монтировании
  inputRef.value.style.width = inputRef.value.value.length * 0.7 + 'rem';
});

const onKeyDown = (event) => {
  // Фильтруем ввод значений
  if (event.key >= 0 && event.key <= 9 ||
    (event.key === 'Backspace' || event.key === 'Delete') ||
    (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Tab')
  ) {
    return true;
  } else {
    event.preventDefault();
  }
};

const onInput = (event) => {
  // Изменяем размер поля ввода при каждом событии
  event.target.style.width = event.target.value.length * 0.7 + 'rem';
};

const onChange = (event) => {
  let rawValue = event.target.value.toString().trim();

  // Если было введено пустое значение, то ставим 0
  if (!rawValue) {
    rawValue = 0;
  }
  let value = parseInt(rawValue, 10);

  // Ставим ограничение на 100 штук для item
  if (value > 100) {
    value = 100;
  }

  // Если новое значение отличается от предыдущего, то отправляем emit для изменения
  if (value !== props.item.amount) {
    emit('changeAmount', props.item.id, value);
  }

  event.target.value = value;
  onInput(event);
};
</script>

<template>
	<div class="list-item">
		<div class="list-item__left-side">
			<CheckboxWithLabel
				:id="item.id"
				:label="label"
				:width="16"
				:height="16"
				:checked="item.checked"
				@check="emit('check', props.item.id, $event)"
			/>
		</div>
		<div class="list-item__controls">
			<input
				class="list-item__amount"
				ref="inputRef"
				type="text"
				:value="item.amount"
				title="Изменить количество"
				@keydown="onKeyDown"
				@input="onInput"
				@change="onChange"
			>
			<input
				class="list-item__color-picker"
				type="color"
				:value="item.color"
				title="Изменить цвет"
				@change="emit('changeColor', item.id, $event.target.value)"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.list-item {
	width: 100%;
	height: 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.list-item__controls {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 12px;

		.list-item__amount {
			min-width: 0.7rem;
			width: 0.7rem;
			max-width: 3.5rem;
			margin-top: -2px;
			padding: 0;
			border: none;
			border-radius: 0;
			text-align: center;
			font-size: inherit;
			line-height: 1.1;
			color: inherit;
			user-select: text;
			outline: none;
			appearance: none;
		}

		.list-item__color-picker {
			width: 16px;
			height: 16px;
			border: none;
			background: none;
			outline-offset: 4px;
			appearance: none;
			cursor: pointer;

			&::-webkit-color-swatch-wrapper {
				padding: 0;
			}

			&::-webkit-color-swatch {
				border: none;
			}
		}
	}
}
</style>
