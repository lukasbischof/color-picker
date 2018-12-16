import Vue from "vue";
import { Segment, SegmentedControl } from "./SegmentedControl";

export default Vue.component('segmented-control-body', {
  props: {
    segmentedControl: {
      type: SegmentedControl,
      required: true
    }
  },
  render(h) {
    return (
      <div class="segmented-control-body">
        {this.segmentedControl.activeSegment.renderFunction(h)}
      </div>
    );
  }
});
