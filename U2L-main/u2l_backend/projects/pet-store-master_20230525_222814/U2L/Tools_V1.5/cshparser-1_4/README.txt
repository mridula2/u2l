●使用方法

　hpscanツールをインストール後、/usr/local/hpscan/shanalyze/に
　cshparserとしてコピー、またはシンボリックリンクする

●ソースコード管理
　CVSROOT は cvs_server(192.168.2.120):/data/cvsrepo

　下記手順で作成（cvs_serverはRHEL6.7）
  $ mkdir work
  $ cd work
  $ cvs co -r rev_1_4 hpscan
  $ cd hpscan/src/shanalizer_source/src/cshparser
  $ ./configure
  $ make
  $ mv cshparser cshparser-1_4.rhel6

●バージョン情報

cshparser-1_4.rhel6:	RHEL6用に再コンパイル（ソースコードはおそらくVer1.0から変更なし）

cshparser-0_0.linux:	Ver_1.0のcshparser-0_0.linuxと同じでRHEL5用

cshparser-0_0.hpux:	Ver_1.0のcshparser-0_0.hpuxと同じでHP-UX用







