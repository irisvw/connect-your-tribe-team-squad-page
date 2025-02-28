import express from 'express'
import { Liquid } from 'liquidjs';

// Vul hier jullie team naam in
const teamName = 'peak';
const app = express();

app.use(express.static('public'));
const engine = new Liquid();
app.engine('liquid', engine.express()); 
app.set('views', './views');
app.use(express.urlencoded({extended: true}));

app.post('/person/:id/', async function (request, response) {
  await fetch('https://fdnd.directus.app/items/messages/', {
    method: 'POST',
    body: JSON.stringify({
      for: `Team ${teamName} / ${request.params.id}`,
      from: request.body.from,
      text: request.body.text
    }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  response.redirect(303, '/');
})

// fetching book filter 
app.get('/', async function (request, response) {

  let filter = request.query.filter;
  let personResponse;
  
  if (filter) {
    personResponse = await fetch('https://fdnd.directus.app/items/person/?sort=name&fields=*,squads.squad_id.name,squads.squad_id.cohort&filter={%22_and%22:[{%22fav_book_genre%22:%22'+filter+'%22},{%22squads%22:{%22squad_id%22:{%22tribe%22:{%22name%22:%22FDND%20Jaar%201%22}}}},{%22squads%22:{%22squad_id%22:{%22name%22:%221G%22}}},{%22squads%22:{%22squad_id%22:{%22cohort%22:%222425%22}}}]}');
  } else {
    personResponse = await fetch('https://fdnd.directus.app/items/person/?sort=name&fields=*,squads.squad_id.name,squads.squad_id.cohort&filter={%22_and%22:[{%22squads%22:{%22squad_id%22:{%22tribe%22:{%22name%22:%22FDND%20Jaar%201%22}}}},{%22squads%22:{%22squad_id%22:{%22name%22:%221G%22}}},{%22squads%22:{%22squad_id%22:{%22cohort%22:%222425%22}}}]}');
  }

  const personResponseJSON = await personResponse.json();

  const messagesResponse = await fetch(`https://fdnd.directus.app/items/messages/?filter={"for":{"_istarts_with":"Team ${teamName}"}}`);
  const messagesResponseJSON = await messagesResponse.json();

  response.render('index.liquid', { 
    teamName: teamName,
    persons: personResponseJSON.data,
    messages: messagesResponseJSON.data
  })
})

app.get('/sort/age', async function (request, response) {
  
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?sort=birthdate&fields=*,squads.squad_id.name,squads.squad_id.cohort&filter={%22_and%22:[{%22squads%22:{%22squad_id%22:{%22tribe%22:{%22name%22:%22FDND%20Jaar%201%22}}}},{%22squads%22:{%22squad_id%22:{%22name%22:%221G%22}}},{%22squads%22:{%22squad_id%22:{%22cohort%22:%222425%22}}}]}')

  const personResponseJSON = await personResponse.json()
  
  const messagesResponse = await fetch(`https://fdnd.directus.app/items/messages/?filter={"for":{"_istarts_with":"Team ${teamName}"}}`);
  const messagesResponseJSON = await messagesResponse.json();

  response.render('index.liquid', { 
    teamName: teamName,
    persons: personResponseJSON.data,
    messages: messagesResponseJSON.data
  })
})

app.set('port', process.env.PORT || 8000)

if (teamName == '') {
  console.log('Voeg eerst de naam van jullie team in de code toe.');
} else {
  app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
  })
}