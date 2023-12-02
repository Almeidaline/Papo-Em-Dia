import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from './Register.module.css'
import { auth, db, storage } from '../Firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { MdOutlineAddAPhoto } from 'react-icons/md'
import Logo from '../Assets/logo.png'

const Register = () => {

  const [err, setErr] = useState (false)
  const [loading, setLoading] = useState (false)
  const navigate = useNavigate ()

  const handleSubmit = async (e) => {
    setLoading (true)
    e.preventDefault ()
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]

    try {
      const res = await createUserWithEmailAndPassword (auth, email, password)
      const date = new Date ().getTime ()
      const storageRef = ref (storage, `${displayName + date}`)

      await uploadBytesResumable (storageRef, file).then (() => {
        getDownloadURL (storageRef).then (async (downloadURL) => {

          try {
            await updateProfile (res.user, {
              displayName,
              photoURL: downloadURL,
            })
            await setDoc (doc (db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            })
            await setDoc (doc (db, 'userChats', res.user.uid), {})
            navigate ('/')
          } catch (err) {
            console.log (err)
            setErr (true)
            setLoading (false)
          }

        })
      })

    } catch (err) {
      setErr (true)
      setLoading (false)
    }
  }

  return (

    <main className={styles.register}>
      <article className={styles.container}>

        <section className={styles.logo}>
          <img title='Papo Em Dia' src={Logo} alt='Papo Em Dia' />
        </section>
        <h5>Cadastro</h5>

        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Usuário:' required />
          <input type='email' placeholder='Email:' required />
          <input type='password' placeholder='Senha:' required />
          <section className={styles.file}>
            <label htmlFor='file'>
              <MdOutlineAddAPhoto className={styles.icon} />
              <p>Selecione uma foto:</p>
            </label>
            <input type='file' name='file' id='file' required />
          </section>
          <button
            title='Cadastrar'
            className={styles.btn}
            disabled={loading}
          >
            Cadastre-se
          </button>
          {loading && <span className='notif'>Aguarde, carregando...</span>}
          {err && <span className='notif'>Algo deu errado!</span>}
        </form>

        <p>
          Você tem uma conta?
          <Link
            to='/login'
            title='Cadastrar'
            className={styles.single}
          >
            Login
          </Link>
        </p>

      </article>
    </main>
  )
}

export default Register
