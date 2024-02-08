console.log('connected')

const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')
const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('section')

const baseURL = 'http://localhost:4000'

function createCharacterCard(char) {
  console.log('creating the character card')
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}

function clearCharacters() {
  charContainer.innerHTML = ``
}

const getAllChars = () => {
  clearCharacters() 

  axios.get(`${baseURL}/characters`)
    .then((res) => {
      res.data.forEach(person => {
        createCharacterCard(person)
      })
    })
    .catch(theseHands => console.log(theseHands))
}

const getOneChar = (event) => {
  console.log("clear the chars off the page")
  clearCharacters()

  console.log('send axios request to get char data')
  axios.get(`${baseURL}/character/${event.target.id}`)
    .then(res => {
      console.log('This is the respones', res.data)
      createCharacterCard(res.data)
    })
    .catch(theseHands => console.log(theseHands))
}

/*
write function getOldChars
stop the form from refreshing
send a get request with a query with a key of 'age' and a value that should come from the ageInput element
loop over response array and create char card for each character
add event listener to fire function when get old characters button is clicked
*/
const getOldChars = (event) => {
  event.preventDefault()

  clearCharacters()

  axios.get(`${baseURL}/character/?age=${ageInput.value}`)
    .then(res => {
      for(let i = 0; i < res.data.length; i++){
        createCharacterCard(res.data[i])
      }
    })

    ageInput.value = ''
}


const createNewChar = event => {
  event.preventDefault() 

  clearCharacters() 

  const newLikes = [...newLikesText.value.split(',')]

  const body = {
    firstName: newFirstInput.value,
    lastName: newLastInput.value,
    gender: newGenderDropDown.value,
    age: newAgeInput.value,
    likes: newLikes
  }

  axios.post(`${baseURL}/character`, body)
    .then(res => {
      res.data.forEach(char => {
        createCharacterCard(char)
      })
    })

    newFirstInput.value = '' 
    newLastInput.value = '' 
    newGenderDropDown.value = 'female' 
    newAgeInput.value = '' 
    newLikesText.value = ''
}


getAllBtn.addEventListener('click', getAllChars)

for(let i = 0; i < charBtns.length; i++){
  console.log("right now we're adding an event listener to this element", charBtns[i])
  // Attaching a click even to each char button to invoke getOneChar
  charBtns[i].addEventListener('click', getOneChar)
}

ageForm.addEventListener('submit', getOldChars)

createForm.addEventListener('submit', createNewChar)

getAllChars()

