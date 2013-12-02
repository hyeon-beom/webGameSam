function nxBuildingUnit(strLayerID, n4BuildingSN)
{
	nxUnit.apply(this, arguments);
	if(!n4BuildingSN)
	{
		alert('건물고유번호 없음');
		return;
	}
	
	this.n4BuildingCode = null;
	this.n4KingSN		= null;
	this.n4CastleSN		= null;
	this.n4BuildingSN	= n4BuildingSN;
	this.n4Durability	= null;
	this.n4BuildingLevel= null;
	this.n4MasterSN		= null;
	this.n4Gold			= null;
	this.n4Rice			= null;
	this.n1Security		= null;
	this.strCastleName  = null;
	this.strMasterName	= null;
	this.strNationName	= null;
	this.n1BuildingStatus	= 0;
	this.n4TotalSeconds		= 0; 

	this.src = 'none;';
	this.style.zIndex = nxLayer.n4Layer_Unit;
	this.popMenu = null;

	this.viewBuidingStatus=function(isClearJob)
	{
		if(isClearJob && this.UpgradeIcon!=null)
		{
			this.n1BuildingStatus	= 0;
			this.n4TotalSeconds		= 0; 
			this.UpgradeIcon.unload();
		}
		else if(this.n1BuildingStatus>0 && this.UpgradeIcon==null)
		{
			this.UpgradeIcon = new NxControl('UpgradeIcon'+this.id);
			this.add(this.UpgradeIcon);
			this.UpgradeIcon.setWidth(40);
			this.UpgradeIcon.setHeight(40);
			//this.UpgradeIcon.moveCenter();
			//this.UpgradeIcon.moveVCenter();
			this.UpgradeIcon.setBG('');
			this.UpgradeIcon.src = 'http://nexen.pe.kr/img/icon/produce.gif';
			
			if(this.n1BuildingStatus==1)
				this.UpgradeIcon.setAlt("생산 중");
			else if(this.n1BuildingStatus==2)
				this.UpgradeIcon.setAlt("업그레이드 중");
			else if(this.n1BuildingStatus==3)
				this.UpgradeIcon.setAlt("제련 중");
			this.UpgradeIcon.show();
			
			setTimeout("try{document.getElementById('"+this.id+"').NxControl.viewBuidingStatus(true)}catch(e){};", this.n4TotalSeconds*1000);
		}
	}

	this.frmLayer.onmousedown=function(e)
	{
		
		nxStatic.closePopup();
		var n1Btn = 0;
		if(document.all)
			n1Btn = event.button==0?2:event.button;
		else
			n1Btn = e.button==0?1:2;

		//if(n1Btn==2)
		//{
			this.NxControl.selectUnit();
			if(this.NxControl.popMenu)
			{
				this.NxControl.popMenu.setLeft(this.NxControl.parent.mX);
				this.NxControl.popMenu.setTop(this.NxControl.parent.mY);
				this.NxControl.popMenu.show();
			}
		//}
	}

	this.frmLayer.onclick=function()
	{
		this.NxControl.selectUnit();
	}
	
}
nxBuildingUnit.prototype = new NxControl();
nxBuildingUnit.prototype.constructor = nxBuildingUnit;

function nxCastleBuildingUnit(strLayerID)
{
	if(!strLayerID)
		return;
	nxBuildingUnit.apply(this, arguments);

	this.n4General			= null;
	this.n4Prisoner			= 0;
	this.n4PrivateGeneral	= null;
	this.n1Security			= null;
	this.n1PerTax			= null;
	this.n1LikeZen			= null;
	this.n4ZenCount			= 0;
	this.setWidth(nxStatic.n4CellWidth*2);
	this.setHeight(nxStatic.n4CellHeight*2);

	this.src = 'http://nexen.pe.kr/img/building/sung.png';
	this.popMenu = new nxPopupCastle('nxPopupCastle_'+this.id, this);
	this.setAlt("성");
	
}
nxCastleBuildingUnit.prototype = new NxControl();
nxCastleBuildingUnit.prototype.constructor = nxCastleBuildingUnit;

function nxBaseBuildingUnit(strLayerID)
{
	if(!strLayerID)
		return;
	nxBuildingUnit.apply(this, arguments);

	this.n4General			= null;
	this.n4Prisoner			= 0;
	this.n4PrivateGeneral	= null;
	

	this.src = 'http://nexen.pe.kr/img/building/base.gif';
	this.popMenu = new nxPopupBase('nxPopupBase_'+this.id, this);
	this.setAlt("본진");
	
}
nxBaseBuildingUnit.prototype = new NxControl();
nxBaseBuildingUnit.prototype.constructor = nxBaseBuildingUnit;


function nxFarmBuildingUnit(strLayerID)
{
	if(!strLayerID)
		return;
	nxBuildingUnit.apply(this, arguments);
	this.n4BuildingCode = nxStatic.n4BuildingCode_Farm;
	this.src = 'http://nexen.pe.kr/img/building/Farm.gif';
	this.popMenu = new nxPopupNormalBuilding('nxFarmBuildingUnit_'+this.id, this);
	this.setAlt("농장");
	
}
nxFarmBuildingUnit.prototype = new NxControl();
nxFarmBuildingUnit.prototype.constructor = nxFarmBuildingUnit;

function nxBarrackBuildingUnit(strLayerID)
{
	if(!strLayerID)
		return;
	nxBuildingUnit.apply(this, arguments);
	this.n4BuildingCode = nxStatic.n4BuildingCode_Barrack;
	this.src = 'http://nexen.pe.kr/img/building/barrack.gif';
	this.popMenu = new nxPopupNormalBuilding('nxBarrackBuildingUnit_'+this.id, this);
	this.setAlt("병영");
	
}
nxBarrackBuildingUnit.prototype = new NxControl();
nxBarrackBuildingUnit.prototype.constructor = nxBarrackBuildingUnit;

function nxHorseBuildingUnit(strLayerID)
{
	if(!strLayerID)
		return;
	nxBuildingUnit.apply(this, arguments);
	this.n4BuildingCode = nxStatic.n4BuildingCode_Horse;
	this.src = 'http://nexen.pe.kr/img/building/horse.gif';
	this.popMenu = new nxPopupNormalBuilding('nxHorseBuildingUnit_'+this.id, this);
	this.setAlt("마구간");
	
}
nxHorseBuildingUnit.prototype = new NxControl();
nxHorseBuildingUnit.prototype.constructor = nxHorseBuildingUnit;


function nxBlackSmithBuildingUnit(strLayerID)
{
	if(!strLayerID)
		return;
	nxBuildingUnit.apply(this, arguments);
	this.n4BuildingCode = nxStatic.n4BuildingCode_BlackSM;
	this.src = 'http://nexen.pe.kr/img/building/BlackSmith.gif';
	this.popMenu = new nxPopupNormalBuilding('nxBlackSmithBuildingUnit_'+this.id, this);
	this.setAlt("대장간");
	
}
nxBlackSmithBuildingUnit.prototype = new NxControl();
nxBlackSmithBuildingUnit.prototype.constructor = nxBlackSmithBuildingUnit;

function nxTowerBuildingUnit(strLayerID)
{
	if(!strLayerID)
		return;

	nxBuildingUnit.apply(this, arguments);
	this.n4BuildingCode = nxStatic.n4BuildingCode_Tower;
	this.src = 'http://nexen.pe.kr/img/building/tower.png';
	this.popMenu = new nxPopupNormalBuilding('nxTowerBuildingUnit_'+this.id, this);
	this.setAlt("궁노");
	
}
nxTowerBuildingUnit.prototype = new NxControl();
nxTowerBuildingUnit.prototype.constructor = nxTowerBuildingUnit;



function nxKangjokBuildingUnit(strLayerID)
{
	if(!strLayerID)
		return;
	nxBuildingUnit.apply(this, arguments);

	this.n4General			= null;
	this.n4Prisoner			= 0;
	this.n4PrivateGeneral	= null;
	this.setWidth(nxStatic.n4CellWidth*1);
	this.setHeight(nxStatic.n4CellHeight*1);
	

	this.src = 'http://nexen.pe.kr/img/building/kangjok.png';
	this.popMenu = new nxPopupNpcBuilding('nxPopupNpcBuilding_'+this.id, this);
	this.setAlt("강족거점");
	
}
nxKangjokBuildingUnit.prototype = new NxControl();
nxKangjokBuildingUnit.prototype.constructor = nxKangjokBuildingUnit;

function nxHwangKunJokBuildingUnit(strLayerID)
{
	if(!strLayerID)
		return;
	nxBuildingUnit.apply(this, arguments);

	this.n4General			= null;
	this.n4Prisoner			= 0;
	this.n4PrivateGeneral	= null;
	this.setWidth(nxStatic.n4CellWidth*1);
	this.setHeight(nxStatic.n4CellHeight*1);
	

	this.src = 'http://nexen.pe.kr/img/building/hongkun.png';
	this.popMenu = new nxPopupNpcBuilding('nxPopupNpcBuilding_'+this.id, this);
	this.setAlt("황건적거점");
	
}
nxHwangKunJokBuildingUnit.prototype = new NxControl();
nxHwangKunJokBuildingUnit.prototype.constructor = nxHwangKunJokBuildingUnit;


function nxHyungnoBuildingUnit(strLayerID)
{
	if(!strLayerID)
		return;
	nxBuildingUnit.apply(this, arguments);

	this.n4General			= null;
	this.n4Prisoner			= 0;
	this.n4PrivateGeneral	= null;
	this.setWidth(nxStatic.n4CellWidth*1);
	this.setHeight(nxStatic.n4CellHeight*1);
	

	this.src = 'http://nexen.pe.kr/img/building/hyungno.png';
	this.popMenu = new nxPopupNpcBuilding('nxPopupNpcBuilding_'+this.id, this);
	this.setAlt("흉노족거점");
	
}
nxHyungnoBuildingUnit.prototype = new NxControl();
nxHyungnoBuildingUnit.prototype.constructor = nxHyungnoBuildingUnit;



function nxCrossArmyBuildingUnit(strLayerID)
{
	if(!strLayerID)
		return;
	nxBuildingUnit.apply(this, arguments);

	this.n4General			= null;
	this.n4Prisoner			= 0;
	this.n4PrivateGeneral	= null;
	this.setWidth(nxStatic.n4CellWidth*2);
	this.setHeight(nxStatic.n4CellHeight*2);
	

	this.src = 'http://nexen.pe.kr/img/building/castle.png';
	this.popMenu = new nxPopupNpcBuilding('nxPopupNpcBuilding_'+this.id, this);
	this.setAlt("십자군요새");
	
}
nxCrossArmyBuildingUnit.prototype = new NxControl();
nxCrossArmyBuildingUnit.prototype.constructor = nxCrossArmyBuildingUnit;
