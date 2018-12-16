import header from './SegmentedControlHeader';
import body from './SegmentedControlBody';

export class Segment {
  constructor(id, name, renderFunction) {
    this.name = name;
    this.id = id;
    this.renderFunction = renderFunction;
  }
}

export class SegmentedControl {
  constructor(segments) {
    this.segments = segments || [];
    this.currentSegmentIndex = 0;
    this.activateIndex(this.currentSegmentIndex);
  }

  activateIndex(index) {
    this.currentSegmentIndex = index;
    this.activeSegment = this.segments[index];
  }

  activate(segment) {
    const index = this.segments.indexOf(segment);
    if (index !== -1) this.activateIndex(index);
  }
}

export const SegmentedControlHeader = header;
export const SegmentedControlBody = body;
