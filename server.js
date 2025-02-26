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

  console.log(personResponseJSON.data);

  response.render('index.liquid', { 
    teamName: teamName,
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


app.get('/sort', async function (request, response) {
  // Haal alle personen uit de WHOIS API op, van dit jaar
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?sort=birthdate&fields=*,squads.squad_id.name,squads.squad_id.cohort&filter={"_and":[{"birthdate":{"_null":false}},{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"name":"1G"}}},{"squads":{"squad_id":{"cohort":"2425"}}}]}');
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

