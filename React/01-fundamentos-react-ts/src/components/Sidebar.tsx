import { Avatar } from './Avatar'
import styles from './Sidebar.module.css'
import { PencilLine } from 'phosphor-react'

export function Sidebar() {
    return (
        <aside className={ styles.sidebar }>
            <img 
                className={ styles.cover }
                src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" 
            />

            <div className={ styles.profile }>
                <Avatar   
                    src={"https://media-gru1-2.cdn.whatsapp.net/v/t61.24694-24/411751611_692048739708059_7477748221727545253_n.jpg?ccb=11-4&oh=01_AdT23GSGikLVOwZOziuRTId9jeMfwNUmNM_pVFBU8Iz4uQ&oe=65D1D13A&_nc_sid=e6ed6c&_nc_cat=108"}/>

                <strong>Leonardo Mendonça</strong>
                <span>Web Developer</span>
            </div>

            <footer>
                <a href="#">
                    <PencilLine size={ 20 }/>
                    Editar seu perfil
                </a>
            </footer>
        </aside>
    )
}