/**
 * @constructor 鸟类
 * @param { options: Object } 可配参数
 * @param { options.ctx: CanvasContext } 绘图环境
 * @param { options.img: Image } 鸟图
 * @param { options.widthFrame: number } 一排有多少个小鸟
 * @param { options.heightFrame: number } 一列有多少个小鸟
 * @param { options.x: number } x轴坐标
 * @param { options.y: number } x轴坐标
 * @param { options.speed: number } 运动速度
 * */
var Bird = (function () {
    function Bird(options) {
        this.ctx = options.ctx;
        this.img = options.img;
        this.widthFrame = options.widthFrame;
        this.heightFrame = options.heightFrame;
        this.w = this.img.width / this.widthFrame;
        this.h = this.img.height / this.heightFrame;
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.speed = options.speed || 3;
        this.aSpeed = 0.2;
        this.index = 0;

        // 小鸟速度为1时，旋转10度
        this.unitRadian = Math.PI / 18;
        // 小鸟最大旋转60度，最小-60度
        this.maxRadian = Math.PI / 3;
        this.minRadian = -Math.PI / 3;
    }
    extend(Bird.prototype, {
        draw: function () {
            /**
             * 0、备份默认状态
             * 1、平移坐标系的0,0点到小鸟中心
             * 2、旋转指定弧度
             * 3、绘制小鸟，但是坐标更新为负的宽高各一半
             * 4、状态回滚，防止干扰外界图形的绘制
             * */
            this.ctx.save();

            this.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
            var rotateRadian = this.unitRadian * this.speed;
            rotateRadian = rotateRadian > this.maxRadian ? this.maxRadian : rotateRadian;
            rotateRadian = rotateRadian < this.minRadian ? this.minRadian : rotateRadian;
            // this.ctx.rotate(Math.PI / 4);
            this.ctx.rotate(rotateRadian);
            this.ctx.drawImage(this.img,
                this.w * this.index, 0, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h);

            this.ctx.restore();
            this.update();
        },
        update: function () {
            this.index = ++this.index % this.widthFrame;

            this.y += this.speed;

            this.speed += this.aSpeed;
        },

        // 让小鸟向上飞一会
        flappyUp: function () {
            this.speed = -5;
        }
    });
    // 把构造函数暴漏到外界
    return Bird;
})();