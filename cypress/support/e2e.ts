import './commands';
import addContext from 'mochawesome/addContext';

const titleToFileName = (title) => title.replace(/[:\/]/g, '');

Cypress.on('test:after:run', (test, runnable) => {
  console.log(`gowno: ${Cypress.spec.name}`);
  console.log(`san: ${Cypress.spec.name.split('/')[1]}`);

  if (test.state === 'failed') {
    let parent = runnable.parent;
    let filename = '';
    while (parent && parent.title) {
      filename = `${titleToFileName(parent.title)} -- ${filename}`;
      parent = parent.parent;
    }
    filename += `${titleToFileName(test.title)} (failed).png`;
    addContext(
      { test },
      `../mochawesome/screenshots/${Cypress.spec.name}/${filename}`,
    );
  }
  addContext({ test }, `../mochawesome/videos/${Cypress.spec.name}.mp4`);
});
