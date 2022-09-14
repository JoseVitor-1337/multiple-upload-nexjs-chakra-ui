import { createContext } from 'react'

interface IDropzoneContext {
  acceptFiles?: string[]
  maxSize?: number
  dispatchInputClick: () => void
  dispatchFileUpload: (file: FileList) => Promise<void>
}

const TasksContext = createContext<IDropzoneContext>({
  dispatchInputClick: () => {
    console.log('dispatchInputClick')
  },
  dispatchFileUpload: async () => {
    console.log('dispatchFileUpload')
  },
})

export default TasksContext
