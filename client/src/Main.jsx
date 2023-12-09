
export default function Main() {
    return (
    <div className="main">
        {/* <button className="button" onClick = "document.location.href= 'clientp.html'">Арендовать парковочное место</button> */}
        <a className="button" href="autorize">Арендовать парковочное место</a>
        <div className="container">
            <div className="content">
                <h1>Наша парковка около метро - это удобно, быстро и безопасно!</h1>
                <p>Она расположена всего в нескольких шагах от станций метро Смоленская, Нижегородская и ЦСКА, что позволяет вам сэкономить время и избежать лишних затрат на поиск места для парковки. Мы предлагаем широкий выбор парковочных мест, чтобы удовлетворить потребности каждого клиента.
                    Кроме того, мы обеспечиваем высокий уровень безопасности нашей парковки. Наши сотрудники круглосуточно следят за безопасностью и порядком на территории парковки. Вы можете быть уверены, что ваш автомобиль будет защищен от кражи и повреждений.
                    Мы также предоставляем дополнительные услуги. Мы предлагаем Вам зарядные устройства для электромобилей и возможность оплаты парковки через мобильное приложение.
                    Выбирая нашу парковку, вы получаете надежность, безопасность и комфорт. Приходите к нам и убедитесь сами!</p>
            </div>
            
            <div className="map">
                <p><script alt = "map" type="text/javascript" charSet="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A36bd592a7932f35f3cf75b17847c6594325dc68cad1bb65bf666d124866fa6d5&amp;width=500&amp;height=400&amp;lang=ru_RU&amp;scroll=true"></script></p>
            </div>
        </div>
    
        {/* <button className="button" onClick = "document.location.href= 'sellMenu.html'">Вход для сотрудника</button> */}
        <a className="button" href="/login">Вход для сотрудника</a>
    </div>
    );
}