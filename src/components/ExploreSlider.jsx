import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config'
import Spinner from './Spinner'
import Slider from 'react-slick'

function ExploreSlider() {
   const [loading, setLoading] = useState(true)
   const [listings, setListings] = useState(null)

   const navigate = useNavigate()

   useEffect(() => {
      const fetchListings = async () => {
         const listingsRef = collection(db, 'listings')
         const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
         const querySnap = await getDocs(q)

         let listings = []

         querySnap.forEach((doc) => {
            return listings.push({
               id: doc.id,
               data: doc.data(),
            })
         })

         setListings(listings)
         setLoading(false)
      }

      fetchListings()
   }, [])

   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
   }

   if (loading) {
      return <Spinner />
   }

   if (listings.length === 0) {
      return <></>
   }

   return (
      listings && (
         <>
            <p className='exploreHeading'>Recommended</p>

            <Slider {...settings}>
               {listings.map(({ data, id }) => (
                  <div
                     key={id}
                     onClick={() => navigate(`/category/${data.type}/${id}`)}
                  >
                     <div>
                        <img
                           src={data.imgUrls[0]}
                           alt=''
                           style={{
                              maxWidth: '100%',
                              maxHeight: '500px',
                              height: 'auto',
                              display: 'block',
                              marginLeft: 'auto',
                              marginRight: 'auto',
                              objectFit: 'cover',
                           }}
                        />
                        <p className=''>{data.name}</p>
                        <p sty>
                           ${data.discountedPrice ?? data.regularPrice}{' '}
                           {data.type === 'rent' && '/ month'}
                        </p>
                     </div>
                  </div>
               ))}
            </Slider>
         </>
      )
   )
}

export default ExploreSlider
