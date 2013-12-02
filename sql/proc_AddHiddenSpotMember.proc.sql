
-- ====================================================================
-- Author:	<    >
-- Create date: < 2013.07.9 >
-- Description:	<     >
-- ====================================================================
CREATE PROCEDURE [dbo].[proc_AddHiddenSpotMember]
	@frk_n4ErrorCode	int				=NULL	OUTPUT,
	@frk_strErrorText	nvarchar(100)	=NULL	OUTPUT,
	@frk_isRequiresNewTransaction		tinyint	= 1,	

	@user_sn_master			bigint,
    @character_sn_master	bigint,
	@spot_index			int,
	
    @user_sn			bigint,
    @character_sn		bigint,
	@character_exp_origin bigint,
	@nickname			nvarchar(40),
	@limit_player		int,
	

	@hiddenspot_sn		int=null	OUTPUT

AS
BEGIN
	
/*********************************************************************/
SET NOCOUNT ON;
SET	@frk_n4ErrorCode		= 0
SET	@frk_strErrorText		= NULL
if @frk_isRequiresNewTransaction=1 BEGIN TRAN
BEGIN TRY
/*********************************************************************/
	DECLARE @date_end datetime
	--master table
	SELECT 
       @hiddenspot_sn	=  sn,
	   @date_end		= date_end
    FROM [HL_CollaboDB].[dbo].[HL_HiddenSpot] with(nolock) 
    WHERE user_sn=@user_sn_master AND character_sn=@character_sn_master AND spot_index=@spot_index

	IF @hiddenspot_sn IS NULL --IF @@ROWCOUNT=0
	BEGIN
		SET	@frk_n4ErrorCode = 202004;
		SET	@frk_strErrorText = 'NOT_EXIST_HIDDEN_SPOT'
		goto lblFail 
	END

	IF @date_end<GETDATE()
	BEGIN
		SET	@frk_n4ErrorCode = 202005;
		SET	@frk_strErrorText = 'CLOSED_HIDDEN_SPOT'
		goto lblFail 
	END


	IF EXISTS (SELECT TOP 1 '*' FROM [dbo].[HL_HiddenSpotMembers] with(nolock) WHERE user_sn=@user_sn AND character_sn=@character_sn AND spot_index=@spot_index )
	BEGIN
		SET	@frk_n4ErrorCode = 202006;
		SET	@frk_strErrorText = 'DUPLICATION_HIDDEN_SPOT'
		goto lblFail 
	END

	INSERT INTO [dbo].[HL_HiddenSpotMembers]
			   ([hiddenspot_sn]
			   ,[spot_index]
			   ,[user_sn]
			   ,[character_sn]
			   ,[character_exp_origin] 
			   ,[nickname] 
			   ,[complete_count]
			   ,[score]
			   ,[date_create]
			   ,[last_update])
		 VALUES
			   (@hiddenspot_sn
			   ,@spot_index
			   ,@user_sn
			   ,@character_sn
			   ,@character_exp_origin
			   ,@nickname
			   ,0
			   ,0
			   ,GETDATE()
			   ,GETDATE()
			   )

	IF @limit_player < (SELECT COUNT(*) FROM [dbo].[HL_HiddenSpotMembers] with(nolock) WHERE hiddenspot_sn=@hiddenspot_sn )
	BEGIN
		SET	@frk_n4ErrorCode = 202009;
		SET	@frk_strErrorText = 'OVER_MEMBER_COUNT_HIDDEN_SPOT'
		goto lblFail 
	END
			   

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