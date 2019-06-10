import SliderQ from './SliderQ'
import Slide from './Slide'

export default {
    install (Vue) {
        Vue.component('SliderQ', SliderQ)
        Vue.component('slide', Slide)
    }
}

// this line is what makes it possible for the user of the 
// component to be able to use it in a local component if he needs to
export { SliderQ, Slide }