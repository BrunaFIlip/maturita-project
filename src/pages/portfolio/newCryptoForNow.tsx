import React, {useEffect, useState} from 'react'
import axios from "axios"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { SLabel,
Conteiner,
SButton,
SButtonBack,
SInput
} from '../../styles/newCrypto';
import { SH1 } from '../../styles/myCrypto';
import { auth, db } from '../../database/firebase';
import {ref, set, child, get, update} from 'firebase/database'
import ErrorText from '../../components/ErrorText';





const NewCrpytoForNow = ()  => {
    const[coins, setCoins] = useState([])
    const[count, setCount] = useState<string>('')
    const[selectedCoin, setSelectedCoin] = useState<string>('Bitcoin');
    const[uid, setUid] = useState(auth.currentUser?.uid);
    const[price, setPrice] = useState<string>('');
    const[exist, setExist] = useState(false);
    const[data, setData] = useState<any>({});
    const[error, setError] = useState<string>('');


    

    
        useEffect(() => {
            axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=czk&order=market_cap_rank&per_page=250&page=20&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y').then(res => {
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
          var valid = false;
          if(Number(count) > 0 && Number(price) >= 0){
          valid = true;
          }

          if(valid){
        get(child(ref(db), 'users/'+ uid + '/' + selectedCoin)).then((snapshot) => {
            if(!snapshot.exists()){
                set(ref(db, 'users/' + uid + "/" + selectedCoin), {
                    pocet: count,
                    cena: 0 - Number(price),
                    investice: Number(price),
                    oblibene: 0
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
    }else{
        setError("Zkontrolujte zdali jsou všechna pole zadaná zprávně (nejsou záporná a jsou ve zprávném formátu) a zkustě to znovu.")
    }
      }


    return(<Conteiner>
        <SH1>Přidat coin</SH1>
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
        <SButtonBack
        color="success"
        onClick={() => {window.location.pathname = "/"}}
        >
            Zpět
        </SButtonBack>
        <br/>
        <ErrorText error={error} />
    </Conteiner>)
}


export default NewCrpytoForNow