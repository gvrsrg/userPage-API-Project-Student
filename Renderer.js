
class Renderer {
    constructor() {

        this.userContainer = $(".user-container")
        this.quoteContainer = $(".quote-container")
        this.meatContainer = $(".meat-container")
        this.pokemonContainer = $(".pokemon-container")
        this.friendsContainer = $(".friends-container")
        //this.renderAll(data)


        
        }

    templateHtml = (templateId, data) => {
        const source = $(templateId).html();
        const template = Handlebars.compile(source);
        const newHTML = template(data);
        return newHTML;
      };
    
    renderMainUser = (userData) => {
        this.userContainer.empty()
        this.userContainer.append(this.templateHtml("#user-template", userData));
      };

      renderQuote = (userData) => {
        this.quoteContainer
          .empty()
          .append(this.templateHtml("#quote-template", userData));
      };

      renderAbout = (userData) => {
        this.meatContainer 
          .empty()
          .append(this.templateHtml("#meat-template", userData));
      };

      renderPokemon = (userData) => {
        this.pokemonContainer 
          .empty()
          .append(this.templateHtml("#pokemon-template", userData));
      };

      renderFriends = (userData) => {
        this.friendsContainer 
          .empty()
          .append(this.templateHtml("#friends-template", userData));
      };
    renderAll = (data) => {
        this.renderMainUser(data.mainUser);
        this.renderFriends({ friends: data.friends });
        this.renderQuote(data.quote);
        this.renderPokemon(data.pokemon);
        this.renderAbout(data.about);
        //this.renderLoadFromStorage(settings);
      };


}