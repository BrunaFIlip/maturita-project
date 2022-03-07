import React, {useEffect, useState} from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { SLabel,
Conteiner,
SButton,
SInput,
SButtonBack
} from '../../styles/newCrypto';
import { SH1 } from '../../styles/myCrypto';
import { auth, db } from '../../database/firebase';
import {ref, child, get, update} from 'firebase/database'
import ErrorText from '../../components/ErrorText';
import axios from "axios"



const SellCrypto = () => {
    const[coins, setCoins] = useState([])
    const[count, setCount] = useState<string>('')
    const[selectedCoin, setSelectedCoin] = useState<string>();
    const[uid] = useState(auth.currentUser?.uid);
    const[price, setPrice] = useState<string>('');
    const[data, setData] = useState<any>({});
    const[error, setError] = useState<string>('');
    const[currencies, setCurrencies] = useState<any[]>([]);
    const[selectedCurrency, setSellectedCurrency] = useState<string>('');


    const fetchData = async () => {
        await axios.get('http://data.fixer.io/api/latest?access_key=52c22eedc8c48a6bbbab651c40021b43').then(res => {
            setCurrencies(res['data']['rates']);
        }).catch(error => console.log(error))
    }

    useEffect(() => {
        fetchData()
        }, [])


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
                if(snapshot.val()['pocet'] >= count && Number(count) > 0 && selectedCurrency !== ""){
                    //převod na CZK
                    let newPriceCurr = Number(price);
                    let czk:number
                    Object.entries(currencies).map((val) =>{
                        if(val[0] == "CZK"){
                            czk = val[1];
                        }
                        if(val[0] === selectedCurrency){
                            const currCzk = czk / val[1]
                            newPriceCurr = Number(price) * val[1];
                        }
                    })
                    //update
                    const newCount = snapshot.val()['pocet'] - Number(count);
                    const newPrice = snapshot.val()['cena'] + newPriceCurr;
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
                else setError("Zkontrolujte zdali jsou všechna pole zadaná zprávně (nejsou záporná a jsou ve zprávném formátu) a zkustě to znovu.")
            }
        }).catch((error:any) => {
            console.log(error);
        })
    }

console.log(currencies)

    return(<Conteiner>
                <SH1>Odebrat coin</SH1>
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
           <SLabel>Měna za kterou jsem prodával
    <Dropdown options={Object.entries(currencies).map((value) => {
        return(
            value[0]
        )
    })} value={selectedCurrency}
     placeholder="Vyber měnu za kterou jsi prodával" 
    onChange={event => setSellectedCurrency(event.value)}
    />
    </SLabel>
       </form>
       <SButton
       color="success"
       onClick={deleteCoin}
       >
           Odebrat coin
       </SButton>
       <SButtonBack
        color="success"
        onClick={() => {window.location.pathname = "/"}}
        >
            Zpět
        </SButtonBack><br/>
        <ErrorText error={error} />
   </Conteiner>)
}

export default SellCrypto