/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Cards (cards24)'];

  // Cards are direct child anchors
  const cardEls = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cardEls.map(card => {
    // First cell: reference the existing image element inside the aspect wrapper
    let imgCell = null;
    const aspectWrap = card.querySelector('.utility-aspect-2x3');
    if (aspectWrap) {
      const img = aspectWrap.querySelector('img');
      if (img) imgCell = img;
    }
    
    // Second cell: combine tag/date row and heading
    const contentFragment = document.createDocumentFragment();
    const tagAndDate = card.querySelector('.flex-horizontal');
    if (tagAndDate) {
      contentFragment.appendChild(tagAndDate);
    }
    const heading = card.querySelector('h3, .h4-heading');
    if (heading) {
      contentFragment.appendChild(heading);
    }
    return [imgCell, contentFragment];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
