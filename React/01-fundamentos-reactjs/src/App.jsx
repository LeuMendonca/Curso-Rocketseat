import Post from './Post'
import { Header } from './components/Header'

import './global.css'

export function App() {

  return (
    <>

      <Header/>

      <h1>Hello Word</h1>
      <Post 
        author="Leo Mendonça" 
        content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit itaque suscipit eaque praesentium voluptates necessitatibus doloremque, ipsa tenetur aliquid vero explicabo. Vero nulla distinctio repellendus maiores voluptatibus minus aperiam suscipit?"
      />
    </>
  )
}


