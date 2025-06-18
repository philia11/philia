const className = 'cursor-tooltip';
const dataAttribute = 'data-tooltip';

let tooltip = document.createElement('div');
tooltip.className = className;
document.body.appendChild(tooltip);

function updateTooltipPosition(e) {
  const xOffsetPercent = 50; // Adjust this value to change horizontal offset
  const yOffsetPercent = 150; // Adjust this value to change vertical offset
  tooltip.style.transform = `translate(calc(${e.clientX}px - ${xOffsetPercent}%), calc(${e.clientY}px - ${yOffsetPercent}%))`;
}

function showTooltip(message) {
  tooltip.textContent = message;
  tooltip.classList.add('show');
}

function hideTooltip() {
  tooltip.classList.remove('show');
}

function bindTooltipEvents(element) {
  const message = element.dataset.tooltip;
  
  element.addEventListener('mouseenter', () => {
    showTooltip(message);
  });
  element.addEventListener('mousemove', updateTooltipPosition);
  element.addEventListener('mouseleave', hideTooltip);
}

function initTooltips() {
  const elements = document.querySelectorAll(`[${dataAttribute}]`);
  elements.forEach(bindTooltipEvents);
}

document.addEventListener('DOMContentLoaded', initTooltips);
