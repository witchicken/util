(function () {
  const container = document.querySelector(".enigSlider");
  class EnigSlider {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.container = document.querySelector(".enigSlider");
    }
    makeContainer() {
      const inner = this.container.children[0].children;
      console.log(this.container.children[0].children.length);
      this.container.style.width = this.width + "px";
      this.container.style.height = this.height + "px";
      this.container.style.position = "relative";
      //this.container.style.overflow = "hidden";
    }
    makeList() {
      const listCount = this.container.children.length;
      let gap = this.width / 10;
      let left = 0;
      [...this.container.children].forEach((item) => {
        item.style.position = "absolute";
        item.style.left = left + "px";
        left += Number(this.width);
        console.log(left);
      });
    }
  }
  let defaultWidth = 200;
  let defaultHeight = 200;
  if (container.attributes[1]) {
    defaultWidth = container.attributes[1].value;
  }
  if (container.attributes[2]) {
    defaultHeight = container.attributes[2].value;
  }
  const enigSlider = new EnigSlider(defaultWidth, defaultHeight);
  enigSlider.makeContainer();
  enigSlider.makeList();
})();
