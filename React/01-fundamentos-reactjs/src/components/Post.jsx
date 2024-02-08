import Comment from './Comment'
import styles from './Post.module.css'

export function Post(){
    return(
        <article className={ styles.post }>
            <header>
                <div className={ styles.author }>
                    <img 
                        src="https://media-gru2-2.cdn.whatsapp.net/v/t61.24694-24/390623814_630588455728124_7763289264642281801_n.jpg?ccb=11-4&oh=01_AdSLwDji9Sbk-E0YY-grbdTnE3VoN7RCLU1li4awt_hK4w&oe=65D13234&_nc_sid=e6ed6c&_nc_cat=100" 
                    />

                    <div className={ styles.authorInfo }>
                        <strong>Carlinho das Entregas</strong>
                        <span>Web Developer</span>
                    </div>
                </div>

                <time  title="07 de Fevereiro às 21:46h" dateTime="2023-02-07 21:46">
                    Publicado há 1h
                </time>
            </header>

            {/* Conteudo */}
            <div className={ styles.content }>
                <p>Entreguei uma entrega dos entregados para o entregado</p>
                <p><a href="#">#Entreguei</a></p>
            </div>

            <form className={ styles.commentForm }>
                <strong>Deixe seu feedback</strong>

                <textarea
                    placeholder='Deixe um comentário'
                />

                <footer>
                    <button type="submit">Publicar</button>
                </footer>
            </form>

            <div className={ styles.commentList }>
                <Comment/>
                <Comment/>
                <Comment/>
            </div>
        </article>
    )
}