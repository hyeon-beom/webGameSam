
function nxGameGround_hyungno_00(strLayerID, playUnit)
{
	nxGameGround.apply(this, arguments);
	this.setWidth(800);
	this.setHeight(500);
	this.getBG=function(){		return '/img/rpg/bg/elf_01.png';	}
	this.npcUnitLoad=function()
	{
		var strUnitID = '';
		for(var i=0;i<5;i++)
		{	
			strUnitID = this.id+"_npc_nxThiefUnit_"+i;
			if(!this.nxUnitCollection.units[strUnitID])
			{
				var thief = new nxThiefUnit(strUnitID, true, 2);
				this.addUnit(thief);
				thief.setLeft((i*150)+500);
				thief.n1MotionDirection	= nxUnitMotion.DirectionInvert;
				thief.setTop( getRand(300, 150) );
				thief.show();
			}
		}
		
	}
	this.loadGate=function()
	{
		/*
		this.gate_1 = new nxGameGate(this.id+"_nxGameGate_1", 0, 'nxGameGround_hyungno_00', 1);
		this.imgBG.add(this.gate_1);
		this.gate_1.setLeft(10);
		this.gate_1.setTop(200);
		this.gate_1.show();
		*/
		this.gate_2 = new nxGameGate(this.id+"_nxGameGate_2", 1, 'nxGameGround_hyungno_01', 0);
		this.imgBG.add(this.gate_2);
		this.gate_2.setLeft(this.imgBG.getWidth()-100);
		this.gate_2.setTop(240);
		this.gate_2.show();
				
	}
}
nxGameGround_hyungno_00.prototype = new NxControl();
nxGameGround_hyungno_00.prototype.constructor = nxGameGround_hyungno_00;

function nxGameGround_hyungno_01(strLayerID, playUnit)
{
	nxGameGround.apply(this, arguments);
	this.getBG=function(){		return '/img/rpg/bg/elf_02.png';	}
	this.npcUnitLoad=function()
	{
		var strUnitID = '';
		var n4DistanceGap = 150;
		for(var i=0;i<6;i++)
		{	
			strUnitID = this.id+"_npc_nxThiefUnit_"+i;
			if(!this.nxUnitCollection.units[strUnitID])
			{
				
				var thief = getRand(2)==0?new nxThiefUnit(strUnitID, true, 2):new nxThiefThrowUnit(strUnitID, true, 2);
				this.addUnit(thief);
				thief.setLeft((i*n4DistanceGap)+500);
				thief.n1MotionDirection	= nxUnitMotion.DirectionInvert;
				thief.setTop( getRand(300, 150) );
				thief.show();
			}
		}
		
		
	}
	this.loadGate=function()
	{
		this.gate_1 = new nxGameGate(this.id+"_nxGameGate_1", 0, 'nxGameGround_hyungno_00', 1);
		this.imgBG.add(this.gate_1);
		this.gate_1.setLeft(10);
		this.gate_1.setTop(200);
		this.gate_1.show();
		
		
		this.gate_2 = new nxGameGate(this.id+"_nxGameGate_2", 1, 'nxGameGround_hyungno_02', 0);
		this.imgBG.add(this.gate_2);
		this.gate_2.setLeft(this.imgBG.getWidth()-100);
		this.gate_2.setTop(200);
		this.gate_2.show();
				
	}
}
nxGameGround_hyungno_01.prototype = new NxControl();
nxGameGround_hyungno_01.prototype.constructor = nxGameGround_hyungno_01;


function nxGameGround_hyungno_02(strLayerID, playUnit)
{
	nxGameGround.apply(this, arguments);
	this.getBG=function(){		return '/img/rpg/bg/elf_03.png';	}
	this.npcUnitLoad=function()
	{
		var strUnitID = '';
		for(var i=0;i<5;i++)
		{	
			strUnitID = this.id+"_npc_nxThiefUnit_"+i;
			if(!this.nxUnitCollection.units[strUnitID])
			{
				var n1Rnd = getRand(3);
				var thief = null;
				if(n1Rnd==0)
					thief = new nxThiefUnit(strUnitID, true, 2);
				else if(n1Rnd==1)
					thief = new nxThiefThrowUnit(strUnitID, true, 2);
				else
					thief = new nxJangRoUnit(strUnitID, true, 2);
					
				this.addUnit(thief);
				thief.setLeft((i*150)+500);
				thief.n1MotionDirection	= nxUnitMotion.DirectionInvert;
				thief.setTop( getRand(300, 150) );
				thief.show();
			}
		}
		
	}
	this.loadGate=function()
	{
		this.gate_1 = new nxGameGate(this.id+"_nxGameGate_1", 0, 'nxGameGround_hyungno_01', 1);
		this.imgBG.add(this.gate_1);
		this.gate_1.setLeft(10);
		this.gate_1.setTop(200);
		this.gate_1.show();
		
		
		this.gate_2 = new nxGameGate(this.id+"_nxGameGate_2", 1, 'nxGameGround_hyungno_03', 0);
		this.imgBG.add(this.gate_2);
		this.gate_2.setLeft(this.imgBG.getWidth()-100);
		this.gate_2.setTop(200);
		this.gate_2.show();
			
	}
}
nxGameGround_hyungno_02.prototype = new NxControl();
nxGameGround_hyungno_02.prototype.constructor = nxGameGround_hyungno_02;


function nxGameGround_hyungno_03(strLayerID, playUnit)
{
	nxGameGround.apply(this, arguments);
	this.getBG=function(){		return '/img/rpg/bg/elf_04.png';	}
	this.npcUnitLoad=function()
	{
		var strUnitID = '';
		for(var i=0;i<5;i++)
		{	
			strUnitID = this.id+"_npc_nxThiefUnit_"+i;
			if(!this.nxUnitCollection.units[strUnitID])
			{
				var n1Rnd = getRand(4);
				var thief = null;
				if(n1Rnd==0)
				thief = new nxThiefUnit(strUnitID, true, 2);
				else if(n1Rnd==1)
					thief = new nxThiefThrowUnit(strUnitID, true, 2);
				else if(n1Rnd==2)
					thief = new nxJangRoUnit(strUnitID, true, 2);
				else
					thief = new nxThiefNatureWizardUnit(strUnitID, true, 2);
					
				this.addUnit(thief);
				thief.setLeft((i*150)+500);
				thief.n1MotionDirection	= nxUnitMotion.DirectionInvert;
				thief.setTop( getRand(300, 150) );
				thief.show();
			}
		}
		
		
		
	}
	this.loadGate=function()
	{
		this.gate_1 = new nxGameGate(this.id+"_nxGameGate_1", 0, 'nxGameGround_hyungno_02', 1);
		this.imgBG.add(this.gate_1);
		this.gate_1.setLeft(10);
		this.gate_1.setTop(200);
		this.gate_1.show();
		
		
		this.gate_2 = new nxGameGate(this.id+"_nxGameGate_2", 1, 'nxGameGround_hyungno_04', 0);
		this.imgBG.add(this.gate_2);
		this.gate_2.setLeft(this.imgBG.getWidth()-100);
		this.gate_2.setTop(200);
		this.gate_2.show();
			
	}
}
nxGameGround_hyungno_03.prototype = new NxControl();
nxGameGround_hyungno_03.prototype.constructor = nxGameGround_hyungno_03;


function nxGameGround_hyungno_04(strLayerID, playUnit)
{
	nxGameGround.apply(this, arguments);
	this.getBG=function(){		return '/img/rpg/bg/elf_05.png';	}
	this.npcUnitLoad=function()
	{
		var strUnitID	= '';
		var thief		= null;
		
		strUnitID = this.id+"_npc_Unit_1";
		thief = new nxJangRoUnit(strUnitID, true, 2);
		this.addUnit(thief);
		thief.setLeft(  getRand(1000, 600)  );
		thief.setTop( getRand(300, 150) );
		thief.n1MotionDirection	= nxUnitMotion.DirectionInvert;
		thief.show();
		
		strUnitID = this.id+"_npc_Unit_2";
		thief = new nxJangRoUnit(strUnitID, true, 2);
		this.addUnit(thief);
		thief.setLeft(  getRand(1000, 600)  );
		thief.setTop( getRand(300, 150) );
		thief.n1MotionDirection	= nxUnitMotion.DirectionInvert;
		thief.show();
		
		strUnitID = this.id+"_npc_Unit_3";
		thief = new nxThiefNatureWizardUnit(strUnitID, true, 2);
		this.addUnit(thief);
		thief.setLeft(  getRand(1000, 600)  );
		thief.setTop( getRand(300, 150) );
		thief.n1MotionDirection	= nxUnitMotion.DirectionInvert;
		thief.show();
		
		strUnitID = this.id+"_npc_Unit_4";
		thief = new nxThiefNatureWizardUnit(strUnitID, true, 2);
		this.addUnit(thief);
		thief.setLeft(  getRand(1000, 600)  );
		thief.setTop( getRand(300, 150) );
		thief.n1MotionDirection	= nxUnitMotion.DirectionInvert;
		thief.show();
		
		strUnitID = this.id+"_npc_Unit_5";
		thief = new nxDumanUnit(strUnitID, true, 2);
		this.addUnit(thief);
		thief.setLeft(  getRand(1000, 600)  );
		thief.setTop( getRand(300, 150) );
		thief.n1MotionDirection	= nxUnitMotion.DirectionInvert;
		thief.show();
		
		
		
		
		
		
	}
	this.loadGate=function()
	{
		this.gate_1 = new nxGameGate(this.id+"_nxGameGate_1", 0, 'nxGameGround_hyungno_03', 1);
		this.imgBG.add(this.gate_1);
		this.gate_1.setLeft(10);
		this.gate_1.setTop(200);
		this.gate_1.show();
		
		/*
		this.gate_2 = new nxGameGate(this.id+"_nxGameGate_2", 1, 'nxGameGround_hyungno_05', 0);
		this.imgBG.add(this.gate_2);
		this.gate_2.setLeft(this.imgBG.getWidth()-100);
		this.gate_2.setTop(200);
		this.gate_2.show();
		*/
	}
}
nxGameGround_hyungno_04.prototype = new NxControl();
nxGameGround_hyungno_04.prototype.constructor = nxGameGround_hyungno_04;




