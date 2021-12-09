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





const NewCrpytoForNow = ()  => {
    const[coins, setCoins] = useState([])
    const[count, setCount] = useState<string>('')
    const[selectedCoin, setSelectedCoin] = useState<string>('Bitcoin');
    const[uid, setUid] = useState(auth.currentUser?.uid);
    const[price, setPrice] = useState<string>('');
    const[exist, setExist] = useState(false);
    const[data, setData] = useState<any>({});



    

    
        useEffect(() => {
            axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=CZK&order=market_cap_desc&per_page=100&page=1&sparkline=false').then(res => {
              setCoins(res.data)
            }).catch(error => console.log(error))
          }, []);
    
          useEffect(() => {
            get(child(ref(db), 'users/'+uid)).then((snapshot) => {
                if(snapshot.exists()){
                    setData(snapshot.val())
                }
            }).catch((error:any) => {
                console.log(error);
            })
        }, [])

    const Exists = (coin: any) => {
        get(child(ref(db), 'users/'+ uid + '/' + coin)).then((snapshot) => {
            if(snapshot.exists()){
                setExist(true);
            } else{
                setExist(false);
            }
        }).catch((error:any) => {
            console.log(error);
        })
    }




      const saveToDatabase = () => {
        get(child(ref(db), 'users/'+ uid + '/' + selectedCoin)).then((snapshot) => {
            if(!snapshot.exists()){
                set(ref(db, 'users/' + uid + "/" + selectedCoin), {
                    pocet: count,
                    cena: 0 - Number(price),
                    investice: Number(price)
                }).then(() => {
                    window.location.pathname = "/"
                }).catch((error:any) =>{
                    console.log("tohle se nepovedlo: " + error)
                })
            } else{
                const oldValue = Number(snapshot.val()['cena']);
                const oldAmount = Number(snapshot.val()['pocet']);
                const oldInvestment = Number(snapshot.val()['investice']);

                const newAmount = oldAmount + Number(count);
                const newValue = oldValue - Number(price);
                const newInvestment = oldInvestment + Number(price);
                const postData = {
                    pocet: newAmount,
                    cena: newValue,
                    investice: newInvestment
                }
                
                update(ref(db, 'users/' + uid + "/" + selectedCoin), postData).then(() => {
                    window.location.pathname = "/"
                }).catch((error:any) => {
                    console.log("tohle se nepovedlo: " + error)
                })
            }
        }).catch((error:any) => {
            console.log(error);
        })
      }


    return(<Conteiner>
         <SLabel>Vyber coin
    <Dropdown options={coins.map(coin => {
        return(
            coin['name']
        )
    })} value={selectedCoin}
     placeholder="Vyber coin který chceš přidat" 
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
            <SLabel>Kolik jsem za to zaplatil
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
        onClick={saveToDatabase}
        >
            Přidat coin
        </SButton>
    </Conteiner>)
}


export default NewCrpytoForNow