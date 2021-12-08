import React, {useEffect, useState} from 'react'
import axios from "axios"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { SLabel,
Conteiner,
SButton,
SInput
} from '../../styles/newCrypto';
import { auth, db } from '../../database/firebase';
import {ref, set, child, get, update} from 'firebase/database'

const SellCrypto = () => {
    const[coins, setCoins] = useState([])
    const[count, setCount] = useState<string>('')
    const[selectedCoin, setSelectedCoin] = useState<string>();
    const[uid, setUid] = useState(auth.currentUser?.uid);
    const[price, setPrice] = useState<string>('');
    const[data, setData] = useState<any>({});


    useEffect(() => {
        get(child(ref(db), 'users/'+uid)).then((snapshot) => {
            if(snapshot.exists()){
                setData(snapshot.val())
            }
        }).catch((error:any) => {
            console.log(error);
        })
    }, [])


    useEffect(() => {
        let arr: any = [];
        Object.entries(data).map((coin) => {
            arr.push(coin[0])
        })
        setCoins(arr);
    }, [data])
    


    const deleteCoin = () => {
        get(child(ref(db), 'users/'+ uid + '/' + selectedCoin)).then((snapshot) => {
            if(snapshot.exists()){
                if(snapshot.val()['pocet'] > count && Number(count) > 0){
                    //update
                    const newCount = snapshot.val()['pocet'] - Number(count);
                    const newPrice = snapshot.val()['cena'] + Number(price)
                    const postData = {
                        pocet: newCount,
                        cena: newPrice
                    }

                    update(ref(db, 'users/' + uid + "/" + selectedCoin), postData).then(() => {
                        window.location.pathname = "/"
                    }).catch((error:any) => {
                        console.log("tohle se nepovedlo: " + error)
                    })
                }
                else return(<p>Nesprávný počet coinu</p>)
            }
        }).catch((error:any) => {
            console.log(error);
        })
    }



    return(<Conteiner>
        <SLabel>Vyber coin
   <Dropdown options={coins.map(coin => {
       return(
           coin
       )
   })} value={selectedCoin}
    placeholder="Vyber coin který chceš odebrat" 
   onChange={event => setSelectedCoin(event.value)}
   />
   </SLabel>
       <form>
           <SLabel>Vyber počet coinu 
               <SInput type="text" 
               name="count"
               id="count"
               placeholder="napište počet coinu"
               onChange={event => setCount(event.target.value)}
               value={count}
               />
           </SLabel>
           </form>
           <form>
           <SLabel>Za kolik jsem to prodal
               <SInput type="number" 
               name="price"
               id="price"
               placeholder="napište částku v KČ"
               onChange={event => setPrice(event.target.value)}
               value={price}
               />
           </SLabel>
       </form>
       <SButton
       color="success"
       onClick={deleteCoin}
       >
           Odebrat coin
       </SButton>
   </Conteiner>)
}

export default SellCrypto