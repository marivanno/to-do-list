import globalState from '../GlobalState';
import render from '../render';
import { getCurrentTime } from '../utilits';
import filter from './filter';
import clearList from './clear-list';

class Task {
  constructor(id, value, creationTime = getCurrentTime()) {
    this.id = id;
    this.value = value;
    this.chekbox = false;
    this.creationTime = creationTime;
    this.doneTime = '';
    this.type = 'text';
  }

  getId() {
    return this.id;
  }

  getData() {
    return {
      id: this.id,
      value: this.value,
      chekbox: this.chekbox,
      creationTime: this.creationTime,
      doneTime: this.doneTime,
      type: this.type,
    };
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
          <div>
            <div>${this.creationTime}</div>
            <div>${this.doneTime}</div>
          </div>
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
        this.doneTime = getCurrentTime();
        this.chekbox = !this.chekbox;
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
          <div>
            <p>${this.creationTime}</p>
            <div><b>${this.doneTime}</b></div>
          </div>
      </div>`;

      const elChekbox = elDiv.querySelector('.custom-chekbox');
      const elText = elDiv.querySelector(`#text-task-${this.id}`);

      elText.addEventListener('dblclick', () => {
        this.type = 'input';
        render('renderdblclick', this);
      });
      elChekbox.addEventListener('click', () => {
        this.chekbox = !this.chekbox;
        this.doneTime = getCurrentTime();
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
