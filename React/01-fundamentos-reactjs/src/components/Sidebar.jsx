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
                <img 
                    className={ styles.avatar }
                    src="https://pps.whatsapp.net/v/t61.24694-24/411751611_692048739708059_7477748221727545253_n.jpg?ccb=11-4&oh=01_AdSz8PRVNhdhobqy3r0GNHGEAyGE-TIikuVUUo5uG5qMtw&oe=65D07FBA&_nc_sid=e6ed6c&_nc_cat=108"
                />

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