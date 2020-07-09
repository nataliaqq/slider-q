<template>
	<div
		class="slider-container"
		id="slider-container"
		ref="sliderContainer"
		@touchstart="touchstart($event.touches[0].pageX)"
		@touchmove="touchmove($event.touches[0].pageX)"
		@touchend="touchend($event)"

		@mousedown="mousedown($event)"
		@mousemove="mousemove($event)"
		@mouseup="mouseup($event)"

		@mouseleave="mouseleave($event)"
	>
		
		<transition name="fade" v-if="arrows">
			<div
				class="slider-arrow prev"
				@click="prev()"
				v-if="numSlides < itemsLength && transform < 0"
			>
				<i class="fa fa-angle-left" />
			</div>
		</transition>

		<div
			class="items-container"
			:class="{centered: isCentered && numSlides > itemsLength}"
		>
			<slot />
		</div>

		<transition name="fade" v-if="arrows">
			<div
				class="slider-arrow next"
				@click="next()"
				v-if="numSlides < itemsLength && transform > -(itemsLength - numSlides)"
			>
				<i class="fa fa-angle-right" />
			</div>
		</transition>
	</div>
</template>

<script>

export default {
	name: 'SliderQ',
	data () {
		return {
			itemsLength: 4,
			transform: 0,
			numSlides: this.maxNumSlides,
			totalW: window.innerWidth,

			touchstartX: 0,
			touchcurrentX: 0,

			longTouch: false,

			mouseIsDown: false
		}
	},

	provide () {
	    return {
	    	$sliderQ: this
		}
	},

	props: {
		minNumSlides: {
			type: Number,
			default: 1
		},
		isCentered: {
			type: Boolean,
			default: false
		},
		maxNumSlides: {
			type: Number,
			default: 4
		},
		minSizeOfSlide: {
			type: Number,
			default: 150
		},
		arrows: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		sliderItem () {
			var num = this.minNumSlides > this.numSlides ? this.minNumSlides : this.numSlides
			return {
				flexBasis: 'calc(100% / ' + num + ' - 20px)',
				minWidth: 'calc(100% / ' + num + ' - 20px)',
				margin: '0 10px',
				transition: this.touchpathX ? '' : 'transform 0.7s ease'
			}
		},
		basic () {
			return {
				transform: `translate3d(${this.touchpathX}px, 0px, 0px) translate3d(calc(${this.transform * 100}% + ${this.transform * 20}px), 0px, 0px)`
			}
		},

		touchpathX () {
			return this.touchcurrentX - this.touchstartX
		}
	},

	methods: {
		next () {
			if (this.transform > -(this.itemsLength - this.numSlides)) this.moveLeft()
			// move to start
			// else this.transform = 0
		},

		prev () {
			if (this.transform < 0) this.moveRight()
			// move to end 
			// else this.transform = -(this.itemsLength - this.numSlides)
		},

		moveLeft () {
			this.transform--
		},

		moveRight () {
			this.transform++
		},

		mousedown (event) {
			this.mouseIsDown = true
			event.preventDefault()
			this.touchstart(event.screenX)
		},

		mousemove (event) {
			if (this.mouseIsDown) {
				this.touchmove(event.screenX)
			}
		},

		mouseup (event) {
			this.touchend(event.screenX)
			this.mouseIsDown = false
		},

		mouseleave (event) {
			this.mouseup(event)
		},

		touchstart (x) {
			this.touchstartX = x
			this.touchcurrentX = this.touchstartX

			this.longTouch = false
			setTimeout(() => {
				this.longTouch = true
			}, 250)
		},

		touchmove (x) {
			this.touchcurrentX = x
		},

		touchend (event) {
			// var elem
			var elem = this.$children[0].$el
			var elemW = elem ? elem.offsetWidth : 0

			const isSwipe = () => {
				return !this.longTouch
			}

			const moreThenHalf = () => {
				return elemW === 0 ? false : Math.abs(this.touchpathX) > elemW / 2
			}

			if (isSwipe() || moreThenHalf()) {
				if (this.touchpathX > 0) this.prev()
				if (this.touchpathX < 0) this.next()
			}
			this.touchcurrentX = 0
			this.touchstartX = 0
		},

		windowListener () {
			var elem = this.$refs.sliderContainer
			this.totalW = elem && elem.offsetWidth - 40 || 300
			var n = parseInt(this.totalW / this.minSizeOfSlide)
			if (this.maxNumSlides < n) return
			this.numSlides = n < this.minNumSlides ? this.minNumSlides : n
		}
	},

	mounted () {
		this.itemsLength = this.$children.length
		this.windowListener()

		window.addEventListener('resize', this.windowListener)
	},

	destroyed () {
		window.removeEventListener('resize', this.windowListener)
	}
}

</script>

<style scoped>

.slider-container {
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	position: relative;
}

.items-container {
	width: 100%;
	display: flex;
	margin: 0 -10px;
	overflow: hidden;
	padding: 10px 0;
}

.items-container.centered {
	justify-content: center;
}

.item-name {
	text-align: center;
}

.slider-arrow {
	cursor: pointer;
	padding: 10px;
	position: absolute;
    z-index: 2;
    border-radius: 50%;
    width: 40px;
    font-size: 20px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    box-shadow: 0 0 6px rgba(0,0,0,.24), 0 8px 12px rgba(0,0,0,.14);
}

.slider-arrow.prev {
	padding-left: 7px;
	margin-left: -10px;
	left: 0;
}

.slider-arrow.next {
	padding-right: 7px;
	margin-right: -10px;
	right: 0;
}

.fade-enter, 
.fade-leave-to { 
    opacity: 0; 
} 
 
.fade-leave-active, 
.fade-enter-active { 
    overflow: hidden; 
    transition: all .3s ease; 
} 

</style>