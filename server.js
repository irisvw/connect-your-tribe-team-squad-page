import express from 'express'

import { Liquid } from 'liquidjs';


// Vul hier jullie team naam in
const teamName = 'peak';

const app = express()

app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express()); 

app.set('views', './views')

app.use(express.urlencoded({extended: true}))




app.post('/', async function (request, response) {
  await fetch('https://fdnd.directus.app/items/messages/', {
    method: 'POST',
    body: JSON.stringify({
      for: `Team ${teamName}`,
      from: request.body.from,
      text: request.body.text
    }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  response.redirect(303, '/')
})



// fetching Book Drama 
app.get('/', async function (request, response) {

  const filter = request.query.filter

  // Haal alle personen uit de WHOIS API op, van dit jaar
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?sort=name&fields=*,squads.squad_id.name,squads.squad_id.cohort&filter={%22_and%22:[{%22fav_book_genre%22:%22'+filter+'%22},{%22squads%22:{%22squad_id%22:{%22tribe%22:{%22name%22:%22FDND%20Jaar%201%22}}}},{%22squads%22:{%22squad_id%22:{%22name%22:%221G%22}}},{%22squads%22:{%22squad_id%22:{%22cohort%22:%222425%22}}}]}');
  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json();

  response.render('index.liquid', { 
    teamName: teamName,
    persons: personResponseJSON.data,
  })
})

app.set('port', process.env.PORT || 8000)

if (teamName == '') {
  console.log('Voeg eerst de naam van jullie team in de code toe.')
} else {
  app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
  })
}

