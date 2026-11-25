const fs = require("fs");

const cases = [
    {
        id: "TC01",
        name: "Successful Registration",
        student: { status: "active", coursesTaken: ["CS201"] },
        course: { prerequisites: ["CS201"] },
        status: 201,
        result: "OK"
    },
    {
        id: "TC02",
        name: "No Student",
        student: null,
        course: { prerequisites: ["CS201"] },
        status: 200,
        result: "ERROR_NO_STUDENT"
    },
    {
        id: "TC03",
        name: "Inactive Student",
        student: { status: "inactive", coursesTaken: ["CS201"] },
        course: { prerequisites: ["CS201"] },
        status: 200,
        result: "ERROR_INACTIVE_STUDENT"
    },
    {
        id: "TC04",
        name: "No Course",
        student: { status: "active", coursesTaken: ["CS201"] },
        course: null,
        status: 200,
        result: "ERROR_NO_COURSE"
    },
    {
        id: "TC05",
        name: "Missing Prerequisites",
        student: { status: "active", coursesTaken: ["CS101"] },
        course: { prerequisites: ["CS201"] },
        status: 200,
        result: "ERROR_PREREQUISITES",
        missing: ["CS201"]
    },
    {
        id: "TC06",
        name: "Student and Course Missing",
        student: null,
        course: null,
        status: 200,
        result: "ERROR_NO_STUDENT"
    },
    {
        id: "TC07",
        name: "Inactive Student and No Course",
        student: { status: "inactive", coursesTaken: ["CS201"] },
        course: null,
        status: 200,
        result: "ERROR_INACTIVE_STUDENT"
    },
    {
        id: "TC08",
        name: "No Prerequisites",
        student: { status: "active", coursesTaken: [] },
        course: { prerequisites: [] },
        status: 201,
        result: "OK"
    },
    {
        id: "TC09",
        name: "Partial Prerequisites",
        student: { status: "active", coursesTaken: ["CS201"] },
        course: { prerequisites: ["CS201", "CS202"] },
        status: 200,
        result: "ERROR_PREREQUISITES",
        missing: ["CS202"]
    },
    {
        id: "TC10",
        name: "Empty Courses Taken",
        student: { status: "active", coursesTaken: [] },
        course: { prerequisites: ["CS201"] },
        status: 200,
        result: "ERROR_PREREQUISITES",
        missing: ["CS201"]
    },
    {
        id: "TC11",
        name: "Missing Student ID",
        student: null,
        course: { prerequisites: [] },
        omitStudentID: true,
        status: 400,
        result: "ERROR_BAD_REQUEST"
    },
    {
        id: "TC12",
        name: "Invalid JSON",
        student: { status: "active", coursesTaken: ["CS201"] },
        course: { prerequisites: ["CS201"] },
        invalidJSON: true,
        status: 400,
        result: "ERROR_BAD_JSON"
    }
];

function request(name, method, path, body, tests = []) {
    const item = {
        name,
        request: {
            method,
            header: [
                {
                    key: "Content-Type",
                    value: "application/json"
                }
            ],
            url: "{{baseUrl}}" + path,
            body: {
                mode: "raw",
                raw: typeof body === "string"
                    ? body
                    : JSON.stringify(body, null, 2),
                options: {
                    raw: { language: "json" }
                }
            }
        }
    };

    if (tests.length) {
        item.event = [{
            listen: "test",
            script: {
                type: "text/javascript",
                exec: tests
            }
        }];
    }

    return item;
}

function setupTests() {
    return [
        'pm.test("Setup status is 200", function () {',
        '    pm.response.to.have.status(200);',
        '});',
        'pm.test("Setup result is OK", function () {',
        '    pm.expect(pm.response.json().result).to.eql("OK");',
        '});'
    ];
}

function createCase(tc) {
    const studentID = tc.student
        ? `B232270144_${tc.id}`
        : `UNKNOWN_STUDENT_${tc.id}`;

    const courseID = tc.course
        ? `CS313_${tc.id}`
        : `UNKNOWN_COURSE_${tc.id}`;

    const items = [];

    if (tc.student) {
        items.push(request(
            `${tc.id} - Setup Student`,
            "PUT",
            `/students/${studentID}`,
            tc.student,
            setupTests()
        ));
    }

    if (tc.course) {
        items.push(request(
            `${tc.id} - Setup Course`,
            "PUT",
            `/courses/${courseID}`,
            tc.course,
            setupTests()
        ));
    }

    let body = { studentID, courseID };

    if (tc.omitStudentID) {
        delete body.studentID;
    }

    if (tc.invalidJSON) {
        body = '{"studentID":';
    }

    const tests = [
        `pm.test("Status code is ${tc.status}", function () {`,
        `    pm.response.to.have.status(${tc.status});`,
        '});',
        `pm.test("Result is ${tc.result}", function () {`,
        `    pm.expect(pm.response.json().result).to.eql("${tc.result}");`,
        '});'
    ];

    if (tc.result === "OK") {
        tests.push(
            'pm.test("Registration ID is a number", function () {',
            '    pm.expect(pm.response.json().registrationID).to.be.a("number");',
            '});'
        );
    }

    if (tc.missing) {
        tests.push(
            'pm.test("Missing prerequisites are correct", function () {',
            `    pm.expect(pm.response.json().missing).to.eql(${JSON.stringify(tc.missing)});`,
            '});'
        );
    }

    items.push(request(
        `${tc.id} - ${tc.name}`,
        "POST",
        "/registrations",
        body,
        tests
    ));

    return {
        name: `${tc.id} - ${tc.name}`,
        item: items
    };
}

const collection = {
    info: {
        name: "Lab05 - API System Testing",
        description: "12 independent API registration test cases",
        schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    variable: [
        {
            key: "baseUrl",
            value: "http://localhost:3000",
            type: "string"
        }
    ],
    item: cases.map(createCase)
};

fs.writeFileSync(
    "lab05-collection.json",
    JSON.stringify(collection, null, 2),
    "utf8"
);

console.log("Collection generated successfully.");
console.log(`Total test cases: ${cases.length}`);