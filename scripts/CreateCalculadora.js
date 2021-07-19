/// Classe responsavel por gerar os butões da calculadora
class DOOMCalculadora
{

    LOCAL_BUTTONS = document.getElementById("local-buttons")
    CAN_ADD_EVENTS = false

    DOOM_BUTTONS = {
        0 : {
            ocupa2 : false,
            type : "t-signal",
            value: "CE"
        },
        1 : {
            ocupa2 : false,
            type : "t-signal",
            value: "<<"
        },
        2 : {
            ocupa2 : false,
            type : "t-signal",
            value: "%"
        },
        3 : {
            ocupa2 : false,
            type : "t-signal",
            value: "/"
        },
        4 : {
            ocupa2 : false,
            type : "t-number",
            value: "7"
        },
        5 : {
            ocupa2 : false,
            type : "t-number",
            value: "8"
        },
        6 : {
            ocupa2 : false,
            type : "t-number",
            value: "9"
        },
        7 : {
            ocupa2 : false,
            type : "t-signal",
            value: "X"
        },
        8 : {
            ocupa2 : false,
            type : "t-number",
            value: "4"
        },
        9 : {
            ocupa2 : false,
            type : "t-number",
            value: "5"
        },
        10 : {
            ocupa2 : false,
            type : "t-number",
            value: "6"
        },
        11 : {
            ocupa2 : false,
            type : "t-signal",
            value: "-"
        },
        12 : {
            ocupa2 : false,
            type : "t-number",
            value: "1"
        },
        13 : {
            ocupa2 : false,
            type : "t-number",
            value: "2"
        },
        14 : {
            ocupa2 : false,
            type : "t-number",
            value: "3"
        },
        15 : {
            ocupa2 : false,
            type : "t-signal",
            value: "+"
        },
        16 : {
            ocupa2 : false,
            type : "t-number",
            value: "0"
        },
        17 : {
            ocupa2 : false,
            type : "t-number",
            value: "."
        },
        18 : {
            ocupa2 : true,
            type : "t-signal",
            value: "="
        },
    }

    constructor()
    {
        this.initializeDoom()
    }


    initializeDoom()
    {
        for (let buttonValue in this.DOOM_BUTTONS )
        {
            let button = this.DOOM_BUTTONS[buttonValue]
            let resultInneer = ``

            resultInneer = button.ocupa2 ?  "<div class='ocupa2" : "<div class='"
            resultInneer += ` grid-item button ${button.type}'><input class='btn btn-style' type='button' value='${button.value}'></div>`

            this.addToDoom(resultInneer)
        }

        this.CAN_ADD_EVENTS = true
    }

    addToDoom(htmlObject)
    {
        this.LOCAL_BUTTONS.innerHTML += htmlObject
    }
}