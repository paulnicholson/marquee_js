Marquee = Class.create({
  initialize: function(element, handle) {
    this.element = $(element);
    this.handle = $(handle) || this.element
    this.span = new Element('span').update(this.element.innerHTML);
    this.echo = new Element('span', {style: 'margin-left: 30px; display: none;'}).update(this.element.innerHTML);
    this.setX(0);
    this.element.update(this.span).insert(this.echo);
    this.handle.observe('mouseover', this.start.bind(this));
    this.handle.observe('mouseout', this.stop.bind(this));
  },
  start: function(event) {
    if(this.running || this.span.getWidth() < parseInt(this.element.getStyle('width')))
      return;
    this.echo.show();
    this.running = setInterval(this.scroll.bind(this), 16);
  },
  scroll: function() {
    if(!this.running)
      return;
    this.setX(this.getX() == -(this.span.getWidth() + 30) ? 0 : this.getX() - 1);
  },
  getX: function() {
    return parseInt(this.span.getStyle('margin-left'));
  },
  setX: function(x) {
    this.span.setStyle({'margin-left': x + 'px'});
  },
  stop: function() {
    if(this.running)
      this.running = clearInterval(this.running);
    this.echo.hide();
    setTimeout(function() {
      if(!this.running)
        new Fx.Style(this.span, 'margin-left').custom(this.getX(), 0);
        // this.setX(0);
    }.bind(this), 32)
  }
});