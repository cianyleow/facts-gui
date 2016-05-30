/* jshint quotmark: double */
define([], function() {
    "use strict";
    return {
        "api/courses": [
            {
                "courseId": 1,
                "assignments": [
                    {
                        "assignmentId":9,
                        "name":"Last Assignment",
                        "description":"Write with your heart",
                        "creationTime":"2016-04-02",
                        "dueTime":"2016-04-23",
                        "openTime":null,
                        "requiredFiles": [
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
                        "suppliedFiles": [
                            {
                                "fileId":5,
                                "name":"spec-475-6-0",
                                "extension":"pdf",
                                "contentType":"application/pdf",
                                "size":81931,
                                "hash":"cd0f2f501ae9fe34c839a32b46a47652c0d44aaf2b5c48563d29e67ff9d72056",
                                "creationTime":"2016-04-02"
                            }
                        ]
                    }
                ]
            }
        ],
        "api/assignments": [
            {
                "assignmentId":9,
                "name":"Last Assignment",
                "description":"Write with your heart",
                "creationTime":"2016-04-02",
                "dueTime":"2016-04-23",
                "openTime":null,
                "requiredFiles": [
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
                "suppliedFiles": [
                    {
                        "fileId":5,
                        "name":"spec-475-6-0",
                        "extension":"pdf",
                        "contentType":"application/pdf",
                        "size":81931,
                        "hash":"cd0f2f501ae9fe34c839a32b46a47652c0d44aaf2b5c48563d29e67ff9d72056",
                        "creationTime":"2016-04-02"
                    }
                ]
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
                "creationTime":"2016-04-02"
            }
        ],
        "api/feedback": [
            {
                "mark": 0,
                "assignment": {
                    "assignmentId":9,
                    "name":"Last Assignment",
                    "description":"Write with your heart",
                    "creationTime":"2016-04-02",
                    "dueTime":"2016-04-23",
                    "openTime":null,
                    "requiredFiles": [
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
                    "suppliedFiles": [
                        {
                            "fileId":5,
                            "name":"spec-475-6-0",
                            "extension":"pdf",
                            "contentType":"application/pdf",
                            "size":81931,
                            "hash":"cd0f2f501ae9fe34c839a32b46a47652c0d44aaf2b5c48563d29e67ff9d72056",
                            "creationTime":"2016-04-02"
                        }
                    ]
                },
                "submission": {
                    "submissionId": 1
                },
                "comments": [
                    {
                        "commentId": 1,
                        "title": "Title",
                        "content": "Content",
                        "secret": false
                    },
                    {
                        "commentId": 2,
                        "title": "Title",
                        "content": "Content",
                        "secret": true
                    }
                ]
            }

        ],
        "api/submissions": [
            {
                "submissionId": 1
            }
        ],
        "api/enrollments": [
            {
                enrollmentId: 1,
                enrollmentLevel: 'SUBMISSION_CREDIT',
                student: {
                    firstName: 'First',
                    lastName: 'Last'
                }
            },
            {
                enrollmentId: 2,
                enrollmentLevel: 'SUBMISSION_CREDIT',
                student: {
                    firstName: 'First',
                    lastName: 'Last'
                }
            },
            {
                enrollmentId: 3,
                enrollmentLevel: 'SUBMISSION_CREDIT',
                student: {
                    firstName: 'First',
                    lastName: 'Last'
                }
            }
        ]

    };
});