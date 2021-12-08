import {useState, useEffect, useRef} from 'react'
import {ref, child, get} from 'firebase/database'
import { db, auth } from '../../database/firebase';
import {Button} from 'reactstrap'
import { SRec } from '../../styles/myCrypto';
import MainPieChart from '../../components/Graphs/pieChart';
import { getMarketData } from '../../components/Graphs/marketData';
import { SButtonAdd, SButtonDelete } from '../../styles/myCrypto';


const ListOfYourCrypto = () => {
    const[uid, setUid] = useState(auth.currentUser?.uid);
    const[data, setData] = useState<any>({});
    const[show, setShow] = useState<boolean>(false);
    const[absoluteValue, setAbsoluteValue] = useState<number>(0);
    const[marketData, setMarketData] = useState();
    const[values, setValues] = useState<any>([]);



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

        Object.entries(data).map((coin) => {
            let x = 0;
            while(true){
                try{
                    console.log(marketData[x]['name'] + ' rovná se ' + coin[0])
                    if(marketData[x]['name'] == coin[0]){
                        Object.entries(data[coin[0]]).map((value) => {
                            if(value[0] == 'pocet'){
                                console.log()
                                number += Math.round(Number(value[1]) * marketData[x]['current_price'])
                                number2 = Math.round(Number(value[1]) * marketData[x]['current_price'])
                                console.log(Math.round(Number(value[1]) * marketData[x]['current_price']))
                                xvalues.push(number2);
                            }
                        })
                    }
                }catch{
                    break;
                }
                x++;
            }
            // number = number + data[coin[0]]['pocet'] * marketData[coin[0]]['current_price']
        })
        setAbsoluteValue(number);
        setValues(xvalues);
    }
    },[marketData])

    // Object.entries(data).map((coin) => {
    //     console.log(coin)
    // });


    let i = -1;
    return(<>
        <h1>Mé portfolio</h1>
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

        <SRec>
            <h2>Celkem</h2>
            <p>Celková hodnota: {absoluteValue}</p>
            <MainPieChart/>


        </SRec>
        {Object.entries(data).map((coin) =>{
            i++;
            return(<SRec onClick={()=>setShow(!show)}><h2>{coin[0]}</h2>
        <br/>
        {Object.entries(data[coin[0]]).map((value) => {
            if(value[0] == "cena"){
                let procent = Number((values[i] / ((Number(value[1]) * -1) / 100)) - 100).toFixed(2);
                return(<p>Profit: {value[1] + values[i]} ({procent}%) <br/></p>)
            }
            else if(value[0] == "pocet"){
                return(<>Pocet coinu: {value[1]}</>)
            }
        })}
        <p>hodnota: {values[i]}</p>
        </SRec>)
        })}
    </>)
}


export default ListOfYourCrypto