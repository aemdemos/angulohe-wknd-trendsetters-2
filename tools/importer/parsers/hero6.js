/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per block name spec
  const headerRow = ['Hero (hero6)'];

  // Get top-level children
  const topChildren = element.querySelectorAll(':scope > div');

  // -- Row 2: Background image (optional) --
  let bgImg = null;
  for (const child of topChildren) {
    const img = child.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }
  const row2 = [bgImg ? bgImg : ''];

  // -- Row 3: Headline, subheading, buttons --
  // Find the card element containing text and CTAs
  let cardContent = null;
  for (const child of topChildren) {
    const card = child.querySelector('.card');
    if (card) {
      cardContent = card;
      break;
    }
  }
  const row3 = [cardContent ? cardContent : ''];

  // Build table
  const cells = [
    headerRow,
    row2,
    row3
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
