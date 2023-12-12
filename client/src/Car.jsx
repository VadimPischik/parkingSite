import { useEffect } from "react";
import getUrl from "./getUrl";
import axios from "axios";
import { useState } from "react";

export default function(props) {
    const [tariff, setTariff] = useState('');
    const [place, setPlace] = useState('');
    const [parking, setParking] = useState('');
    const [infoApp, setInfo] = useState({display: 'flex', });
    const [carApp, setCar] = useState({display: 'block', });
    var l = false;
    var data = props.data;
    const [tarifObj, setTarifObj] = useState([]);
    const [parkObj, setParkObj] = useState([]);
    const [plObj, setPlObj] = useState([]); 
    const [tarifs, setTarifs] = useState([]);
    const [park, setPark] = useState([]);
    const [pl, setPl] = useState([]); 
    useEffect(() => {
        if (data.tarif && data.place) {
            axios.get(getUrl(`/api/tariff/${data.tarif}/`))
            .then(function (response) {
                if (response.status == 200) {
                    setTariff(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

            var n = 1;

            axios.get(getUrl(`/api/palce/${data.place}/`))
            .then(function (response) {
                if (response.status == 200) {
                    setPlace(response.data);
                    n = response.data.parking;
                }
            })
            .catch(function (error) {
                console.log(error);
                setInfo({display: 'none',});
            });

            axios.get(getUrl(`/api/parking/${n}/`))
            .then(function (response) {
                if (response.status == 200) {
                    setParking(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        } else {
            setInfo({display: 'none',});
        }

        axios.get(getUrl(`/api/tariff/`))
            .then(function (response) {
                var tarifs;
                if (response.status == 200) {
                    setTarifObj(response.data);
                    tarifs = response.data.map((item) => (<option key={item.id}>{item.price} {item.description}</option>));
                    setTarifs(tarifs);
                }
            })
            .catch(function (error) {
                console.log(error);
                setInfo({display: 'none',});
        });

        axios.get(getUrl(`/api/parking/`))
            .then(function (response) {
                var park;
                if (response.status == 200) {
                    console.log(response.data);
                    setParkObj(response.data);
                    park = response.data.map((item) => (<option key={item.id}> {item.address}</option>));
                    setPark(park);
                }
            })
            .catch(function (error) {
                console.log(error);
                setInfo({display: 'none',});
        });

        axios.get(getUrl(`/api/palce/`))
        .then(function (response) {
            if (response.status == 200) {
                setPlObj(response.data);
                setPl(response.data.map((item) => (<option key={item.id}>{item.number}</option>)));
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    , [] );

    function carDel() {
        axios.delete(getUrl(`/api/auto/${data.id}/`))
        .then(function (response) {
            if (response.status == 204) {
                setCar({display: 'none',});
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    function infoDel() {
        axios.put(getUrl(`/api/auto/${data.id}/`), {'model': data.model, 'tarif': null, 'place': null, 'owner': data.owner})
        .then(function (response) {
            if (response.status == 200) {
                setInfo({display: 'none', });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    if (l) return('');

    function changeParking() {
        axios.get(getUrl(`/api/palce/`))
        .then(function (response) {
            if (response.status == 200) {
                setPl(response.data.map((item) => (<option key={item.id}>{item.number}</option>)));
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    function search(event, obj, fields, f) {
        var v = event.target.previousSibling.value.toString().toLowerCase();
        // console.log(obj);
        // console.log(fields);
        // console.log(f);
        // console.log(obj[0][fields[1]].toString());
        if (v != undefined)
            obj = obj.filter((item) => {
                for (let i = 0; i < fields.length; i++) {
                    if (item[fields[i]].toString().toLowerCase().indexOf(v) >= 0)
                        return true;
                }
            });
        console.log(obj);
        obj = obj.map((item) => (<option key={item.id}> {fields.length > 1 ? item[fields[1]] : ''} {item[fields[0]]}</option>));
        f(obj);
    }

    return(
        <div className="car" style={carApp}>
            <div className="car_block">
                <div className="car_block_text">
                    <div className="car_item">
                        <span> Машина: </span>
                        <span> {data.model} </span>
                    </div>
                </div>
                <div className="car_del">
                    <img src="/bin.png" alt="" onClick={carDel}/>
                </div>
            </div>
            <div className="car_block" style={infoApp}>
                <div className="car_block_text">
                    <div className="car_item">
                        <span>Тариф: </span>
                        <span> {tariff.description} </span>
                    </div>
                    <div className="car_item">
                        <span>Цена: </span>
                        <span>{tariff.price}</span>
                    </div>
                    <div className="car_item">
                        <span>Парковочное место: </span>
                        <span>{parking.address}: #{place.number}</span> 
                    </div>
                </div>
                <div className="car_del">
                    <img src="/bin.png" alt="" onClick={infoDel}/>
                </div>
            </div>
            <form className="car_changer" id="car_changer">
                <div className="form_data">
                    <input type="text" placeholder="Новая машина"/> <br />
                    <div className="form_search_line">
                        <select type="text" placeholder="Новый тариф">
                            {tarifs}
                        </select>
                        <input type="text" placeholder="Поиск" name="tarif"/>
                        <img src="search.png" alt="search" onClick={(event) => search(event, tarifObj, ['description', 'price'], setTarifs)}/>
                    </div>
                        
                    <div className="form_search_line">
                        <select type="text" placeholder="Парковка" onChange={changeParking}>
                            {park}
                        </select>
                        <input type="text" placeholder="Поиск" />
                        <img src="search.png" alt="search" onClick={(event) => search(event, parkObj, ['address'], setPark)}/>
                    </div>
                    <div className="form_search_line">
                        <select type="text" placeholder="Место">
                            {pl}
                        </select>
                        <input type="text" placeholder="Поиск" />
                        <img src="search.png" alt="search" onClick={(event) => search(event, plObj, ['number'], setPl)}/>
                    </div>
                    <input type="submit" value="Изменить"/>
                </div>
                <div className="form_search">
                    {/* <div className="form_search_line"><input type="text" placeholder="Поиск" /><img src="search.png" alt="search"  /></div> */}
                    
                </div>
            </form> 
        </div>
    );
}