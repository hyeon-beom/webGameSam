

function nxWarriorUnit(strLayerID, isNPC)
{
	nxPlayUnit.apply(this, arguments);
	
	//정보
	this.unitClass			= nxUnitClass.warrior; 
	this.strCharacterName	= "테스트파이터";
	
	//--능력치
	this.base_n4Reach			= 120;
	//this.n4Prevent			= 50;//%
	this.base_n4Str				= 50;
	this.base_n4Int				= 10;
	this.base_n4Poli			= 0;
	this.base_n4Charm			= 0;
	this.base_n4Conf			= 50;
	this.base_n4Agil			= 100;
	this.base_n4Armor			= 600;
	
	
	this.oninit=function()
	{
		this.unitEquipment[0] = new nxGameItem
		(
			'철검'//아이템명
			,gameItemCode.weapon//아이템코드
			,0//아이템고유번호
			,1//아이템레벨
			,3//힘
			,0//지능
			,5//체력
			,0//민첩
			,10//물리데미지
			,0//마법데미지
			,0//방어력
			,'icon_weapon_iron.gif'
			,'deathblow'
		);
		this.unitInventory[0][0] = new nxGameItem
		(
			'구리반지'//아이템명
			,gameItemCode.ring//아이템코드
			,0//아이템고유번호
			,1//아이템레벨
			,5//힘
			,5//지능
			,10//체력
			,10//민첩
			,0//물리데미지
			,2//마법데미지
			,0//방어력
			,'icon_ring_jordan.gif'//이미지
		); 
	}

//<---모션 배열-----------------------------------------------------------------------------
	this.getBaseMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/warrior/stand_00.png", false, 1000);
		MotionArray[1] = new nxMotion("../img/rpg/warrior/stand_01.png", true, 1000);
		
		return MotionArray;
	}
	this.getWalkMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/warrior/walk_00.png", false, 200);
		MotionArray[1] = new nxMotion("../img/rpg/warrior/walk_01.png", false, 200);
		MotionArray[2] = new nxMotion("../img/rpg/warrior/walk_02.png", false, 200);
		MotionArray[3] = new nxMotion("../img/rpg/warrior/walk_03.png", false, 200);
		MotionArray[4] = new nxMotion("../img/rpg/warrior/walk_04.png", false, 200);
		MotionArray[5] = new nxMotion("../img/rpg/warrior/walk_05.png", false, 200);
		MotionArray[6] = new nxMotion("../img/rpg/warrior/walk_06.png", true, 200);
		
		return MotionArray;
	}
	this.getRunMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/warrior/run00_00.png", false, 200);
		MotionArray[1] = new nxMotion("../img/rpg/warrior/run00_01.png", false, 200);
		MotionArray[2] = new nxMotion("../img/rpg/warrior/run00_02.png", false, 200);
		MotionArray[3] = new nxMotion("../img/rpg/warrior/run00_03.png", false, 200);
		MotionArray[4] = new nxMotion("../img/rpg/warrior/run00_04.png", false, 200);
		MotionArray[5] = new nxMotion("../img/rpg/warrior/run00_05.png", true, 200);
		
		return MotionArray;
	}
	this.getNormalAttackMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/warrior/attack00_00.png", false, 200);
		MotionArray[1] = new nxMotion("../img/rpg/warrior/attack00_01.png", false, 50);
		MotionArray[2] = new nxMotion("../img/rpg/warrior/attack00_02.png", false, 50);
		MotionArray[3] = new nxMotion("../img/rpg/warrior/attack00_03.png", false, 50);
		MotionArray[4] = new nxMotion("../img/rpg/warrior/attack00_04.png", false, 200);

		return MotionArray;
	}
	this.getWoundMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/warrior/wound_00.png", false, 500);
		MotionArray[1] = new nxMotion("../img/rpg/warrior/wound_01.png", false, 100);
		MotionArray[2] = new nxMotion("../img/rpg/warrior/wound_02.png", false, 100);
		return MotionArray;
	}
	this.getKnockDownMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/warrior/knockdown00_00.png", false, 100);
		MotionArray[1] = new nxMotion("../img/rpg/warrior/knockdown00_01.png", false, 100);
		MotionArray[2] = new nxMotion("../img/rpg/warrior/knockdown00_02.png", false, 100);
		MotionArray[3] = new nxMotion("../img/rpg/warrior/knockdown00_03.png", false, 100);
		MotionArray[4] = new nxMotion("../img/rpg/warrior/knockdown00_04.png", false, 2000);
		return MotionArray;
	}
	
	this.getJumpMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/warrior/jump00_00.png", false, 100);
		MotionArray[1] = new nxMotion("../img/rpg/warrior/jump00_01.png", false, 100);
		MotionArray[2] = new nxMotion("../img/rpg/warrior/jump00_02.png", false, 100);
		MotionArray[3] = new nxMotion("../img/rpg/warrior/jump00_03.png", false, 100);
		MotionArray[4] = new nxMotion("../img/rpg/warrior/jump00_04.png", false, 100);

		return MotionArray;
	}
	this.getDodgeMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/warrior/dodge00_00.png", false, 100);
		MotionArray[1] = new nxMotion("../img/rpg/warrior/dodge00_01.png", false, 100);
		MotionArray[2] = new nxMotion("../img/rpg/warrior/dodge00_02.png", false, 100);
		MotionArray[3] = new nxMotion("../img/rpg/warrior/dodge00_03.png", false, 100);
		MotionArray[4] = new nxMotion("../img/rpg/warrior/dodge00_04.png", false, 100);
		
		return MotionArray;
	}
//<--모션배열 끝--------------------------------------------------------------------------

//<!--효과음
	this.soundWound = "puckPlayer.mp3";
	this.soundDead	= "dieMan.mp3";
//-->
}
nxWarriorUnit.prototype = new NxControl();
nxWarriorUnit.prototype.constructor = nxWarriorUnit;





function nxWizardUnit(strLayerID, isNPC)
{
	nxPlayUnit.apply(this, arguments);
	
	
	//정보
	this.unitClass			= nxUnitClass.wizard; 
	this.isUseWeapon		= false;
	this.strCharacterName	= "천재지략가";
	//--능력치
	this.n4Reach			= 120;
	
	this.base_n4Str				= 10;
	this.base_n4Int				= 50;
	this.base_n4Poli			= 0;
	this.base_n4Charm			= 0;
	this.base_n4Conf			= 30;
	this.base_n4Agil			= 10;
	
	this.setUnitAI=function(){ this.AI = this.isNPC?new nxWizardUnitAI(this,1000):null;}
	
	this.oninit=function()
	{
		//--bodyLayer
		//this.bodyControl.setLeft(30);
		this.bodyControl.show();
		//--weaponLayer
		this.weaponControl.setWidth(this.n4UnitWidth);
		this.weaponControl.setHeight(this.n4UnitHeight);
		//this.weaponControl.setTop(-30);
		if(this.isUseWeapon)
			this.weaponControl.show();
		this.shadowControl.setLeft(145);
	}

//<---모션 배열-----------------------------------------------------------------------------
	this.getBaseMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/Wizard/stand_00.png", false, 1000);
		MotionArray[0] = new nxMotion("../img/rpg/Wizard/stand_00.png", true, 1000);
		
		return MotionArray;
	}
	this.getWalkMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/Wizard/walk_00.png", false, 200);
		MotionArray[1] = new nxMotion("../img/rpg/Wizard/walk_01.png", false, 200);
		MotionArray[2] = new nxMotion("../img/rpg/Wizard/walk_02.png", false, 200);
		MotionArray[3] = new nxMotion("../img/rpg/Wizard/walk_03.png", false, 200);
		MotionArray[4] = new nxMotion("../img/rpg/Wizard/walk_04.png", false, 200);
		MotionArray[5] = new nxMotion("../img/rpg/Wizard/walk_05.png", true, 200);
		
		return MotionArray;
	}
	this.getRunMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/Wizard/run_00.png", false, 200);
		MotionArray[1] = new nxMotion("../img/rpg/Wizard/run_01.png", false, 200);
		MotionArray[2] = new nxMotion("../img/rpg/Wizard/run_02.png", false, 200);
		MotionArray[3] = new nxMotion("../img/rpg/Wizard/run_03.png", false, 200);
		MotionArray[4] = new nxMotion("../img/rpg/Wizard/run_04.png", false, 200);
		MotionArray[5] = new nxMotion("../img/rpg/Wizard/run_05.png", true, 200);
		
		return MotionArray;
	}
	this.getNormalAttackMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/Wizard/cast00_00.png", false, 200);
		MotionArray[1] = new nxMotion("../img/rpg/Wizard/cast00_01.png", false, 50);
		MotionArray[2] = new nxMotion("../img/rpg/Wizard/cast00_02.png", false, 1000);


		return MotionArray;
	}
	this.getWoundMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/Wizard/wound_00.png", false, 500);
		MotionArray[1] = new nxMotion("../img/rpg/Wizard/wound_01.png", false, 100);
		MotionArray[2] = new nxMotion("../img/rpg/Wizard/wound_02.png", false, 100);
		return MotionArray;
	}
	this.getKnockDownMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/Wizard/knockdown00_00.png", false, 100);
		MotionArray[1] = new nxMotion("../img/rpg/Wizard/knockdown00_01.png", false, 100);
		MotionArray[2] = new nxMotion("../img/rpg/Wizard/knockdown00_02.png", false, 100);
		MotionArray[3] = new nxMotion("../img/rpg/Wizard/knockdown00_03.png", false, 2000);
		return MotionArray;
	}
	
	this.getJumpMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/wizard/jump_00.png", false, 100);
		MotionArray[1] = new nxMotion("../img/rpg/wizard/jump_01.png", false, 200);
		MotionArray[2] = new nxMotion("../img/rpg/wizard/jump_02.png", false, 200);
		MotionArray[3] = new nxMotion("../img/rpg/wizard/jump_03.png", false, 100);

		return MotionArray;
	}
	
//<--모션배열 끝--------------------------------------------------------------------------

//<!--효과음
	this.soundWound = "puckWoman.mp3";
	this.soundDead	= "dieWoman.mp3";
	//-->
}
nxWizardUnit.prototype = new NxControl();
nxWizardUnit.prototype.constructor = nxWizardUnit;

