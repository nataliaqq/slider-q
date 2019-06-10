<template>
	<div
		:style="[$sliderQ.sliderItem, $sliderQ.basic]"
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


</style>
