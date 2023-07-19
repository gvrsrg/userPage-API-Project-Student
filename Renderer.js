
class Renderer {
    constructor(data) {
        this.renderAll(data)
    }

    templateHtml = (templateId, data) => {
        const source = $(templateId).html();
        const template = Handlebars.compile(source);
        const newHTML = template(data);
        return newHTML;
      };
    
    renderMainUser = (userData) => {
        $(".user-container")
          .empty()
          .append(this.templateHtml("#user-template", userData));
      };

      renderQuote = (userData) => {
        $(".quote-container")
          .empty()
          .append(this.templateHtml("#quote-template", userData));
      };
      
      renderAbout = (userData) => {
        $(".quote-container")
          .empty()
          .append(this.templateHtml("#quote-template", userData));
      };

    renderAll = (data) => {
        this.renderMainUser(data.mainUser);
        //this.renderFriends({ friends: data.friends });
        this.renderQuote({ quote: data.quote });
        // this.renderPoke(data.poke);
        this.renderAbout({ about: data.about });
        //this.renderLoadFromStorage(settings);
      };


}