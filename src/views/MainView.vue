<script setup>
import { useAppStore } from '../stores/app-store';
import LeftPanel from '../components/elements/left-panel/LeftPanel.vue';
import RightPanel from '../components/elements/right-panel/RightPanel.vue';

const appStore = useAppStore();

appStore.createData();
</script>

<template>
	<main class="container">
		<LeftPanel :lists="appStore.lists" />
		<RightPanel :lists="appStore.lists" />
	</main>
</template>

<style lang="scss" scoped>
.container {
	width: 100%;
	max-width: 1200px;
	height: 100%;
	border: 2px solid black;
	padding: 1.5rem;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 1rem;
	overflow: hidden;
}

@media screen and (min-width: 1024px) {
	.container {
		justify-content: space-between;
	}
}
</style>
