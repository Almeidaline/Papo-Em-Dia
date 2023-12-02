import React from 'react'
import styles from './Contact.module.css'
import Search from './Search'
import ChatList from './ChatList'

const Contact = () => {

  return (
    <main className={styles.contact}>
      <Search />
      <ChatList />
    </main>
  )
}

export default Contact
