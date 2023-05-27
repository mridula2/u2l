#!/bin/sh

usage(){
  echo "usage : `basename $0` {tag_name|HEAD} csvFile"
  echo "csvFile format : FileIndex,ReleaseType,CvsEntryPath,InstallDir,FileRename"
  exit 1;
}

SCRIPT_NAME=`basename $0`
EXECUTE_DIR=`pwd`
INSTALL_ROOT="install_dir"
CURRENT_DATE=`date '+%Y-%m%d'`
TAG_NAME=""
CSV_FILE=""
EXPORT_DIR=""
EXPORT_LOG="${EXECUTE_DIR}/cvs_export_`date '+%Y-%m%d-%M%S'`.log"
TAR_LOG="${EXECUTE_DIR}/tar_create_`date '+%Y-%m%d-%M%S'`.log"
LOG_FILE="${SCRIPT_NAME%.*}_`date '+%Y-%m%d-%M%S'`.log"

checkEnv() {
  retCode=0
  if [ -z "$CVSROOT" ] ; then
    echo "env CVSROOT is not set."
    retCode=1;
  fi

  if [ -z "$APNAME" ] ; then
    echo "env APNAME is not set."
    retCode=1;
  fi

  return $retCode
}

checkParameter() {
  if [ $# -ne 2 ] ; then
    usage;
    return 1
  fi

  TAG_NAME=$1
  CSV_FILE=$2

  if [ ! -r ${CSV_FILE} ] ; then
    echo "file:${CSV_FILE} cannot read."
    return 1;
  fi 

  return 0
}

echo "check env."
checkEnv
result=$?
if [ $result -ne 0 ] ; then
  exit 1;
fi

echo "check parameter."
checkParameter $*
result=$?
if [ $result -ne 0 ] ; then
  exit 1;
fi

echo "cvs export."
if [ "$TAG_NAME" = "HEAD" ] ; then
  EXPORT_DIR="${APNAME}_${CURRENT_DATE}"
  if [ -d ${EXPORT_DIR} ] ; then
    echo "directory:${EXPORT_DIR} already exists."
    exit 1
  fi
  cvs export -d ${EXPORT_DIR} ${APNAME} > ${EXPORT_LOG} 2>&1
else
  EXPORT_DIR="${TAG_NAME}"
  if [ -d ${EXPORT_DIR} ] ; then
    echo "directory:${EXPORT_DIR} already exists."
    exit 1
  fi
  cvs export -r ${TAG_NAME} -d ${EXPORT_DIR} ${APNAME} > ${EXPORT_LOG} 2>&1
fi 
result=$?
if [ $result -ne 0 ] ; then
  echo "cvs export failed."
  rm -rf ./${EXPORT_DIR}
  exit 1;
fi

echo "create install directory"
for dir in `cat ${CSV_FILE} | cut -d, -f4 | sort -u | grep -v "^/$"`
do
  echo "mkdir -p ./${INSTALL_ROOT}/${dir}" >> ${LOG_FILE}
  mkdir -p ./${INSTALL_ROOT}/${dir}
  result=$?
  if [ $result -ne 0 ] ; then
    echo "mkdir failed. command:mkdir ./${INSTALL_ROOT}/${dir}"
    exit 1;
  fi
done

echo "crate Archive dir:${INSTALL_ROOT} log:${LOG_FILE}"
for line in `egrep -v "^#|^$" ${CSV_FILE}`
do
  TYPE=`echo $line | cut -d, -f2`
  RELEASE_FILE=`echo $line | cut -d, -f3`
  INSTALL_PATH=`echo $line | cut -d, -f4`
  RENAME=`echo $line | cut -d, -f5`

  if [ ! -e ${EXPORT_DIR}/${RELEASE_FILE} ] ; then
    echo "cvs file:${EXPORT_DIR}/${RELEASE_FILE} not exists."
    continue
  fi

  echo "cp ./${EXPORT_DIR}/${RELEASE_FILE} ./${INSTALL_ROOT}${INSTALL_PATH}/${RENAME}" >> ${LOG_FILE}
  cp ./${EXPORT_DIR}/${RELEASE_FILE} ./${INSTALL_ROOT}/${INSTALL_PATH}/${RENAME}
  result=$?
  if [ $result -ne 0 ] ; then
    echo "cp failed. command:cp ./${EXPORT_DIR}/${RELEASE_FILE} ./${INSTALL_ROOT}/${INSTALL_PATH}"
    exit 1;
  fi

done

cd ${INSTALL_ROOT}
tar cvzf ${TAG_NAME}.tar.gz ./* > ${TAR_LOG}
result=$?
cd ${EXECUTE_DIR}
if [ $result -ne 0 ] ; then
  echo "tar failed. command:tar cvzf ${TAG_NAME}.tar.gz ./*"
  exit 1;
fi

mv ${INSTALL_ROOT}/${TAG_NAME}.tar.gz .
echo "create release file:${TAG_NAME}.tar.gz"

