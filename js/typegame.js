$(function(){
	//面向对象打字游戏
	function Typegame(main,scor,life,state){//定义构造函数    实参
			//把min引入,把对象保存到元素对象身上
		this.main=main;
       this.scorele=scor;
       this.lifeele=life;
       this.stateele=state;
       this.life=5;
       this.scor=0;
       this.state=1;
       this.speed=5;
       this.num=3;
       this.obj={};
       this.sceneHeight=document.documentElement.clientHeight;
	}
	Typegame.prototype={   //方法
		start:function(){
			for(i in this.obj){
      		clearInterval(this.obj[i].el.t)
      		}
			this.obj={};
			this.main.innerHTML="";//去除main里的文本
			for (var i=0; i<this.num;i++){
				this._createLetter()
			}
				this._play();
		},       //方法与方法之间逗号
		_createLetter:function(){ //_creatLetter创建方法
			var that=this;
			var ele=document.createElement("div"); 
			do{
			var randomleft=Math.random()*(this.main.offsetWidth-40);//随机的left值
			}while(this._checkleft(randomleft))
			var randomtop=-Math.random()*100;//随机的top值
			ele.style.cssText="width: 40px;height: 40px;border: 2px solid #11cb37;border-radius: 10px;text-align: center;line-height: 40px;color: #15fdfe;font-weight: bold;font-size: 30px;position: absolute;left:"+randomleft+"px;top:"+randomtop+"px";
			//创建一个字母把字母放到页面里
			do{  //去除重复
			var num=Math.floor(Math.random()*26+65);//获取随机的字母利用ASSIC
			var charcter=String.fromCharCode(num)
		    }while(this.obj[charcter])//有的话为真就重新再执行
			ele.innerHTML=charcter;
			this.main.appendChild(ele)  //appendChild("子元素") 向页面中添加
			ele.t=setInterval(movefun,60)
			// animate(ele,{top:this.sceneHeight},this.time,
			// 	function(){   //回调函数
			// 	if(this){
			// 		that._createLetter();
			// 			that.life--;
			// 			that.lifeele.innerHTML=that.life;
			// 			if (that.life==0) {
			// 				that.gameover();
			// 			}
			// 		}
			// 	}) //动画
			function movefun(){
         	 var top=parseInt(getStyle(ele,"top"));
         	 top+=that.speed;
             ele.style.top=top+"px";
             if(top>that.sceneHeight){
             	clearInterval(ele.t);
             	 that._createLetter();	
                 that.life--;
                 that.lifeele.innerHTML=that.life;
                 if(that.life==0){
               	  that.gameover();
                 }
             }
         }
         this.obj[charcter]={left:randomleft,el:ele,fun:movefun};//把赋给对象,值就是对象
			// {"A":{left:125,el:div},"B":{left:544,el:div}
		},
		_checkleft:function(newleft){
           for(i in this.obj){
           	  if(newleft>this.obj[i].left-40&&newleft<this.obj[i].left+40){
           	  	return true;
           	  }
           }
          return false;
      },
		_play:function(){
			var that=this;
			document.onkeydown=function(e){
				var ev=e||window.event;
				var code=ev.keyCode;
				var mycharcter=String.fromCharCode(code);
				if (that.obj[mycharcter]) {
					that.main.removeChild(that.obj[mycharcter].el);
					that._createLetter();
					clearInterval(that.obj[mycharcter].el.t)
					delete that.obj[mycharcter];//删除后重新来
					that.scor++;
					console.log(that.scor)
					that.scorele.innerHTML=that.scor;
					if (that,scor%10==0) {
						that.state++;
		              	 that.life++;
		              	 that.lifeele.innerHTML=that.life;
		              	 that.stateele.innerHTML=that.state;
		              	 if(that.state<=3){
		              	 that.num++;
		              	 }else{
						that.speed++;
						}
						that.start();
					}
				}
			}
		},
		gameover:function(){
			this.main.innerHTML="<span>游戏结束,总得分"+this.scor+"</span>";
			for(i in this.obj){
      	 	clearInterval(this.obj[i].el.t)
		}

		},
		pause:function(){
	      	for(i in this.obj){
	      		clearInterval(this.obj[i].el.t);
	      	}
	      	document.onkeydown=null;
	      },
	      moveon:function(){
	      	 for(i in this.obj){
	      		this.obj[i].el.t=setInterval(this.obj[i].fun,60);
	      	} 
	      	this._play()
	      }
	   	}
		//传递参数
		var begin=$(".begin")[0];
		var main=$(".main")[0];
		var scor=$(".scor")[0];
		var life=$(".life")[0];
		var state=$(".state")[0];
		var pause=$(".pause")[0];
		var end=$(".end")[0];
		var game=new Typegame(main,scor,life,state);
		var flag=true;//判断开始功能
		begin.onclick=function(){
			if(flag){
			flag=false;
			game.start()
			}
		}
		var flag2=true;
		pause.onclick=function(){
	       if(flag2){
	       	flag2=false;
	       	 this.innerHTML="继续"
	         game.pause();
	       }else{
	         flag2=true;
	         this.innerHTML="暂停"
	         game.moveon();
	       }
		}
		end.onclick=function(){
			game.gameover()
		}
})