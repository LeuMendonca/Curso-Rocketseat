import { format , formatDistanceToNow } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"

import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react"

interface Author {
    avatarUrl: string,
    name: string,
    role: string
}

interface Content {
    type: 'paragraph' | "link",
    content: string
}

export interface PostType {
    id: number;
    author: Author;
    publishedAt: Date ;
    content: Content[] ;
}

interface PostProps{
    post: PostType;
}

export function Post({ post }: PostProps){

    const [ comments , setComments ] = useState([])
    const [ newCommentText , setNewCommentText ] = useState('')

    const publishedDateFormatted = format(post.publishedAt , "d 'de' LLLL 'às' HH:mm'h'",{
        locale : ptBR,
    })

    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt , {
        locale: ptBR,
        addSuffix: true
    })

    function handleSetNewCommentText( event: ChangeEvent<HTMLTextAreaElement> ){
        event.preventDefault()
        event.target.setCustomValidity("")

        setNewCommentText( event.target.value )
    }

    function handleCreateNewComment( event: FormEvent ){
        event.preventDefault();
        
        setComments( [ ...comments , newCommentText ] )
        
        setNewCommentText("")
    }

    function handleNewCommentInvalid( event: InvalidEvent<HTMLTextAreaElement> ){
        event.target.setCustomValidity("Esse campo é obrigatório.")
    }


    function deleteComment( comment:string ){

        const commentsWithoutDeletedOne = comments.filter( ( item ) => {
            return comment != item
        })

        setComments( commentsWithoutDeletedOne )
    }

    const isNewCommentEmpty = newCommentText.length === 0

    return(
        <article className={ styles.post }>
            <header>
                <div className={ styles.author }>
                    <Avatar 
                        src={post.author.avatarUrl} 
                    />

                    <div className={ styles.authorInfo }>
                        <strong>{ post.author.name }</strong>
                        <span>{ post.author.role }</span>
                    </div>
                </div>

                <time  title={ publishedDateFormatted } dateTime={ post.publishedAt.toISOString() }>
                    { publishedDateRelativeToNow }
                </time>
            </header>

            {/* Conteudo */}
            <div className={ styles.content }>
                { post.content.map( ( item ) => {
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
                    onChange={ handleSetNewCommentText }
                    value={ newCommentText }
                    onInvalid={ handleNewCommentInvalid }
                    placeholder='Deixe um comentário'
                    required
                />

                <footer>
                    <button type="submit"
                        disabled={ isNewCommentEmpty }>
                        Publicar
                    </button>
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