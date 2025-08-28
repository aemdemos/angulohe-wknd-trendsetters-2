/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Get all direct child <a> elements (each is a card)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  cardLinks.forEach(card => {
    // 1st column: Find image (first img in the card)
    const img = card.querySelector('img');
    // 2nd column: Find text block
    // The image and a div (text) are both direct children of the first inner grid
    const gridInner = card.querySelector('.w-layout-grid');
    let textBlock = null;
    if (gridInner) {
      // Find the first div after the img that contains the heading
      // This div contains the tag, timing, heading, body, and CTA text
      const candidates = Array.from(gridInner.children).filter(el => el.tagName === 'DIV');
      for (const div of candidates) {
        if (div.querySelector('h3, .h4-heading')) {
          textBlock = div;
          break;
        }
      }
      // Fallback: if not found, use the last div
      if (!textBlock && candidates.length > 0) textBlock = candidates[candidates.length - 1];
    }

    // Only add the row if we have both image and text
    if (img && textBlock) {
      rows.push([img, textBlock]);
    }
  });

  // Create and replace with the proper table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
