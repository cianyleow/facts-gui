/* jshint quotmark: double */
define([], function() {
    "use strict";
    return {
        "api/assignments": [
            {
                "assignmentId":9,
                "name":"Last Assignment",
                "description":"Write with your heart",
                "creationTime":"2016-04-02",
                "dueTime":"2016-04-23",
                "openTime":null
            }
        ],
        "api/requiredFiles": [
            {
                "fileRequirementId":19,
                "fileName":"writing",
                "maxFileSize":1048576,
                "allowedExtension":"pdf"
            }, {
                "fileRequirementId":20,
                "fileName":"presentation",
                "maxFileSize":1048576,
                "allowedExtension":"pdf"
            }
        ],
        "api/markComponents": [
            {
                "markComponentId":26,
                "maxMark":3,
                "name":"Content",
                "description":null
            },{
                "markComponentId":27,
                "maxMark":6,
                "name":"Voice",
                "description":null
            }
        ],
        "api/files": [
            {
                "fileId":5,
                "name":"spec-475-6-0",
                "extension":"pdf",
                "contentType":"application/pdf",
                "size":81931,
                "hash":"cd0f2f501ae9fe34c839a32b46a47652c0d44aaf2b5c48563d29e67ff9d72056",
                "creationTime":"2016-04-02",
            }
        ],
        "api/feedback": [

        ],
        "api/submissions": [
            {
                "submissionId": 1
            }
        ],
        "api/marks": [

        ],
        "api/comments": [

        ]
    };
});