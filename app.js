const GRID_PARENT_ID = "hash-grid"
const GRID_CLASS = "hash-cell"
const TEXT_INPUT = "text-input"
const GRID_SIZE = 11

const COLOR_MAPPING = {
    '0': '#FF262C',
    '1': '#FF880E',
    '2': '#FFC511',
    '3': '#11C350',
    '4': '#00C2B6',
    '5': '#09A8BF',
    '6': '#0BA4E2',
    '7': '#006CFE',
    '8': '#4B48D0',
    '9': '#A941D9',
    'a': '#FFE29B',
    'b': '#9A7854',
    'c': '#00B187',
    'd': '#dcbeff',
    'e': '#5D7C8A',
    'f': '#62C3CB',
}

const DOWNLOAD_EXTENSION = ".png"
const MAX_FILE_LENGTH = 30
const DEFAULT_FILE_LENGTH = "hash"

window.onload = function () {
    spawnGrid();
    drawGrid();
}

const spawnGrid = function () {
    const grid = document.getElementById(GRID_PARENT_ID)

    for (let i = 0; i < GRID_SIZE; i++) {
        for (let i = 0; i < GRID_SIZE; i++) {
            const cell = document.createElement("div")
            cell.setAttribute("class", GRID_CLASS)
            grid.appendChild(cell)
        }
    }

    return grid
}

const getTextFromInput = function () {
    const input = document.getElementById(TEXT_INPUT)
    return input ? input.value : ''
}

const getHash = function (str) {
    return CryptoJS.SHA512(str).toString(CryptoJS.enc.Hex);
}

const getColorFromCharacter = function (char) {
    return COLOR_MAPPING[char] || "#000"
}


const drawGrid = function () {
    const grid = document.getElementById(GRID_PARENT_ID)
    const cells = grid.children

    const text = getTextFromInput()
    const hash = getHash(text).toLowerCase()

    for (let i = 0; i < hash.length; i++) {
        const char = hash[i]
        if (cells[i]) {
            cells[i].style.backgroundColor = getColorFromCharacter(char)
        }
    }
}

const downloadGrid = function () {
    const grid = document.getElementById(GRID_PARENT_ID)
    const text = getTextFromInput()
    const filename = text.substring(0, MAX_FILE_LENGTH).trim() || DEFAULT_FILE_LENGTH

    window.domtoimage.toBlob(grid)
        .then(function (blob) {
            window.saveAs(blob, filename + DOWNLOAD_EXTENSION);
        });
}