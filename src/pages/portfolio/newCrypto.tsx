import React, {useEffect, useState} from 'react'
import axios from "axios"
import 'react-dropdown/style.css';
import { SLabel,
Conteiner,
SButton,
SButtonBack,
SInput,
SP
} from '../../styles/newCrypto';
import { SH1, SMiddle } from '../../styles/myCrypto';
import { auth, db } from '../../database/firebase';
import {ref, set, child, get, update} from 'firebase/database'
import ErrorText from '../../components/ErrorText';
import { 
    SDataResult,
    SDataItem
} from '../../styles/searchBar';
import { useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading'




const NewCrpyto = ()  => {
    const[coins, setCoins] = useState<any[]>([])
    const[count, setCount] = useState<string>('')
    const[selectedCoin, setSelectedCoin] = useState<string>('Bitcoin');
    const[uid] = useState(auth.currentUser?.uid);
    const[price, setPrice] = useState<any>('');
    const[error, setError] = useState<string>('');
    const[currencies, setCurrencies] = useState<any[]>([]);
    const[selectedCurrency, setSelectedCurrency] = useState<string>('CZK');
    const[filteredData, setFilteredData] = useState([]);
    const[coinsIds, setCoinIds] = useState<any[]>([])
    const[loading, setLoading] = useState(false)
    const[filteredCurrencies, setFilteredCurrencies] = useState<any>([])


    const history = useHistory();


    const fetchData = async () => {
        const getCoins = await axios.get('https://api.coingecko.com/api/v3/coins/list?include_platform=false')
        const getCurrencies = await axios.get('https://api.currencyapi.com/v3/latest?apikey=a9da5980-9586-11ec-acb5-adef3790cfd2')
        let help:any = [];
        let name:any = [];
        let id:any = []

        axios.all([getCoins, getCurrencies]).then(
            axios.spread((...allData) => {
                setCurrencies(allData[1].data.data)
                    help = allData[0].data;
                    help.map((value:any) => {
                        name.push(value['name'])
                        id[value['name']] = value['id']
                    })
                    name.sort((a:any , b:any) => b.length - a.length);
                    name.reverse();
                setCoins(name);
                setCoinIds(id)
            })
        )
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if(Object.keys(coins).length != 0 && currencies.length != 0){
            setLoading(true);
            }
    }, [coins, currencies])


      const saveToDatabase = () => {
          var valid = false;
          if(Number(count) > 0 && Number(price) > 0 && selectedCurrency !== ''){
              console.log(price)
          valid = true;
          }

          if(valid){
              let newPrice = price;
              let coinId:string
              let czk:number
                Object.entries(currencies).map((val) =>{
                    if(val[1].code === "CZK"){
                        czk = val[1].value;
                    }
                    if(val[1].code === selectedCurrency){
                        const currCzk = czk / val[1].value
                        newPrice = Number(price) * currCzk;
                    }
                })
                Object.entries(coinsIds).map((key) => {             
                    if(key[0] === selectedCoin){
                        coinId = key[1]
                    }
                })
              
            get(child(ref(db), 'users/'+ uid + '/' + selectedCoin)).then((snapshot) => {
            if(!snapshot.exists()){
                set(ref(db, 'users/' + uid + "/" + selectedCoin), {
                    pocet: count,
                    cena: 0 - newPrice,
                    investice: newPrice,
                    oblibene: 0,
                    id: coinId
                }).then(() => {
                    history.push("/")
                }).catch((error:any) =>{
                    console.log("tohle se nepovedlo: " + error)
                })
            } else{
                const oldValue = Number(snapshot.val()['cena']);
                const oldAmount = Number(snapshot.val()['pocet']);
                const oldInvestment = Number(snapshot.val()['investice']);

                const newAmount = oldAmount + Number(count);
                const newValue = oldValue - newPrice;
                const newInvestment = oldInvestment + newPrice;
                const postData = {
                    pocet: newAmount,
                    cena: newValue,
                    investice: newInvestment
                }
                
                update(ref(db, 'users/' + uid + "/" + selectedCoin), postData).then(() => {
                    history.push("/")
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

      const handleFilter = (e:any) => {
        const searchWord = e.target.value
        const newFilter: any = coins.filter(value => {
            if(value.toLowerCase().includes(searchWord.toLowerCase())){
                return value
            }
        });
        if(searchWord === ""){
            setFilteredData([])
        }else{

            setFilteredData(newFilter)
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
        <SH1>Přidat coin</SH1>
             <form>
         <SLabel>Vyber coin
    <div>
        <div>
            <SInput type="text" placeholder="Vyber coin" onChange={handleFilter}/>
        </div>
        <SP>Zvolený coin: {selectedCoin}</SP>
        {filteredData.length !== 0 && (
            <SDataResult>
            {filteredData.slice(0,15).map(coin => {
                return <SDataItem onClick={() => {
                    setFilteredData([])
                    setSelectedCoin(coin)
                }}> 
                    <p>{coin} </p>
                    </SDataItem>
            })}
        </SDataResult>
        )}
    </div>
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
            <SLabel>Kolik jsem za to zaplatil
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
            <SInput type="text" placeholder="Vyber coin" onChange={handleCurrencyFilter}/>
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
        onClick={saveToDatabase}
        >
            Přidat coin
        </SButton>
        <SButtonBack
        color="success"
        onClick={() => {history.push("/")}}
        >
            Zpět
        </SButtonBack>
        <br/>
        <ErrorText error={error} />
    </Conteiner>)
}
}


export default NewCrpyto