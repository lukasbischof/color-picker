<template>
  <div>
    <div ref="preview" :style="{ backgroundColor: currentColor.cssRgba }" class="preview-bar"></div>
    <div v-if="error" class="messages">
      <p class="error-message">{{ messages.no_canvas_context }}</p>
    </div>
    <canvas
      ref="canvas"
      :height="canvas.size"
      :width="canvas.size"></canvas>
  </div>
</template>

<style src="../shared/errors.scss" lang="scss"></style>
<style lang="scss" scoped>
  .preview-bar {
    width: 392px;
    height: 50px;
    margin-left: 4px;
    margin-top: 6px;
    background-color: rgb(0, 255, 0);
  }

  canvas {
    margin-left: 111.5px;
    margin-top: 13px;
    width: 177px;
    height: 177px;
  }
</style>

<script>
  import I18n from '@/messages/en';
  import circleImage from '@/assets/circleImage';
  import { Vec2, Vec2Substract } from '@/math/Vec2';
  import ColorPickerEventTypes from '@/event';
  import { getColorAtPoint, deviceScale, positionInCanvas } from '../shared/helpers';
  import Color from '@/models/Color';

  const INNER_RADIUS_MARKER = 6;
  const OUTER_LINE_WIDTH_MARKER = 2;
  const CANVAS_PADDING = INNER_RADIUS_MARKER + 2 * OUTER_LINE_WIDTH_MARKER;

  // noinspection JSUnusedGlobalSymbols
  export default {
    props: {
      value: {
        type: Color,
        default: () => new Color(0, 255, 0)
      }
    },

    data() {
      const scale = deviceScale();
      const actualSize = 177;

      return {
        messages: I18n.shared.messages,
        marker: {
          markX: 0,
          markY: 0
        },
        canvas: {
          scale,
          actualSize: actualSize,
          size: actualSize * scale,
        },
        currentColor: this.value,
        error: false
      };
    },

    computed: {
      ctx() {
        return this.$options.ctx;
      },

      canvasPadding() {
        return this.$options.canvas.padding;
      }
    },

    created() {
      this.$options.canvas = { padding: CANVAS_PADDING };
    },

    mounted() {
      this.$options.ctx = this.$refs.canvas.getContext('2d');

      if (!this.ctx) {
        this.error = true;
        return ColorPickerEventTypes.Error('no canvas context').dispatch(this);
      }

      this.ctx.scale(this.canvas.scale, this.canvas.scale);

      this.loadBackground(image => {
        this.drawBackground(image);
        this.drawMark(30, 30);

        this.ctx.canvas.addEventListener('mousedown', event => {
          const mouseMove = this.mouseMove(image);

          mouseMove(event);

          document.addEventListener('mousemove', mouseMove, false);
          document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', mouseMove, false);
          });
        });
      });
    },

    methods: {
      loadBackground(completion) {
        const image = new Image();
        image.onload = () => completion(image);
        image.src = circleImage;
      },

      mouseMove(image) {
        return e => {
          this.ctx.clearRect(0, 0, this.canvas.actualSize, this.canvas.actualSize);
          this.drawBackground(image);
          const position = positionInCanvas(this.ctx.canvas, e).array.map(pos => pos - 6);
          this.drawMark(...position);
          this.currentColor = getColorAtPoint(this.ctx, this.marker.markX, this.marker.markY, this.canvas.scale);
          this.$emit('input', this.currentColor);
        };
      },

      drawBackground(image) {
        const dimensions = this.canvas.actualSize - this.canvasPadding * 2;
        this.ctx.drawImage(image, this.canvasPadding, this.canvasPadding, dimensions, dimensions);
      },

      drawMark(x, y) {
        const radius = this.canvas.actualSize / 2 - this.canvasPadding;
        const center = new Vec2(radius + this.canvasPadding, radius + this.canvasPadding);
        const pos = Vec2Substract(center, new Vec2(x, y));

        if (pos.length > radius) {
          pos.setLength(radius);
          x = center.x - pos.x;
          y = center.y - pos.y;
        }

        this.ctx.beginPath();
        this.ctx.lineWidth = OUTER_LINE_WIDTH_MARKER;
        this.ctx.strokeStyle = 'black';
        this.ctx.arc(x, y, INNER_RADIUS_MARKER + OUTER_LINE_WIDTH_MARKER, 0, Math.PI * 2, true);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'white';
        this.ctx.arc(x, y, INNER_RADIUS_MARKER, 0, Math.PI * 2, true);
        this.ctx.stroke();
        this.ctx.closePath();

        this.marker.markX = x;
        this.marker.markY = y;
      }
    }
  };
</script>
