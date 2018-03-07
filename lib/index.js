var path = require('path');
var fs = require('fs');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}
function _class(op) {
  var c =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, _class);

  var def = {
    filter: /\.(js)$/,
    debug: true
  };

  this.setting = Object.assign({}, def, c);
}

_class.prototype.apply = function(op) {
  var type = op.type,
    code = op.code,
    file = op.file;

  if (!code && typeof code != 'string') {
    op.next();
    return;
  }

  if (type == 'css') {
    var filePath = file.substr(0, file.lastIndexOf('\\'));

    const mineType = require('mime-types');

    function imgToBase64(filePath) {
      let data = fs.readFileSync(filePath);
      console.log('op:', filePath);

      data = new Buffer(data).toString('base64');
      console.log(data);
      let base64 = 'data:' + mineType.lookup(filePath) + ';base64,' + data;
      return base64;
    }

    var reg = /(background(-image)?)\s*:\s*url\((\s*\S*)\)\s*\S*;*/g;

    var matches = code.match(reg);

    if (matches && matches.length) {
      var bgReg = /^(background(-image)?)\s*:\s*url\((\.*\\*\s*\S*)\)\s*\S*;*/i;
      matches.map(match => {
        var imgSrc = '';

        var execs = bgReg.exec(match);
        console.log('execs:', execs);
        if (execs && execs.length && execs.length === 4) {
          imgSrc = execs[3];
        }
        if (imgSrc && !imgSrc.startsWith('http')) {
          // console.log(`${filePath}/${imgSrc}`.replace(/\//g,'\\'));
          console.log(typeof imgSrc)
          
          console.log(`${filePath}/${imgSrc}`)
          console.log(path.join(__dirname,''))
          console.log((filePath+imgSrc).replace(/\//g, '\\').replace('dist','src').replace('..\\','')
          );
          // console.log(
          //   imgToBase64(`${filePath}/${imgSrc}`.replace(/\//g, '\\')).replace(
          //     'dist',
          //     'src'
          //   )
          // );
          var base64 = imgToBase64(
            `${filePath}/${imgSrc}`.replace(/\//g, '\\').replace('dist', 'src')
          );
          op.code = op.code.replace(imgSrc, base64);

          // fs.readFileSync(`${filePath}/${imgSrc}`.replace(/\//g,'\\'),{},(err,data)=>{
          //   if(err){
          //     console.log(err);
          //   }
          //   console.log(data);
          // })
        }
        // console.log(execs);
      });
      op.next();
    }

    // if(op){

    // }
    //   op.output && op.output({
    //     action: '我的插件',
    //     file: op.file
    // });
    // op.next();
  }
};
// var p = new _class()
// p.apply();

module.exports = _class;
