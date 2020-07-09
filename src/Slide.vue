<template>
	<div
		:style="[$sliderQ.sliderItem, $sliderQ.basic]"
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


</style>
