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

    requestNewPokemon = () => {
        const maxPokemonId = 949
        const getRndId = (max) => Math.floor(Math.random() * max) || 1
        const url = `https://pokeapi.co/api/v2/pokemon/${getRndId(maxPokemonId)}`
        return this.returnPromise(url)        

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

    parseNewData = async () => {
        const promiseResults = await this.requestNewData()
//        .then(promiseResults => {
            let [users, quote, pokemon, about] = promiseResults
            
            // console.log(users)
            // console.log(quote)
            // console.log(pokemon)
            // console.log(meat)
            this._data = {
                mainUser: users.results[0],
                friends: users.results.slice(1),
                quote: quote,
                pokemon: {name:pokemon.name,
                          pictureUrl: pokemon.sprites.front_default},
                about: {about:about}
              };


            //console.log(this.data)

//        })
//        .catch(err => console.log(err))    }


        return promiseResults
    }


}
