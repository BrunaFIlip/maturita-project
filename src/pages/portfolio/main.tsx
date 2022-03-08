import { useState} from 'react'
import { auth, db } from '../../database/firebase';
import {ref, child, get} from 'firebase/database'
import ListOfYourCrypto from './listOfYourCrypto';
import { SNewPortfolioButton } from '../../styles/newCrypto';


const Main = () => {
    const[exist, setExist] = useState(false);
    const[uid] = useState(auth.currentUser?.uid);

        
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
        <SNewPortfolioButton
        onClick={() => window.location.pathname = "/newCrypto"}
        >
            Vytvořit portfolio
        </SNewPortfolioButton>
        </>)
    }
    else{
        return(<><ListOfYourCrypto/></>)
    }
}


export default Main;