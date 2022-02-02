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

  createTasksListSortedByDate(type) {
    const sortedList = this.taskList
      .filter((item) => (type === 'open-list' ? !item.chekbox : !!item.chekbox))
      .sort((a, b) => {
        if (type === 'open-list') {
          if (a.dateNow < b.dateNow) {
            return -1;
          }
          if (a.dateNow > b.dateNow) {
            return 1;
          }
          return 0;
        }
        if (a.doneDateNow < b.doneDateNow) {
          return -1;
        }
        if (a.doneDateNow > b.doneDateNow) {
          return 1;
        }
        return 0;
      });
    const node = sortedList.map((item) => item.buildTask());
    return node;
  }

  createTasksListSortedByRcords(type) {
    const sortedList = this.taskList
      .filter((item) => (type === 'open-list' ? !item.chekbox : !!item.chekbox))
      .sort((a, b) => {
        if (a.value < b.value) {
          return -1;
        }
        if (a.value > b.value) {
          return 1;
        }
        return 0;
      });

    const node = sortedList.map((item) => item.buildTask());
    return node;
  }

  clearDesiredList(type) {
    if (type === 'Open') {
      const remainingTasks = this.taskList.filter((item) => item.chekbox);
      this.taskList = remainingTasks;
    } else {
      const remainingTasks = this.taskList.filter((item) => !item.chekbox);
      this.taskList = remainingTasks;
    }
  }

  createDoneList() {
    const openTasks = this.taskList.filter((item) => !!item.chekbox);
    const node = openTasks.map((item) => item.buildTask());
    return node;
  }
}

const state = new GlobalState();
export default state;
