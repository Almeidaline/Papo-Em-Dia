import React, { useContext } from 'react'
import styles from './Header.module.css'
import { auth } from '../Firebase'
import { signOut } from 'firebase/auth'
import { AuthContext } from '../Context/AuthContext'
import Logo from '../Assets/logo.png'
import { MdLogout } from 'react-icons/md'

const Header = () => {

  const {currentUser} = useContext (AuthContext)

  return (

    <header className={styles.header}>

      <article className={styles.user}>
        <section className={styles.info}>
          <span className={styles.image}>
            <img
              src={currentUser.photoURL}
              title={currentUser.displayName}
              alt={currentUser.displayName}
            />
          </span>
          <h3>{currentUser.displayName}</h3>
        </section>

        <span
          title='Sair do Aplicativo'
          className={styles.exit}
          onClick={() => signOut (auth)}
        >
          <MdLogout className={styles.icon} />
        </span>        
      </article>

      <img
        title='Papo Em Dia'
        src={Logo}
        className={styles.logo}
        alt='Papo Em Dia'
      />

    </header>
  )
}

export default Header
