import {useState, useEffect, useRef} from 'react'
import {ref, child, get} from 'firebase/database'
import { db, auth } from '../../database/firebase';
import {Button} from 'reactstrap'
import { SRec } from '../../styles/myCrypto';
import MainPieChart from '../../components/Graphs/pieChart';
import { getMarketData } from '../../components/Graphs/marketData';
import { SButtonAdd, SButtonDelete, SValueProcent } from '../../styles/myCrypto';
import { SButton } from '../../styles/newCrypto';


const ListOfYourCrypto = () => {
    const[uid, setUid] = useState(auth.currentUser?.uid);
    const[data, setData] = useState<any>({});
    const[absoluteValue, setAbsoluteValue] = useState<number>(0);
    const[marketData, setMarketData] = useState();
    const[values, setValues] = useState<any>([]);
    const[invest, setInvest] = useState<any>([]);

    
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

        Object.entries(data).map((coin) => {
            let x = 0;
            while(true){
                try{
                    console.log(marketData[x]['name'] + ' rovná se ' + coin[0])
                    if(marketData[x]['name'] == coin[0]){
                        Object.entries(data[coin[0]]).map((value) => {
                            if(value[0] == 'pocet'){
                                if(value[1] == 0){
                                    xvalues.push(0);
                                }else{
                                console.log()
                                number += Math.round(Number(value[1]) * marketData[x]['current_price'])
                                number2 = Math.round(Number(value[1]) * marketData[x]['current_price'])
                                console.log(Math.round(Number(value[1]) * marketData[x]['current_price']))
                                xvalues.push(number2);
                                }
                            }
                            else if(value[0] == 'investice'){
                                yvalues.push(value[1]);
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
    }
    },[marketData])

    



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
        <SButton onClick={() => setShow(!show)}>Procenta/Hodnota</SButton>


        <SRec>
            <h2>Celkem</h2>
            <p>Celková hodnota: {absoluteValue}</p>
            <MainPieChart/>


        </SRec>
        {Object.entries(data).map((coin) =>{
            i++;
            return(<SRec><h2>{coin[0]}</h2>
        <br/>
        {Object.entries(data[coin[0]]).map((value) => {
            if(value[0] == "cena"){
                let procent
                if(values[i] == 0){
                    procent = Number(100 / (invest[i] / Number(value[1]))).toFixed(2);
                    console.log(values[i] + " : " + Number(value[1]) + " : " + invest[i])
                }else{
                procent = Number((values[i] + value[1]) / (values[i] / 100)).toFixed(2);
                }

                return(<SValueProcent><p>Profit: </p> {show? <p>{value[1] + values[i]}</p> : <p>{procent}% </p>}</SValueProcent>)
            }
            else if(value[0] == "pocet"){
                return(<>Pocet vlasněných coinů: {value[1]}</>)
            }
        })}
        <p>Hodnota vlastněných coinů: {values[i]}</p>
        </SRec>)
        })}
    </>)
}


export default ListOfYourCrypto