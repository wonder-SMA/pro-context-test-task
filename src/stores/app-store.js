import { ref } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { getIndexes } from '../helpers/get-indexes';
import { getRandomColor } from '../helpers/get-random-color';
import { getRandomNumber } from '../helpers/get-random-number';

export const useAppStore = defineStore('appStore', () => {
  const lists = ref([]);
  const completedAction = ref({
    type: '',
    payload: {},
  });

  const createData = () => {
    for (let i = 0; i < 5; i++) {
      const itemsCount = getRandomNumber(4, 10);

      const items = Array.from({ length: itemsCount }, () => ({
        id: uuidv4(),
        checked: false,
        amount: getRandomNumber(0, 100),
        color: getRandomColor(),
      }));

      lists.value.push({
        id: uuidv4(),
        checkedCount: 0,
        items,
      });
    }
  };

  const checkOneItem = (itemId, listId, checked) => {
    const { listIdx, itemIdx } = getIndexes(lists.value, listId, itemId);
    lists.value[listIdx].items[itemIdx].checked = checked;

    if (checked) {
      lists.value[listIdx].checkedCount += 1;
    } else {
      lists.value[listIdx].checkedCount -= 1;
    }

    completedAction.value.type = 'checkOneItem';
  };

  const checkAllItems = (listId, checked) => {
    const listIdx = lists.value.findIndex(list => list.id === listId);
    lists.value[listIdx].items.forEach(item => item.checked = checked);

    if (checked) {
      lists.value[listIdx].checkedCount = lists.value[listIdx].items.length;
    } else {
      lists.value[listIdx].checkedCount = 0;
    }

    completedAction.value.type = 'checkAllItems';
  };

  const changeItemColor = (itemId, listId, color) => {
    const { listIdx, itemIdx } = getIndexes(lists.value, listId, itemId);
    lists.value[listIdx].items[itemIdx].color = color;

    completedAction.value = {
      type: 'changeItemColor',
      payload: {
        itemId,
        color,
      },
    };
  };

  const changeItemAmount = (itemId, listId, amount, callback) => {
    const { listIdx, itemIdx } = getIndexes(lists.value, listId, itemId);

    if (amount !== null) {
      lists.value[listIdx].items[itemIdx].amount = amount;
      completedAction.value.type = 'changeItemAmount';
    } else {
      lists.value[listIdx].items[itemIdx].amount -= 1;
      completedAction.value.type = 'deleteItem';
    }

    callback();
  };

  return { lists, completedAction, createData, checkOneItem, checkAllItems, changeItemColor, changeItemAmount };
});
