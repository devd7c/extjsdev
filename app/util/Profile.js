Ext.define("D7C.util.Profile", {
	
  config: {
    name: '',
    privilege: 0,
	privilegeName: ''
  },

  constructor: function(config) {
    this.initConfig(config);
    this.callParent(arguments);
  }

});