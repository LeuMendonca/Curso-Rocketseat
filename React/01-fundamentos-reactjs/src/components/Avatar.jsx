import styles from './Avatar.module.css'

export default function Avatar({ src , hasBorder = true }) {
  return (
    <div>
        <img 
            src={ src }
            className={ hasBorder ? styles.avatarWithBorder : styles.avatar  }
        />
    </div>
  )
}
