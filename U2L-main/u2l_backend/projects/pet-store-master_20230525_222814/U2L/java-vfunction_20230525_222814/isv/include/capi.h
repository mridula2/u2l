/* $Header: /data/cvsrepo/assess-tools/isv/include/capi.h,v 1.1 2013/06/24 09:32:25 miya Exp $ */
// ***********************************************************************
//  Copyright  Data Application Limited(DAL)  1993			  
// ***********************************************************************
//                                               			  
//   システム名     : ACMS/UX						  
//   機能ブロック   : アプリケーション・インターフェースのＣインターフェース
//   ソース・パス名 : capi.h 						  
//   作成日付       : 1994.04.19	 				  
//                                               			  
// ***********************************************************************
/* 履歴
1994-06-23	api-0022	新規作成
1995-02-05 	関数追加	
		( C_DBLGIN(), C_DBLGOT(), C_INQTRI() )
1995-06-06      センター起動連結配信機能追加の為、関数追加
                ( C_ENTTRN() )
1996-04-09      既存トランザクションの宛先を変更する為、関数追加
                ( C_CHGTRN() )
1996-03-26      サービスの状態をチェックする為、関数追加
                ( C_CHKSRV() )
*/

#ifndef __CAPI_H
#define __CAPI_H

#include <string.h> 
#include <stdlib.h> 
/* HP_MOD : CE-XX : 2013.06.24 */
/*
#include "machine.h"
#include "kapi.h"
*/
/* HP_MOD : CE-XX : 2013.06.24 */
/* HP_MOD Start  */

typedef struct {
	char a;
} Kapi_uci;
typedef struct {
	char a;
} Kapi_zus;
typedef struct {
	char a;
} Kapi_tus;
typedef struct {
	char a;
} Kapi_fui;
typedef struct {
	char a;
} Kapi_jus;
typedef struct {
	char a;
} Kapi_ous;
typedef struct {
	char a;
} Kapi_dii;
typedef struct {
	char a;
} Kapi_zfl;
typedef struct {
	char a;
} Kapi_jfl;
typedef struct {
	char a;
} Kapi_ofl;
typedef struct {
	char a;
} Kapi_ffi;
typedef struct {
	char a;
} Kapi_fmncs;
typedef struct {
	char a;
} Kapi_hui;
typedef struct {
	char a;
} Kapi_hfi;

#define		ON			1

#define		API_NORMAL		0x00
#define		API_PORT_CLOSED		0x01
#define		API_TRI_NOT_FOUND	0x02
#define		API_NOT_CHANGE_STS	0x04
#define		API_SCI_NOT_FOUND	0x08
#define		API_UCI_NOT_FOUND	0x10

/*	(ACMS)処理状態	*/
#define		CUR_ENTRY            0x00000001		/* 処理待 */
#define		CUR_COMPLETE         0x00000002		/* 完了 */
#define		CUR_TEMP_COMPLETE    0x00000004		/* 仮済 */
#define		CUR_PENDING          0x00000008		/* 保留 */
#define		CUR_SEND_WAIT        0x00000010		/* 配信待 */
#define		CUR_SENDING          0x00000020		/* 配信中 */
#define		CUR_RECEIVING        0x00000040		/* 集信中 */
#define		CUR_CREATING         0x00000080		/* 作成中 */
#define		CUR_PROCESSING       0x00000100		/* 処理中 */
#define		CUR_TRANSACTING      0x00000200		/* 発信中 */
#define		CUR_COLLECTING       0x00000400		/* 収集中 */
#define		CUR_SCHDL_WAIT       0x00000800		/* 自動ｽｹｼﾞｭｰﾙ待 */

/*	(ACMS)登録状態	*/
#define		ENT_NORMAL			0x00010000			/* 正常  */
#define		ENT_ERROR    		0x00020000			/* 障害  */
#define		ENT_DELETE   		0x00040000			/* 削除  */
#define		ENT_IGNORE   		0x00080000			/* 破棄  */

#define		R_FILE_MNEMONIC		100
#define		R_MNEMONIC		100
#define		R_OPERATION_DATE		100
#define		R_PATH_NAME		100
#define		R_PROCESS_NAME		100
#define		R_PROTOCOL_ERROR		100
#define		R_SERIAL_NUMBER		100
#define		R_SERVICE_NAME		100
#define		R_TRANSACTION_ID		100
#define		R_TRI_SUB_INFO		100
#define		R_UCI_SUB_INFO		100
#define		R_TIME		100
#define		R_COMM_ID		100

#define		READ_EXACT		1
/* HP_MOD End  */

//
// マルチファイル伝送用子トランザクションを親トランザクションに追加登録する 
    long    C_ADDMLT( char * ptid, char * ctid );

//
// トランザクションのスケジューリングを取り消して、状態を”正常−保留”にする 
    long    C_CANTRN( char * tid );

//
// アプリケーションが稼働可能状態になるのを待つ 
    void    C_CHECKA( void );

//
// 既存トランザクションの宛先を変更する
    long    C_CHGTRN( char * service, char  * uamnc,
		      char * fmnc,    short   snd_rcv_mode, char * tid );

//
// トランザクションの実ファイル関連情報をコピーする 
    long    C_CPYDAT( char * stid, char * dtid );

//
// ユーザ制御
    long    C_CTLUSR( short int ctlcmd, char * service, char * u_mnemonic );

//
// トランザクションの状態を”削除−ＸＸ”にする 
    long    C_DELTRN( char * tid );

//
// トランザクションの状態を”正常−完了”にする 
    long    C_ENDTRN( char * tid );

//
// センター起動連結配信トランザクションをスケジューリングする
    long    C_ENTTRN( char * service, char * uamnc, char * fmnc );

//
// トランザクションの状態を”障害−ＸＸ”にする
    long    C_ERRTRN( char * tid );
//
// トランザクションの状態を”障害−ＸＸ”にする
    long    C_ERRTRN2( char * tid ,long error_code );

//
// バッチ・アプリケーションの終了処理を行う 
    void    C_EXTBAP( int endsts );

//
// アプリケーション固有のコマンド・ラインオプションを取得する 
    char *  C_GETARG( char keywd );

//
// トランザクションの指す実ファイルのデータを読み込む 
    long    C_GETDAT( char * tid, char * buf, short * len, long recno=0 );

//
// ファイル識別の補助情報を取得する 
    long    C_GETDIF1( char * tid, char * dsubif );

//
// ファイル識別の管理情報を取得する 
    long    C_GETDIF2( char  * tid,    short * rctype, short * rclen,
                       short * datacd, short * pri,    char  * dsubif );

//
// トランザクションが指す集配信ファイルのサイクル番号と通信年月日を取得する 
    long    C_GETFSN( char * tid, char * snum, char * cdate );
// ACMS/UX Ver3.3から、サイクル番号が３桁へ
    long    C_GET3FSN( char * tid, char * snum, char * cdate );

//
// ＴＣからの処理要求メッセージを受け、処理を開始する 
    long    C_GETMSG1( char * tid,   short * ttype,  char * service,
                      char * uamnc, short * uatype, char * fmnc,
                      short *snd_rcv_mode, long * recct );
    long    C_GETMSG2( char * tid,   short * ttype,  char * service,
                      char * uamnc, short * uatype, char * fmnc,
                      short *snd_rcv_mode, long * recct, char  * ntid );
//（集配信区分なし）
    long    C_GETMSG3( char * tid,   short * ttype,  char * service,
                      char * uamnc, short * uatype, char * fmnc,
                      long * recct, char  * ntid );
  
//
// トランザクション定義情報の補助情報を取得する 
    long    C_GETTIF1( char * tid, char * tsubif );

//
// トランザクション定義情報の補助情報を取得する 
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
                  char  * tsubif );

//
// ユーザ／アプリケーション定義情報（宛先）の補助情報を取得する 
    long    C_GETUIF( char * tid, char * usubif );

//
// バッチ・アプリケーションの初期化処理を行う 
    long    C_INIBAP( int    argc,    char ** argv, char * arg,
                      char * service, char * apmnc, char * asubif );

//
// オンライン・アプリケーションの初期化処理を行う 
    long    C_ININAP( int    argc,    char ** argv, char * arg,
                      char * service, char * apmnc,
                      char * asubif,  char * psubif );

//
// 指定したトランザクションを検索する（合致検索） 
    long    C_INQTRN1( short  inq_id, char * tid1 );

//
// 指定状態の何れかに合致するトランザクションを検索する（次検索） 
    long    C_INQTRN2( short  inq_id, char * service, char * uamnc,
                       short  uatype, char * fmnc,    short snd_rcv_mode, 
                       char * tid2,   long * recct,  
                       long inqsts = ENT_NORMAL|CUR_PENDING );

//
// ユーザ状況照会
    long    C_INQUSR( short int   inqcmd,
                      char *      service,      char * u_mnemonic,
                      short int   inq_cond,     short int * status,
                      short int * regulate_sts, short int * sch_sts,
                      long * snd_que_cnt,
                      long * snded_cnt,   long * rcved_cnt,
                      char * sndstt_time, char * sndend_time,
                      char * rcvstt_time, char * rcvend_time,
                      long * err_cnt,     long * errcode,
                      char * err_time );

//
// 新たなマルチファイル伝送用親トランザクションを生成する 
    long    C_MKEMLT( char * service, char * uamnc,
                      short  uatype,  char * fmnc, short snd_rcv_mode, 
                      char * tid );

//
// 全銀ユーザ情報更新
   long    C_MNTZUS( short int mntcmd, Kapi_uci & Papi_uci, 
		      Kapi_zus & Papi_zus, short int inqcmd = READ_EXACT );

// ADD start	97-06-01 by E.S
//
// 全銀ＴＣＰユーザ情報更新
    long    C_MNTTUS( short int mntcmd, Kapi_uci & Papi_uci, 
		      Kapi_tus & Papi_tus, short int inqcmd = READ_EXACT );
// ADD end	97-06-01 by E.S

// ADD start	98-11-01 by H.I
// ＦＴＰユーザ情報更新
    long    C_MNTFUI( short int mntcmd, Kapi_uci & Papi_uci, 
		      Kapi_fui & Papi_fui, short int inqcmd = READ_EXACT );
// ADD end	98-11-01 by H.I
//
// ＪＣＡユーザ情報更新
    long    C_MNTJUS( short int mntcmd, Kapi_uci & Papi_uci, 
		      Kapi_jus & Papi_jus, short int inqcmd = READ_EXACT );

//
// その他手順のユーザ情報更新
    long    C_MNTOUS( short int mntcmd, Kapi_uci & Papi_uci, 
		      Kapi_ous & Papi_ous, short int inqcmd = READ_EXACT );
//
// 全銀ファイル情報更新
    long    C_MNTZFL( short int mntcmd, Kapi_dii & api_dii, Kapi_zfl & api_zfl,
                      short int inqcmd = READ_EXACT );

//
// ＪＣＡファイル情報更新
    long    C_MNTJFL( short int mntcmd, Kapi_dii & api_dii, Kapi_jfl & api_jfl,
                      short int inqcmd = READ_EXACT );

//
// その他手順のユーザが扱うファイル情報更新
    long    C_MNTOFL( short int mntcmd, Kapi_dii & api_dii, Kapi_ofl & Papi_ous,
                      short int inqcmd = READ_EXACT );

// ADD start	98-11-01 by H.I
// ＦＴＰファイル情報更新
    long    C_MNTFFI( short int mntcmd, Kapi_dii & Papi_dii, 
		      Kapi_ffi & Papi_ffi, short int inqcmd = READ_EXACT );
// ADD end	98-11-01 by H.I
//
// 新たなトランザクションを生成する 
    long    C_NEWTRN( char * service, char * uamnc,
                      short  uatype,  char * fmnc, short snd_rcv_mode, 
                      char * tid );

//
// トランザクションの状態を”正常−保留”にする 
    long    C_PNDTRN( char * tid );

//
// トランザクションの状態を”正常−作成中”にする 
    long    C_PRCTRN( char * tid );

//
// トランザクションの指す実ファイルにデータを書き込む 
    long    C_PUTDAT( char * tid, char * buf, short len, long recno = 0 );

//
// ファイル識別の補助情報を設定する 
    long    C_PUTDIF( char * tid, char * dsubif );

//
// ファイル生成通知を自動スケジューラに送信する 
    long    C_PUTFIL( char * tid );

//
// 稼働記録を出力する（メッセージコード） 
    long    C_PUTLOG1( long msgcode, char * varstr );

//
// 稼働記録を出力する（メッセージＩＤ） 
    long    C_PUTLOG2( char * msgid, char * varstr );

//
// トランザクションのスケジューリングを要求する 
    long    C_PUTMSG( char * tid, short pri = 0, long time = 0 );

// ADD 99.08.13 by wang
//
// トランザクションの再受信を要求する 
    long    C_PUTMSG2( char * tid, char * serial_num,
			short pri = 0, long time = 0 );
// ADD end

// ADD 99.11.24 by wang
//
// センター起動配信トランザクションのスケジューリング
// (配信待／処理待)を要求する 
    long    C_PUTMSG3( long sts, char * tid,
			short pri = 0, long time = 0 );

//
// ファイルグループ情報を検索する 
    long    C_INQFGI( char *service, char *uamnc, char *fmnc, 
			Kapi_fmncs &child_fmncs );

//
// ファイルグループ配信または列信トランザクションを検索する 
    long    C_INQSTN( long inqid, char * tid, char * pfmnc , char * pcomm_id );

// ADD end

//
// トランザクションに、実ファイル名とそのレコード件数を設定します
    long    C_PUTPTH( char * tid, char * fname, unsigned long recct );

//
// トランザクション定義情報の補助情報を設定する 
    long    C_PUTTIF( char * tid, char * tsubif );

//
// ＴＣからの処理要求の終了処理を行う 
    long    C_RSPSTS( char * tid,\
                    long endsts, long cmpsts = CUR_COMPLETE, int errsts = ON );

//
// トランザクションの状態を”正常−自ス待”にする 
    long    C_SCHTRN( char * tid );

//
// トランザクションの状態を”正常−仮済”にする 
    long    C_TEDTRN( char * tid );

//
// トランザクションを更新する 
    long    C_UPDTRN( char * tid );

//
// データベースへのログイン処理 
    long    C_DBLGIN( int argc, char *argv[] );

//
// データベースからのログアウト処理 
    void    C_DBLGOT( void );

//
// トランザクション情報を照会する 
    long    C_INQTRI( struct TRI_INFO * tri_obj, 
		      char order,     char range, int  status, 
		      char * service, char * user, 
		      char * file,    char * from, char * to );

//
// トランザクションを更新する
    long    C_UPDTRN( char * tid );

//
// トランザクション定義情報の補助情報を取得する 
    long    C_GETTIF3( char * tid,
                  short * ttype,       long  * entsts,    long  * cursts,
                  char  * src_service, char  * src_uamnc, short * src_uatype,
                  char  * dst_service, char  * dst_uamnc, short * dst_uatype,
                  char  * fmnc,        char  * fname,     long  * recct,
                  char  * serial_num,  char  * ope_date,
                  short * file_kind,   short * direction, short * snd_rcv_mode,
                  char  * rcv_tid,     char  * snd_tid,
                  char  * prtcl_err,     long  * acms_err,
                  char  * snd_prtcl_err, long  * snd_acms_err,
                  char  * tsubif,      char  * time_stamp0, char  * time_stamp1,
		  char  * time_stamp2, char  * time_stamp3, char  * time_stamp4,
		  char  * time_stamp5, short * data_type,   char  * sch_time,
		  short * sch_prio,    char  * proto_id,    long  * rcd_point,
		  long  * txt_point,   short * tran_kind,   short * reservdate1,
		  short * reservdate2, char  * processname );

//
// ＴＣからの処理要求の終了処理を行う
    long    C_RSPSTS2( long endsts, long cmpsts = CUR_COMPLETE, 
			int errsts = ON );
//
// 指定されたサービスの状態をチェックする
    long    C_CHKSRV(  char *service );

//
// トランザクション定義情報の補助情報を取得する 
// ACMS/UX Ver3.3から、サイクル番号は３桁へ
    long    C_GET3TIF1( char * tid,
                  short * ttype,       long  * entsts,    long  * cursts,
                  char  * src_service, char  * src_uamnc, short * src_uatype,
                  char  * dst_service, char  * dst_uamnc, short * dst_uatype,
                  char  * fmnc,        char  * fname,     long  * recct,
                  char  * serial_num,  char  * ope_date,
                  short * file_kind,   short * direction, short * snd_rcv_mode,
                  char  * rcv_tid,     char  * snd_tid,
                  char  * prtcl_err,     long  * acms_err,
                  char  * snd_prtcl_err, long  * snd_acms_err,
                  char  * tsubif );
//
// トランザクション定義情報の補助情報を取得する 
// ACMS/UX Ver3.3から、サイクル番号は３桁へ
    long    C_GET3TIF2( char * tid,
                  short * ttype,       long  * entsts,    long  * cursts,
                  char  * src_service, char  * src_uamnc, short * src_uatype,
                  char  * dst_service, char  * dst_uamnc, short * dst_uatype,
                  char  * fmnc,        char  * fname,     long  * recct,
                  char  * serial_num,  char  * ope_date,
                  short * file_kind,   short * direction, short * snd_rcv_mode,
                  char  * rcv_tid,     char  * snd_tid,
                  char  * prtcl_err,     long  * acms_err,
                  char  * snd_prtcl_err, long  * snd_acms_err,
                  char  * tsubif,      char  * time_stamp0, char  * time_stamp1,
		  char  * time_stamp2, char  * time_stamp3, char  * time_stamp4,
		  char  * time_stamp5, short * data_type,   char  * sch_time,
		  short * sch_prio,    char  * proto_id,    long  * rcd_point,
		  long  * txt_point,   short * tran_kind,   short * reservdate1,
		  short * reservdate2, char  * processname );

// ADD start	2000-06-21 by D.L
// ＨＴＴＰユーザ情報更新
    long    C_MNTHUI( short int mntcmd, Kapi_uci & Papi_uci,
		      Kapi_hui & Papi_hui, short int inqcmd = READ_EXACT );

// ＨＴＴＰファイル情報更新
    long    C_MNTHFI( short int mntcmd, Kapi_dii & Papi_dii,
			Kapi_hfi & Papi_hfi, short int inqcmd = READ_EXACT );
// ADD end	2000-06-21 by D.L


#endif  // __CAPI_H


