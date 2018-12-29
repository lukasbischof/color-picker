<template>
  <div>
    <div ref="preview" class="preview"></div>
    <div v-if="!ctx" class="messages">
      <p class="error-message">{{ messages.no_canvas_context }}</p>
    </div>
    <canvas ref="canvas" :width="canvas.size.width" :height="canvas.size.height"></canvas>
    <p v-if="!ctx"></p>
  </div>
</template>

<style src="../shared/errors.scss" lang="scss"></style>
<style lang="scss" scoped>
  .preview {
    width: 392px;
    height: 50px;
    margin-left: 4px;
    margin-top: 6px;
    background-color: rgb(10, 119, 22);
  }

  canvas {
    margin-left: 4px;
    margin-top: 21.5px;
    width: 392px;
    height: 160px;
  }
</style>

<script>
  import ColorPickerEventTypes from '@/event';
  import I18n from '@/messages/en';
  import { clamp, deviceScale, getColorAtPoint, positionInCanvas } from '../shared/helpers';

  export default {
    data() {
      const scale = deviceScale();
      const actualSize = {
        width: 392,
        height: 160
      };

      return {
        ctx: undefined,
        messages: I18n.shared.messages,
        marker: {
          x: 0,
          y: 0
        },
        canvas: {
          scale: scale,
          actualSize,
          size: {
            width: actualSize.width * scale,
            height: actualSize.height * scale
          },
          element: undefined
        }
      };
    },
    mounted() {
      this.canvas.element = this.$refs.canvas;
      this.ctx = this.canvas.element.getContext('2d');

      if (!this.ctx) {
        ColorPickerEventTypes.Error('no canvas context').dispatch(this);
        return;
      }

      this.ctx.scale(this.canvas.scale, this.canvas.scale);

      this.drawBackground();
      this.drawMark(20, 20);

      this.canvas.element.addEventListener('mousedown', e => {
        this.mouseMove(e);

        document.addEventListener('mousemove', this.mouseMove, false);
        document.addEventListener('mouseup', () => {
          document.removeEventListener('mousemove', this.mouseMove, false);
        });
      });
    },
    methods: {
      drawBackground() {
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.actualSize.width, 0);
        gradient.addColorStop(0 / 5, 'red');
        gradient.addColorStop(1 / 5, 'yellow');
        gradient.addColorStop(2 / 5, 'green');
        gradient.addColorStop(3 / 5, 'aqua');
        gradient.addColorStop(4 / 5, 'blue');
        gradient.addColorStop(5 / 5, 'purple');

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.actualSize.width, this.canvas.actualSize.height);

        const gradient2 = this.ctx.createLinearGradient(0, 0, 0, this.canvas.actualSize.height);
        gradient2.addColorStop(0 / 2, 'white');
        gradient2.addColorStop(1 / 2, 'transparent');
        gradient2.addColorStop(2 / 2, 'black');

        this.ctx.fillStyle = gradient2;
        this.ctx.fillRect(0, 0, this.canvas.actualSize.width, this.canvas.actualSize.height);
      },

      drawMark(x, y) {
        x = clamp(x, 0, this.canvas.actualSize.width - 0.1);
        y = clamp(y, 0, this.canvas.actualSize.height - 0.1);

        const radMin = 6;
        x = x < radMin / 2 - 3.5 ? radMin / 2 - 3.5 : x;
        y = y < radMin / 2 - 3.5 ? radMin / 2 - 3.5 : y;

        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = 'black';
        this.ctx.arc(x, y, radMin + 2, 0, Math.PI * 2, true);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'white';
        this.ctx.arc(x, y, radMin, 0, Math.PI * 2, true);
        this.ctx.stroke();
        this.ctx.closePath();

        this.marker.x = x;
        this.marker.y = y;
      },

      mouseMove(e) {
        this.ctx.clearRect(0, 0, this.canvas.actualSize.width, this.canvas.actualSize.height);
        this.drawBackground();
        this.drawMark(...positionInCanvas(this.canvas.element, e).array.map(pos => pos - 6));

        const backgroundColor = getColorAtPoint(this.ctx, this.marker.x, this.marker.y, this.canvas.scale).cssRGBA;
        this.$refs.preview.style.backgroundColor = backgroundColor;
      }
    }
  };
</script>
