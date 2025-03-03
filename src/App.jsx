import {useEffect, useState} from 'react'
import './App.css'
import './index.css'
import img2 from './assets/2.png'
import img3 from './assets/3.png'
import img4 from './assets/4.png'
import img5 from './assets/5.png'
import img6 from './assets/6.png'
import img7 from './assets/7.png'
import img8 from './assets/8.png'
import img9 from './assets/9.png'
import img10 from './assets/10.png'
import imgJ from './assets/J.png'
import imgQ from './assets/Q.png'
import imgK from './assets/K.png'
import imgA from './assets/A.png'


const table = [
    [8, "HIT", "HIT", "HIT", "HIT", "HIT", "HIT", "HIT", "HIT", "HIT", "HIT"],
    [9, "HIT", "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "HIT", "HIT", "HIT", "HIT", "HIT"],
    [10, "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "HIT", "HIT"],
    [11, "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN"],
    [12, "HIT", "HIT", "STAND", "STAND", "STAND", "HIT", "HIT", "HIT", "HIT", "HIT"],
    [13, "STAND", "STAND", "STAND", "STAND", "STAND", "HIT", "HIT", "HIT", "HIT", "HIT"],
    [14, "STAND", "STAND", "STAND", "STAND", "STAND", "HIT", "HIT", "HIT", "HIT", "HIT"],
    [15, "STAND", "STAND", "STAND", "STAND", "STAND", "HIT", "HIT", "HIT", "HIT", "HIT"],
    [16, "STAND", "STAND", "STAND", "STAND", "STAND", "HIT", "HIT", "HIT", "HIT", "HIT"],
    [17, "STAND", "STAND", "STAND", "STAND", "STAND", "STAND", "STAND", "STAND", "STAND", "STAND"],
];

const table_aces = [
    [13, "HIT", "HIT", "HIT", "DOUBLE DOWN", "DOUBLE DOWN", "HIT", "HIT", "HIT", "HIT", "HIT"],
    [14, "HIT", "HIT", "HIT", "DOUBLE DOWN", "DOUBLE DOWN", "HIT", "HIT", "HIT", "HIT", "HIT"],
    [15, "HIT", "HIT", "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "HIT", "HIT", "HIT", "HIT", "HIT"],
    [16, "HIT", "HIT", "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "HIT", "HIT", "HIT", "HIT", "HIT"],
    [17, "STAND", "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "STAND", "STAND", "STAND", "STAND", "STAND"],
    [18, "STAND", "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "STAND", "STAND", "STAND", "STAND", "STAND"],
    [19, "STAND", "STAND", "STAND", "STAND", "STAND", "STAND", "STAND", "STAND", "STAND", "STAND"]
];

const table_pairs = [
    [2, "HIT", "HIT", "SPLIT", "SPLIT", "SPLIT", "SPLIT", "SPLIT", "HIT", "HIT", "HIT"],
    [3, "HIT", "HIT", "SPLIT", "SPLIT", "SPLIT", "SPLIT", "SPLIT", "HIT", "HIT", "HIT"],
    [4, "HIT", "HIT", "HIT", "HIT", "HIT", "HIT", "HIT", "HIT", "HIT", "HIT"],
    [5, "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "DOUBLE DOWN", "HIT", "HIT"],
    [6, "SPLIT", "SPLIT", "SPLIT", "SPLIT", "SPLIT", "HIT", "HIT", "HIT", "HIT", "HIT"],
    [7, "SPLIT", "SPLIT", "SPLIT", "SPLIT", "SPLIT", "SPLIT", "HIT", "HIT", "HIT", "HIT"],
    [8, "SPLIT", "SPLIT", "SPLIT", "SPLIT", "SPLIT", "SPLIT", "SPLIT", "SPLIT", "SPLIT", "SPLIT"],
    [9, "SPLIT", "SPLIT", "SPLIT", "SPLIT", "SPLIT", "STAND", "SPLIT", "SPLIT", "STAND", "STAND"],
    [10, "STAND", "STAND", "STAND", "STAND", "STAND", "STAND", "STAND", "STAND", "STAND", "STAND"],
    [11, "SPLIT", "SPLIT", "SPLIT", "SPLIT", "SPLIT", "SPLIT", "SPLIT", "SPLIT", "SPLIT", "SPLIT"]
];

const cards = [
    {name: "2", value: 2, img: img2},
    {name: "3", value: 3, img: img3},
    {name: "4", value: 4, img: img4},
    {name: "5", value: 5, img: img5},
    {name: "6", value: 6, img: img6},
    {name: "7", value: 7, img: img7},
    {name: "8", value: 8, img: img8},
    {name: "9", value: 9, img: img9},
    {name: "10", value: 10, img: img10},
    {name: "J", value: 10, img: imgJ},
    {name: "Q", value: 10, img: imgQ},
    {name: "K", value: 10, img: imgK},
    {name: "A", value: 11, img: imgA},
]

function App() {

    const [selected_list, setSelected] = useState([]);
    const list_of_card_lists = []

    const cards_list_dealer = create_list(0, "d");
    const cards_list_player1 = create_list(1, "p");
    const cards_list_player2 = create_list(2, "p");

    function create_list(id, whose) {
        let list = cards.map(card =>
            <div key={card.name}>
                <input
                    name={"card" + id}
                    type="radio"
                    id={card.name + id}
                    value={card.value}
                    className="inputs"
                    onChange={() => {
                        handleChecking(card.name, id);
                    }}
                    checked={selected_list[id] === card.name}
                />
                <label htmlFor={card.name+id}>
                    <img className="card_icon" src={card.img} alt={card.name} id={card.name +id+ "img"}/>
                </label>
            </div>);
        list_of_card_lists[id] = whose;
        return list;
    }

    const handleChecking = (card_name, id) => {
        let img;

        if (selected_list.length <= id){
            let x = [...selected_list,""];
            let new_list = x.map((c, i) => {
                if (i === id) {
                    return card_name;
                } else {
                    return c;
                }
            })
            setSelected(new_list);
            img = document.getElementById(card_name + id + "img");
            img.style.boxShadow = "0 0 12px 5px #61dafbaa"
            return;
        }
        if (selected_list[id] !== "") {
            img = document.getElementById(selected_list[id] +id+ "img");
            img.style.boxShadow = "none"
            const new_list = selected_list.map((c, i) => {
                    if (i === id) {
                        return card_name;
                    } else {
                        return c;
                    }
                }
            )
            setSelected(new_list);
            img = document.getElementById(card_name + id + "img");
            img.style.boxShadow = "0 0 12px 5px #61dafbaa"
        }
    }


    function checkUpdates() {
        if (selected_list.length >= 3) {
            handleSubbmision();
        }
    }

    useEffect(() => {
        checkUpdates();
        console.log("updated list",selected_list);
    }, [selected_list]);

    function handleSubbmision() {
        let player_sum = 0;
        let dealer_sum = 0;
        let dealer = 0, player1 = 0, player2 = 0;
        console.log(list_of_card_lists);
        list_of_card_lists.map((c, i) => {
            const card_value = document.querySelector(`input[name="card${i}"]:checked`).value
            if (c === "p") {
                player_sum += parseInt(card_value);
                if (player1 === 0) {
                    player1 = parseInt(card_value);
                } else if (player2 === 0) {
                    player2 = parseInt(card_value)
                }
            } else {
                dealer_sum += parseInt(card_value);
                if (dealer === 0) {
                    dealer = parseInt(card_value);
                }
            }
        })
        const display = document.getElementById('display')
        display.innerHTML = `Dealer: ${dealer_sum} Player: ${player_sum} ${tell_best_move(dealer, player1, player2)}`
    }

    function tell_best_move(dealer, player1, player2) {
        let player_sum = parseInt(player1) + parseInt(player2);
        if (player1 === player2) {
            for (let i = 0; i < 10; i++) {
                if (table_pairs[i][0] === parseInt(player1)) {
                    return table_pairs[i][dealer - 1];
                }
            }
        } else if (parseInt(player1) === 11 || parseInt(player2) === 11) {
            if (player_sum > 18) {
                return "STAND";
            }
            for (let i = 0; i < 7; i++) {
                if (table_aces[i][0] === player_sum) {
                    return table_aces[i][dealer - 1];

                }
            }
        } else {
            if (player_sum < 8) {
                return "HIT";
            } else if (player_sum > 17) {
                return "STAND";
            } else {
                return table[player_sum - 8][dealer - 1];
            }

        }
    }

    return (
        <>
            <form>
                <h1>Enter dealers card</h1>
                <div id="card_list_dealer" className="cards_list_all">{cards_list_dealer}</div>
                <h1>Enter player card</h1>
                <div id="card_list_player1" className="cards_list_all">{cards_list_player1}</div>
                <div id="card_list_player1" className="cards_list_all">{cards_list_player2}</div>
            </form>
            <div id="display"></div>
            <button onClick={() => window.location.reload()}></button>
        </>
    )
}


export default App