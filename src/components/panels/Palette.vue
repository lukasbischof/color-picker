<template>
  <div class="palette-container">
    <div v-for="(color, key) in colors"
         :class="{ active: activeColor === color }"
         :key="key"
         :title="key"
         :style="{ backgroundColor: color.cssHex }"
         class="item"
         @click="activate(color)"></div>
  </div>
</template>

<style lang="scss" scoped>
  $tile-size: 70px;

  .palette-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    flex-wrap: wrap;
    grid-row-gap: 10px;
    justify-items: center;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .item {
    width: $tile-size;
    height: $tile-size;
    box-sizing: border-box;

    &.active {
      border: 4px solid black;
      animation: color-picker-blink-dark 1.5s ease infinite;
    }
  }
</style>

<script>
  import Color from '@/models/Color';

  export default {
    data() {
      const colors = {
        red: new Color(255, 0, 0),
        green: new Color(0, 255, 0),
        blue: new Color(0, 0, 255),
        aqua: new Color(234, 234, 238),
        black: new Color(0, 0, 0),
        white: new Color(255, 255, 255),
        maroon: new Color(129, 0, 0),
        navy: new Color(0, 0, 127),
        purple: new Color(127, 0, 127),
        teal: new Color(0, 129, 129),
        yellow: new Color(255, 255, 0),
        turquoise: new Color(0, 255, 255),
        magenta: new Color(255, 0, 255),
        orange: new Color(255, 167, 0),
        gray: new Color(134, 134, 134),
        lavender: new Color(204, 102, 255),
        strawberry: new Color(255, 0, 128)
      };

      return {
        colors,
        activeColor: colors.red
      };
    },
    methods: {
      activate(colorItem) {
        this.activeColor = colorItem;
      }
    }
  };
</script>
