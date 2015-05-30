var htmlparser = require('htmlparser');

export class HtmlParser {
  process(rawHtml) {
    var handler = new htmlparser.DefaultHandler(function(error, dom) {
      if (error)
        console.error(error);
      // else
      //   console.log(dom);
    });
    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(rawHtml);
    let result = null;
    handler.dom.forEach((element) => {
      if (element.name === 'html' || element.name === 'HTML')
        result = element;
    });
    return result;
  }
}
