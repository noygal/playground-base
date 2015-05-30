let tree = require('./components/d3').D3();
// console.log(require('./components/parser'))
let parser = new(require('./components/parser').HtmlParser)();

class Controller {
  constructor() {

  }

  submit() {
    let isParsing = $('#json').is(':checked');
    $.get('/api/serializer', {
      url: $('#url').val(),
      json: !isParsing
    }, (data) => {
      console.log('request data:');
      console.log(data);
      console.log('parsing on ' + (isParsing ? 'browser' : 'server'));
      if (isParsing)
          data = parser.process(data);
      tree.setTree(data);
    });
  }
}


global.controller = new Controller();
