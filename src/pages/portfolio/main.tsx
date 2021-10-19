import React, {useState} from 'react'
import Firebase from '../../database/firebase';
import { auth } from '../../database/firebase';
import { Button, FormGroup, Input } from 'reactstrap';



const Main = () => {
    const[exist, setExist] = useState(false);
    const[uid, setUid] = useState(auth.currentUser?.uid);


    const refreshPage = () => {
        window.location.reload();
    }

    const createNewPortfolio = () => {
        Firebase.database().ref('users').child(String(uid)).set({
            crypto: 0
        }).then(() => {
            refreshPage();
        })
    }

    Firebase.database().ref('users/'+uid).once("value", snapshot => {
        if(snapshot.exists()){
            setExist(true);
        }
    })

    if(exist){
        return(<>
        <Button
        block
        onClick={() => createNewPortfolio()}
        >
            Vytvořit portfolio
        </Button>
        </>)
    }
    else{
        return(<><p>už tam jsi ;)</p></>)
    }
}


export default Main;