/* global WebImporter */
export default function parse(element, { document }) {
  // Table header should exactly match the block name
  const headerRow = ['Cards (cards19)'];

  // Each immediate child div is a card
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  const rows = cardDivs.map(card => {
    // First cell: icon (the SVG inside the .icon div)
    let iconCell = null;
    const iconDiv = card.querySelector('.icon');
    if (iconDiv) {
      iconCell = iconDiv;
    }
    // Second cell: text content (the p element)
    let textCell = null;
    const text = card.querySelector('p');
    if (text) {
      textCell = text;
    }
    return [iconCell, textCell];
  });

  // Edge case: if there are no cards, do nothing
  if (rows.length === 0) return;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
