interface Task {
  title: string,
  start: string,
  end: string,
  description: string,
  asignee: string,
}

interface Board {
  name: string,
  tasks: Array<Task>,
}

export { Task, Board };