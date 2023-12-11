import { useEffect, useState } from "react";
import axios from 'axios';
import getUrl from './getUrl';
import Cookies from 'universal-cookie';
import Car from "./Car";

export default function Account() {
    const cookies = new Cookies(null, { path: '/' });
    var client = cookies.get('client');
    const [logText, setLog] = useState('');
    const [btnsText, setBtns] = useState('');
    const [carsObj, setCars] = useState([]);
    var re = /^[\+][\d\ ]{10,15}\d$/;
    var cars = [];
    function clientSave(event) {
        event.preventDefault();
        var f = document.getElementById('client');
        console.log(f);
        var i = f.getElementsByTagName('input');
        if (re.test(i[1].value) || i[i].value == '') {
            var data = {
                "name": i[0].value,
                "phone": i[1].value
            };
            if (data['name'] == '') data['name'] = client.name;
            if (data['phone'] == '') data['phone'] = client.phone;
            axios.put(getUrl(`/api/client/${client.id}/`), data)
            .then(function (response) {
                console.log(response.data);
                if (response.status == 200) {
                    setLog("Данные сохранены");
                }
                var cl = response.data;
                cl['login'] = i[0].value;
                cl['password'] = i[1].value;
                cookies.set("client", response.data, { path: '/' });
            })
            .catch(function (error) {
                console.log(error);
                setLog("Что-то пошло не так");
                });
        } else {
            setLog("Указан неверный формат номера телефона");
        }
    }

    function logOut() {
        cookies.remove('client', { path: '/' });
        document.location.href = '/autorize';
    }

    function delAccount() {
        axios.delete(getUrl(`/api/client/${client.id}/`))
            .then(function (response) {
                console.log(response.data);
                if (response.status == 204) {
                    setBtns("Аккаунт удалён");
                    cookies.remove('client', { path: '/' });
                    document.location.href = '/autorize';
                } else setBtns("Что-то пошло не так");
            })
            .catch(function (error) {
                console.log(error);
                setLog("Что-то пошло не так");
            });
    }

    useEffect(() => {
        axios.get(getUrl(`/api/auto/`))
        .then(function (response) {
            if (response.status == 200) {
                cars = response.data;
                console.log(cars[0]);
                cars = cars.map((item, index) => (<Car data={item} key={index}/>));
                setCars(cars);
            }
            console.log(cars);
            // var cl = response.data;
            // cl['login'] = i[0].value;
            // cl['password'] = i[1].value;
            // cookies.set("client", response.data, { path: '/' });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    , []);

    // for (let i = 0; i < cars.length; i++) {
    //     console.log(cars[i]);
    // }
    
    return(
        <div className="account">
            <div className="account_inner">
                <div className="account_data">
                    <div className="client">
                        <form name="client" id="client" onSubmit={(event) => clientSave(event)}>
                            <div className="form_line">
                                <span>Имя: {client.name}</span> <input type="text" required placeholder="Новое имя"/>
                            </div>
                            <div className="form_line">
                                <span>Телефон: {client.phone}</span> <input type="tel" required placeholder="Новый телефон"/>
                            </div>
                            <div className="form_line">
                                <input type="submit" value="Сохранить"/> <span> {logText} </span>
                            </div>
                        </form>
                    </div>
                    <div className="places">
                        {carsObj}
                    </div>
                </div>
                <div className="account_btns">
                    <span onClick={logOut}>Выйти</span> 
                    <span onClick={delAccount}>Удалить аккаунт</span>
                    <div>{btnsText}</div>
                </div>
            </div>
        </div>
    );
}