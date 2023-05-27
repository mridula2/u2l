 #if !defined(MQC_INCLUDED)            /* File not yet included?      */
   #define MQC_INCLUDED                /* Show file now included      */
 /*********************************************************************/
 /*                                                                   */
 /*                  WebSphere MQ for UNIX                            */
 /*                                                                   */
 /*  FILE NAME:      CMQC                                             */
 /*                                                                   */
 /*  DESCRIPTION:    Declarations for Main MQI                        */
 /*                                                                   */
 /*********************************************************************/
 /*  @START_COPYRIGHT@                                                */
 /*  Licensed Materials - Property of IBM                             */
 /*                                                                   */
 /*  5724-B41                                                         */
 /*                                                                   */
 /*  (C) Copyright IBM Corporation 1993, 2002.                        */
 /*                                                                   */
 /*  Status: Version 5 Release 3                                      */
 /*  @END_COPYRIGHT@                                                  */
 /*********************************************************************/
 /*                                                                   */
 /*  FUNCTION:       This file declares the functions, structures,    */
 /*                  and named constants for the main MQI.            */
 /*                                                                   */
 /*  PROCESSOR:      C                                                */
 /*                                                                   */
 /*********************************************************************/

 #if defined(__cplusplus)
   extern "C" {
 #endif

#if defined(_LP64) || defined(__sparcv9)
  #define MQ_64_BIT
 #endif

 /*********************************************************************/
 /*  Values Related to MQAIR Structure                                */
 /*********************************************************************/

 /* Structure Identifier */
 #define MQAIR_STRUC_ID "AIR "

 /* Structure Identifier (array form) */
 #define MQAIR_STRUC_ID_ARRAY 'A','I','R',' '

 /* Structure Version Number */
 #define MQAIR_VERSION_1       1
 #define MQAIR_CURRENT_VERSION 1

 /* Authentication Information Type */
 #define MQAIT_CRL_LDAP     1


 /*********************************************************************/
 /*  Values Related to MQBO Structure                                 */
 /*********************************************************************/

 /* Structure Identifier */
 #define MQBO_STRUC_ID "BO  "

 /* Structure Identifier (array form) */
 #define MQBO_STRUC_ID_ARRAY 'B','O',' ',' '

 /* Structure Version Number */
 #define MQBO_VERSION_1       1
 #define MQBO_CURRENT_VERSION 1

 /* Begin Options */
 #define MQBO_NONE 0x00000000


 /*********************************************************************/
 /*  Values Related to MQCIH Structure                                */
 /*********************************************************************/

 /* Structure Identifier */
 #define MQCIH_STRUC_ID "CIH "

 /* Structure Identifier (array form) */
 #define MQCIH_STRUC_ID_ARRAY 'C','I','H',' '

 /* Structure Version Number */
 #define MQCIH_VERSION_1       1
 #define MQCIH_VERSION_2       2
 #define MQCIH_CURRENT_VERSION 2

 /* Structure Length */
 #define MQCIH_LENGTH_1       164
 #define MQCIH_LENGTH_2       180
 #define MQCIH_CURRENT_LENGTH 180

 /* Flags */
 #define MQCIH_NONE                 0x00000000
 #define MQCIH_PASS_EXPIRATION      0x00000001
 #define MQCIH_UNLIMITED_EXPIRATION 0x00000000
 #define MQCIH_REPLY_WITHOUT_NULLS  0x00000002
 #define MQCIH_REPLY_WITH_NULLS     0x00000000
 #define MQCIH_SYNC_ON_RETURN       0x00000004
 #define MQCIH_NO_SYNC_ON_RETURN    0x00000000

 /* Return Code */
 #define MQCRC_OK                    0
 #define MQCRC_CICS_EXEC_ERROR       1
 #define MQCRC_MQ_API_ERROR          2
 #define MQCRC_BRIDGE_ERROR          3
 #define MQCRC_BRIDGE_ABEND          4
 #define MQCRC_APPLICATION_ABEND     5
 #define MQCRC_SECURITY_ERROR        6
 #define MQCRC_PROGRAM_NOT_AVAILABLE 7
 #define MQCRC_BRIDGE_TIMEOUT        8
 #define MQCRC_TRANSID_NOT_AVAILABLE 9

 /* Unit of Work Control */
 #define MQCUOWC_ONLY     0x00000111
 #define MQCUOWC_CONTINUE 0x00010000
 #define MQCUOWC_FIRST    0x00000011
 #define MQCUOWC_MIDDLE   0x00000010
 #define MQCUOWC_LAST     0x00000110
 #define MQCUOWC_COMMIT   0x00000100
 #define MQCUOWC_BACKOUT  0x00001100

 /* Get Wait Interval */
 #define MQCGWI_DEFAULT (-2)

 /* Link Type */
 #define MQCLT_PROGRAM     1
 #define MQCLT_TRANSACTION 2

 /* Output Data Length */
 #define MQCODL_AS_INPUT (-1)

 /* ADS Descriptor */
 #define MQCADSD_NONE      0x00000000
 #define MQCADSD_SEND      0x00000001
 #define MQCADSD_RECV      0x00000010
 #define MQCADSD_MSGFORMAT 0x00000100

 /* Conversational Task */
 #define MQCCT_YES 0x00000001
 #define MQCCT_NO  0x00000000

 /* Task End Status */
 #define MQCTES_NOSYNC  0x00000000
 #define MQCTES_COMMIT  0x00000100
 #define MQCTES_BACKOUT 0x00001100
 #define MQCTES_ENDTASK 0x00010000

 /* Facility */
 #define MQCFAC_NONE "\0\0\0\0\0\0\0\0"

 /* Facility (array form) */
 #define MQCFAC_NONE_ARRAY '\0','\0','\0','\0','\0','\0','\0','\0'

 /* Function */
 #define MQCFUNC_MQCONN "CONN"
 #define MQCFUNC_MQGET  "GET "
 #define MQCFUNC_MQINQ  "INQ "
 #define MQCFUNC_MQOPEN "OPEN"
 #define MQCFUNC_MQPUT  "PUT "
 #define MQCFUNC_MQPUT1 "PUT1"
 #define MQCFUNC_NONE   "    "

 /* Function (array form) */
 #define MQCFUNC_MQCONN_ARRAY 'C','O','N','N'
 #define MQCFUNC_MQGET_ARRAY  'G','E','T',' '
 #define MQCFUNC_MQINQ_ARRAY  'I','N','Q',' '
 #define MQCFUNC_MQOPEN_ARRAY 'O','P','E','N'
 #define MQCFUNC_MQPUT_ARRAY  'P','U','T',' '
 #define MQCFUNC_MQPUT1_ARRAY 'P','U','T','1'
 #define MQCFUNC_NONE_ARRAY   ' ',' ',' ',' '

 /* Start Code */
 #define MQCSC_START     "S   "
 #define MQCSC_STARTDATA "SD  "
 #define MQCSC_TERMINPUT "TD  "
 #define MQCSC_NONE      "    "

 /* Start Code (array form) */
 #define MQCSC_START_ARRAY     'S',' ',' ',' '
 #define MQCSC_STARTDATA_ARRAY 'S','D',' ',' '
 #define MQCSC_TERMINPUT_ARRAY 'T','D',' ',' '
 #define MQCSC_NONE_ARRAY      ' ',' ',' ',' '


 /*********************************************************************/
 /*  Values Related to MQCNO Structure                                */
 /*********************************************************************/

 /* Structure Identifier */
 #define MQCNO_STRUC_ID "CNO "

 /* Structure Identifier (array form) */
 #define MQCNO_STRUC_ID_ARRAY 'C','N','O',' '

 /* Structure Version Number */
 #define MQCNO_VERSION_1       1
 #define MQCNO_VERSION_2       2
 #define MQCNO_VERSION_3       3
 #define MQCNO_VERSION_4       4
 #define MQCNO_CURRENT_VERSION 4

 /* Connect Options */
 #define MQCNO_STANDARD_BINDING       0x00000000
 #define MQCNO_FASTPATH_BINDING       0x00000001
 #define MQCNO_HANDLE_SHARE_NONE      0x00000020
 #define MQCNO_HANDLE_SHARE_BLOCK     0x00000040
 #define MQCNO_HANDLE_SHARE_NO_BLOCK  0x00000080
 #define MQCNO_NONE                   0x00000000

 /* Queue-Manager Connection Tag */
 #define MQCT_NONE "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0"\
                   "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0"\
                   "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0"\
                   "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0"\
                   "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0"\
                   "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0"\
                   "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0"\
                   "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0"

 /* Queue-Manager Connection Tag (array form) */
 #define MQCT_NONE_ARRAY '\0','\0','\0','\0','\0','\0','\0','\0',\
                         '\0','\0','\0','\0','\0','\0','\0','\0',\
                         '\0','\0','\0','\0','\0','\0','\0','\0',\
                         '\0','\0','\0','\0','\0','\0','\0','\0',\
                         '\0','\0','\0','\0','\0','\0','\0','\0',\
                         '\0','\0','\0','\0','\0','\0','\0','\0',\
                         '\0','\0','\0','\0','\0','\0','\0','\0',\
                         '\0','\0','\0','\0','\0','\0','\0','\0',\
                         '\0','\0','\0','\0','\0','\0','\0','\0',\
                         '\0','\0','\0','\0','\0','\0','\0','\0',\
                         '\0','\0','\0','\0','\0','\0','\0','\0',\
                         '\0','\0','\0','\0','\0','\0','\0','\0',\
                         '\0','\0','\0','\0','\0','\0','\0','\0',\
                         '\0','\0','\0','\0','\0','\0','\0','\0',\
                         '\0','\0','\0','\0','\0','\0','\0','\0',\
                         '\0','\0','\0','\0','\0','\0','\0','\0'


 /*********************************************************************/
 /*  Values Related to MQDH Structure                                 */
 /*********************************************************************/

 /* Structure Identifier */
 #define MQDH_STRUC_ID "DH  "

 /* Structure Identifier (array form) */
 #define MQDH_STRUC_ID_ARRAY 'D','H',' ',' '

 /* Structure Version Number */
 #define MQDH_VERSION_1       1
 #define MQDH_CURRENT_VERSION 1

 /* General Flags */
 #define MQDHF_NEW_MSG_IDS 0x00000001
 #define MQDHF_NONE        0x00000000

 /* Put Message Record Flags */
 /* See values for "Put Message Record Fields" under MQPMO */


 /*********************************************************************/
 /*  Values Related to MQDLH Structure                                */
 /*********************************************************************/

 /* Structure Identifier */
 #define MQDLH_STRUC_ID "DLH "

 /* Structure Identifier (array form) */
 #define MQDLH_STRUC_ID_ARRAY 'D','L','H',' '

 /* Structure Version Number */
 #define MQDLH_VERSION_1       1
 #define MQDLH_CURRENT_VERSION 1


 /*********************************************************************/
 /*  Values Related to MQGMO Structure                                */
 /*********************************************************************/

 /* Structure Identifier */
 #define MQGMO_STRUC_ID "GMO "

 /* Structure Identifier (array form) */
 #define MQGMO_STRUC_ID_ARRAY 'G','M','O',' '

 /* Structure Version Number */
 #define MQGMO_VERSION_1       1
 #define MQGMO_VERSION_2       2
 #define MQGMO_VERSION_3       3
 #define MQGMO_CURRENT_VERSION 3

 /* Get-Message Options */
 #define MQGMO_WAIT                    0x00000001
 #define MQGMO_NO_WAIT                 0x00000000
 #define MQGMO_SET_SIGNAL              0x00000008
 #define MQGMO_FAIL_IF_QUIESCING       0x00002000
 #define MQGMO_SYNCPOINT               0x00000002
 #define MQGMO_SYNCPOINT_IF_PERSISTENT 0x00001000
 #define MQGMO_NO_SYNCPOINT            0x00000004
 #define MQGMO_MARK_SKIP_BACKOUT       0x00000080
 #define MQGMO_BROWSE_FIRST            0x00000010
 #define MQGMO_BROWSE_NEXT             0x00000020
 #define MQGMO_BROWSE_MSG_UNDER_CURSOR 0x00000800
 #define MQGMO_MSG_UNDER_CURSOR        0x00000100
 #define MQGMO_LOCK                    0x00000200
 #define MQGMO_UNLOCK                  0x00000400
 #define MQGMO_ACCEPT_TRUNCATED_MSG    0x00000040
 #define MQGMO_CONVERT                 0x00004000
 #define MQGMO_LOGICAL_ORDER           0x00008000
 #define MQGMO_COMPLETE_MSG            0x00010000
 #define MQGMO_ALL_MSGS_AVAILABLE      0x00020000
 #define MQGMO_ALL_SEGMENTS_AVAILABLE  0x00040000
 #define MQGMO_NONE                    0x00000000

 /* Wait Interval */
 #define MQWI_UNLIMITED (-1)

 /* Signal Values */
 #define MQEC_MSG_ARRIVED           2
 #define MQEC_WAIT_INTERVAL_EXPIRED 3
 #define MQEC_WAIT_CANCELED         4
 #define MQEC_Q_MGR_QUIESCING       5
 #define MQEC_CONNECTION_QUIESCING  6

 /* Match Options */
 #define MQMO_MATCH_MSG_ID         0x00000001
 #define MQMO_MATCH_CORREL_ID      0x00000002
 #define MQMO_MATCH_GROUP_ID       0x00000004
 #define MQMO_MATCH_MSG_SEQ_NUMBER 0x00000008
 #define MQMO_MATCH_OFFSET         0x00000010
 #define MQMO_MATCH_MSG_TOKEN      0x00000020
 #define MQMO_NONE                 0x00000000

 /* Group Status */
 #define MQGS_NOT_IN_GROUP      ' '
 #define MQGS_MSG_IN_GROUP      'G'
 #define MQGS_LAST_MSG_IN_GROUP 'L'

 /* Segment Status */
 #define MQSS_NOT_A_SEGMENT ' '
 #define MQSS_SEGMENT       'S'
 #define MQSS_LAST_SEGMENT  'L'

 /* Segmentation */
 #define MQSEG_INHIBITED ' '
 #define MQSEG_ALLOWED   'A'

 /* Message Token */
 #define MQMTOK_NONE "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0"

 /* Message Token (array form) */
 #define MQMTOK_NONE_ARRAY '\0','\0','\0','\0','\0','\0','\0','\0',\
                           '\0','\0','\0','\0','\0','\0','\0','\0'

 /* Returned Length */
 #define MQRL_UNDEFINED (-1)


 /*********************************************************************/
 /*  Values Related to MQIIH Structure                                */
 /*********************************************************************/

 /* Structure Identifier */
 #define MQIIH_STRUC_ID "IIH "

 /* Structure Identifier (array form) */
 #define MQIIH_STRUC_ID_ARRAY 'I','I','H',' '

 /* Structure Version Number */
 #define MQIIH_VERSION_1       1
 #define MQIIH_CURRENT_VERSION 1

 /* Structure Length */
 #define MQIIH_LENGTH_1 84

 /* Flags */
 #define MQIIH_NONE                 0x00000000
 #define MQIIH_PASS_EXPIRATION      0x00000001
 #define MQIIH_UNLIMITED_EXPIRATION 0x00000000
 #define MQIIH_REPLY_FORMAT_NONE    0x00000008

 /* Authenticator */
 #define MQIAUT_NONE "        "

 /* Authenticator (array form) */
 #define MQIAUT_NONE_ARRAY ' ',' ',' ',' ',' ',' ',' ',' '

 /* Transaction Instance Identifier */
 #define MQITII_NONE "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0"

 /* Transaction Instance Identifier (array form) */
 #define MQITII_NONE_ARRAY '\0','\0','\0','\0','\0','\0','\0','\0',\
                           '\0','\0','\0','\0','\0','\0','\0','\0'

 /* Transaction State */
 #define MQITS_IN_CONVERSATION     'C'
 #define MQITS_NOT_IN_CONVERSATION ' '
 #define MQITS_ARCHITECTED         'A'

 /* Commit Mode */
 #define MQICM_COMMIT_THEN_SEND '0'
 #define MQICM_SEND_THEN_COMMIT '1'

 /* Security Scope */
 #define MQISS_CHECK 'C'
 #define MQISS_FULL  'F'


 /*********************************************************************/
 /*  Values Related to MQMD Structure                                 */
 /*********************************************************************/

 /* Structure Identifier */
 #define MQMD_STRUC_ID "MD  "

 /* Structure Identifier (array form) */
 #define MQMD_STRUC_ID_ARRAY 'M','D',' ',' '

 /* Structure Version Number */
 #define MQMD_VERSION_1       1
 #define MQMD_VERSION_2       2
 #define MQMD_CURRENT_VERSION 2

 /* Report Options */
 #define MQRO_EXCEPTION                 0x01000000
 #define MQRO_EXCEPTION_WITH_DATA       0x03000000
 #define MQRO_EXCEPTION_WITH_FULL_DATA  0x07000000
 #define MQRO_EXPIRATION                0x00200000
 #define MQRO_EXPIRATION_WITH_DATA      0x00600000
 #define MQRO_EXPIRATION_WITH_FULL_DATA 0x00e00000
 #define MQRO_COA                       0x00000100
 #define MQRO_COA_WITH_DATA             0x00000300
 #define MQRO_COA_WITH_FULL_DATA        0x00000700
 #define MQRO_COD                       0x00000800
 #define MQRO_COD_WITH_DATA             0x00001800
 #define MQRO_COD_WITH_FULL_DATA        0x00003800
 #define MQRO_PAN                       0x00000001
 #define MQRO_NAN                       0x00000002
 #define MQRO_NEW_MSG_ID                0x00000000
 #define MQRO_PASS_MSG_ID               0x00000080
 #define MQRO_COPY_MSG_ID_TO_CORREL_ID  0x00000000
 #define MQRO_PASS_CORREL_ID            0x00000040
 #define MQRO_DEAD_LETTER_Q             0x00000000
 #define MQRO_DISCARD_MSG               0x08000000
 #define MQRO_NONE                      0x00000000

 /* Report Options Masks */
 #define MQRO_REJECT_UNSUP_MASK         0x101c0000
 #define MQRO_ACCEPT_UNSUP_MASK         0xefe000ff
 #define MQRO_ACCEPT_UNSUP_IF_XMIT_MASK 0x0003ff00

 /* Message Types */
 #define MQMT_SYSTEM_FIRST        1
 #define MQMT_REQUEST             1
 #define MQMT_REPLY               2
 #define MQMT_DATAGRAM            8
 #define MQMT_REPORT              4
 #define MQMT_MQE_FIELDS_FROM_MQE 112
 #define MQMT_MQE_FIELDS          113
 #define MQMT_SYSTEM_LAST         65535
 #define MQMT_APPL_FIRST          65536
 #define MQMT_APPL_LAST           999999999

 /* Expiry */
 #define MQEI_UNLIMITED (-1)

 /* Feedback Values */
 #define MQFB_NONE                   0
 #define MQFB_SYSTEM_FIRST           1
 #define MQFB_QUIT                   256
 #define MQFB_EXPIRATION             258
 #define MQFB_COA                    259
 #define MQFB_COD                    260
 #define MQFB_CHANNEL_COMPLETED      262
 #define MQFB_CHANNEL_FAIL_RETRY     263
 #define MQFB_CHANNEL_FAIL           264
 #define MQFB_APPL_CANNOT_BE_STARTED 265
 #define MQFB_TM_ERROR               266
 #define MQFB_APPL_TYPE_ERROR        267
 #define MQFB_STOPPED_BY_MSG_EXIT    268
 #define MQFB_XMIT_Q_MSG_ERROR       271
 #define MQFB_PAN                    275
 #define MQFB_NAN                    276
 #define MQFB_STOPPED_BY_CHAD_EXIT   277
 #define MQFB_STOPPED_BY_PUBSUB_EXIT 279
 #define MQFB_NOT_A_REPOSITORY_MSG   280
 #define MQFB_BIND_OPEN_CLUSRCVR_DEL 281
 #define MQFB_DATA_LENGTH_ZERO       291
 #define MQFB_DATA_LENGTH_NEGATIVE   292
 #define MQFB_DATA_LENGTH_TOO_BIG    293
 #define MQFB_BUFFER_OVERFLOW        294
 #define MQFB_LENGTH_OFF_BY_ONE      295
 #define MQFB_IIH_ERROR              296
 #define MQFB_NOT_AUTHORIZED_FOR_IMS 298
 #define MQFB_IMS_ERROR              300
 #define MQFB_IMS_FIRST              301
 #define MQFB_IMS_LAST               399
 #define MQFB_CICS_INTERNAL_ERROR    401
 #define MQFB_CICS_NOT_AUTHORIZED    402
 #define MQFB_CICS_BRIDGE_FAILURE    403
 #define MQFB_CICS_CORREL_ID_ERROR   404
 #define MQFB_CICS_CCSID_ERROR       405
 #define MQFB_CICS_ENCODING_ERROR    406
 #define MQFB_CICS_CIH_ERROR         407
 #define MQFB_CICS_UOW_ERROR         408
 #define MQFB_CICS_COMMAREA_ERROR    409
 #define MQFB_CICS_APPL_NOT_STARTED  410
 #define MQFB_CICS_APPL_ABENDED      411
 #define MQFB_CICS_DLQ_ERROR         412
 #define MQFB_CICS_UOW_BACKED_OUT    413
 #define MQFB_SYSTEM_LAST            65535
 #define MQFB_APPL_FIRST             65536
 #define MQFB_APPL_LAST              999999999

 /* Encoding */
 #define MQENC_NATIVE 0x00000111

 /* Encoding Masks */
 #define MQENC_INTEGER_MASK  0x0000000f
 #define MQENC_DECIMAL_MASK  0x000000f0
 #define MQENC_FLOAT_MASK    0x00000f00
 #define MQENC_RESERVED_MASK 0xfffff000

 /* Encodings for Binary Integers */
 #define MQENC_INTEGER_UNDEFINED 0x00000000
 #define MQENC_INTEGER_NORMAL    0x00000001
 #define MQENC_INTEGER_REVERSED  0x00000002

 /* Encodings for Packed-Decimal Integers */
 #define MQENC_DECIMAL_UNDEFINED 0x00000000
 #define MQENC_DECIMAL_NORMAL    0x00000010
 #define MQENC_DECIMAL_REVERSED  0x00000020

 /* Encodings for Floating-Point Numbers */
 #define MQENC_FLOAT_UNDEFINED     0x00000000
 #define MQENC_FLOAT_IEEE_NORMAL   0x00000100
 #define MQENC_FLOAT_IEEE_REVERSED 0x00000200
 #define MQENC_FLOAT_S390          0x00000300

 /* Coded Character-Set Identifiers */
 #define MQCCSI_UNDEFINED  0
 #define MQCCSI_DEFAULT    0
 #define MQCCSI_Q_MGR      0
 #define MQCCSI_INHERIT   (-2)
 #define MQCCSI_EMBEDDED  (-1)

 /* Formats */
 #define MQFMT_NONE               "        "
 #define MQFMT_ADMIN              "MQADMIN "
 #define MQFMT_CHANNEL_COMPLETED  "MQCHCOM "
 #define MQFMT_CICS               "MQCICS  "
 #define MQFMT_COMMAND_1          "MQCMD1  "
 #define MQFMT_COMMAND_2          "MQCMD2  "
 #define MQFMT_DEAD_LETTER_HEADER "MQDEAD  "
 #define MQFMT_DIST_HEADER        "MQHDIST "
 #define MQFMT_EVENT              "MQEVENT "
 #define MQFMT_IMS                "MQIMS   "
 #define MQFMT_IMS_VAR_STRING     "MQIMSVS "
 #define MQFMT_MD_EXTENSION       "MQHMDE  "
 #define MQFMT_PCF                "MQPCF   "
 #define MQFMT_REF_MSG_HEADER     "MQHREF  "
 #define MQFMT_RF_HEADER          "MQHRF   "
 #define MQFMT_RF_HEADER_2        "MQHRF2  "
 #define MQFMT_STRING             "MQSTR   "
 #define MQFMT_TRIGGER            "MQTRIG  "
 #define MQFMT_WORK_INFO_HEADER   "MQHWIH  "
 #define MQFMT_XMIT_Q_HEADER      "MQXMIT  "

 /* Formats (array form) */
 #define MQFMT_NONE_ARRAY               ' ',' ',' ',' ',' ',' ',' ',' '
 #define MQFMT_ADMIN_ARRAY              'M','Q','A','D','M','I','N',' '
 #define MQFMT_CHANNEL_COMPLETED_ARRAY  'M','Q','C','H','C','O','M',' '
 #define MQFMT_CICS_ARRAY               'M','Q','C','I','C','S',' ',' '
 #define MQFMT_COMMAND_1_ARRAY          'M','Q','C','M','D','1',' ',' '
 #define MQFMT_COMMAND_2_ARRAY          'M','Q','C','M','D','2',' ',' '
 #define MQFMT_DEAD_LETTER_HEADER_ARRAY 'M','Q','D','E','A','D',' ',' '
 #define MQFMT_DIST_HEADER_ARRAY        'M','Q','H','D','I','S','T',' '
 #define MQFMT_EVENT_ARRAY              'M','Q','E','V','E','N','T',' '
 #define MQFMT_IMS_ARRAY                'M','Q','I','M','S',' ',' ',' '
 #define MQFMT_IMS_VAR_STRING_ARRAY     'M','Q','I','M','S','V','S',' '
 #define MQFMT_MD_EXTENSION_ARRAY       'M','Q','H','M','D','E',' ',' '
 #define MQFMT_PCF_ARRAY                'M','Q','P','C','F',' ',' ',' '
 #define MQFMT_REF_MSG_HEADER_ARRAY     'M','Q','H','R','E','F',' ',' '
 #define MQFMT_RF_HEADER_ARRAY          'M','Q','H','R','F',' ',' ',' '
 #define MQFMT_RF_HEADER_2_ARRAY        'M','Q','H','R','F','2',' ',' '
 #define MQFMT_STRING_ARRAY             'M','Q','S','T','R',' ',' ',' '
 #define MQFMT_TRIGGER_ARRAY            'M','Q','T','R','I','G',' ',' '
 #define MQFMT_WORK_INFO_HEADER_ARRAY   'M','Q','H','W','I','H',' ',' '
 #define MQFMT_XMIT_Q_HEADER_ARRAY      'M','Q','X','M','I','T',' ',' '

 /* Priority */
 #define MQPRI_PRIORITY_AS_Q_DEF (-1)

 /* Persistence Values */
 #define MQPER_NOT_PERSISTENT       0
 #define MQPER_PERSISTENT           1
 #define MQPER_PERSISTENCE_AS_Q_DEF 2

 /* Message Identifier */
 #define MQMI_NONE "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0"

 /* Message Identifier (array form) */
 #define MQMI_NONE_ARRAY '\0','\0','\0','\0','\0','\0','\0','\0',\
                         '\0','\0','\0','\0','\0','\0','\0','\0',\
                         '\0','\0','\0','\0','\0','\0','\0','\0'

 /* Correlation Identifier */
 #define MQCI_NONE        "\0\0\0\0\0\0\0\0\0\0\0\0"\
                          "\0\0\0\0\0\0\0\0\0\0\0\0"
 #define MQCI_NEW_SESSION "\x41\x4d\x51\x21\x4e\x45\x57\x5f"\
                          "\x53\x45\x53\x53\x49\x4f\x4e\x5f"\
                          "\x43\x4f\x52\x52\x45\x4c\x49\x44"

 /* Correlation Identifier (array form) */
 #define MQCI_NONE_ARRAY        '\0','\0','\0','\0','\0','\0',\
                                '\0','\0','\0','\0','\0','\0',\
                                '\0','\0','\0','\0','\0','\0',\
                                '\0','\0','\0','\0','\0','\0'
 #define MQCI_NEW_SESSION_ARRAY '\x41','\x4d','\x51','\x21',\
                                '\x4e','\x45','\x57','\x5f',\
                                '\x53','\x45','\x53','\x53',\
                                '\x49','\x4f','\x4e','\x5f',\
                                '\x43','\x4f','\x52','\x52',\
                                '\x45','\x4c','\x49','\x44'

 /* Accounting Token */
 #define MQACT_NONE "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0"\
                    "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0"

 /* Accounting Token (array form) */
 #define MQACT_NONE_ARRAY '\0','\0','\0','\0','\0','\0','\0','\0',\
                          '\0','\0','\0','\0','\0','\0','\0','\0',\
                          '\0','\0','\0','\0','\0','\0','\0','\0',\
                          '\0','\0','\0','\0','\0','\0','\0','\0'

 /* Accounting Token Type */
 #define MQACTT_UNKNOWN             '\x00'
 #define MQACTT_CICS_LUOW_ID        '\x01'
 #define MQACTT_OS2_DEFAULT         '\x04'
 #define MQACTT_DOS_DEFAULT         '\x05'
 #define MQACTT_UNIX_NUMERIC_ID     '\x06'
 #define MQACTT_OS400_ACCOUNT_TOKEN '\x08'
 #define MQACTT_WINDOWS_DEFAULT     '\x09'
 #define MQACTT_NT_SECURITY_ID      '\x0b'
 #define MQACTT_USER                '\x19'

 /* Put Application Type */
 #define MQAT_UNKNOWN     (-1)
 #define MQAT_NO_CONTEXT  0
 #define MQAT_CICS        1
 #define MQAT_MVS         2
 #define MQAT_OS390       2
 #define MQAT_ZOS               2
 #define MQAT_IMS         3
 #define MQAT_OS2         4
 #define MQAT_DOS         5
 #define MQAT_AIX         6
 #define MQAT_UNIX        6
 #define MQAT_QMGR        7
 #define MQAT_OS400       8
 #define MQAT_WINDOWS     9
 #define MQAT_CICS_VSE    10
 #define MQAT_WINDOWS_NT  11
 #define MQAT_VMS         12
 #define MQAT_GUARDIAN    13
 #define MQAT_NSK         13
 #define MQAT_VOS         14
 #define MQAT_IMS_BRIDGE  19
 #define MQAT_XCF         20
 #define MQAT_CICS_BRIDGE 21
 #define MQAT_NOTES_AGENT 22
 #define MQAT_USER        25
 #define MQAT_BROKER      26
 #define MQAT_JAVA        28
 #define MQAT_DQM         29
 #define MQAT_CHANNEL_INITIATOR 30
 #define MQAT_DEFAULT     6
 #define MQAT_USER_FIRST  65536
 #define MQAT_USER_LAST   999999999

 /* Group Identifier */
 #define MQGI_NONE "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0"

 /* Group Identifier (array form) */
 #define MQGI_NONE_ARRAY '\0','\0','\0','\0','\0','\0','\0','\0',\
                         '\0','\0','\0','\0','\0','\0','\0','\0',\
                         '\0','\0','\0','\0','\0','\0','\0','\0'

 /* Message Flags */
 #define MQMF_SEGMENTATION_INHIBITED 0x00000000
 #define MQMF_SEGMENTATION_ALLOWED   0x00000001
 #define MQMF_MSG_IN_GROUP           0x00000008
 #define MQMF_LAST_MSG_IN_GROUP      0x00000010
 #define MQMF_SEGMENT                0x00000002
 #define MQMF_LAST_SEGMENT           0x00000004
 #define MQMF_NONE                   0x00000000

 /* Message Flags Masks */
 #define MQMF_REJECT_UNSUP_MASK         0x00000fff
 #define MQMF_ACCEPT_UNSUP_MASK         0xfff00000
 #define MQMF_ACCEPT_UNSUP_IF_XMIT_MASK 0x000ff000

 /* Original Length */
 #define MQOL_UNDEFINED (-1)


 /*********************************************************************/
 /*  Values Related to MQMDE Structure                                */
 /*********************************************************************/

 /* Structure Identifier */
 #define MQMDE_STRUC_ID "MDE "

 /* Structure Identifier (array form) */
 #define MQMDE_STRUC_ID_ARRAY 'M','D','E',' '

 /* Structure Version Number */
 #define MQMDE_VERSION_2       2
 #define MQMDE_CURRENT_VERSION 2

 /* Structure Length */
 #define MQMDE_LENGTH_2 72

 /* General Flags */
 #define MQMDEF_NONE 0x00000000


 /*********************************************************************/
 /*  Values Related to MQOD Structure                                 */
 /*********************************************************************/

 /* Structure Identifier */
 #define MQOD_STRUC_ID "OD  "

 /* Structure Identifier (array form) */
 #define MQOD_STRUC_ID_ARRAY 'O','D',' ',' '

 /* Structure Version Number */
 #define MQOD_VERSION_1       1
 #define MQOD_VERSION_2       2
 #define MQOD_VERSION_3       3
 #define MQOD_CURRENT_VERSION 3

 /* Structure Length */
#if defined(MQ_64_BIT)
 #define MQOD_CURRENT_LENGTH 344
#else
 #define MQOD_CURRENT_LENGTH 336
#endif

 /* Object Types */
 #define MQOT_Q          1
 #define MQOT_NAMELIST   2
 #define MQOT_PROCESS    3
 #define MQOT_STORAGE_CLASS 4
 #define MQOT_Q_MGR      5
 #define MQOT_CHANNEL    6
 #define MQOT_AUTH_INFO  7
 #define MQOT_CF_STRUC   10
 #define MQOT_RESERVED_1 999

 /* Extended Object Types */
 #define MQOT_ALL               1001
 #define MQOT_ALIAS_Q           1002
 #define MQOT_MODEL_Q           1003
 #define MQOT_LOCAL_Q           1004
 #define MQOT_REMOTE_Q          1005
 #define MQOT_SENDER_CHANNEL    1007
 #define MQOT_SERVER_CHANNEL    1008
 #define MQOT_REQUESTER_CHANNEL 1009
 #define MQOT_RECEIVER_CHANNEL  1010
 #define MQOT_CURRENT_CHANNEL   1011
 #define MQOT_SAVED_CHANNEL     1012
 #define MQOT_SVRCONN_CHANNEL   1013
 #define MQOT_CLNTCONN_CHANNEL  1014

 /* Security Identifier */
 #define MQSID_NONE "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0"\
                    "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0"

 /* Security Identifier (array form) */
 #define MQSID_NONE_ARRAY '\0','\0','\0','\0','\0','\0','\0','\0',\
                          '\0','\0','\0','\0','\0','\0','\0','\0',\
                          '\0','\0','\0','\0','\0','\0','\0','\0',\
                          '\0','\0','\0','\0','\0','\0','\0','\0',\
                          '\0','\0','\0','\0','\0','\0','\0','\0'

 /* Security Identifier Type */
 #define MQSIDT_NONE            '\x00'
 #define MQSIDT_NT_SECURITY_ID  '\x01'
 #define MQSIDT_WAS_SECURITY_ID '\x02'



 /*********************************************************************/
 /*  Values Related to MQPMO Structure                                */
 /*********************************************************************/

 /* Structure Identifier */
 #define MQPMO_STRUC_ID "PMO "

 /* Structure Identifier (array form) */
 #define MQPMO_STRUC_ID_ARRAY 'P','M','O',' '

 /* Structure Version Number */
 #define MQPMO_VERSION_1       1
 #define MQPMO_VERSION_2       2
 #define MQPMO_CURRENT_VERSION 2

 /* Structure Length */
#if defined(MQ_64_BIT)
 #define MQPMO_CURRENT_LENGTH 160
#else
 #define MQPMO_CURRENT_LENGTH 152
#endif

 /* Put-Message Options */
 #define MQPMO_SYNCPOINT                0x00000002
 #define MQPMO_NO_SYNCPOINT             0x00000004
 #define MQPMO_NEW_MSG_ID               0x00000040
 #define MQPMO_NEW_CORREL_ID            0x00000080
 #define MQPMO_LOGICAL_ORDER            0x00008000
 #define MQPMO_NO_CONTEXT               0x00004000
 #define MQPMO_DEFAULT_CONTEXT          0x00000020
 #define MQPMO_PASS_IDENTITY_CONTEXT    0x00000100
 #define MQPMO_PASS_ALL_CONTEXT         0x00000200
 #define MQPMO_SET_IDENTITY_CONTEXT     0x00000400
 #define MQPMO_SET_ALL_CONTEXT          0x00000800
 #define MQPMO_ALTERNATE_USER_AUTHORITY 0x00001000
 #define MQPMO_FAIL_IF_QUIESCING        0x00002000
 #define MQPMO_NONE                     0x00000000

 /* Put Message Record Fields */
 #define MQPMRF_MSG_ID           0x00000001
 #define MQPMRF_CORREL_ID        0x00000002
 #define MQPMRF_GROUP_ID         0x00000004
 #define MQPMRF_FEEDBACK         0x00000008
 #define MQPMRF_ACCOUNTING_TOKEN 0x00000010
 #define MQPMRF_NONE             0x00000000


 /*********************************************************************/
 /*  Values Related to MQRFH Structure                                */
 /*********************************************************************/

 /* Structure Identifier */
 #define MQRFH_STRUC_ID "RFH "

 /* Structure Identifier (array form) */
 #define MQRFH_STRUC_ID_ARRAY 'R','F','H',' '

 /* Structure Version Number */
 #define MQRFH_VERSION_1 1
 #define MQRFH_VERSION_2 2

 /* Structure Length */
 #define MQRFH_STRUC_LENGTH_FIXED   32
 #define MQRFH_STRUC_LENGTH_FIXED_2 36

 /* Flags */
 #define MQRFH_NONE 0x00000000

 /* Names for Name/Value String */
 #define MQNVS_APPL_TYPE "OPT_APP_GRP "
 #define MQNVS_MSG_TYPE  "OPT_MSG_TYPE "


 /*********************************************************************/
 /*  Values Related to MQRMH Structure                                */
 /*********************************************************************/

 /* Structure Identifier */
 #define MQRMH_STRUC_ID "RMH "

 /* Structure Identifier (array form) */
 #define MQRMH_STRUC_ID_ARRAY 'R','M','H',' '

 /* Structure Version Number */
 #define MQRMH_VERSION_1       1
 #define MQRMH_CURRENT_VERSION 1

 /* Flags */
 #define MQRMHF_LAST     0x00000001
 #define MQRMHF_NOT_LAST 0x00000000

 /* Object Instance Identifier */
 #define MQOII_NONE "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0"

 /* Object Instance Identifier (array form) */
 #define MQOII_NONE_ARRAY '\0','\0','\0','\0','\0','\0','\0','\0',\
                          '\0','\0','\0','\0','\0','\0','\0','\0',\
                          '\0','\0','\0','\0','\0','\0','\0','\0'


 /*********************************************************************/
 /*  Values Related to MQSCO Structure                                */
 /*********************************************************************/

 /* Structure Identifier */
 #define MQSCO_STRUC_ID "SCO "

 /* Structure Identifier (array form) */
 #define MQSCO_STRUC_ID_ARRAY 'S','C','O',' '

 /* Structure Version Number */
 #define MQSCO_VERSION_1       1
 #define MQSCO_CURRENT_VERSION 1


 /*********************************************************************/
 /*  Values Related to MQTM Structure                                 */
 /*********************************************************************/

 /* Structure Identifier */
 #define MQTM_STRUC_ID "TM  "

 /* Structure Identifier (array form) */
 #define MQTM_STRUC_ID_ARRAY 'T','M',' ',' '

 /* Structure Version Number */
 #define MQTM_VERSION_1       1
 #define MQTM_CURRENT_VERSION 1


 /*********************************************************************/
 /*  Values Related to MQTMC2 Structure                               */
 /*********************************************************************/

 /* Structure Identifier */
 #define MQTMC_STRUC_ID "TMC "

 /* Structure Identifier (array form) */
 #define MQTMC_STRUC_ID_ARRAY 'T','M','C',' '

 /* Structure Version Number */
 #define MQTMC_VERSION_1       "   1"
 #define MQTMC_VERSION_2       "   2"
 #define MQTMC_CURRENT_VERSION "   2"

 /* Structure Version Number (array form) */
 #define MQTMC_VERSION_1_ARRAY       ' ',' ',' ','1'
 #define MQTMC_VERSION_2_ARRAY       ' ',' ',' ','2'
 #define MQTMC_CURRENT_VERSION_ARRAY ' ',' ',' ','2'


 /*********************************************************************/
 /*  Values Related to MQWIH Structure                                */
 /*********************************************************************/

 /* Structure Identifier */
 #define MQWIH_STRUC_ID "WIH "

 /* Structure Identifier (array form) */
 #define MQWIH_STRUC_ID_ARRAY 'W','I','H',' '

 /* Structure Version Number */
 #define MQWIH_VERSION_1       1
 #define MQWIH_CURRENT_VERSION 1

 /* Structure Length */
 #define MQWIH_LENGTH_1       120
 #define MQWIH_CURRENT_LENGTH 120

 /* Flags */
 #define MQWIH_NONE 0x00000000


 /*********************************************************************/
 /*  Values Related to MQXQH Structure                                */
 /*********************************************************************/

 /* Structure Identifier */
 #define MQXQH_STRUC_ID "XQH "

 /* Structure Identifier (array form) */
 #define MQXQH_STRUC_ID_ARRAY 'X','Q','H',' '

 /* Structure Version Number */
 #define MQXQH_VERSION_1       1
 #define MQXQH_CURRENT_VERSION 1


 /*********************************************************************/
 /*  Values Related to MQCLOSE Function                               */
 /*********************************************************************/

 /* Object Handle */
 #define MQHO_UNUSABLE_HOBJ (-1)
 #define MQHO_NONE          0

 /* Close Options */
 #define MQCO_NONE         0x00000000
 #define MQCO_DELETE       0x00000001
 #define MQCO_DELETE_PURGE 0x00000002


 /*********************************************************************/
 /*  Values Related to MQINQ Function                                 */
 /*********************************************************************/

 /* Character-Attribute Selectors */
 #define MQCA_ALTERATION_DATE       2027
 #define MQCA_ALTERATION_TIME       2028
 #define MQCA_APPL_ID               2001
 #define MQCA_AUTH_INFO_CONN_NAME   2053
 #define MQCA_AUTH_INFO_DESC        2046
 #define MQCA_AUTH_INFO_NAME        2045
 #define MQCA_BACKOUT_REQ_Q_NAME    2019
 #define MQCA_BASE_Q_NAME           2002
 #define MQCA_CF_STRUC_DESC         2052
 #define MQCA_CF_STRUC_NAME         2039
 #define MQCA_CHANNEL_AUTO_DEF_EXIT 2026
 #define MQCA_CLUSTER_DATE          2037
 #define MQCA_CLUSTER_NAME          2029
 #define MQCA_CLUSTER_NAMELIST      2030
 #define MQCA_CLUSTER_Q_MGR_NAME    2031
 #define MQCA_CLUSTER_TIME          2038
 #define MQCA_CLUSTER_WORKLOAD_DATA 2034
 #define MQCA_CLUSTER_WORKLOAD_EXIT 2033
 #define MQCA_COMMAND_INPUT_Q_NAME  2003
 #define MQCA_CREATION_DATE         2004
 #define MQCA_CREATION_TIME         2005
 #define MQCA_DEAD_LETTER_Q_NAME    2006
 #define MQCA_DEF_XMIT_Q_NAME       2025
 #define MQCA_ENV_DATA              2007
 #define MQCA_FIRST                 2001
 #define MQCA_IGQ_USER_ID           2041
 #define MQCA_INITIATION_Q_NAME     2008
 #define MQCA_LAST                  4000
 #define MQCA_LAST_USED             2053
 #define MQCA_LDAP_PASSWORD         2048
 #define MQCA_LDAP_USER_NAME        2047
 #define MQCA_NAMELIST_DESC         2009
 #define MQCA_NAMELIST_NAME         2010
 #define MQCA_NAMES                 2020
 #define MQCA_PROCESS_DESC          2011
 #define MQCA_PROCESS_NAME          2012
 #define MQCA_Q_DESC                2013
 #define MQCA_Q_MGR_DESC            2014
 #define MQCA_Q_MGR_IDENTIFIER      2032
 #define MQCA_Q_MGR_NAME            2015
 #define MQCA_Q_NAME                2016
 #define MQCA_QSG_NAME              2040
 #define MQCA_REMOTE_Q_MGR_NAME     2017
 #define MQCA_REMOTE_Q_NAME         2018
 #define MQCA_REPOSITORY_NAME       2035
 #define MQCA_REPOSITORY_NAMELIST   2036
 #define MQCA_SSL_CRL_NAMELIST      2050
 #define MQCA_SSL_CRYPTO_HARDWARE   2051
 #define MQCA_SSL_KEY_REPOSITORY    2049
 #define MQCA_STORAGE_CLASS         2022
 #define MQCA_STORAGE_CLASS_DESC    2042
 #define MQCA_TRIGGER_DATA          2023
 #define MQCA_USER_DATA             2021
 #define MQCA_USER_LIST             4000
 #define MQCA_XCF_GROUP_NAME        2043
 #define MQCA_XCF_MEMBER_NAME       2044
 #define MQCA_XMIT_Q_NAME           2024

 /* Integer-Attribute Selectors */
 #define MQIA_APPL_TYPE                1
 #define MQIA_ARCHIVE                  60
 #define MQIA_AUTH_INFO_TYPE           66
 #define MQIA_AUTHORITY_EVENT          47
 #define MQIA_BACKOUT_THRESHOLD        22
 #define MQIA_CF_LEVEL                 70
 #define MQIA_CF_RECOVER               71
 #define MQIA_CHANNEL_AUTO_DEF         55
 #define MQIA_CHANNEL_AUTO_DEF_EVENT   56
 #define MQIA_CLUSTER_Q_TYPE           59
 #define MQIA_CLUSTER_WORKLOAD_LENGTH  58
 #define MQIA_CODED_CHAR_SET_ID        2
 #define MQIA_COMMAND_LEVEL            31
 #define MQIA_CONFIGURATION_EVENT      51
 #define MQIA_CURRENT_Q_DEPTH          3
 #define MQIA_DEF_BIND                 61
 #define MQIA_DEF_INPUT_OPEN_OPTION    4
 #define MQIA_DEF_PERSISTENCE          5
 #define MQIA_DEF_PRIORITY             6
 #define MQIA_DEFINITION_TYPE          7
 #define MQIA_DIST_LISTS               34
 #define MQIA_EXPIRY_INTERVAL          39
 #define MQIA_FIRST                    1
 #define MQIA_HARDEN_GET_BACKOUT       8
 #define MQIA_HIGH_Q_DEPTH             36
 #define MQIA_IGQ_PUT_AUTHORITY        65
 #define MQIA_INDEX_TYPE               57
 #define MQIA_INHIBIT_EVENT            48
 #define MQIA_INHIBIT_GET              9
 #define MQIA_INHIBIT_PUT              10
 #define MQIA_INTRA_GROUP_QUEUING      64
 #define MQIA_LAST                     2000
 #define MQIA_LAST_USED                78
 #define MQIA_LOCAL_EVENT              49
 #define MQIA_MAX_HANDLES              11
 #define MQIA_MAX_MSG_LENGTH           13
 #define MQIA_MAX_PRIORITY             14
 #define MQIA_MAX_Q_DEPTH              15
 #define MQIA_MAX_UNCOMMITTED_MSGS     33
 #define MQIA_MSG_DELIVERY_SEQUENCE    16
 #define MQIA_MSG_DEQ_COUNT            38
 #define MQIA_MSG_ENQ_COUNT            37
 #define MQIA_NAME_COUNT               19
 #define MQIA_NAMELIST_TYPE            72
 #define MQIA_NPM_CLASS                78
 #define MQIA_OPEN_INPUT_COUNT         17
 #define MQIA_OPEN_OUTPUT_COUNT        18
 #define MQIA_PAGESET_ID               62
 #define MQIA_PERFORMANCE_EVENT        53
 #define MQIA_PLATFORM                 32
 #define MQIA_Q_DEPTH_HIGH_EVENT       43
 #define MQIA_Q_DEPTH_HIGH_LIMIT       40
 #define MQIA_Q_DEPTH_LOW_EVENT        44
 #define MQIA_Q_DEPTH_LOW_LIMIT        41
 #define MQIA_Q_DEPTH_MAX_EVENT        42
 #define MQIA_Q_SERVICE_INTERVAL       54
 #define MQIA_Q_SERVICE_INTERVAL_EVENT 46
 #define MQIA_Q_TYPE                   20
 #define MQIA_QSG_DISP                 63
 #define MQIA_REMOTE_EVENT             50
 #define MQIA_RETENTION_INTERVAL       21
 #define MQIA_SCOPE                    45
 #define MQIA_SHAREABILITY             23
 #define MQIA_SSL_TASKS                69
 #define MQIA_START_STOP_EVENT         52
 #define MQIA_SYNCPOINT                30
 #define MQIA_TIME_SINCE_RESET         35
 #define MQIA_TRIGGER_CONTROL          24
 #define MQIA_TRIGGER_DEPTH            29
 #define MQIA_TRIGGER_INTERVAL         25
 #define MQIA_TRIGGER_MSG_PRIORITY     26
 #define MQIA_TRIGGER_TYPE             28
 #define MQIA_USAGE                    12
 #define MQIA_USER_LIST                2000

 /* Integer Attribute Value Denoting "Not Applicable" */
 #define MQIAV_NOT_APPLICABLE (-1)
 #define MQIAV_UNDEFINED      (-2)


 /*********************************************************************/
 /*  Values Related to MQOPEN Function                                */
 /*********************************************************************/

 /* Open Options */
 #define MQOO_INPUT_AS_Q_DEF           0x00000001
 #define MQOO_INPUT_SHARED             0x00000002
 #define MQOO_INPUT_EXCLUSIVE          0x00000004
 #define MQOO_BROWSE                   0x00000008
 #define MQOO_OUTPUT                   0x00000010
 #define MQOO_INQUIRE                  0x00000020
 #define MQOO_SET                      0x00000040
 #define MQOO_BIND_ON_OPEN             0x00004000
 #define MQOO_BIND_NOT_FIXED           0x00008000
 #define MQOO_BIND_AS_Q_DEF            0x00000000
 #define MQOO_SAVE_ALL_CONTEXT         0x00000080
 #define MQOO_PASS_IDENTITY_CONTEXT    0x00000100
 #define MQOO_PASS_ALL_CONTEXT         0x00000200
 #define MQOO_SET_IDENTITY_CONTEXT     0x00000400
 #define MQOO_SET_ALL_CONTEXT          0x00000800
 #define MQOO_ALTERNATE_USER_AUTHORITY 0x00001000
 #define MQOO_FAIL_IF_QUIESCING        0x00002000
 #define MQOO_RESOLVE_NAMES            0x00010000  /* C++ option only */


 /*********************************************************************/
 /*  Values Related to All Functions                                  */
 /*********************************************************************/

 /* Function Entry-Point and Pointer Attributes */
 #define MQENTRY
 #define MQPOINTER *

 /* Connection Handle */
 #define MQHC_DEF_HCONN      0
 #define MQHC_UNUSABLE_HCONN (-1)

 /* String Lengths */
 #define MQ_ABEND_CODE_LENGTH         4
 #define MQ_ACCOUNTING_TOKEN_LENGTH   32
 #define MQ_APPL_IDENTITY_DATA_LENGTH 32
 #define MQ_APPL_NAME_LENGTH          28
 #define MQ_APPL_ORIGIN_DATA_LENGTH   4
 #define MQ_APPL_TAG_LENGTH           28
 #define MQ_ATTENTION_ID_LENGTH       4
 #define MQ_AUTH_INFO_CONN_NAME_LENGTH 264
 #define MQ_AUTH_INFO_DESC_LENGTH     64
 #define MQ_AUTH_INFO_NAME_LENGTH     48
 #define MQ_AUTHENTICATOR_LENGTH      8
 #define MQ_BRIDGE_NAME_LENGTH        24
 #define MQ_CANCEL_CODE_LENGTH        4
 #define MQ_CF_STRUC_DESC_LENGTH      64
 #define MQ_CF_STRUC_NAME_LENGTH      12
 #define MQ_CHANNEL_DATE_LENGTH       12
 #define MQ_CHANNEL_DESC_LENGTH       64
 #define MQ_CHANNEL_NAME_LENGTH       20
 #define MQ_CHANNEL_TIME_LENGTH       8
 #define MQ_CLUSTER_NAME_LENGTH       48
 #define MQ_CONN_NAME_LENGTH          264
 #define MQ_CONN_TAG_LENGTH           128
 #define MQ_CORREL_ID_LENGTH          24
 #define MQ_CREATION_DATE_LENGTH      12
 #define MQ_CREATION_TIME_LENGTH      8
 #define MQ_DATE_LENGTH               12
 #define MQ_DISTINGUISHED_NAME_LENGTH 1024
 #define MQ_EXIT_DATA_LENGTH          32
 #define MQ_EXIT_NAME_LENGTH          128
 #define MQ_EXIT_PD_AREA_LENGTH         48
 #define MQ_EXIT_USER_AREA_LENGTH     16
 #define MQ_FACILITY_LENGTH           8
 #define MQ_FACILITY_LIKE_LENGTH      4
 #define MQ_FORMAT_LENGTH             8
 #define MQ_FUNCTION_LENGTH           4
 #define MQ_GROUP_ID_LENGTH           24
 #define MQ_LDAP_PASSWORD_LENGTH      32
 #define MQ_LOCAL_ADDRESS_LENGTH      48
 #define MQ_LTERM_OVERRIDE_LENGTH     8
 #define MQ_LUWID_LENGTH              16
 #define MQ_MAX_EXIT_NAME_LENGTH      128
 #define MQ_MAX_MCA_USER_ID_LENGTH    64
 #define MQ_MAX_USER_ID_LENGTH         64
 #define MQ_MCA_JOB_NAME_LENGTH       28
 #define MQ_MCA_NAME_LENGTH           20
 #define MQ_MCA_USER_ID_LENGTH        12
 #define MQ_MFS_MAP_NAME_LENGTH       8
 #define MQ_MODE_NAME_LENGTH          8
 #define MQ_MSG_HEADER_LENGTH         4000
 #define MQ_MSG_ID_LENGTH             24
 #define MQ_MSG_TOKEN_LENGTH          16
 #define MQ_NAMELIST_DESC_LENGTH      64
 #define MQ_NAMELIST_NAME_LENGTH      48
 #define MQ_OBJECT_INSTANCE_ID_LENGTH 24
 #define MQ_OBJECT_NAME_LENGTH        48
 #define MQ_PASSWORD_LENGTH           12
 #define MQ_PROCESS_APPL_ID_LENGTH    256
 #define MQ_PROCESS_DESC_LENGTH       64
 #define MQ_PROCESS_ENV_DATA_LENGTH   128
 #define MQ_PROCESS_NAME_LENGTH       48
 #define MQ_PROCESS_USER_DATA_LENGTH  128
 #define MQ_PUT_APPL_NAME_LENGTH      28
 #define MQ_PUT_DATE_LENGTH           8
 #define MQ_PUT_TIME_LENGTH           8
 #define MQ_Q_DESC_LENGTH             64
 #define MQ_Q_MGR_DESC_LENGTH         64
 #define MQ_Q_MGR_IDENTIFIER_LENGTH   48
 #define MQ_Q_MGR_NAME_LENGTH         48
 #define MQ_Q_NAME_LENGTH             48
 #define MQ_QSG_NAME_LENGTH           4
 #define MQ_REMOTE_SYS_ID_LENGTH      4
 #define MQ_SECURITY_ID_LENGTH        40
 #define MQ_SERVICE_NAME_LENGTH       32
 #define MQ_SERVICE_STEP_LENGTH       8
 #define MQ_SHORT_CONN_NAME_LENGTH    20
 #define MQ_SSL_CIPHER_SPEC_LENGTH    32
 #define MQ_SSL_CRYPTO_HARDWARE_LENGTH 256
 #define MQ_SSL_HANDSHAKE_STAGE_LENGTH 32
 #define MQ_SSL_KEY_REPOSITORY_LENGTH  256
 #define MQ_SSL_PEER_NAME_LENGTH      1024
 #define MQ_SSL_SHORT_PEER_NAME_LENGTH 256
 #define MQ_START_CODE_LENGTH         4
 #define MQ_STORAGE_CLASS_DESC_LENGTH 64
 #define MQ_STORAGE_CLASS_LENGTH      8
 #define MQ_SUB_IDENTITY_LENGTH       128
 #define MQ_TIME_LENGTH               8
 #define MQ_TOTAL_EXIT_DATA_LENGTH    999
 #define MQ_TOTAL_EXIT_NAME_LENGTH    999
 #define MQ_TP_NAME_LENGTH            64
 #define MQ_TRAN_INSTANCE_ID_LENGTH   16
 #define MQ_TRANSACTION_ID_LENGTH     4
 #define MQ_TRIGGER_DATA_LENGTH       64
 #define MQ_USER_ID_LENGTH            12
 #define MQ_XCF_GROUP_NAME_LENGTH      8
 #define MQ_XCF_MEMBER_NAME_LENGTH     16

 /* Completion Codes */
 #define MQCC_OK      0
 #define MQCC_WARNING 1
 #define MQCC_FAILED  2
 #define MQCC_UNKNOWN (-1)

 /* Reason Codes */
 #define MQRC_NONE                      0
 #define MQRC_APPL_FIRST                900
 #define MQRC_APPL_LAST                 999
 #define MQRC_ALIAS_BASE_Q_TYPE_ERROR   2001
 #define MQRC_ALREADY_CONNECTED         2002
 #define MQRC_BACKED_OUT                2003
 #define MQRC_BUFFER_ERROR              2004
 #define MQRC_BUFFER_LENGTH_ERROR       2005
 #define MQRC_CHAR_ATTR_LENGTH_ERROR    2006
 #define MQRC_CHAR_ATTRS_ERROR          2007
 #define MQRC_CHAR_ATTRS_TOO_SHORT      2008
 #define MQRC_CONNECTION_BROKEN         2009
 #define MQRC_DATA_LENGTH_ERROR         2010
 #define MQRC_DYNAMIC_Q_NAME_ERROR      2011
 #define MQRC_ENVIRONMENT_ERROR         2012
 #define MQRC_EXPIRY_ERROR              2013
 #define MQRC_FEEDBACK_ERROR            2014
 #define MQRC_GET_INHIBITED             2016
 #define MQRC_HANDLE_NOT_AVAILABLE      2017
 #define MQRC_HCONN_ERROR               2018
 #define MQRC_HOBJ_ERROR                2019
 #define MQRC_INHIBIT_VALUE_ERROR       2020
 #define MQRC_INT_ATTR_COUNT_ERROR      2021
 #define MQRC_INT_ATTR_COUNT_TOO_SMALL  2022
 #define MQRC_INT_ATTRS_ARRAY_ERROR     2023
 #define MQRC_SYNCPOINT_LIMIT_REACHED   2024
 #define MQRC_MAX_CONNS_LIMIT_REACHED   2025
 #define MQRC_MD_ERROR                  2026
 #define MQRC_MISSING_REPLY_TO_Q        2027
 #define MQRC_MSG_TYPE_ERROR            2029
 #define MQRC_MSG_TOO_BIG_FOR_Q         2030
 #define MQRC_MSG_TOO_BIG_FOR_Q_MGR     2031
 #define MQRC_NO_MSG_AVAILABLE          2033
 #define MQRC_NO_MSG_UNDER_CURSOR       2034
 #define MQRC_NOT_AUTHORIZED            2035
 #define MQRC_NOT_OPEN_FOR_BROWSE       2036
 #define MQRC_NOT_OPEN_FOR_INPUT        2037
 #define MQRC_NOT_OPEN_FOR_INQUIRE      2038
 #define MQRC_NOT_OPEN_FOR_OUTPUT       2039
 #define MQRC_NOT_OPEN_FOR_SET          2040
 #define MQRC_OBJECT_CHANGED            2041
 #define MQRC_OBJECT_IN_USE             2042
 #define MQRC_OBJECT_TYPE_ERROR         2043
 #define MQRC_OD_ERROR                  2044
 #define MQRC_OPTION_NOT_VALID_FOR_TYPE 2045
 #define MQRC_OPTIONS_ERROR             2046
 #define MQRC_PERSISTENCE_ERROR         2047
 #define MQRC_PERSISTENT_NOT_ALLOWED    2048
 #define MQRC_PRIORITY_EXCEEDS_MAXIMUM  2049
 #define MQRC_PRIORITY_ERROR            2050
 #define MQRC_PUT_INHIBITED             2051
 #define MQRC_Q_DELETED                 2052
 #define MQRC_Q_FULL                    2053
 #define MQRC_Q_NOT_EMPTY               2055
 #define MQRC_Q_SPACE_NOT_AVAILABLE     2056
 #define MQRC_Q_TYPE_ERROR              2057
 #define MQRC_Q_MGR_NAME_ERROR          2058
 #define MQRC_Q_MGR_NOT_AVAILABLE       2059
 #define MQRC_REPORT_OPTIONS_ERROR      2061
 #define MQRC_SECOND_MARK_NOT_ALLOWED   2062
 #define MQRC_SECURITY_ERROR            2063
 #define MQRC_SELECTOR_COUNT_ERROR      2065
 #define MQRC_SELECTOR_LIMIT_EXCEEDED   2066
 #define MQRC_SELECTOR_ERROR            2067
 #define MQRC_SELECTOR_NOT_FOR_TYPE     2068
 #define MQRC_SIGNAL_OUTSTANDING        2069
 #define MQRC_SIGNAL_REQUEST_ACCEPTED   2070
 #define MQRC_STORAGE_NOT_AVAILABLE     2071
 #define MQRC_SYNCPOINT_NOT_AVAILABLE   2072
 #define MQRC_TRIGGER_CONTROL_ERROR     2075
 #define MQRC_TRIGGER_DEPTH_ERROR       2076
 #define MQRC_TRIGGER_MSG_PRIORITY_ERR  2077
 #define MQRC_TRIGGER_TYPE_ERROR        2078
 #define MQRC_TRUNCATED_MSG_ACCEPTED    2079
 #define MQRC_TRUNCATED_MSG_FAILED      2080
 #define MQRC_UNKNOWN_ALIAS_BASE_Q      2082
 #define MQRC_UNKNOWN_OBJECT_NAME       2085
 #define MQRC_UNKNOWN_OBJECT_Q_MGR      2086
 #define MQRC_UNKNOWN_REMOTE_Q_MGR      2087
 #define MQRC_WAIT_INTERVAL_ERROR       2090
 #define MQRC_XMIT_Q_TYPE_ERROR         2091
 #define MQRC_XMIT_Q_USAGE_ERROR        2092
 #define MQRC_NOT_OPEN_FOR_PASS_ALL     2093
 #define MQRC_NOT_OPEN_FOR_PASS_IDENT   2094
 #define MQRC_NOT_OPEN_FOR_SET_ALL      2095
 #define MQRC_NOT_OPEN_FOR_SET_IDENT    2096
 #define MQRC_CONTEXT_HANDLE_ERROR      2097
 #define MQRC_CONTEXT_NOT_AVAILABLE     2098
 #define MQRC_SIGNAL1_ERROR             2099
 #define MQRC_OBJECT_ALREADY_EXISTS     2100
 #define MQRC_OBJECT_DAMAGED            2101
 #define MQRC_RESOURCE_PROBLEM          2102
 #define MQRC_ANOTHER_Q_MGR_CONNECTED   2103
 #define MQRC_UNKNOWN_REPORT_OPTION     2104
 #define MQRC_STORAGE_CLASS_ERROR       2105
 #define MQRC_COD_NOT_VALID_FOR_XCF_Q   2106
 #define MQRC_XWAIT_CANCELED            2107
 #define MQRC_XWAIT_ERROR               2108
 #define MQRC_SUPPRESSED_BY_EXIT        2109
 #define MQRC_FORMAT_ERROR              2110
 #define MQRC_SOURCE_CCSID_ERROR        2111
 #define MQRC_SOURCE_INTEGER_ENC_ERROR  2112
 #define MQRC_SOURCE_DECIMAL_ENC_ERROR  2113
 #define MQRC_SOURCE_FLOAT_ENC_ERROR    2114
 #define MQRC_TARGET_CCSID_ERROR        2115
 #define MQRC_TARGET_INTEGER_ENC_ERROR  2116
 #define MQRC_TARGET_DECIMAL_ENC_ERROR  2117
 #define MQRC_TARGET_FLOAT_ENC_ERROR    2118
 #define MQRC_NOT_CONVERTED             2119
 #define MQRC_CONVERTED_MSG_TOO_BIG     2120
 #define MQRC_TRUNCATED                 2120
 #define MQRC_NO_EXTERNAL_PARTICIPANTS  2121
 #define MQRC_PARTICIPANT_NOT_AVAILABLE 2122
 #define MQRC_OUTCOME_MIXED             2123
 #define MQRC_OUTCOME_PENDING           2124
 #define MQRC_BRIDGE_STARTED            2125
 #define MQRC_BRIDGE_STOPPED            2126
 #define MQRC_ADAPTER_STORAGE_SHORTAGE  2127
 #define MQRC_UOW_IN_PROGRESS           2128
 #define MQRC_ADAPTER_CONN_LOAD_ERROR   2129
 #define MQRC_ADAPTER_SERV_LOAD_ERROR   2130
 #define MQRC_ADAPTER_DEFS_ERROR        2131
 #define MQRC_ADAPTER_DEFS_LOAD_ERROR   2132
 #define MQRC_ADAPTER_CONV_LOAD_ERROR   2133
 #define MQRC_BO_ERROR                  2134
 #define MQRC_DH_ERROR                  2135
 #define MQRC_MULTIPLE_REASONS          2136
 #define MQRC_OPEN_FAILED               2137
 #define MQRC_ADAPTER_DISC_LOAD_ERROR   2138
 #define MQRC_CNO_ERROR                 2139
 #define MQRC_CICS_WAIT_FAILED          2140
 #define MQRC_DLH_ERROR                 2141
 #define MQRC_HEADER_ERROR              2142
 #define MQRC_SOURCE_LENGTH_ERROR       2143
 #define MQRC_TARGET_LENGTH_ERROR       2144
 #define MQRC_SOURCE_BUFFER_ERROR       2145
 #define MQRC_TARGET_BUFFER_ERROR       2146
 #define MQRC_IIH_ERROR                 2148
 #define MQRC_PCF_ERROR                 2149
 #define MQRC_DBCS_ERROR                2150
 #define MQRC_OBJECT_NAME_ERROR         2152
 #define MQRC_OBJECT_Q_MGR_NAME_ERROR   2153
 #define MQRC_RECS_PRESENT_ERROR        2154
 #define MQRC_OBJECT_RECORDS_ERROR      2155
 #define MQRC_RESPONSE_RECORDS_ERROR    2156
 #define MQRC_ASID_MISMATCH             2157
 #define MQRC_PMO_RECORD_FLAGS_ERROR    2158
 #define MQRC_PUT_MSG_RECORDS_ERROR     2159
 #define MQRC_CONN_ID_IN_USE            2160
 #define MQRC_Q_MGR_QUIESCING           2161
 #define MQRC_Q_MGR_STOPPING            2162
 #define MQRC_DUPLICATE_RECOV_COORD     2163
 #define MQRC_PMO_ERROR                 2173
 #define MQRC_API_EXIT_NOT_FOUND        2182
 #define MQRC_API_EXIT_LOAD_ERROR       2183
 #define MQRC_REMOTE_Q_NAME_ERROR       2184
 #define MQRC_INCONSISTENT_PERSISTENCE  2185
 #define MQRC_GMO_ERROR                 2186
 #define MQRC_CICS_BRIDGE_RESTRICTION   2187
 #define MQRC_STOPPED_BY_CLUSTER_EXIT   2188
 #define MQRC_CLUSTER_RESOLUTION_ERROR  2189
 #define MQRC_CONVERTED_STRING_TOO_BIG  2190
 #define MQRC_TMC_ERROR                 2191
 #define MQRC_PAGESET_FULL              2192
 #define MQRC_STORAGE_MEDIUM_FULL       2192
 #define MQRC_PAGESET_ERROR             2193
 #define MQRC_NAME_NOT_VALID_FOR_TYPE   2194
 #define MQRC_UNEXPECTED_ERROR          2195
 #define MQRC_UNKNOWN_XMIT_Q            2196
 #define MQRC_UNKNOWN_DEF_XMIT_Q        2197
 #define MQRC_DEF_XMIT_Q_TYPE_ERROR     2198
 #define MQRC_DEF_XMIT_Q_USAGE_ERROR    2199
 #define MQRC_NAME_IN_USE               2201
 #define MQRC_CONNECTION_QUIESCING      2202
 #define MQRC_CONNECTION_STOPPING       2203
 #define MQRC_ADAPTER_NOT_AVAILABLE     2204
 #define MQRC_MSG_ID_ERROR              2206
 #define MQRC_CORREL_ID_ERROR           2207
 #define MQRC_FILE_SYSTEM_ERROR         2208
 #define MQRC_NO_MSG_LOCKED             2209
 #define MQRC_FILE_NOT_AUDITED          2216
 #define MQRC_CONNECTION_NOT_AUTHORIZED 2217
 #define MQRC_MSG_TOO_BIG_FOR_CHANNEL   2218
 #define MQRC_CALL_IN_PROGRESS          2219
 #define MQRC_RMH_ERROR                 2220
 #define MQRC_Q_MGR_ACTIVE              2222
 #define MQRC_Q_MGR_NOT_ACTIVE          2223
 #define MQRC_Q_DEPTH_HIGH              2224
 #define MQRC_Q_DEPTH_LOW               2225
 #define MQRC_Q_SERVICE_INTERVAL_HIGH   2226
 #define MQRC_Q_SERVICE_INTERVAL_OK     2227
 #define MQRC_UNIT_OF_WORK_NOT_STARTED  2232
 #define MQRC_CHANNEL_AUTO_DEF_OK       2233
 #define MQRC_CHANNEL_AUTO_DEF_ERROR    2234
 #define MQRC_CFH_ERROR                 2235
 #define MQRC_CFIL_ERROR                2236
 #define MQRC_CFIN_ERROR                2237
 #define MQRC_CFSL_ERROR                2238
 #define MQRC_CFST_ERROR                2239
 #define MQRC_INCOMPLETE_GROUP          2241
 #define MQRC_INCOMPLETE_MSG            2242
 #define MQRC_INCONSISTENT_CCSIDS       2243
 #define MQRC_INCONSISTENT_ENCODINGS    2244
 #define MQRC_INCONSISTENT_UOW          2245
 #define MQRC_INVALID_MSG_UNDER_CURSOR  2246
 #define MQRC_MATCH_OPTIONS_ERROR       2247
 #define MQRC_MDE_ERROR                 2248
 #define MQRC_MSG_FLAGS_ERROR           2249
 #define MQRC_MSG_SEQ_NUMBER_ERROR      2250
 #define MQRC_OFFSET_ERROR              2251
 #define MQRC_ORIGINAL_LENGTH_ERROR     2252
 #define MQRC_SEGMENT_LENGTH_ZERO       2253
 #define MQRC_UOW_NOT_AVAILABLE         2255
 #define MQRC_WRONG_GMO_VERSION         2256
 #define MQRC_WRONG_MD_VERSION          2257
 #define MQRC_GROUP_ID_ERROR            2258
 #define MQRC_INCONSISTENT_BROWSE       2259
 #define MQRC_XQH_ERROR                 2260
 #define MQRC_SRC_ENV_ERROR             2261
 #define MQRC_SRC_NAME_ERROR            2262
 #define MQRC_DEST_ENV_ERROR            2263
 #define MQRC_DEST_NAME_ERROR           2264
 #define MQRC_TM_ERROR                  2265
 #define MQRC_CLUSTER_EXIT_ERROR        2266
 #define MQRC_CLUSTER_EXIT_LOAD_ERROR   2267
 #define MQRC_CLUSTER_PUT_INHIBITED     2268
 #define MQRC_CLUSTER_RESOURCE_ERROR    2269
 #define MQRC_NO_DESTINATIONS_AVAILABLE 2270
 #define MQRC_CONN_TAG_IN_USE           2271
 #define MQRC_PARTIALLY_CONVERTED       2272
 #define MQRC_CONNECTION_ERROR          2273
 #define MQRC_OPTION_ENVIRONMENT_ERROR  2274
 #define MQRC_CD_ERROR                  2277
 #define MQRC_CLIENT_CONN_ERROR         2278
 #define MQRC_CHANNEL_STOPPED_BY_USER   2279
 #define MQRC_HCONFIG_ERROR             2280
 #define MQRC_FUNCTION_ERROR            2281
 #define MQRC_CHANNEL_STARTED           2282
 #define MQRC_CHANNEL_STOPPED           2283
 #define MQRC_CHANNEL_CONV_ERROR        2284
 #define MQRC_SERVICE_NOT_AVAILABLE     2285
 #define MQRC_INITIALIZATION_FAILED     2286
 #define MQRC_TERMINATION_FAILED        2287
 #define MQRC_UNKNOWN_Q_NAME            2288
 #define MQRC_SERVICE_ERROR             2289
 #define MQRC_Q_ALREADY_EXISTS          2290
 #define MQRC_USER_ID_NOT_AVAILABLE     2291
 #define MQRC_UNKNOWN_ENTITY            2292
 #define MQRC_UNKNOWN_AUTH_ENTITY       2293
 #define MQRC_UNKNOWN_REF_OBJECT        2294
 #define MQRC_CHANNEL_ACTIVATED         2295
 #define MQRC_CHANNEL_NOT_ACTIVATED     2296
 #define MQRC_UOW_CANCELED              2297
 #define MQRC_FUNCTION_NOT_SUPPORTED    2298
 #define MQRC_SELECTOR_TYPE_ERROR       2299
 #define MQRC_COMMAND_TYPE_ERROR        2300
 #define MQRC_MULTIPLE_INSTANCE_ERROR   2301
 #define MQRC_SYSTEM_ITEM_NOT_ALTERABLE 2302
 #define MQRC_BAG_CONVERSION_ERROR      2303
 #define MQRC_SELECTOR_OUT_OF_RANGE     2304
 #define MQRC_SELECTOR_NOT_UNIQUE       2305
 #define MQRC_INDEX_NOT_PRESENT         2306
 #define MQRC_STRING_ERROR              2307
 #define MQRC_ENCODING_NOT_SUPPORTED    2308
 #define MQRC_SELECTOR_NOT_PRESENT      2309
 #define MQRC_OUT_SELECTOR_ERROR        2310
 #define MQRC_STRING_TRUNCATED          2311
 #define MQRC_SELECTOR_WRONG_TYPE       2312
 #define MQRC_INCONSISTENT_ITEM_TYPE    2313
 #define MQRC_INDEX_ERROR               2314
 #define MQRC_SYSTEM_BAG_NOT_ALTERABLE  2315
 #define MQRC_ITEM_COUNT_ERROR          2316
 #define MQRC_FORMAT_NOT_SUPPORTED      2317
 #define MQRC_SELECTOR_NOT_SUPPORTED    2318
 #define MQRC_ITEM_VALUE_ERROR          2319
 #define MQRC_HBAG_ERROR                2320
 #define MQRC_PARAMETER_MISSING         2321
 #define MQRC_CMD_SERVER_NOT_AVAILABLE  2322
 #define MQRC_STRING_LENGTH_ERROR       2323
 #define MQRC_INQUIRY_COMMAND_ERROR     2324
 #define MQRC_NESTED_BAG_NOT_SUPPORTED  2325
 #define MQRC_BAG_WRONG_TYPE            2326
 #define MQRC_ITEM_TYPE_ERROR           2327
 #define MQRC_SYSTEM_BAG_NOT_DELETABLE  2328
 #define MQRC_SYSTEM_ITEM_NOT_DELETABLE 2329
 #define MQRC_CODED_CHAR_SET_ID_ERROR   2330
 #define MQRC_MSG_TOKEN_ERROR           2331
 #define MQRC_MISSING_WIH               2332
 #define MQRC_WIH_ERROR                 2333
 #define MQRC_RFH_ERROR                 2334
 #define MQRC_RFH_STRING_ERROR          2335
 #define MQRC_RFH_COMMAND_ERROR         2336
 #define MQRC_RFH_PARM_ERROR            2337
 #define MQRC_RFH_DUPLICATE_PARM        2338
 #define MQRC_RFH_PARM_MISSING          2339
 #define MQRC_CHAR_CONVERSION_ERROR     2340
 #define MQRC_UCS2_CONVERSION_ERROR     2341
 #define MQRC_DB2_NOT_AVAILABLE         2342
 #define MQRC_OBJECT_NOT_UNIQUE         2343
 #define MQRC_CONN_TAG_NOT_RELEASED     2344
 #define MQRC_CF_NOT_AVAILABLE          2345
 #define MQRC_CF_STRUC_IN_USE           2346
 #define MQRC_CF_STRUC_LIST_HDR_IN_USE  2347
 #define MQRC_CF_STRUC_AUTH_FAILED      2348
 #define MQRC_CF_STRUC_ERROR            2349
 #define MQRC_CONN_TAG_NOT_USABLE       2350
 #define MQRC_GLOBAL_UOW_CONFLICT       2351
 #define MQRC_LOCAL_UOW_CONFLICT        2352
 #define MQRC_HANDLE_IN_USE_FOR_UOW     2353
 #define MQRC_UOW_ENLISTMENT_ERROR      2354
 #define MQRC_UOW_MIX_NOT_SUPPORTED     2355
 #define MQRC_WXP_ERROR                 2356
 #define MQRC_CURRENT_RECORD_ERROR      2357
 #define MQRC_NEXT_OFFSET_ERROR         2358
 #define MQRC_NO_RECORD_AVAILABLE       2359
 #define MQRC_OBJECT_LEVEL_INCOMPATIBLE 2360
 #define MQRC_NEXT_RECORD_ERROR         2361
 #define MQRC_BACKOUT_THRESHOLD_REACHED 2362
 #define MQRC_MSG_NOT_MATCHED           2363
 #define MQRC_JMS_FORMAT_ERROR          2364
 #define MQRC_SEGMENTS_NOT_SUPPORTED    2365
 #define MQRC_WRONG_CF_LEVEL            2366
 #define MQRC_CONFIG_CREATE_OBJECT      2367
 #define MQRC_CONFIG_CHANGE_OBJECT      2368
 #define MQRC_CONFIG_DELETE_OBJECT      2369
 #define MQRC_CONFIG_REFRESH_OBJECT     2370
 #define MQRC_CHANNEL_SSL_ERROR         2371
 #define MQRC_CF_STRUC_FAILED           2373
 #define MQRC_API_EXIT_ERROR            2374
 #define MQRC_API_EXIT_INIT_ERROR       2375
 #define MQRC_API_EXIT_TERM_ERROR       2376
 #define MQRC_EXIT_REASON_ERROR         2377
 #define MQRC_RESERVED_VALUE_ERROR      2378
 #define MQRC_NO_DATA_AVAILABLE         2379
 #define MQRC_SCO_ERROR                 2380
 #define MQRC_KEY_REPOSITORY_ERROR      2381
 #define MQRC_CRYPTO_HARDWARE_ERROR     2382
 #define MQRC_AUTH_INFO_REC_COUNT_ERROR 2383
 #define MQRC_AUTH_INFO_REC_ERROR       2384
 #define MQRC_AIR_ERROR                 2385
 #define MQRC_AUTH_INFO_TYPE_ERROR      2386
 #define MQRC_AUTH_INFO_CONN_NAME_ERROR 2387
 #define MQRC_LDAP_USER_NAME_ERROR      2388
 #define MQRC_LDAP_USER_NAME_LENGTH_ERR 2389
 #define MQRC_LDAP_PASSWORD_ERROR       2390
 #define MQRC_SSL_ALREADY_INITIALIZED   2391
 #define MQRC_SSL_CONFIG_ERROR          2392
 #define MQRC_SSL_INITIALIZATION_ERROR  2393
 #define MQRC_Q_INDEX_TYPE_ERROR        2394
 #define MQRC_SSL_NOT_ALLOWED           2396
 #define MQRC_JSSE_ERROR                2397
 #define MQRC_SSL_PEER_NAME_MISMATCH    2398
 #define MQRC_SSL_PEER_NAME_ERROR       2399
 #define MQRC_UNSUPPORTED_CIPHER_SUITE  2400
 #define MQRC_SSL_CERTIFICATE_REVOKED   2401
 #define MQRC_SSL_CERT_STORE_ERROR      2402
 #define MQRC_REOPEN_EXCL_INPUT_ERROR   6100
 #define MQRC_REOPEN_INQUIRE_ERROR      6101
 #define MQRC_REOPEN_SAVED_CONTEXT_ERR  6102
 #define MQRC_REOPEN_TEMPORARY_Q_ERROR  6103
 #define MQRC_ATTRIBUTE_LOCKED          6104
 #define MQRC_CURSOR_NOT_VALID          6105
 #define MQRC_ENCODING_ERROR            6106
 #define MQRC_STRUC_ID_ERROR            6107
 #define MQRC_NULL_POINTER              6108
 #define MQRC_NO_CONNECTION_REFERENCE   6109
 #define MQRC_NO_BUFFER                 6110
 #define MQRC_BINARY_DATA_LENGTH_ERROR  6111
 #define MQRC_BUFFER_NOT_AUTOMATIC      6112
 #define MQRC_INSUFFICIENT_BUFFER       6113
 #define MQRC_INSUFFICIENT_DATA         6114
 #define MQRC_DATA_TRUNCATED            6115
 #define MQRC_ZERO_LENGTH               6116
 #define MQRC_NEGATIVE_LENGTH           6117
 #define MQRC_NEGATIVE_OFFSET           6118
 #define MQRC_INCONSISTENT_FORMAT       6119
 #define MQRC_INCONSISTENT_OBJECT_STATE 6120
 #define MQRC_CONTEXT_OBJECT_NOT_VALID  6121
 #define MQRC_CONTEXT_OPEN_ERROR        6122
 #define MQRC_STRUC_LENGTH_ERROR        6123
 #define MQRC_NOT_CONNECTED             6124
 #define MQRC_NOT_OPEN                  6125
 #define MQRC_DISTRIBUTION_LIST_EMPTY   6126
 #define MQRC_INCONSISTENT_OPEN_OPTIONS 6127
 #define MQRC_WRONG_VERSION             6128
 #define MQRC_REFERENCE_ERROR           6129


 /*********************************************************************/
 /*  Values Related to Queue Attributes                               */
 /*********************************************************************/

 /* Queue Types */
 #define MQQT_LOCAL     1
 #define MQQT_MODEL     2
 #define MQQT_ALIAS     3
 #define MQQT_REMOTE    6
 #define MQQT_CLUSTER   7

 /* Cluster Queue Types */
 #define MQCQT_LOCAL_Q     1
 #define MQCQT_ALIAS_Q     2
 #define MQCQT_REMOTE_Q    3
 #define MQCQT_Q_MGR_ALIAS 4

 /* Extended Queue Types */
 #define MQQT_ALL 1001

 /* Queue Definition Types */
 #define MQQDT_PREDEFINED        1
 #define MQQDT_PERMANENT_DYNAMIC 2
 #define MQQDT_TEMPORARY_DYNAMIC 3
 #define MQQDT_SHARED_DYNAMIC    4

 /* Inhibit Get */
 #define MQQA_GET_INHIBITED 1
 #define MQQA_GET_ALLOWED   0

 /* Inhibit Put */
 #define MQQA_PUT_INHIBITED 1
 #define MQQA_PUT_ALLOWED   0

 /* Queue Shareability */
 #define MQQA_SHAREABLE     1
 #define MQQA_NOT_SHAREABLE 0

 /* Back-Out Hardening */
 #define MQQA_BACKOUT_HARDENED     1
 #define MQQA_BACKOUT_NOT_HARDENED 0

 /* Message Delivery Sequence */
 #define MQMDS_PRIORITY 0
 #define MQMDS_FIFO     1

 /* Trigger Control */
 #define MQTC_OFF 0
 #define MQTC_ON  1

 /* Trigger Types */
 #define MQTT_NONE  0
 #define MQTT_FIRST 1
 #define MQTT_EVERY 2
 #define MQTT_DEPTH 3

 /* Queue Usage */
 #define MQUS_NORMAL       0
 #define MQUS_TRANSMISSION 1

 /* Distribution Lists */
 #define MQDL_SUPPORTED     1
 #define MQDL_NOT_SUPPORTED 0

 /* Index Type */
 #define MQIT_NONE      0
 #define MQIT_MSG_ID    1
 #define MQIT_CORREL_ID 2
 #define MQIT_MSG_TOKEN 4
 #define MQIT_GROUP_ID  5

 /* Default Bind */
 #define MQBND_BIND_ON_OPEN   0
 #define MQBND_BIND_NOT_FIXED 1

 /* Queue Sharing Group Disposition */
 #define MQQSGD_Q_MGR  0
 #define MQQSGD_COPY   1
 #define MQQSGD_SHARED 2
 #define MQQSGD_GROUP  3


 /*********************************************************************/
 /*  Values Related to Namelist Attributes                            */
 /*********************************************************************/

 /* Name Count */
 #define MQNC_MAX_NAMELIST_NAME_COUNT 256

 /* Namelist Type */
 #define MQNT_NONE      0
 #define MQNT_Q         1
 #define MQNT_CLUSTER   2
 #define MQNT_AUTH_INFO 4
 #define MQNT_ALL       1001


 /*********************************************************************/
 /*  Values Related to Process-Definition Attributes                  */
 /*********************************************************************/

 /* Application Type */
 /* See values for "Put Application Type" under MQMD */


 /*********************************************************************/
 /*  Values Related to Authentication-Information Attributes          */
 /*********************************************************************/

 /* Authentication Information Type */
 /* See values for "Authentication Information Type" under MQAIR */


 /*********************************************************************/
 /*  Values Related to Queue-Manager Attributes                       */
 /*********************************************************************/

 /* Channel Auto Definition */
 #define MQCHAD_DISABLED 0
 #define MQCHAD_ENABLED  1

 /* Command Level */
 #define MQCMDL_LEVEL_1   100
 #define MQCMDL_LEVEL_101 101
 #define MQCMDL_LEVEL_110 110
 #define MQCMDL_LEVEL_114 114
 #define MQCMDL_LEVEL_120 120
 #define MQCMDL_LEVEL_200 200
 #define MQCMDL_LEVEL_201 201
 #define MQCMDL_LEVEL_210 210
 #define MQCMDL_LEVEL_220 220
 #define MQCMDL_LEVEL_221 221
 #define MQCMDL_LEVEL_320 320
 #define MQCMDL_LEVEL_420 420
 #define MQCMDL_LEVEL_500 500
 #define MQCMDL_LEVEL_510 510
 #define MQCMDL_LEVEL_520 520
 #define MQCMDL_LEVEL_530 530

 /* Distribution Lists */
 /* See values for "Distribution Lists" under Queue Attributes */

 /* Expiration Scan Interval */
 #define MQEXPI_OFF 0

 /* Intra-Group Queuing */
 #define MQIGQ_DISABLED 0
 #define MQIGQ_ENABLED  1

 /* Intra-Group Queuing Put Authority */
 #define MQIGQPA_DEFAULT          1
 #define MQIGQPA_CONTEXT          2
 #define MQIGQPA_ONLY_IGQ         3
 #define MQIGQPA_ALTERNATE_OR_IGQ 4

 /* Platform */
 #define MQPL_MVS        1
 #define MQPL_OS390      1
 #define MQPL_ZOS        1
 #define MQPL_OS2        2
 #define MQPL_AIX        3
 #define MQPL_UNIX       3
 #define MQPL_OS400      4
 #define MQPL_WINDOWS    5
 #define MQPL_WINDOWS_NT 11
 #define MQPL_VMS        12
 #define MQPL_NSK        13

 /* Syncpoint Availability */
 #define MQSP_AVAILABLE     1
 #define MQSP_NOT_AVAILABLE 0


 /*********************************************************************/
 /*  Simple Data Types                                                */
 /*********************************************************************/

 /* Byte Datatypes */
 typedef unsigned char MQBYTE;
 typedef MQBYTE MQPOINTER PMQBYTE;
 typedef PMQBYTE MQPOINTER PPMQBYTE;
 typedef MQBYTE MQBYTE8[8];
 typedef MQBYTE8 MQPOINTER PMQBYTE8;
 typedef MQBYTE MQBYTE16[16];
 typedef MQBYTE16 MQPOINTER PMQBYTE16;
 typedef MQBYTE MQBYTE24[24];
 typedef MQBYTE24 MQPOINTER PMQBYTE24;
 typedef MQBYTE MQBYTE32[32];
 typedef MQBYTE32 MQPOINTER PMQBYTE32;
 typedef MQBYTE MQBYTE40[40];
 typedef MQBYTE40 MQPOINTER PMQBYTE40;
 typedef MQBYTE MQBYTE48[48];
 typedef MQBYTE48 MQPOINTER PMQBYTE48;
 typedef MQBYTE MQBYTE128[128];
 typedef MQBYTE128 MQPOINTER PMQBYTE128;

 /* Character Datatypes */
 typedef char MQCHAR;
 typedef MQCHAR MQPOINTER PMQCHAR;
 typedef PMQCHAR MQPOINTER PPMQCHAR;
 typedef MQCHAR MQCHAR4[4];
 typedef MQCHAR4 MQPOINTER PMQCHAR4;
 typedef MQCHAR MQCHAR8[8];
 typedef MQCHAR8 MQPOINTER PMQCHAR8;
 typedef MQCHAR MQCHAR12[12];
 typedef MQCHAR12 MQPOINTER PMQCHAR12;
 typedef MQCHAR MQCHAR20[20];
 typedef MQCHAR20 MQPOINTER PMQCHAR20;
 typedef MQCHAR MQCHAR28[28];
 typedef MQCHAR28 MQPOINTER PMQCHAR28;
 typedef MQCHAR MQCHAR32[32];
 typedef MQCHAR32 MQPOINTER PMQCHAR32;
 typedef MQCHAR MQCHAR48[48];
 typedef MQCHAR48 MQPOINTER PMQCHAR48;
 typedef MQCHAR MQCHAR64[64];
 typedef MQCHAR64 MQPOINTER PMQCHAR64;
 typedef MQCHAR MQCHAR128[128];
 typedef MQCHAR128 MQPOINTER PMQCHAR128;
 typedef MQCHAR MQCHAR256[256];
 typedef MQCHAR256 MQPOINTER PMQCHAR256;
 typedef MQCHAR MQCHAR264[264];
 typedef MQCHAR264 MQPOINTER PMQCHAR264;

 /* Other Datatypes */
#if defined(MQ_64_BIT)
 typedef int MQLONG;
 typedef unsigned int MQULONG;
#else
 typedef long MQLONG;
 typedef unsigned long MQULONG;
#endif
 typedef MQLONG MQPOINTER PMQLONG;
 typedef PMQLONG MQPOINTER PPMQLONG;
 typedef MQULONG MQPOINTER PMQULONG;
 typedef PMQULONG MQPOINTER PPMQULONG;
 typedef void MQPOINTER MQHCONFIG;
 typedef MQHCONFIG MQPOINTER PMQHCONFIG;
 typedef MQLONG MQHCONN;
 typedef MQHCONN MQPOINTER PMQHCONN;
 typedef PMQHCONN MQPOINTER PPMQHCONN;
 typedef MQLONG MQHOBJ;
 typedef MQHOBJ MQPOINTER PMQHOBJ;
 typedef PMQHOBJ MQPOINTER PPMQHOBJ;
 typedef void MQPOINTER MQPTR;
 typedef MQPTR MQPOINTER PMQPTR;
 typedef void MQPOINTER PMQFUNC;
 typedef void MQPOINTER PMQVOID;
 typedef PMQVOID MQPOINTER PPMQVOID;
 typedef MQLONG MQPID;
 typedef MQPID MQPOINTER PMQPID;
 typedef MQLONG MQTID;
 typedef MQTID MQPOINTER PMQTID;


 /*********************************************************************/
 /*  MQAIR Structure -- Authentication Information Record             */
 /*********************************************************************/

 typedef struct tagMQAIR MQAIR;
 typedef MQAIR MQPOINTER PMQAIR;

 struct tagMQAIR {
   MQCHAR4    StrucId;             /* Structure identifier */
   MQLONG     Version;             /* Structure version number */
   MQLONG     AuthInfoType;        /* Type of authentication
                                      information */
   MQCHAR264  AuthInfoConnName;    /* Connection name of CRL LDAP
                                      server */
   PMQCHAR    LDAPUserNamePtr;     /* Address of LDAP user name */
   MQLONG     LDAPUserNameOffset;  /* Offset of LDAP user name from
                                      start of MQAIR structure */
   MQLONG     LDAPUserNameLength;  /* Length of LDAP user name */
   MQCHAR32   LDAPPassword;        /* Password to access LDAP server */
 };

 #define MQAIR_DEFAULT {MQAIR_STRUC_ID_ARRAY},\
                       MQAIR_VERSION_1,\
                       MQAIT_CRL_LDAP,\
                       {""},\
                       NULL,\
                       0,\
                       0,\
                       {""}


 /*********************************************************************/
 /*  MQBO Structure -- Begin Options                                  */
 /*********************************************************************/

 typedef struct tagMQBO MQBO;
 typedef MQBO  MQPOINTER PMQBO;
 typedef PMQBO MQPOINTER PPMQBO;

 struct tagMQBO {
   MQCHAR4  StrucId;  /* Structure identifier */
   MQLONG   Version;  /* Structure version number */
   MQLONG   Options;  /* Options that control the action of MQBEGIN */
 };

 #define MQBO_DEFAULT {MQBO_STRUC_ID_ARRAY},\
                      MQBO_VERSION_1,\
                      MQBO_NONE


 /*********************************************************************/
 /*  MQCIH Structure -- CICS Information Header                       */
 /*********************************************************************/

 typedef struct tagMQCIH MQCIH;
 typedef MQCIH MQPOINTER PMQCIH;

 struct tagMQCIH {
   MQCHAR4  StrucId;             /* Structure identifier */
   MQLONG   Version;             /* Structure version number */
   MQLONG   StrucLength;         /* Length of MQCIH structure */
   MQLONG   Encoding;            /* Reserved */
   MQLONG   CodedCharSetId;      /* Reserved */
   MQCHAR8  Format;              /* MQ format name of data that follows
                                    MQCIH */
   MQLONG   Flags;               /* Flags */
   MQLONG   ReturnCode;          /* Return code from bridge */
   MQLONG   CompCode;            /* MQ completion code or CICS
                                    EIBRESP */
   MQLONG   Reason;              /* MQ reason or feedback code, or CICS
                                    EIBRESP2 */
   MQLONG   UOWControl;          /* Unit-of-work control */
   MQLONG   GetWaitInterval;     /* Wait interval for MQGET call issued
                                    by bridge task */
   MQLONG   LinkType;            /* Link type */
   MQLONG   OutputDataLength;    /* Output COMMAREA data length */
   MQLONG   FacilityKeepTime;    /* Bridge facility release time */
   MQLONG   ADSDescriptor;       /* Send/receive ADS descriptor */
   MQLONG   ConversationalTask;  /* Whether task can be
                                    conversational */
   MQLONG   TaskEndStatus;       /* Status at end of task */
   MQBYTE8  Facility;            /* Bridge facility token */
   MQCHAR4  Function;            /* MQ call name or CICS EIBFN
                                    function */
   MQCHAR4  AbendCode;           /* Abend code */
   MQCHAR8  Authenticator;       /* Password or passticket */
   MQCHAR8  Reserved1;           /* Reserved */
   MQCHAR8  ReplyToFormat;       /* MQ format name of reply message */
   MQCHAR4  RemoteSysId;         /* Reserved */
   MQCHAR4  RemoteTransId;       /* Reserved */
   MQCHAR4  TransactionId;       /* Transaction to attach */
   MQCHAR4  FacilityLike;        /* Terminal emulated attributes */
   MQCHAR4  AttentionId;         /* AID key */
   MQCHAR4  StartCode;           /* Transaction start code */
   MQCHAR4  CancelCode;          /* Abend transaction code */
   MQCHAR4  NextTransactionId;   /* Next transaction to attach */
   MQCHAR8  Reserved2;           /* Reserved */
   MQCHAR8  Reserved3;           /* Reserved */
   MQLONG   CursorPosition;      /* Cursor position */
   MQLONG   ErrorOffset;         /* Offset of error in message */
   MQLONG   InputItem;           /* Reserved */
   MQLONG   Reserved4;           /* Reserved */
 };

 #define MQCIH_DEFAULT {MQCIH_STRUC_ID_ARRAY},\
                       MQCIH_VERSION_2,\
                       MQCIH_LENGTH_2,\
                       0,\
                       0,\
                       {MQFMT_NONE_ARRAY},\
                       MQCIH_NONE,\
                       MQCRC_OK,\
                       MQCC_OK,\
                       MQRC_NONE,\
                       MQCUOWC_ONLY,\
                       MQCGWI_DEFAULT,\
                       MQCLT_PROGRAM,\
                       MQCODL_AS_INPUT,\
                       0,\
                       MQCADSD_NONE,\
                       MQCCT_NO,\
                       MQCTES_NOSYNC,\
                       {MQCFAC_NONE_ARRAY},\
                       {MQCFUNC_NONE_ARRAY},\
                       {' ',' ',' ',' '},\
                       {' ',' ',' ',' ',' ',' ',' ',' '},\
                       {' ',' ',' ',' ',' ',' ',' ',' '},\
                       {MQFMT_NONE_ARRAY},\
                       {' ',' ',' ',' '},\
                       {' ',' ',' ',' '},\
                       {' ',' ',' ',' '},\
                       {' ',' ',' ',' '},\
                       {' ',' ',' ',' '},\
                       {MQCSC_NONE_ARRAY},\
                       {' ',' ',' ',' '},\
                       {' ',' ',' ',' '},\
                       {' ',' ',' ',' ',' ',' ',' ',' '},\
                       {' ',' ',' ',' ',' ',' ',' ',' '},\
                       0,\
                       0,\
                       0,\
                       0


 /*********************************************************************/
 /*  MQSCO Structure -- SSL Configuration Options                     */
 /*********************************************************************/

 typedef struct tagMQSCO MQSCO;
 typedef MQSCO MQPOINTER PMQSCO;

 struct tagMQSCO {
   MQCHAR4    StrucId;            /* Structure identifier */
   MQLONG     Version;            /* Structure version number */
   MQCHAR256  KeyRepository;      /* Location of SSL key repository */
   MQCHAR256  CryptoHardware;     /* Cryptographic hardware
                                     configuration string */
   MQLONG     AuthInfoRecCount;   /* Number of MQAIR records present */
   MQLONG     AuthInfoRecOffset;  /* Offset of first MQAIR record from
                                     start of MQSCO structure */
   PMQAIR     AuthInfoRecPtr;     /* Address of first MQAIR record */
 };

 #define MQSCO_DEFAULT {MQSCO_STRUC_ID_ARRAY},\
                       MQSCO_VERSION_1,\
                       {""},\
                       {""},\
                       0,\
                       0,\
                       NULL


 /*********************************************************************/
 /*  MQCNO Structure -- Connect Options                               */
 /*********************************************************************/

 typedef struct tagMQCNO MQCNO;
 typedef MQCNO  MQPOINTER PMQCNO;
 typedef PMQCNO MQPOINTER PPMQCNO;

 struct tagMQCNO {
   MQCHAR4  StrucId;           /* Structure identifier */
   MQLONG   Version;           /* Structure version number */
   MQLONG   Options;           /* Options that control the action of
                                  MQCONNX */
   MQLONG   ClientConnOffset;  /* Offset of MQCD structure for client
                                  connection */
   MQPTR    ClientConnPtr;     /* Address of MQCD structure for client
                                  connection */
   MQBYTE128  ConnTag;         /* Queue-manager connection tag */
   PMQSCO     SSLConfigPtr;    /* Address of MQSCO structure for
                                  client connection */
   MQLONG     SSLConfigOffset; /* Offset of MQSCO structure for client
                                  connection */
 };

 #define MQCNO_DEFAULT {MQCNO_STRUC_ID_ARRAY},\
                       MQCNO_VERSION_1,\
                       MQCNO_NONE,\
                       0,\
                       NULL, \
                       {MQCT_NONE_ARRAY},\
                       NULL, \
                       0


 /*********************************************************************/
 /*  MQDH Structure -- Distribution Header                            */
 /*********************************************************************/

 typedef struct tagMQDH MQDH;
 typedef MQDH MQPOINTER PMQDH;

 struct tagMQDH {
   MQCHAR4  StrucId;          /* Structure identifier */
   MQLONG   Version;          /* Structure version number */
   MQLONG   StrucLength;      /* Length of MQDH structure plus following
                                 MQOR and MQPMR records */
   MQLONG   Encoding;         /* Numeric encoding of data that follows
                                 the MQOR and MQPMR records */
   MQLONG   CodedCharSetId;   /* Character set identifier of data that
                                 follows the MQOR and MQPMR records */
   MQCHAR8  Format;           /* Format name of data that follows the
                                 MQOR and MQPMR records */
   MQLONG   Flags;            /* General flags */
   MQLONG   PutMsgRecFields;  /* Flags indicating which MQPMR fields are
                                 present */
   MQLONG   RecsPresent;      /* Number of MQOR records present */
   MQLONG   ObjectRecOffset;  /* Offset of first MQOR record from start
                                 of MQDH */
   MQLONG   PutMsgRecOffset;  /* Offset of first MQPMR record from start
                                 of MQDH */
 };

 #define MQDH_DEFAULT {MQDH_STRUC_ID_ARRAY},\
                      MQDH_VERSION_1,\
                      0,\
                      0,\
                      MQCCSI_UNDEFINED,\
                      {MQFMT_NONE_ARRAY},\
                      MQDHF_NONE,\
                      MQPMRF_NONE,\
                      0,\
                      0,\
                      0


 /*********************************************************************/
 /*  MQDLH Structure -- Dead Letter Header                            */
 /*********************************************************************/

 typedef struct tagMQDLH MQDLH;
 typedef MQDLH MQPOINTER PMQDLH;

 struct tagMQDLH {
   MQCHAR4   StrucId;         /* Structure identifier */
   MQLONG    Version;         /* Structure version number */
   MQLONG    Reason;          /* Reason message arrived on dead-letter
                                 (undelivered-message) queue */
   MQCHAR48  DestQName;       /* Name of original destination queue */
   MQCHAR48  DestQMgrName;    /* Name of original destination queue
                                 manager */
   MQLONG    Encoding;        /* Numeric encoding of data that follows
                                 MQDLH */
   MQLONG    CodedCharSetId;  /* Character set identifier of data that
                                 follows MQDLH */
   MQCHAR8   Format;          /* Format name of data that follows
                                 MQDLH */
   MQLONG    PutApplType;     /* Type of application that put message on
                                 dead-letter (undelivered-message)
                                 queue */
   MQCHAR28  PutApplName;     /* Name of application that put message on
                                 dead-letter (undelivered-message)
                                 queue */
   MQCHAR8   PutDate;         /* Date when message was put on
                                 dead-letter (undelivered-message)
                                 queue */
   MQCHAR8   PutTime;         /* Time when message was put on the
                                 dead-letter (undelivered-message)
                                 queue */
 };

 #define MQDLH_DEFAULT {MQDLH_STRUC_ID_ARRAY},\
                       MQDLH_VERSION_1,\
                       MQRC_NONE,\
                       {""},\
                       {""},\
                       0,\
                       MQCCSI_UNDEFINED,\
                       {MQFMT_NONE_ARRAY},\
                       0,\
                       {""},\
                       {""},\
                       {""}


 /*********************************************************************/
 /*  MQGMO Structure -- Get Message Options                           */
 /*********************************************************************/

 typedef struct tagMQGMO MQGMO;
 typedef MQGMO  MQPOINTER PMQGMO;
 typedef PMQGMO MQPOINTER PPMQGMO;

 struct tagMQGMO {
   MQCHAR4   StrucId;         /* Structure identifier */
   MQLONG    Version;         /* Structure version number */
   MQLONG    Options;         /* Options that control the action of
                                 MQGET */
   MQLONG    WaitInterval;    /* Wait interval */
   MQLONG    Signal1;         /* Signal */
   MQLONG    Signal2;         /* Signal identifier */
   MQCHAR48  ResolvedQName;   /* Resolved name of destination queue */
   MQLONG    MatchOptions;    /* Options controlling selection criteria
                                 used for MQGET */
   MQCHAR    GroupStatus;     /* Flag indicating whether message
                                 retrieved is in a group */
   MQCHAR    SegmentStatus;   /* Flag indicating whether message
                                 retrieved is a segment of a logical
                                 message */
   MQCHAR    Segmentation;    /* Flag indicating whether further
                                 segmentation is allowed for the message
                                 retrieved */
   MQCHAR    Reserved1;       /* Reserved */
   MQBYTE16  MsgToken;        /* Message token */
   MQLONG    ReturnedLength;  /* Length of message data returned
                                 (bytes) */
 };

 #define MQGMO_DEFAULT {MQGMO_STRUC_ID_ARRAY},\
                       MQGMO_VERSION_1,\
                       MQGMO_NO_WAIT,\
                       0,\
                       0,\
                       0,\
                       {""},\
                       (MQMO_MATCH_MSG_ID+MQMO_MATCH_CORREL_ID),\
                       MQGS_NOT_IN_GROUP,\
                       MQSS_NOT_A_SEGMENT,\
                       MQSEG_INHIBITED,\
                       ' ',\
                       {MQMTOK_NONE_ARRAY},\
                       MQRL_UNDEFINED


 /*********************************************************************/
 /*  MQIIH Structure -- IMS Information Header                        */
 /*********************************************************************/

 typedef struct tagMQIIH MQIIH;
 typedef MQIIH MQPOINTER PMQIIH;

 struct tagMQIIH {
   MQCHAR4   StrucId;         /* Structure identifier */
   MQLONG    Version;         /* Structure version number */
   MQLONG    StrucLength;     /* Length of MQIIH structure */
   MQLONG    Encoding;        /* Reserved */
   MQLONG    CodedCharSetId;  /* Reserved */
   MQCHAR8   Format;          /* MQ format name of data that follows
                                 MQIIH */
   MQLONG    Flags;           /* Flags */
   MQCHAR8   LTermOverride;   /* Logical terminal override */
   MQCHAR8   MFSMapName;      /* Message format services map name */
   MQCHAR8   ReplyToFormat;   /* MQ format name of reply message */
   MQCHAR8   Authenticator;   /* RACF password or passticket */
   MQBYTE16  TranInstanceId;  /* Transaction instance identifier */
   MQCHAR    TranState;       /* Transaction state */
   MQCHAR    CommitMode;      /* Commit mode */
   MQCHAR    SecurityScope;   /* Security scope */
   MQCHAR    Reserved;        /* Reserved */
 };

 #define MQIIH_DEFAULT {MQIIH_STRUC_ID_ARRAY},\
                       MQIIH_VERSION_1,\
                       MQIIH_LENGTH_1,\
                       0,\
                       0,\
                       {MQFMT_NONE_ARRAY},\
                       MQIIH_NONE,\
                       {' ',' ',' ',' ',' ',' ',' ',' '},\
                       {' ',' ',' ',' ',' ',' ',' ',' '},\
                       {MQFMT_NONE_ARRAY},\
                       {MQIAUT_NONE_ARRAY},\
                       {MQITII_NONE_ARRAY},\
                       MQITS_NOT_IN_CONVERSATION,\
                       MQICM_COMMIT_THEN_SEND,\
                       MQISS_CHECK,\
                       ' '


 /*********************************************************************/
 /*  MQMD Structure -- Message Descriptor                             */
 /*********************************************************************/

 typedef struct tagMQMD MQMD;
 typedef MQMD  MQPOINTER PMQMD;
 typedef PMQMD MQPOINTER PPMQMD;

 struct tagMQMD {
   MQCHAR4   StrucId;           /* Structure identifier */
   MQLONG    Version;           /* Structure version number */
   MQLONG    Report;            /* Options for report messages */
   MQLONG    MsgType;           /* Message type */
   MQLONG    Expiry;            /* Message lifetime */
   MQLONG    Feedback;          /* Feedback or reason code */
   MQLONG    Encoding;          /* Numeric encoding of message data */
   MQLONG    CodedCharSetId;    /* Character set identifier of message
                                   data */
   MQCHAR8   Format;            /* Format name of message data */
   MQLONG    Priority;          /* Message priority */
   MQLONG    Persistence;       /* Message persistence */
   MQBYTE24  MsgId;             /* Message identifier */
   MQBYTE24  CorrelId;          /* Correlation identifier */
   MQLONG    BackoutCount;      /* Backout counter */
   MQCHAR48  ReplyToQ;          /* Name of reply queue */
   MQCHAR48  ReplyToQMgr;       /* Name of reply queue manager */
   MQCHAR12  UserIdentifier;    /* User identifier */
   MQBYTE32  AccountingToken;   /* Accounting token */
   MQCHAR32  ApplIdentityData;  /* Application data relating to
                                   identity */
   MQLONG    PutApplType;       /* Type of application that put the
                                   message */
   MQCHAR28  PutApplName;       /* Name of application that put the
                                   message */
   MQCHAR8   PutDate;           /* Date when message was put */
   MQCHAR8   PutTime;           /* Time when message was put */
   MQCHAR4   ApplOriginData;    /* Application data relating to
                                   origin */
   MQBYTE24  GroupId;           /* Group identifier */
   MQLONG    MsgSeqNumber;      /* Sequence number of logical message
                                   within group */
   MQLONG    Offset;            /* Offset of data in physical message
                                   from start of logical message */
   MQLONG    MsgFlags;          /* Message flags */
   MQLONG    OriginalLength;    /* Length of original message */
 };

 #define MQMD_DEFAULT {MQMD_STRUC_ID_ARRAY},\
                      MQMD_VERSION_1,\
                      MQRO_NONE,\
                      MQMT_DATAGRAM,\
                      MQEI_UNLIMITED,\
                      MQFB_NONE,\
                      MQENC_NATIVE,\
                      MQCCSI_Q_MGR,\
                      {MQFMT_NONE_ARRAY},\
                      MQPRI_PRIORITY_AS_Q_DEF,\
                      MQPER_PERSISTENCE_AS_Q_DEF,\
                      {MQMI_NONE_ARRAY},\
                      {MQCI_NONE_ARRAY},\
                      0,\
                      {""},\
                      {""},\
                      {""},\
                      {MQACT_NONE_ARRAY},\
                      {""},\
                      MQAT_NO_CONTEXT,\
                      {""},\
                      {""},\
                      {""},\
                      {""},\
                      {MQGI_NONE_ARRAY},\
                      1,\
                      0,\
                      MQMF_NONE,\
                      MQOL_UNDEFINED


 /*********************************************************************/
 /*  MQMDE Structure -- Message Descriptor Extension                  */
 /*********************************************************************/

 typedef struct tagMQMDE MQMDE;
 typedef MQMDE MQPOINTER PMQMDE;

 struct tagMQMDE {
   MQCHAR4   StrucId;         /* Structure identifier */
   MQLONG    Version;         /* Structure version number */
   MQLONG    StrucLength;     /* Length of MQMDE structure */
   MQLONG    Encoding;        /* Numeric encoding of data that follows
                                 MQMDE */
   MQLONG    CodedCharSetId;  /* Character-set identifier of data that
                                 follows MQMDE */
   MQCHAR8   Format;          /* Format name of data that follows
                                 MQMDE */
   MQLONG    Flags;           /* General flags */
   MQBYTE24  GroupId;         /* Group identifier */
   MQLONG    MsgSeqNumber;    /* Sequence number of logical message
                                 within group */
   MQLONG    Offset;          /* Offset of data in physical message from
                                 start of logical message */
   MQLONG    MsgFlags;        /* Message flags */
   MQLONG    OriginalLength;  /* Length of original message */
 };

 #define MQMDE_DEFAULT {MQMDE_STRUC_ID_ARRAY},\
                       MQMDE_VERSION_2,\
                       MQMDE_LENGTH_2,\
                       MQENC_NATIVE,\
                       MQCCSI_UNDEFINED,\
                       {MQFMT_NONE_ARRAY},\
                       MQMDEF_NONE,\
                       {MQGI_NONE_ARRAY},\
                       1,\
                       0,\
                       MQMF_NONE,\
                       MQOL_UNDEFINED


 /*********************************************************************/
 /*  MQMD1 Structure -- Version-1 Message Descriptor                  */
 /*********************************************************************/

 typedef struct tagMQMD1 MQMD1;
 typedef MQMD1 MQPOINTER PMQMD1;

 struct tagMQMD1 {
   MQCHAR4   StrucId;           /* Structure identifier */
   MQLONG    Version;           /* Structure version number */
   MQLONG    Report;            /* Report options */
   MQLONG    MsgType;           /* Message type */
   MQLONG    Expiry;            /* Expiry time */
   MQLONG    Feedback;          /* Feedback or reason code */
   MQLONG    Encoding;          /* Numeric encoding of message data */
   MQLONG    CodedCharSetId;    /* Character set identifier of message
                                   data */
   MQCHAR8   Format;            /* Format name of message data */
   MQLONG    Priority;          /* Message priority */
   MQLONG    Persistence;       /* Message persistence */
   MQBYTE24  MsgId;             /* Message identifier */
   MQBYTE24  CorrelId;          /* Correlation identifier */
   MQLONG    BackoutCount;      /* Backout counter */
   MQCHAR48  ReplyToQ;          /* Name of reply-to queue */
   MQCHAR48  ReplyToQMgr;       /* Name of reply queue manager */
   MQCHAR12  UserIdentifier;    /* User identifier */
   MQBYTE32  AccountingToken;   /* Accounting token */
   MQCHAR32  ApplIdentityData;  /* Application data relating to
                                   identity */
   MQLONG    PutApplType;       /* Type of application that put the
                                   message */
   MQCHAR28  PutApplName;       /* Name of application that put the
                                   message */
   MQCHAR8   PutDate;           /* Date when message was put */
   MQCHAR8   PutTime;           /* Time when message was put */
   MQCHAR4   ApplOriginData;    /* Application data relating to
                                   origin */
 };

 #define MQMD1_DEFAULT {MQMD_STRUC_ID_ARRAY},\
                       MQMD_VERSION_1,\
                       MQRO_NONE,\
                       MQMT_DATAGRAM,\
                       MQEI_UNLIMITED,\
                       MQFB_NONE,\
                       MQENC_NATIVE,\
                       MQCCSI_Q_MGR,\
                       {MQFMT_NONE_ARRAY},\
                       MQPRI_PRIORITY_AS_Q_DEF,\
                       MQPER_PERSISTENCE_AS_Q_DEF,\
                       {MQMI_NONE_ARRAY},\
                       {MQCI_NONE_ARRAY},\
                       0,\
                       {""},\
                       {""},\
                       {""},\
                       {MQACT_NONE_ARRAY},\
                       {""},\
                       MQAT_NO_CONTEXT,\
                       {""},\
                       {""},\
                       {""},\
                       {""}


 /*********************************************************************/
 /*  MQOD Structure -- Object Descriptor                              */
 /*********************************************************************/

 typedef struct tagMQOD MQOD;
 typedef MQOD  MQPOINTER PMQOD;
 typedef PMQOD MQPOINTER PPMQOD;

 struct tagMQOD {
   MQCHAR4   StrucId;              /* Structure identifier */
   MQLONG    Version;              /* Structure version number */
   MQLONG    ObjectType;           /* Object type */
   MQCHAR48  ObjectName;           /* Object name */
   MQCHAR48  ObjectQMgrName;       /* Object queue manager name */
   MQCHAR48  DynamicQName;         /* Dynamic queue name */
   MQCHAR12  AlternateUserId;      /* Alternate user identifier */
   MQLONG    RecsPresent;          /* Number of object records
                                      present */
   MQLONG    KnownDestCount;       /* Number of local queues opened
                                      successfully */
   MQLONG    UnknownDestCount;     /* Number of remote queues opened
                                      successfully */
   MQLONG    InvalidDestCount;     /* Number of queues that failed to
                                      open */
   MQLONG    ObjectRecOffset;      /* Offset of first object record from
                                      start of MQOD */
   MQLONG    ResponseRecOffset;    /* Offset of first response record
                                      from start of MQOD */
   MQPTR     ObjectRecPtr;         /* Address of first object record */
   MQPTR     ResponseRecPtr;       /* Address of first response
                                      record */
   MQBYTE40  AlternateSecurityId;  /* Alternate security identifier */
   MQCHAR48  ResolvedQName;        /* Resolved queue name */
   MQCHAR48  ResolvedQMgrName;     /* Resolved queue manager name */
 };

 #define MQOD_DEFAULT {MQOD_STRUC_ID_ARRAY},\
                      MQOD_VERSION_1,\
                      MQOT_Q,\
                      {""},\
                      {""},\
                      {"AMQ.*"},\
                      {""},\
                      0,\
                      0,\
                      0,\
                      0,\
                      0,\
                      0,\
                      NULL,\
                      NULL,\
                      {MQSID_NONE_ARRAY},\
                      {""},\
                      {""}


 /*********************************************************************/
 /*  MQOR Structure -- Object Record                                  */
 /*********************************************************************/

 typedef struct tagMQOR MQOR;
 typedef MQOR MQPOINTER PMQOR;

 struct tagMQOR {
   MQCHAR48  ObjectName;      /* Object name */
   MQCHAR48  ObjectQMgrName;  /* Object queue manager name */
 };

 #define MQOR_DEFAULT {""},\
                      {""}


 /*********************************************************************/
 /*  MQPMO Structure -- Put Message Options                           */
 /*********************************************************************/

 typedef struct tagMQPMO MQPMO;
 typedef MQPMO  MQPOINTER PMQPMO;
 typedef PMQPMO MQPOINTER PPMQPMO;

 struct tagMQPMO {
   MQCHAR4   StrucId;            /* Structure identifier */
   MQLONG    Version;            /* Structure version number */
   MQLONG    Options;            /* Options that control the action of
                                    MQPUT and MQPUT1 */
   MQLONG    Timeout;            /* Reserved */
   MQHOBJ    Context;            /* Object handle of input queue */
   MQLONG    KnownDestCount;     /* Number of messages sent successfully
                                    to local queues */
   MQLONG    UnknownDestCount;   /* Number of messages sent successfully
                                    to remote queues */
   MQLONG    InvalidDestCount;   /* Number of messages that could not be
                                    sent */
   MQCHAR48  ResolvedQName;      /* Resolved name of destination
                                    queue */
   MQCHAR48  ResolvedQMgrName;   /* Resolved name of destination queue
                                    manager */
   MQLONG    RecsPresent;        /* Number of put message records or
                                    response records present */
   MQLONG    PutMsgRecFields;    /* Flags indicating which MQPMR fields
                                    are present */
   MQLONG    PutMsgRecOffset;    /* Offset of first put message record
                                    from start of MQPMO */
   MQLONG    ResponseRecOffset;  /* Offset of first response record from
                                    start of MQPMO */
   MQPTR     PutMsgRecPtr;       /* Address of first put message
                                    record */
   MQPTR     ResponseRecPtr;     /* Address of first response record */
 };

 #define MQPMO_DEFAULT {MQPMO_STRUC_ID_ARRAY},\
                       MQPMO_VERSION_1,\
                       MQPMO_NONE,\
                       (-1),\
                       0,\
                       0,\
                       0,\
                       0,\
                       {""},\
                       {""},\
                       0,\
                       MQPMRF_NONE,\
                       0,\
                       0,\
                       NULL,\
                       NULL


 /*********************************************************************/
 /*  MQRFH Structure -- Rules and Formatting Header                   */
 /*********************************************************************/

 typedef struct tagMQRFH MQRFH;
 typedef MQRFH MQPOINTER PMQRFH;

 struct tagMQRFH {
   MQCHAR4  StrucId;         /* Structure identifier */
   MQLONG   Version;         /* Structure version number */
   MQLONG   StrucLength;     /* Total length of MQRFH including
                                NameValueString */
   MQLONG   Encoding;        /* Numeric encoding of data that follows
                                NameValueString */
   MQLONG   CodedCharSetId;  /* Character set identifier of data that
                                follows NameValueString */
   MQCHAR8  Format;          /* Format name of data that follows
                                NameValueString */
   MQLONG   Flags;           /* Flags */
 };

 #define MQRFH_DEFAULT {MQRFH_STRUC_ID_ARRAY},\
                       MQRFH_VERSION_1,\
                       MQRFH_STRUC_LENGTH_FIXED,\
                       MQENC_NATIVE,\
                       MQCCSI_UNDEFINED,\
                       {MQFMT_NONE_ARRAY},\
                       MQRFH_NONE


 /*********************************************************************/
 /*  MQRFH2 Structure -- Rules and Formatting Header 2                */
 /*********************************************************************/

 typedef struct tagMQRFH2 MQRFH2;
 typedef MQRFH2 MQPOINTER PMQRFH2;

 struct tagMQRFH2 {
   MQCHAR4  StrucId;         /* Structure identifier */
   MQLONG   Version;         /* Structure version number */
   MQLONG   StrucLength;     /* Total length of MQRFH2 including all
                                NameValueLength and NameValueData
                                fields */
   MQLONG   Encoding;        /* Numeric encoding of data that follows
                                last NameValueData field */
   MQLONG   CodedCharSetId;  /* Character set identifier of data that
                                follows last NameValueData field */
   MQCHAR8  Format;          /* Format name of data that follows last
                                NameValueData field */
   MQLONG   Flags;           /* Flags */
   MQLONG   NameValueCCSID;  /* Character set identifier of
                                NameValueData */
 };

 #define MQRFH2_DEFAULT {MQRFH_STRUC_ID_ARRAY},\
                        MQRFH_VERSION_2,\
                        MQRFH_STRUC_LENGTH_FIXED_2,\
                        MQENC_NATIVE,\
                        MQCCSI_INHERIT,\
                        {MQFMT_NONE_ARRAY},\
                        MQRFH_NONE,\
                        1208


 /*********************************************************************/
 /*  MQRMH Structure -- Reference Message Header                      */
 /*********************************************************************/

 typedef struct tagMQRMH MQRMH;
 typedef MQRMH MQPOINTER PMQRMH;

 struct tagMQRMH {
   MQCHAR4   StrucId;             /* Structure identifier */
   MQLONG    Version;             /* Structure version number */
   MQLONG    StrucLength;         /* Total length of MQRMH, including
                                     strings at end of fixed fields, but
                                     not the bulk data */
   MQLONG    Encoding;            /* Numeric encoding of bulk data */
   MQLONG    CodedCharSetId;      /* Character set identifier of bulk
                                     data */
   MQCHAR8   Format;              /* Format name of bulk data */
   MQLONG    Flags;               /* Reference message flags */
   MQCHAR8   ObjectType;          /* Object type */
   MQBYTE24  ObjectInstanceId;    /* Object instance identifier */
   MQLONG    SrcEnvLength;        /* Length of source environment
                                     data */
   MQLONG    SrcEnvOffset;        /* Offset of source environment
                                     data */
   MQLONG    SrcNameLength;       /* Length of source object name */
   MQLONG    SrcNameOffset;       /* Offset of source object name */
   MQLONG    DestEnvLength;       /* Length of destination environment
                                     data */
   MQLONG    DestEnvOffset;       /* Offset of destination environment
                                     data */
   MQLONG    DestNameLength;      /* Length of destination object
                                     name */
   MQLONG    DestNameOffset;      /* Offset of destination object
                                     name */
   MQLONG    DataLogicalLength;   /* Length of bulk data */
   MQLONG    DataLogicalOffset;   /* Low offset of bulk data */
   MQLONG    DataLogicalOffset2;  /* High offset of bulk data */
 };

 #define MQRMH_DEFAULT {MQRMH_STRUC_ID_ARRAY},\
                       MQRMH_VERSION_1,\
                       0,\
                       MQENC_NATIVE,\
                       MQCCSI_UNDEFINED,\
                       {MQFMT_NONE_ARRAY},\
                       MQRMHF_NOT_LAST,\
                       {' ',' ',' ',' ',' ',' ',' ',' '},\
                       {MQOII_NONE_ARRAY},\
                       0,\
                       0,\
                       0,\
                       0,\
                       0,\
                       0,\
                       0,\
                       0,\
                       0,\
                       0,\
                       0


 /*********************************************************************/
 /*  MQRR Structure -- Response Record                                */
 /*********************************************************************/

 typedef struct tagMQRR MQRR;
 typedef MQRR MQPOINTER PMQRR;

 struct tagMQRR {
   MQLONG  CompCode;  /* Completion code for queue */
   MQLONG  Reason;    /* Reason code for queue */
 };

 #define MQRR_DEFAULT MQCC_OK,\
                      MQRC_NONE


 /*********************************************************************/
 /*  MQTM Structure -- Trigger Message                                */
 /*********************************************************************/

 typedef struct tagMQTM MQTM;
 typedef MQTM MQPOINTER PMQTM;

 struct tagMQTM {
   MQCHAR4    StrucId;      /* Structure identifier */
   MQLONG     Version;      /* Structure version number */
   MQCHAR48   QName;        /* Name of triggered queue */
   MQCHAR48   ProcessName;  /* Name of process object */
   MQCHAR64   TriggerData;  /* Trigger data */
   MQLONG     ApplType;     /* Application type */
   MQCHAR256  ApplId;       /* Application identifier */
   MQCHAR128  EnvData;      /* Environment data */
   MQCHAR128  UserData;     /* User data */
 };

 #define MQTM_DEFAULT {MQTM_STRUC_ID_ARRAY},\
                      MQTM_VERSION_1,\
                      {""},\
                      {""},\
                      {""},\
                      0,\
                      {""},\
                      {""},\
                      {""}


 /*********************************************************************/
 /*  MQTMC2 Structure -- Trigger Message 2 (Character)                */
 /*********************************************************************/

 typedef struct tagMQTMC2 MQTMC2;
 typedef MQTMC2 MQPOINTER PMQTMC2;

 struct tagMQTMC2 {
   MQCHAR4    StrucId;      /* Structure identifier */
   MQCHAR4    Version;      /* Structure version number */
   MQCHAR48   QName;        /* Name of triggered queue */
   MQCHAR48   ProcessName;  /* Name of process object */
   MQCHAR64   TriggerData;  /* Trigger data */
   MQCHAR4    ApplType;     /* Application type */
   MQCHAR256  ApplId;       /* Application identifier */
   MQCHAR128  EnvData;      /* Environment data */
   MQCHAR128  UserData;     /* User data */
   MQCHAR48   QMgrName;     /* Queue manager name */
 };

 #define MQTMC2_DEFAULT {MQTMC_STRUC_ID_ARRAY},\
                        {MQTMC_VERSION_2_ARRAY},\
                        {""},\
                        {""},\
                        {""},\
                        {""},\
                        {""},\
                        {""},\
                        {""},\
                        {""}


 /*********************************************************************/
 /*  MQWIH Structure -- Work Information Header                       */
 /*********************************************************************/

 typedef struct tagMQWIH MQWIH;
 typedef MQWIH MQPOINTER PMQWIH;

 struct tagMQWIH {
   MQCHAR4   StrucId;         /* Structure identifier */
   MQLONG    Version;         /* Structure version number */
   MQLONG    StrucLength;     /* Length of MQWIH structure */
   MQLONG    Encoding;        /* Numeric encoding of data that follows
                                 MQWIH */
   MQLONG    CodedCharSetId;  /* Character-set identifier of data that
                                 follows MQWIH */
   MQCHAR8   Format;          /* Format name of data that follows
                                 MQWIH */
   MQLONG    Flags;           /* Flags */
   MQCHAR32  ServiceName;     /* Service name */
   MQCHAR8   ServiceStep;     /* Service step name */
   MQBYTE16  MsgToken;        /* Message token */
   MQCHAR32  Reserved;        /* Reserved */
 };

 #define MQWIH_DEFAULT {MQWIH_STRUC_ID_ARRAY},\
                       MQWIH_VERSION_1,\
                       MQWIH_LENGTH_1,\
                       0,\
                       MQCCSI_UNDEFINED,\
                       {MQFMT_NONE_ARRAY},\
                       MQWIH_NONE,\
                       {' ',' ',' ',' ',' ',' ',' ',' ',\
                       ' ',' ',' ',' ',' ',' ',' ',' ',\
                       ' ',' ',' ',' ',' ',' ',' ',' ',\
                       ' ',' ',' ',' ',' ',' ',' ',' '},\
                       {' ',' ',' ',' ',' ',' ',' ',' '},\
                       {MQMTOK_NONE_ARRAY},\
                       {' ',' ',' ',' ',' ',' ',' ',' ',\
                       ' ',' ',' ',' ',' ',' ',' ',' ',\
                       ' ',' ',' ',' ',' ',' ',' ',' ',\
                       ' ',' ',' ',' ',' ',' ',' ',' '}


 /*********************************************************************/
 /*  MQXQH Structure -- Transmission Queue Header                     */
 /*********************************************************************/

 typedef struct tagMQXQH MQXQH;
 typedef MQXQH MQPOINTER PMQXQH;

 struct tagMQXQH {
   MQCHAR4   StrucId;         /* Structure identifier */
   MQLONG    Version;         /* Structure version number */
   MQCHAR48  RemoteQName;     /* Name of destination queue */
   MQCHAR48  RemoteQMgrName;  /* Name of destination queue manager */
   MQMD1     MsgDesc;         /* Original message descriptor */
 };

 #define MQXQH_DEFAULT {MQXQH_STRUC_ID_ARRAY},\
                       MQXQH_VERSION_1,\
                       {""},\
                       {""},\
                       {MQMD1_DEFAULT}


 /*********************************************************************/
 /*  MQBACK Function -- Back Out Changes                              */
 /*********************************************************************/

 void MQENTRY MQBACK (
   MQHCONN  Hconn,      /* Connection handle */
   PMQLONG  pCompCode,  /* Completion code */
   PMQLONG  pReason);   /* Reason code qualifying CompCode */


 /*********************************************************************/
 /*  MQBEGIN Function -- Begin Unit of Work                           */
 /*********************************************************************/

 void MQENTRY MQBEGIN (
   MQHCONN  Hconn,          /* Connection handle */
   PMQVOID  pBeginOptions,  /* Options that control the action of
                               MQBEGIN */
   PMQLONG  pCompCode,      /* Completion code */
   PMQLONG  pReason);       /* Reason code qualifying CompCode */


 /*********************************************************************/
 /*  MQCLOSE Function -- Close Object                                 */
 /*********************************************************************/

 void MQENTRY MQCLOSE (
   MQHCONN  Hconn,      /* Connection handle */
   PMQHOBJ  pHobj,      /* Object handle */
   MQLONG   Options,    /* Options that control the action of MQCLOSE */
   PMQLONG  pCompCode,  /* Completion code */
   PMQLONG  pReason);   /* Reason code qualifying CompCode */


 /*********************************************************************/
 /*  MQCMIT Function -- Commit Changes                                */
 /*********************************************************************/

 void MQENTRY MQCMIT (
   MQHCONN  Hconn,      /* Connection handle */
   PMQLONG  pCompCode,  /* Completion code */
   PMQLONG  pReason);   /* Reason code qualifying CompCode */


 /*********************************************************************/
 /*  MQCONN Function -- Connect Queue Manager                         */
 /*********************************************************************/

 void MQENTRY MQCONN (
   PMQCHAR   pQMgrName,  /* Name of queue manager */
   PMQHCONN  pHconn,     /* Connection handle */
   PMQLONG   pCompCode,  /* Completion code */
   PMQLONG   pReason);   /* Reason code qualifying CompCode */


 /*********************************************************************/
 /*  MQCONNX Function -- Connect Queue Manager (Extended)             */
 /*********************************************************************/

 void MQENTRY MQCONNX (
   PMQCHAR   pQMgrName,     /* Name of queue manager */
   PMQCNO    pConnectOpts,  /* Options that control the action of
                               MQCONNX */
   PMQHCONN  pHconn,        /* Connection handle */
   PMQLONG   pCompCode,     /* Completion code */
   PMQLONG   pReason);      /* Reason code qualifying CompCode */


 /*********************************************************************/
 /*  MQDISC Function -- Disconnect Queue Manager                      */
 /*********************************************************************/

 void MQENTRY MQDISC (
   PMQHCONN  pHconn,     /* Connection handle */
   PMQLONG   pCompCode,  /* Completion code */
   PMQLONG   pReason);   /* Reason code qualifying CompCode */


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
   PMQLONG  pReason);      /* Reason code qualifying CompCode */


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
   PMQLONG  pReason);        /* Reason code qualifying CompCode */


 /*********************************************************************/
 /*  MQOPEN Function -- Open Object                                   */
 /*********************************************************************/

 void MQENTRY MQOPEN (
   MQHCONN  Hconn,      /* Connection handle */
   PMQVOID  pObjDesc,   /* Object descriptor */
   MQLONG   Options,    /* Options that control the action of MQOPEN */
   PMQHOBJ  pHobj,      /* Object handle */
   PMQLONG  pCompCode,  /* Completion code */
   PMQLONG  pReason);   /* Reason code qualifying CompCode */


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
   PMQLONG  pReason);      /* Reason code qualifying CompCode */


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
   PMQLONG  pReason);      /* Reason code qualifying CompCode */


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
   PMQLONG  pReason);        /* Reason code qualifying CompCode */


 #if defined(__cplusplus)
   }
 #endif

 /*********************************************************************/
 /*  End of CMQC                                                      */
 /*********************************************************************/
 #endif  /* End of header file */

