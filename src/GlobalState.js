class GlobalState {
  constructor() {
    this.taskList = [];
    this.uniqId = 0;
  }

  getId() {
    return this.uniqId;
  }

  nextId() {
    this.uniqId += 1;
  }

  addNewTask(task) {
    this.taskList = [...this.taskList, task];
  }

  createOpenList() {
    const openTasks = this.taskList.filter((item) => !item.chekbox);
    const node = openTasks.map((item) => item.buildTask());
    return node;
  }

  createDoneList() {
    const openTasks = this.taskList.filter((item) => !!item.chekbox);
    const node = openTasks.map((item) => item.buildTask());
    return node;
  }
}

const state = new GlobalState();
export default state;
