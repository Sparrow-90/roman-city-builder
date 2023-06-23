const sources = document.querySelectorAll('.source');
const targets = document.querySelectorAll('.target');

let selectedSource = null;

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

targets.forEach((target) => {
  target.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  target.addEventListener('dragenter', (e) => {
    if (selectedSource !== null && selectedSource.dataset.name === target.dataset.name) {
      e.target.style.backgroundColor = 'lightgreen';
    } else {
      e.target.style.backgroundColor = 'red';
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
    }

    targets.forEach((target) => {
      target.style.backgroundColor = 'transparent';
    });
  });
});

const elementTitles = document.querySelectorAll('.element-title');
const descriptionContainers = document.querySelectorAll('.description-container');

elementTitles.forEach((title, index) => {
  title.addEventListener('click', () => {
    descriptionContainers.forEach((container) => {
      container.style.left=`-30`;
    });
    descriptionContainers[index].style.left=`0`;
  });
});




const exitBtn = document.querySelectorAll('.close')

exitBtn.forEach((exit)=>{
    exit.addEventListener('click', ()=>{
        descriptionContainers.forEach((container) => {
            container.style.left=`-30%`;
          }) 
    })
})
