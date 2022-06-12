import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

function OAuth() {
   const navigate = useNavigate()
   const location = useLocation()

   const onGoogleClick = async () => {
      try {
         const auth = getAuth()
         const provider = new GoogleAuthProvider()
         const result = await signInWithPopup(auth, provider)
         const user = result.user

         // check for user in the database
         const docRef = doc(db, 'users', user.uid)
         const docSnap = await getDoc(docRef)

         // if user doesn't eist create user
         if (!docSnap.exists()) {
            await setDoc(doc(db, 'users', user.uid), {
               name: user.displayName,
               email: user.email,
               timestamp: serverTimestamp(),
            })
         }

         navigate('/')
      } catch (error) {
         toast.error('Could not autherize with google')
      }
   }

   return (
      <div className='socialLogin'>
         <p>
            Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with{' '}
            <button className='socialIconDiv' onClick={onGoogleClick}>
               <img className='socialIconImg' src={googleIcon} alt='google' />
            </button>
         </p>
      </div>
   )
}

export default OAuth
