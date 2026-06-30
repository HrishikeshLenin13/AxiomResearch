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
 */

const SPREADSHEET_ID = "PASTE_YOUR_SHEET_ID_HERE";
const STUDENTS_SHEET = "Students";
const EVENTS_SHEET = "Events";

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
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const students = ss.getSheetByName(STUDENTS_SHEET);
    const events = ss.getSheetByName(EVENTS_SHEET);

    if (!students || !events) {
      setup();
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Run setup() first" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const email = String(body.email || "").trim().toLowerCase();
    if (!email) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Missing email" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const completed = Number(body.completedModules || 0);
    const total = Number(body.totalModules || 8);
    const progressPct = total > 0 ? Math.round((completed / total) * 100) : 0;
    const timeMin = Number(body.timeSpentMinutes || 0);
    const modulesPassed = (body.modulesPassed || []).join(", ");
    const scoresJson = JSON.stringify(body.moduleScores || {});
    const now = new Date();
    const status = completed >= total ? "Complete" : completed > 0 ? "In progress" : "Started";

    upsertStudent(students, {
      email,
      name: String(body.name || ""),
      uid: String(body.uid || ""),
      completed,
      total,
      progressPct,
      timeMin,
      modulesPassed,
      scoresJson,
      lastActive: String(body.lastActive || now.toISOString()),
      event: String(body.event || "progress"),
      now,
      status,
    });

    events.appendRow([
      now,
      String(body.event || "progress"),
      email,
      String(body.name || ""),
      completed,
      timeMin,
      modulesPassed,
      scoresJson,
    ]);

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

function doGet() {
  return ContentService.createTextOutput("Axiom course tracker is running.")
    .setMimeType(ContentService.MimeType.TEXT);
}
