(function () {
  const container = document.querySelector(".enigSlider");
  class EnigSlider {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.container = document.querySelector(".enigSlider");
    }
    makeContainer() {
      //const inner = this.container.children[0].children;
      console.log(this.container.children[0].children.length);
      this.container.style.width = this.width + "px";
      this.container.style.height = this.height + "px";
      this.container.style.position = "relative";
      //this.container.style.overflow = "hidden";
    }
    makeDirection() {
      const leftBtn = document.createElement("div");
      const rightBtn = document.createElement("div");
      leftBtn.style.width = this.height / 20 + "px";
      leftBtn.style.height = this.height / 20 + "px";
      leftBtn.style.position = "absolute";
      leftBtn.style.borderTop = "2px solid black";
      leftBtn.style.borderRight = "2px solid black";
      leftBtn.style.left = "2px";
      leftBtn.style.top = "50%";
      leftBtn.style.transform = "translateY(-50%) rotate(-135deg)";
      leftBtn.style.cursor = "pointer";

      //rightBtn
      rightBtn.style.width = this.height / 20 + "px";
      rightBtn.style.height = this.height / 20 + "px";
      rightBtn.style.position = "absolute";
      rightBtn.style.borderTop = "2px solid black";
      rightBtn.style.borderRight = "2px solid black";
      rightBtn.style.right = "2px";
      rightBtn.style.top = "50%";
      rightBtn.style.transform = "translateY(-50%) rotate(45deg)";
      rightBtn.style.cursor = "pointer";

      this.container.insertBefore(leftBtn, this.container.firstElementChild);
      this.container.appendChild(rightBtn);
    }

    makeList() {
      const listCount = this.container.children.length;
      let gap = this.width / 5;
      let left = 0;
      const realChild = [...this.container.children].splice(
        1,
        this.container.children.length - 2
      );
      console.log(this.container.children.length);
      console.log(realChild);
      realChild.forEach((item) => {
        item.style.position = "absolute";
        item.style.width = `${this.width - gap}px`;
        item.style.height = `${this.height - gap}px`;

        item.style.left = left + "px";
        left += Number(this.width);
        item.style.transform = `translate(${gap / 2}px,${gap / 2}px)`;
        item.style.transition = "left .5s linear";
      });
    }
    addEvent() {
      const leftBtn = this.container.children[0];
      const rightBtn =
        this.container.children[this.container.children.length - 1];
      const realChild = [...this.container.children].splice(
        1,
        this.container.children.length - 2
      );
      rightBtn.addEventListener("click", () => {
        console.log(realChild[0].style.left);
        realChild.forEach((item) => {
          if (
            realChild[0].style.left.replace("px", "") <
            -this.width * (realChild.length - 1)
          ) {
            item.style.right = this.width + "px";
            console.log(item.style.right);
          } else {
            item.style.left =
              item.style.left.replace("px", "") - this.width + "px";
          }
        });
      });
      leftBtn.addEventListener("click", () => {
        console.log("clicked leftBtn");
        realChild.forEach((item) => {
          if (realChild[0].style.left.replace("px", "") > 0) {
            console.log("1111");
            item.style.left =
              Number(item.style.left.replace("px", "")) -
              Number(this.width) * (realChild.length - 1) +
              "px";
          } else {
            item.style.left =
              Number(item.style.left.replace("px", "")) +
              Number(this.width) +
              "px";
          }
          console.log(realChild[0].style.left);
        });
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
  enigSlider.makeDirection();
  enigSlider.makeList();
  enigSlider.addEvent();
})();
