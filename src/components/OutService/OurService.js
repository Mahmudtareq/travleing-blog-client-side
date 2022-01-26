// import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { motion } from "framer-motion";
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion';

const OurService = (props) => {
    const {name,img,description,price,_id} = props.service;
    
    return (
        <div>
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      className="mb-2"
    >
            
        <div className="mb-4">
        <Card className="" style={{ width: '16rem' }}>
            <Card.Img variant="top" height="190" className="" src={img} />
            <Card.Body>
                <Card.Title className="text-start text-primary">Place : {name}</Card.Title>
                <Card.Title className="text-start"> <span className="text-secondary">Price: <span className="text-secondary">$</span> {price} </span> <span className="text-info"> Per Person</span></Card.Title>
                <Link to={`/myOrder/${_id}`} style={{ textDecoration: 'none' }}>
                             <Button variant="primary" >View Details</Button>
                </Link>
            </Card.Body>
                </Card>
            </div>
           </motion.div>
        </div>
    );
};

export default OurService;