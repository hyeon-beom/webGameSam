var gameItemCode = new function _gameitem()
{//0	재료 1	무기 2	갑옷 3	투구 4	장신구 5방패 6벨트 7반지 10	탈것  21회복물약
	this.resource	= 0;
	this.weapon		= 1;
	this.armor		= 2;
	this.head		= 3;
	this.relic		= 4;
	this.subWeapon	= 5;
	this.belt		= 6;
	this.ring		= 7;
	this.horse		= 10;
	this.potion		= 21;
}


function nxGameItem(strItemName,n1ItemCode,n4ItemSN,n4ItemLevel,n4Str,n4Int,n4Conf,n4Agil,n4Damage, n4SpellDamage, n4Armor,strImg,strItemNameEng)
{
	this.strItemName	= strItemName;
	this.strItemNameEng = strItemNameEng;
	this.n1ItemCode	 = n1ItemCode;
	this.strItemCodeArr = new Array("재료",	"무기",	"갑옷", "투구",	"장신구", "방패", "탈것", "반지", "회복물약");
	this.n4ItemSN	 = n4ItemSN;
	this.n4ItemLevel = n4ItemLevel;
	this.n4Str				= n4Str;
	this.n4Int				= n4Int;
	this.n4Poli				= 0;
	this.n4Charm			= 0;
	this.n4Conf				= n4Conf;
	this.n4Agil				= n4Agil;
	this.n4Damage			= n4Damage;
	this.n4SpellDamage		= n4SpellDamage;
	this.n4Armor			= n4Armor;
	
	this.strImg = '/img/rpg/ui/'+strImg;
	this.alt = strItemName;
	this.alt += '<br><br>'+this.strItemCodeArr[n1ItemCode];
	this.alt += '<br>'+'아이템레벨: '+this.n4ItemLevel;
	this.alt += '<br>'+'힘: '+this.n4Str;
	this.alt += '<br>'+'지능: '+this.n4Int;
	this.alt += '<br>'+'민첩: '+this.n4Agil;
	this.alt += '<br>'+'체력: '+this.n4Conf;
	this.alt += '<br>'+'공격력: '+this.n4Damage;
	this.alt += '<br>'+'마법공격력: '+this.n4Damage;
	this.alt += '<br>'+'방어력: '+this.n4Armor;
	
}
/*
function nxGameWeaponItem(strItemName,n1ItemCode,n4ItemSN,n4ItemLevel,n4Str,n4Int,n4Conf,n4Agil,n4Damage, n4SpellDamage, n4Armor,strImg)
{
	nxGameItem.apply(this, arguments);
}
nxGameWeaponItem.prototype = new nxGameItem();
nxGameWeaponItem.prototype.constructor = nxGameWeaponItem;
*/
function nxGameDropItem(strLayerID, GameItem)
{
	NxControl.apply(this, arguments);
	this.frmLayer.setAttribute("name", "dropItems");
	this.GameItem	= GameItem;
	this.itemIndex	= 0;
	this.setBG('');
	this.setSize(100,100);
	
	this.itemNameLabel = new NxControl(this.id+'drop');
	this.add(this.itemNameLabel);
	this.itemNameLabel.setColor("yellow");
	this.itemNameLabel.setBG('');
	this.itemNameLabel.setSize(100,20);
	this.itemNameLabel.setText(GameItem.strItemName);
	this.itemNameLabel.show();
	
	this.itemImage = new NxControl(this.id+'dropImg');
	this.add(this.itemImage);
	this.itemImage.setBG('');
	this.itemImage.setSize(30,30);
	this.itemImage.setLocation(5,10);
	this.itemImage.src = '/img/rpg/ui/icon_DropItem.png';
	this.itemImage.show();
	
	this.getPosition = function()
	{
		return	new nxRectangle(this.getLeft(), this.getTop(), 100, 30);
	}
	this.putInven = function()
	{
		var playUnit = nxGameMain.playUnit;
		for(var i=0;i<playUnit.unitInventory.length;i++)
		{
			for(var j=0;j<playUnit.unitInventory[i].length;j++)
			{
				if(!playUnit.unitInventory[i][j])
				{
					playUnit.unitInventory[i][j] = 	this.GameItem;
					this.unloadItem();
					return;				
				}
			}
		}
	}
	this.unloadItem=function()
	{
		var droppedItems = nxGameMain.gameGround.droppedItems;
		droppedItems[this.itemIndex] = null;
		this.unload();
	}	
}
nxGameDropItem.prototype = new NxControl();
nxGameDropItem.prototype.constructor = nxGameDropItem;

var itemManager = new function _itemManager()
{
	this.n4DropIndex = 0;
	this.dropItem=function(npcPos, n4ItemLevel)
	{
		var item= null;
		if( getRand(100)>70 )
			return;
			
		var field = nxGameMain.gameGround;
		var item= this.createItem(n4ItemLevel);
		var itemControl = new nxGameDropItem('DropItem_'+this.n4DropIndex, item);
		itemControl.itemIndex = field.droppedItems.length;
		field.imgBG.add(itemControl);
		field.droppedItems[field.droppedItems.length]=itemControl;
		itemControl.setLayerIndex(npcPos.y);
		itemControl.setLocation(npcPos.x , npcPos.y-30);
		itemControl.show();
		itemControl.doLater("unloadItem()",30*1000);
		this.n4DropIndex++;
	}
	
	this.createItem=function(n4ItemLevel)
	{//receive from server when service on the real
		var item= null;
		var flag = getRand(2);
		
		if(n4ItemLevel>=8)//8
		{
			if(flag==0)
			{
				item = new nxGameItem
				(
					'장로의부적'//아이템명
					,gameItemCode.relic//아이템코드
					,0//아이템고유번호
					,8//아이템레벨
					,0//힘
					,50//지능
					,10//체력
					,5//민첩
					,0//물리데미지
					,50//마법데미지
					,0//방어력
					,'icon_relic_jangro.gif'
					,'idol'
				);
			}
			else
			{
				item = new nxGameItem
				(
					'금강대부'//아이템명
					,gameItemCode.weapon//아이템코드
					,0//아이템고유번호
					,8//아이템레벨
					,50//힘
					,20//지능
					,40//체력
					,60//민첩
					,50//물리데미지
					,50//마법데미지
					,0//방어력
					,'icon_weapon_daebu.gif'//이미지
					,'deathblow'
				); 
			}
		}
		else if(n4ItemLevel>=6)//6
		{
			if(flag==0)
			{
				item = new nxGameItem
				(
					'무쇠벨트'//아이템명
					,gameItemCode.belt//아이템코드
					,0//아이템고유번호
					,6//아이템레벨
					,10//힘
					,10//지능
					,5//체력
					,40//민첩
					,0//물리데미지
					,0//마법데미지
					,2000//방어력
					,'icon_belt_iron.gif'
					,'ironBelt'
				);
			}
			else
			{
				item = new nxGameItem
				(
					'영웅의방패'//아이템명
					,gameItemCode.subWeapon//아이템코드
					,0//아이템고유번호
					,6//아이템레벨
					,20//힘
					,20//지능
					,90//체력
					,0//민첩
					,0//물리데미지
					,0//마법데미지
					,7000//방어력
					,'icon_shield_iron.gif'//이미지
					,'ironShield'
				); 
			}
		}
		else if(n4ItemLevel>=4)//4
		{
			if(flag==0)
			{
				item = new nxGameItem
				(
					'금장투구'//아이템명
					,gameItemCode.head//아이템코드
					,0//아이템고유번호
					,4//아이템레벨
					,10//힘
					,30//지능
					,30//체력
					,25//민첩
					,0//물리데미지
					,0//마법데미지
					,4000//방어력
					,'icon_head_gold.gif'
					,'goldCap'
				);
			}
			else
			{
				item = new nxGameItem
				(
					'연환갑옷'//아이템명
					,gameItemCode.armor//아이템코드
					,0//아이템고유번호
					,4//아이템레벨
					,40//힘
					,10//지능
					,70//체력
					,5//민첩
					,0//물리데미지
					,0//마법데미지
					,5000//방어력
					,'icon_armor_yoenhwan.gif'//이미지
					,'yoenhwan'
				); 
			}
		}
		else if(n4ItemLevel>=1)
		{
			if(flag==0)
			{
				item = new nxGameItem
				(
					'강철검'//아이템명
					,gameItemCode.weapon//아이템코드
					,0//아이템고유번호
					,2//아이템레벨
					,7//힘
					,0//지능
					,10//체력
					,0//민첩
					,30//물리데미지
					,0//마법데미지
					,0//방어력
					,'icon_weapon_siron.gif'
					,'deathblow'
				);
			}
			else
			{
				item = new nxGameItem
				(
					'금장반지'//아이템명
					,gameItemCode.ring//아이템코드
					,0//아이템고유번호
					,2//아이템레벨
					,15//힘
					,5//지능
					,10//체력
					,20//민첩
					,0//물리데미지
					,0//마법데미지
					,0//방어력
					,'icon_ring_jordan.gif'//이미지
					,'jordan'
				); 
			}
		}
		
		return item;
	}
}