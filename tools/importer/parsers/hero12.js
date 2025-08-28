/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout root (should be 1 in hero12 block)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Row 2: Background image (can be null)
  let backgroundImg = null;
  // First direct child with an <img> not part of the content card
  // In this example, first grid child is a div containing the background img
  const bgCandidate = gridChildren[0];
  if (bgCandidate) {
    backgroundImg = bgCandidate.querySelector('img');
  }

  // Row 3: Content (headline, subpoints, cta)
  // Second grid child
  let contentBlock = null;
  if (gridChildren[1]) {
    // The content is within .card-body (for safe referencing, include the whole .card)
    const card = gridChildren[1].querySelector('.card');
    if (card) {
      contentBlock = card;
    } else {
      // fallback: just use the grid child
      contentBlock = gridChildren[1];
    }
  }

  // Always match the exact header (no extra metadata block)
  const cells = [
    ['Hero (hero12)'],
    [backgroundImg ? backgroundImg : ''],
    [contentBlock ? contentBlock : '']
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
