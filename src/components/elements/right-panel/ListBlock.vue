<script setup>
import { ref, computed, watch } from 'vue';
import { useAppStore } from '@/stores/app-store';
import { shuffleArray } from '@/helpers/shuffle-array';
import ListBlockItem from './ListBlockItem.vue';
import PrimaryButton from '../ui/PrimaryButton.vue';

const props = defineProps({
  list: {
    type: Object,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const appStore = useAppStore();

const sortMode = ref('sorted');
const mixedItems = ref([]);

const buttonText = computed(() => sortMode.value === 'sorted' ? 'Перемешать' : 'Сортировать');

// Функция создания массива рандомных item из list при условии наличия количества и выделения
const mix = () => {
  const items = props.list.items.filter(item => item.amount && item.checked);
  const itemsArr = [];

  items.forEach(item => {
    const itemArr = Array.from({ length: item.amount }, () => ({ ...item, amount: 1 }));
    itemsArr.push(...itemArr);
  });

  mixedItems.value = shuffleArray(itemsArr);
};

// При изменении items в list и совпадении типа action применяем изменения
watch(props.list.items, () => {
  const action = appStore.completedAction;

  if (['checkOneItem', 'checkAllItems', 'changeItemAmount'].includes(action.type)) {
    mix();
    return true;
  }

  if (action.type === 'changeItemColor') {
    mixedItems.value = mixedItems.value.map(item => {

      if (item.id === action.payload.itemId) {
        item.color = action.payload.color;
        return item;
      }

      return item;
    });
  }
});

// Меняем режим сортировки при нажатии на кнопку сортировки
const onChangeSorting = () => {
  if (sortMode.value === 'sorted') {
    mix();
    sortMode.value = 'mixed';
  } else {
    sortMode.value = 'sorted';
  }
};

// Обработка точечного удаления item
const onDeleteItem = (itemId, idx) => {
  if (sortMode.value === 'mixed') {
    appStore.changeItemAmount(
      itemId,
      props.list.id,
      null,
      () => mixedItems.value.splice(idx, 1),
    );
  } else {
    appStore.changeItemAmount(itemId, props.list.id, null, () => {});
  }
};
</script>

<template>
	<div class="list-block">
		<span class="list-block__label">{{ label }}</span>
		<PrimaryButton
			v-if="mixedItems.length"
			class="list-block__button"
			@click="onChangeSorting"
		>
			{{ buttonText }}
		</PrimaryButton>
		<div v-if="mixedItems.length && sortMode === 'sorted'" class="list-block__items">
			<template v-for="item in list.items" :key="item.id">
				<ListBlockItem
					v-if="item.amount && item.checked"
					:item-set="[item]"
					@delete="onDeleteItem"
				/>
			</template>
		</div>
		<div v-if="mixedItems.length && sortMode === 'mixed'" class="list-block__items">
			<ListBlockItem :item-set="mixedItems" @delete="onDeleteItem" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.list-block {
	position: relative;
	border: 2px solid black;
	padding: 6.4px;
	display: flex;
	flex-direction: column;

	.list-block__label {
		margin-top: -2px;
		line-height: 1;
	}

	.list-block__button {
		position: absolute;
		top: 3px;
		right: 3px;
	}

	.list-block__items {
		padding: 8px 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
}
</style>
