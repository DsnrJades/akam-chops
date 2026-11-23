/**
 * AKAM CHOPS ABUJA — ZERO-BACKEND EVENT INQUIRY BRIDGE
 * Saves every website event request into a Google Sheet AND emails Akamchopsabuja@gmail.com.
 *
 * SETUP (2 minutes, 100% free):
 * 1. Create a new Google Sheet named "Akam Chops Event Inquiries".
 * 2. Click Extensions -> Apps Script, delete any default code, and paste this entire file.
 * 3. Click Deploy -> New deployment -> Web app:
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 4. Copy the Web App URL and paste it into `.env.local` (and Vercel Env Vars) as:
 *      NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec
 */

const CLIENT_EMAIL = 'Akamchopsabuja@gmail.com';
const SHEET_NAME = 'Inquiries';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Timestamp',
        'Full Name',
        'Phone / WhatsApp',
        'Email',
        'Event Type',
        'Event Date',
        'Guest Count',
        'Venue / Area',
        'Selected Menu / Packages',
        'Notes',
      ]);
      sheet.getRange(1, 1, 1, 10).setFontWeight('bold');
    }

    sheet.appendRow([
      new Date(),
      data.fullName || '',
      data.phone || '',
      data.email || '',
      data.eventType || '',
      data.eventDate || '',
      data.guestCount || '',
      data.venue || '',
      data.selectedItems || '',
      data.notes || '',
    ]);

    const subject = `New Akam Chops Event Inquiry: ${data.eventType} (${data.guestCount})`;
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; color: #141210;">
        <h2 style="color: #E8521A;">New Event Catering Inquiry — Akam Chops</h2>
        <p>A customer just submitted an event request on the website:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;"><strong>Name</strong></td><td style="padding:8px;border-bottom:1px solid #eee;">${data.fullName}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;"><strong>Phone / WhatsApp</strong></td><td style="padding:8px;border-bottom:1px solid #eee;">${data.phone}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;"><strong>Email</strong></td><td style="padding:8px;border-bottom:1px solid #eee;">${data.email}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;"><strong>Event Type</strong></td><td style="padding:8px;border-bottom:1px solid #eee;">${data.eventType}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;"><strong>Event Date</strong></td><td style="padding:8px;border-bottom:1px solid #eee;">${data.eventDate}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;"><strong>Guest Count</strong></td><td style="padding:8px;border-bottom:1px solid #eee;">${data.guestCount}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;"><strong>Venue / Area</strong></td><td style="padding:8px;border-bottom:1px solid #eee;">${data.venue}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;"><strong>Selected Items</strong></td><td style="padding:8px;border-bottom:1px solid #eee;">${data.selectedItems}</td></tr>
          <tr><td style="padding:8px;"><strong>Notes</strong></td><td style="padding:8px;">${data.notes || 'None'}</td></tr>
        </table>
      </div>
    `;

    MailApp.sendEmail({
      to: CLIENT_EMAIL,
      replyTo: data.email || CLIENT_EMAIL,
      subject: subject,
      htmlBody: htmlBody,
    });

    return ContentService.createTextOutput(JSON.stringify({ status: 'ok' })).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
