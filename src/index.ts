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

form?.addEventListener("submit", e=> {
  e.preventDefault()

// typescript warns us input could be null, so we optional chain with a ? to confirm its not null before continuing with our code
  if (input?.value == "" || input?.value == null) return

  // typescript will know that newTask is a type of Task since it has all the same properties
  const newTask = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }

  addListItem(newTask)

}) 

const myInput = input?.value

console.log("myInput =", myInput)

// declaring our task variable as type task which we initiated at beginning of file
function addListItem(task: Task) {}