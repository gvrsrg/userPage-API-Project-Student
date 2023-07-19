const apiManager = new APIManager()
const renderer = new Renderer()

// apiManager.parseNewData()
// .then( () =>{
//     renderer.renderAll(apiManager.data)
// }

// )
// console.log(apiManager.data)
//const data = await 
//const renderer = new Renderer(apiManager.data)


const refresh = function () {
    apiManager.parseNewData()
    .then(() => {
    renderer.renderAll(apiManager.data)
    })
}


refresh()

$('#generate-user').on('click', refresh)
