import { format , formatDistanceToNow } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"

import Avatar from './Avatar'
import Comment from './Comment'
import styles from './Post.module.css'
import { useState } from "react"



export function Post({ author , content , publishedAt }){

    const [ comments , setComments ] = useState([ ])
    const [ newCommentText , setNewCommentText ] = useState('')

    const publishedDateFormatted = format(publishedAt , "d 'de' LLLL 'às' HH:mm'h'",{
        locale: ptBR,
    })

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt , {
        locale: ptBR,
        addSuffix: true
    })

    function handleCreateNewComment( e ){
        e.preventDefault();
        
        setComments( [ ...comments , newCommentText ] )
        
        setNewCommentText("")
    }

    function deleteComment( comment ){
        console.log(comment)
    }

    return(
        <article className={ styles.post }>
            <header>
                <div className={ styles.author }>
                    <Avatar 
                        src={author.avatarUrl} 
                    />

                    <div className={ styles.authorInfo }>
                        <strong>{ author.name }</strong>
                        <span>{ author.role }</span>
                    </div>
                </div>

                <time  title={ publishedDateFormatted } dateTime={ publishedAt.toISOString() }>
                    { publishedDateRelativeToNow }
                </time>
            </header>

            {/* Conteudo */}
            <div className={ styles.content }>
                { content.map( ( item ) => {
                    if( item.type ==="paragraph"){
                        return <p key={ item.content }>{ item.content }</p>
                    }else if( item.type === "link"){
                        return <p key={ item.content }><a href="">{ item.content }</a></p>
                    }
                })}
            </div>

            <form onSubmit={ ( e ) => handleCreateNewComment( e ) } className={ styles.commentForm }>
                <strong>Deixe seu feedback</strong>

                <textarea
                    onChange={ ( e ) => setNewCommentText( e.target.value )}
                    value={ newCommentText }
                    placeholder='Deixe um comentário'
                />

                <footer>
                    <button type="submit">Publicar</button>
                </footer>
            </form>

            <div className={ styles.commentList }>
                { comments.map( item => {
                    return <Comment onDeleteComment={ deleteComment } key={ item } content={ item }/>
                })}
            </div>
        </article>
    )
}