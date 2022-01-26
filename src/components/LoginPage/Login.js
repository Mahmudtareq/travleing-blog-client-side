import React from 'react';
import { NavLink } from 'react-router-dom';
import { Alert, Button, CircularProgress, TextField, Typography ,Container,Grid} from '@mui/material';
// import useFirebase from '../../hooks/useFirebase';
import useAuth from '../../hooks/useAuth';
import { useHistory ,useLocation } from 'react-router';
import { useState } from 'react';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { user, loginUser, isLoading, error, signInWithGoogle ,setUser} = useAuth();
    const history = useHistory()
    const location = useLocation()
    const url = location.state?.from ||"/home"
    const handleGoogleLogin =()=>{
        signInWithGoogle()
        .then(res=>
            {
            setUser(res.user)
            history.push(url)

        })
        .then((err)=>console.log(err))
        // console.log('clicked')

    }
    const handleOnChange = e => {
        const filed = e.target.name;
        const value = e.target.value;
        // console.log(filed , value)
        const newLoginData = { ...loginData };
        newLoginData[filed] = value;
        setLoginData(newLoginData)
    }
     const handleLoginSubmit = e => {
        loginUser(loginData.email, loginData.password, location, history);
        e.preventDefault();
    }
// const handleGoogleSignIn = () => {
//         signInWithGoogle(location, history);

//     }
    return (
        <Container>
             <Grid container spacing={2}>
                <Grid item sx={{ mt: 10}} xs={12} md={6}>
                    <Typography sx={{ color: 'info.main', mt: 6 ,textAlign:'center'}} variant="h6" gutterBottom>
                        LOGIN
                    </Typography>
                    <form onSubmit={handleLoginSubmit}>
                        <TextField
                            sx={{ width: '75%', m: 2 }}
                            id="standard-basic"
                            label="Your Email"
                            name="email"
                            type="email"
                            onChange={handleOnChange}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 2 }}
                            id="standard-basic"
                            label="Your Password"
                            type="password"
                            name="password"
                            onChange={handleOnChange}
                            variant="standard" />
                        
                       
                        <Button variant="contained" sx={{ width: '75%', m: 2 }}
                            type="submit">
                            Login</Button>
                        <NavLink
                            style={{ textDecoration: 'none' }}
                            to="/register">
                            <Button sx={{textAlign:'center',color:'success.main'}} variant="text">New User? Please Register</Button>
                        </NavLink>

                       
                        {isLoading && <CircularProgress />}
                      
                        {user?.email && <Alert severity="success"> User Login Successfully ???</Alert>}
                        {error && <Alert severity="error"> {error}</Alert>}
                    </form>
                    <Button onClick={handleGoogleLogin} variant="contained">Google SignIn</Button>
               </Grid>
            <Grid item sx={{mt:10}} xs={12} md={6}>
                
            </Grid>
            </Grid>
           
        </Container>
    );
};

export default Login;