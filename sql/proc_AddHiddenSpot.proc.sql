
-- ====================================================================
-- Author:	<    >
-- Create date: < 2013.07.9 >
-- Description:	<     >
-- ====================================================================
CREATE PROCEDURE [dbo].[proc_AddHiddenSpot]
	 @frk_n4ErrorCode	int				=NULL	OUTPUT,
	 @frk_strErrorText	nvarchar(100)	=NULL	OUTPUT,
	 @frk_isRequiresNewTransaction		tinyint	= 1,	

	@user_sn bigint,
	@character_sn bigint,
	@character_exp_origin bigint,
	@spot_index int,
	@remain_second	int,
	@wait_second	int,
	@nickname nvarchar(40)
	
AS
BEGIN
	
/*********************************************************************/
SET NOCOUNT ON;
SET	@frk_n4ErrorCode		= 0
SET	@frk_strErrorText		= NULL
if @frk_isRequiresNewTransaction=1 BEGIN TRAN
BEGIN TRY
/*********************************************************************/

IF EXISTS (SELECT TOP 1 '*' FROM [dbo].HL_HiddenSpot with(nolock) WHERE  user_sn=@user_sn AND character_sn=@character_sn AND spot_index=@spot_index)
BEGIN
	SET	@frk_n4ErrorCode = 202003;
	SET	@frk_strErrorText = 'THIS_SPOT_IS_ALREADY_OPEN'
	goto lblFail 
END

	INSERT INTO [dbo].[HL_HiddenSpot]
           ([user_sn]
           ,[character_sn]
		   ,[nickname] 
           ,[spot_index]
           ,[complete_count]
		   ,[score] 
           ,[date_end]
		   ,[date_over]
           ,[date_create]
           ,[last_update])
     VALUES
           (@user_sn
           ,@character_sn
		   ,@nickname
           ,@spot_index
           ,0
		   ,0
           ,DATEADD(second, @remain_second, GETDATE()) 
		   ,DATEADD(second, @remain_second+@wait_second, GETDATE()) 
           ,GETDATE()
           ,GETDATE()
		   )

--히든스팟 멤버로 추가
		EXECUTE [dbo].[proc_AddHiddenSpotMember] 
		   @frk_n4ErrorCode		= @frk_n4ErrorCode OUTPUT
		  ,@frk_strErrorText	= @frk_strErrorText OUTPUT
		  ,@frk_isRequiresNewTransaction = 0
		  ,@user_sn_master		= @user_sn
		  ,@character_sn_master = @character_sn
		  ,@spot_index			= @spot_index
		  ,@user_sn				= @user_sn
		  ,@character_sn		= @character_sn
		  ,@character_exp_origin= @character_exp_origin
		  ,@nickname			= @nickname
		  ,@limit_player		= 1
		  --,@hiddenspot_sn OUTPUT
		


	

/*********************************************************************/
END TRY
BEGIN CATCH
	SET		@frk_n4ErrorCode = -1 --error_number()
	SET		@frk_strErrorText = error_message()
	goto lblFail
END CATCH
if @frk_n4ErrorCode<>0 or @@ERROR<>0 goto lblFail
lblSuccess:
	if @frk_isRequiresNewTransaction=1 commit tran
	SET		rowcount 0
	SET		@frk_n4ErrorCode = 0
	SET		@frk_strErrorText = ''
	RETURN	0
lblFail:
	if @frk_isRequiresNewTransaction=1 rollback tran
	SET		rowcount 0
	SET		@frk_n4ErrorCode = @frk_n4ErrorCode
	SET		@frk_strErrorText = convert( varchar(11), @frk_n4ErrorCode ) + ' : ' + @frk_strErrorText
	RETURN	@frk_n4ErrorCode
/*********************************************************************/
END