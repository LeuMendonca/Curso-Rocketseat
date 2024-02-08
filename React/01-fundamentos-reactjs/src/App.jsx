import { Post } from './components/Post'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'

import './global.css'
import styles from './App.module.css'

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://media-gru1-2.cdn.whatsapp.net/v/t61.24694-24/413142660_927318665717817_2899490658852003023_n.jpg?ccb=11-4&oh=01_AdQspfwQNgbiY_mG_nRfyMLJYyGPqrzKR7-UZDfz8d5e_A&oe=65D1D654&_nc_sid=e6ed6c&_nc_cat=101",
      name: "Ana Luiza",
      role: "Faz nada da vida",
    },
    content: [
      {type: "paragraph" , content: "Muito bom a entrega do Carlinho"}
    ],
    publishedAt: new Date('2024-02-08 10:49:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://media-gru1-2.cdn.whatsapp.net/v/t61.24694-24/412563063_356109500486477_2320676904012910685_n.jpg?ccb=11-4&oh=01_AdSmbYgKJ1PnRHIrrSLjdJEQv7KPJGjgpggMe31OD7cnjg&oe=65D1DC30&_nc_sid=e6ed6c&_nc_cat=104",
      name: "WebCel",
      role: "CEO WebCel",
    },
    content: [
      {type: "paragraph" , content: "Carlinhos , jogou a mercadora no lixo..."},
      {type: "link" , content: "www.ekoos.com.br"}
    ],
    publishedAt: new Date('2024-02-07 07:33:10')
  }
]

export function App() {

  return (
    <>

      <Header/>

      <div className={ styles.wrapper }>
        <Sidebar/>

        <main>
          { posts.map( ( post ) => (
            <Post 
              key={ post.id }
              author={ post.author }
              content={ post.content }
              publishedAt={ post.publishedAt }
            />
          ))}
        </main>
      </div>
    </>
  )
}


