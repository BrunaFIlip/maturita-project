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
import { useHistory } from 'react-router-dom';



const SellCrypto = () => {
    const[coins, setCoins] = useState([])
    const[count, setCount] = useState<string>('')
    const[selectedCoin, setSelectedCoin] = useState<string>();
    const[uid] = useState(auth.currentUser?.uid);
    const[price, setPrice] = useState<string>('');
    const[data, setData] = useState<any>({});
    const[error, setError] = useState<string>('');
    const[currencies, setCurrencies] = useState<any[]>([]);
    const[selectedCurrency, setSellectedCurrency] = useState<string>('CZK');

    const history = useHistory()

    const fetchData = async () => {
        await axios.get('https://api.currencyapi.com/v3/latest?apikey=a9da5980-9586-11ec-acb5-adef3790cfd2').then(res => {
            setCurrencies(res.data.data);
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
                    let newPriceCurr
                    let czk:number
                    Object.entries(currencies).map((val) =>{
                        if(val[1].code == "CZK"){
                            czk = val[1];
                        }
                    })
                    Object.entries(currencies).map((val) =>{
                        if(val[1].code === selectedCurrency){
                            const currCzk = czk / val[1].value
                            newPriceCurr = Number(price) * currCzk;
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
                        history.push("/")
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
               <SInput type="number" 
               name="count"
               id="count"
               placeholder="Napište počet coinu"
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
               placeholder="Napište částku"
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
        onClick={() => {history.push("/")}}
        >
            Zpět
        </SButtonBack><br/>
        <ErrorText error={error} />
   </Conteiner>)
}

export default SellCrypto