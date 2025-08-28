/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: block name from instructions
  const headerRow = ['Hero (hero20)'];

  // 2nd row: Images (background collage)
  // Find sticky section and image grid
  const stickyDiv = element.querySelector('.w-layout-grid.grid-layout.desktop-1-column.utility-position-sticky');
  let collageBlockImages = [];
  if (stickyDiv) {
    const collageDiv = stickyDiv.querySelector('.ix-hero-scale-3x-to-1x');
    if (collageDiv) {
      const imageGrid = collageDiv.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');
      if (imageGrid) {
        collageBlockImages = Array.from(imageGrid.querySelectorAll('img')).filter(img => img && img.parentElement && img.src);
      }
    }
  }
  // Always pass an array (may be empty)
  const imagesRow = [collageBlockImages];

  // 3rd row: Headline, subheading, CTA
  // Find the content container
  let contentCell = null;
  let contentDiv = null;
  if (stickyDiv) {
    const contentNode = stickyDiv.querySelector('.ix-hero-scale-3x-to-1x-content');
    if (contentNode) {
      contentDiv = contentNode.querySelector('.container');
      if (contentDiv) {
        contentCell = contentDiv;
      } else {
        // Fallback: pass null
        contentCell = document.createElement('div');
      }
    } else {
      contentCell = document.createElement('div');
    }
  } else {
    contentCell = document.createElement('div');
  }
  const contentRow = [contentCell];

  // Compose table
  const cells = [
    headerRow,
    imagesRow,
    contentRow
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
