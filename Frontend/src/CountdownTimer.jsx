import React,{useEffect,useState} from 'react'

function Countdowntimer({targetDate}) {
    const[timeleft,setTimeleft]=useState('');
    useEffect(()=>{
        function countdown(){
            const now=new Date();
            const end=new Date(targetDate);

            const diff=end-now;


            if (diff<0){
                setTimeleft("Due is today or overdue");
                return;
            }
            const days = Math.floor(diff/(1000*60*60*24));
            const hours = Math.floor((diff/(1000*60*60))% 24);
            const minutes = Math.floor((diff/(1000*60))%60);
      
            setTimeleft(`${days}d ${hours}h ${minutes}m left`);

        }
        countdown();
        const interval = setInterval(countdown, 60000);
        return ()=>clearInterval(interval);
        

    })
  return (
    <div>
        <p>{timeleft}</p>
    </div>
  )
}

export default Countdowntimer