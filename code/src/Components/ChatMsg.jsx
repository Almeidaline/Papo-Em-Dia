import React, { useContext, useEffect, useState } from 'react'
import styles from './ChatMsg.module.css'
import Msg from './Msg'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../Firebase'
import { ChatContext } from '../Context/ChatContext'

const ChatMsg = () => {

  const [messages, setMessages] = useState ([])
  const { data } = useContext (ChatContext)

  useEffect (() => {
    const unSub = onSnapshot (doc (db, 'chats', data.chatId), (doc) => {
      doc.exists () && setMessages (doc.data().messages)
    })
    return () => {
      unSub ()
    }
  }, [data.chatId])
  console.log (messages)

  return (
    <article className={styles.chatMsg}>
      <section className={styles.messages}>
      
        {messages.map ((m) => (
          <Msg message={m} key={m.id} />
        ))}

      </section>
    </article>
  )
}

export default ChatMsg
