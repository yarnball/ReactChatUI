import { questions } from './Data'

export const foodChoice = e =>{
// let food = {};
    return fetch('https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q39246&format=json', {
        mode: 'no-cors',
        headers:{
'Access-Control-Allow-Origin':'*',
},
        // headers:{
        // 'Access-Control-Allow-Origin':'*',
        // "Content-Type": "text/json"
        // },
        }
      )
      .then((response) => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error('Server response wasn\'t OK');
        }
      })
      .then((json) => {
        return json.results[0]
      })
}

export const randomLatin = e =>{
    const randomNum = Math.floor((Math.random() * 100) + 1)
    const randomQ = questions.filter(e=> e.id === randomNum).pop()
    const nextQ = {type:'q', text:randomQ.text}
    return nextQ
}