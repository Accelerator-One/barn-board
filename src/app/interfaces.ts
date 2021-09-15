interface Task {
  title: string,
  date: number,
  description: string,
  creator: string,
  labels: Array<string>
}

interface Board {
  name: string,
  tasks: Array<Task>,
}

export { Task, Board };