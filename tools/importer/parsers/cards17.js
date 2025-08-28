/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards17) block header
  const headerRow = ['Cards (cards17)'];

  // Select all direct card containers
  const cardDivs = element.querySelectorAll(':scope > .utility-aspect-1x1');

  // For this HTML, cards consist only of images; no text content is present
  const rows = Array.from(cardDivs).map(div => {
    // Each card should contain one image
    const img = div.querySelector('img');
    // Only add row if image found, second cell empty string (no text available)
    return img ? [img, ''] : null;
  }).filter(row => row !== null);

  // Build table: header + card rows
  const cells = [headerRow, ...rows];

  // Create and replace block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
