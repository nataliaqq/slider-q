<template>
	<div
		:style="[$sliderQ.sliderItem, $sliderQ.basic]"
		class="slide"
		v-on="$listeners"
	>
		<slot />
	</div>		
</template>

<script>

export default {
	name: 'SliderQ_slide',
	inject: ['$sliderQ'],

	mounted () {
	}
}

</script>

<style scoped>
	.slide {
		margin: 0 10px;
	}
</style>
