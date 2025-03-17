import React ,{useEffect,useState}from 'react';
import { useNavigate } from 'react-router-dom';
function AppPage() {
    const [user,setUser]=useState(null);
    const navigate=useNavigate();

    useEffect(()=>{
        const token=localStorage.getItem('token');
        if (!token){
            navigate('/Login');
            return;
        }
        fetch("http://localhost:6969/profile",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        })
        .then(res=>{
            if(!res.ok) throw new Error("Unauthorized");
            return res.json();
        })
        .then(data => setUser(data.user))
      .catch(err => {
        console.error(err);
        localStorage.clear();
        navigate("/login");
      });
    },[navigate]);
  return (
    <div>
 {user ? <h2>Welcome {user.email}</h2> : <p>Loading...</p>}
    </div>
  )
}

export default AppPage;