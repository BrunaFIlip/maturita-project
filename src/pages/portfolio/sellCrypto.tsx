import React, {useEffect, useState} from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { SLabel,
Conteiner,
SButton,
SInput,
SButtonBack,
SP
} from '../../styles/newCrypto';
import { SH1, SMiddle } from '../../styles/myCrypto';
import { auth, db } from '../../database/firebase';
import {ref, child, get, update} from 'firebase/database'
import ErrorText from '../../components/ErrorText';
import axios from "axios"
import { useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading'
import { 
    SDataResult,
    SDataItem
} from '../../styles/searchBar';



const SellCrypto = () => {
    const[coins, setCoins] = useState([])
    const[count, setCount] = useState<string>('')
    const[selectedCoin, setSelectedCoin] = useState<string>();
    const[uid] = useState(auth.currentUser?.uid);
    const[price, setPrice] = useState<string>('');
    const[data, setData] = useState<any>({});
    const[error, setError] = useState<string>('');
    const[currencies, setCurrencies] = useState<any[]>([]);
    const[selectedCurrency, setSelectedCurrency] = useState<string>('CZK');
    const[loading, setLoading] = useState(false)
    const[filteredCurrencies, setFilteredCurrencies] = useState<any>([])


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
    
    useEffect(() => {
        if(Object.keys(data).length != 0 && currencies.length != 0){
            setLoading(true);
            }
    }, [data, currencies])


    const deleteCoin = () => {
        let mistake = 'Prosím vyplňte náslesdující položky správně: '
        let valid = true
        if(selectedCoin == null || selectedCoin == undefined || selectedCoin == ''){
            mistake = mistake + "vyber coin, "
            valid = false
        }
        if (Number(count) <= 0) {
            mistake = mistake + "počet coinů, "
            valid = false
        }
        if (Number(price) <= 0) {
            mistake = mistake + "za kolik jsem to prodal, "
            valid = false
        }
        if (selectedCurrency == '') {
            mistake = mistake + "vyberte měnu, "
            valid = false
        }
        if(valid){
        get(child(ref(db), 'users/'+ uid + '/' + selectedCoin)).then((snapshot) => {
            if(snapshot.exists()){
                if(snapshot.val()['pocet'] >= Number(count) && Number(count) > 0){
                    //převod na CZK
                    let newPriceCurr
                    let czk:number
                    Object.entries(currencies).map((val) =>{
                        if(val[1].code == "CZK"){
                            czk = val[1].value;
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
                else {
                    mistake = mistake + "počet coinů, "
                    let error = mistake
                    mistake = 'Prosím vyplňte náslesdující položky správně: '
                    setError(error)
                }
                }
        }).catch((error:any) => {
            console.log(error);
        })
    }else{
        let error = mistake
        mistake = 'Prosím vyplňte náslesdující položky správně: '
        setError(error)
    }
    }
    const handleCurrencyFilter = (e:any) => {
        const searchWord = e.target.value
        const newFilter: any = Object.entries(currencies).filter(value => {
            if(value[1].code.toLowerCase().includes(searchWord.toLowerCase())){
                return value[1].code
            }
        })
        if(searchWord === ""){
          setFilteredCurrencies([])
      }else{

          setFilteredCurrencies(newFilter)
      }
    }

    if(!loading){
        return(<SMiddle><ReactLoading color="black" type="bars"/></SMiddle>)
    }else{
    return(<Conteiner>
                <SH1>Odebrat coin</SH1>
                <form>
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
           <SLabel>Vyber počet coinu 
               <SInput type="number" 
               name="count"
               id="count"
               placeholder="Napište počet coinu"
               onChange={event => setCount(event.target.value)}
               value={count}
               />
           </SLabel>
           <SLabel>Za kolik jsem to prodal
               <SInput type="number" 
               name="price"
               id="price"
               placeholder="Napište částku"
               onChange={event => setPrice(event.target.value)}
               value={price}
               />
               </SLabel>
           <SLabel>Měna za kterou jsem nakupoval
            <div>
        <div>
            <SInput type="text" placeholder="Vyber měnu" onChange={handleCurrencyFilter}/>
        </div>
        <SP>Zvolená měna: {selectedCurrency}</SP>
        {filteredCurrencies.length !== 0 && (
            <SDataResult>
            {filteredCurrencies.slice(0,15).map((value:any) => {
                return <SDataItem onClick={() => {
                    setFilteredCurrencies([])
                    setSelectedCurrency(value[1].code)
                }}> 
                    <p>{value[1].code} </p>
                    </SDataItem>
            })}
        </SDataResult>
        )}
    </div>
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
}

export default SellCrypto
