var Sky = (function () {
    var skyTotal = 0;

    function Sky(options) {
        this.ctx = options.ctx;
        this.img = options.img;
        this.w = options.img.width;
        this.x = options.x || 0;
        this.y = 0;
        this.speed = options.speed || 3;
        skyTotal++;
    }
    extend(Sky.prototype, {
        draw: function () {
            this.ctx.drawImage(this.img, this.x, this.y);
            this.update();
        },
        update: function () {
            this.x -= this.speed;
            if (this.x <= -this.w) {
                // this.x += this.ctx.canvas.width * skyTotal;
                this.x += this.w * skyTotal;
            }
        }
    })

    return Sky;
})();