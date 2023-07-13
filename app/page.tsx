import Link from 'next/link'
import styles from './home.module.scss'

export default function Home() {
  return (
    <main>
      <h1 className={styles.heading}>Matt Provost</h1>
      <section className={styles.links}>
        <Link href="/projects" className={styles.link}>Projects</Link>
        <Link href="/contact" className={styles.link}>Contact</Link>
      </section>
    </main>
  )
}
