import { questions } from './Data'

export const carChoose = e =>{
  const origQ = e
    return fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/' + e.replace(/\W+/g, " ") + '?format=json',
      )
      .then((response) => {
        if(response.ok) {
            return response.json()
        } else {
            throw new Error('Server response wasn\'t OK');
        }
      })
      .then((json) => {
        if (json.Count > 0) {
          const RandomNum = Math.floor(Math.random() * json.Count-1) + 1
          // Gets the total count of items, picks a random number
          console.log('all res', RandomNum)
          return json.Results[RandomNum].Model_Name
        }
        else {
          return origQ + `? Are you sure thats a car?`
        }
        
        
        
      })
}

export const randomLatin = e =>{
    const randomNum = Math.floor((Math.random() * 100) + 1)
    const randomQ = questions.filter(e=> e.id === randomNum).pop()
    const nextQ = {type:'q', text:randomQ.text}
    return nextQ
}