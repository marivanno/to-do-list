import render from '../render';

const clearList = (type) => {
  const elDiv = document.createElement('div');
  elDiv.classList.add('clear-list', 'py-4', 'px-2');
  elDiv.textContent = `Clear "${type}-List"`;
  elDiv.addEventListener('click', () => {
    render(`remove${type}Tasks`);
  });
  return elDiv;
};

export default clearList;
