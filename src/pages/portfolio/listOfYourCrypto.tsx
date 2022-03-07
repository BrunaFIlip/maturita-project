import {useState, useEffect, useRef, useCallback} from 'react'
import {ref, child, get, update, remove} from 'firebase/database'
import { db, auth } from '../../database/firebase';
import { SRec, SMainRec } from '../../styles/myCrypto';
import { getMarketData } from '../../components/Graphs/marketData';
import { SButtonAdd, SButtonDelete, SValueProcent, FavouriteButton, SH1, ShowPercentage, Logo } from '../../styles/myCrypto';
import StarIcon from '@mui/icons-material/Star';
import Switch from 'react-switch';
import CloseIcon from '@mui/icons-material/Close';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 




const ListOfYourCrypto = () => {
    const[uid] = useState(auth.currentUser?.uid);
    const[data, setData] = useState<any>({});
    const[absoluteValue, setAbsoluteValue] = useState<number>(0);
    const[marketData, setMarketData] = useState<any[]>([]);
    const[values, setValues] = useState<any>([]);
    const[invest, setInvest] = useState<any>([]);
    const[showOnlyFavourites, setShowOnlyFavourites] = useState<boolean>(false);
    
    const[show, setShow] = useState<boolean>(false);



    useEffect(() => {
        let ids:any = [];
        Object.entries(data).map((value) => {
            ids.push(data[value[0]].id)
        })
        let url = 'ids='+ids[0]
        for (let index = 1; index < ids.length; index++) {
            url = url+'%2C'+ids[index];
        }
        const fetchMarketData = async () => {
            const mData = await getMarketData(url);
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
                try{
                    Object.entries(data[coin[0]]).map((value) => {
                    if(value[0] === 'pocet'){
                        if(value[1] === 0){
                            xvalues.push(0);
                        }else{
                            number += Math.round(Number(value[1]) * marketData[0][data[coin[0]].id].czk)
                            number2 = Math.round(Number(value[1]) * marketData[0][data[coin[0]].id].czk)
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
                }catch{
                    console.log("error: něco se nepovedlo")
                }
                
                
        })
        setAbsoluteValue(number);
        setValues(xvalues);
        setInvest(yvalues);
    }
    },[marketData])


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
    }
    const [, updateState] = useState<any>();
    const forceUpdate = useCallback(() => updateState({}), []);

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
        const elemClass = document.getElementsByClassName('notFav') as HTMLCollectionOf<HTMLElement>;
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

    const myContainer = useRef(null)


    const DeleteCard = (name:string, id:string) => {
        remove(ref(db, 'users/'+uid+'/'+name)).then((snapshot) => {
            const elemId = document.getElementById(id);
            if(elemId != null)
            elemId.style.visibility = "hidden";
        }).catch((error) => {
            console.log(error);
        })
    }
    const submitDelete = (name:string, id:string) => {
        confirmAlert({
          title: 'Jste si jisti že chcete odstranit záznam?',
          message: 'Tato akce nemůže být vrácena.',
          buttons: [
            {
              label: 'Amp',
              onClick: () => DeleteCard(name, id)
            },
            {
              label: 'Ne',
              onClick: () => {}
            }
          ]
        });
      };



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
            {/* <MainPieChart/> */}
            <Logo src='BCoin-logo.png'/>

        </SMainRec>
        <p>Zobrazit pouze oblíbené <Switch checked={showOnlyFavourites} onChange={ToggleFav}/></p>
        <ShowPercentage>Procenta/Částka <Switch checked={show} onChange={() => setShow(!show)}/></ShowPercentage>
        {/* vypíše mé coiny krom oblíbených */
        Object.entries(data).map((coin) =>{
            o++;
            return(<SRec className={CheckIfFav(coin[0])} id={data[coin[0]]['id']}><h2>{coin[0]}</h2>
        <br/>
        
        <FavouriteButton onClick={() => AddToFavourite(coin[0])} isFavourite={data[coin[0]]['oblibene']}><StarIcon/></FavouriteButton>
        <CloseIcon onClick={() => submitDelete(coin[0], data[coin[0]]['id'])}/>


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
        }
        )}
    </>)
}


export default ListOfYourCrypto