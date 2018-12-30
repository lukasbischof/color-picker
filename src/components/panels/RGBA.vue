<template>
  <div>
    <div :style="{ backgroundColor }" class="preview"></div>
    <div class="container">
      <div v-for="element in elements" :key="element.id" :class="{ active: element.active }" class="rgba-group">
        <input :id="element.id"
               :placeholder="element.name"
               :max="element.max"
               :title="`${element.name} (minimum: 0, maximum: ${element.max})`"
               :step="element.step"
               :value="element.value"
               min="0"
               type="number"
               class="rgba-input"
               @focus="element.focus(true)"
               @blur="element.focus(false)"
               @input="inputValueChanged(element, $event.target.value)">
        <label :for="element.id" class="rgba-input-label">{{ element.short }}</label>
      </div>
    </div>
  </div>
</template>

<script>
  import Color from '@/models/Color';

  function element(max, value, name, step = 1) {
    return {
      max,
      value,
      name,
      step,
      active: false,
      get id() {
        return name.toLowerCase();
      },
      get short() {
        return name[0];
      },
      focus(active) {
        this.active = active;
      },
    };
  }

  export default {
    name: 'RGBA',
    props: {
      value: {
        type: Color,
        default: () => new Color(0, 255, 0)
      }
    },
    data() {
      return {
        elements: [
          element(255, this.value.r, 'Red'),
          element(255, this.value.g, 'Green'),
          element(255, this.value.b, 'Blue'),
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
    },
    methods: {
      inputValueChanged(element, newValue) {
        element.value = newValue;
        this.$nextTick(() => {
          this.$emit('input', this.currentColor);
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  $border-color: #b3b3b3;
  $input-height: 40px;

  .preview {
    background-color: rgb(0, 255, 0);
    margin-left: 4px;
    margin-top: 6px;
    width: 392px;
    height: 50px;
  }

  .container {
    align-items: center;
    display: grid;
    grid-template: repeat(2, 1fr) / repeat(2, 1fr);
    justify-items: center;
    margin-top: 2rem;
    height: 130px;
    width: 100%;
  }

  .rgba-group {
    display: flex;

    &.active {
      outline: #d5d5ff auto 5px;

      .rgba-input-label {
        border: 1px solid adjust-color($border-color, 0, 0, 100);
      }
    }
  }

  .rgba-group > .rgba-input {
    background-color: transparent;
    border: 1px solid $border-color;
    border-radius: 4px 0 0 4px;
    box-sizing: border-box;
    font-family: "Helvatica neue", sans-serif;
    font-size: 16px;
    padding: 0 10px;
    vertical-align: middle;
    width: 80px;
    height: $input-height;

    &:focus {
      border-color: adjust-color($border-color, 0, 0, 100);
      outline: none;
    }
  }

  .rgba-group > .rgba-input-label {
    background-color: lighten($border-color, 18);
    border: 1px solid $border-color;
    border-left: none;
    border-radius: 0 4px 4px 0;
    box-sizing: border-box;
    cursor: default;
    line-height: $input-height;
    text-align: center;
    user-select: none;
    width: 40px;
    height: $input-height;
  }
</style>
