var BusyAjaxClass = Class.create({
  busy_div_name: 'busy_ajax',
  off_x: 15,
  off_y: 15,
  spinner_url: '/images/spinner.gif',
  is_on: false,
  initialize: function() {
    var self = this;
    Ajax.Responders.register({
      onCreate: function() {
        if(Ajax.activeRequestCount>0 && self.is_on) self.show_spinner();
      },
      onComplete: function() {
        if(Ajax.activeRequestCount==0) self.hide_spinner();
      }
    });
    document.observe("dom:loaded", function() {
      self.enable();
    });
  },
  enable: function() {
    if (!this.is_on) {
      try {
        busydiv = new Element('div', {id: this.busy_div_name});
        busydiv.setStyle({display:'none', position: 'absolute', zIndex: '32000'});
        spinimg = new Element('img', {src: this.spinner_url});
        busydiv.appendChild(spinimg);
        document.body.appendChild(busydiv);
        var self = this;
        document.observe('mousemove', function(e){
          self.follow(e);
        });
        this.is_on = true;
      } catch (e) { alert('error; could not insert busy div:\n\n' + e.toString()); throw e }
    }
  },
  disable: function() {
    document.stopObserving('mousemove', this.follow);
    var busy_div = $(this.busy_div_name);
    if (busy_div) busy_div.remove();
    this.is_on = false;
  },
  follow: function(e) {
    var busy_div = $(this.busy_div_name);
    if (busy_div && this.is_on) {
      var w = Math.max(window.innerWidth, document.width);
      var h = Math.max(window.innerHeight, document.height);
      var x = parseInt(this.mouse_x(e))+this.off_x;
      var y = parseInt(this.mouse_y(e))+this.off_y;
      if (x + 16 > w) {
        x = w - 16;
      }
      if (y + 16 > h) {
        y = h - 16;
      }
      busy_div.setStyle({visibility: 'visible', left: (x + 'px'),
        top: (y + 'px'), zIndex: '32000'});
    }
  },
  mouse_x: function(e) {
    if (!e) e = window.event;
    if (e.pageX) return e.pageX;
    else if (e.clientX) return e.clientX + (document.documentElement.scrollLeft ?  document.documentElement.scrollLeft : document.body.scrollLeft);
    else return 0;
  },
  mouse_y: function(e) {
    if (!e) e = window.event;
    if (e.pageY) return e.pageY;
    else if (e.clientY) return e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    else return 0;
  },
  show_spinner: function() {
    var busy_div = $(this.busy_div_name);
    if (busy_div)
      busy_div.appear({duration:0.5});
  },
  hide_spinner: function() {
    var busy_div = $(this.busy_div_name);
    if (busy_div)
      busy_div.fade({duration:0.5});
  }
});

var busy_ajax = new BusyAjaxClass();
// I'm handy for debugging, forces the spinner to show:
// document.observe("dom:loaded", function() {
//   busy_ajax.show_spinner();
// });