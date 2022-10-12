(function () {
  const container = document.querySelector(".enigSlider");
  class EnigSlider {
    constructor(width, height, boxShadow) {
      this.width = width;
      this.height = height;
      this.container = document.querySelector(".enigSlider");
      this.viewer = document.querySelector(".enigSlider_wrapper");
      this.margin = this.width / 25;
      this.length = this.viewer.children.length;
      this.viewIndex = this.viewer.children.length;
      this.realChild = [
        ...document.querySelector(".enigSlider_wrapper").children,
      ];
      this.boxShadow = boxShadow;
    }
    makeContainer() {
      //const inner = this.container.children[0].children;
      this.container.style.width = this.width + "px";
      this.container.style.height = this.height + "px";
      this.container.style.position = "relative";
      this.container.style.overflow = "hidden";
      this.container.style.boxShadow = this.boxShadow;
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
      leftBtn.classList.add("leftBtn");
      rightBtn.classList.add("rightBtn");

      leftBtn.style.width = this.margin / 1.5 + "px";
      leftBtn.style.height = this.margin / 1.5 + "px";
      leftBtn.style.position = "absolute";
      leftBtn.style.borderTop = "2px solid black";
      leftBtn.style.borderRight = "2px solid black";
      leftBtn.style.left = this.margin / 3 + "px";
      leftBtn.style.top = "50%";
      leftBtn.style.transform = "translateY(-50%) rotate(-135deg)";
      leftBtn.style.cursor = "pointer";
      leftBtn.style.zIndex = 99;
      //rightBtn
      rightBtn.style.width = this.margin / 1.5 + "px";
      rightBtn.style.height = this.margin / 1.5 + "px";
      rightBtn.style.position = "absolute";
      rightBtn.style.borderTop = "2px solid black";
      rightBtn.style.borderRight = "2px solid black";
      rightBtn.style.right = this.margin / 3 + "px";
      rightBtn.style.top = "50%";
      rightBtn.style.transform = "translateY(-50%) rotate(45deg)";
      rightBtn.style.cursor = "pointer";
      rightBtn.style.zIndex = 99;

      this.container.insertBefore(leftBtn, this.container.firstElementChild);
      this.container.appendChild(rightBtn);
    }

    makeList() {
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
      const length = this.length; //7
      const realChild = this.realChild;
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

      //debounce
      const debounce = (callback, delay) => {
        let timerId;
        return (...args) => {
          //delay가 경과하기 이전에 이벤트가 발생하면 이전 이벤트를 취소하고 새로운 타이머를 재설정한다.
          if (timerId) clearTimeout(timerId);
          timerId = setTimeout(callback, delay, ...args);
        };
      };
      leftBtn.addEventListener(
        "click",
        debounce(() => {
          this.viewer.style.left =
            Number(this.viewer.style.left.replace("px", "")) +
            Number(this.width) +
            "px";
          this.viewIndex--;
          if (this.viewIndex % this.length == 0) {
            try {
              setTimeout(() => {
                this.viewer.style.transition = "";
                this.viewer.style.left = -this.length * this.width + "px";
                this.viewer.style.left;
                this.viewIndex = this.length;
              }, 500);
              setTimeout(() => {
                this.viewer.style.transition = "left .5s linear";
              }, 600);
            } catch (error) {
            } finally {
            }
          }
        }, 300)
      );

      rightBtn.addEventListener(
        "click",
        debounce(() => {
          this.viewer.style.left =
            Number(this.viewer.style.left.replace("px", "")) -
            Number(this.width) +
            "px";
          this.viewIndex--;
          if (this.viewIndex % this.length == 0) {
            try {
              setTimeout(() => {
                this.viewer.style.transition = "";
                this.viewer.style.left = -this.length * this.width + "px";
                this.viewer.style.left;
                this.viewIndex = this.length;
              }, 500);
              setTimeout(() => {
                this.viewer.style.transition = "left .5s linear";
              }, 600);
            } catch (error) {
            } finally {
            }
          }
        }, 300)
      );
    }
  }
  let defaultWidth = 200;
  let defaultHeight = 200;
  let defaultBoxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";
  if (container.attributes[1]) {
    defaultWidth = container.attributes[1].value;
  }
  if (container.attributes[2]) {
    defaultHeight = container.attributes[2].value;
  }
  if (container.attributes[3]) {
    defaultBoxShadow = container.attributes[3].value;
  }
  const enigSlider = new EnigSlider(
    defaultWidth,
    defaultHeight,
    defaultBoxShadow
  );
  enigSlider.makeContainer();
  enigSlider.appendPrevClone();
  enigSlider.appendAfterClone();
  enigSlider.makeViewer();
  enigSlider.makeDirection();
  enigSlider.makeList();
  enigSlider.addEvent();
})();
