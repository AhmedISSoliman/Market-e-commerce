/*!
 * NumberToArabicWords (https://mahmoudshahin1111.github.io/numbers-to-arabic-words/)
 * Copyright 2022 The NumberToArabicWords Authors (https://github.com/mahmoudshahin1111/numbers-to-arabic-words/contributors)
 * Licensed under MIT (https://github.com/mahmoudshahin1111/numbers-to-arabic-words/blob/master/LICENSE)
 */

!(function () {
  'use strict'
  var e = {}
  !(function (e, r) {
    Object.defineProperty(r, '__esModule', { value: !0 }),
      (r.toArabicWord =
        r.arabicWord =
        r.ArabicWord =
        r.NumberSection =
        r.ArabicWordConfig =
        void 0)
    var t = (function () {
      function e() {
        ; (this.config = {
          delimiter: 'فاصل',
          numberSectionsDelimiter: 'و',
          get tensPrefix() {
            return 'ون'
          },
        }),
          (this.numbers = {
            0: 'صفر',
            1: 'واحد',
            2: 'أثنان',
            3: 'ثلاث',
            4: 'أربع',
            5: 'خمس',
            6: 'ست',
            7: 'سبع',
            8: 'ثمان',
            9: 'تسع',
            10: 'عشر',
            11: 'إحدى عشر',
            12: 'إثنا عشر',
            20: 'عشرون',
            100: 'مائة',
            200: 'مائتان',
            '1e3': 'ألف',
            '2e3': 'ألفين',
            '3e3-1e4': 'آلاف',
            '1e4+': 'ألف',
            '1e6': 'مليون',
            '2e6': 'مليونان',
            '3e6-1e7': 'ملاين',
            '1e7+': 'مليون',
            '1e9': 'مليار',
            '2e9': 'ملياران',
            '3e9-1e10': 'مليارات',
            '1e10+': 'مليار',
            '1e12': 'بليون',
            '2e12': 'بليونان',
            '3e12-1e13': 'بلايين',
            '1e13+': 'بليون',
            '1e15': 'تريليون',
            '2e15': 'تريليونان',
            '2e15-1e16': 'تريليونات',
            '1e16+': 'تريليون',
            '1e18': 'كوادرليون',
            '2e18': 'كوادرليونان',
            '2e18-1e19': 'كوادرليونات',
            '1e19+': 'كوادرليون',
          })
      }
      return (
        (e.prototype.overrideConfig = function (e) {
          delete e.tensPrefix,
            e.delimiter &&
            (e.delimiter = e.delimiter.replace(' ', '')),
            e.numberSectionsDelimiter &&
            (e.numberSectionsDelimiter =
              e.numberSectionsDelimiter.replace(' ', '')),
            (this.config = Object.assign(this.config, e))
        }),
        (e.prototype.getAll = function () {
          return this.config
        }),
        e
      )
    })()
    r.ArabicWordConfig = t
    var i = (function () {
      function e(e) {
        this.arabicWordConfig = e
      }
      return (
        (e.prototype.process = function (e) {
          return this.processSection(e).reverse()
        }),
        (e.prototype.processSection = function (e) {
          var r = this,
            t = this.splitIntoParts(e),
            i = []
          return (
            t.forEach(function (e, t) {
              var n = r.getWordByNumberSectionIndex(e, t)
              n && i.push(n)
            }),
            i
          )
        }),
        (e.prototype.splitIntoParts = function (e) {
          for (var r = [], t = e.length - 1; ;) {
            var i =
              (null != e[t - 2] ? e[t - 2] : '0') +
              (null != e[t - 1] ? e[t - 1] : '0') +
              (null != e[t] ? e[t] : '0')
            if ((r.push(i), t < 0)) break
            t -= 3
          }
          return r
        }),
        (e.prototype.getWordByNumberSectionIndex = function (e, r) {
          var t = Number(e),
            i = null
          if (0 == r) i = this.getWordForPart(e)
          else if (1 == t)
            i = this.arabicWordConfig.numbers['1e'.concat(3 * r)]
          else if (2 == t)
            i = this.arabicWordConfig.numbers['2e'.concat(3 * r)]
          else {
            var n = this.getWordForPart(e) + ' '
            t >= 3 && t <= 10
              ? (i = n +=
                this.arabicWordConfig.numbers[
                '3e'
                  .concat(3 * r, '-1e')
                  .concat(3 * r + 1)
                ])
              : t >= 11 &&
              (i = n +=
                this.arabicWordConfig.numbers[
                '1e'.concat(3 * r + 1, '+')
                ])
          }
          return i
        }),
        (e.prototype.getWordForPart = function (e) {
          var r = e[0],
            t = e[1],
            i = e[2],
            n = this.getWordForHundreds(r),
            o = t + i,
            s = Number(o),
            c = this.getWordForTens(o)
          return 0 == s
            ? n
            : n
              ? n +
              ' ' +
              this.arabicWordConfig.getAll()
                .numberSectionsDelimiter +
              ' ' +
              c
              : c
        }),
        (e.prototype.getWordForHundreds = function (e) {
          var r = Number(e),
            t = null
          return (
            1 == r
              ? (t = this.arabicWordConfig.numbers[100])
              : 2 == r
                ? (t = this.arabicWordConfig.numbers[200])
                : r >= 3 &&
                r <= 9 &&
                (t =
                  this.getWordFromThreeHundredToNineHundred(e)),
            t
          )
        }),
        (e.prototype.getWordFromThreeHundredToNineHundred = function (
          e
        ) {
          return (
            this.arabicWordConfig.numbers[e] +
            this.arabicWordConfig.numbers[100]
          )
        }),
        (e.prototype.getWordForTens = function (e) {
          var r = Number(e)
          return 0 == r
            ? this.arabicWordConfig.numbers[0]
            : r >= 1 && r <= 12
              ? this.arabicWordConfig.numbers[r]
              : r >= 13 && r <= 19
                ? this.getWordFromThirteenToNineTeen(e)
                : r >= 20 && r <= 99
                  ? this.getWordFromTwentyToNinetyNine(e)
                  : null
        }),
        (e.prototype.getWordFromThirteenToNineTeen = function (e) {
          return (
            this.arabicWordConfig.numbers[e[1]] +
            ' ' +
            this.arabicWordConfig.numbers[10]
          )
        }),
        (e.prototype.getWordFromTwentyToNinetyNine = function (e) {
          var r = e[0],
            t = e[1],
            i = Number(r),
            n = Number(t),
            o = null,
            s = null
          return (
            2 == i
              ? (o = this.arabicWordConfig.numbers[20])
              : i >= 3 &&
              i <= 9 &&
              (o =
                this.arabicWordConfig.numbers[r] +
                this.arabicWordConfig.getAll().tensPrefix),
            0 == n
              ? o
              : (i >= 1 && i <= 9
                ? (s = this.arabicWordConfig.numbers[t])
                : 10 === i
                  ? (s = this.arabicWordConfig.numbers[i])
                  : i >= 11 && i <= 12
                    ? (s = this.arabicWordConfig.numbers[e])
                    : i >= 13 &&
                    i <= 19 &&
                    (s = this.getWordFromThirteenToNineTeen(e)),
                s +
                (s
                  ? ' ' +
                  this.arabicWordConfig.getAll()
                    .numberSectionsDelimiter +
                  ' '
                  : '') +
                o)
          )
        }),
        e
      )
    })()
    r.NumberSection = i
    var n = (function () {
      function e(e) {
        ; (this.config = new t()),
          (this.numberSection = new i(this.config)),
          (this.delimiter = 'و'),
          e && this.setConfig(e)
      }
      return (
        (e.prototype.setConfig = function (e) {
          return this.config.overrideConfig(e), this
        }),
        (e.prototype.process = function (e) {
          var r = this.splitIntoSections(e)
          if (this.config.getAll().strict) {
            var t = {}
            return (
              r[0] &&
              (t.base = this.numberSection
                .process(r[0])
                .join(' '.concat(this.delimiter, ' '))),
              r[1] &&
              ((t.delimiter = this.config.getAll().delimiter),
                (t.reminder = this.numberSection
                  .process(r[1])
                  .join(' '.concat(this.delimiter, ' ')))),
              t
            )
          }
          var i = []
          if (r[0]) {
            var n = this.numberSection.process(r[0])
            i.push(n.join(' '.concat(this.delimiter, ' ')))
          }
          if (r[1]) {
            var o = this.numberSection.process(r[1])
            i.push(o.join(' '.concat(this.delimiter, ' ')))
          }
          return i.join(
            ' '.concat(this.config.getAll().delimiter, ' ')
          )
        }),
        (e.prototype.create = function () {
          return new e()
        }),
        (e.prototype.splitIntoSections = function (e) {
          return e.toString().split('.')
        }),
        e
      )
    })()
      ; (r.ArabicWord = n),
        (r.arabicWord = new n()),
        (r.toArabicWord = function (e) {
          return r.arabicWord.process(e)
        })
  })(0, e)
  var r = exports
  for (var t in e) r[t] = e[t]
  e.__esModule && Object.defineProperty(r, '__esModule', { value: !0 })
})()
//# sourceMappingURL=index-node.js.map
var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function inWords(num) {
  if ((num = num.toString()).length > 9) return 'overflow';
  n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return; var str = '';
  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
  str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
  return str;
}
