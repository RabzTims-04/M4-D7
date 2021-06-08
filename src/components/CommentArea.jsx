import { useState, useEffect, useRef } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

const  CommentArea =({asin})=> {

    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
   /*  const prevProps = useRef({asin}).current */


    useEffect(()=>{
     /*    if (prevProps.asin !== asin) {  */
            setIsLoading(true) 
            fetchUpdate()       
    
        
    },[asin])

    const fetchUpdate = async ()=>{
        try {
            let response = await fetch('https://striveschool-api.herokuapp.com/api/comments/' + asin, {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI3OWY5NTgxNmI1YjAwMTU5NDA3NDAiLCJpYXQiOjE2MjI2NDY2NzcsImV4cCI6MTYyMzg1NjI3N30.y-rBwB5WAQOWBvWrLlAgTQUrbGulxd2M6cWH3VLyGLw'
                }
            })
            console.log(response)
            if (response.ok) {
                let comments = await response.json()
                setComments(comments)
                setIsLoading(false)
                setIsError(false)
            } 
            else {
                console.log('error')
                setIsLoading(false)
                setIsError(true)
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            setIsError(true)
        }
    }
 
        return (
            <div>
                {isLoading && <Loading />}
                {isError && <Error />}
                <AddComment asin={asin} />
                <CommentList commentsToShow={comments} />
            </div>
        )
}

export default CommentArea