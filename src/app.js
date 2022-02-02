import Task from './components/Task';
import render from './render';
import filter from './components/filter';
import clearList from './components/clear-list';


export default (state) => {
  let startValueForTask = '';
  const elButtonAdd = document.getElementById('add');
  const elInput = document.querySelector('[name="newtask"]');
  elInput.focus();

  elInput.addEventListener('input', ({ target }) => {
    startValueForTask = target.value;
    if (startValueForTask.length > 0) {
      elButtonAdd.removeAttribute('disabled');
    } else {
      elButtonAdd.setAttribute('disabled', '');
    }
  });

  elButtonAdd.addEventListener('click', () => {
    console.log(state)
    if (!document.getElementById('open-tasks-container')) {
      const elOpenTasksContainer = document.createElement('div');
      elOpenTasksContainer.setAttribute('id', 'open-tasks-container');
      const elFilter = filter('Open');
      const elClearList = clearList('Open');

      render('addOpenListContainer', [elFilter, elOpenTasksContainer, elClearList]);
    }
    const elTask = new Task(state.getId(), startValueForTask);
    render('addTask', elTask);
    state.addNewTask(elTask);
    state.nextId();
    elInput.value = '';
    elButtonAdd.setAttribute('disabled', '');
    elInput.focus();
  });
};
