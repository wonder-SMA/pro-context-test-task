export const getIndexes = (lists, listId, itemId) => {
  const listIdx = lists.findIndex(list => list.id === listId);
  const itemIdx = lists[listIdx].items.findIndex(item => item.id === itemId);

  return { listIdx, itemIdx };
};
