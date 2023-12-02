import React from 'react'
import styles from './Home.module.css'
import Header from '../Components/Header'
import Contact from '../Components/Contact'
import Chat from '../Components/Chat'

const Home = () => {

  return (
    <main className={styles.home}>

      <section className={styles.homeHeader}>
        <Header />
      </section>

      <div className={styles.homeMain}>

        <section className={styles.homeContact}>
          <Contact />
        </section>

        <section className={styles.homeChat}>
          <Chat />
        </section>

      </div>

    </main>
  )
}

export default Home
