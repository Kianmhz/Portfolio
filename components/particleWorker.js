self.onmessage = async function (e) {
    const { canvas, imageSrc } = e.data;
    const ctx = canvas.getContext("2d");
  
    // Fetch the image as a blob and convert it to an ImageBitmap (since Image() is not available in a worker)
    const response = await fetch(imageSrc);
    const blob = await response.blob();
    const imageBitmap = await createImageBitmap(blob);
  
    // Initialize canvas dimensions
    const cellSize = 10;
    const numberOfParticles = 2000;
  
    class Particle {
      constructor(effect) {
        this.effect = effect;
        this.x = Math.floor(Math.random() * this.effect.width);
        this.y = Math.floor(Math.random() * this.effect.height);
        this.speedX;
        this.speedY;
        this.speedModifier = Math.random() * 2 + 1;
        this.history = [{ x: this.x, y: this.y }];
        this.maxLength = Math.floor(Math.random() * 60 + 50);
        this.angle = 0;
        this.newAngle = 0;
        this.anglecorrector = Math.random() * 0.5 + 0.01;
        this.timer = this.maxLength * 2;
        this.colors = ["#332FD0", "#9254C8", "#E15FED", "#6EDCD9"];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
      }
  
      draw(context) {
        context.beginPath();
        context.moveTo(this.history[0].x, this.history[0].y);
        for (let i = 0; i < this.history.length; i++) {
          context.lineTo(this.history[i].x, this.history[i].y);
        }
        context.strokeStyle = this.color;
        context.stroke();
      }
  
      update() {
        this.timer--;
        if (this.timer >= 1) {
          let x = Math.floor(this.x / this.effect.cellSize);
          let y = Math.floor(this.y / this.effect.cellSize);
          let index = y * this.effect.cols + x;
  
          if (this.effect.flowField[index]) {
            this.newAngle = this.effect.flowField[index].colorAngle;
            if (this.angle > this.newAngle) {
              this.angle -= this.anglecorrector;
            } else if (this.angle < this.newAngle) {
              this.angle += this.anglecorrector;
            } else {
              this.angle = this.newAngle;
            }
          }
  
          this.speedX = Math.cos(this.angle);
          this.speedY = Math.sin(this.angle);
          this.x += this.speedX * this.speedModifier;
          this.y += this.speedY * this.speedModifier;
  
          this.history.push({ x: this.x, y: this.y });
          if (this.history.length > this.maxLength) {
            this.history.shift();
          }
        } else if (this.history.length > 1) {
          this.history.shift();
        } else {
          this.reset();
        }
      }
  
      reset() {
        let attempts = 0;
        let resetSuccess = false;
  
        while (!resetSuccess && attempts < 10) {
          attempts++;
          let testIndex = Math.floor(Math.random() * this.effect.flowField.length);
          if (this.effect.flowField[testIndex].a > 0) {
            this.x = this.effect.flowField[testIndex].x;
            this.y = this.effect.flowField[testIndex].y;
            this.history = [{ x: this.x, y: this.y }];
            this.timer = this.maxLength * 2;
            resetSuccess = true;
          }
        }
      }
    }
  
    class Effect {
      constructor(canvas, ctx) {
        this.canvas = canvas;
        this.context = ctx;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = numberOfParticles;
        this.cellSize = cellSize;
        this.rows;
        this.cols;
        this.flowField = [];
        this.init();
      }
  
      init() {
        this.rows = Math.floor(this.height / this.cellSize);
        this.cols = Math.floor(this.width / this.cellSize);
        this.flowField = [];
  
        // Draw image and extract pixel data
        this.context.drawImage(imageBitmap, 0, 0, this.width, this.height);
        const pixels = this.context.getImageData(0, 0, this.width, this.height).data;
  
        for (let y = 0; y < this.height; y += this.cellSize) {
          for (let x = 0; x < this.width; x += this.cellSize) {
            const index = (y * this.width + x) * 4;
            const r = pixels[index];
            const g = pixels[index + 1];
            const b = pixels[index + 2];
            const a = pixels[index + 3];
            const grayscale = (r + g + b) / 3;
            const colorAngle = ((grayscale / 255) * 6.28).toFixed(2);
  
            this.flowField.push({
              x: x,
              y: y,
              a: a,
              colorAngle: colorAngle
            });
          }
        }
  
        // Create particles
        for (let i = 0; i < this.numberOfParticles; i++) {
          this.particles.push(new Particle(this));
        }
        this.particles.forEach(particle => particle.reset());
      }
  
      render() {
        this.particles.forEach((particle) => {
          particle.draw(this.context);
          particle.update();
        });
      }
    }
  
    const effect = new Effect(canvas, ctx);
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      effect.render();
      requestAnimationFrame(animate);
    }
  
    animate();
  };