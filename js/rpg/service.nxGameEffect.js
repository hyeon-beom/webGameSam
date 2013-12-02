function nxMoveText(strLayerID, playUnit)
{
	NxControl.apply(this, arguments);
	this.setBG('');
	this.setWidth(100);
	this.setHeight(100);
	this.style.fontWeight	= 'bold';
	this.setFontSize(20);
	this.frmLayer.setAttribute("class","num");
	
	this.moveStart = function()
	{
		this.show();
		this.doLater("move(100)", 500);
	}
	this.move=function(n4Amount)
	{
		if(n4Amount>0)
		{
			var tick = 15
			n4Amount-=tick;
			this.doLater("move("+n4Amount+")", 100);
			this.setTop(this.getTop()-tick);
		}
		else
			this.unload();
	}			
	
}
nxMoveText.prototype = new NxControl();
nxMoveText.prototype.constructor = nxMoveText;

var nxMoveTextFactory = new function _nxMoveTextFactory()
{
	this.n4Index = 0;
	this.createText=function(rectPosition, n4Damage, playUnit)
	{
		var moveText = new nxMoveText('nxMoveText_'+this.n4Index);
		nxGameMain.gameGround.imgBG.add(moveText);
		moveText.setLayerIndex(1000);
		var colorText = playUnit.isMyUnit?'red':'yellow';
		moveText.setColor(	colorText );
		moveText.setText(addCommas(n4Damage));	
		moveText.setLeft(rectPosition.x+Math.floor(Math.random() * 30) );
		moveText.setTop(rectPosition.y-100);
		moveText.moveStart();
		this.n4Index++;
	}
	this.dodgeText=function(rectPosition, playUnit)
	{
		var moveText = new nxMoveText('nxMoveText_'+this.n4Index);
		nxGameMain.gameGround.imgBG.add(moveText);
		moveText.setLayerIndex(1000);
		var colorText = 'white';
		moveText.setColor(	colorText );
		moveText.setText('회피');	
		moveText.setLeft(rectPosition.x);
		moveText.setTop(rectPosition.y-100);
		moveText.moveStart();
		this.n4Index++;
	}
	this.preventText=function(rectPosition, playUnit)
	{
		var moveText = new nxMoveText('nxMoveText_'+this.n4Index);
		nxGameMain.gameGround.imgBG.add(moveText);
		moveText.setLayerIndex(1000);
		var colorText = 'white';
		moveText.setColor(	colorText );
		moveText.setText('막음');	
		moveText.setLeft(rectPosition.x);
		moveText.setTop(rectPosition.y-100);
		moveText.moveStart();
		this.n4Index++;
	}

}

