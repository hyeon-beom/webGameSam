
function nxGameGround(strLayerID, playUnit)
{
	NxControl.apply(this, arguments);
	
	this.setWidth(800);
	this.setHeight(500);
	this.playUnit	= playUnit;
	this.imgBG		= null;
	this.gate_1		= null;
	this.gate_2		= null;
	//this.style.overflow		= "auto";
	this.droppedItems = new Array();

	this.init=function()//밖에서 호출해줘야함
	{
		this.loadBG();
		this.addUnit(this.playUnit);
		this.loadGate();
		this.checkRespawn();
		this.addKeyEvent();
	}
	this.getBG=function()
	{
		return null;//'/img/rpg/bg/elf_00.png';
	}
	this.loadBG = function()
	{
		this.imgBG = new NxControl(this.id+"_gameBG");
		this.add(this.imgBG);
		this.imgBG.src = this.getBG();
		this.imgBG.setWidth(this.getWidth()*2);
		this.imgBG.setHeight(this.getHeight());
		this.imgBG.setLayerIndex(nxGameLayer.n4LayerIndex_BG);
		this.imgBG.style.position="relative";
		this.imgBG.show();
	}
	this.loadGate=function()
	{
		/*
		this.gate_1 = new nxGameGate(this.id+"_nxGameGate_1", 0, 'nxGameGround_hyungno_00', 1);
		this.imgBG.add(this.gate_1);
		this.gate_1.setLeft(this.imgBG.getWidth()-100);
		this.gate_1.setTop(200);
		this.gate_1.show();
		
		this.gate_2 = new nxGameGate(this.id+"_nxGameGate_2", 1, 'nxGameGround_hyungno_00', 0);
		this.imgBG.add(this.gate_2);
		this.gate_2.setLeft(10);
		this.gate_2.setTop(200);
		this.gate_2.show();
		*/		
	}
	this.setPlayerCamera=function()
	{
		var pos = this.playUnit.getPosition();
		var posCamMoveStart = this.getWidth()/2;
		var n4RightEnd		= this.imgBG.getWidth()-posCamMoveStart;
		
		if(pos.x> n4RightEnd)
		{
			var n4Absolute = this.getWidth()-this.imgBG.getWidth();
			if(this.imgBG.getLeft()!=n4Absolute)
				this.imgBG.setLeft(n4Absolute);
		}
		else if(pos.x> posCamMoveStart)
		{
			var n4Absolute = posCamMoveStart-pos.x;
			if(this.imgBG.getLeft()!=n4Absolute)
				this.imgBG.setLeft(n4Absolute);
		}
		
		if(this.gate_1)
			this.gate_1.checkPoint(pos);
		if(this.gate_2)
			this.gate_2.checkPoint(pos);
	}
	this.getRealEnableRect=function()
	{
		var x = 20;
		var y = this.imgBG.getHeight()*0.6;
		var width	= this.imgBG.getWidth()-(x*2);
		var height	= this.imgBG.getHeight()-y;
		return new nxRectangle(x, y, width, height);
	}	
	//var nxUnitCollection = new function _nxUnitCollection()
	this.nxUnitCollection = new function _nxUnitCollection()
	{
		this.units = new Array();
		this.add = function(objVal)
		{
			for(var i=0; i<100; i++)
			{
				if(this.units[i]==null)
				{
					this.units[i] = objVal;
					this.units[objVal.id] = objVal;
					objVal.n4CollentionIndex = i;
					objVal.remove=function()
					{
						nxGameMain.gameGround.nxUnitCollection.remove(this.id)
					}
					return;
				}
			}
			alert("유닛배열 최대값을 초과하였습니다.");
		}

		this.remove=function(strUnitID)
		{
			var unit	= this.units[strUnitID];
			if(unit)
			{
				var index	= unit.n4CollentionIndex
				this.units[strUnitID] = null;
				this.units[index]  = null;
				unit.strLocationID = null;
			}
		}
	}
	this.addUnit = function(playUnit)
	{
		this.nxUnitCollection.add(playUnit);
		this.imgBG.add(playUnit);
		playUnit.strLocationID = this.id;
	}	
	
	this.checkRespawn=function()
	{
		this.npcUnitLoad();
		this.doLater("checkRespawn()",1000*60*3);
	}
	this.npcUnitLoad=function()
	{
		var strUnitID = '';
		for(var i=5;i<7;i++)
		{	
			strUnitID = this.id+"_npc_nxThiefUnit_"+i;
			if(!this.nxUnitCollection.units[strUnitID])
			{
				var playUnit2 = new nxThiefUnit(strUnitID, true, 2);
				this.addUnit(playUnit2);
				playUnit2.setLeft((i*100));
				playUnit2.n1MotionDirection	= nxUnitMotion.DirectionInvert;
				playUnit2.setTop(250);
				playUnit2.show();
			}
		}
		
		strUnitID = this.id+"_npc_nxDumanUnit";
		if(!this.nxUnitCollection.units[strUnitID])
		{
			var playUnit2 = new nxDumanUnit(strUnitID, true, 2);
			this.addUnit(playUnit2);
			playUnit2.setLeft(400);
			playUnit2.n1MotionDirection	= nxUnitMotion.DirectionInvert;
			playUnit2.setTop(200);
			playUnit2.show();
		}
		
		strUnitID = this.id+"_npc_nxThiefThrowUnit";
		if(!this.nxUnitCollection.units[strUnitID])
		{
			var thrower = new nxThiefThrowUnit(strUnitID, true, 2);
			this.addUnit(thrower);
			thrower.setLeft(800);
			thrower.n1MotionDirection	= nxUnitMotion.DirectionInvert;
			thrower.setTop(200);
			thrower.show();
		}
		
	}
	this.addKeyEvent=function()
	{
		var playUnit = this.playUnit;
		var isEndKey = 1;
		document.body.onkeydown=function(e)
		{
			if(isEndKey==0)
				return;

			isEndKey = 0;
			var keyCode = 0;
			if(document.all)
				keyCode=event.keyCode
			else
				keyCode=e.which;

			playUnit.receiveKeyDownEvent(keyCode);
		}
		document.body.onkeyup=function(e)
		{
			var keyCode = 0;
			if(document.all)
				keyCode=event.keyCode
			else
				keyCode=e.which;

			playUnit.receiveKeyUpEvent(keyCode);

			isEndKey = 1;
		}

		document.body.onkeypress=function(e)
		{
			if(isEndKey==0)
				return;

			isEndKey = 0;
			var keyCode = 0;
			if(document.all)
				keyCode=event.keyCode
			else
				keyCode=e.which;

			playUnit.receiveKeyDownEvent(keyCode);

		}
	}
	
	document.onkeydown=function(e)
	{
		var keyCode = 0;
		if(document.all)
			keyCode=event.keyCode
		else
			keyCode=e.which;
		return;		
		if (keyCode == 116) 
		{
			if(document.all)
				event.keyCode = 0;
			alert("새로고침을 사용하실 수 없습니다.(모든 정보가 초기화됩니다.)");
			return false;
		}	
	}
		
	if(false)
	{
		this.debugWindow = new NxControl('debugLayer');
		//this.add(this.debugWindow);
		this.debugWindow.setLayerIndex(100);
		this.debugWindow.setWidth(300);
		this.debugWindow.setHeight(400);
		this.debugWindow.setFontSize(15);
		this.debugWindow.setBG('');
		//this.debugWindow.setText("<span style='background:black'>이동: ←좌 →우 ↑상 ↓하 →→달리기		<br>		무기 착용/해제 : R		<br>		일반공격 : S</span>");
		this.debugWindow.style.overflow = "auto";
		this.debugWindow.show();
	}
	
}
nxGameGround.prototype = new NxControl();
nxGameGround.prototype.constructor = nxGameGround;

var nxGameLayer = new function _nxGameLayer()
{
	n4LayerIndex_BG		=     0;
	n4LayerIndex_Gate	=  5000;
	n4LayerIndex_Spell	=  7000;
	n4LayerIndex_GUI	= 10000;
}