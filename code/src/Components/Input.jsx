import React, { useContext, useState } from 'react'
import styles from './Input.module.css'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../Firebase'
import { AuthContext } from '../Context/AuthContext'
import { ChatContext } from '../Context/ChatContext'
import { v4 as uuid } from 'uuid'

const Input = () => {

  const [text, setText] = useState ('')
  const [img, setImg] = useState (null)
  const { currentUser } = useContext (AuthContext)
  const { data } = useContext (ChatContext)

  const handleSend = async () => {
    if (img) {
      const storageRef = ref (storage, uuid ())
      const uploadTask = uploadBytesResumable (storageRef, img)
      uploadTask.on (
        (error) => {},
        () => {
          getDownloadURL (uploadTask.snapshot.ref).then (async (downloadURL) => {
            await updateDoc (doc (db, 'chats', data.chatId), {
              messages: arrayUnion ({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now (),
                img: downloadURL,
              })
            })
          })
        }
      )
    } else {
      await updateDoc (doc(db, 'chats', data.chatId), {
        messages: arrayUnion ({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now (),
        })
      })
    }
    await updateDoc (doc (db, 'userChats', currentUser.uid), {
      [data.chatId + '.lastMessage'] : {
        text,
      },
      [data.chatId + '.date'] : serverTimestamp (),
    })
    await updateDoc (doc (db, 'userChats', data.user.uid), {
      [data.chatId + '.lastMessage'] : {
        text,
      },
      [data.chatId + '.date'] : serverTimestamp (),
    })
    setText ('')
    setImg (null)
  }

  return (
    <article className={styles.input}>

      <input
        title='Envie sua mensagem'
        type='text'
        placeholder='Mensagem...'
        className={styles.text}
        onChange={(e) => setText (e.target.value)}
        value={text}
      />

      <button
        title='Enviar'
        className={styles.btn}
        onClick={handleSend}
      >
        Enviar
      </button>

    </article>
  )
}

export default Input
