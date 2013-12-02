

function nxThiefUnit(strLayerID, isNPC)
{
	nxPlayUnit.apply(this, arguments);
	
	this.n4Level = 2;
		
	this.base_n4Str				= 10;
	this.base_n4Int				= 10;
	this.base_n4Poli			= 0;
	this.base_n4Charm			= 0;
	this.base_n4Conf			= 20;
	this.base_n4Agil			= 10;
	this.base_n4Power			= 20;

	this.isUseWeapon		= true;
	//this.weaponControl.setWeapon("dagger");
	this.strCharacterName= "밀렵꾼";

	this.setUnitAI=function(){ this.AI = this.isNPC?new nxUnitAI(this):null;}

	this.shadowControl.setTop(155);
	this.shadowControl.setLeft(155);
	this.n4UnitWidth		= 160;
	this.n4UnitHeight		= 160;
	//--능력치
	this.n4Reach			= 100;
	


	this.oninit=function()
	{
		//--bodyLayer
		this.bodyControl.setWidth(this.n4UnitWidth);
		this.bodyControl.setHeight(this.n4UnitHeight);
		this.bodyControl.setTop(30);
		this.bodyControl.setLeft(130);
		this.bodyControl.show();
		//--weaponLayer
		this.weaponControl.setWidth(this.n4UnitWidth);
		this.weaponControl.setHeight(this.n4UnitHeight);
		this.weaponControl.setTop(30);
		this.weaponControl.setLeft(130);
		if(this.isUseWeapon)
			this.weaponControl.show();
			

		this.lifeBar.setTop(40);
		this.nameLabel.setTop(50);
		
		this.unitEquipment[0] = new nxGameItem
		(
			'단검'//아이템명
			,gameItemCode.weapon//아이템코드
			,0//아이템고유번호
			,1//아이템레벨
			,3//힘
			,0//지능
			,5//체력
			,0//민첩
			,2//물리데미지
			,0//마법데미지
			,0//방어력
			,'icon_weapon_ash.gif'
			,'dagger'
		);

	}

//<---모션 배열-----------------------------------------------------------------------------
	this.getBaseMotion=function()
	{
		var MotionArray = new Array();
		//MotionArray[0] = new nxMotion("../img/rpg/human_male_thief/stand_00.png", false, 1000);
		MotionArray[0] = new nxMotion("../img/rpg/human_male_thief/stand_00.png", true, 1000);
		MotionArray[1] = new nxMotion("../img/rpg/human_male_thief/stand_01.png", true, 1000);
		
		return MotionArray;
	}
	this.getWalkMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/human_male_thief/walk_00.png", false, 200);
		MotionArray[1] = new nxMotion("../img/rpg/human_male_thief/walk_01.png", false, 200);
		MotionArray[2] = new nxMotion("../img/rpg/human_male_thief/walk_02.png", false, 200);
		MotionArray[3] = new nxMotion("../img/rpg/human_male_thief/walk_03.png", true, 200);
		
		return MotionArray;
	}
	this.getRunMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/human_male_thief/walk_00.png", false, 100);
		MotionArray[1] = new nxMotion("../img/rpg/human_male_thief/walk_01.png", false, 100);
		MotionArray[2] = new nxMotion("../img/rpg/human_male_thief/walk_02.png", false, 100);
		MotionArray[3] = new nxMotion("../img/rpg/human_male_thief/walk_03.png", true, 100);
		
		return MotionArray;
	}
	this.getNormalAttackMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/human_male_thief/attack00_00.png", false, 100);
		MotionArray[1] = new nxMotion("../img/rpg/human_male_thief/attack00_01.png", false, 100);
		MotionArray[2] = new nxMotion("../img/rpg/human_male_thief/attack00_02.png", false, 200);
		MotionArray[3] = new nxMotion("../img/rpg/human_male_thief/attack00_03.png", false, 300);

		return MotionArray;
	}
	this.getWoundMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/human_male_thief/wound_00.png", false, 100);
		MotionArray[1] = new nxMotion("../img/rpg/human_male_thief/wound_01.png", false, 100);
		MotionArray[2] = new nxMotion("../img/rpg/human_male_thief/wound_01.png", false, 100);
		MotionArray[3] = new nxMotion("../img/rpg/human_male_thief/wound_01.png", false, 600);
		return MotionArray;
	}
	this.getKnockDownMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/human_male_thief/knockdown00_00.png", false, 100);
		MotionArray[1] = new nxMotion("../img/rpg/human_male_thief/knockdown00_01.png", false, 100);
		MotionArray[2] = new nxMotion("../img/rpg/human_male_thief/knockdown00_02.png", false, 100);
		MotionArray[3] = new nxMotion("../img/rpg/human_male_thief/knockdown00_03.png", false, 100);
		MotionArray[4] = new nxMotion("../img/rpg/human_male_thief/knockdown00_04.png", false, 2000);
		return MotionArray;
	}
//<--모션배열 끝--------------------------------------------------------------------------

	//<!--효과음
	this.soundWound = "puck.mp3";
	this.soundDead	= "ahMob2.mp3";
	//-->
}
nxThiefUnit.prototype = new NxControl();
nxThiefUnit.prototype.constructor = nxThiefUnit;



function nxThiefThrowUnit(strLayerID, isNPC)
{
	nxThiefUnit.apply(this, arguments);
	this.n4Level			= 4;
	this.strCharacterName= "인간사냥꾼";
	this.weaponControl.setWeapon("dagger");
	this.setUnitAI=function(){ this.AI = this.isNPC?new nxThrowingUnitAI(this):null;}
	
	this.oninit=function()
	{
		//--bodyLayer
		this.bodyControl.setWidth(this.n4UnitWidth);
		this.bodyControl.setHeight(this.n4UnitHeight);
		this.bodyControl.setTop(30);
		this.bodyControl.setLeft(130);
		this.bodyControl.show();
		//--weaponLayer
		this.weaponControl.setWidth(this.n4UnitWidth);
		this.weaponControl.setHeight(this.n4UnitHeight);
		this.weaponControl.setTop(30);
		this.weaponControl.setLeft(130);
		if(this.isUseWeapon)
			this.weaponControl.show();
			

		this.lifeBar.setTop(40);
		this.nameLabel.setTop(50);
		
		this.unitEquipment[0] = null;

	}
}
nxThiefThrowUnit.prototype = new NxControl();
nxThiefThrowUnit.prototype.constructor = nxThiefThrowUnit;






function nxDumanUnit(strLayerID, isNPC)
{
	nxPlayUnit.apply(this, arguments);
	this.n4Level			= 10;
	this.isUseWeapon		= true;
	this.strCharacterName= "두만";
	this.weaponControl.setWeapon("axe");
	this.setUnitAI=function(){ this.AI = this.isNPC?new nxUnitAI(this,300):null;}
	
	this.n4UnitWidth		= 300;
	this.n4UnitHeight		= 300;
	//--능력치
	this.n4Reach			= 100;
	
	this.base_n4Str				= 120;
	this.base_n4Int				= 30;
	this.base_n4Poli			= 0;
	this.base_n4Charm			= 0;
	this.base_n4Conf			= 500;
	this.base_n4Agil			= 50;
	

	this.oninit=function()
	{
		//shadow
		this.shadowControl.setTop(160);
		this.shadowControl.setLeft(160);
		//--bodyLayer
		this.bodyControl.setWidth(this.n4UnitWidth);
		this.bodyControl.setHeight(this.n4UnitHeight);
		this.bodyControl.setTop(-45);
		this.bodyControl.setLeft(60);
		this.bodyControl.show();
		//--weaponLayer
		this.weaponControl.setWidth(this.n4UnitWidth);
		this.weaponControl.setHeight(this.n4UnitHeight);
		this.weaponControl.setTop(-45);
		this.weaponControl.setLeft(60);
		if(this.isUseWeapon)
			this.weaponControl.show();
			
		
		this.lifeBar.setTop(10);
		this.nameLabel.setTop(20);

		this.unitEquipment[0] = new nxGameItem
		(
			'광전사의도끼'//아이템명
			,gameItemCode.weapon//아이템코드
			,0//아이템고유번호
			,1//아이템레벨
			,100//힘
			,0//지능
			,5//체력
			,0//민첩
			,2//물리데미지
			,0//마법데미지
			,0//방어력
			,'icon_weapon_ash.gif'
			,'axe'
		);
			
	}

//<---모션 배열-----------------------------------------------------------------------------
	this.getBaseMotion=function()
	{
		var MotionArray = new Array();
		//MotionArray[0] = new nxMotion("../img/rpg/duman/stand_00.png", false, 1000);
		MotionArray[0] = new nxMotion("../img/rpg/duman/stand_00.png", true, 1000);
		MotionArray[1] = new nxMotion("../img/rpg/duman/stand_01.png", true, 1000);
		
		return MotionArray;
	}
	this.getWalkMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/duman/walk_00.png", false, 200);
		MotionArray[1] = new nxMotion("../img/rpg/duman/walk_01.png", false, 200);
		MotionArray[2] = new nxMotion("../img/rpg/duman/walk_02.png", false, 200);
		MotionArray[3] = new nxMotion("../img/rpg/duman/walk_03.png", true, 200);
		MotionArray[4] = new nxMotion("../img/rpg/duman/walk_04.png", true, 200);
		MotionArray[5] = new nxMotion("../img/rpg/duman/walk_05.png", true, 200);
		
		return MotionArray;
	}
	this.getRunMotion=function()
	{
		return this.getWalkMotion();
	}
	this.getNormalAttackMotion=function()
	{
		return this.getWindMotion();
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/duman/attack00_00.png", false, 100);
		MotionArray[1] = new nxMotion("../img/rpg/duman/attack00_01.png", false, 100);
		MotionArray[2] = new nxMotion("../img/rpg/duman/attack00_02.png", false, 200);
		MotionArray[3] = new nxMotion("../img/rpg/duman/attack00_03.png", false, 300);

		return MotionArray;
	}
	this.getWindMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/duman/wind_00.png", false, 100);
		MotionArray[1] = new nxMotion("../img/rpg/duman/wind_01.png", false, 100);
		MotionArray[2] = new nxMotion("../img/rpg/duman/wind_02.png", false, 100);
		MotionArray[3] = new nxMotion("../img/rpg/duman/wind_03.png", false, 100);

		return MotionArray;
	}
	this.getWoundMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/duman/wound_00.png", false, 100);
		MotionArray[1] = new nxMotion("../img/rpg/duman/wound_01.png", false, 100);
		MotionArray[2] = new nxMotion("../img/rpg/duman/wound_02.png", false, 300);
		return MotionArray;
	}
	this.getKnockDownMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/duman/knockdown00_00.png", false, 100);
		MotionArray[1] = new nxMotion("../img/rpg/duman/knockdown00_01.png", false, 100);
		MotionArray[2] = new nxMotion("../img/rpg/duman/knockdown00_02.png", false, 100);
		MotionArray[3] = new nxMotion("../img/rpg/duman/knockdown00_03.png", false, 2000);
		
		return MotionArray;
	}
	
//<--모션배열 끝--------------------------------------------------------------------------
//<!--효과음
	this.soundWound = "ahMob1.mp3";
	this.soundDead	= "ahMob2.mp3";
	//-->
}
nxDumanUnit.prototype = new NxControl();
nxDumanUnit.prototype.constructor = nxDumanUnit;




function nxJangRoUnit(strLayerID, isNPC)
{
	nxPlayUnit.apply(this, arguments);
	this.n4Level			= 6;
	this.base_n4Str			= 10;
	this.base_n4Int			= 50;
	this.base_n4Poli		= 0;
	this.base_n4Charm		= 0;
	this.base_n4Conf		= 30;
	this.base_n4Agil		= 10;

	this.isUseWeapon		= false;
	//this.weaponControl.setWeapon("dagger");
	this.strCharacterName= "흉노족술사";

	this.setUnitAI=function(){ this.AI = this.isNPC?new nxJangroUnitAI(this):null;}

	this.shadowControl.setTop(155);
	this.shadowControl.setLeft(155);
	this.n4UnitWidth		= 250;
	this.n4UnitHeight		= 250;
	//--능력치
	this.n4Reach			= 100;
	


	this.oninit=function()
	{
		//--bodyLayer
		this.bodyControl.setWidth(this.n4UnitWidth);
		this.bodyControl.setHeight(this.n4UnitHeight);
		this.bodyControl.setTop(-15);
		this.bodyControl.setLeft(80);
		this.bodyControl.show();
		//--weaponLayer
		this.weaponControl.setWidth(this.n4UnitWidth);
		this.weaponControl.setHeight(this.n4UnitHeight);
		this.weaponControl.setTop(-15);
		this.weaponControl.setLeft(80);
		if(this.isUseWeapon)
			this.weaponControl.show();
			

		this.lifeBar.setTop(10);
		this.nameLabel.setTop(20);
	}

//<---모션 배열-----------------------------------------------------------------------------
	this.getBaseMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/jangro/stand_00.png", true, 1000);
		
		return MotionArray;
	}
	this.getWalkMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/jangro/walk_00.png", false, 200);
		MotionArray[1] = new nxMotion("../img/rpg/jangro/walk_01.png", false, 200);
		MotionArray[2] = new nxMotion("../img/rpg/jangro/walk_02.png", false, 200);
		MotionArray[3] = new nxMotion("../img/rpg/jangro/walk_03.png", false, 200);
		MotionArray[4] = new nxMotion("../img/rpg/jangro/walk_04.png", true, 200);
		
		return MotionArray;
	}
	this.getRunMotion=function()
	{
		return this.getWalkMotion();
	}
	this.getCastMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/jangro/cast00_00.png", false, 100);
		MotionArray[1] = new nxMotion("../img/rpg/jangro/cast00_01.png", false, 100);
		MotionArray[2] = new nxMotion("../img/rpg/jangro/cast00_02.png", false, 500);

		return MotionArray;
	}
	this.getNormalAttackMotion=function()
	{
		return this.getCastMotion();
	}
	this.getWoundMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/jangro/wound_00.png", false, 500);
		MotionArray[1] = new nxMotion("../img/rpg/jangro/wound_01.png", false, 100);
		return MotionArray;
	}
	this.getKnockDownMotion=function()
	{
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/jangro/knockdown00_00.png", false, 100);
		MotionArray[1] = new nxMotion("../img/rpg/jangro/knockdown00_01.png", false, 100);
		MotionArray[2] = new nxMotion("../img/rpg/jangro/knockdown00_02.png", false, 2000);
		return MotionArray;
	}
//<--모션배열 끝--------------------------------------------------------------------------

	//<!--효과음
	this.soundWound = "puck.mp3";
	this.soundDead	= "ahMob2.mp3";
	//-->
}
nxJangRoUnit.prototype = new NxControl();
nxJangRoUnit.prototype.constructor = nxJangRoUnit;

function nxThiefNatureWizardUnit(strLayerID, isNPC)
{
	nxWizardUnit.apply(this, arguments);
	this.n4Level			= 8;
	
	this.base_n4Str				= 10;
	this.base_n4Int				= 50;
	this.base_n4Poli			= 0;
	this.base_n4Charm			= 0;
	this.base_n4Conf			= 50;
	this.base_n4Agil			= 10;
	
	this.strCharacterName= "흉노족자연술사";
	this.isUseWeapon		= false;
	
}
nxThiefNatureWizardUnit.prototype = new NxControl();
nxThiefNatureWizardUnit.prototype.constructor = nxThiefNatureWizardUnit;
