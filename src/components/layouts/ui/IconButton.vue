<script setup />

<template>
	<button class="icon-button">
		<slot />
	</button>
</template>

<style lang="scss" scoped>
.icon-button {
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: transparent;
	user-select: none;
	touch-action: manipulation;
	cursor: pointer;
}
</style>
