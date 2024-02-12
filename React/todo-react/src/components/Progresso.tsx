import styles from './Progresso.module.css'

export function Progresso() {
  return (
    <div className={ styles.containerProgresso }>
        <p>Completados: 10</p>
        <p>Não completados: 0</p>
    </div>
  )
}
