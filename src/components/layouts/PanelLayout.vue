<script setup />

<template>
	<div class="panel-layout">
		<slot />
	</div>
</template>

<style lang="scss" scoped>
.panel-layout {
	width: 400px;
	min-height: 600px;
	height: 100%;
	border: 2px solid black;
	padding: 24px 16px;
	display: flex;
	flex-direction: column;
	gap: 12px;
}
</style>
