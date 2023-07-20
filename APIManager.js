//This is the class that will manage all your APIs

class APIManager {
    constructor() {
        this._data = {}
//        this.parseNewData()
    }

    get data() {
        return this._data
    }

    returnPromise = function(url) {
        return new Promise((resolve, reject) =>
            fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Request failed')
            })
            .then(data => resolve(data))
            )
            .catch(error => reject(error));
    }



    requestNewUsers = (num) => {
        let url = `https://randomuser.me/api/?results=${num}&inc=name,location,picture`
        return this.returnPromise(url)
    }

    requestNewKanyeQuote = () => {
        let url = `https://api.kanye.rest/`
        return this.returnPromise(url)
    }

    getGif = (word) => {
        const apiKey = "AipLyRs9DHlNJaqGmmYtSWKtE87g6WfT";
        let gifSearch = `http://api.giphy.com/v1/gifs/search?q=${word}&api_key=${apiKey}&limit=1`;
        return new Promise((resolve, reject) => {
          $.get(gifSearch).then((responce) => {
            resolve(responce);
//            console.log(responce.data[0]);
          });
        });
      };

    requestNewPokemon = async() => {
        const maxPokemonId = 949
        const getRndId = (max) => Math.floor(Math.random() * max) || 1
        const url = `https://pokeapi.co/api/v2/pokemon/${getRndId(maxPokemonId)}`
        const pokemon = await this.returnPromise(url)
        
        let gifPromise = this.getGif(pokemon.name)

        return Promise.all([pokemon,gifPromise])
    }
    
    requestNewMeat = () => {
        let url = "https://baconipsum.com/api/?type=meat-and-filler&paras=2"
        return this.returnPromise(url)
    }


    requestNewData = async () => {
        const promiseUsers = this.requestNewUsers(7)
        const promiseKanye = this.requestNewKanyeQuote()
        const promisePokemon = this.requestNewPokemon()
        const promiseMeat = this.requestNewMeat()
        return Promise.all([promiseUsers, promiseKanye, promisePokemon, promiseMeat])

    }

// make{some}Object - making results pretty
// if API provider changes format of the result - that's where we convert it to our format

    makePokemonObject = (pokemonResult) => {
        //pokemonResult - array
        //[0] - pokemon API object
        //[1] - giphy API object

        let gifPath = "";
        try {
            gifPath = pokemonResult[1].data[0].images.fixed_height_still.url
        
        } catch (err) {
            gifPath = "https://media.giphy.com/media/g01ZnwAUvutuK8GIQn/giphy.gif"
        }
    
        const pokemon = {
            name:pokemonResult[0].name,
            type:pokemonResult[0].types[0].type.name,
            pictureUrl: pokemonResult[0].sprites.front_default,
            gifUrl: gifPath}
        return pokemon
    }
    
    makeUserObject = (userResult) => {
        return userResult.results[0]
    }
    
    makeFriendsObject = (userResult) => {
        return userResult.results.slice(1)
    }
    
    makeQuoteObject = (quoteResult) => {
        return quoteResult
    }

    makeAboutObject = (aboutResult) => {
        return {about:aboutResult}
    }    


    parseNewData = async () => {
        const promiseResults = await this.requestNewData()
//        .then(promiseResults => {
            let [users, quote, pokemon, about] = promiseResults
            
            // console.log(users)
            // console.log(quote)
            // console.log(pokemon)
            // console.log(meat)
            this._data = {
                mainUser: this.makeUserObject(users),
                friends: this.makeFriendsObject(users),
                quote: this.makeQuoteObject(quote),
                // pokemon: {name:pokemon[0].name,
                //     pictureUrl: pokemon[0].sprites.front_default,
                //     gifUrl: pokemon[1].data[0].images.fixed_height_still.url}
                pokemon: this.makePokemonObject(pokemon),
                about: this.makeAboutObject(about)
              };


            //console.log(this.data)

//        })
//        .catch(err => console.log(err))    }


        return promiseResults
    }


}
