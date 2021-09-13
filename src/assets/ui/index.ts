/* .d20.roll {
  background-image: url('assets/ui/d20_single.png');
}

.d100.roll {
  background-image: url('assets/ui/d100_single.png');
}

.d12.roll {
  background-image: url('assets/ui/d12_single.png');
}

.d10.roll {
  background-image: url('assets/ui/d10_single.png');
}

.d8.roll {
  background-image: url('assets/ui/d8_single.png');
}

.d6.roll {
  background-image: url('assets/ui/d6_single.png');
}

.d4.roll {
  background-image: url('assets/ui/d4_single.png');
}

.d20.roll-total {
  background-image: url('assets/ui/d20_lot.png');
}

.d100.roll-total {
  background-image: url('assets/ui/d100_lot.png');
}

.d12.roll-total {
  background-image: url('assets/ui/d12_lot.png');
}

.d10.roll-total {
  background-image: url('assets/ui/d10_lot.png');
}

.d8.roll-total {
  background-image: url('assets/ui/d8_lot.png');
}

.d6.roll-total {
  background-image: url('assets/ui/d6_lot.png');
}

.d4.roll-total {
  background-image: url('assets/ui/d4_lot.png');
} */

import d20_single from './dice/d20_single.png';
import d100_single from './dice/d100_single.png';
import d12_single from './dice/d12_single.png';
import d10_single from './dice/d10_single.png';
import d8_single from './dice/d8_single.png';
import d6_single from './dice/d6_single.png';
import d4_single from './dice/d4_single.png';

import d20_lot from './dice/d20_lot.png';
import d100_lot from './dice/d100_lot.png';
import d12_lot from './dice/d12_lot.png';
import d10_lot from './dice/d10_lot.png';
import d8_lot from './dice/d8_lot.png';
import d6_lot from './dice/d6_lot.png';
import d4_lot from './dice/d4_lot.png';

import d4_single_svg from './icon/d4_single.svg';
import d6_single_svg from './icon/d6_single.svg';
import d8_single_svg from './icon/d8_single.svg';
import d10_single_svg from './icon/d10_single.svg';
import d12_single_svg from './icon/d12_single.svg';
import d20_single_svg from './icon/d20_single.svg';
import d100_single_svg from './icon/d100_single.svg';
import dice_single_svg from './icon/dice_single.svg';
import dice_single_small_svg from './icon/dice_single_small.svg';
import homebrew from './icon/homebrew.svg';
import homebrew_simple from './icon/homebrew_simple.svg';
import mapeditor from './icon/mapeditor.svg';
import mapeditor_simple from './icon/mapeditor_simple.svg';

const UI: Map<string, Object> = new Map([
  // Singles
  ['dice/d20_single', d20_single],
  ['dice/d100_single', d100_single],
  ['dice/d12_single', d12_single],
  ['dice/d10_single', d10_single],
  ['dice/d8_single', d8_single],
  ['dice/d6_single', d6_single],
  ['dice/d4_single', d4_single],
  // Lots
  ['dice/d20_lot', d20_lot],
  ['dice/d100_lot', d100_lot],
  ['dice/d12_lot', d12_lot],
  ['dice/d10_lot', d10_lot],
  ['dice/d8_lot', d8_lot],
  ['dice/d6_lot', d6_lot],
  ['dice/d4_lot', d4_lot],
  // Icons
  ['icon/d4_single', d4_single_svg],
  ['icon/d6_single', d6_single_svg],
  ['icon/d8_single', d8_single_svg],
  ['icon/d10_single', d10_single_svg],
  ['icon/d12_single', d12_single_svg],
  ['icon/d20_single', d20_single_svg],
  ['icon/d100_single', d100_single_svg],
  ['icon/single_dice', dice_single_svg],
  ['icon/single_dice_small', dice_single_small_svg],
  ['icon/homebrew', homebrew],
  ['icon/homebrew_simple', homebrew_simple],
  ['icon/mapeditor', mapeditor],
  ['icon/mapeditor_simple', mapeditor_simple]
]);

export default UI;
