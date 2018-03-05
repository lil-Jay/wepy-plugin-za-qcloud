TestPlugin.prototype.apply = function (op){
  op.output("TestPlugi:"+op.file);
  op.next();
}

module.exports = TestPlugin;