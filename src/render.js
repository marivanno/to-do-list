const render = (action, data = null) => {
  switch (action) {
    case 'addTask': {
      const elOpenTasksContainer = document.querySelector('#open-tasks-container');
      const elNewtask = data.buildTask();
      elOpenTasksContainer.appendChild(elNewtask);
      break;
    }
    case 'addOpenListContainer': {
      const elOpenTasks = document.getElementById('open-tasks');
      elOpenTasks.append(...data);
    }
      break;
    case 'addDoneListContainer': {
      const elDoneTasks = document.getElementById('done-tasks');
      elDoneTasks.append(...data);
    }
      break;
    case 'removeOpenTasks': {
      const elOpenTasks = document.getElementById('open-tasks');
      elOpenTasks.innerHTML = '';
    }
      break;
    case 'removeDoneTasks': {
      const elDoneTasks = document.getElementById('done-tasks');
      elDoneTasks.innerHTML = '';
    }
      break;
    case 'renderOpenAndDoneList': {
      const { nodeOpenList, nodeDoneList } = data;
      if (document.getElementById('open-tasks-container')) {
        const elOpenTasksContainer = document.querySelector('#open-tasks-container');
        elOpenTasksContainer.innerHTML = '';
        elOpenTasksContainer.append(...nodeOpenList);
      }

      if (document.getElementById('done-tasks-container')) {
        const elDoneTasksContainer = document.querySelector('#done-tasks-container');
        elDoneTasksContainer.innerHTML = '';
        elDoneTasksContainer.append(...nodeDoneList);
      }
      break;
    }
    case 'renderdblclick': {
      const id = data.getId();
      const currentTask = document.querySelector(`#taskid-${id}`);
      const el = data.buildTask();
      currentTask.parentNode.replaceWith(el);
      const elInput = el.querySelector('.input-field');
      elInput.focus();
      elInput.selectionStart = elInput.value.length;
      break;
    }

    case 'renderFilterOpenContainer': {
      const elOpenTaskListContainer = document.querySelector('#open-tasks-container');
      elOpenTaskListContainer.innerHTML = '';
      elOpenTaskListContainer.append(...data);
      break;
    }

    case 'renderFilterDoneContainer': {
      const elDoneTaskListContainer = document.querySelector('#done-tasks-container');
      elDoneTaskListContainer.innerHTML = '';
      elDoneTaskListContainer.append(...data);
      break;
    }

    default: {
      throw new Error('undefined action');
    }
  }
};

export default render;
