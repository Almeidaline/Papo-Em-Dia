import React, { useContext, useEffect, useState } from 'react'
import styles from './ChatList.module.css'
import { doc, onSnapshot } from 'firebase/firestore'
import { AuthContext } from '../Context/AuthContext'
import { ChatContext } from '../Context/ChatContext'
import { db } from '../Firebase'

const ChatList = () => {

  const [chat, setChat] = useState ([])
  const { currentUser } = useContext (AuthContext)
  const { dispatch } = useContext (ChatContext)

  useEffect (() => {
    const getChats = () => {
      const unsub = onSnapshot (doc (db, 'userChats', currentUser.uid), (doc) => {
        setChat (doc.data ())
      })
      return () => {
        unsub ()
      }
    }
    currentUser.uid && getChats ()
  }, [currentUser.uid])

  const handleSelect = (u) => {
    dispatch ({ type: 'CHANGE_USER', payload: u })
  }

  return (
    <article className={styles.chatList}>

      {Object.entries(chat)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <section
          className={styles.userChat}
          key={chat[0]}
          onClick={() => handleSelect (chat[1].userInfo)}
        >
          <img
            title={chat[1].userInfo.displayName}
            src={chat[1].userInfo.photoURL}
            alt={chat[1].userInfo.displayName}
          />
          <span className={styles.info}>
            <h5>{chat[1].userInfo.displayName}</h5>
            <p>{chat[1].lastMessage?.text}</p>
          </span>
        </section>
      ))}

    </article>
  )
}

export default ChatList
