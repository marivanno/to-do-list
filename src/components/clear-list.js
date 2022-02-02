import render from '../render';
import globalState from '../GlobalState';

const clearList = (type) => {
  const elDiv = document.createElement('div');
  elDiv.classList.add('clear-list', 'py-4', 'px-2');
  elDiv.textContent = `Clear "${type}-List"`;
  elDiv.addEventListener('click', () => {
    render(`remove${type}Tasks`);
    globalState.clearDesiredList(type);
  });
  return elDiv;
};

export default clearList;
