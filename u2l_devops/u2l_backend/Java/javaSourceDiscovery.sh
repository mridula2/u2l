#!/bin/sh
#
# Revision: rev_1_0
#
# Name : javaSourceDiscovery.sh
# Description  : Scans all .java files for Java (JDK), Struts and Spring Framework Usage(APIs).
# Usage : javaFrameworkScan.sh SourceFolder
# SourceFolder : WorkSpace where Java source files are present.
# Output: 1. List of Standard and Non Standard Libraries/Jar
# Created by: Bhavna Harinkhede
# Date : 27/06/2018
#
if [ $# -ne 1 ];
        then
                echo "Usage : javaSourceDiscovery.sh SourceFolder "
                echo " Usage Example: ./javaSourceDiscovery.sh /home/bhavnaharinkhede/WorkSPace/work"
                 exit
fi
sourceFolder="${1%/}"

      rulesPath="$PJHOME/JavaRules/APICheck"


if [ -f javalist.txt ];
	then 
		rm -rf javalist.txt
fi

if [ -f sourceScanImports.txt ];
	then 
		rm -rf sourceScanImports.txt
fi

if [ -f uniqSourceScanImports.txt ];
	then
		rm -rf uniqSourceScanImports.txt
fi

if [ -f jdkRulesGrepped.txt ];
        then
                rm -rf jdkRulesGrepped.txt 
fi

if [ -f springRulesGrepped.txt ];
        then
                rm -rf springRulesGrepped.txt
fi

if [ -f strutsRulesGrepped.txt ];
        then
                rm -rf strutsRulesGrepped.txt
fi

if [ -f nonStandardAPI.txt ];
        then
                rm -rf nonStandardAPI.txt 
fi

if [ -f JDKRulesGrepped.txt ];
        then
                rm -rf JDKRulesGrepped.txt 
fi

if [ -f ServletRulesGrepped.txt ];
        then
                rm -rf ServletRulesGrepped.txt
fi


find $sourceFolder/ -name *.java >javalist.txt
for i in `cat javalist.txt`
 do 
   grep -inH "import" $i >> sourceScanImports.txt
done
cat sourceScanImports.txt | cut -d ' ' -f2 | cut  -d ';' -f1 | sed 's/[ ]//g'| sort | uniq >uniqSourceScanImports.txt
echo "kalin"
for i in `cat uniqSourceScanImports.txt`
do
if [[ `echo $i | cut -d '.' -f1`  ==  "org" ]];
	then
 		if [[ `echo $i | cut -d '.' -f2` ==  "apache" ]];
                    then
			if [[ `echo $i | cut -d '.' -f3` == "struts" ]];
                           then
				 if [ `grep $i $rulesPath/StrutsAPIs.rules | wc -l` -gt 0 ];
		                           then
                		                 grep  $i $rulesPath/StrutsAPIs.rules | cut -d ':' -f2 >> strutsRulesGrepped.txt
						 Apiflag=1
                                                 break
					   else 
                                               strutsCheckRulestoCount=$(echo "$i" | awk -F'.' '{ print NF }')
 						j=0
                                               while [ $j -lt $strutsCheckRulestoCount ]
                                                do 
	                                               Apitocheck=$(echo $i | rev | cut -d '.' -f2- | rev)
	                                              	 if [ `grep $Apitocheck  $rulesPath/StrutsAPIs.rules | wc -l` -gt 0 ];
 								then
									grep  $Apitocheck $rulesPath/StrutsAPIs.rules | cut -d ':' -f2 >> strutsRulesGrepped.txt								
									Apiflag=1
                                                                        break
								fi
							j=`expr $j + 1`
						done
				   fi
			fi
		fi
fi	
first=$(echo $i | cut -d '.' -f1)
second=$(echo $i | cut -d '.' -f2)
if [ "$first" == "org" ];
        then
                if [ "$second" == "springframework" ];
                    then
                          if [ `grep $i $rulesPath/SpringAPIs.rules | wc -l` -gt 0 ];
                                   then
                           	            grep  $i $rulesPath/SpringAPIs.rules | cut -d ':' -f2 >> springRulesGrepped.txt
                                	       Apiflag=1
                                               break
                                   else
                         	                springCheckRulestoCount=$(echo "$i" | awk -F'.' '{ print NF }')
                                                k=0;
                                                echo  $k $springCheckRulestoCount
                                               while [ $k -lt $springCheckRulestoCount ]
                                                do
                                                       Apitocheck=$(echo $i | rev | cut -d '.' -f2- | rev)
                                                         if [ `grep $Apitocheck  $rulesPath/SpringAPIs.rules | wc -l` -gt 0 ];
                                                                then
                                                                        grep  $Apitocheck $rulesPath/SpringAPIs.rules | cut -d ':' -f2 >> springRulesGrepped.txt
                                                                        Apiflag=1
									break
                                                                fi
							k=`expr $k + 1`
                                                done
                                   fi
                fi
fi

if [ "$first" == "javax" ] && [ "$second" == "faces" ]; then
    if [ `grep $i $rulesPath/JSFAPIs.rules | wc -l` -gt 0 ]; then
        grep $i $rulesPath/JSFAPIs.rules | cut -d ':' -f2 >> jsfRulesGrepped.txt
        Apiflag=1
        break
    else
        jsfCheckRulestoCount=$(echo "$i" | awk -F'.' '{ print NF }')
        k=0
	echo  $k $jsfCheckRulestoCount
        while [ $k -lt $jsfCheckRulestoCount ]; do
            Apitocheck=$(echo $i | rev | cut -d '.' -f2- | rev)
            if [ `grep $Apitocheck $rulesPath/JSFAPIs.rules | wc -l` -gt 0 ]; then
                grep $Apitocheck $rulesPath/JSFAPIs.rules | cut -d ':' -f2 >> jsfRulesGrepped.txt
                Apiflag=1
                break
            fi
            k=`expr $k + 1`
        done
    fi
fi

 if [ `grep $i $rulesPath/JDKAPIs.rules | wc -l` -gt 0 ];
        then
             grep  $i $rulesPath/JDKAPIs.rules | cut -d ':' -f2 >> JDKRulesGrepped.txt
             Apiflag=1
             break
        else
             JDKCheckRulestoCount=$(echo "$i" | awk -F'.' '{ print NF }')
             k=0;
             while [ $k -lt $JDKCheckRulestoCount ]
                  do
                    Apitocheck=$(echo $i | rev | cut -d '.' -f2- | rev)
                    if [ `grep $Apitocheck  $rulesPath/JDKAPIs.rules | wc -l` -gt 0 ];
                       then
                             grep  $Apitocheck $rulesPath/JDKAPIs.rules | cut -d ':' -f2 >> JDKRulesGrepped.txt
                             Apiflag=1
                             break
                    fi
                      k=`expr $k + 1`
                   done
fi

if [ `grep $i $rulesPath/ServletAPIs.rules | wc -l` -gt 0 ];
        then
             grep  $i $rulesPath/ServletAPIs.rules | cut -d ':' -f2 >> ServletRulesGrepped.txt
             Apiflag=1
             break
        else
             ServletCheckRulestoCount=$(echo "$i" | awk -F'.' '{ print NF }')
             k=0;
             while [ $k -lt $ServletCheckRulestoCount ]
                  do
                    Apitocheck=$(echo $i | rev | cut -d '.' -f2- | rev)
                    if [ `grep $Apitocheck  $rulesPath/ServletAPIs.rules | wc -l` -gt 0 ];
                       then
                             grep  $Apitocheck $rulesPath/ServletAPIs.rules | cut -d ':' -f2 >> ServletRulesGrepped.txt
                             Apiflag=1
                             break
                    fi
                      k=`expr $k + 1`
                   done
fi


echo $Apiflag $i
if [[ "$Apiflag" -lt 1 ]];
        then
               echo $Apiflag $i
                echo $i >> nonStandardAPI.txt
fi
done


SAVEIFS=$IFS
IFS=$(echo -en "\n\b")
        
IFS=$SAVEIFS

