import { useState} from 'react'
import { auth, db } from '../../database/firebase';
import { Button } from 'reactstrap';
import {ref, child, get} from 'firebase/database'
import ListOfYourCrypto from './listOfYourCrypto';


const Main = () => {
    const[exist, setExist] = useState(false);
    const[uid, setUid] = useState(auth.currentUser?.uid);

        
        get(child(ref(db), 'users/'+uid)).then((snapshot) => {
            if(snapshot.exists()){
                setExist(true);
            } else{
                setExist(false);
            }
        }).catch((error:any) => {
            console.log(error);
        })



    


    if(!exist){
        return(<>
        <Button
        block
        onClick={() => window.location.pathname = "/newCrypto"}
        >
            Vytvořit portfolio
        </Button>
        </>)
    }
    else{
        return(<><ListOfYourCrypto/></>)
    }
}


export default Main;