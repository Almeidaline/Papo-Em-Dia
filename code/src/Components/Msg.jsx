import React, { useContext, useEffect, useRef } from 'react'
import styles from './Msg.module.css'
import { AuthContext } from '../Context/AuthContext'
import { ChatContext } from '../Context/ChatContext'

const Msg = ({ message }) => {

  const { currentUser } = useContext (AuthContext)
  const { data } = useContext (ChatContext)

  const ref = useRef ()

  useEffect (() => {
    ref.current?.scrollIntoView ({ behavior: 'smooth' })
  }, [message])

  return (
    <article
      ref={ref}
      className={`${styles.msgA} ${message.senderId === currentUser.uid && `${styles.msgB}`}`}
    >
      <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt='' />
      <section className={styles.content}>
        <p>{message.text}</p>
      </section>
    </article>
  )
}

export default Msg
