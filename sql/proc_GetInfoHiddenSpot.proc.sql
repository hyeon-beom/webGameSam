
-- ====================================================================
-- Author:	<    >
-- Create date: < 2013.07.9 >
-- Description:	<     >
-- ====================================================================
CREATE PROCEDURE [dbo].[proc_GetInfoHiddenSpot]
	 @frk_n4ErrorCode	int				=NULL	OUTPUT,
	 @frk_strErrorText	nvarchar(100)	=NULL	OUTPUT,
	 @frk_isRequiresNewTransaction		tinyint	= 1,	

	@user_sn		bigint	=null		OUTPUT,
	@character_sn	bigint	=null		OUTPUT,
	@spot_index		int		=null		OUTPUT,
	
	@nickname_master		nvarchar(40) =null	OUTPUT,
	@complete_count_total	int		=null	OUTPUT,
	@score_total			int		=null	OUTPUT,
	@remain_second			int		=null	OUTPUT,
	@user_sn_master			bigint	=null	OUTPUT,
	@character_sn_master	bigint	=null	OUTPUT,
	
	@complete_count_my		int		=null	OUTPUT,
	@hiddenspot_sn			int     =null	OUTPUT,
	@scrore_my				int		=null	OUTPUT,

	@member_total			int		=null	OUTPUT,
	@rank_my				int		=null	OUTPUT,
	@date_create			DateTime=null	OUTPUT
			
AS
BEGIN
	
/*********************************************************************/
SET NOCOUNT ON;
SET	@frk_n4ErrorCode		= 0
SET	@frk_strErrorText		= NULL
if @frk_isRequiresNewTransaction=1 BEGIN TRAN
BEGIN TRY
/*********************************************************************/

	--sub table
	SELECT 
       @hiddenspot_sn = [hiddenspot_sn]
      ,@complete_count_my = [complete_count]
      ,@scrore_my = [score]
    FROM [HL_CollaboDB].[dbo].[HL_HiddenSpotMembers] with(nolock) 
    WHERE user_sn=@user_sn AND character_sn=@character_sn AND spot_index=@spot_index

	IF @@ROWCOUNT=0
	BEGIN
		SET	@frk_n4ErrorCode = 202007;
		SET	@frk_strErrorText = 'NOT_EXIST_HIDDEN_SPOT_MEMBER'
		goto lblFail 
	END
  

	--master table
	SELECT 
       @complete_count_total= [complete_count]
	  ,@score_total			= [score]
      ,@remain_second		= datediff(second, getdate(), [date_end])
	  ,@user_sn_master		= user_sn
	  ,@character_sn_master	= character_sn
	  ,@nickname_master		= nickname
	  ,@date_create         = date_create
	FROM [dbo].[HL_HiddenSpot] with(nolock) WHERE sn=@hiddenspot_sn

	IF @user_sn_master IS NULL
	BEGIN
		SET	@frk_n4ErrorCode = 202004;
		SET	@frk_strErrorText = 'NOT_EXIST_HIDDEN_SPOT'
		goto lblFail 
	END

	--statistic
	SELECT 
       @member_total		 = COUNT(*)
	  ,@rank_my				 = SUM(case when @scrore_my<[score] then 1 else 0 end  )	
    FROM [HL_CollaboDB].[dbo].[HL_HiddenSpotMembers] with(nolock) 
    WHERE [hiddenspot_sn] = @hiddenspot_sn

	IF @rank_my=0 SET @rank_my=1


	IF @member_total IS NULL
	BEGIN
		SET	@frk_n4ErrorCode = 202008;
		SET	@frk_strErrorText = 'NOT_EXIST_HIDDEN_SPOT_SN'
		goto lblFail 
	END
	
	--rank top 
	SELECT TOP 500
       [score]
	   ,nickname
	   ,user_sn
	   ,character_sn
	   ,character_exp_origin 
    FROM [HL_CollaboDB].[dbo].[HL_HiddenSpotMembers] with(nolock) 
    WHERE [hiddenspot_sn] = @hiddenspot_sn order by [score] desc
	

	
		


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