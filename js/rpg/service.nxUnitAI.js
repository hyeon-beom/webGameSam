
function nxUnitAI(playUnit, n4ComabtLevel)
{
	this.playUnit = playUnit;
	this.targetUnit = null;
	this.n4Sight	= 200;
	this.n4ComabtLevel = !n4ComabtLevel ? 2000 : n4ComabtLevel;
	this.basePosition = playUnit.getPosition();
	this.doLater=function(strMethod, interval, strID)
	{	
		try
		{	
			setTimeout("document.getElementById('"+(strID?strID:this.playUnit.id)+"').NxControl.AI."+strMethod, interval);	
		}
		catch(e)
		{
			alert("nxUnitAI 쓰레드 수행불가["+strMethod+"] : "+ e);
		}
	}
	
	this.playUnit.onReceiveDamage.add
	(
		function(owner, args)
		{
			var ai = owner.AI;
			var attackUnit = args[0];
			var n4Damage   = args[1];
			
			if(!ai.enemies.get(attackUnit.id))
			{
				var attInfo = new Object();
				attInfo.n4TotalDamage	= n4Damage;
				attInfo.playUnit		= attackUnit;
				ai.enemies.set(attackUnit.id, attInfo);
			}
			else
				ai.enemies.get(attackUnit.id).n4TotalDamage+=n4Damage;
				
		}
	)
	this.getHitMeTarget=function()
	{
		var target = null;
		var n4TotalDamage = 0;
		for(var i=0;i<this.enemies.getLength();i++)
		{
			var attInfo = this.enemies.getIndexOf(i);
			if(attInfo.n4TotalDamage>n4TotalDamage && attInfo.playUnit.isAlive() )
			{
				n4TotalDamage	= attInfo.n4TotalDamage;
				target			= attInfo.playUnit;
			}
		}
		
		return target;
	}
	this.enemies = new NxHashtable();
	

	this.aiThread=function()
	{
		if(!this.playUnit.isAlive())
			return;
		this.searchTarget();
		this.doAttck();
		this.doLater("aiThread()", this.n4ComabtLevel );
	}

	this.searchTarget=function()
	{
		if(this.targetUnit!=null)//만약 내 타겟이 그라운드를 떠났다면 버린다.
		{
			var groundClass = this.playUnit.parent.parent;
			if(groundClass.nxUnitCollection.units[this.targetUnit.id]==null)
				this.targetUnit = null;
			this.enemies = new NxHashtable();
		}
	
		//if(this.targetUnit==null)
		//	this.targetUnit = this.getHitMeTarget();
		this.targetUnit = this.getHitMeTarget()!=null?this.getHitMeTarget():this.targetUnit;
		
		if(this.targetUnit==null)
			this.targetUnit=this.getTarget();
		else if(!this.targetUnit.isAlive())
		{
			this.targetUnit=null;
			this.playUnit.destinationPos=null;
		}
		
		if(this.targetUnit!=null && this.isMovable())
		{
			if( !this.isInReach(this.targetUnit) )
			{
				var destinationPos = this.getEnemyPoint(this.targetUnit);
				this.playUnit.destinationPos=destinationPos;
			}
		}
		
		if(this.targetUnit==null)//타겟이 없다면 제자리로
		{
			this.playUnit.destinationPos=this.basePosition;
		}
	}

	this.rand=function(intVal, useMinus)
	{
		var ret = Math.floor(Math.random() * intVal);
		if(useMinus)
		{
			var bool = Math.floor(Math.random() * 1);
			ret = bool==1?bool:bool*-1;
		}
		return ret;
	}

	this.doAttck=function()
	{
		//npc
		if(this.targetUnit!=null && this.isMovable())
		{
			if(this.targetUnit.isAlive() && this.isInReach(this.targetUnit) && this.isMovable())
			{	

				var myPos = this.playUnit.getPosition();
				var tgPos = this.targetUnit.getPosition();
				this.playUnit.n1MotionDirection	= myPos.x<tgPos.x? nxUnitMotion.DirectionBase : nxUnitMotion.DirectionInvert;
				this.doSkill();
			}
		}
	}
	this.doSkill=function()
	{
		new nxSkillNormalAttack(this.playUnit).play();
		//this.playUnit.doAttack();
	}
	this.isMovable=function()//자의캔슬이 가능한 모션인가
	{
		return this.playUnit.isMovable();
	}
	this.isInReach=function(targetUnit)
	{
		var xDistance = Math.abs(this.playUnit.getPosition().x-targetUnit.getPosition().x);
		var yDistance = Math.abs(this.playUnit.getPosition().y-targetUnit.getPosition().y);

		return xDistance<=this.playUnit.n4Reach && yDistance<=5 ? true : false;
	}
	this.isInHorizonArea=function(targetUnit)
	{
		var xDistance = Math.abs(this.playUnit.getPosition().x-targetUnit.getPosition().x);
		var yDistance = Math.abs(this.playUnit.getPosition().y-targetUnit.getPosition().y);

		return xDistance<=this.playUnit.n4Reach && yDistance<=5 ? true : false;
	}
	

	this.getEnemyPoint=function(targetUnit)
	{
		var x = this.playUnit.getPosition().x>=targetUnit.getPosition().x ? targetUnit.getPosition().x+(targetUnit.n4Reach-20) : targetUnit.getPosition().x-(targetUnit.n4Reach-20)  ;
		return  new nxRectangle( x, targetUnit.getPosition().y, 1, 1);
	}
	
	this.getTarget=function()
	{
		var units = this.playUnit.parent.parent.nxUnitCollection.units;//nxGameMain.gameGround.nxUnitCollection.units;
		for(var i=0; i<units.length; i++)
		{
			if(units[i]!=null)
			{
				var enemyUnitType = nxMaskUnitType.codeType_Chaotic;
				if(units[i]!=this.playUnit 
					&& units[i].isAlive()
					&& this.getPixelDistance(units[i])<this.n4Sight
					&& parseInt( units[i].maskUnitType&nxMaskUnitType.codeType_Chaotic )>0 
					&& units[i].isEnemy(this.playUnit) 
				)
				{
					return units[i];
				}
			}
		}
		return null;
	}
	
	this.getPixelDistance=function(targetUnit)
	{
		var pos1 = this.playUnit.getPosition();
		var pos2 = targetUnit.getPosition();
		var x = Math.abs(pos1.x-pos2.x);
		var y = Math.abs(pos1.y-pos2.y);

		return Math.sqrt(Math.pow(x,2)+Math.pow(y,2))
	}

	this.doLater("aiThread()", 500);
}


function nxThrowingUnitAI(playUnit)
{
	nxUnitAI.apply(this, arguments);
	this.n4ThrowDistance = 400;
	this.n4Sight		=  400;


	this.getEnemyPoint=function(targetUnit)
	{
		var myX		= this.playUnit.getPosition().x;
		var targetX = targetUnit.getPosition().x;
		if(myX>=targetX)
			x = myX-targetX>this.n4ThrowDistance? targetX+(this.n4ThrowDistance-100): myX;
		else
			x = targetX-myX>this.n4ThrowDistance? targetX-(this.n4ThrowDistance-100): myX;
		return  new nxRectangle( x, targetUnit.getPosition().y, 1, 1);
	}
	
	this.isInReach=function(targetUnit)
	{
		var xDistance = Math.abs(this.playUnit.getPosition().x-targetUnit.getPosition().x);
		var yDistance = Math.abs(this.playUnit.getPosition().y-targetUnit.getPosition().y);

		return xDistance<=this.n4ThrowDistance && yDistance<=5 ? true : false;
	}
	
	this.doSkill=function()
	{
		this.playUnit.doAttack(4);
	}

	
}
nxThrowingUnitAI.prototype = new NxControl();
nxThrowingUnitAI.prototype.constructor = nxThrowingUnitAI;


function nxJangroUnitAI(playUnit)
{
	nxUnitAI.apply(this, arguments);
	this.n4ThrowDistance = 400;
	this.n4Sight		=  400;


	this.getEnemyPoint=function(targetUnit)
	{
		var myX		= this.playUnit.getPosition().x;
		var targetX = targetUnit.getPosition().x;
		if(myX>=targetX)
			x = myX-targetX>this.n4ThrowDistance? targetX+(this.n4ThrowDistance-100): myX;
		else
			x = targetX-myX>this.n4ThrowDistance? targetX-(this.n4ThrowDistance-100): myX;
			
			
		return  new nxRectangle( x, targetUnit.getPosition().y, 1, 1);
	}
	
	this.isInReach=function(targetUnit)
	{
		var xDistance = Math.abs(this.playUnit.getPosition().x-targetUnit.getPosition().x);
		var yDistance = Math.abs(this.playUnit.getPosition().y-targetUnit.getPosition().y);

		return xDistance<=this.n4ThrowDistance && yDistance<=5 ? true : false;
	}
	
	this.doSkill=function()
	{
		new nxSpellCallLightning(this.playUnit).play();
	}

	
}
nxJangroUnitAI.prototype = new NxControl();
nxJangroUnitAI.prototype.constructor = nxJangroUnitAI;

function nxWizardUnitAI(playUnit)
{
	nxThrowingUnitAI.apply(this, arguments);
	this.n4ThrowDistance = 400;
	this.n4Sight		=  500;

	

	this.doSkill=function()
	{
		var xDistance = Math.abs(this.playUnit.getPosition().x-this.targetUnit.getPosition().x);
		if(xDistance>=200)
			this.playUnit.doAttack();
		else
			this.playUnit.doAttack(1);
	}

	
}
nxWizardUnitAI.prototype = new NxControl();
nxWizardUnitAI.prototype.constructor = nxWizardUnitAI;

function erg(playUnit)
{
	this.playUnit = playUnit;
		
}


