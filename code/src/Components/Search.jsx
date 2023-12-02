import React, { useContext, useState } from 'react'
import styles from './Search.module.css'
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore'
import { db } from '../Firebase'
import { AuthContext } from '../Context/AuthContext'

const Search = () => {

  const [username, setUsername] = useState ('')
  const [user, setUser] = useState (null)
  const [err, setErr] = useState (false)
  const { currentUser } = useContext (AuthContext)

  const handleSearch = async () => {
    const q = query (
      collection (db, 'users'),
      where ('displayName', '==', username),
    )
    try {
      const querySnapshot = await getDocs (q)
      querySnapshot.forEach ((doc) => {
        setUser (doc.data ())
      })
    } catch (err) {
      setErr (true)
    }
  }

  const handleKey = (e) => {
    e.code === 'Enter' && 'Próximo' && handleSearch ()
  }

  const handleSelect = async () => {
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
    try {
      const res = await getDoc (doc (db, 'chats', combinedId))
      if (!res.exists ()) {
        await setDoc (doc (db, 'chats', combinedId), { messages: [] })
        await updateDoc (doc (db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo'] : {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + '.date'] : serverTimestamp (),
        })
        await updateDoc (doc (db, 'userChats', user.uid), {
          [combinedId + '.userInfo'] : {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date'] : serverTimestamp (),
        })
      }
    } catch (err) {}
    setUser (null)
    setUsername('')
  }

  return (
    <article className={styles.search}>

      <section className={styles.searchForm}>
        <input
          title='Pesquisar contato'
          type='text'
          placeholder='Pesquisar...'
          onKeyDown={handleKey}
          onChange={(e) => setUsername (e.target.value)}
          value={username}
        />
      </section>

      {err &&
        <span className='notif'>
          Usuário não encontrado!
        </span>
      }

      {user && (
        <section
          className={styles.userChat}
          onClick={handleSelect}
        >
          <img
            title={user.displayName}
            src={user.photoURL}
            alt={user.displayName}
          />
          <h5>{user.displayName}</h5>
        </section>
      )}

    </article>
  )
}

export default Search
