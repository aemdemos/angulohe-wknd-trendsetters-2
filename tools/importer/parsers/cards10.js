/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as required
  const headerRow = ['Cards (cards10)'];

  // Find all cards (direct child anchors)
  const cardLinks = element.querySelectorAll(':scope > a.card-link');
  const rows = [headerRow];

  cardLinks.forEach(card => {
    // Find image (first img inside .utility-aspect-3x2)
    const imageContainer = card.querySelector('.utility-aspect-3x2');
    const imgEl = imageContainer ? imageContainer.querySelector('img') : null;

    // Text content: .utility-padding-all-1rem
    const textContent = card.querySelector('.utility-padding-all-1rem');
    // Defensive: skip if either image or text missing
    if (!imgEl || !textContent) return;

    // Compose the text cell: always reference existing elements
    // We'll collect: tag (if present), heading (if present), paragraph (if present), in order
    const fragments = [];
    const tagGroup = textContent.querySelector('.tag-group');
    if (tagGroup) {
      // Use the tag-group div directly (includes tag)
      fragments.push(tagGroup);
    }
    const heading = textContent.querySelector('h3, .h4-heading');
    if (heading) {
      fragments.push(heading);
    }
    const paragraph = textContent.querySelector('p');
    if (paragraph) {
      fragments.push(paragraph);
    }

    // Compose row: image in first cell, text fragments in second cell
    rows.push([imgEl, fragments]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}