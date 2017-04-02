var Pipe = (function () {
    /**
     * @constructor 管道类
     * @param { options: Object } 可配参数
     * @param { options.ctx: CanvasContext } 绘图环境
     * @param { options.imgPipeDown: Image } 口朝下管道，绘制到上边
     * @param { options.imgPipeUp: Image } 口朝上管道，绘制到下边
     * @param { options.x: number } x轴坐标
     * @param { options.y: number } x轴坐标
     * @param { options.topBottomSpace: number } 上下管道间距
     * @param { options.leftRightSpace: number } 左右管道间距
     * @param { options.speed: number } 运动速度
     * */
    var pipeTotal = 0;

    function Pipe(options) {
        this.ctx = options.ctx;
        this.imgPipeDown = options.imgPipeDown;
        this.imgPipeUp = options.imgPipeUp;
        this.w = this.imgPipeDown.width;
        this.h = this.imgPipeDown.height;
        this.x = options.x;
        this.yDown = 0;
        this.yUp = 0;
        this.topBottomSpace = options.topBottomSpace || 150;
        this.leftRightSpace = options.leftRightSpace || 150;
        this.maxHeight = options.maxHeight || 400;
        this.minHeight = options.minHeight || 50;

        this.speed = options.speed || 3;
        this.aSpeed = 0.001;

        // 动态求管道y轴坐标
        this.initPipeY();

        pipeTotal++;
    }
    extend(Pipe.prototype, {
        // 随机生成管道高度，然后计算上下管道的y轴坐标
        initPipeY: function () {
            /**
             * 1、根据最大最小高度随机生成
             * 2、根据随机高计算上面管道的y轴坐标 = 随机高 - 管道图片高
             * 3、根据随机高计算下面管道的y轴坐标 = 随机高 + 上下管道间接
             * */
            var pipeDownHeight = getRandom(this.minHeight, this.maxHeight);
            this.yDown = pipeDownHeight - this.h;
            this.yUp = pipeDownHeight + this.topBottomSpace;
        },
        draw: function () {
            this.ctx.drawImage(this.imgPipeDown, this.x, this.yDown);
            this.ctx.drawImage(this.imgPipeUp, this.x, this.yUp);
            this.update();
        },
        update: function () {
            this.x -= this.speed;
            this.speed += this.aSpeed;

            // 管道走出画布，从右边出来，并且重新生成高度和Y轴坐标
            if (this.x < -this.w) {
                this.x += (this.w + this.leftRightSpace) * pipeTotal;
                this.initPipeY();

            }
        }
    });

    // 把构造函数暴露到外界
    return Pipe;
})();