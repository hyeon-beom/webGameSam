
function nxGameGate(strLayerID, n1ImageType, nxNextMapClassName, n1PositionCode)
{
	NxControl.apply(this, arguments);
	
	this.setBG('');
	if(n1ImageType==0)
		this.src = '/img/rpg/object/gate_invert.png';
	else if(n1ImageType==1)
		this.src = '/img/rpg/object/gate.png';
		
	this.setWidth(100);
	this.setHeight(150);
	this.setLayerIndex(nxGameLayer.n4LayerIndex_Gate);	
	
	this.checkPoint=function(rectPos)
	{
		var thisPos = this.getPosition();
		if(thisPos.isInAngle(rectPos))
		{
			this.parent.parent.playUnit.remove();
			this.parent.parent.hide();
			//this.parent.setLeft(0);
			nxGameMain.start(nxNextMapClassName);
			if(n1PositionCode==0)
			{
				nxGameMain.playUnit.setLeft(100);
				nxGameMain.playUnit.setTop(250);
				
			}
			else if(n1PositionCode==1)
			{
				var left = parseInt(nxGameMain.gameGround.imgBG.getWidth())-200;
				nxGameMain.playUnit.setLeft(left);
				nxGameMain.playUnit.setTop(250);
			}
			else if(n1PositionCode==2)
			{
				nxGameMain.playUnit.setLeft(400);
				nxGameMain.playUnit.setTop(150);
			}
			else if(n1PositionCode==3)
			{
				nxGameMain.playUnit.setLeft(400);
				nxGameMain.playUnit.setTop(350);
			}
			nxGameMain.gameGround.setPlayerCamera();
			/*
			var drops = document.getElementsByName('dropItems');
			for(var i=0;i<drops.length;i++)
			{
				drops[i].NxControl.unload();
			}
			*/
		}
	}
	
	this.getPosition=function()//¹ß¹Ù´Ú
	{
		var pos = new nxRectangle(this.getLeft(), this.getTop()+50, this.getWidth(), this.getHeight()-50);
		return pos;
	}

}
nxGameGround.prototype = new NxControl();
nxGameGround.prototype.constructor = nxGameGate;
