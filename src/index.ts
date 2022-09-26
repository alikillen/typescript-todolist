import {v4 as uuidV4 } from "uuid"
// not every node module has types built in - they usually have a separate library you can install to work with TS
// so we run npm i --save-dev @types/uuid to check if someone made types for this library
// if there is a library without types, you need to write them or deal with the errors in TS

console.log(uuidV4())

console.log('hi')

type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.querySelector("#new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title")

// creating an array of type Task to store in local memory
const tasks: Task[] = []

form?.addEventListener("submit", e=> {
  e.preventDefault()

// typescript warns us input could be null, so we optional chain with a ? to confirm its not null before continuing with our code
  if (input?.value == "" || input?.value == null) return

  // typescript will know that newTask is a type of Task since it has all the same properties
  // but its nice to declare specific types for your variables if you have them
  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }

  // pushing new task into overall task list to save in local storage
  tasks.push(newTask)

  // when we hover over addListItem we can see what we expect to be returned from this function (void if it is not returning anything)
  addListItem(newTask)

  // when we press enter it will set input back to empty string
  input.value = ""

}) 

const myInput = input?.value

console.log("myInput =", myInput)

// declaring our task variable as type task which we initiated at beginning of file
// we can also say addListItem(task: Task): boolean, which would define that we are returning a boolean. if we then tried to return a string/int, it would error. smart!
function addListItem(task: Task) {
  const item = document.createElement("li")
  // typescript knows createElement is an li type since we passed one in. handy!

  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    console.log(tasks)
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed

  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}