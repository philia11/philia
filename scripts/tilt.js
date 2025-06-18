function tilt(element, options = {}) {
  if (!element || !(element instanceof HTMLElement)) {
    console.warn('Tilt element not found or invalid:');
    return null;
  }
    
  const constraint = options.constraint || 60;
  const perspective = options.perspective || 800;
  
  let center = null;
  
  function getCenter() {
    if (!center) {
      const rect = element.getBoundingClientRect();
      center = {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2
      };
    }
    return center;
  }
  
  function resetCenter() {
    center = null;
  }
  
  function handleMouseMove(e) {
    const { x, y } = getCenter();
    const rotationX = -(e.clientY - y) / (constraint * 0.75);
    const rotationY = (e.clientX - x) / (constraint * 2);
    
    element.style.transform = 
      `perspective(${perspective}px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
  }
  
  document.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('resize', resetCenter);
  window.addEventListener('scroll', resetCenter, { passive: true });
  
  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', resetCenter);
    window.removeEventListener('scroll', resetCenter);
  };
}

function initTiltFx() {
  const tiltElements = document.querySelectorAll('[data-tilt]');
  
  tiltElements.forEach(element => {
    const constraint = parseInt(element.dataset.constraint) || 60;
    const perspective = parseInt(element.dataset.perspective) || 800;
    
    tilt(element, { constraint, perspective });
  });
}

document.addEventListener('DOMContentLoaded', initTiltFx);
