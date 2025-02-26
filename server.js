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

// fetching Age old -> young
app.get('/sort/age', async function (request, response) {
  // Haal alle personen uit de WHOIS API op, van dit jaar
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?sort=birthdate&fields=*,squads.squad_id.name,squads.squad_id.cohort&filter={"_and":[{"birthdate":{"_null":false}},{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"name":"1G"}}},{"squads":{"squad_id":{"cohort":"2425"}}}]}');
  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json();

  response.render('index.liquid', { 
    teamName: teamName,
    persons: personResponseJSON.data,
  })

})
// fetching Book Thriller 
app.get('/filter/book/thriller', async function (request, response) {
  // Haal alle personen uit de WHOIS API op, van dit jaar
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?sort=name&fields=*,squads.squad_id.name,squads.squad_id.cohort&filter={%22_and%22:[{%22fav_book_genre%22:%22Thriller%22},{%22squads%22:{%22squad_id%22:{%22tribe%22:{%22name%22:%22FDND%20Jaar%201%22}}}},{%22squads%22:{%22squad_id%22:{%22name%22:%221G%22}}},{%22squads%22:{%22squad_id%22:{%22cohort%22:%222425%22}}}]}');
  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json();

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
  })

})

// fetching Book Action 
app.get('/filter/book/action', async function (request, response) {
  // Haal alle personen uit de WHOIS API op, van dit jaar
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?sort=name&fields=*,squads.squad_id.name,squads.squad_id.cohort&filter={%22_and%22:[{%22fav_book_genre%22:%22Action%22},{%22squads%22:{%22squad_id%22:{%22tribe%22:{%22name%22:%22FDND%20Jaar%201%22}}}},{%22squads%22:{%22squad_id%22:{%22name%22:%221G%22}}},{%22squads%22:{%22squad_id%22:{%22cohort%22:%222425%22}}}]}');
  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json();

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
  })

})

// fetching Book Comedy 
app.get('/filter/book/comedy', async function (request, response) {
  // Haal alle personen uit de WHOIS API op, van dit jaar
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?sort=name&fields=*,squads.squad_id.name,squads.squad_id.cohort&filter={%22_and%22:[{%22fav_book_genre%22:%22Comedy%22},{%22squads%22:{%22squad_id%22:{%22tribe%22:{%22name%22:%22FDND%20Jaar%201%22}}}},{%22squads%22:{%22squad_id%22:{%22name%22:%221G%22}}},{%22squads%22:{%22squad_id%22:{%22cohort%22:%222425%22}}}]}');
  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json();

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
  })

})

// fetching Book Drama 
app.get('/filter/book/drama', async function (request, response) {
  // Haal alle personen uit de WHOIS API op, van dit jaar
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?sort=name&fields=*,squads.squad_id.name,squads.squad_id.cohort&filter={%22_and%22:[{%22fav_book_genre%22:%22Drama%22},{%22squads%22:{%22squad_id%22:{%22tribe%22:{%22name%22:%22FDND%20Jaar%201%22}}}},{%22squads%22:{%22squad_id%22:{%22name%22:%221G%22}}},{%22squads%22:{%22squad_id%22:{%22cohort%22:%222425%22}}}]}');
  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json();

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

