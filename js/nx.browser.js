var nxSystem = new function NxSystem()
{
	function _screen()
	{
		this.width			= screen.width;
		this.height			= screen.height;
	}
	this.screen = new _screen();

	this.redirect =function(strURL)
	{
		document.location.href= strURL;
	}
		
}

document.onmousemove = function(e)
{
	var x =0;
	var y =0;
	if(!document.all)
	{
		x = parseInt(e.pageX);// + parseInt(document.body.scrollLeft);
		y = parseInt(e.pageY);// + parseInt(document.body.scrollTop);
	}
	else
	{
		x = parseInt(event.clientX);// + parseInt(document.body.scrollLeft);
		y = parseInt(event.clientY);// + parseInt(document.body.scrollTop);
		x = x + parseInt(document.body.scrollLeft);
		y = y + parseInt(document.body.scrollTop);
	}
	document.dX = x;
	document.dY = y;
	
	//alert(x+'/'+y);
}

var NxPlayer = function(strfileName, n4TimeOut)
{
	if(!strfileName)
		return;
	this.strFileName = strfileName;
	this.src = '/sound/'+this.strFileName;
	//this.src = "http://localhost/sound/puck.mp3";
	this.loop= 0;
	this.embed = null;
	this.id = 'player_"+strfileName+"';
	this.n4TimeOut = n4TimeOut?n4TimeOut:2000;
	
	this.play=function()
	{
		if(document.all)
			return;
		this.embed = new NxControl(this.id);
		this.embed.setLeft(-1000);
		//this.embed.setText("<embed src='"+this.src+"' loop='"+this.loop+"' autostart='true' id='player_"+strfileName+"'></embed>");
		var emText = "<embed FlashVars='autoplay=on&mp3="+this.src+"&skin=http://hompy.us/club/images/aqua.jpg' src='/sound/player/mymp3.swf' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='200' height='20'></embed>";
		this.embed.setText(emText);
		this.embed.show();		
		//this.embed.hide();		
		this.doLater("unload()",this.n4TimeOut,this.id);
		
	}
	this.stop=function()
	{
		//try
		//{
			this.embed.frmLayer.removeChild(document.getElementById('player_'+strfileName));
			this.embed.unload();
			this.embed = null;
		//}catch(e){}
	}
	this.doLater=function(strMethod, interval, strID){	setTimeout("document.getElementById('"+(strID?strID:this.id)+"').NxControl."+strMethod, interval);	}
}
