window.onload=function(){
// 四
var data = [
    {name:'你给的快乐',geshou:'胡夏'  ,duration:'03:47',src:'./music/1.mp3'},
    {name:'没那么简单',geshou:'黄小琥',duration:'05:07',src:'./music/2.mp3'},
    {name:'星月神话'  ,geshou:'金莎'  ,duration:'04:09',src:'./music/3.mp3'},
    {name:'陪我看电影',geshou:'魏晨'  ,duration:'04:07',src:'./music/4.mp3'},
    {name:'用一生'    ,geshou:'唐嫣'  ,duration:'04:38',src:'./music/5.mp3'},
    {name:'我要夏天'  ,geshou:'王俊凯',duration:'03:28',src:'./music/6.mp3'},
    {name:'爱我就陪我看电影',geshou:'魏晨',duration:'04:46',src:'./music/7.mp3'},
    {name:'爱不后悔'  ,geshou:'罗晋'  ,duration:'04:32',src:'./music/8.mp3'},
    {name:'幸福的花'  ,geshou:'棉花糖',duration:'00:38',src:'./music/9.mp3'},
    {name:'放心去飞'  ,geshou:'欧豪'  ,duration:'04:04',src:'./music/10.mp3'},
    {name:'雨天'      ,geshou:'戚薇'  ,duration:'04:30',src:'./music/11.mp3'},
    {name:'独一无二'  ,geshou:'泳儿'  ,duration:'03:38',src:'./music/12.mp3'}
];
for( var i=0;i<data.length;i++){
  var li = document.createElement('li');
  li.setAttribute('index',i);
  li.setAttribute('class','li');
  li.innerHTML='<strong class="music-name green" title="'+data[i].name+'">'+data[i].name+'</strong> <strong class="singer-name green" title="'+data[i].geshou+'">'+data[i].geshou+'</strong> <strong class="play-time green">'+data[i].duration+'</strong> <div class="list-cp"> <div class="list-c p1" title="喜欢"></div> <div class="list-c p2" title="分享"></div> <div class="list-c p3" title="下载"></div> <div class="list-c p4" title="从列表中删除"></div> <div class="list-c p5" title="收藏到歌单"></div> </div>';
  playlist.firstElementChild.appendChild(li);
}
var onmusicchange = function(index){
     audio.src = data[index].src;
     audio.play();

     if( currentlist){
      currentlist.setAttribute('class','li');
     }
     playlist[index].setAttribute('class','li play_current');
     currentlist = playlist[index];
     
     playlist[index].style.color = 'green';

     musicname.innerHTML = data[index].name;
     geshou.innerHTML = data[index].geshou;
     ptime.innerHTML = data[index].duration;
};

var playlists = document.getElementsByClassName('li');
var currentlist = null;
var currentIndex=0;     //

var  bofangmoshi;

for(var i=0;i<playlists.length;i++){
   playlists[i].onclick = function(){
     var index = Number(this.getAttribute('index')); 
     currentIndex = index;
     onmusicchange(index);
   };
}

//到最后一首时返回第一首
next_bt.onclick = function(){
  currentIndex += 1;
  currentIndex = (currentIndex == data.length)?0:currentIndex;
  onmusicchange(currentIndex);
}
//第一首时返回第一首
prev_bt.onclick = function(){
  currentIndex -= 1;
  currentIndex = (currentIndex == -1)?data.length-1:currentIndex;
  onmusicchange(currentIndex);
};


var icon = document.getElementById('icon');
var list = document.getElementById('list');
var xiala = document.getElementById('xiala');
var click = document.getElementById('click');
var rclick = document.getElementById('rclick');
var xunhuan = document.getElementById('xunhuan');
var xunhuan1 = document.getElementById('xunhuan1');
xiala.onclick = function(){
  list.style.display = 'none';
};
icon.onclick = function(){
  list.style.display = 'block';
};
click.onmousedown = function(){
   var width = -(buju.offsetWidth-click.offsetWidth);
   buju.style.marginLeft = width +'px';
   click.setAttribute('class','rclick');
};
click.onmouseup = function(){
   buju.style.marginLeft = 0 +'px';
   
};

// 一

audio.onplay = function(){
  bofang.setAttribute('class','pause');
  yin.style.display ='block';

};
audio.onpause = function(){
  bofang.setAttribute('class','bofang');
};

// 二
 audio.onvolumechange = function(){
   chang.style.width = (this.volume*100)+'%';
   move.style.left   = (this.volume*100)+'%';
 }; 

// 三
 audio.onseeked = function(){
   var t = this.currentTime/this.duration;
   end.style.width = (t*100)+'%';
   yuandian.style.left = (t*100)+'%';
 };

 audio.ontimeupdate = function(){
   var t = this.currentTime/this.duration;
   end.style.width = (t*100)+'%';
   yuandian.style.left = (t*100)+'%';
 };



// 一
  bofang.onclick = function(e){
      if( audio.paused){
        audio.play();
      }else{
        audio.pause();
      }
  };

// 二
 spanvolume.onclick =( function(){
      var previous;
      return function(){
        if(this.getAttribute('class').indexOf('mute')!=-1){
          this.setAttribute('class','yinliang');
          audio.volume = previous;
        }else{
          this.setAttribute('class','volume_mute');
           previous = audio.volume;
           audio.volume = 0;
        }
      };
 } )();
shengyin.onclick = function(e){
    audio.volume= e.layerX/this.offsetWidth;
    spanvolume.setAttribute('class','yinliang');
 };
move.onclick = function(e){
    e.stopPropagation();
};

// 三
start.onclick = function(e){
    var t = e.layerX/this.offsetWidth;
    audio.currentTime = audio.duration*t;
};
yuandian.onclick = function(e){
    e.stopPropagation();
};

// 四
  audio.onended =function(){
  currentIndex += 1;
  currentIndex = (currentIndex == data.length)?0:currentIndex;
  onmusicchange(currentIndex);

};

var close = document.getElementById('close');
close.onclick = function(){
  text.style.display='none';
};
show.onclick = function(){
  text.style.display='block';
};
// document.onmousedown = function(e){
//    e.preventDefault();
// };


document.onkeydown = function(e){
   if(e.keyCode == 32){
    audio.play();
 }
   if(e.keyCode == 39){
    currentIndex += 1;
    currentIndex = (currentIndex == data.length)?0:currentIndex;
    onmusicchange(currentIndex);
   }
   if(e.keyCode == 37){
    currentIndex -= 1;
    currentIndex = (currentIndex == -1)?data.length-1:currentIndex;
    onmusicchange(currentIndex);
   }
};

xunhuan.onclick = function(){
  // alert(1);
  xunhuan1.style.display='block';
};

xunhuan.onmouseout = function(){
  // alert(2);
  xunhuan1.style.display='none';
};

var qingchu = document.getElementById("qingchu");
var lisititle = document.getElementById("lisititle");
qingchu.onclick = function(){
   playlist.innerHTML = '';
}
lisititle.onclick = function(){
   location.reload();
}
};