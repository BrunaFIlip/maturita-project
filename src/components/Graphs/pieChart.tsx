import { PieChart } from 'react-minimal-pie-chart';
import {useState, useEffect, useRef} from 'react'
import {ref, child, get} from 'firebase/database'
import { db, auth } from '../../database/firebase';
import { SPie } from '../../styles/myCrypto';
import { getMarketData } from './marketData';

const MainPieChart = () => {
    const[uid, setUid] = useState(auth.currentUser?.uid);
    const[data, setData] = useState<any>({});
    const[marketData, setMarketData] = useState();
    const[values, setValues] = useState<any>([]);

    let colors: any = [];
    let chartData: dataType[] = [];
    type dataType = {
        title: string,
        value: any,
        color: string,
    }
    var randomColor = require('randomcolor');


    useEffect(() => {
        const fetchMarketData = async () => {
            const mData = await getMarketData();
            setMarketData(mData);

        }
        fetchMarketData();
    }, [])
    
    const previousValues = useRef({ data, marketData });

    useEffect(() => {

        if (
            previousValues.current.data !== data &&
            previousValues.current.marketData !== marketData
          ) {
        let number = 0;
        let xvalues: any = [];
        Object.entries(data).map((coin) => {
            let x = 0;
            while(true){
                try{
                    if(marketData[x]['name'] == coin[0]){
                        Object.entries(data[coin[0]]).map((value) => {
                            if(value[0] == 'pocet'){
                                console.log()
                                number = Math.round(Number(value[1]) * marketData[x]['current_price'])
                                xvalues.push(number);
                            }
                        })
                    }
                }catch{
                    break;
                }
                x++;
            }
        })
        setValues(xvalues);
    }
    }, [data])


    useEffect(() => {
        get(child(ref(db), 'users/'+uid)).then((snapshot) => {
            if(snapshot.exists()){
                setData(snapshot.val())
            }
        }).catch((error:any) => {
            console.log(error);
        })
    }, [marketData])

    let help = 0;
    {Object.entries(data).map((coin) =>{
    {Object.entries(data[coin[0]]).map((value) => {
        if(value[0] == "cena"){
            let color = randomColor();
            colors.push(color);
        chartData.push({title: coin[0], value: values[help], color: colors[help]})
        }
    })}
    help++;
    })}

    
    return(
        <SPie>
        <PieChart   
        data={chartData} 
        label={(data) => data.dataEntry.title} 
        labelPosition={65}
/>
        </SPie>
    )
}

export default MainPieChart