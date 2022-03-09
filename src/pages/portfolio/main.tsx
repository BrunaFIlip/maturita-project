import { useState} from 'react'
import { auth, db } from '../../database/firebase';
import {ref, child, get} from 'firebase/database'
import ListOfYourCrypto from './listOfYourCrypto';
import { SNewPortfolioButton } from '../../styles/newCrypto';
import { useHistory } from 'react-router-dom';


const Main = () => {
    const[exist, setExist] = useState(false);
    const[uid] = useState(auth.currentUser?.uid);

    const history = useHistory();

        
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
        onClick={() => history.push("/newCrypto")}
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