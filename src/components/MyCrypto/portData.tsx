import { useState, useEffect } from "react";
import { getMarketData } from "../Graphs/marketData";
import { db, auth } from "../../database/firebase";
import {ref, child, get} from 'firebase/database'



const PortData = () => {
    const[uid, setUid] = useState(auth.currentUser?.uid);
    const[totalValue, setTotalValue] = useState<number>();
    const[increase, setInscrease] = useState<number>();
    const[data, setData] = useState([]);
    //koláčový graf, kolik kterých coinů mám

    useEffect(() => {
        const fetchMarketData = async () => {
            const marketData = await getMarketData();
            setData(marketData);
        }
        fetchMarketData(); 
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
}


export default PortData;