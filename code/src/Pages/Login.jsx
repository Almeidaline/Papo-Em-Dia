import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from './Login.module.css'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firebase'
import Logo from '../Assets/logo.png'

const Login = () => {

  const [err, setErr] = useState (false)
  const navigate = useNavigate ()

  const handleSubmit = async (e) => {
    e.preventDefault ()
    const email = e.target[0].value
    const password = e.target[1].value

    try {
      await signInWithEmailAndPassword (auth, email, password)
      navigate('/')
    } catch (err) {
      setErr (true)
    }
  }

  return (
    <main className={styles.login}>
      <article className={styles.container}>

        <section className={styles.logo}>
          <img title='Papo Em Dia' src={Logo} alt='Papo Em Dia' />
        </section>
        <h5>Login</h5>

        <form onSubmit={handleSubmit}>
          <input type='email' placeholder='Email:' required />
          <input type='password' placeholder='Senha:' required />
          <button title='Entrar' className={styles.btn}>Entrar</button>
          {err && <span className='notif'>Algo deu errado!</span>}
        </form>

        <p>
          Ainda não tem uma conta?
          <Link
            to='/register'
            title='Cadastrar'
            className={styles.single}
          >
            Cadastrar
          </Link>
        </p>

      </article>
    </main>
  )
}

export default Login
