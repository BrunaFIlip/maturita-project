import {useState, useEffect, useRef, useCallback} from 'react'
import {ref, child, get, update} from 'firebase/database'
import { db, auth } from '../../database/firebase';
import { SRec, SMainRec } from '../../styles/myCrypto';
import MainPieChart from '../../components/Graphs/pieChart';
import { getMarketData } from '../../components/Graphs/marketData';
import { SButtonAdd, SButtonDelete, SValueProcent, FavouriteButton, SH1, ShowPercentage } from '../../styles/myCrypto';
import StarIcon from '@mui/icons-material/Star';
import Switch from 'react-switch';



const ListOfYourCrypto = () => {
    const[uid] = useState(auth.currentUser?.uid);
    const[data, setData] = useState<any>({});
    const[absoluteValue, setAbsoluteValue] = useState<number>(0);
    const[marketData, setMarketData] = useState();
    const[values, setValues] = useState<any>([]);
    const[invest, setInvest] = useState<any>([]);
    const[favouriteCoins, setFavouriteCoins] = useState<any>([]);
    const[showOnlyFavourites, setShowOnlyFavourites] = useState<boolean>(false);

    
    const[show, setShow] = useState<boolean>(false);



    useEffect(() => {
        const fetchMarketData = async () => {
            const mData = await getMarketData();
            setMarketData(mData);

        }
        fetchMarketData();
    }, [data])

    useEffect(() => {
        get(child(ref(db), 'users/'+uid)).then((snapshot) => {
            if(snapshot.exists()){
                setData(snapshot.val())
            }
        }).catch((error:any) => {
            console.log(error);
        })
    }, [])

    const previousValues = useRef({ data, marketData });

    useEffect(() => {

        if (
            previousValues.current.data !== data &&
            previousValues.current.marketData !== marketData
          ) {
        let number = 0;
        let number2 = 0;
        let xvalues: any = [];
        let yvalues: any = [];
        let favourite: any = [];

        Object.entries(data).map((coin) => {
            let x = 0;
            while(true){
                try{
                    if(marketData[x]['name'] === coin[0]){
                        Object.entries(data[coin[0]]).map((value) => {
                            if(value[0] === 'pocet'){
                                if(value[1] === 0){
                                    xvalues.push(0);
                                }else{
                                number += Math.round(Number(value[1]) * marketData[x]['current_price'])
                                number2 = Math.round(Number(value[1]) * marketData[x]['current_price'])
                                console.log(Math.round(Number(value[1]) * marketData[x]['current_price']))
                                xvalues.push(number2);
                                }
                            }
                            else if(value[0] === 'investice'){
                                yvalues.push(value[1]);
                            }
                            if(value[0] === 'oblibene'){
                                if(value[1] === 1){
                                    favourite.push(coin[0]);
                                }
                            }
                        })
                    }
                }catch{
                    break;
                }
                x++;
            }
        })
        setAbsoluteValue(number);
        setValues(xvalues);
        setInvest(yvalues);
        setFavouriteCoins(favourite)
    }
    },[marketData])

    const [, updateState] = useState<any>();
    const forceUpdate = useCallback(() => updateState({}), []);

    const AddToFavourite = (coin: string) => {
        if(Number(data[coin]['oblibene']) === 1){
            update(ref(db, 'users/' + uid + "/" + coin), {
                oblibene: 0
            }).then(() => {
                data[coin]['oblibene'] = 0;
                forceUpdate()
            }).catch((error:any) =>{
                console.log("tohle se nepovedlo: " + error)
            })
        }else{
        update(ref(db, 'users/' + uid + "/" + coin), {
            oblibene: 1
        }).then(() => {
            data[coin]['oblibene'] = 1;
            forceUpdate()
        }).catch((error:any) =>{
            console.log("tohle se nepovedlo: " + error)
        })
    }
    console.log(data);
    }

    const CheckIfFav = (name:string) => {
        let id;
        if(data[name]['oblibene'] === 0){
            id="notFav"
        }else{
            id='isFav'
        }
        return id;
    }



    const ToggleFav = () => {
        var elemClass = document.getElementsByClassName('notFav') as HTMLCollectionOf<HTMLElement>;
    if(!showOnlyFavourites){
        for (let index = 0; index < elemClass.length; index++) {
            elemClass[index].style.visibility = "hidden"
            elemClass[index].style.position = "absolute"
        }
    }else{
        for (let index = 0; index < elemClass.length; index++) {
            elemClass[index].style.visibility = "visible"
            elemClass[index].style.position = "relative"
        }
    }
    setShowOnlyFavourites(!showOnlyFavourites);
    }



    let i = -1;
    let o = -1;
    let proc:any = 0;
    let valuesx:any = 0;
    let inv:any = 0;
    let j = -1;
    return(<>
        <SH1>Mé portfolio</SH1>
        <SButtonAdd
        onClick={() => {window.location.pathname = '/newCrypto'}}
        >
            Přidat Coin
        </SButtonAdd>
        <SButtonDelete
        onClick={() => {window.location.pathname = '/sellCrypto'}}
        >
            Odebrat Coin
        </SButtonDelete>
        {/* <SButton onClick={() => setShow(!show)}>Procenta/Hodnota</SButton> */}


        <SMainRec>
            <h2>Celkem</h2>
            <p>Celková hodnota portfolia: {absoluteValue}</p>
            {Object.entries(data).map((coin) => {
                j++
                Object.entries(data[coin[0]]).map((value) => {
                    if(value[0] === "cena"){
                        valuesx = valuesx + value[1];
                        inv = inv + invest[j];
                    }
                })
            proc = Number(((absoluteValue + valuesx) / (absoluteValue / 100))).toFixed(2)
            })}
            <SValueProcent><p>Profit: {show? (absoluteValue + valuesx).toFixed(2) + "Kč" : proc + "%" } </p></SValueProcent>
            <MainPieChart/>

        </SMainRec>
        <p>Zobrazit pouze oblíbené <Switch checked={showOnlyFavourites} onChange={ToggleFav}/></p>
        <ShowPercentage>Procenta/Částka <Switch checked={show} onChange={() => setShow(!show)}/></ShowPercentage>
        {/* vypíše oblíbené */}
        {Object.entries(data).map((coin) =>{
            i++;
            for (let index = 0; index < favouriteCoins.length; index++) {
                if(coin[0] === favouriteCoins[index]){
                    return(<SRec className={CheckIfFav(coin[0])}><h2>{coin[0]}</h2>
                        <br/>
                        
                        <FavouriteButton onClick={() => AddToFavourite(coin[0])} isFavourite={data[coin[0]]['oblibene']}><StarIcon/></FavouriteButton>
                
                
                        {Object.entries(data[coin[0]]).map((value) => {
                            if(value[0] === "cena"){
                                let procent
                                if(values[i] === 0){
                                    procent = Number(100 / (invest[i] / Number(value[1]))).toFixed(2);
                                    console.log(values[i] + " : " + Number(value[1]) + " : " + invest[i])
                                }else{
                                procent = Number((values[i] + value[1]) / (values[i] / 100)).toFixed(2);
                                }
                
                                return(<SValueProcent><p>Profit: {show? (value[1] + values[i]) + "Kč" : procent+ "%"} </p></SValueProcent>)
                            }
                            else if(value[0] === "pocet"){
                                return(<>Pocet vlasněných coinů: {value[1]}</>)
                            }
                        })}
                        <p>Hodnota vlastněných coinů: {values[i]}</p>
                        </SRec>)
                }
                
            }
        })}
        {/* vypíše mé coiny krom oblíbených */
        Object.entries(data).map((coin) =>{
            o++;
            let isf = false;
            for (let index = 0; index < favouriteCoins.length; index++) {
                if(coin[0] === favouriteCoins[index]) isf = true;
            

                if(!isf){
            return(<SRec className={CheckIfFav(coin[0])}><h2>{coin[0]}</h2>
        <br/>
        
        <FavouriteButton onClick={() => AddToFavourite(coin[0])} isFavourite={data[coin[0]]['oblibene']}><StarIcon/></FavouriteButton>


        {Object.entries(data[coin[0]]).map((value) => {
            if(value[0] === "cena"){
                let procent
                if(values[o] === 0){
                    procent = Number(100 / (invest[o] / Number(value[1]))).toFixed(2);
                    console.log(values[o] + " : " + Number(value[1]) + " : " + invest[o])
                }else{
                procent = Number((values[o] + value[1]) / (values[o] / 100)).toFixed(2);
                }

                return(<SValueProcent><p>Profit: {show? (value[1] + values[o]).toFixed(2) + "Kč" : procent+ "%"} </p></SValueProcent>)
            }
            else if(value[0] === "pocet"){
                return(<>Pocet vlasněných coinů: {value[1]}</>)
            }
        })}
        <p>Hodnota vlastněných coinů: {values[o]}</p>
        </SRec>)
        }}
        })}
    </>)
}


export default ListOfYourCrypto