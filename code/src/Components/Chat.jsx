import React, { useContext } from 'react'
import styles from './Chat.module.css'
import { ChatContext } from '../Context/ChatContext'
import ChatMsg from './ChatMsg'
import Input from './Input'

const Chat = () => {

  const { data } = useContext (ChatContext)

  return (
    <article className={styles.chat}>

      <section className={styles.name}>
        <h5>{data.user?.displayName}</h5>
      </section>

      <ChatMsg />
      <Input />

    </article>
  )
}

export default Chat
