/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header matches example block name
  const headerRow = ['Cards (cards37)'];

  // 2. Find the actual cards grid (innermost .grid-layout)
  let cardsGrid = element.querySelector('.grid-layout.grid-gap-sm.y-top');
  if (!cardsGrid) {
    // fallback for unexpected structure
    cardsGrid = element;
  }
  // Get all direct card links
  const cardLinks = Array.from(cardsGrid.querySelectorAll(':scope > a.utility-link-content-block, :scope > div > a.utility-link-content-block'));

  // 3. Build table rows
  const rows = [headerRow];
  cardLinks.forEach((a) => {
    // ---- Image cell ----
    // Prefer to use the aspect wrapper for cropping/ratio if present
    let img = a.querySelector('img.cover-image');
    let aspect = img ? img.closest('.utility-aspect-2x3, .utility-aspect-1x1') : null;
    let imageCell = aspect || img;
    if (!imageCell) {
      // fallback: use the link itself if no image
      imageCell = a;
    }
    // ---- Text cell ----
    const textCell = [];
    // Heading (h3 or h4)
    let heading = a.querySelector('h3, h4');
    if (heading) textCell.push(heading);
    // Description (first p after heading, or first p)
    let desc = null;
    if (heading) {
      desc = heading.nextElementSibling && heading.nextElementSibling.tagName.toLowerCase() === 'p' ? heading.nextElementSibling : a.querySelector('p');
    } else {
      desc = a.querySelector('p');
    }
    if (desc) textCell.push(desc);
    // CTA (.button) if present
    let cta = a.querySelector('.button');
    if (cta) textCell.push(cta);
    // Add the row
    rows.push([imageCell, textCell]);
  });

  // 4. Create block table and replace element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
