import render from '../render';
import globalState from '../GlobalState';

const filter = (type) => {
  const elDiv = document.createElement('div');
  elDiv.classList.add('filter', 'py-5');
  const tamplate = `<b class="px-3">${type}</b>
  <form class="px-2">
    <select class="p-1">
      <option value="records-${type}">Records</option>
      <option ${
  type === 'Open'
    ? 'value="creation date"'
    : 'value="due date"'}>
        ${
  type === 'Open'
    ? 'creation date'
    : 'due date'}
          </option>
    </select>
  </form>`;

  elDiv.innerHTML = tamplate;
  elDiv.querySelector('select').addEventListener('change', ({ target }) => {
    if (target.value === 'due date') {
      const nodeDoneList = globalState.createTasksListSortedByDate('done-list');
      render('renderFilterDoneContainer', nodeDoneList);
    } else if (target.value === 'creation date') {
      const nodeDoneList = globalState.createTasksListSortedByDate('open-list');
      render('renderFilterOpenContainer', nodeDoneList);
    } else if (target.value === 'records-Open') {
      const nodeDoneList = globalState.createTasksListSortedByRcords('open-list');
      render('renderFilterOpenContainer', nodeDoneList);
    } else if (target.value === 'records-Done') {
      const nodeDoneList = globalState.createTasksListSortedByRcords('done-list');
      render('renderFilterDoneContainer', nodeDoneList);
    }
  });
  return elDiv;
};

export default filter;
