#include "capi.h"

//
//// バッチ・アプリケーションの終了処理を行う
void    C_EXTBAP( int endsts )
{
	int i=0;
}


// トランザクションのスケジューリングを取り消して、状態を”正常－保留”にする
long    C_CANTRN( char * tid ) 
{
	int i=0;
}

//
// トランザクションの状態を”正常－完了”にする
long    C_ENDTRN( char * tid )
{
	int i=0;
}

//
// アプリケーション固有のコマンド・ラインオプションを取得する
char *  C_GETARG( char keywd )
{
	int i=0;
}

//
// 指定したトランザクションを検索する（合致検索）
long    C_INQTRN1( short  inq_id, char * tid1 )
{
	int i=0;
}

//
// バッチ・アプリケーションの初期化処理を行う
long    C_INIBAP( int    argc,    char ** argv, char * arg,
                      char * service, char * apmnc, char * asubif )
{
	int i=0;
}

long    C_GETTIF2( char * tid,
	  short * ttype,       long  * entsts,    long  * cursts,
	  char  * src_service, char  * src_uamnc, short * src_uatype,
	  char  * dst_service, char  * dst_uamnc, short * dst_uatype,
	  char  * fmnc,        char  * fname,     long  * recct,
	  char  * serial_num,  char  * ope_date,
	  short * file_kind,   short * direction, short * snd_rcv_mode,
	  char  * rcv_tid,     char  * snd_tid,
	  char  * prtcl_err,     long  * acms_err,
	  char  * snd_prtcl_err, long  * snd_acms_err,
	  char  * tsubif )
{
	int i=0;
}

// トランザクション定義情報の補助情報を取得する
long    C_GETTIF3( char * tid,
		  short * ttype,	   long  * entsts,	long  * cursts,
		  char  * src_service, char  * src_uamnc, short * src_uatype,
		  char  * dst_service, char  * dst_uamnc, short * dst_uatype,
		  char  * fmnc,		char  * fname,	 long  * recct,
		  char  * serial_num,  char  * ope_date,
		  short * file_kind,   short * direction, short * snd_rcv_mode,
		  char  * rcv_tid,	 char  * snd_tid,
		  char  * prtcl_err,	 long  * acms_err,
		  char  * snd_prtcl_err, long  * snd_acms_err,
		  char  * tsubif,	  char  * time_stamp0, char  * time_stamp1,
		  char  * time_stamp2, char  * time_stamp3, char  * time_stamp4,
		  char  * time_stamp5, short * data_type,   char  * sch_time,
		  short * sch_prio,	char  * proto_id,	long  * rcd_point,
		  long  * txt_point,   short * tran_kind,   short * reservdate1,
		  short * reservdate2, char  * processname )
{
	int i=0;
}

