
function nxBolt(strLayerID, playUnit)
{
	NxControl.apply(this, arguments);

	this.playUnit=playUnit;
	this.playUnit.parent.add(this);
	this.setLayerIndex(7000);
	this.setBG('');
	this.movePixel = 20;
	this.n4Damage  = 10; 
	this.rectFly = null;
	this.setWidth(30);
	this.setHeight(30);
	
	//this.doLater=function(strMethod, interval, strID){	setTimeout("document.getElementById('"+(strID?strID:this.id)+"').NxControl."+strMethod, interval);	}
	this.fire=function( rectFly )
	{
		this.rectFly = rectFly;
		if(this.playUnit.n1MotionDirection	== nxUnitMotion.DirectionBase)
		{
			this.setLeft(rectFly.x);
		}
		else
		{
			this.setLeft(rectFly.x2);
		}
	
		this.setTop(rectFly.y);
		this.setImage();
		this.movePixel = this.playUnit.n1MotionDirection==nxUnitMotion.DirectionBase ?this.movePixel:this.movePixel*-1;
		this.doLater('threadFly()', 100);
		this.show();
	}
	
	this.onHitTarget= new NxEventDelegate(this);
	this.threadFly=function()
	{
		this.setLeft(this.getLeft()+ this.movePixel);
		var rect = new nxRectangle( this.getLeft(), this.getTop(), this.getWidth(), 100 );
		var units = rect.getUnitsInRect();
		for(var i=0;i<units.length;i++)
		{
			if(units[i].isEnemy(this.playUnit))
			{
				this.onHitTarget.execute( new Array(units[i]) );//hit 이벤트
				return;
			}
		}

		if(this.rectFly.isInAngle( new nxRectangle(this.getLeft(), this.getTop(), 1, 1) ) )
			this.doLater('threadFly()', 80);
		else
			this.unload();

	}

	this.setImage=function()
	{
		var strIMG = "/img/rpg/spell/dagger_00.png";
		if(this.playUnit.n1MotionDirection	!= nxUnitMotion.DirectionBase )
			strIMG = strIMG.split('.png').join('_invert.png');
		//debug(strIMG);
		this.setText("<img src='"+strIMG+"' width=100% height=100%>");
	}
	
	this.getPixelDistance=function(targetUnit)
	{
		var pos1 = this.playUnit.getPosition();
		var pos2 = targetUnit.getPosition();
		var x = Math.abs(pos1.x-pos2.x);
		var y = Math.abs(pos1.y-pos2.y);

		return Math.sqrt(Math.pow(x,2)+Math.pow(y,2))
	}	
	
}
nxBolt.prototype = new NxControl();
nxBolt.prototype.constructor = nxBolt;

function nxBoltEnergy(strLayerID, playUnit)
{
	nxBolt.apply(this, arguments);
	
	this.setWidth(60);
	this.setHeight(30);

	this.setImage=function()
	{
		var strIMG = "/img/rpg/spell/energyBolt_00.png";
		if(this.playUnit.n1MotionDirection	!= nxUnitMotion.DirectionBase )
			strIMG = strIMG.split('.png').join('_invert.png');
		this.setText("<img src='"+strIMG+"' width=100% height=100%>");
	}
	
	
}
nxBoltEnergy.prototype = new NxControl();
nxBoltEnergy.prototype.constructor = nxBoltEnergy;



function nxDropSpell(strLayerID, playUnit)//라이트닝
{
	nxBolt.apply(this, arguments);
	
	this.fire=function(rectFly)
	{
		var unitPos		= this.playUnit.getPosition();
		this.rectFly	= null;
		if(this.playUnit.n1MotionDirection	== nxUnitMotion.DirectionBase)
		{
			this.rectFly = new nxRectangle(unitPos.x+50, unitPos.y-50, 200, 70);
		}
		else
		{
			this.rectFly = new nxRectangle(unitPos.x-50-200, unitPos.y-50, 200, 70);
		}

		this.setWidth(this.rectFly.width);
		this.setHeight(400);
		this.setLeft(this.rectFly.x);
		this.setTop(this.rectFly.y+80-400);
		this.setImage();
		this.show();
		this.doLater('threadFly()', 100);
		
	}
	
	this.threadFly=function()
	{
		var units = this.rectFly.getUnitsInRect();//rect.getUnitsInRect();
		for(var i=0;i<units.length;i++)
		{
			if(units[i].isEnemy(this.playUnit))
			{
				this.onHitTarget.execute( new Array(units[i]) );//hit 이벤트
			}
		}
		this.doLater('unload()', 500);
	}

	this.setImage=function()
	{
		var strIMG = "/img/rpg/spell/lightning.png";
		this.setText("<img src='"+strIMG+"' width=100% height=100%>");
	}
	
	
}
nxBolt.prototype = new NxControl();
nxBolt.prototype.constructor = nxBolt;


function nxCallLightneingSpell(strLayerID, playUnit)//라이트닝
{
	nxBolt.apply(this, arguments);
	
	this.fire=function(rectFly)
	{
		var targetUnit  = this.findNearestEnemy();
		if(targetUnit==null)
			return false;
		var unitPos		= targetUnit.getPosition();
		this.setWidth(100);
		this.setHeight(400);
		this.setLeft(unitPos.x-50);
		this.setTop(unitPos.y-400);
		this.setImage();
		this.show();
		//this.doLater('threadFly()', 100);
		this.onHitTarget.execute( new Array(targetUnit, null) );//hit 이벤트
		this.doLater('unload()', 500);
	}
	
	this.threadFly=function()
	{
		
	}

	this.findNearestEnemy=function()
	{
		var gameGround = this.playUnit.parent.parent;
		var unitPos		= this.playUnit.getPosition();
		var targetRect = null;
		if(this.playUnit.n1MotionDirection	== nxUnitMotion.DirectionBase)
			targetRect = new nxRectangle(unitPos.x, unitPos.y-200, 600, 400);
		else
			targetRect = new nxRectangle(unitPos.x-600, unitPos.y-200, 600, 400);
		var units = targetRect.getUnitsInRect();
		var targetUnit = null;
		var n4Distance = 99999;
		for(var i=0;i<units.length;i++)
		{
			if(units[i].isEnemy(this.playUnit))
			{
				var n4Dis = this.getPixelDistance(units[i]);
				if(n4Dis<=n4Distance)
				{
					targetUnit = units[i];
					n4Distance = n4Dis;
				}
			}
		}
		
		return targetUnit;
	}

	this.setImage=function()
	{
		var strIMG = "/img/rpg/spell/lightning.png";
		this.setText("<img src='"+strIMG+"' width=100% height=100%>");
	}
	
	
}
nxCallLightneingSpell.prototype = new NxControl();
nxCallLightneingSpell.prototype.constructor = nxCallLightneingSpell;