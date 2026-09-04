/**
 * Axiom Research Initiative — Course Tracker
 *
 * Setup:
 * 1. Create a Google Sheet
 * 2. Extensions → Apps Script → paste this file → Save
 * 3. Set SPREADSHEET_ID below to your sheet ID (from the URL)
 * 4. Run setup() once from the editor (authorize when prompted)
 * 5. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web App URL into your app .env as VITE_GOOGLE_SHEETS_WEBHOOK_URL
 *
 * Volunteers sheet upserts by Volunteer ID. Students/Events remain for older email-based rows.
 */

const SPREADSHEET_ID = "PASTE_YOUR_SHEET_ID_HERE";
const STUDENTS_SHEET = "Students";
const EVENTS_SHEET = "Events";
const VOLUNTEERS_SHEET = "Volunteers";

function setup() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let students = ss.getSheetByName(STUDENTS_SHEET);
  if (!students) students = ss.insertSheet(STUDENTS_SHEET);
  students.clear();
  students.getRange(1, 1, 1, 14).setValues([[
    "Email",
    "Name",
    "UID",
    "Completed Modules",
    "Total Modules",
    "Progress %",
    "Time Spent (min)",
    "Modules Passed",
    "Module Scores (JSON)",
    "Last Active",
    "Last Event",
    "Updated At",
    "Status",
    "Notes",
  ]]);

  let events = ss.getSheetByName(EVENTS_SHEET);
  if (!events) events = ss.insertSheet(EVENTS_SHEET);
  events.clear();
  events.getRange(1, 1, 1, 8).setValues([[
    "Timestamp",
    "Event",
    "Email",
    "Name",
    "Completed Modules",
    "Time Spent (min)",
    "Modules Passed",
    "Module Scores (JSON)",
  ]]);

  ensureVolunteersSheet(ss);
}

function volunteerHeaders() {
  return [
    "Volunteer ID",
    "First Name",
    "Last Name",
    "Status",
    "Progress %",
    "Modules Completed",
    "Lessons Viewed",
    "Average Quiz Grade",
    "Final Grade",
    "Current Module",
    "Started At",
    "Last Active",
    "Completed At",
    "Course Submitted",
    "Total Quiz Attempts",
    "Access Code Used",
  ];
}

function ensureVolunteersSheet(ss) {
  let volunteers = ss.getSheetByName(VOLUNTEERS_SHEET);
  if (!volunteers) {
    volunteers = ss.insertSheet(VOLUNTEERS_SHEET);
    volunteers.getRange(1, 1, 1, volunteerHeaders().length).setValues([volunteerHeaders()]);
    return volunteers;
  }
  if (volunteers.getLastRow() === 0) {
    volunteers.getRange(1, 1, 1, volunteerHeaders().length).setValues([volunteerHeaders()]);
  }
  return volunteers;
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let students = ss.getSheetByName(STUDENTS_SHEET);
    let events = ss.getSheetByName(EVENTS_SHEET);
    const volunteers = ensureVolunteersSheet(ss);

    if (!students || !events) {
      setup();
      students = ss.getSheetByName(STUDENTS_SHEET);
      events = ss.getSheetByName(EVENTS_SHEET);
    }

    const volunteerId = String(body.volunteerId || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const completed = Number(body.modulesCompleted || body.completedModules || 0);
    const total = Number(body.totalModules || 8);
    const progressPct = body.progressPct != null
      ? Number(body.progressPct)
      : (total > 0 ? Math.round((completed / total) * 100) : 0);
    const timeMin = Number(body.timeSpentMinutes || 0);
    const modulesPassed = (body.modulesPassed || []).join(", ");
    const scoresJson = JSON.stringify(body.moduleScores || {});
    const now = new Date();
    const eventName = String(body.event || "progress");
    const status = String(body.status || (
      eventName === "complete" || body.completedAt || body.courseSubmitted
        ? "Completed"
        : eventName === "restart"
          ? "Started"
          : completed > 0 ? "In progress" : "Started"
    ));

    if (volunteerId) {
      upsertVolunteer(volunteers, {
        volunteerId: volunteerId,
        firstName: String(body.firstName || ""),
        lastName: String(body.lastName || ""),
        status: status,
        progressPct: progressPct,
        modulesCompleted: completed,
        lessonsViewed: Number(body.lessonsViewed || body.lessonsCompleted || 0),
        averageQuizGrade: body.averageQuizGrade == null ? "" : body.averageQuizGrade,
        finalGrade: body.finalGrade == null ? "" : body.finalGrade,
        currentModule: String(body.currentModule || ""),
        startedAt: String(body.startedAt || ""),
        lastActive: String(body.lastActive || now.toISOString()),
        completedAt: String(body.completedAt || ""),
        courseSubmitted: body.courseSubmitted ? "Yes" : "No",
        totalQuizAttempts: Number(body.totalQuizAttempts || 0),
        accessCodeUsed: String(body.accessCodeUsed || ""),
      });
    }

    if (email && students) {
      upsertStudent(students, {
        email: email,
        name: String(body.name || ""),
        uid: String(body.uid || volunteerId || ""),
        completed: completed,
        total: total,
        progressPct: progressPct,
        timeMin: timeMin,
        modulesPassed: modulesPassed,
        scoresJson: scoresJson,
        lastActive: String(body.lastActive || now.toISOString()),
        event: eventName,
        now: now,
        status: status,
      });
    }

    if (events && (email || volunteerId)) {
      events.appendRow([
        now,
        eventName,
        email || volunteerId,
        String(body.name || [body.firstName, body.lastName].filter(Boolean).join(" ")),
        completed,
        timeMin,
        modulesPassed,
        scoresJson,
      ]);
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function upsertStudent(sheet, data) {
  const lastRow = sheet.getLastRow();
  const emails = lastRow > 1
    ? sheet.getRange(2, 1, lastRow - 1, 1).getValues().flat().map(function (v) { return String(v).toLowerCase(); })
    : [];
  const rowIndex = emails.indexOf(data.email);

  const row = [
    data.email,
    data.name,
    data.uid,
    data.completed,
    data.total,
    data.progressPct,
    data.timeMin,
    data.modulesPassed,
    data.scoresJson,
    data.lastActive,
    data.event,
    data.now,
    data.status,
    "",
  ];

  if (rowIndex === -1) {
    sheet.appendRow(row);
  } else {
    sheet.getRange(rowIndex + 2, 1, 1, row.length).setValues([row]);
  }
}

function upsertVolunteer(sheet, data) {
  const lastRow = sheet.getLastRow();
  const ids = lastRow > 1
    ? sheet.getRange(2, 1, lastRow - 1, 1).getValues().flat().map(function (v) { return String(v).trim(); })
    : [];
  const rowIndex = ids.indexOf(data.volunteerId);

  const row = [
    data.volunteerId,
    data.firstName,
    data.lastName,
    data.status,
    data.progressPct,
    data.modulesCompleted,
    data.lessonsViewed,
    data.averageQuizGrade,
    data.finalGrade,
    data.currentModule,
    data.startedAt,
    data.lastActive,
    data.completedAt,
    data.courseSubmitted,
    data.totalQuizAttempts,
    data.accessCodeUsed,
  ];

  if (rowIndex === -1) {
    sheet.appendRow(row);
  } else {
    sheet.getRange(rowIndex + 2, 1, 1, row.length).setValues([row]);
  }
}

function doGet() {
  return ContentService.createTextOutput("Axiom course tracker is running.")
    .setMimeType(ContentService.MimeType.TEXT);
}
