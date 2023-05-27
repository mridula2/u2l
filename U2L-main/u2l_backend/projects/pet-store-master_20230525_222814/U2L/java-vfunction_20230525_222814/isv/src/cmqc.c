#include "cmqc.h"

 /*********************************************************************/
 /*  MQBACK Function -- Back Out Changes                              */
 /*********************************************************************/

 void MQENTRY MQBACK (
   MQHCONN  Hconn,      /* Connection handle */
   PMQLONG  pCompCode,  /* Completion code */
   PMQLONG  pReason)   /* Reason code qualifying CompCode */
{
	int i=0;
}

 /*********************************************************************/
 /*  MQBEGIN Function -- Begin Unit of Work                           */
 /*********************************************************************/

 void MQENTRY MQBEGIN (
   MQHCONN  Hconn,          /* Connection handle */
   PMQVOID  pBeginOptions,  /* Options that control the action of
                               MQBEGIN */
   PMQLONG  pCompCode,      /* Completion code */
   PMQLONG  pReason)        /* Reason code qualifying CompCode */
{
	int i=0;
}


 /*********************************************************************/
 /*  MQCLOSE Function -- Close Object                                 */
 /*********************************************************************/

 void MQENTRY MQCLOSE (
   MQHCONN  Hconn,      /* Connection handle */
   PMQHOBJ  pHobj,      /* Object handle */
   MQLONG   Options,    /* Options that control the action of MQCLOSE */
   PMQLONG  pCompCode,  /* Completion code */
   PMQLONG  pReason)    /* Reason code qualifying CompCode */
{
	int i=0;
}


 /*********************************************************************/
 /*  MQCMIT Function -- Commit Changes                                */
 /*********************************************************************/

 void MQENTRY MQCMIT (
   MQHCONN  Hconn,      /* Connection handle */
   PMQLONG  pCompCode,  /* Completion code */
   PMQLONG  pReason)    /* Reason code qualifying CompCode */
{
	int i=0;
}


 /*********************************************************************/
 /*  MQCONN Function -- Connect Queue Manager                         */
 /*********************************************************************/

 void MQENTRY MQCONN (
   PMQCHAR   pQMgrName,  /* Name of queue manager */
   PMQHCONN  pHconn,     /* Connection handle */
   PMQLONG   pCompCode,  /* Completion code */
   PMQLONG   pReason)    /* Reason code qualifying CompCode */
{
	int i=0;
}


 /*********************************************************************/
 /*  MQCONNX Function -- Connect Queue Manager (Extended)             */
 /*********************************************************************/

 void MQENTRY MQCONNX (
   PMQCHAR   pQMgrName,     /* Name of queue manager */
   PMQCNO    pConnectOpts,  /* Options that control the action of
                               MQCONNX */
   PMQHCONN  pHconn,        /* Connection handle */
   PMQLONG   pCompCode,     /* Completion code */
   PMQLONG   pReason)       /* Reason code qualifying CompCode */
{
	int i=0;
}


 /*********************************************************************/
 /*  MQDISC Function -- Disconnect Queue Manager                      */
 /*********************************************************************/

 void MQENTRY MQDISC (
   PMQHCONN  pHconn,     /* Connection handle */
   PMQLONG   pCompCode,  /* Completion code */
   PMQLONG   pReason)    /* Reason code qualifying CompCode */
{
	int i=0;
}


 /*********************************************************************/
 /*  MQGET Function -- Get Message                                    */
 /*********************************************************************/

 void MQENTRY MQGET (
   MQHCONN  Hconn,         /* Connection handle */
   MQHOBJ   Hobj,          /* Object handle */
   PMQVOID  pMsgDesc,      /* Message descriptor */
   PMQVOID  pGetMsgOpts,   /* Options that control the action of
                              MQGET */
   MQLONG   BufferLength,  /* Length in bytes of the Buffer area */
   PMQVOID  pBuffer,       /* Area to contain the message data */
   PMQLONG  pDataLength,   /* Length of the message */
   PMQLONG  pCompCode,     /* Completion code */
   PMQLONG  pReason)       /* Reason code qualifying CompCode */
{
	int i=0;
}


 /*********************************************************************/
 /*  MQINQ Function -- Inquire Object Attributes                      */
 /*********************************************************************/

 void MQENTRY MQINQ (
   MQHCONN  Hconn,           /* Connection handle */
   MQHOBJ   Hobj,            /* Object handle */
   MQLONG   SelectorCount,   /* Count of selectors */
   PMQLONG  pSelectors,      /* Array of attribute selectors */
   MQLONG   IntAttrCount,    /* Count of integer attributes */
   PMQLONG  pIntAttrs,       /* Array of integer attributes */
   MQLONG   CharAttrLength,  /* Length of character attributes buffer */
   PMQCHAR  pCharAttrs,      /* Character attributes */
   PMQLONG  pCompCode,       /* Completion code */
   PMQLONG  pReason)         /* Reason code qualifying CompCode */
{
	int i=0;
}


 /*********************************************************************/
 /*  MQOPEN Function -- Open Object                                   */
 /*********************************************************************/

 void MQENTRY MQOPEN (
   MQHCONN  Hconn,      /* Connection handle */
   PMQVOID  pObjDesc,   /* Object descriptor */
   MQLONG   Options,    /* Options that control the action of MQOPEN */
   PMQHOBJ  pHobj,      /* Object handle */
   PMQLONG  pCompCode,  /* Completion code */
   PMQLONG  pReason)    /* Reason code qualifying CompCode */
{
	int i=0;
}


 /*********************************************************************/
 /*  MQPUT Function -- Put Message                                    */
 /*********************************************************************/

 void MQENTRY MQPUT (
   MQHCONN  Hconn,         /* Connection handle */
   MQHOBJ   Hobj,          /* Object handle */
   PMQVOID  pMsgDesc,      /* Message descriptor */
   PMQVOID  pPutMsgOpts,   /* Options that control the action of
                              MQPUT */
   MQLONG   BufferLength,  /* Length of the message in Buffer */
   PMQVOID  pBuffer,       /* Message data */
   PMQLONG  pCompCode,     /* Completion code */
   PMQLONG  pReason)       /* Reason code qualifying CompCode */
{
	int i=0;
}


 /*********************************************************************/
 /*  MQPUT1 Function -- Put One Message                               */
 /*********************************************************************/

 void MQENTRY MQPUT1 (
   MQHCONN  Hconn,         /* Connection handle */
   PMQVOID  pObjDesc,      /* Object descriptor */
   PMQVOID  pMsgDesc,      /* Message descriptor */
   PMQVOID  pPutMsgOpts,   /* Options that control the action of
                              MQPUT1 */
   MQLONG   BufferLength,  /* Length of the message in Buffer */
   PMQVOID  pBuffer,       /* Message data */
   PMQLONG  pCompCode,     /* Completion code */
   PMQLONG  pReason)       /* Reason code qualifying CompCode */
{
	int i=0;
}


 /*********************************************************************/
 /*  MQSET Function -- Set Object Attributes                          */
 /*********************************************************************/

 void MQENTRY MQSET (
   MQHCONN  Hconn,           /* Connection handle */
   MQHOBJ   Hobj,            /* Object handle */
   MQLONG   SelectorCount,   /* Count of selectors */
   PMQLONG  pSelectors,      /* Array of attribute selectors */
   MQLONG   IntAttrCount,    /* Count of integer attributes */
   PMQLONG  pIntAttrs,       /* Array of integer attributes */
   MQLONG   CharAttrLength,  /* Length of character attributes buffer */
   PMQCHAR  pCharAttrs,      /* Character attributes */
   PMQLONG  pCompCode,       /* Completion code */
   PMQLONG  pReason)         /* Reason code qualifying CompCode */
{
	int i=0;
}


