/**
 * Google Apps Script to Track Cell Edit History in Google Sheets
 * 
 * This script logs the date, time, and the editor's nickname each time a cell in any sheet is edited. 
 * The history is stored in the cell's note and will keep track of the last 5 edits.
 * 
 * To run this script, paste the entire code into the script editor in your Google Sheet 
 * (accessible via Extensions -> Apps Script).
 * The script will automatically run whenever a cell is edited, thanks to the onEdit trigger.
 *
 * Author: Your Name (Optional)
 * Last Updated: Insert Date (Optional)
 */
function onEdit(e) {
  // Logging details of the event
  Logger.log(e);
  Logger.log(JSON.stringify(e));

  // Get the active sheet
  var activeSheet = e.source.getActiveSheet();

  // Handling the edit
  handleEdit(e, activeSheet);
}

function handleEdit(e, activeSheet) {
  // Date format and maximum number of edits to track
  var dateFormat = "yyyy.MM.dd - HH:mm:ss"; 
  var maxEditHistory = 5;  // Logs the last 5 entries

  // Get the existing note and split it by line to get the history
  var editHistoryArray = e.range.getNote().split("\n");

  // Clean up the history format
  for (var i = 0; i < editHistoryArray.length; i++) {
    if (editHistoryArray[i].startsWith("→ ")) {
      editHistoryArray[i] = editHistoryArray[i].substring(2);
    }
  }

  // Limit the size of the history
  if (editHistoryArray.length >= maxEditHistory) {
    editHistoryArray.pop();  // Remove the oldest entry
  }

  // Add the new entry to the history
  editHistoryArray.unshift("→ " + Utilities.formatDate(new Date(), "GMT+1", dateFormat) + " by " + e.user.nickname);

  // Update the cell's note with the modified history
  e.range.setNote(editHistoryArray.slice(0, maxEditHistory).join("\n"));
}
