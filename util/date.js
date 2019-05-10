/**
 * 获得一个当前时间的整数时间戳
 *
 * @returns {number} 时间戳
 * @export
 */
export const nowtstamp = Date.now || function () {
  return new Date().getTime()
}

/**
 * 判断是否是同一天
 *
 * @example
 *  let data1 = new Date('2018-05-01')
 *  let data2 = new Date('2018-05-02')
 *  isSameDay(date1, date2)     // false
 *
 * @export
 * @param {Date} date1 待判断的时间
 * @param {Date} [date2=new Date()] 被判断的时间，默认为当天
 * @returns {boolean} true为同一天，否则不是同一天
 */
export function isSameDay (date1, date2 = new Date()) {
  let d1Y = date1.getFullYear()
  let d1M = date1.getMonth() + 1
  let d1D = date1.getDate()
  let d2Y = date2.getFullYear()
  let d2M = date2.getMonth() + 1
  let d2D = date2.getDate()

  return d1Y === d2Y && d1M === d2M && d1D === d2D
}

/**
 * 格式化时间
 *
 * @example
 *  formatTime('2018-03-03 12:12:12', 'yyyy/MM/dd hh:mm:ss') // 2018/03/03 12:12:12
 *  formatTime(1520035200000, 'yyyy/MM/dd hh:mm:ss') // 2018/03/03 08:00:00
 *
 * @export
 * @param {string|number} time  时间字符串或者时间戳（'2018-03-03' | 1520035200000）
 * @param {string} format ['yyyy年MM月dd日hh小时mm分ss秒']
 * @returns
 */
export function formatTime (time, format) {
  let t = new Date(time)
	let o = {
		'M+': t.getMonth() + 1, // month
		'd+': t.getDate(), // day
		'h+': t.getHours(), // hour
		'm+': t.getMinutes(), // minute
		's+': t.getSeconds(), // second
		'q+': Math.floor((t.getMonth() + 3) / 3), // quarter
		'S': t.getMilliseconds() // millisecond
	}
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (t.getFullYear() + '').substr(4 - RegExp.$1.length))
	}

	for (var k in o) {
		if (new RegExp('(' + k + ')').test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length === 1
				? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
		}
	}

	return format
}

/**
 * 相对时间
 *
 * @example
 *  const time = new Date().getTime()
 *  pastTimeDiffNow(time)             // 刚刚
 *
 * @export
 * @param {date string | timestamp} pasttime 过去时间
 * @param {string} [ymd='yyyy/MM/dd'] 格式化时间的年月日
 * @returns {string} 过去相对于现在的时间
 */
export function pastTimeDiffNow (pasttime, ymd = 'yyyy/MM/dd') {
  let nowTime = new Date().getTime()
  let timeDiff = nowTime - new Date(pasttime).getTime()
  let sec = Math.floor(timeDiff / 1000)
  let min = Math.floor(timeDiff / (1000 * 60))
  let hour = Math.floor(timeDiff / (1000 * 60 * 60))
  let day = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  let month = Math.floor(day / 30)
  let year = Math.floor(month / 12)

  if (year || month) return formatTime(pasttime, ymd + ' hh:mm:ss')
  if (day === 1) {
    return '昨天 ' + formatTime(pasttime, 'hh:mm:ss')
  } else if (day === 2) {
    return '前天 ' + formatTime(pasttime, 'hh:mm:ss')
  } else if (day > 2)  {
    return (day + 1) + ' 天前'
  }
  if (hour) return hour + ' 小时前'
  if (min < 30 && min > 0) {
    return '半小时前'
  } else if (min >= 30) {
    return min + ' 分钟前'
  }
  if (sec) {
    return sec + ' 秒前'
  } else {
    return '刚刚'
  }
}
