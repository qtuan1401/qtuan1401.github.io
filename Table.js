const today = new Date();
const nDays = 2; // number of next saturday 
const nextSaturday = []; // next saturdays from 0 (nearest to further)

function createSaturday() {
  if (nDays === 0)
    return ;
  // nearest saturday
  nextSaturday[0] = new Date();
  nextSaturday[0].setDate(today.getDate() + (6 - today.getDay()));

  for (let i = 1; i < nDays; i++) {
    nextSaturday[i] = new Date(nextSaturday[i - 1]);
    nextSaturday[i].setDate(nextSaturday[i - 1].getDate() + 7);
  }
}

function printDate(date, day = '') {
  const mm = ('0' + (date.getMonth() + 1)).slice(-2);
  const dd = ('0' + date.getDate()).slice(-2);
  const yyyy = date.getFullYear();
  if (day !== '')
    day = ` (${day})`;
  return `${yyyy}-${mm}-${dd}${day}`;
}

function printTime(date, time, timeZone = -7) {
  let hh = time.slice(0, 2);
  let mm = time.slice(3, 5);
  let ss = time.slice(6);

  const contestDate = new Date(date);
  contestDate.setHours(hh);
  contestDate.setMinutes(mm);
  contestDate.setSeconds(ss);

  // convert to local time zone
  const diff = (contestDate.getTimezoneOffset() / 60 - timeZone) * 60 * 60 * 1000;
  contestDate.setTime(contestDate.getTime() - diff);

  // output time
  hh = ('0' + contestDate.getHours()).slice(-2);
  mm = ('0' + contestDate.getMinutes()).slice(-2);
  ss = ('0' + contestDate.getSeconds()).slice(-2);
  return `${printDate(contestDate)} ${hh}:${mm}:${ss} UTC+${(-contestDate.getTimezoneOffset() / 60)} (${Math.trunc(contestDate.getTime() / 1000)})`;
}

function createTime() {
  createSaturday();
  const timetable = document.querySelectorAll('.d');

  for (let i = 0; i < timetable.length; i++) {
    timetable[i].querySelector('.day').textContent = printDate(nextSaturday[i], 'Thứ bảy');
    timetable[i].querySelector('.contestStartTime').textContent = printTime(nextSaturday[i], '19:30:00');
    timetable[i].querySelector('.contestEndTime').textContent = printTime(nextSaturday[i], '22:30:00');
  }
}

function createTable() {
  let s = "";
  s += '<table border="1">';
  s += `
    <tr>
      <th>Ngày</th>
      <th>Thời gian bắt đầu</th>
      <th>Thời gian kết thúc</th>
    </tr>
  `;
  // create table rows
  for (let i = 0; i < nDays; i++) {
    s += `
      <tr class="d">
        <td class="day"></td>
        <td class="contestStartTime"></td>
        <td class="contestEndTime"></td>
      </tr>
    `;
  }
  s += "</table>";
  return s;
}

export function renderTable(html) {
  html.innerHTML = createTable();
  createTime();
}