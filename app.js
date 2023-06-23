const sources = document.querySelectorAll('.source');
const targets = document.querySelectorAll('.target');
const elementTitles = document.querySelectorAll('.element-title');
const descriptionContainers = document.querySelectorAll('.description-container');
const exitBtn = document.querySelectorAll('.close');
let selectedSource = null;

// Obsługa przeciągania elementów źródłowych
sources.forEach((source) => {
  source.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.dataset.name);
    e.target.style.opacity = 0.3;
    selectedSource = e.target;
  });

  source.addEventListener('dragend', (e) => {
    e.target.style.opacity = 1;
    selectedSource = null;
  });
});

// Obsługa opuszczania elementów docelowych
targets.forEach((target) => {
  target.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  target.addEventListener('dragenter', (e) => {
    if (selectedSource !== null && selectedSource.dataset.name === target.dataset.name) {
      e.target.style.backgroundColor = 'rgba(144, 238, 144, 0.521)';
    } else {
      e.target.style.backgroundColor = 'rgba(255, 0, 0, 0.541)';
    }
  });

  target.addEventListener('dragleave', (e) => {
    e.target.style.backgroundColor = 'transparent';
  });

  target.addEventListener('drop', (e) => {
    e.preventDefault();
    const sourceName = e.dataTransfer.getData('text/plain');
    const sourceElement = document.querySelector(`.source[data-name="${sourceName}"]`);

    if (sourceElement && sourceElement.dataset.name === target.dataset.name) {
      e.target.appendChild(sourceElement);
      e.target.classList.add('remove-border');
      sourceElement.style.width = `${target.clientWidth}px`;
      sourceElement.style.height = `${target.clientHeight}px`;
      sourceElement.setAttribute('draggable', 'false');
    }

    targets.forEach((target) => {
      target.style.backgroundColor = 'transparent';
    });
  });
});

// Obsługa kliknięcia w elementy tytułów
elementTitles.forEach((title, index) => {
  title.addEventListener('click', () => {
    descriptionContainers.forEach((container) => {
      container.style.left = '-30%';
    });
    descriptionContainers[index].style.left = '0';
  });
});

// Obsługa kliknięcia w przyciski zamykające
exitBtn.forEach((exit) => {
  exit.addEventListener('click', () => {
    descriptionContainers.forEach((container) => {
      container.style.left = '-30%';
    });
  });
});
