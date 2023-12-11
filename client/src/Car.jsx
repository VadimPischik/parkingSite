import { useEffect } from "react";
import getUrl from "./getUrl";
import axios from "axios";
import { useState } from "react";

export default function(props) {
    const [tariff, setTariff] = useState('');
    const [place, setPlace] = useState('');
    const [parking, setParking] = useState('');
    console.log(props);
    var data = props.data;
    useEffect(() => {
        axios.get(getUrl(`/api/tariff/${data.tarif}/`))
        .then(function (response) {
            if (response.status == 200) {
                setTariff(response.data);
            }
            // var cl = response.data;
            // cl['login'] = i[0].value;
            // cl['password'] = i[1].value;
            // cookies.set("client", response.data, { path: '/' });
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
            // var cl = response.data;
            // cl['login'] = i[0].value;
            // cl['password'] = i[1].value;
            // cookies.set("client", response.data, { path: '/' });
        })
        .catch(function (error) {
            console.log(error);
        });

        axios.get(getUrl(`/api/parking/${n}/`))
        .then(function (response) {
            if (response.status == 200) {
                setParking(response.data);
            }
            // var cl = response.data;
            // cl['login'] = i[0].value;
            // cl['password'] = i[1].value;
            // cookies.set("client", response.data, { path: '/' });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    , [] );

    return(
        <div className="car">
            <div className="car_item">
                <span>Машина:</span>
                <span>{data.id}</span> 
            </div>
            <div className="car_item">
                <span>Тариф:</span>
                <span>{tariff.description} </span> <br />
                <span>Цена: </span>
                <span>{tariff.price}</span>
            </div>
            <div className="car_item">
                <span>Парковочное место: </span>
                <span>{parking.address}: #{place.number}</span> 
            </div>
        </div>
    );
}