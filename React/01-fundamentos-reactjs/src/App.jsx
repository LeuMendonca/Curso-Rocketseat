import { Post } from './components/Post'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'

import './global.css'
import styles from './App.module.css'

export function App() {

  return (
    <>

      <Header/>

      <div className={ styles.wrapper }>
        <Sidebar/>

        <main>
          <Post 
            author="Leo Mendonça" 
            content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit itaque suscipit eaque praesentium voluptates necessitatibus doloremque, ipsa tenetur aliquid vero explicabo. Vero nulla distinctio repellendus maiores voluptatibus minus aperiam suscipit?"
          />

          <Post 
            author="Leo Mendonça" 
            content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit itaque suscipit eaque praesentium voluptates necessitatibus doloremque, ipsa tenetur aliquid vero explicabo. Vero nulla distinctio repellendus maiores voluptatibus minus aperiam suscipit?"
          />
        </main>
      </div>
    </>
  )
}


