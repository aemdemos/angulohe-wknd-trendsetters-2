/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row (block name)
  const headerRow = ['Table (bordered, tableBordered13)'];
  // Column headers as seen in the example screenshot (Question | Answer)
  const columnsRow = ['Question', 'Answer'];

  // Get each Q&A block
  const dividerDivs = Array.from(element.querySelectorAll(':scope > .divider'));
  // Defensive: if no Q&A found, do not proceed
  if (dividerDivs.length === 0) return;

  // Extract each Q&A pair into a row referencing existing elements
  const dataRows = dividerDivs.map(divider => {
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return ['', ''];
    const children = Array.from(grid.children);
    // Defensive check: each grid should have two children
    const question = children[0] || document.createElement('span');
    const answer = children[1] || document.createElement('span');
    return [question, answer];
  });

  // Compose the complete table cells array
  const cells = [headerRow, columnsRow, ...dataRows];

  // Create the table block referencing the original document
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  // Replace original element with the structured block table
  element.replaceWith(blockTable);
}
