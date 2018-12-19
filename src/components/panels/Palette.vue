<template>
  <div class="palette-container">
    <div class="item active" style="background-color: rgb(255, 0, 0);" title="red"></div>
    <div class="item" style="background-color: rgb(0, 255, 0);" title="green"></div>
    <div class="item" style="background-color: rgb(0, 0, 255);" title="blue"></div>
    <div class="item" style="background-color: rgb(234, 234, 238);" title="aqua"></div>
    <div class="item" style="background-color: rgb(0, 0, 0);" title="black"></div>
    <div class="item" style="background-color: rgb(255, 255, 255);" title="white"></div>
    <div class="item" style="background-color: rgb(129, 0, 0);" title="maroon"></div>
    <div class="item" style="background-color: rgb(0, 0, 127);" title="navy"></div>
    <div class="item" style="background-color: rgb(127, 0, 127);" title="purple"></div>
    <div class="item" style="background-color: rgb(0, 129, 129);" title="teal"></div>
    <div class="item" style="background-color: rgb(255, 255, 0);" title="yellow"></div>
    <div class="item" style="background-color: rgb(0, 255, 255);" title="turquise"></div>
    <div class="item" style="background-color: rgb(255, 0, 255);" title="magenta"></div>
    <div class="item" style="background-color: rgb(255, 167, 0);" title="orange"></div>
    <div class="item" style="background-color: rgb(134, 134, 134);" title="gray"></div>
    <div class="item" style="background-color: rgb(204, 102, 255);" title="lavender"></div>
    <div class="item" style="background-color: rgb(255, 0, 128);" title="strawberry"></div>
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
  export default {};
</script>
