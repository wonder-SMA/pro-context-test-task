<script setup />

<template>
	<button class="button">
		<slot />
	</button>
</template>

<style lang="scss" scoped>
.button {
	max-height: 2.5em;
	padding: 0.25em 0.6em 0.5em;
	border: 1px solid transparent;
	border-radius: 0.5em;
	font-size: 0.6rem;
	line-height: 1;
	color: white;
	background-color: #26a6f2;
	user-select: none;
	touch-action: manipulation;
	cursor: pointer;
	transition: all .2s;

	&:hover {
		background-color: #33b5f1;
	}

	&:active {
		background-color: #199ada;
	}
}
</style>
