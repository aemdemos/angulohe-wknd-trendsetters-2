/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: matches the example
  const headerRow = ['Cards (cards21)'];

  // Find the card root
  // The image and text content are within .card-body
  const cardBody = element.querySelector('.card-body');

  // Defensive check for missing card-body
  if (!cardBody) {
    // Fallback: replace with header only
    const block = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(block);
    return;
  }

  // Get image (first cell)
  const img = cardBody.querySelector('img');

  // Get heading (text content; styled in example as bold)
  const heading = cardBody.querySelector('.h4-heading');

  // Compose the text cell: heading as <strong>, plus description if present
  const textCellContent = [];
  if (heading) {
    // Use <strong> for heading text
    const strong = document.createElement('strong');
    strong.textContent = heading.textContent;
    textCellContent.push(strong);
  }
  // Gather all other element or text nodes after heading and image, as description
  Array.from(cardBody.childNodes).forEach((node) => {
    // Skip heading and image
    if (node === heading || node === img) return;
    // If node is element and has text
    if (node.nodeType === 1 && node.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = node.textContent.trim();
      textCellContent.push(p);
    }
    // If node is text and not empty
    if (node.nodeType === 3 && node.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = node.textContent.trim();
      textCellContent.push(p);
    }
  });
  // If only heading exists, use just heading; else use heading + description
  const textCell = textCellContent.length ? textCellContent : heading ? [heading] : [];

  // Defensive: If there's no image or no text, skip that cell
  const row = [img || '', textCell.length ? textCell : ''];

  const cells = [headerRow, row];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
