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


app.get('/', async function (request, response) {
  // Haal alle personen uit de WHOIS API op, van dit jaar
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?sort=name&fields=*,squads.squad_id.name,squads.squad_id.cohort&filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"name":"1G"}}},{"squads":{"squad_id":{"cohort":"2425"}}}]}');
  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json();

  const messagesResponse = await fetch(`https://fdnd.directus.app/items/messages/?filter={"for":"Team ${teamName}"}`);
  const messagesResponseJSON = await messagesResponse.json();

  let shelf1 = personResponseJSON.data.slice(0, 8);
  let shelf2 = personResponseJSON.data.slice(8, 16);
  let shelf3 = personResponseJSON.data.slice(16, 24);
  let shelf4 = personResponseJSON.data.slice(24);

  response.render('index.liquid', { 
    teamName: teamName,
    shelf1: shelf1,
    shelf2: shelf2,
    shelf3: shelf3,
    shelf4: shelf4,
    persons: personResponseJSON.data,
    messages: messagesResponseJSON.data
  })
})

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


app.set('port', process.env.PORT || 8000)

if (teamName == '') {
  console.log('Voeg eerst de naam van jullie team in de code toe.')
} else {
  app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
  })
}