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


const table_sums = [
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
    let [lists_record, setRecord] = useState(["d", "p", "p"]);

    function create_list(id) {
        return cards.map(card =>
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
                <label htmlFor={card.name + id}>
                    <img className="card_icon" src={card.img} alt={card.name} id={card.name + id + "img"}/>
                </label>
            </div>);
    }

    const handleChecking = (card_name, id) => {
        let img;

        if (selected_list.length <= id) {
            let x = [...selected_list];
            while (x.length <= id) {
                x = [...x, ""];
            }
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
        } else if (selected_list[id] !== "") {
            img = document.getElementById(selected_list[id] + id + "img");
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
        } else {
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
        if (!selected_list.includes("") && selected_list.length >= 3) {
            handleSubbmision();
        }
    }

    useEffect(() => {
        checkUpdates();
    }, [selected_list]);

    function handleSubbmision() {
        let player_sum = 0;
        let dealer_sum = 0;
        let player_cards = [], dealer_cards = [];
        lists_record.map((c, i) => {
            if (i + 1 <= selected_list.length) {
                const card_value = document.querySelector(`input[name="card${i}"]:checked`).value
                if (c === "p") {
                    player_sum += parseInt(card_value);
                    player_cards.push(parseInt(card_value));
                    while (player_sum > 21 && player_cards.includes(11)) {
                        player_sum -= 10;
                        player_cards[player_cards.indexOf(11)] -= 10;
                    }
                } else {
                    dealer_sum += parseInt(card_value);
                    dealer_cards.push(parseInt(card_value));
                    while (dealer_sum > 21 && dealer_cards.includes(11)) {
                        dealer_sum -= 10;
                        dealer_cards[dealer_cards.indexOf(11)] -= 10;
                    }
                }
            }
        })
        const display_player = document.getElementById('player-display')
        const display_dealer = document.getElementById('dealer-display')
        const display_move = document.getElementById('move-display')
        display_player.innerHTML = `${player_sum}`;
        display_dealer.innerHTML = `${dealer_sum}`;
        if (player_sum > 21 || dealer_sum > 21) {
            display_move.innerHTML = `BUSTED!`;
        } else {
            display_move.innerHTML = `${tellBestMove(dealer_cards, dealer_sum, player_cards, player_sum)}`;
        }
    }

    function renderLists(whose) {
        let count = lists_record.length, list = [];
        for (let i = 0; i < count; i++) {
            if (lists_record[i] === whose) {
                list.push(<div className="cards_list_all" id={"d " + i}>{create_list(i)}</div>)
            }
        }
        return list;
    }

    function tellBestMove(dealer_cards, dealer_sum_b, player_cards, player_sum) {
        let dealer_sum = dealer_sum_b;
        if (dealer_sum_b > 12) {
            dealer_sum = 11;
        }
        if (player_cards.length > 2 && player_cards.includes(11)) {
            return searchAces(dealer_sum, player_sum);
        }
        if (player_cards[0] === player_cards[1] && player_cards.length === 2) {
            return searchPairs(dealer_cards[0], player_cards[0]);
        }
        if ((player_cards[0] === 11 || player_cards[1] === 11) && player_cards.length === 2) {
            return searchAces(dealer_cards, player_sum);
        }
        return searchSums(dealer_sum, player_sum);
    }

    function searchPairs(dealer_card, player_card) {
        for (let i = 0; i < 10; i++) {
            if (table_pairs[i][0] === player_card) {
                return table_pairs[i][dealer_card - 1];
            }
        }
    }

    function searchAces(dealer_sum, player_sum) {
        if (player_sum > 18) {
            return "STAND";
        }
        for (let i = 0; i < 7; i++) {
            if (table_aces[i][0] === player_sum) {
                return table_aces[i][dealer_sum - 1];

            }
        }
    }

    function searchSums(dealer_sum, player_sum) {
        if (player_sum < 8) {
            return "HIT";
        } else if (player_sum > 17) {
            return "STAND";
        } else {
            return table_sums[player_sum - 8][dealer_sum - 1];
        }
    }

    return (
        <>
            <header>
                <div id="header-container">
                    <div className="header-row">
                        <p>
                            Player:
                        </p>
                        <p id="player-display"></p>
                        <p>
                            Dealer:
                        </p>
                        <p id="dealer-display"></p>
                    </div>
                    <div className="header-row">
                        <p>
                            Best Move:
                        </p>
                        <p id="move-display"></p>
                    </div>
                </div>
            </header>
            <main>
                <form>
                    <h1>Enter dealer's cards</h1>
                    <div id="dealer-lists">
                        {renderLists("d")}
                    </div>
                    <h1>Enter player's cards</h1>
                    <div id="players-lists">
                        {renderLists("p")}
                    </div>
                </form>
                <div id="buttons-container">
                    <div id="buttons">
                        < div id="buttons-row-1">
                            <button id="dealer-add-button" onClick={() => setRecord([...lists_record, "d"])}>Dealer
                            </button>
                            <button id="player-add-button" onClick={() => setRecord([...lists_record, "p"])}>Player
                            </button>
                        </div>
                        <button id="reset-button" onClick={() => window.location.reload()}>Reset</button>
                    </div>
                </div>
            </main>
        </>
    )
}


export default App