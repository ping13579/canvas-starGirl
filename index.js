var can;
var ctx;

var girlSrc = new Image();
var startPic = new Image();
var num = 60;
var stars=[];

var lastTime ;

var deltaTime ;

var switchy = false;

function init(){

    can = document.getElementById('canvas');
    ctx = can.getContext('2d');

    w = can.width;
    h = can.height;

    document.addEventListener('mousemove',mousemove,false)

    girlSrc.src = 'img/girl.jpg';
    startPic.src = 'img/star.png';

    for(var i=0;i<num;i++){
        var obj = new starObj();
        stars.push(obj);
        stars[i].init();
    }
    lastTime = Date.now();
    gameloop();

}

function mousemove(e){
    if(e.offsetX || e.layerX){
        var px = e.offsetX == undefined ? e.layerX : e.offsetX;
        var py = e.offsetY == undefined ? e.layerY : e.offsetY;
        //swicthy
        if(px>100 && px<700 && py>150 && py<450){
            switchy = true;
        }else{
            switchy = false;
        }
    }
}

document.body.onload = init;

function gameloop(){
    window.requestAnimFrame(gameloop);

    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;

    drawBackground();
    drawGirl();
    //drawStars();
    alibe();
}

function drawBackground(){
    ctx.fillStyle = '#393550';
    ctx.fillRect(0,0,w,h)
}
function drawGirl(){
    //drawImage(img,x,y);
    ctx.drawImage(girlSrc,100,150,600,300)
}

var starObj = function(){
    this.x;
    this.y;
    this.picNo;
    this.timer;
    this.xSpd;
    this.ySpd;
};


starObj.prototype.init = function(){
    this.x = Math.random()*600 + 100;
    this.y = Math.random()*300 + 150;
    this.picNo = Math.floor(Math.random()*7);
    this.timer = 0;

    this.xSpd = Math.random()*3 -1.5;
    this.ySpd = Math.random()*3 -1.5;
};

starObj.prototype.update = function(){

    this.x += this.xSpd* deltaTime*0.004;
    this.y += this.ySpd* deltaTime*0.004;

    if(this.x<100 || this.x>700){
        this.init();
        return;
    }

    if(this.y<150 || this.y>450){
        this.init();
    }
    this.timer += deltaTime;
    if(this.timer>50){
        this.picNo +=1;
        this.picNo %=7;
        this.timer = 0;
    }
};

starObj.prototype.draw = function(a){
    //save()
    ctx.save();
    //globalAlpha全局透明度
    ctx.globalAlpha = a;

    //drawImage(img,sx,sy,swidth,sheight,x,y,width,height)
    ctx.drawImage(startPic,7*this.picNo,0,7,7,this.x,this.y,7,7);

    //restore();
    ctx.restore();

};

function drawStars(a){
    for(var i=0; i<num; i++){
        stars[i].update();
        stars[i].draw(a);
    }
}

function alibe(){
    if(switchy){
        drawStars(1)
    }else{
        drawStars(0)
    }
}
