/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the main grid containing all actual content
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // 2. Find the main content pieces
  const heading = grid.querySelector('p.h2-heading');
  const testimonial = grid.querySelector('p.paragraph-lg');
  const bottomGrid = grid.querySelector('.w-layout-grid.grid-layout');

  // Defensive: if bottomGrid missing, just put nulls
  let leftByline = null;
  let rightLogo = null;
  if (bottomGrid) {
    leftByline = bottomGrid.querySelector('.flex-horizontal');
    rightLogo = bottomGrid.querySelector('.utility-display-inline-block');
  }

  // Compose left column: heading, leftByline
  const leftColumn = [];
  if (heading) leftColumn.push(heading);
  if (leftByline) leftColumn.push(leftByline);

  // Compose right column: testimonial, rightLogo
  const rightColumn = [];
  if (testimonial) rightColumn.push(testimonial);
  if (rightLogo) rightColumn.push(rightLogo);

  // Compose table rows
  const cells = [
    ['Columns (columns26)'], // Header row EXACTLY as provided
    [leftColumn, rightColumn]
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
