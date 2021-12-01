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
import {ref, set, child, get} from 'firebase/database'



const NewCrpytoForNow = ()  => {
    const[coins, setCoins] = useState([])
    const[count, setCount] = useState<string>('')
    const[selectedCoin, setSelectedCoin] = useState<string>('');
    const[uid, setUid] = useState(auth.currentUser?.uid);
    const[price, setPrice] = useState<string>('');



    const cryptos = ["bitcoin", "lightcoin", "dogecoin", "ethereum", "nevim jakej coin"]
    const defaultOption = cryptos[0];

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=CZK&order=market_cap_desc&per_page=100&page=1&sparkline=false').then(res => {
          setCoins(res.data)
        }).catch(error => console.log(error))
      }, []);

      const filteredCoins = coins.filter(coin => coin['name'])

      console.log(coins.map(coin => {
          return(
              coin['name']
          )
      }));


      const saveToDatabase = () => {
        set(ref(db, 'users/' + uid + "/" + selectedCoin), {
            pocet: count,
            cena: price
        }).then(() => {
            window.location.pathname = "/portfolioMain"
        }).catch((error:any) =>{
            console.log("tohle je se nepovedlo: " + error)
        })
      }


    return(<Conteiner>
         <SLabel>Vyber coin
    <Dropdown options={coins.map(coin => {
        return(
            coin['name']
        )
    })} value={defaultOption}
     placeholder="Vyber coin který chceš přidat" 
    onChange={event => setSelectedCoin(event.value)}
    />
    </SLabel>
        <form>
            <SLabel>Vyber počet coinu 
                <SInput type="text" 
                name="count"
                id="count"
                placeholder="napište částku v KČ"
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