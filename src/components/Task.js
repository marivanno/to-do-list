import globalState from '../GlobalState';
import render from '../render';
import getCurrentTime from '../utilits';
import filter from './filter';
import clearList from './clear-list';

class Task {
  constructor(id, value, { timeToString, dateNow } = getCurrentTime()) {
    this.id = id;
    this.value = value;
    this.chekbox = false;
    this.creationTime = timeToString;
    this.dateNow = dateNow;
    this.doneDateNow = '';
    this.doneTime = '';
    this.type = 'text';
  }

  getId() {
    return this.id;
  }

  buildTask() {
    const elDiv = document.createElement('div');
    elDiv.classList.add('px-1');
    elDiv.setAttribute('id', this.id);

    if (this.type === 'input') {
      elDiv.innerHTML = ` 
      <div class="task py-2 px-2 my-4" id="taskid-${this.id}">
          <input class="custom-chekbox" type="checkbox" name="taskid" ${this.chekbox ? 'checked' : null}>
          <label for="taskid-${this.id}">
          <input class="input-field" type="text" placeholder="Enter your task" value="${this.value}"/>
          </label>
          <div class="time">
            <div>${this.creationTime}</div>
            <div>${this.doneTime}</div>
          </div>
          <button class="remove">
          <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px"><path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"/></svg>
          </svg>
        </button>
      </div>`;
      const elInput = elDiv.querySelector('.input-field');
      const elChekbox = elDiv.querySelector('.custom-chekbox');

      elInput.addEventListener('input', ({ target }) => {
        this.value = target.value;
      });

      elInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.type = 'text';
          const nodeOpenList = globalState.createOpenList();
          const nodeDoneList = globalState.createDoneList();
          render('renderOpenAndDoneList', { nodeOpenList, nodeDoneList });
        }
      });

      elChekbox.addEventListener('click', () => {
        const { timeToString, dateNow } = getCurrentTime();
        this.chekbox = !this.chekbox;
        this.doneTime = this.chekbox ? timeToString : null;
        this.doneDateNow = dateNow;
        const nodeOpenList = globalState.createOpenList();
        const nodeDoneList = globalState.createDoneList();
        render('renderOpenAndDoneList', { nodeOpenList, nodeDoneList });
      });
      return elDiv;
    }

    if (this.type === 'text') {
      elDiv.innerHTML = ` 
      <div class="task py-2 px-2 my-4" id="taskid-${this.id}">
          <input class="custom-chekbox" type="checkbox" name="taskid" ${this.chekbox ? 'checked' : null}>
          <p id="text-task-${this.id}">${this.value}</p>
          <label for="taskid-${this.id}">
          </label>
          <div class="time">
            <p>${this.creationTime}</p>
            <div><b>${this.doneTime}</b></div>
          </div>
          <button class="remove">
          <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px"><path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"/></svg>
            </svg>
          </button>
      </div>`;

      const elChekbox = elDiv.querySelector('.custom-chekbox');
      const elText = elDiv.querySelector(`#text-task-${this.id}`);

      elText.addEventListener('dblclick', () => {
        this.type = 'input';
        render('renderdblclick', this);
      });
      elChekbox.addEventListener('click', () => {
        this.chekbox = !this.chekbox;
        const { timeToString, dateNow } = getCurrentTime();
        this.doneTime = this.chekbox ? timeToString : '';
        this.doneDateNow = dateNow;
        if (!document.getElementById('open-tasks-container')) {
          const elOpenTasksContainer = document.createElement('div');
          elOpenTasksContainer.setAttribute('id', 'open-tasks-container');
          const elFilter = filter('Open');
          const elClearList = clearList('Open');
          render('addOpenListContainer', [elFilter, elOpenTasksContainer, elClearList]);
        }
        if (!document.getElementById('done-tasks-container')) {
          const elDoneTasksContainer = document.createElement('div');
          elDoneTasksContainer.setAttribute('id', 'done-tasks-container');
          const elFilter = filter('Done');
          const elClearList = clearList('Done');
          render('addDoneListContainer', [elFilter, elDoneTasksContainer, elClearList]);
        }
        const nodeOpenList = globalState.createOpenList();
        const nodeDoneList = globalState.createDoneList();
        render('renderOpenAndDoneList', { nodeOpenList, nodeDoneList });
        if (globalState.createOpenList().length === 0) {
          render('removeOpenTasks');
        }
        if (globalState.createDoneList().length === 0) {
          render('removeDoneTasks');
        }
      });
      return elDiv;
    }

    return null;
  }
}
export default Task;
