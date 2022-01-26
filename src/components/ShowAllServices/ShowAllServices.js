import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import MenuBar from '../MenuBar/MenuBar';
import './ShowAllServices.css';
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion';

const ShowAllServices = () => {
    const [services, setServices] = useState([])
    useEffect(()=>{
        fetch('https://arcane-atoll-13935.herokuapp.com/services/')
        .then(res=>res.json())
        .then(data=>setServices(data));
    },[])
    const handleDelete = id=>{
        const proceed = window.confirm('Are you Sure ,You Wnt to Delete?');
        if(proceed){
            const url =`https://arcane-atoll-13935.herokuapp.com/services/${id}`;
            fetch(url,{
                method:"DELETE"
            })
            .then(res =>res.json())
            .then(data =>{
                if(data.deletedCount >0){
                    alert('Successfully Deleted')
                    const  remaining = services.filter(service =>service._id !==id);
                    setServices(remaining);
                }
            });

        }
       
    }
    return (
        <div>
            <div>
                <MenuBar></MenuBar>
            </div>
            <h2 className="text-primary my-4">Featured Tours</h2>
            <div className="show-details container my-5">
    
            {
                services.map(service =><div
                    key={service._id}>
                 <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      className="mb-2"
    >  
                    
                <Card className="mb-3" style={{ width: '16rem'}}>
               <Card.Img variant="top" height="190" className=" " src={service.img} />
              <Card.Body>
                <Card.Title className="text-start">{service.name}</Card.Title>
                <Card.Title className="text-start"> <span className="text-primary">Price: <span className="text-danger">$</span> {service.price} </span> <span className="text-info"> Per Person</span></Card.Title>
                <Card.Text className="text-start">
                {service.description.slice(0,100)}
                </Card.Text>
                <button onClick={()=>handleDelete(service._id)} className="btn btn-info px-4">Delate</button>
            </Card.Body>
            </Card>
                   

                   </motion.div> 
                    {/* <button className="btn btn-danger px-4" onClick={()=>handleDelete(service._id)}>Delete</button> */}
                </div>)
            }
            </div>
           
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default ShowAllServices;