const sources = document.querySelectorAll('.source');
const targets = document.querySelectorAll('.target');
const elementTitles = document.querySelectorAll('.element-title');
const descriptionContainers = document.querySelectorAll('.description-container');
const exitBtn = document.querySelectorAll('.close');
const dragSound = document.querySelector('.drag-sound')
const dropSound = document.querySelector('.drop-sound')
const wooshSound = document.querySelector('.woosh-sound')
let selectedSource = null;

// Obsługa przeciągania elementów źródłowych
sources.forEach((source) => {
  source.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.dataset.name);
    e.target.style.opacity = 0.3;
    selectedSource = e.target;
    dragSound.play()
  });

  source.addEventListener('dragend', (e) => {
    e.target.style.opacity = 1;
    selectedSource = null;
  });

  source.addEventListener('click', () => {
    const sourceName = source.dataset.name;
    const descriptionContainer = document.querySelector(`.description-container[data-name="${sourceName}"]`);

    if (descriptionContainer) {
      descriptionContainers.forEach((container) => {
        container.style.left = '-40%';
      });

      descriptionContainer.style.left = '0';
      wooshSound.play()
    }
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
      sourceElement.style.width = `(${target.clientWidth})/2 %`;
      sourceElement.style.height = `$({target.clientHeight})/2 %`;
      sourceElement.setAttribute('draggable', 'false');
      dropSound.play()
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
      container.style.left = '-40%';
    });
    descriptionContainers[index].style.left = '0';
    wooshSound.play()
  });
});

// Obsługa kliknięcia w przyciski zamykające
exitBtn.forEach((exit) => {
  exit.addEventListener('click', () => {
    descriptionContainers.forEach((container) => {
      container.style.left = '-40%';
    });
  });
});
