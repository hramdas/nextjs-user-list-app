import { useRouter } from 'next/router'
export const getStaticPaths = async ()=>{
    const res = await fetch("https://jsonplaceholder.typicode.com/users")
    const users = await res.json()
    const paths = users.map((currUser)=>{
        return {
            params : {
                id : currUser.id.toString()
            }
        }
    })

    return {
        paths, fallback : false
    }
}
import styles from '../styles/user.module.css'


export const getStaticProps = async (context)=>{
    const id = context.params.id
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    const user = await res.json()
    return{
      props : {
        user,
      }
    }
  }


const UserData = ({user}) => {
    const router = useRouter()
    return (
        <div className={styles.maindiv}>
            <div className={styles.user}>
                <h1>{user.name}</h1>
                <span i >
                    <p>Email : <b>{user.email}</b></p>
                    <p>Phone : <b>{user.phone}</b></p>
                </span>
                <span>
                    <p>Company :<b>{user.company.name}</b></p>
                </span>
                <span>
                    <p>Address :<b>{user.address.street +" "+ user.address.city}</b></p>
                </span>
            </div>
            <br/>
         <button  onClick={ ()=>router.push('/') } className='back'>Back to Home</button>
        </div>
    );
}

export default UserData
