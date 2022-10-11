(function () {
  const container = document.querySelector(".enigSlider");
  class EnigSlider {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.container = document.querySelector(".enigSlider");
      this.viewer = document.querySelector(".enigSlider_wrapper");
      this.margin = this.width / 25;
      this.length = this.viewer.children.length;
      this.viewIndex = this.viewer.children.length;
    }
    makeContainer() {
      //const inner = this.container.children[0].children;
      this.container.style.width = this.width + "px";
      this.container.style.height = this.height + "px";
      this.container.style.position = "relative";
      //this.container.style.overflow = "hidden";
    }
    makeViewer() {
      this.viewer.style.height = this.height + "px";
      this.viewer.style.position = "absolute";
      this.viewer.style.display = "flex";
      this.viewer.style.left = -(this.width * this.viewIndex) + "px";
      this.viewer.style.transition = "left .5s linear";
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
      leftBtn.style.zIndex = 99;
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
      rightBtn.style.zIndex = 99;

      this.container.insertBefore(leftBtn, this.container.firstElementChild);
      this.container.appendChild(rightBtn);
    }

    makeList() {
      const listCount = this.viewer.children.length;
      let left = 0;
      const realChild = [...this.viewer.children];
      realChild.forEach((item) => {
        item.style.width = `${Number(this.width) - Number(this.margin) * 2}px`;
        item.style.height = `${
          Number(this.height) - Number(this.margin) * 2
        }px`;
        item.style.padding = this.margin + "px";
      });
    }
    appendPrevClone() {
      const length = this.length;
      const realChild = [...this.viewer.children];
      for (let i = length - 1; i >= 0; i--) {
        const cloneSlide = realChild[i].cloneNode(true);

        this.viewer.prepend(cloneSlide);
      }
    }
    appendAfterClone() {
      const length = this.length;
      const realChild = [...this.viewer.children];
      for (let i = 0; i < length; i++) {
        const cloneSlide = realChild[i].cloneNode(true);
        this.viewer.appendChild(cloneSlide);
      }
    }
    addEvent() {
      const leftBtn = this.container.children[0];
      const rightBtn =
        this.container.children[this.container.children.length - 1];
      const realChild = [...this.container.children].splice(
        1,
        this.container.children.length - 2
      );
      leftBtn.addEventListener("click", () => {
        console.log("leftClicked");
        console.log(this.viewer.style.left);
        this.viewer.style.left =
          Number(this.viewer.style.left.replace("px", "")) +
          Number(this.width) +
          "px";
        this.viewIndex--;
        console.log(this.viewIndex);
        console.log(this.viewIndex % this.length);
        if (this.viewIndex % this.length == 0) {
          console.log("test");
          this.appendPrevClone();
          console.log(this);
          console.log(this.appendPrevClone());
          console.log(enigSlider.appendPrevClone());
          //내부객체 메소드 접근문제
          //addEvent를 외부로 뺼까?
        }
      });
      rightBtn.addEventListener("click", () => {
        console.log("rightClicked");
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
  enigSlider.appendPrevClone();
  enigSlider.appendAfterClone();
  enigSlider.makeViewer();
  enigSlider.makeDirection();
  enigSlider.makeList();
  enigSlider.addEvent();
})();
