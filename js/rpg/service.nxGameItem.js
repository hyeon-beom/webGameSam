var gameItemCode = new function _gameitem()
{//0	��� 1	���� 2	���� 3	���� 4	��ű� 5���� 6��Ʈ 7���� 10	Ż��  21ȸ������
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
	this.strItemCodeArr = new Array("���",	"����",	"����", "����",	"��ű�", "����", "Ż��", "����", "ȸ������");
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
	this.alt += '<br>'+'�����۷���: '+this.n4ItemLevel;
	this.alt += '<br>'+'��: '+this.n4Str;
	this.alt += '<br>'+'����: '+this.n4Int;
	this.alt += '<br>'+'��ø: '+this.n4Agil;
	this.alt += '<br>'+'ü��: '+this.n4Conf;
	this.alt += '<br>'+'���ݷ�: '+this.n4Damage;
	this.alt += '<br>'+'�������ݷ�: '+this.n4Damage;
	this.alt += '<br>'+'����: '+this.n4Armor;
	
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
					'����Ǻ���'//�����۸�
					,gameItemCode.relic//�������ڵ�
					,0//�����۰�����ȣ
					,8//�����۷���
					,0//��
					,50//����
					,10//ü��
					,5//��ø
					,0//����������
					,50//����������
					,0//����
					,'icon_relic_jangro.gif'
					,'idol'
				);
			}
			else
			{
				item = new nxGameItem
				(
					'�ݰ����'//�����۸�
					,gameItemCode.weapon//�������ڵ�
					,0//�����۰�����ȣ
					,8//�����۷���
					,50//��
					,20//����
					,40//ü��
					,60//��ø
					,50//����������
					,50//����������
					,0//����
					,'icon_weapon_daebu.gif'//�̹���
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
					'���躧Ʈ'//�����۸�
					,gameItemCode.belt//�������ڵ�
					,0//�����۰�����ȣ
					,6//�����۷���
					,10//��
					,10//����
					,5//ü��
					,40//��ø
					,0//����������
					,0//����������
					,2000//����
					,'icon_belt_iron.gif'
					,'ironBelt'
				);
			}
			else
			{
				item = new nxGameItem
				(
					'�����ǹ���'//�����۸�
					,gameItemCode.subWeapon//�������ڵ�
					,0//�����۰�����ȣ
					,6//�����۷���
					,20//��
					,20//����
					,90//ü��
					,0//��ø
					,0//����������
					,0//����������
					,7000//����
					,'icon_shield_iron.gif'//�̹���
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
					'��������'//�����۸�
					,gameItemCode.head//�������ڵ�
					,0//�����۰�����ȣ
					,4//�����۷���
					,10//��
					,30//����
					,30//ü��
					,25//��ø
					,0//����������
					,0//����������
					,4000//����
					,'icon_head_gold.gif'
					,'goldCap'
				);
			}
			else
			{
				item = new nxGameItem
				(
					'��ȯ����'//�����۸�
					,gameItemCode.armor//�������ڵ�
					,0//�����۰�����ȣ
					,4//�����۷���
					,40//��
					,10//����
					,70//ü��
					,5//��ø
					,0//����������
					,0//����������
					,5000//����
					,'icon_armor_yoenhwan.gif'//�̹���
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
					'��ö��'//�����۸�
					,gameItemCode.weapon//�������ڵ�
					,0//�����۰�����ȣ
					,2//�����۷���
					,7//��
					,0//����
					,10//ü��
					,0//��ø
					,30//����������
					,0//����������
					,0//����
					,'icon_weapon_siron.gif'
					,'deathblow'
				);
			}
			else
			{
				item = new nxGameItem
				(
					'�������'//�����۸�
					,gameItemCode.ring//�������ڵ�
					,0//�����۰�����ȣ
					,2//�����۷���
					,15//��
					,5//����
					,10//ü��
					,20//��ø
					,0//����������
					,0//����������
					,0//����
					,'icon_ring_jordan.gif'//�̹���
					,'jordan'
				); 
			}
		}
		
		return item;
	}
}