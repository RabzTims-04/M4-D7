import { useState, useEffect, useRef } from "react";
import { Button, Form } from 'react-bootstrap'

const  AddComment =({asin})=> {

    const [comment,setComment] = useState({
        comment: '',
        rate: 1,
        elementId: null
    })

 /*    const prevProps = useRef({asin}).current */


    useEffect(()=>{
     /*   if (prevProps.asin !== asin) {  */
            setComment({
                ...comment,
                elementId: asin
            })
        
        
    },[asin])

  /*   componentDidUpdate(prevProps) {
        if (prevProps.asin !== this.props.asin) {
            this.setState({
                comment: {
                    ...this.state.comment,
                    elementId: this.props.asin
                }
            })
        }
    } */

   const sendComment = async (e) => {
        e.preventDefault()
        try {
            let response = await fetch('https://striveschool-api.herokuapp.com/api/comments', {
                method: 'POST',
                body: JSON.stringify(comment),
                headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI3OWY5NTgxNmI1YjAwMTU5NDA3NDAiLCJpYXQiOjE2MjI2NDY2NzcsImV4cCI6MTYyMzg1NjI3N30.y-rBwB5WAQOWBvWrLlAgTQUrbGulxd2M6cWH3VLyGLw'
                }
            })
            if (response.ok) {
                // the comment has been sent succesfully!!
                alert('Comment was sent!')
                setComment({
                    comment: '',
                    rate: 1,
                    elementId: null
                })

            } else {
                console.log('error')
                alert('something went wrong')
            }
        } catch (error) {
            console.log('error')
        }
    }


        return (
            <div>
                <Form onSubmit={sendComment}>
                    <Form.Group>
                        <Form.Label>Comment text</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Add comment here"
                            value={comment.comment}
                            onChange={e => setComment({
                                ...comment,
                                comment: e.target.value
                            })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control as="select" value={comment.rate}
                            onChange={e => setComment({
                                ...comment,
                                rate: e.target.value
                            })}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mb-3">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    
}

export default AddComment