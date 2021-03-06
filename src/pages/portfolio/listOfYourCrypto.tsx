import { useState, useEffect, useRef, useCallback } from 'react'
import { ref, child, get, update, remove } from 'firebase/database'
import { db, auth } from '../../database/firebase';
import { SRec, SMainRec, DeleteButton } from '../../styles/myCrypto';
import { getMarketData } from '../../components/Graphs/marketData';
import { SButtonAdd, SButtonDelete, SValueProcent, FavouriteButton, SH1, ShowPercentage, Logo, SP } from '../../styles/myCrypto';
import Switch from 'react-switch';
import { useHistory } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactLoading from 'react-loading'

import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';




const ListOfYourCrypto = () => {
    const [uid] = useState(auth.currentUser?.uid);
    const [data, setData] = useState<any>([]);
    const [absoluteValue, setAbsoluteValue] = useState<number>(0);
    const [marketData, setMarketData] = useState<any[]>([]);
    const [values, setValues] = useState<any>([]);
    const [invest, setInvest] = useState<any>([]);
    const [showOnlyFavourites, setShowOnlyFavourites] = useState<boolean>(false);
    const [deletedCoin, setDeletedCoins] = useState<string[]>([]);
    const [countOfCoins, setCountOfCoins] = useState<number>(0)

    const [loading, setLoading] = useState(false)

    const [show, setShow] = useState<boolean>(false);

    const history = useHistory()

    const callData = () => {
        get(child(ref(db), 'users/' + uid)).then((snapshot) => {
            if (snapshot.exists()) {
                setData(snapshot.val())
            }
        }).catch((error: any) => {
            console.log(error);
        })
    }

    const callMarketData = () => {
        if (Object.keys(data).length != 0) {
            let ids: any = [];
            Object.entries(data).map((value) => {
                ids.push(data[value[0]].id)
            })
            let url = 'ids=' + ids[0]
            for (let index = 1; index < ids.length; index++) {
                url = url + '%2C' + ids[index];
            }
            const fetchMarketData = async () => {
                const mData = await getMarketData(url);
                setMarketData(mData);
            }
            fetchMarketData();
        }
    }

    const onceMarketAndDataAreSet = () => {
        if (
            previousValues.current.data !== data &&
            previousValues.current.marketData !== marketData
        ) {
            let number = 0;
            let number2 = 0;
            let xvalues: any = [];
            let yvalues: any = [];
            let favourite: any = [];
            let countCoins = 0

            Object.entries(data).map((coin) => {
                countCoins++
                try {
                    Object.entries(data[coin[0]]).map((value) => {

                        if (value[0] === 'pocet') {
                            if (value[1] === 0) {
                                xvalues.push(0);
                            } else {
                                if (marketData[0][data[coin[0]].id].czk != undefined) {
                                    number += Math.round(Number(value[1]) * marketData[0][data[coin[0]].id].czk)
                                    number2 = Math.round(Number(value[1]) * marketData[0][data[coin[0]].id].czk)
                                    xvalues.push(number2);
                                } else {
                                    let text = "neexistuje"
                                    xvalues.push(text)
                                }
                            }
                        }
                        else if (value[0] === 'investice') {
                            if (marketData[0][data[coin[0]].id].czk != undefined) {
                                yvalues.push(value[1]);
                            }
                        }
                        if (value[0] === 'oblibene') {
                            if (value[1] === 1) {
                                favourite.push(coin[0]);
                            }
                        }
                    })
                } catch { }


            })
            setAbsoluteValue(number);
            setValues(xvalues);
            setInvest(yvalues);
            setCountOfCoins(countCoins)
        }
    }


    useEffect(() => {
        callData();
    }, [])
    useEffect(() => {
        callMarketData();
    }, [data])
    useEffect(() => {
        onceMarketAndDataAreSet();
    }, [marketData])
    useEffect(() => {
        if (Object.keys(data).length != 0 && Object.keys(marketData).length) {
            setLoading(true)
        }
    }, [data, marketData])


    const previousValues = useRef({ data, marketData });


    const AddToFavourite = (coin: string) => {
        if (Number(data[coin]['oblibene']) === 1) {
            update(ref(db, 'users/' + uid + "/" + coin), {
                oblibene: 0
            }).then(() => {
                data[coin]['oblibene'] = 0;
                forceUpdate()
            }).catch((error: any) => {
                console.log("tohle se nepovedlo: " + error)
            })
        } else {
            update(ref(db, 'users/' + uid + "/" + coin), {
                oblibene: 1
            }).then(() => {
                data[coin]['oblibene'] = 1;
                forceUpdate()
            }).catch((error: any) => {
                console.log("tohle se nepovedlo: " + error)
            })
        }
    }
    const [, updateState] = useState<any>();
    const forceUpdate = useCallback(() => updateState({}), []);

    const CheckIfFav = (name: string) => {
        let id;
        if (data[name]['oblibene'] === 0) {
            id = "notFav"
        } else {
            id = 'isFav'
        }
        return id;
    }



    const ToggleFav = () => {
        const elemClass = document.getElementsByClassName('notFav') as HTMLCollectionOf<HTMLElement>;
        if (!showOnlyFavourites) {
            for (let index = 0; index < elemClass.length; index++) {
                elemClass[index].style.visibility = "hidden"
                elemClass[index].style.position = "absolute"
            }
        } else {
            for (let index = 0; index < elemClass.length; index++) {
                elemClass[index].style.visibility = "visible"
                elemClass[index].style.position = "relative"
            }
        }
        setShowOnlyFavourites(!showOnlyFavourites);
    }

    const DeleteCard = (name: string, id: string) => {
        remove(ref(db, 'users/' + uid + '/' + name)).then((snapshot) => {
            const elemId = document.getElementById(id);
            if (elemId != null)
                elemId.style.visibility = "hidden";

            deletedCoin.push(name)
            setCountOfCoins(countOfCoins - 1)
            setLoading(true)
            forceUpdate()
        }).catch((error) => {
            console.log(error);
        })
    }
    const SubmitDelete = (name: string, id: string) => {
        confirmAlert({
            title: 'Jste si jisti ??e chcete odstranit z??znam?',
            message: 'Tato akce nem????e b??t vr??cena.',
            buttons: [
                {
                    label: 'Ano',
                    onClick: () => {
                        DeleteCard(name, id)
                    }
                },
                {
                    label: 'Ne',
                    onClick: () => { }
                }
            ]
        });
    };



    let i = -1;
    let o = -1;
    let proc: any = 0;
    let valuesx: any = 0;
    let inv: any = 0;
    let j = -1;
    return (<>
        <SH1>M?? portfolio</SH1>
        <SButtonAdd
            onClick={() => { history.push('/newCrypto') }}
        >
            P??idat Coin
        </SButtonAdd>
        {countOfCoins > 0 ?         <SButtonDelete
            onClick={() => { history.push('/sellCrypto') }}
        >
            Odebrat Coin
        </SButtonDelete> : <></>}



        <SMainRec>
            <h2>Celkem</h2>
            <p>Celkov?? hodnota portfolia: {absoluteValue.toLocaleString()}</p>
            {Object.entries(data).map((coin) => {
                j++
                Object.entries(data[coin[0]]).map((value) => {
                    if (value[0] === "cena") {
                        if (invest[j] != undefined) {
                            valuesx = valuesx + value[1];
                            inv = inv + invest[j];
                        }
                    }
                })
                proc = Number(((absoluteValue + valuesx) / (inv)) * 100)
            })}
            <SValueProcent><p>Profit: {show ? (absoluteValue + valuesx).toLocaleString() + "K??" : proc.toFixed(2) + "%"} </p></SValueProcent>
            <Logo src='BCoin-logo.png' />

        </SMainRec>
        <p>Zobrazit pouze obl??ben?? <Switch checked={showOnlyFavourites} onChange={ToggleFav} /></p>
        <ShowPercentage>Procenta/????stka <Switch checked={show} onChange={() => setShow(!show)} /></ShowPercentage>
        {/* vyp????e m?? coiny krom obl??ben??ch */
            !loading ? <ReactLoading type="bars" color="balck" /> :
                Object.entries(data).map((coin) => {
                    o++;
                    if (!deletedCoin.some(item => coin[0] === item)) {
                        return (<SRec className={CheckIfFav(coin[0])} id={data[coin[0]]['id']}><h2 onClick={() => history.push('details/' + data[coin[0]]['id'])}>{coin[0]} <InfoIcon/></h2>
                            <br />

                            <FavouriteButton onClick={() => AddToFavourite(coin[0])} isFavourite={data[coin[0]]['oblibene']}><StarIcon /></FavouriteButton>
                            <DeleteButton onClick={() => SubmitDelete(coin[0], data[coin[0]]['id'])}><CloseIcon /></DeleteButton>


                            {Object.entries(data[coin[0]]).map((value) => {
                                if (value[0] === "cena") {
                                    let procent
                                    if (values[o] === 0) {
                                        procent = Number(100 / (invest[o] / Number(value[1]))).toFixed(2).toLocaleString();
                                    } else if (values[o] === "neexistuje") {
                                        procent = "Nejsme schopni ur??it."
                                    } else {
                                        procent = Number(((values[o] + value[1]) / (invest[o])) * 100).toFixed(2).toLocaleString();
                                    }

                                    return (<SValueProcent><p>Profit: {show ? (values[o] === "neexistuje" ? "Nejsme schopni ur??it." : (value[1] + values[o]).toLocaleString() + "K??") : procent + "%"} </p></SValueProcent>)
                                }
                                else if (value[0] === "investice") {
                                    return (<p>Celkov?? investice: {Number(value[1]).toLocaleString()} K??</p>)
                                }
                                else if (value[0] === "pocet") {
                                    return (<>Pocet vlasn??n??ch coin??: {Number(value[1]).toLocaleString()}</>)
                                }
                            })}
                            <p>Hodnota vlastn??n??ch coin??: {values[o] === "neexistuje" ? "Nejsme schopni ur??it." : Number(values[o]).toLocaleString() + "K??"}</p>
                            {values[o] === "neexistuje" ? <SP>Omlouv??me se, ale v na??ich zdroj??ch moment??ln?? neexistuj?? z??znamy o tomto coinu.<br />! Tento z??znam se nopo????t?? do celkov??ho sou??tu !</SP> : <></>}
                        </SRec>)
                    }
                }
                )}
    </>)
}


export default ListOfYourCrypto