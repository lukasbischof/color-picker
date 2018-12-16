import { Segment, SegmentedControl } from "./components/segmentedControl/SegmentedControl";
import Wheel from '@/components/panels/Wheel';


export default new SegmentedControl([
  new Segment('circle', 'Circle', h => (<Wheel onError={this.logError} />)),
  new Segment('spectrum', 'Spectrum', h => (<h1>Hello!</h1>))
]);

export const segmentedControlComponents = {
  Wheel
};
