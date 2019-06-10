
# SliderQ

Vue.js responsive carousel component

## Getting started

### Installation

1. Install:

```bash
npm install slider-q

```

2. Add to project (main.js):

```bash
import SliderQ from 'slider-q'

Vue.use(SliderQ)

```

### Use SliderQ

```vue
<template>
  <SliderQ>
    <slide>
      slide 1
    </slide>
    <slide>
      slide 2
    </slide>
    ...
  </SliderQ>
</template>

```
### Available Props

|Prop             |Default |Description|
|-----------------|-----|-----------|
|`minNumSlides`   |1    |count of items to be in viewpoint when window is small|
|`maxNumSlides`   |4    |count of items to be in viewpoint when window is hide|
|`minSizeOfSlide` |150  |px |
|`isCentered`     |false|center items if actual count is less then maximum|
