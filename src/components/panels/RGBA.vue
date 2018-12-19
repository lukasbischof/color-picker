<template>
  <div>
    <div :style="'background-color: ' + backgroundColor" class="preview"></div>
    <div class="container">
      <div v-for="element in elements" :key="element.id" class="rgba-group">
        <input :id="element.id"
               :placeholder="element.name"
               :max="element.max"
               :title="`${element.name} (minimum: 0, maximum: ${element.max})`"
               :step="element.step"
               v-model="element.value"
               min="0"
               type="number"
               class="rgba-input">
        <label :for="element.id" class="rgba-input-label">{{ element.short }}</label>
      </div>
    </div>
  </div>
</template>

<script>
  import Color from "../../models/Color";

  function element(max, value, name, step = 1) {
    return {
      max,
      value,
      name,
      step,

      get id() {
        return name.toLowerCase();
      },

      get short() {
        return name[0];
      }
    };
  }

  export default {
    name: 'RGBA',
    data() {
      return {
        elements: [
          element(255, 0, 'Red'),
          element(255, 255, 'Green'),
          element(255, 0, 'Blue'),
          element(1, 1, 'Alpha', 0.1)
        ]
      };
    },
    computed: {
      currentColor() {
        return new Color(...this.elements.map(element => element.value));
      },
      backgroundColor() {
        return this.currentColor.cssRGBA;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .preview {
    width: 392px;
    height: 50px;
    margin-left: 4px;
    margin-top: 6px;
    background-color: rgb(0, 255, 0);
  }

  .container {
    display: grid;
    grid-template: repeat(2, 1fr) / repeat(2, 1fr);
    justify-items: center;
    align-items: center;
    height: 130px;
    width: 100%;
  }

  .rgba-group {
    $input-height: 40px;
    $border-color: #9c9c9c;

    display: flex;

    .rgba-input {
      width: 80px;
      height: $input-height;
      vertical-align: middle;
      border: 1px solid $border-color;
      border-radius: 4px 0 0 4px;
      background-color: transparent;
      font-family: "Helvatica neue", sans-serif;
      font-size: 16px;
      padding: 0 10px;
      box-sizing: border-box;
    }

    .rgba-input-label {
      width: 40px;
      height: $input-height;
      line-height: $input-height;
      text-align: center;
      background-color: $border-color;
      border-radius: 0 4px 4px 0;
      user-select: none;
      cursor: default;
    }
  }
</style>
