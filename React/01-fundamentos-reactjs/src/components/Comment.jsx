import Avatar from './Avatar'
import styles from './Comment.module.css'
import { ThumbsUp, Trash } from 'phosphor-react'

export default function Comment({ content , onDeleteComment }) {

    function handleDeleteComment(){
        onDeleteComment( content )
    }

  return (
    <div className={ styles.comment }>
        <Avatar 
            hasBorder={ false }
            src="https://media-gru2-2.cdn.whatsapp.net/v/t61.24694-24/300050758_8661502643875951_6681933109179691247_n.jpg?ccb=11-4&oh=01_AdR7m2ixTe6QkbsHodkq7h6GFjfcB69z7IfEHeVlfoaR1g&oe=65CFF6A9&_nc_sid=e6ed6c&_nc_cat=109"
        />

        <div className={ styles.commentBox }>
            <div className={ styles.commentContent }>
                <header>
                    <div className={ styles.authorAndTime}>
                        <strong>Carneirão</strong>
                        <time title='07 de Fevereiro às 19:35' dateTime='2024-02-07 19:35'>Cerca de 3h</time>
                    </div>

                    <button onClick={ handleDeleteComment } title='Deletar comentário'>
                        <Trash size={ 24 }/>
                    </button>
                </header>
                386067
                <p>{ content }</p>
            </div>

            <footer>
                <button>
                    <ThumbsUp/>
                    Aplaudir <span>20</span>
                </button>
            </footer>
        </div>
    </div>
  )
}
