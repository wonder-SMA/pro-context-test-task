<script setup>
import { ref } from 'vue';
import { useAppStore } from '@/stores/app-store';
import CheckboxWithLabel from '@/components/layouts/CheckboxWithLabel.vue';
import ListItem from './ListItem.vue';
import ArrowButton from '../ui/ArrowButton.vue';

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

const isOpen = ref(false);
const listRef = ref(null);

const onClick = () => {
  isOpen.value = !isOpen.value;

  setTimeout(() => {
    if (isOpen.value) {
      const { height } = getComputedStyle(listRef.value.lastChild);
      listRef.value.style.height = 16 + parseInt(height) + 'px';
    } else {
      listRef.value.style.height = '16px';
    }
  }, 0);
};

const onKeyDown = (event) => {
  if (event.code === 'Space') {
    onClick();
  }
};

// При клике на чекбокс item
const onCheckItem = (itemId, checked) => {
  appStore.checkOneItem(itemId, props.list.id, checked);
};

// При клике на чекбокс list
const onCheckList = (checked) => appStore.checkAllItems(props.list.id, checked);

const onChangeColor = (itemId, color) => {
  appStore.changeItemColor(itemId, props.list.id, color);
};

const onChangeAmount = (itemId, amount) => {
  appStore.changeItemAmount(itemId, props.list.id, amount, () => {});
};
</script>

<template>
	<div class="collapsible-list" ref="listRef">
		<div class="collapsible-list__header">
			<ArrowButton
				class="arrow-icon-button"
				:is-open="isOpen"
				:height="24"
				:width="24"
				:label="label"
				@click="onClick"
				@keydown="onKeyDown"
			/>
			<CheckboxWithLabel
				:id="list.id"
				:label="label"
				:width="16"
				:height="16"
				:checked="list.checkedCount === list.items.length"
				@check="onCheckList"
			>
				<span
					v-if="list.checkedCount > 0 && list.checkedCount !== list.items.length"
					class="checkbox-partial-mark"
				/>
			</CheckboxWithLabel>
		</div>
		<Transition name="slide-fade">
			<div
				v-if="isOpen"
				class="collapsible-list__body"
			>
				<ListItem
					v-for="(item, index) in list.items"
					:key="item.id"
					:item="item"
					:label="`Item ${index + 1}`"
					@check="onCheckItem"
					@change-color="onChangeColor"
					@change-amount="onChangeAmount"
				/>
			</div>
		</Transition>
	</div>
</template>

<style lang="scss" scoped>
.collapsible-list {
	height: 16px;
	overflow: hidden;
	transition: height 0.3s ease-in-out;

	.slide-fade-enter-active {
		transition: all 0.3s ease-in;
	}

	.slide-fade-leave-active {
		transition: all 0.3s ease-out;
	}

	.slide-fade-enter-from,
	.slide-fade-leave-to {
		opacity: 0;
	}

	.collapsible-list__header {
		height: 16px;
		display: flex;
		flex-direction: row;
		align-items: center;
		
		.arrow-icon-button {
			margin-right: 6px;
		}
		
		.checkbox-partial-mark {
			width: 4px;
			height: 4px;
			display: block;
			background-color: #000000;
		}
	}
	
	.collapsible-list__body {
		padding: 12px 15px 0 50px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	@media screen and (min-width: 425px) {
		.collapsible-list__body {
			padding: 12px 76px 0 60px;
		}
	}
}
</style>
