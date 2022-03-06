import React, {useEffect, useState} from 'react'
import axios from "axios"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { SLabel,
Conteiner,
SButton,
SButtonBack,
SInput,
SP
} from '../../styles/newCrypto';
import { SH1 } from '../../styles/myCrypto';
import { auth, db } from '../../database/firebase';
import {ref, set, child, get, update} from 'firebase/database'
import ErrorText from '../../components/ErrorText';
import { 
    SDataResult,
    SDataItem
} from '../../styles/searchBar';




const NewCrpyto = ()  => {
    const[coins, setCoins] = useState<any[]>([])
    const[count, setCount] = useState<string>('')
    const[selectedCoin, setSelectedCoin] = useState<string>('Bitcoin');
    const[uid] = useState(auth.currentUser?.uid);
    const[price, setPrice] = useState<any>('');
    const[error, setError] = useState<string>('');
    const[currencies, setCurrencies] = useState<any[]>([]);
    const[selectedCurrency, setSellectedCurrency] = useState<string>('');
    const[filteredData, setFilteredData] = useState([]);
    const[pickedCoinPlaceHolder, setPickedCoinPlaceHolder] = useState<string>('Vyber coin');


    const fetchData = () => {
        const getCurrencies = axios.get('https://freecurrencyapi.net/api/v2/latest?apikey=a9da5980-9586-11ec-acb5-adef3790cfd2&base_currency=CZK')
        const getCoins1 = axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=czk&order=market_cap_rank&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y')
        const getCoins2 = axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=czk&order=market_cap_rank&per_page=250&page=2&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y')
        const getCoins3 = axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=czk&order=market_cap_rank&per_page=250&page=3&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y')
        const getCoins4 = axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=czk&order=market_cap_rank&per_page=250&page=4&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y')
        const getCoins5 = axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=czk&order=market_cap_rank&per_page=250&page=5&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y')
        const getCoins6 = axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=czk&order=market_cap_rank&per_page=250&page=6&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y')
        const getCoins7 = axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=czk&order=market_cap_rank&per_page=250&page=7&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y')
        const getCoins8 = axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=czk&order=market_cap_rank&per_page=250&page=8&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y')
        const getCoins9 = axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=czk&order=market_cap_rank&per_page=250&page=9&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y')
        const getCoins10 = axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=czk&order=market_cap_rank&per_page=250&page=10&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y')


        let help:any = [];
        let name:any = [];
        axios.all([getCurrencies, getCoins1, getCoins2, getCoins3, getCoins4, getCoins5, getCoins6, getCoins7, getCoins8, getCoins9, getCoins10]).then(
            axios.spread((...allData) => {
                setCurrencies(allData[0].data)
                for (let index = 1; index <= 10; index++) {   
                    help = allData[index].data;
                    const filteredCoins = help.filter((val:any) => val['name'])
                    filteredCoins.map((value:any) => {
                        name.push(value['name'])
                    })
                }
                setCoins(name);
            })
        )
    }
    
    useEffect(() => {
        fetchData()
    }, [])


// useEffect(() => {
// axios.get('https://freecurrencyapi.net/api/v2/latest?apikey=a9da5980-9586-11ec-acb5-adef3790cfd2&base_currency=CZK').then(res => {
//     setCurrencies(res.data);
// }).catch(error => console.log(error))
// }, [])

Object.entries(currencies).map(curr => {
    if(curr[0] === "data"){
        setCurrencies(curr[1])
    }
})


// Object.keys(currencies).map((keyName, i) => {
//     console.log(keyName + " : " + i)
// })


        // useEffect(() => {  

        //         axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=czk&order=market_cap_rank&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y').then(res => {
        //           setCoins(res.data)
        //         }).catch(error => console.log(error))
            
        //   }, []);
        //   console.log(coins)
    
        //   useEffect(() => {
        //     get(child(ref(db), 'users/'+uid)).then((snapshot) => {
        //         if(snapshot.exists()){
        //             setData(snapshot.val())
        //         }
        //     }).catch((error:any) => {
        //         console.log(error);
        //     })
        // }, [])

    // const Exists = (coin: any) => {
    //     get(child(ref(db), 'users/'+ uid + '/' + coin)).then((snapshot) => {
    //         if(snapshot.exists()){
    //             setExist(true);
    //         } else{
    //             setExist(false);
    //         }
    //     }).catch((error:any) => {
    //         console.log(error);
    //     })
    // }



      const saveToDatabase = () => {
          var valid = false;
          if(Number(count) > 0 && Number(price) >= 0 && selectedCurrency !== ''){
          valid = true;
          }

          if(valid){
              let newPrice = price;
                Object.entries(currencies).map((val) =>{
                    if(val[0] === selectedCurrency){
                        newPrice = Number(price) / val[1];
                    }
                })
              
            get(child(ref(db), 'users/'+ uid + '/' + selectedCoin)).then((snapshot) => {
            if(!snapshot.exists()){
                set(ref(db, 'users/' + uid + "/" + selectedCoin), {
                    pocet: count,
                    cena: 0 - newPrice,
                    investice: newPrice,
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
                const newValue = oldValue - newPrice;
                const newInvestment = oldInvestment + newPrice;
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


    return(<Conteiner>
        <SH1>Přidat coin</SH1>
             <form>
         <SLabel>Vyber coin
    <div>
        <div>
            <SInput type="text" placeholder={pickedCoinPlaceHolder} onChange={handleFilter}/>
        </div>
        <SP>Zvolený coin: {selectedCoin}</SP>
        {filteredData.length !== 0 && (
            <SDataResult>
            {filteredData.slice(0, 15).map(coin => {
                return <SDataItem onClick={() => {
                    setPickedCoinPlaceHolder(coin)
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
                <SInput type="text" 
                name="count"
                id="count"
                placeholder="napište počet coinu"
                onChange={event => setCount(event.target.value)}
                value={count}
                />
            </SLabel>
            <SLabel>Kolik jsem za to zaplatil
                <SInput type="number" 
                name="price"
                id="price"
                placeholder="napište částku v KČ"
                onChange={event => setPrice(event.target.value)}
                value={price}
                />
            </SLabel>
            <SLabel>Měna v které jsem nakupoval
    <Dropdown options={Object.keys(currencies).map((keyName, i) => {
        return(
            keyName
        )
    })} value={selectedCurrency}
     placeholder="Vyber měnu v které jsi nakupoval" 
    onChange={event => setSellectedCurrency(event.value)}
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


export default NewCrpyto