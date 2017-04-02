var Land = (function () {
    var landTotal = 0;

    function Land(options) {
        this.ctx = options.ctx;
        this.img = options.img;
        this.w = options.img.width;
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.speed = options.speed || 3;
        landTotal++;
    }
    extend(Land.prototype, {
        draw: function () {
            this.ctx.drawImage(this.img, this.x, this.y);
            this.update();
        },
        update: function () {
            this.x -= this.speed;
            if (this.x <= -this.w) {
                // this.x += this.ctx.canvas.width * skyTotal;
                this.x += this.w * landTotal;
            }
        }
    })
    return Land;
})();