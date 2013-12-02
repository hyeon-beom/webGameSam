
function nxPlayUnit(strLayerID, isNPC, n4ClanNumber)
{
	NxControl.apply(this, arguments);

	this.setWidth(400);
	this.setHeight(400);
	this.setBG('');
	this.arrMotions = new Array(); //nxMotion
	this.n1MotionIndex  = 0;
	this.maskMotionCode	= nxUnitMotion.Stand;//0-정지
	this.n1MotionDirection	= nxUnitMotion.DirectionBase;//정방향 ->
	this.arrMoveDirection	= new Array(0,0,0,0);//좌우상하
	this.isUseWeapon		= true;
	this.n4UnitWidth		= 200;
	this.n4UnitHeight		= 200;
	
	//기타정보
	this.strLocationID		= null;
	
	
	//유닛정보
	this.unitClass			= nxUnitClass.none; 
	this.strCharacterName	= "천재파이터";
	this.n4Level			= 1;
	//--성향
	this.isMyUnit		= false;
	this.n4ClanNumber	= n4ClanNumber
	this.isNPC			= isNPC!=null?isNPC:true;
	this.maskUnitType = this.isNPC?nxMaskUnitType.getType(nxMaskUnitType.codeType_Chaotic, true, false):nxMaskUnitType.getType(nxMaskUnitType.codeType_Chaotic, true, true);
	//--능력치
	this.base_n1MoveAmountPixel	= 12;
	this.base_n4Reach			= 100;
	this.base_n4HPMax			= 100;
	this.base_n4HP				= 100;
	this.base_n4MPMax			= 100;
	this.base_n4MP				= 100;
	this.base_n4Power			= 10;
	this.base_n4SpellPower		= 10;
	this.base_n4Armor			= 0;
	this.base_n4ArmorPer		= 0;
	this.base_n4Critical		= 5;
	this.base_n4SpellCritical	= 5;
	this.base_n4Dodge			= 5;
	this.base_n4Prevent			= 5;
	this.base_n4Str				= 0;
	this.base_n4Int				= 0;
	this.base_n4Poli			= 0;
	this.base_n4Charm			= 0;
	this.base_n4Conf			= 0;
	this.base_n4Agil			= 0;
	
	this.n1MoveAmountPixel	= 0;
	this.n4Reach			= 0;
	this.n4HPMax			= 0;
	this.n4HP				= 0;
	this.n4MPMax			= 0;
	this.n4MP				= 0;
	this.n4Power			= 0;
	this.n4SpellPower		= 0;
	this.n4Armor			= 0;
	this.n4ArmorPer			= 0;
	this.n4Critical			= 0;
	this.n4SpellCritical	= 0;
	this.n4Dodge			= 0;
	this.n4Prevent			= 0;
	this.n4Str				= 0;
	this.n4Int				= 0;
	this.n4Poli				= 0;
	this.n4Charm			= 0;
	this.n4Conf				= 0;
	this.n4Agil				= 0;

	//--shadow
	this.shadowControl = new NxControl("nxShadow"+this.id);
	this.shadowControl.setBG('');
	this.shadowControl.src="/img/rpg/bg/shadow.png";
	this.shadowControl.setWidth(this.n4UnitWidth/2);
	this.shadowControl.setHeight(20);
	this.shadowControl.setLeft(100);
	this.shadowControl.setTop(140);
	this.add(this.shadowControl);
	this.shadowControl.moveCenter();
	//this.shadowControl.setAlpha(80);
	this.shadowControl.show();
	
	//--bodyLayer
	this.bodyControl = new NxControl("nxBodyControl_"+this.id);
	this.bodyControl.setWidth(this.n4UnitWidth);
	this.bodyControl.setHeight(this.n4UnitHeight);
	this.bodyControl.setBG('');
	this.bodyControl.setLeft(100);
	this.add(this.bodyControl);
	this.bodyControl.show();
	//--weaponLayer
	this.weaponControl = new nxWeaponControl("nxWeaponControl_"+this.id);
	this.weaponControl.setWidth(this.n4UnitWidth);
	this.weaponControl.setLeft(100);
	this.weaponControl.setHeight(this.n4UnitHeight);
	this.add(this.weaponControl);
	if(this.isUseWeapon){this.weaponControl.show();}
	//--hp Layer
	this.lifeBar = new nxStateBar(this.id+'_lifeBar', this, 'red');
	this.add(this.lifeBar);
	
	//--name Layer
	this.nameLabel = new NxControl(this.id+'_name');
	//--inventory
	this.unitInventory = null;
	this.unitEquipment = null;//new Array(8);//무기,보조무기,머리,갑옷,벨트,반지(좌),반지(우),장신구
	this.unitHotKeySlot= new Array(13);
	
	this.init=function()
	{
		if(!this.isMyUnit)
		{	
			this.lifeBar.setLeft(0);
			this.lifeBar.setTop(10);
			this.lifeBar.setWidth(100);
			this.lifeBar.setHeight(5);
			this.lifeBar.moveCenter();
			this.lifeBar.show();
		}	
		this.add(this.nameLabel);
		this.nameLabel.setBG('');
		this.nameLabel.setLeft(0);
		this.nameLabel.setTop(20);
		this.nameLabel.setWidth(100);
		this.nameLabel.setHeight(18);
		this.nameLabel.moveCenter();
		this.nameLabel.show();
		this.nameLabel.setText('<center>'+this.strCharacterName+'</center>')
		
		
		this.loadUnitInventoryItem();
		this.oninit();
		this.setAvility(true);
	}
	this.setUnitAI=function(){ this.AI = this.isNPC?new nxUnitAI(this):null;}
	this.doLater("setUnitAI()",500);
	
	this.loadUnitInventoryItem=function()
	{
		this.unitInventory = new Array(4);
		for(var i=0;i<this.unitInventory.length; i++)
		{
			this.unitInventory[i] = new Array(10);
		}
		this.unitEquipment = new Array(8);
		//this.unitEquipment = new Array(8);//무기,보조무기,머리,갑옷,벨트,반지(좌),반지(우),장신구
		////무기,보조무기,머리,갑옷,벨트,반지(좌),반지(우),장신구
		//(strItemName,n1ItemCode,n4ItemSN,n4ItemLevel,n4Str,n4Int,n4Conf,n4Agil,n4Damage, n4Armor,strImg)
	}
	this.setUnitInventoryItem=function(x, y, objItem)
	{
		this.unitInventory[x][y] = objItem;
	}
	this.setUnitEquipItem=function(n1SlotIndex, objItem )
	{
		this.unitEquipment[n1SlotIndex] = objItem;
		this.setAvility();
	}
	
	this.oninit=function(){}
	this.sumOfStat=function(n1StatCode)
	{
		
		var n4Ret = 0;
		for(var i=0;i<this.unitEquipment.length;i++)
		{
			if(this.unitEquipment[i]!=null)
			{
				//alert("1");//this.unitEquipment[5].n4Str
				var objItem = this.unitEquipment[i];
				if(n1StatCode==0)
					n4Ret+=objItem.n4Str;
				else if(n1StatCode==1)
					n4Ret+=objItem.n4Int;
				else if(n1StatCode==2)
					n4Ret+=objItem.n4Poli;
				else if(n1StatCode==3)
					n4Ret+=objItem.n4Charm;
				else if(n1StatCode==4)
					n4Ret+=objItem.n4Conf;
				else if(n1StatCode==5)
					n4Ret+=objItem.n4Agil;
				else if(n1StatCode==6)
					n4Ret+=objItem.n4Damage;
				else if(n1StatCode==7)
					n4Ret+=objItem.n4SpellDamage;
				else if(n1StatCode==8)
					n4Ret+=objItem.n4Armor;
			}
		}
		return n4Ret;
	}
	this.setAvility=function(isInit)
	{
		this.n4Str				= this.base_n4Str+this.sumOfStat(0);
		this.n4Int				= this.base_n4Int+this.sumOfStat(1);
		this.n4Poli				= this.base_n4Poli+this.sumOfStat(2);
		this.n4Charm			= this.base_n4Charm+this.sumOfStat(3);
		this.n4Conf				= this.base_n4Conf+this.sumOfStat(4);
		this.n4Agil				= this.base_n4Agil+this.sumOfStat(5);
		
		//스탯에 의한 상승 적용
		this.n4HPMax			= this.base_n4HPMax + (this.n4Conf*10);
		this.n4MPMax			= this.base_n4MPMax+(this.n4Int*10);
		this.n4Power			= this.base_n4Power + this.sumOfStat(6) +( this.n4Str>0?parseInt(this.n4Str/2):0 );
		this.n4SpellPower		= this.base_n4SpellPower + this.sumOfStat(7) + (this.n4Int>0?parseInt(this.n4Int/2):0 );
		this.n4Armor			= this.base_n4Armor+ this.sumOfStat(8) + (this.n4Agil*2);
		this.n4ArmorPer			= this.n4Armor<=0?0:parseInt(this.n4Armor/600);
		this.n4Critical			= this.base_n4Critical + ( this.n4Agil>0?parseInt(this.n4Agil/10):0 );
		this.n4SpellCritical	= this.base_n4SpellCritical + ( this.n4Int>0?parseInt(this.n4Int/10):0 );
		this.n4Dodge			= this.base_n4Dodge + (this.n4Agil>0?parseInt(this.n4Agil/20):0 );
		this.n4Prevent			= this.base_n4Prevent;
		this.n1MoveAmountPixel	= this.base_n1MoveAmountPixel;
		this.n4Reach			= this.base_n4Reach;
		if(isInit)
		{
			this.n4HP				= this.n4HPMax;
			this.n4MP				= this.n4MPMax;
		}
		else
		{
			this.n4HP				= this.n4HP>this.n4HPMax?this.n4HPMax:this.n4HP;
			this.n4MP				= this.n4MP>this.n4MPMax?this.n4MPMax:this.n4MP;
		}
				
		this.onUpdate();
	}
	this.imgageArray = new Array();
	
	this.bodySrcBefore = null;
	this.setBody=function(src)
	{
		if(this.bodySrcBefore!=null)
			this.imgageArray[this.bodySrcBefore].hide();

		if(!this.imgageArray[src])
		{
			this.imgageArray[src] = new NxControl(src);
			this.imgageArray[src].setBG('');
			this.imgageArray[src].src = src;
			this.imgageArray[src].setWidth(this.n4UnitWidth);
			this.imgageArray[src].setHeight(this.n4UnitHeight);
			this.bodyControl.add(this.imgageArray[src]);
		}
		//this.bodyControl.setText("");
		this.imgageArray[src].show();
		this.bodyControl.show();
		this.bodySrcBefore = src;
		//this.bodyControl.setText("<img src='"+src+"' width=100% height=100%/>");
	}

//<--쓰레드----------------------------------------------------------------------------
	this.n4MotionThreadIndex = 0
	this.motionThread = function(maskMotionCode, n4ThreadIndex)
	{
		if(!this.isAlive() && maskMotionCode==nxUnitMotion.Stand)
			return;//죽었으면서 벌떡이라면 종료
		if(n4ThreadIndex<this.n4MotionThreadIndex || n4ThreadIndex==null)
			return;//파기된 모션은 종료
		if(n4ThreadIndex>this.n4MotionThreadIndex)
			this.n4MotionThreadIndex = n4ThreadIndex;//새로운 모션인덱스라면 인덱스 교체
		if(maskMotionCode!=this.maskMotionCode)
			return;//현재 설정된setMotion 과 다른 모션코드라면 종료

		var motion	= this.arrMotions[this.n1MotionIndex]
		var src		= this.n1MotionDirection&nxUnitMotion.DirectionBase>0 ? motion.strImgSrc : motion.strImgSrcInvert;
		this.setBody(src);
		if(this.isUseWeapon && this.isWeaponMotion(this.maskMotionCode))
		{
			this.weaponControl.setWeaponImage(src);
		}
		else
			this.weaponControl.hide();

		var n4Sleep = motion.n4Sleep;
		if( this.arrMotions[this.n1MotionIndex+1] )
		{
			this.n1MotionIndex++;
			this.doLater("motionThread("+maskMotionCode+", "+n4ThreadIndex+")", n4Sleep);
		}
		else if(motion.isRepeat)
		{
			this.n1MotionIndex = 0;
			this.doLater("motionThread("+maskMotionCode+", "+n4ThreadIndex+")", n4Sleep);
		}
		else if(!motion.isRepeat)//모션종료 시 기본 포즈
		{
			this.doLater("setMotion(nxUnitMotion.Stand)",n4Sleep);
		}

	}
	this.moveThread = function()
	{
		if(this.strLocationID!=null)
		{
			if(!this.isAlive())
				return;//디졌으면 움직임 끝

			if(this.isMovable())
			{//좌우상하
				try
				{
					var enableRect = this.parent.parent.getRealEnableRect();
					var myPosition = this.getPosition();
					if(this.arrMoveDirection[0]==1 && enableRect.x<myPosition.x)
						this.setLeft(this.getLeft()-this.getMovePixel());
					if(this.arrMoveDirection[1]==1 && enableRect.x2>myPosition.x)
						this.setLeft(this.getLeft()+this.getMovePixel());
					if(this.arrMoveDirection[2]==1 && enableRect.y<myPosition.y)
						this.setTop(this.getTop()- (this.getMovePixel()));
					if(this.arrMoveDirection[3]==1 && enableRect.y2>myPosition.y)
						this.setTop(this.getTop()+(this.getMovePixel()));
				}catch(e){}
			}
			if(this.isMyUnit)
				nxGameMain.gameGround.setPlayerCamera();
			this.setLayerIndex(this.getPosition().y);
			this.onMove.execute( new Array(this.getPosition().x, this.getPosition().y) );
		}
		this.doLater("moveThread()",100);
		
	}
	
	this.getMovePixel=function(maskMotionCode)
	{
				
		if(this.isMyUnit)
			return this.maskMotionCode==nxUnitMotion.Walk?this.n1MoveAmountPixel:this.n1MoveAmountPixel*2;
		else
		{
			var ret = 0;
			if(this.destinationPos!=null)
			{
				ret = this.maskMotionCode==nxUnitMotion.Walk?this.n1MoveAmountPixel:this.n1MoveAmountPixel*2;
				var myPos = this.getPosition();
				var xGap  = Math.abs(myPos.x-this.destinationPos.x);
				var yGap  = Math.abs(myPos.y-this.destinationPos.y);
				if(xGap<ret && xGap>0)
					ret = xGap;
				else if(yGap<ret && yGap>0)
					ret = yGap;
			}
			else
				this.setMotion(nxUnitMotion.Stand);

			//debug(ret);
			return ret;
		}
	}

	//--비동기 조작에 따른 이동 시작
	this.destinationPos = null;
	this.gotoDestination=function()
	{
		if(!this.isAlive())
			return;
		
		if(this.isMovable() && this.destinationPos!=null )
		{
			var myPos = this.getPosition();

			this.arrMoveDirection[0] = this.destinationPos.x<myPos.x?1:0;//좌
			this.arrMoveDirection[1] = this.destinationPos.x>myPos.x?1:0;//우
			this.arrMoveDirection[2] = this.destinationPos.y<myPos.y?1:0;//상
			this.arrMoveDirection[3] = this.destinationPos.y>myPos.y?1:0;//하
			
			if(
				(
					   this.arrMoveDirection[0]==1 
					|| this.arrMoveDirection[1]==1 
					|| this.arrMoveDirection[2]==1
					|| this.arrMoveDirection[3]==1
				)
			)
			{
				this.setMotion(nxUnitMotion.Walk);
				this.n1MotionDirection	= myPos.x<=this.destinationPos.x? nxUnitMotion.DirectionBase : nxUnitMotion.DirectionInvert;
				
				//debug("목표:"+this.destinationPos.x+","+this.destinationPos.y);
				//debug("나 :"+myPos.x+","+myPos.y);
			}
			else if(this.maskMotionCode==nxUnitMotion.Walk)
				this.setMotion(nxUnitMotion.Stand);

			
		}
		this.doLater("gotoDestination()", 100);
	}
	this.isMovable=function()//자의캔슬이 가능한 모션인가
	{
		if(this.isAlive())
			return parseInt(this.maskMotionCode&0x01<<20)>0?true:false;
		else
			return false;
	}
	//---비동기 조작에 따른 이동 끝
//---쓰레드 끝---------------------------------------------------------------------------->

//--상태정보 시작
	this.isAlive=function(){return this.n4HP>0?true:false;}
//--비동기 조작 시작
	//this.destinationPos = null;
//--비동기 조작 끝
//--상태정보 끝
//<---모션 배열-----------------------------------------------------------------------------
	this.getBaseMotion=function()
	{
		/*
		var MotionArray = new Array();
		MotionArray[0] = new nxMotion("../img/rpg/warrior/stand_00.png", false, 1000);
		MotionArray[1] = new nxMotion("../img/rpg/warrior/stand_01.png", true, 1000);
		return MotionArray;
		*/
		return null;
	}
	this.getWalkMotion=function(){return null;}
	this.getRunMotion=function(){return null;}
	this.getNormalAttackMotion=function(){return null;}
	this.getCastMotion=function(){return null;}
	this.getWoundMotion=function(){return null;}
	this.getKnockDownMotion=function(){return null;}
	this.getJumpMotion=function(){return null;}
	this.getDodgeMotion=function(){return null;}
	this.getFaceImage=function(){ return "/img/rpg/warrior/face.png"; }
	
//<--모션배열 끝--------------------------------------------------------------------------

	this.setMotion = function(maskMotionCode)
	{
	
		if(this.maskMotionCode==maskMotionCode && this.arrMotions[0])
			return;

		if(maskMotionCode==nxUnitMotion.Stand)
			this.arrMotions=this.getBaseMotion();	
		else if(maskMotionCode==nxUnitMotion.Walk)
			this.arrMotions=this.getWalkMotion();
		else if(maskMotionCode==nxUnitMotion.Run)
			this.arrMotions=this.getRunMotion();
		else if(maskMotionCode==nxUnitMotion.NormalAttack)
			this.arrMotions=this.getNormalAttackMotion();
		else if(maskMotionCode==nxUnitMotion.Cast)
			this.arrMotions=this.getCastMotion();
		else if(maskMotionCode==nxUnitMotion.Wound)
			this.arrMotions=this.getWoundMotion();
		else if(maskMotionCode==nxUnitMotion.KnockDown)
			this.arrMotions=this.getKnockDownMotion();
		else if(maskMotionCode==nxUnitMotion.Jump)
			this.arrMotions=this.getJumpMotion();
		else if(maskMotionCode==nxUnitMotion.Dodge)
			this.arrMotions=this.getDodgeMotion();

		if(this.arrMotions==null)
			this.arrMotions=this.getBaseMotion();	
		
				
		this.n1MotionIndex = 0;
		this.maskMotionCode=maskMotionCode;
		this.motionThread(maskMotionCode, this.n4MotionThreadIndex+1);
	}
//--모션설정 끝
	this.isWeaponMotion=function(maskMotionCode){return parseInt(maskMotionCode &0x01<<10)>0?true:false;	}
	this.isBreakableMotion=function(maskMotionCode){}
	//this.doLater=function(strMethod, interval, strID){	setTimeout("document.getElementById('"+(strID?strID:this.id)+"').NxControl."+strMethod, interval);	}
//<!--쓰레드 시작-------------------------------------------------------------------------
	this.doLater("setMotion(nxUnitMotion.Stand)", 300);
	this.doLater("moveThread()", 500);
	this.doLater("gotoDestination()", 500);
//--쓰레드 끝-------------------------------------------------------------------------->

	this.doLater("init()",100);
	this.posCT = null;
	this.getPosition=function()//발바닥
	{
		var pos = new nxRectangle(this.getLeft()+this.shadowControl.getLeft()+ (this.shadowControl.getWidth()/2), this.getTop()+ this.shadowControl.getTop()+(this.shadowControl.getHeight()/2), 5, 5);
		/*if(this.posCT == null)
		{
			this.posCT=new NxControl('posCT');
			this.parent.add(this.posCT);
			this.posCT.setBG('red');
			this.posCT.setLeft(pos.x);
			this.posCT.setTop(pos.y);
			this.posCT.setWidth(30);
			this.posCT.setHeight(30);
			this.posCT.show();
		}*/		
		return pos;
	}
	this.n4AttackHeight=20;
	this.getAttackRect=function()
	{
		var unitPos = this.getPosition();
		var rect = null;
		if(this.n1MotionDirection==nxUnitMotion.DirectionBase )//정방향 ->
			rect = new nxRectangle(unitPos.x, (unitPos.y-this.n4AttackHeight), this.n4Reach, this.n4AttackHeight+10);
		else
			rect = new nxRectangle(unitPos.x-this.n4Reach, (unitPos.y-this.n4AttackHeight), this.n4Reach, this.n4AttackHeight+10);
		return rect;
	}

//--능력치정보
	this.getPower=function()
	{
		return this.n4Power;
	}
	this.getSpellPower=function()
	{
		return this.n4SpellPower;
	}
	this.isEnemy=function(otherUnit)
	{
		return this.n4ClanNumber!=otherUnit.n4ClanNumber?true:false;
	}
//--공격 시작
	this.doAttack=function(n4SkillCode)
	{
		if(!this.isAlive())
			return ;
		if(!n4SkillCode && this.unitClass == nxUnitClass.wizard )
			new nxSpellEnergyBolt(this).play();
		else if(!n4SkillCode)
			new nxSkillNormalAttack(this).play();
		else if(n4SkillCode==1 && this.unitClass == nxUnitClass.wizard)	
			new nxSpellLightning(this).play();
		else if(n4SkillCode==1)
			new nxSkillDashAttack(this).play();
		else if(n4SkillCode==2)
			new nxSkillBackStep(this).play();
		else if(n4SkillCode==3)
			new nxSpellEnergyBolt(this).play();
		else if(n4SkillCode==4)
			new nxSpellDagger(this).play();
			
			
		
	}
	this.doWound=function()
	{
		if( parseInt(this.maskMotionCode&0x01<<30)>0 )
		{
			this.setMotion(nxUnitMotion.Wound);
			var np = new NxPlayer(this.soundWound);
			np.play();
			np=null;
		}
		if(this.n4HP<=0 && !this.isDead)
			this.doLater("doDie(0)", 1000);	
	}
	this.doDie=function(n1Step)
	{
		if( n1Step==0 && this.maskMotionCode!=nxUnitMotion.KnockDown )
		{
			this.setMotion(nxUnitMotion.KnockDown);
			this.doLater("doDie(1)", 2300);	
			var np = new NxPlayer(this.soundDead);
			np.play();
			np=null;
		}
		else if(n1Step==1)
		{
			this.isDead=true;
			this.unload();
			this.remove();
			if(this.isNPC)
				itemManager.dropItem(this.getPosition(), this.n4Level);
		}
		
		
	}
	this.doDodge=function()
	{
		if( parseInt(this.maskMotionCode&0x01<<30)>0 && parseInt(this.maskMotionCode&0x01<<20)>0 )
			this.setMotion(nxUnitMotion.Dodge);
		nxMoveTextFactory.dodgeText(this.getPosition(), this);
	}
	this.doPrevent=function()
	{
		if( parseInt(this.maskMotionCode&0x01<<30)>0 && parseInt(this.maskMotionCode&0x01<<20)>0 )
			this.setMotion(nxUnitMotion.Dodge);
		nxMoveTextFactory.preventText(this.getPosition(), this);
	}
	this.receiveDamage=function(n4Damage, attackerUnit, skillClass)
	{
		if(skillClass.n1SkillType==0)//물리공격 방어구 흡수
		{
			n4Damage = this.n4ArmorPer<=0?n4Damage:parseInt(n4Damage * ( (100-this.n4ArmorPer) /100));
			n4Damage = n4Damage==0?1:n4Damage;
		}
		this.n4HP = this.n4HP<n4Damage?0:this.n4HP-n4Damage;
		nxMoveTextFactory.createText(this.getPosition(), 	n4Damage*-1, this);			
		this.onUpdate();
		this.onReceiveDamage.execute(new Array(attackerUnit,n4Damage ));
	}
	
////--전투액션이동 시작	
	this.moveFoward=function(n4Pixel)
	{
		if(this.n1MotionDirection	== nxUnitMotion.DirectionBase)
			this.setLeft(this.getLeft()+n4Pixel);
		else
			this.setLeft(this.getLeft()-n4Pixel);
		
	}
	this.moveBack=function(n4Pixel)
	{
		if(this.n1MotionDirection	== nxUnitMotion.DirectionBase)
			this.setLeft(this.getLeft()-n4Pixel);
		else
			this.setLeft(this.getLeft()+n4Pixel);
		
	}
	this.moveUp=function(n4Pixel)
	{
		this.setTop(this.getTop()-n4Pixel);
	}
	this.moveDown=function(n4Pixel)
	{
		this.setTop(this.getTop()+n4Pixel);
	}
	this.slip=function(isForward, n4Pixel, n4Sleep)
	{
		if(n4Pixel==0)
			return;
	
		if(n4Sleep<50)
			throw "n4Sleep must bigger than 49";
		if(n4Pixel<19)	
			throw "n4Pixel must bigger than 19";
					
		var n4Step = 20;	
		var enableRect = this.parent.parent.getRealEnableRect();
		var myPosition = this.getPosition();
		
		if(enableRect.isInAngle(myPosition))
		{
			if(isForward)
				this.moveFoward(n4Step);
			else
				this.moveBack(n4Step);
		}
			
		n4Pixel-=n4Step;
		if(n4Pixel>0)
			this.doLater("slip("+isForward+", "+n4Pixel+","+n4Sleep+")", n4Sleep);
	}
////--전투액션이동 끝
//--공격 끝

	//----이벤트델리게이트
	this.onInit			= new NxEventDelegate(this);
	this.onUnitUpdate	= new NxEventDelegate(this);
	this.onReceiveDamage= new NxEventDelegate(this);
	this.onKeyDown		= new NxEventDelegate(this);
	this.onKeyUp		= new NxEventDelegate(this);
	this.onMove			= new NxEventDelegate(this);
//<!---캐릭터 이벤트
	this.onUpdate=function()
	{
		this.isUseWeapon = this.unitEquipment[0]?true:false;	
		if(	this.isUseWeapon )
			this.weaponControl.setWeapon(this.unitEquipment[0].strItemNameEng);
				
		this.lifeBar.update(this.n4HPMax, this.n4HP);
		this.onUnitUpdate.execute();
	}
//----->

//<---키 이벤트----------------------------------------------------------------------------
	this.dateLastKeyDate = new Date();
	this.n4LastKeyCode	= 0;
	this.receiveKeyDownEvent = function(keyCode)
	{
		if(keyCode>=37 && keyCode<=40 && parseInt(this.maskMotionCode&0x01<<20)>0)//이동키
		{
			var dateNow = new Date();
			var n1NowMin	= dateNow.getMinutes();
			var n1NowSec	= dateNow.getSeconds();
			var n1LstMin	= this.dateLastKeyDate.getMinutes();
			var n1LastSec	= this.dateLastKeyDate.getSeconds();

			var isDoubleKey = false;
			if(this.n4LastKeyCode==keyCode && n1NowMin==n1LstMin && Math.abs(n1NowSec-n1LastSec)<=1)
				isDoubleKey = true;//alert(this.n4LastKeyCode+'/'+keyCode+' '+n1NowMin+'/'+n1LstMin+' '+(n1NowSec-n1LastSec));
				

			if(keyCode==37)
			{
				this.arrMoveDirection[0]=1;
				this.n1MotionDirection	= nxUnitMotion.DirectionInvert;
			}
			else if(keyCode==38)
				this.arrMoveDirection[2]=1;
			else if(keyCode==39)
			{
				this.arrMoveDirection[1]=1;
				this.n1MotionDirection	= nxUnitMotion.DirectionBase;
			}
			else if(keyCode==40)
				this.arrMoveDirection[3]=1;

			if(!isDoubleKey)
				this.setMotion(nxUnitMotion.Walk);	
			else
				this.setMotion(nxUnitMotion.Run);	
			
			this.n4LastKeyCode	 = keyCode;
			this.dateLastKeyDate = new Date();
		}
		/*
		else if(keyCode==83 && parseInt(this.maskMotionCode&0x01<<20)>0)
		{
			this.doAttack();
		}
		else if(keyCode==81 && parseInt(this.maskMotionCode&0x01<<20)>0)//Q
		{
			this.doAttack(1);
		}
		else if(keyCode==87 && parseInt(this.maskMotionCode&0x01<<20)>0)//Q
		{
			this.doAttack(2);
		}
		else if(keyCode==82)
			this.isUseWeapon		= this.isUseWeapon?false:true;
		*/
		this.onKeyDown.execute(	new Array(keyCode,null ) );
		//alert(keyCode);
		
	}
	this.receiveKeyUpEvent = function(keyCode)
	{
		if(keyCode>=37 && keyCode<=40)//이동키
		{
			if(keyCode==37)
				this.arrMoveDirection[0]=0;
			else if(keyCode==38)
				this.arrMoveDirection[2]=0;
			else if(keyCode==39)
				this.arrMoveDirection[1]=0;
			else if(keyCode==40)
				this.arrMoveDirection[3]=0;
		
			if(this.arrMoveDirection[0]==0 && this.arrMoveDirection[1]==0 && this.arrMoveDirection[2]==0 && this.arrMoveDirection[3]==0
			&& parseInt(this.maskMotionCode&0x01<<20)>0	
			)
				this.setMotion(nxUnitMotion.Stand);
		}

		this.onKeyUp.execute(new Array(keyCode));
	}
	this.receiveKeyPressEvent = function(keyCode)
	{
		this.receiveKeyDownEvent(keyCode);
	}
//---키 이벤트 끝---------------------------------------------------------------------------->

	var preIndex=300;
	this.preLoadMotions=function(arrMotions)
	{
		if(arrMotions==null)
			return ;

		for(var i=0;i<arrMotions.length;i++)
		{
			var strImgSrc		= arrMotions[i].strImgSrc;
			var strImgSrcInvert	= arrMotions[i].strImgSrcInvert;
			var strImgSrcWeapon			= this.weaponControl.getWeaponImage(strImgSrc);
			var strImgSrcInvertWeapon	= this.weaponControl.getWeaponImage(strImgSrcInvert);
						
			
			var preID	= 'pre_'+strImgSrc;
			var preID2	= 'pre_'+strImgSrcInvert;
			var weaponPreID = 'pre_weapon_'+strImgSrcWeapon;
			var weaponPreID2 = 'pre_weapon_'+strImgSrcInvertWeapon;

			if(nxUnitMotion.preLoad[preID]==null)
			{
				nxUnitMotion.preLoad[preID] = new NxControl(preID);
				nxUnitMotion.preLoad[preID].src = strImgSrc;
				nxUnitMotion.preLoad[preID].setWidth(1);
				nxUnitMotion.preLoad[preID].setHeight(1);
				nxUnitMotion.preLoad[preID].setLeft(100*preIndex*-1);
				nxUnitMotion.preLoad[preID].show();
				preIndex++;
				nxUnitMotion.preLoad[preID2] = new NxControl(preID2);
				nxUnitMotion.preLoad[preID2].src = strImgSrcInvert;
				nxUnitMotion.preLoad[preID2].setWidth(1);
				nxUnitMotion.preLoad[preID2].setHeight(1);
				nxUnitMotion.preLoad[preID].setLeft(100*preIndex*-1);
				nxUnitMotion.preLoad[preID2].show();
				preIndex++;

				nxUnitMotion.preLoad[weaponPreID] = new NxControl(weaponPreID);
				nxUnitMotion.preLoad[weaponPreID].src = strImgSrcWeapon;
				nxUnitMotion.preLoad[weaponPreID].setWidth(1);
				nxUnitMotion.preLoad[weaponPreID].setHeight(1);
				nxUnitMotion.preLoad[weaponPreID].setLeft(100*preIndex*-1);
				nxUnitMotion.preLoad[weaponPreID].show();
				preIndex++;
				nxUnitMotion.preLoad[weaponPreID2] = new NxControl(weaponPreID2);
				nxUnitMotion.preLoad[weaponPreID2].src = strImgSrcInvertWeapon;
				nxUnitMotion.preLoad[weaponPreID2].setWidth(1);
				nxUnitMotion.preLoad[weaponPreID2].setHeight(1);
				nxUnitMotion.preLoad[weaponPreID2].setLeft(100*preIndex*-1);
				nxUnitMotion.preLoad[weaponPreID2].show();
				preIndex++;

			}
			
		}
	}
	this.preLoadMotion=function()
	{
		this.preLoadMotions( this.getWalkMotion() );
		this.preLoadMotions( this.getRunMotion() );
		this.preLoadMotions( this.getNormalAttackMotion() );
		this.preLoadMotions( this.getWoundMotion() );
		this.preLoadMotions( this.getKnockDownMotion() );
		this.preLoadMotions( this.getJumpMotion() );
		this.preLoadMotions( this.getCastMotion() );
		
		this.alertBox.unload();
		
	}
	this.alertBox = Alert2(this.id+"_alert","Loading.....");
	this.doLater("preLoadMotion()",500);
		
		
	
}
nxPlayUnit.prototype = new NxControl();
nxPlayUnit.prototype.constructor = nxPlayUnit;








function nxWeaponControl(strLayerID)
{
	NxControl.apply(this, arguments);
	this.setBG('');
	this.strWeapon = 'deathblow';

	this.imgageArray = new Array();
	this.WeaponSrcBefore = null;
	this.setBody=function(src)
	{
		if(this.WeaponSrcBefore!=null)
			this.imgageArray[this.WeaponSrcBefore].hide();
		if(!this.imgageArray[src])
		{
			this.imgageArray[src] = new NxControl(src);
			this.imgageArray[src].setBG('');
			this.imgageArray[src].src = src;
			this.imgageArray[src].setWidth(this.getWidth());
			this.imgageArray[src].setHeight(this.getHeight());
			this.add(this.imgageArray[src]);
		}
		//this.setText("");
		this.imgageArray[src].show();
		this.WeaponSrcBefore = src;
		this.show();
	}

	this.setWeapon=function(strWeapon)
	{
		this.strWeapon = strWeapon;
	}

	this.getWeaponImage=function(srcMotion)
	{
		var keyIndex = srcMotion.lastIndexOf('/');
		var strMotion = srcMotion.substring(keyIndex+1);
		var strWeaponMotion = 'weapon/'+this.strWeapon+'_'+strMotion;
		return  srcMotion.split(strMotion).join(strWeaponMotion);
	}

	this.setWeaponImage=function(srcMotion)
	{
		this.setBody( this.getWeaponImage(srcMotion) );
	}
}
nxWeaponControl.prototype = new NxControl();
nxWeaponControl.prototype.constructor = nxWeaponControl;


var nxUnitMotion = new function _nxUnitMotion()
{
	//모션코드, 웨펀모션, 능동캔슬가능, 타의캔슬가능
	this.Stand			= parseInt(0x01<<1) + parseInt(0x01<<10) + parseInt(0x01<<20) + parseInt(0x01<<30);
	this.Walk			= parseInt(0x01<<2) + parseInt(0x01<<10) + parseInt(0x01<<20) + parseInt(0x01<<30);
	this.Run			= parseInt(0x01<<3) + parseInt(0x01<<10) + parseInt(0x01<<20) + parseInt(0x01<<30);
	this.NormalAttack	= parseInt(0x01<<4) + parseInt(0x01<<10) + parseInt(0x00<<20) + parseInt(0x01<<30);
	this.Wound			= parseInt(0x01<<5) + parseInt(0x00<<10) + parseInt(0x00<<20) + parseInt(0x01<<30);
	this.KnockDown		= parseInt(0x01<<6) + parseInt(0x00<<10) + parseInt(0x00<<20) + parseInt(0x00<<30);
	this.Jump			= parseInt(0x01<<7) + parseInt(0x00<<10) + parseInt(0x00<<20) + parseInt(0x01<<30);
	this.Dodge			= parseInt(0x01<<8) + parseInt(0x00<<10) + parseInt(0x01<<20) + parseInt(0x00<<30);
	this.Cast			= parseInt(0x01<<9) + parseInt(0x00<<10) + parseInt(0x00<<20) + parseInt(0x01<<30);

	this.DirectionBase	= 0x01;//우측향함
	this.DirectionInvert= 0x02;//좌측향함

	this.preLoad = new Array();
}


var nxUnitClass = new function _nxUnitClass()
{
	//모션코드, 웨펀모션, 능동캔슬가능, 타의캔슬가능
	this.none				= 0;
	this.warrior			= 1;
	this.wizard				= 2;
}


var nxMaskUnitType = new function _nxMaskUnitType()
{
	this.codeType_Friend		= parseInt(0x01<<1);//모두의 아군
	this.codeType_Neutral		= parseInt(0x01<<2);//중립
	this.codeType_Chaotic		= parseInt(0x01<<3);//적군에 호전적
	this.getType=function(codeType, isDoCombat, isHero)
	{
		return 	codeType + (isDoCombat?parseInt(0x01<<10):0) + (isHero?parseInt(0x01<<20) :0) ;
	}
	
	
}

function nxRectangle(x, y, width, height)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.x2 = this.x+this.width;
	this.y2 = this.y+this.height;

	this.getUnitsInRect=function()
	{
		var retUnits = new Array();
		for(var i=0; i<100; i++)
		{
			var unit = nxGameMain.gameGround.nxUnitCollection.units[i];
			if(unit && unit.isAlive())
			{
				var unitRect = unit.getPosition();
				if(this.isInAngle(unitRect))
					retUnits[retUnits.length] = unit;
			}
		}
		return retUnits;
	}

	this.isInAngle=function(otherRect)
	{
		if( (otherRect.x >= this.x && otherRect.x <= this.x2 &&  otherRect.y >= this.y && otherRect.y <= this.y2 )
			||
			(otherRect.x2 >= this.x && otherRect.x2 <= this.x2 &&  otherRect.y2 >= this.y && otherRect.y2 <= this.y2 )
			||
			(otherRect.x2 >= this.x && otherRect.x2 <= this.x2 &&  otherRect.y >= this.y && otherRect.y <= this.y2 )
			||
			(otherRect.x >= this.x && otherRect.x <= this.x2 &&  otherRect.y2 >= this.y && otherRect.y2 <= this.y2 )
			)
		{
			return true;
		}
		else
			return false;
	}

}

function nxMotion(strImgSrc, isRepeat, n4Sleep)
{
	this.strImgSrc		= strImgSrc;
	this.strImgSrcInvert= strImgSrc.split('.png').join('_invert.png');
	this.isRepeat	= isRepeat;
	this.n4Sleep	= !n4Sleep ? 500 : n4Sleep;

}

