/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row - must exactly match example
  const headerRow = ['Hero (hero35)'];

  // Background image row - empty string if none present
  let backgroundRow = [''];
  // There is no background image in this HTML

  // Content row: heading, subheading, CTA (all referenced from existing DOM)
  // Find the main content container inside the grid
  const grid = element.querySelector('.grid-layout');
  const gridChildren = grid ? grid.querySelectorAll(':scope > *') : [];

  const contentElems = [];

  // 1st child: text container (h2 and p)
  const textDiv = gridChildren[0];
  if (textDiv) {
    const heading = textDiv.querySelector('h2');
    if (heading) contentElems.push(heading);
    const subheading = textDiv.querySelector('p');
    if (subheading) contentElems.push(subheading);
  }

  // 2nd child: CTA link
  const cta = gridChildren[1];
  if (cta && cta.tagName === 'A') {
    contentElems.push(cta);
  }

  // If no heading/subheading/cta, leave cell empty (edge-case support)
  const contentRow = [contentElems.length > 0 ? contentElems : ['']];

  // Compose table: 3 rows, 1 column each
  const tableCells = [headerRow, backgroundRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the table
  element.replaceWith(blockTable);
}
