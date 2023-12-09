
export default function Header() {
    return (
        <header>
            <img src="iconlogo.jpg" alt="logo" className="logo" />
            <h1>Автостоянки Москвы</h1>
            <div className="dropdown">
                <span>Парковки</span>
                <div className="dropdown-content">
                    <p>метро Смоленская</p>
                    <p>метро Нижегородская</p>
                    <p>метро ЦСКА</p>
                </div>
            </div>

            <div className="dropdown">
                <span>Контакты</span>
                <div className="dropdown-content">
                    <p>Содержимое выпадающего текста 2</p>
                </div>
            </div>
        </header>
    );
}