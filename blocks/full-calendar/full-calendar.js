import { div } from '../../scripts/dom-helpers.js';

export default async function decorate(block) {
  const calDiv = div({ id: 'calendar' });
  block.append(calDiv);
}
