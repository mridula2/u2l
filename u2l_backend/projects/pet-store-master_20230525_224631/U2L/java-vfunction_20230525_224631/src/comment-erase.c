/*
  $Header: /data/cvsrepo/assess-tools/src/comment-erase.c,v 1.6 2015/09/08 09:44:47 kozeni Exp $
  $Name: rev_1_10 $
 
  ツール名 : 0005_comment-erase
  概要     : コメント除去ツール
  実行方法 : 0005_comment-erase [-n|s] FILE
             オプション 無し : Cスタイルのコメントアウト（ネスト判定無し）
             オプション n    : Cスタイルのコメントアウト（ネスト判定有）
             オプション s    : Shellスタイルのコメントアウト
  入力     : FILE : ソースファイル
  出力     : 
*/
#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
int main(int argc,char*argv[])
{
    FILE* fp;
    char* buf;
    int stringReteral=0;
    int charReteral=0;
    size_t i,len;
    int c;
    int nest=0;
    int retval=0;
    c = getopt( argc, argv, "ns");

    switch (c){
        case 'n':

            if (argc>1&&(fp=fopen(argv[2],"r"))){
                fseek(fp,0,SEEK_END);
                len=ftell(fp);
                buf=(char*)malloc(len);rewind(fp);
                fread(buf,len,1,fp);
                fclose(fp);

                for(i=0;i<len;i++) {
                    if(!stringReteral&&!charReteral&&buf[i]=='/'&&(i+1)<len&&buf[i+1]=='/') {
                        i+=2;
                        while(i<len&&buf[i]!='\n')i++;
                    } else if(!stringReteral&&!charReteral&&buf[i]=='/'&&(i+1)<len&&buf[i+1]=='*') {
                        while(i<=len)
                        {
                            if(!stringReteral&&!charReteral&&buf[i]=='/'&&(i+1)<len&&buf[i+1]=='*'){
                                nest++;
                                i+=2;
                            } else if(i<len&&buf[i]=='*'&&(i+1)<len&&buf[i+1]=='/'){
                                nest--;
                                if(nest==0)break;
                                i+=2;
                            } else if(buf[i]=='\n') {
                                putchar(buf[i]);
                                i++;
                            } else {
                                i++;
                            }
                        }
                        i+=2;
                    } else if(!charReteral&&(buf[i]=='\"')&&(buf[i-1]!='\\')) {
                        stringReteral=!stringReteral;
                    } else if(!stringReteral&&(buf[i]=='\'')&&(buf[i-1]!='\\')) {
                        charReteral=!charReteral;
                    } else if(buf[i]=='\n') {
                        if(stringReteral) {
                            stringReteral=!stringReteral;
                            printf("[ERROR] Unclosed Double Quart in %s.", argv[2]);
                        }
                        if (charReteral) {
                            charReteral=!charReteral;
                            printf("[ERROR] Unclosed Single Quart in %s.", argv[2]);
                        }
                    }
                    putchar(buf[i]);
                }
                if(nest>0) {
                    printf("[ERROR] Unclosed comments '/*' in %s. Num: %d\n", argv[2], nest);
                    retval=1;
                }
            }
            break;

        case 's':    /* shell comment erase */
            if (argc>1&&(fp=fopen(argv[2],"r"))){
                fseek(fp,0,SEEK_END);
                len=ftell(fp);
                buf=(char*)malloc(len);rewind(fp);
                fread(buf,len,1,fp);
                fclose(fp);

                for(i=0;i<len;i++) {
                     // shebang line 
                    if(i==0&&buf[i]=='#'&&1<len&&buf[i+1]=='!') {
                        while(i<len&&buf[i]!='\n'){
                            putchar(buf[i++]);
                        }
                    } else if(!stringReteral&&!charReteral&&buf[i]=='#'&&
                             (i==0||buf[i-1]=='\t'||buf[i-1]==' '||buf[i-1]=='\n')) {
                        i++;
                        while(i<len&&buf[i]!='\n')i++;
                    } else if(!charReteral&&(buf[i]=='\"')&&(buf[i-1]!='\\')) {
                        stringReteral=!stringReteral;
                    } else if(!stringReteral&&(buf[i]=='\'')&&(buf[i-1]!='\\')) {
                        charReteral=!charReteral;
                    } else if(buf[i]=='\n') {
                        if(stringReteral) {
                            stringReteral=!stringReteral;
                        }
                        if (charReteral) {
                            charReteral=!charReteral;
                        }
                    }
                    putchar(buf[i]);
                }
            }
            break;

        default:
            if (argc>1&&(fp=fopen(argv[1],"r"))){
                fseek(fp,0,SEEK_END);
                len=ftell(fp);
                buf=(char*)malloc(len);rewind(fp);
                fread(buf,len,1,fp);
                fclose(fp);

                for(i=0;i<len;i++) {
                    if(!stringReteral&&!charReteral&&buf[i]=='/'&&(i+1)<len&&buf[i+1]=='/') {
                        i+=2;
                        while(i<len&&buf[i]!='\n')i++;
                    } else if(!stringReteral&&!charReteral&&buf[i]=='/'&&(i+1)<len&&buf[i+1]=='*') {
                        i+=2;
                        while(i<len&&!(buf[i]=='*'&&(i+1)<len&&buf[i+1]=='/'))
                        {
                            //
                            if(buf[i]=='\n')putchar(buf[i]);
                            i++;
                        }
                        /* '* /' で終わっていれば 1バイトだけ進める */
                        if(i<len&&buf[i]=='*'&&(i+1)<len&&buf[i+1]=='/') {
                            i++;
                            continue;
                        }
                        i+=2;
                    } else if(!charReteral&&(buf[i]=='\"')&&(buf[i-1]!='\\')) {
                        stringReteral=!stringReteral;
                    } else if(!stringReteral&&(buf[i]=='\'')&&(buf[i-1]!='\\')) {
                        charReteral=!charReteral;
                    } else if(buf[i]=='\n') {
                        if(stringReteral) {
                            stringReteral=!stringReteral;
                            printf("[ERROR] Unclosed Double Quart in %s.", argv[1]);
                            retval=1;
                        }
                        if (charReteral) {
                            charReteral=!charReteral;
                            printf("[ERROR] Unclosed Single Quart in %s.", argv[1]);
                            retval=1;
                        }
                    }
                    putchar(buf[i]);
                }
            }
    }
    return retval;
}
