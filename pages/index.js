import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export const getStaticProps = async ()=>{
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
  const users = await res.json()
  return{
    props : {
      users,
    }
  }
}

export default function Home({users}) {
  return (
    <div className={styles.container}>

        <h1 className={styles.title}>Users List</h1>
      
        <div className={styles.grid}>
          {users.map((user)=>
              (
                <div className={styles.card} key={user.id}>
                  <h2>{user.name}</h2>
                  <Link href={`/${user.id}`}><button className={styles.button}>View Details</button></Link>
                </div>
                )
            )}
        </div>

    </div>
  )
}
