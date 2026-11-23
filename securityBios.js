
  let hours, minutes, seconds;
  let day, month, year;
  let activeDisplay = 0; // 0 - System Time, 1 - System Date, 2 - Legacy Diskette A, 3 - Language
  let timeActivePart = 0; // 0 - часы, 1 - минуты, 2 - секунды
  let dateActivePart = 0; // 0 - день, 1 - месяц, 2 - год

  const timeParts = [
    document.getElementById("hoursPart"),
    document.getElementById("minutesPart"),
    document.getElementById("secondsPart"),
  ];

  const dateParts = [
    document.getElementById("dayPart"),
    document.getElementById("monthPart"),
    document.getElementById("yearPart"),
  ];
  // Массив элементов меню
const menuItems = [
  document.querySelector('.menu-item'), // Main (0)
  document.getElementById("octweak"), // OC Tweaker (1)
  document.getElementById("advans"), // Advanced (2)
  document.getElementById("powerr"), // H/W Monitor (3)
  document.getElementById("boott"), // Boot (4)
  document.getElementById("toolss"), // Security (5)
  document.getElementById("exitt") // Exit (6)
];
  // Массив элементов подтверждений
  const acceptMass = [
  enbledMass = "Enabled", // 0
  disabledMass =  "Disabled1", // 1  - Boot Failure Guard
  disabledMass =  "Enabled", // 2
  disabledMass =  "Disabled2", // 3 - Spread Spectrum
  disabledMass =  "568756", // 4
  disabledMass =  "210", // 5 - CPU Frequency (MHz)
  disabledMass =  "100", // 6 - PCIE Frequency (MHz)
  countGuard = "1", // 7 - Boot Failure Guard Count
  countGuard = "2", // 8 - Boot Failure Guard Count
  countGuard = "3", // 9 - Boot Failure Guard Count
  CoresAll = "All Cores", // 10 - CPU Active Core Control
  CoresAll = "One Core Per Unit", // 11 - CPU Active Core Control           
  CoresAll = "Two Cores", // 12 - CPU Active Core Control 
  CoresAll = "Four Cores", // 13 - CPU Active Core Control
  CoresAll = "Six Cores", // 14 - CPU Active Core Control
  AMDTurbo = "Disabled3", // 15 - AMDTurbo
  AMDTurbo = "Enabled", // 16 - AMDTurbo
  AMDTurbo = "Auto", // 17 - AMDTurbo
  AMDCsupp = "Disabled4", // 18 - AMDTurbo
  AMDCsupp = "Enabled", // 19 - AMDTurbo
  disabledMass =  "Disabled5", // 20 - Spread Spectrum
  disabledMass =  "Enabled", // 21 - Spread Spectrum
  AMDapmmm =  "Disabled", // 22 - Spread Spectrum
  AMDapmmm =  "Enabled", // 23 - Spread Spectrum
  AMDapmmm =  "Auto", // 24 - Spread Spectrum
  multivol =  "Auto", // 25 - Spread Spectrum
  multivol =  "ManuaI", // 26 - Spread Spectrum
  busSpeed =  "Аuto", // 27
  busSpeed =  "x1 200 MHz", // 28
  busSpeed =  "x2 400 MHz", // 29
  busSpeed =  "x3 600 MHz", // 30
  busSpeed =  "x4 800 MHz", // 31
  busSpeed =  "x5 1000 MHz", // 32
  busSpeed =  "x6 1200 MHz", // 33
  busSpeed =  "x7 1400 MHz", // 34
  busSpeed =  "x8 1600 MHz", // 35
  busSpeed =  "x9 1800 MHz", // 36
  busSpeed =  "x10 2000 MHz", // 37
  busSpeed =  "x11 2200 MHz", // 38
  cpuvoltag = "0.7000 V", // 39
  cpuvoltag = "0.7500 V",// 40
  cpuvoltag = "0.8000 V",// 41
  cpuvoltag = "0.8500 V",// 42
  cpuvoltag = "0.9000 V",// 43
  cpuvoltag = "0.9500 V",// 44
  cpuvoltag = "1.0000 V",// 45
  cpuvoltag = "1.0500 V",// 46
  cpuvoltag = "1.1000 V",// 47
  cpuvoltag = "1.1500 V",// 48
  cpuvoltag = "1.2000 V",// 49
  cpuvoltag = "1.2500 V" ,// 50
  cpuvoltag = "1.3000 V",// 51
  cpuvoltag = "1.3500 V",// 52
  cpuvoltag = "1.4000 V",// 53
  nbfreqmul = "x5.0 1000 MHz", // 54
  nbfreqmul = "x6.0 1200 MHz", // 55
  nbfreqmul = "x7.0 1400 MHz", // 56
  nbfreqmul = "x8.0 1600 MHz", // 57
  nbfreqmul = "x9.0 1800 MHz", // 58
  nbfreqmul = "x10.0 2000 MHz", // 59
  nbfreqmul = "x11.0 2200 MHz", // 60
  nbfreqmul = "x12.0 2400 MHz", // 61
  nbfreqmul = "x13.0 2600 MHz", // 62
  nbfreqmul = "x14.0 2800 MHz", // 63
  nbfreqmul = "x15.0 3000 MHz", // 64
  nbfreqmul = "x16.0 3200 MHz", // 65
  nbfreqmul = "x17.0 3400 MHz", // 66
  nbfreqmul = "x18.0 3600 MHz", // 67
  nbfreqmul = "x19.0 3800 MHz", // 68
  nbfreqmul = "x20.0 4000 MHz", // 69
  nbwidth = "8 Bit", // 70
  nbwidth = "16 Bit", // 71
  nbwidth = "Auto", // 72
  memclockmass = "400MHz DDR3_800", // 73
  memclockmass = "533MHz DDR3_1066", // 74
  memclockmass = "667MHz DDR3_1333", // 75
  memclockmass = "800MHz DDR3_1600", // 76
  memclockmass = "933MHz DDR3_1866", // 77
  memclockmass = "Auto", // 78
  drammvol = "1.30V", // 79
  drammvol = "1.35V", // 80
  drammvol = "1.40V", // 81
  drammvol = "1.45V", // 82
  drammvol = "1.50V", // 83
  drammvol = "1.55V", // 84
  drammvol = "1.60V", // 85
  drammvol = "1.65V", // 86
  drammvol = "1.70V", // 87
  drammvol = "1.75V", // 88
  drammvol = "1.80V", // 89
  drammvol = "Auto", // 90 
  drammvol_2 = "2.30V", // 91
  drammvol_2 = "2.35V", // 92
  drammvol_2 = "2.40V", // 93
  drammvol_2 = "2.45V", // 94
  drammvol_2 = "2.50V", // 95
  drammvol_2 = "2.55V", // 96
  drammvol_2 = "2.60V", // 97
  drammvol_2 = "2.65V", // 98
  drammvol_2 = "2.70V", // 99
  offset1 = "+0mV", // 100
  offset1 = "+50mV", // 101
  offset1 = "+100mV", // 102
  offset1 = "+150mV", // 103
  offset2 = "1.30mV", // 104
  offset2 = "0.65mV", // 105
  OnboadGPU = "2000", // 106 
  advancThrotl = "12.5%", // 107
  advancThrotl = "25%", // 108
  advancThrotl = "37.5%", // 109
  advancThrotl = "50%", // 110
  advancThrotl = "62.5%", // 111
  advancThrotl = "75%", // 112
  advancThrotl = "87.5%", // 113
  frontpenell = "HD", // 114
  frontpenel = "AC 97", // 115
  PrimaryGr = "Onboard", // 116
  PrimaryGr = "PCI Express", // 117
  PrimaryGr = "PCI", // 118
  Uma = "Uma", // 119
  shareMem = "32 MB", // 120
  shareMem = "64 MB", // 121
  shareMem = "128 MB", // 122
  shareMem = "256 MB", // 123
  shareMem = "512 MB", // 124
  shareMem = "1024 MB", // 125
  poweron = "Power Off", // 126
  poweron = "Power On", // 127
  anykey = "Any Key", // 128
  byos = "By OS", // 129
  alarmData = "Every Day", // 130
  alarmData = "1", // 131
  alarmData = "2", // 132
  alarmData = "3", // 133
  alarmData = "4", // 134
  alarmData = "5", // 135
  alarmData = "6", // 136
  alarmData = "7", // 137
  alarmData = "8", // 138
  alarmData = "9", // 139
  alarmData = "10", // 140
  alarmData = "11", // 141
  alarmData = "12", // 142
  alarmData = "13", // 143
  alarmData = "14", // 144
  alarmData = "15", // 145
  operationsat = "IDE", // 146
  operationsat = "RAID", // 147
  operationsat = "AHCI", // 148
  sataii = "Auto", // 149
  sataii = "Not Installed", // 150
  sata3 = "CD/DVD", // 151
  sata3 = "ARMD", // 152
  dmode = "Auto", // 153
  dmode = "SWDMA0", // 154
  dmode = "SWDMA1", // 155
  dmode = "SWDMA2", // 156
  dmode = "MWDMA0", // 157
  dmode = "MWDMA1", // 158
  dmode = "MWDMA2", // 159
  dmode = "UDMA0", // 160
  dmode = "UDMA1", // 161
  dmode = "UDMA2", // 162
  dmode = "UDMA3", // 163
  dmode = "UDMA4", // 164
  dmode = "UDMA5", // 165
  sata4 = "Not Installed", // 166
  sata4 = "CD/DVD", // 167
  sata4 = "ARMD", // 168
  sata4 = "Auto", // 169
  lbalar = "Disabled", // 170
  lbalar = "Auto", // 171
  pio0 = "0", // 172
  pcitimer = "32", // 173
  pcitimer = "64", // 174
  pcitimer = "96", // 175
  pcitimer = "128", // 176
  pcitimer = "160", // 177
  pcitimer = "192", // 178
  pcitimer = "224", // 179
  pcitimer = "248", // 180
  usbcontt = "Enabled", // 181
  usbcontt = "Disabled", // 182
  usbcontt = "BIOS Setup Only", // 183
  usbcontt = "Auto", // 184
  bootdev = "Sata:PS-TOSHIBA DT", // 185
  bootdev = "Disabled", // 186
 st1and2 = "SATA:PS-TOSHIBA DT01ACA100", // 187
 st1and2 = "AHCI:PO-Samsung SSD 860 EVO 250", // 188
 numlock = "OFF", // 189
 numlock = "ON", // 190
 cpufan = "Full On", // 191
 cpufan = "Automatic mode", // 192
 tagercpu = "Level 1", // 193
 tagercpu = "Level 2", // 194
 tagercpu = "Level 3", // 195
 tagercpu = "Level 4", // 196
 tagercpu = "Level 5", // 197
 tagercpu = "Level 6", // 198
 tagercpu = "Level 7", // 199
 tagercpu = "Level 8", // 200
 tagercpu = "Level 9", // 201
 cpufan = "Manual", // 202
];
const scrollMass = [
document.querySelector('#cpuconff'), // 0
document.querySelector('#overhyi'), // 1
document.querySelector('#bootFail'), // 2
document.querySelector('#bootFailGuard'), // 3
document.querySelector('#CpuActive'), // 4
document.querySelector('#amdTurbo'), // 5
document.querySelector('#amdState'), // 6
document.querySelector('#amdApm'), // 7
document.querySelector('#multipliervol'), // 8
document.querySelector('#multipliercpu'), // 9
document.querySelector('#cpuvol'), // 10
document.querySelector('#htbusswidth'), // 11
document.querySelector('#htbusswidth'), // 12
document.querySelector('#htbusswidth'), // 13
document.querySelector('#memtiming'), // 14
document.querySelector('#memtiming'), // 15
document.querySelector('#DramVol'), // 16
document.querySelector('#DramVol'), // 17
document.querySelector('#vol_2'), // 18
document.querySelector('#vol_2'), // 19
document.querySelector('#VCoreoff'), // 20
document.querySelector('#VCoreDrop'), // 21
document.querySelector('#load1st'), // 22
document.querySelector('#load1st'), // 23
document.querySelector('#load2st'), // 24
document.querySelector('#load2st'), // 25
document.querySelector('#load2st'), // 26
];

let activeMenuItemIndex = 0; // Индекс активного элемента меню (по умолчанию 0)
let scrollIndex = 0; // Начальный индекс
  const systemTimeElement = document.getElementById("systemTime");
  const cpu_config = document.getElementById("cpu_configr")
  const overClock = document.getElementById("overClockMod");
  const overhyi = document.getElementById("overhyi");
  const Elementocnew = document.querySelector('.ocnew');
  const spredDisabled = document.getElementById('spredDisabled')
  const bootFail = document.getElementById('bootFail');
  const bootEnabled = document.getElementById('bootEnabled');
 // const bootGuard = document.getElementById('bootGuard')
  const bootFailGuard = document.getElementById('bootFailGuard')
  const CpuActive = document.getElementById('CpuActive')
  const amdTurbo = document.getElementById('amdTurbo')
  const amdState = document.getElementById('amdState')
  const amdApm = document.getElementById('amdApm')
  const multipliervol = document.getElementById('multipliervol')
  const multipliercpu = document.getElementById('multipliercpu')
  const cpuvol = document.getElementById('cpuvol')
  const cpuvolnbb = document.getElementById('cpuvolnbb')
  const htbus = document.getElementById('htbus')
  const htbusswidth = document.getElementById('htbusswidth')
  const memclock = document.getElementById('memclock')
  const memtiming = document.getElementById('memtiming')
  const onboardGpu = document.getElementById('onboardGpu')
  const onboardGpucllock = document.getElementById('onboardGpucllock')
  const DramVol = document.getElementById('DramVol')
  const vol_1 = document.getElementById('vol_1')
  const vol_2 = document.getElementById('vol_2')
  const VCoreoff = document.getElementById('VCoreoff')
  const VCoreDrop = document.getElementById('VCoreDrop')
  const save1st = document.getElementById('save1st')
  const load1st = document.getElementById('load1st')
  const save2st = document.getElementById('save2st')
  const load2st = document.getElementById('load2st')
  const classCount_3 = Elementocnew.classList.length;
  const advansCpuconf = document.getElementById('advansCpuconf') /// Advanced
  const advansChipconf = document.getElementById('advansChipconf')
  const advansAcpicon = document.getElementById('advansAcpicon')
  const advansStor = document.getElementById('advansStor')
  const advansPci = document.getElementById('advansPci')
  const advansUsb = document.getElementById('advansUsb')
  const advansInstanflash = document.getElementById('advansInstanflash')
  const advansQuiet = document.getElementById('advansQuiet')
  const cpufreq = document.getElementById('cpufreq');
  const advansQuiet2 = document.getElementById('advansQuiet2');
  const advansEnha = document.getElementById('advansEnha');
  const advansThrot = document.getElementById('advansThrot');
  const advansOnboard = document.getElementById('advansOnboard');
  const advansFront = document.getElementById('advansFront');
  const advansOnboardLan = document.getElementById('advansOnboardLan');
  const advansPrimary = document.getElementById('advansPrimary');
  const advansInternal = document.getElementById('advansInternal');
  const advansShar = document.getElementById('advansShar');
  const advansOnboardHdmi = document.getElementById('advansOnboardHdmi');
  const DataElement = document.getElementById("timeDisplay");
  const Data2Elem = document.getElementById("dateDisplay");
  const systemDateElement = document.getElementById("systemDate");
  const systemDiskElement = document.getElementById("systemDisk");
  const systemLangElement = document.getElementById("systemLang");
  const diskLine = document.getElementById("diskLine");
  const changeCpu = document.getElementById("changeCpu");
  const changeCpu_1 = document.getElementById("changeCpu_1");
  const changeCpu_2 = document.getElementById("changeCpu_2");
  const lengua = document.getElementById("lengua");
  const sataone = document.getElementById("sataone");
  const sata_2 = document.getElementById("sata_2");
  const sata_3 = document.getElementById("sata_3");
  const sata_4 = document.getElementById("sata_4");
  const sata_configr = document.getElementById("sata_configr");
  const system_inform = document.getElementById("system_inform");
  const alertElement = document.querySelector(".alert");
  const alertElementLang = document.querySelector(".alert_1");
  const ramkaaElement = document.querySelector(".ramkaa");
  const ramkaElement = document.querySelector(".ramka");
  const idee = document.getElementById('idee')

  let selectedOption = "123"; // Глобальная переменная, по умолчанию "Auto"
  
  // Элементы, которые нужно скрыть/показать
  const powerr = document.getElementById("powerr");
  const boott = document.getElementById("boott");
  const toolss = document.getElementById("toolss");
  const exitt = document.getElementById("exitt");
  const advans = document.getElementById("advans");
  const octweak = document.getElementById("octweak");




  // Глобальные переменные для управления окном выбора языка
  let alertOptionsLang; // Элементы внутри окна выбора языка
  let activeAlertOptionLang = 0; // Индекс активного элемента в окне выбора языка
  let rightleftBlock = false;
  let confirmalerm = false;
  let enterLock = false;
  let blockMenu = false; /// блокування натиснення esc на головний екран
  let onHiddenExecuted = false; // Флаг выполнения
  // Флаг для блокировки переключения
  let cpuFan = false;
  let cpuFan1 = false;
  let cpuFan2 = false;
  let bootsetting2 = false;
  let bootsetting = false;
  let bootCheck = false;
  let isSystemInformActive = false;
  let CPUConfBlock = false;
  let AdvancedSetBlock = false;
  let AdvancedBlock1 = false; /// флаг для переключения в меню advanced
  let AcpiConfiggBlock = false;
  let StorageConfiggBlock = false;
  let StorageConfiggBlock_2 = false;
  let StorageConfiggBlock_3 = false;
  let StorageConfiggBlock_4 = true;
  let sataAdvanc2_2 = false;
  let sataAdvanc2_22 = false;
  let PCIPnP = false;
  let USBchos = false;
  let storageConfigNew = false;
  let in_subject = true;
  let activdisp71 = false;
  let activdisp74 = false;
  let activdisp10 = false;
  let HardDiskDriveact = false;
  var myzika_2 = new Audio("minecraftclick.mp3")
  let blockdisabled = false;
  let blockdisabled_2 = false;
  let enterPressCount = 0;
  let enterPressTimer;
  let pashalka = false;
  let paroluser; // если есть пароль, то будет уведомление и показывать что он установлен
  let tempPass;
  let generalHelpActive = false;
  let toastMenuLoad = false;
  let task6pass = false; // Переменная для отслеживания выполнения задания №6

  
  let max3elem = false; // переключение между трема видными элемнтами
  let max2elem = false; // переключение между двома видными элемнтами
  let max1elem = false; // переключение между одним видными элемнтами
  let max3elem1 = false; // переключение между трема видными элемнтами
  let max2elem1 = false; // переключение между двома видными элемнтами
  let max1elem1 = false; // переключение между одним видными элемнтами
  // Флаг для режима конфигурации SATA
  let isSataConfigActive = false;
  let activeSataConfig = 0; // Индекс активного элемента в конфигурации SATA
  // Массив пар элементов для синхронного переключения
  let sataPairs = [];
  let lines = [];

  // Инициализация элементов
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
let activeButton = btnYes;

  // Элементы для управления sata_alert
  const sataAlertElement = document.querySelector(".sata_alert");
  const sataAlertOptions = document.querySelectorAll(".sata_alert .alerttext div");
  let activeSataAlertOption = 0; // Индекс активного пункта в sata_alert
  let choseMenuLoad = false; /// toaster menu
  // Флаг для блокировки основного интерфейса при открытом sata_alert
  let isSataAlertActive = false;
let userChoice = null; // Переменная для хранения выбора
  toastr.options = {
  "progressBar": true,
  "positionClass": "toast-top-center",
  "timeOut": "0",
  "extendedTimeOut": "0",
  "tapToDismiss": false,
  onHidden: function () {
      rightleftBlock = false;
      confirmalerm = false;
      choseMenuLoad = false;
      console.log(choseMenuLoad + "/" + confirmalerm + "/" + rightleftBlock + " :toaster debug");
    }
}

  // Инициализация времени и даты
  function initializeTimeAndDate() {
    const now = new Date();
    hours = now.getHours();
    minutes = now.getMinutes();
    seconds = now.getSeconds();
    day = now.getDate();
    month = now.getMonth() + 1;
    year = now.getFullYear();
  }

  // Форматирование чисел
  function formatNumber(number) {
    return number < 10 ? "0" + number : number;
  }

  // Обновление отображения времени
  function updateTimeDisplay() {
    timeParts[0].textContent = formatNumber(hours);
    timeParts[1].textContent = formatNumber(minutes);
    timeParts[2].textContent = formatNumber(seconds);
  }

  // Обновление отображения даты
  function updateDateDisplay() {
    dateParts[0].textContent = formatNumber(day);
    dateParts[1].textContent = formatNumber(month);
    dateParts[2].textContent = year;
  }
  function checkTime() {
    const now = new Date(); // Текущее время
    const hours = now.getHours(); // Часы (0-23)
    const minutes = now.getMinutes(); // Минуты (0-59)
    const seconds = now.getSeconds(); // Секунды (0-59)
    let hourslocalSt = Number(localStorage.getItem('hoursLocal')); 
    let minuteLocalSt = Number(localStorage.getItem('minuteLocal'));
    let secondsLocalSt = Number(localStorage.getItem('secondsLocal'));
    let dateLocalst = localStorage.getItem('advansRTCDatechoLocal');
  ///    console.log(hourslocalSt, minuteLocalSt, secondsLocalSt, dateLocalst)
    // Перевіряємо, чи збігається час з обраним 
    if (hours === hourslocalSt && minutes === minuteLocalSt && seconds === secondsLocalSt) {
      alert(hourslocalSt + ":" + minuteLocalSt + ":" + secondsLocalSt + ' - Alarm Time');
      clearInterval(timer); // Зупинити перевірку після спрацьовування
    }   
  }

  function updateAdvansRTCByOstimechoseDisplay() {
  const rtcElem = document.getElementById("advansRTCByOstimechose");
  if (rtcElem) {
    rtcElem.innerHTML = `<span style="display: flex; flex-wrap: wrap;">[<span id="rtcHours">${formatNumber(hours)}</span>:<span id="rtcMinutes">${formatNumber(minutes)}</span>:<span id="rtcSeconds">${formatNumber(seconds)}</span>]</span>`;
    
    updateActiveLine(); // Оновлюємо підсвічування после вывода времени
     
  }
}
console.log(acceptMass)
loadProfile(999); // Загружаем профиль 999 только один раз

const FALLBACK_BIOS_TASKS = [
  { code: 'boot_priority_order', title: 'Зміна пріоритету завантаження – налаштування порядку завантаження пристроїв (HDD, SSD, USB, CD/DVD).' },
  { code: 'toggle_hw_components', title: 'Увімкнення/вимкнення апаратних компонентів – керування портами USB, звуковою картою, мережею та іншими пристроями.' },
  { code: 'cpu_memory_overclock', title: 'Розгін процесора чи оперативної пам\'яті.' },
  { code: 'fan_speed_tuning', title: 'Налаштування швидкості обертання кулерів – керування вентиляторами для кращого охолодження або зниження шуму.' },
  { code: 'select_4_cores', title: 'Виберіть 4 ядра.' },
  { code: 'reset_bios_password', title: 'Скидання пароля BIOS – видалення або встановлення пароля для обмеження доступу.' },
  { code: 'update_bios_firmware', title: 'Оновлення мікропрограми BIOS – оновлення для покращення стабільності та підтримки нового обладнання.' },
  { code: 'factory_reset_bios', title: 'Скидання всіх налаштувань BIOS до заводських' },
  { code: 'set_bios_time_205342', title: 'Встановіть час у BIOS на 20:53:42.' },
  { code: 'set_pci_latency_160', title: 'Змініть значення PCI Latency Timer на 160.' },
  { code: 'set_cpu_freq_220', title: 'Установіть CPU Frequency на 220 MHz.' },
  { code: 'set_pcie_freq_105', title: 'Змініть PCIE Frequency на 105 MHz.' },
  { code: 'disable_spread_spectrum', title: 'Вимкніть Spread Spectrum для стабільного розгону.' },
  { code: 'enable_boot_failure_guard', title: 'Увімкніть Boot Failure Guard.' },
  { code: 'set_boot_failure_guard_count_5', title: 'Встановіть Boot Failure Guard Count на 5.' },
  { code: 'set_cpu_active_cores_2', title: 'Змініть CPU Active Core Control на 2 ядра.' },
  { code: 'enable_amd_turbo_core', title: 'Увімкніть AMD Turbo Core Technology.' },
  { code: 'disable_amd_c_state', title: 'Вимкніть AMD C-State Support.' },
  { code: 'enable_amd_apm', title: 'Увімкніть AMD APM.' },
  { code: 'set_cpu_multiplier_x18', title: 'Встановіть CPU Frequency Multiplier на x18.0.' },
  { code: 'set_cpu_voltage_1350', title: 'Змініть CPU Voltage на 1.3500 V.' },
  { code: 'set_nb_multiplier_x9', title: 'Встановіть NB Frequency Multiplier на x9.0.' },
  { code: 'enable_onboard_gpu_override', title: 'Увімкніть Onboard GPU Clock Override.' },
  { code: 'set_onboard_gpu_1800', title: 'Змініть Onboard GPU Clock на 1800 MHz.' },
  { code: 'set_dram_voltage_150', title: 'Встановіть DRAM Voltage на 1.50 V.' },
  { code: 'disable_onboard_lan', title: 'Вимкніть Onboard LAN у Chipset Configuration.' },
  { code: 'set_primary_graphics_pci', title: 'Змініть Primary Graphics Adapter на PCI.' },
  { code: 'set_internal_graphics_uma', title: 'Встановіть Internal Graphics Mode у UMA.' },
  { code: 'disable_onboard_sata', title: 'Вимкніть Onboard SATA Controller.' },
  { code: 'set_sata_mode_ide', title: 'Змініть SATA Operation Mode з AHCI на IDE.' }
];

let currentVisibleTasks = [];
let taskStatus = Object.create(null);
let totalPoints = 0;
let currentPvpState = null;
let lastPvpRefreshAt = 0;
let seenIncomingInviteIds = [];

function getTaskStatusKey(task, index) {
  if (task && typeof task === 'object' && typeof task.code === 'string' && task.code.trim() !== '') {
    return task.code.trim();
  }
  return `task_index_${index}`;
}

function resolveTaskStatusKeyByIndex(index) {
  const fallbackTask = currentVisibleTasks[index] || FALLBACK_BIOS_TASKS[index] || null;
  return getTaskStatusKey(fallbackTask, index);
}

function getTaskListForRender(tasks, visibleCount) {
  const list = Array.isArray(tasks) ? tasks : [];
  if (!list.length) {
    return [];
  }

  const safeCount = Number(visibleCount);
  if (!Number.isFinite(safeCount) || safeCount <= 0) {
    return list;
  }

  return list.slice(0, Math.min(list.length, safeCount));
}

async function loadVisibleTasksForCurrentUser() {
  try {
    const response = await fetch('bios_tasks.php', { credentials: 'same-origin' });
    const payload = await response.json();

    if (!response.ok || !payload.success || !Array.isArray(payload.tasks) || !payload.tasks.length) {
      throw new Error('Invalid tasks payload');
    }

    const normalized = payload.tasks.map((task, index) => ({
      code: String(task?.code || `task_index_${index}`).trim() || `task_index_${index}`,
      title: String(task?.title || '').trim()
    })).filter((task) => task.title !== '');

    if (!normalized.length) {
      throw new Error('No normalized tasks');
    }

    currentPvpState = normalizePvpState(payload?.pvp);
    renderPvpBattleState();

    return getTaskListForRender(normalized, Number(payload.visible_task_count || normalized.length));
  } catch (error) {
    currentPvpState = null;
    renderPvpBattleState();
    return FALLBACK_BIOS_TASKS;
  }
}

async function fetchCsrfTokenForPvp() {
  const response = await fetch('get_csrf_token.php', { credentials: 'same-origin' });
  const data = await response.json();
  if (!response.ok || !data.csrf_token) {
    throw new Error('Failed to load CSRF token');
  }
  return String(data.csrf_token);
}

function renderPvpBattleState() {
  const holder = document.getElementById('pvpBattleStatus');
  const opponentHolder = document.getElementById('pvpOpponentDisplay');
  const leaveButton = document.getElementById('pvpLeaveBattleBtn');
  if (!holder) {
    return;
  }

  const pvpState = normalizePvpState(currentPvpState);

  if (!pvpState || Number(pvpState.battle_id || 0) <= 0) {
    holder.textContent = 'Активного PvP бою немає.';
    if (opponentHolder) {
      opponentHolder.textContent = 'Суперник: немає активного PvP.';
    }
    if (leaveButton) {
      leaveButton.disabled = true;
    }
    return;
  }

  const opponent = getPvpOpponentName(pvpState);
  const myScore = Number(pvpState.my_completed_count || 0);
  const enemyScore = Number(pvpState.opponent_completed_count || 0);
  const total = Number(pvpState.total_tasks || 0);
  const mode = String(pvpState.mode || 'user_random') === 'admin_selected' ? 'Admin Battle' : 'User Battle';
  if (opponentHolder) {
    opponentHolder.textContent = `Суперник: ${opponent}`;
  }
  if (leaveButton) {
    leaveButton.disabled = false;
  }
  holder.textContent = `${mode}: ви vs ${opponent}. Прогрес: ${myScore}/${total}, суперник: ${enemyScore}/${total}`;
}

function renderIncomingPvpInvites(invites) {
  const container = document.getElementById('pvpIncomingInvites');
  if (!container) {
    return;
  }

  const list = Array.isArray(invites) ? invites : [];
  if (!list.length) {
    container.innerHTML = '<div style="font-size:0.8rem; opacity:0.75;">Немає вхідних запрошень.</div>';
    return;
  }

  container.innerHTML = list.map((invite) => {
    const id = Number(invite.id || 0);
    const name = String(invite.inviter_name || `User #${Number(invite.inviter_user_id || 0)}`);
    return `<div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
      <span style="font-size:0.8rem;">Запрошення від ${name}</span>
      <button type="button" data-pvp-accept-id="${id}">Прийняти</button>
      <button type="button" data-pvp-decline-id="${id}">Відхилити</button>
    </div>`;
  }).join('');

  container.querySelectorAll('[data-pvp-accept-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const inviteId = Number(button.dataset.pvpAcceptId || 0);
      respondPvpInvite(inviteId, 'accept').catch((error) => {
        showPvpToast(error?.message || 'Не вдалося прийняти запрошення', 'error');
        console.error(error);
      });
    });
  });

  container.querySelectorAll('[data-pvp-decline-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const inviteId = Number(button.dataset.pvpDeclineId || 0);
      respondPvpInvite(inviteId, 'decline').catch((error) => {
        showPvpToast(error?.message || 'Не вдалося відхилити запрошення', 'error');
        console.error(error);
      });
    });
  });
}

async function refreshPvpState() {
  const previousState = normalizePvpState(currentPvpState);
  const response = await fetch('pvp_battles.php?action=my_state', { credentials: 'same-origin' });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to load PvP state');
  }

  currentPvpState = normalizePvpState(data.active_battle);
  renderPvpBattleState();
  const incomingInvites = Array.isArray(data.incoming_invites) ? data.incoming_invites : [];
  const incomingIds = incomingInvites.map((invite) => Number(invite.id || 0)).filter((id) => id > 0);

  if (incomingIds.length) {
    incomingInvites.forEach((invite) => {
      const inviteId = Number(invite.id || 0);
      if (inviteId > 0 && !seenIncomingInviteIds.includes(inviteId)) {
        showPvpToast(`Нове PvP-запрошення від ${String(invite.inviter_name || 'користувача')}`, 'info');
      }
    });
  }
  seenIncomingInviteIds = incomingIds;

  const currentState = normalizePvpState(currentPvpState);
  if (!previousState && currentState) {
    showPvpToast(`${getPvpOpponentName(currentState)} підключився до PvP бою`, 'success');
  } else if (previousState && !currentState) {
    showPvpToast('PvP бій завершено.', 'info');
  }

  renderIncomingPvpInvites(incomingInvites);
  lastPvpRefreshAt = Date.now();
}

async function sendPvpInvite() {
  const firstNameInput = document.getElementById('pvpTargetFirstName');
  const lastNameInput = document.getElementById('pvpTargetLastName');
  if (!firstNameInput || !lastNameInput) {
    return;
  }

  const firstName = String(firstNameInput.value || '').trim();
  const lastName = String(lastNameInput.value || '').trim();
  if (!firstName || !lastName) {
    throw new Error('Вкажіть ім\'я і прізвище суперника');
  }

  const csrfToken = await fetchCsrfTokenForPvp();
  const formData = new FormData();
  formData.append('csrf_token', csrfToken);
  formData.append('action', 'send_invite');
  formData.append('target_first_name', firstName);
  formData.append('target_last_name', lastName);

  const response = await fetch('pvp_battles.php', {
    method: 'POST',
    body: formData,
    credentials: 'same-origin'
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Не вдалося надіслати запрошення');
  }

  firstNameInput.value = '';
  lastNameInput.value = '';
  showPvpToast('Запрошення на PvP надіслано.', 'success');
  await refreshPvpState();
}

async function respondPvpInvite(inviteId, decision) {
  const id = Number(inviteId || 0);
  if (!id || !['accept', 'decline'].includes(String(decision || ''))) {
    throw new Error('Invalid invite action');
  }

  const csrfToken = await fetchCsrfTokenForPvp();
  const formData = new FormData();
  formData.append('csrf_token', csrfToken);
  formData.append('action', 'respond_invite');
  formData.append('invite_id', String(id));
  formData.append('decision', String(decision));

  const response = await fetch('pvp_battles.php', {
    method: 'POST',
    body: formData,
    credentials: 'same-origin'
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Не вдалося обробити запрошення');
  }

  showPvpToast(
    decision === 'accept' ? 'Запрошення прийнято. Бій розпочато.' : 'Запрошення відхилено.',
    decision === 'accept' ? 'success' : 'info'
  );

  await Promise.all([refreshPvpState(), loadVisibleTasksForCurrentUser().then((tasks) => {
    currentVisibleTasks = tasks;
  })]);
}

async function leavePvpBattle() {
  const pvpState = normalizePvpState(currentPvpState);
  if (!pvpState || Number(pvpState.battle_id || 0) <= 0) {
    showPvpToast('Немає активного бою для виходу.', 'info');
    return;
  }

  const csrfToken = await fetchCsrfTokenForPvp();
  const formData = new FormData();
  formData.append('csrf_token', csrfToken);
  formData.append('action', 'leave_battle');

  const response = await fetch('pvp_battles.php', {
    method: 'POST',
    body: formData,
    credentials: 'same-origin'
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    if (response.status === 404) {
      currentPvpState = null;
      renderPvpBattleState();
      renderIncomingPvpInvites([]);
      showPvpToast('Активного PvP бою вже немає.', 'info');
      return;
    }
    throw new Error(data.error || 'Не вдалося покинути бій');
  }

  showPvpToast('Ви покинули бій. Перемогу зараховано супернику.', 'warning');
  await Promise.all([refreshPvpState(), loadVisibleTasksForCurrentUser().then((tasks) => {
    currentVisibleTasks = tasks;
  })]);
}

function showPvpToast(message, level = 'info') {
  const text = String(message || '').trim();
  if (!text || typeof toastr === 'undefined' || typeof toastr[level] !== 'function') {
    return;
  }

  const prevOptions = {
    timeOut: toastr.options.timeOut,
    extendedTimeOut: toastr.options.extendedTimeOut,
    tapToDismiss: toastr.options.tapToDismiss,
    progressBar: toastr.options.progressBar,
    closeButton: toastr.options.closeButton,
  };

  toastr.options.timeOut = '3500';
  toastr.options.extendedTimeOut = '1200';
  toastr.options.tapToDismiss = true;
  toastr.options.progressBar = true;
  toastr.options.closeButton = true;

  toastr[level](text, 'PvP');

  toastr.options.timeOut = prevOptions.timeOut;
  toastr.options.extendedTimeOut = prevOptions.extendedTimeOut;
  toastr.options.tapToDismiss = prevOptions.tapToDismiss;
  toastr.options.progressBar = prevOptions.progressBar;
  toastr.options.closeButton = prevOptions.closeButton;
}

function normalizePvpState(rawState) {
  if (!rawState || typeof rawState !== 'object') {
    return null;
  }

  const battleId = Number(rawState.battle_id || rawState.id || 0);
  const status = String(rawState.status || 'active');
  if (status !== 'active') {
    return null;
  }

  if (!battleId) {
    return null;
  }

  if (typeof rawState.opponent_name === 'string') {
    return {
      battle_id: battleId,
      mode: String(rawState.mode || 'user_random'),
      total_tasks: Number(rawState.total_tasks || 0),
      my_completed_count: Number(rawState.my_completed_count || 0),
      opponent_completed_count: Number(rawState.opponent_completed_count || 0),
      opponent_name: String(rawState.opponent_name || '').trim(),
      opponent_user_id: Number(rawState.opponent_user_id || 0),
      winner_user_id: Number(rawState.winner_user_id || 0),
      status
    };
  }

  const player1 = rawState.player1 || {};
  const player2 = rawState.player2 || {};
  const userId = Number(getUserId());
  const isPlayer1 = Number(player1.id || 0) === userId;
  const me = isPlayer1 ? player1 : player2;
  const opponent = isPlayer1 ? player2 : player1;

  return {
    battle_id: battleId,
    mode: String(rawState.mode || 'user_random'),
    total_tasks: Number(rawState.total_tasks || 0),
    my_completed_count: Number(me.completed_count || 0),
    opponent_completed_count: Number(opponent.completed_count || 0),
    opponent_name: String(opponent.name || '').trim(),
    opponent_user_id: Number(opponent.id || 0),
    winner_user_id: Number(rawState.winner_user_id || 0),
    status
  };
}

function getPvpOpponentName(state) {
  const pvp = normalizePvpState(state);
  if (!pvp) {
    return '';
  }
  return String(pvp.opponent_name || `User #${Number(pvp.opponent_user_id || 0)}`);
}

async function reportPvpTaskProgressByCode(taskCode) {
  if (!currentPvpState || Number(currentPvpState.battle_id || 0) <= 0) {
    return;
  }

  const code = String(taskCode || '').trim();
  if (!code) {
    return;
  }

  const csrfToken = await fetchCsrfTokenForPvp();
  const formData = new FormData();
  formData.append('csrf_token', csrfToken);
  formData.append('action', 'report_progress');
  formData.append('task_code', code);

  const response = await fetch('pvp_battles.php', {
    method: 'POST',
    body: formData,
    credentials: 'same-origin'
  });
  const data = await response.json();
  if (response.ok && data.success) {
    currentPvpState = normalizePvpState(data.active_battle);
    renderPvpBattleState();
  } else {
    showPvpToast('Помилка під час відправки прогресу завдання', 'error');
  }
}

function setupPvpUiBindings() {
  const sendButton = document.getElementById('pvpSendInviteBtn');
  const refreshButton = document.getElementById('pvpRefreshBtn');
  const leaveButton = document.getElementById('pvpLeaveBattleBtn');

  if (sendButton && !sendButton.dataset.bound) {
    sendButton.dataset.bound = '1';
    sendButton.addEventListener('click', () => {
      sendPvpInvite().catch((error) => {
        showPvpToast(error?.message || 'Не вдалося надіслати PvP-запрошення', 'error');
        console.error(error);
      });
    });
  }

  if (refreshButton && !refreshButton.dataset.bound) {
    refreshButton.dataset.bound = '1';
    refreshButton.addEventListener('click', () => {
      refreshPvpState().catch((error) => {
        showPvpToast(error?.message || 'Не вдалося оновити PvP-стан', 'error');
        console.error(error);
      });
    });
  }

  if (leaveButton && !leaveButton.dataset.bound) {
    leaveButton.dataset.bound = '1';
    leaveButton.addEventListener('click', () => {
      leavePvpBattle().catch((error) => {
        showPvpToast(error?.message || 'Не вдалося покинути бій', 'error');
        console.error(error);
      });
    });
  }
}

function renderTaskList(tasks, taskList) {
  currentVisibleTasks = Array.isArray(tasks) ? tasks : [];
  taskList.innerHTML = '';

  currentVisibleTasks.forEach((task, index) => {
    const li = document.createElement('li');
    const status = document.createElement('span');
    const key = getTaskStatusKey(task, index);

    status.classList.add('status');
    status.innerText = taskStatus[key] ? '✓' : '✖';
    status.dataset.index = String(index);
    status.dataset.taskKey = key;

    li.innerHTML = `${task.title} `;
    li.appendChild(status);
    taskList.appendChild(li);
  });
}

loadVisibleTasksForCurrentUser()
  .then((tasks) => {
    currentVisibleTasks = Array.isArray(tasks) ? tasks : [];
  })
  .catch(() => {});

refreshPvpState().catch(() => {});
setInterval(() => {
  refreshPvpState().catch(() => {});
}, 8000);

document.getElementById("task1").addEventListener("click", async function () {
  let taskWindow = document.getElementById("taskWindow");
  let taskList = document.getElementById("taskList");

  // Проверяем, открыто ли окно
  if (taskWindow.style.height === "85vh") {
    closeTaskWindow();
    return;
  }

  const tasks = await loadVisibleTasksForCurrentUser();
  renderTaskList(tasks, taskList);
  setupPvpUiBindings();
  if (Date.now() - lastPvpRefreshAt > 3000) {
    refreshPvpState().catch((error) => {
      console.error(error);
    });
  }

  // Применяем анимацию через JS
  if(window.screen.height >= 768){
  taskWindow.style.transition = "height 0.5s ease-in-out, opacity 0.5s ease-in-out";
  taskWindow.style.visibility = "visible";
  //taskList.style.height = "max-content";
  taskWindow.style.opacity = "1";
  taskWindow.style.height = "85vh"; // Раскрываем окно
}

});

// Закрытие окна с анимацией
document.getElementById("closeTaskWindow").addEventListener("click", closeTaskWindow);
document.getElementById("restartball").addEventListener("click", restartballs);

function restartballs() {
  localStorage.removeItem('num1correct')
  cancelTask(0); // Отмена 1-го завдання
  localStorage.removeItem('num2correct')
  cancelTask(1);
  localStorage.removeItem('num3correct')
  cancelTask(2);
  localStorage.removeItem('num4correct')
  cancelTask(3);
  localStorage.removeItem('num5correct')
  cancelTask(4);
  localStorage.removeItem('num6correct')
  cancelTask(5);
  localStorage.removeItem('num7correct')
  cancelTask(6);
  localStorage.removeItem('num8correct')
  cancelTask(7);
  localStorage.removeItem('num9correct')
  cancelTask(8);
  localStorage.removeItem('num10correct')
  cancelTask(9);
}

function closeTaskWindow() {
  let taskWindow = document.getElementById("taskWindow");
  taskWindow.style.height = "0"; // Схлопываем окно
  taskWindow.style.opacity = "0";

  // Ждем окончания анимации, затем скрываем окно
  setTimeout(() => {
    taskWindow.style.visibility = "hidden";
  }, 500);
}

// Функция смены статуса задания (но теперь нельзя отменять выполнение)
function toggleTaskStatus(index) {
  const key = resolveTaskStatusKeyByIndex(index);
  if (!taskStatus[key]) { // Если задание еще не выполнено
    taskStatus[key] = true; // Помечаем как выполненное
    updateTaskStatus(index); // Обновляем статус в списке
    updatePoints(); // Обновляем количество баллов
    reportPvpTaskProgressByCode(key).catch((error) => {
      console.error(error);
    });
  }
}

// Функция отмены задания
function cancelTask(index) {
  const key = resolveTaskStatusKeyByIndex(index);
  if (taskStatus[key]) { // Только если задание выполнено
    taskStatus[key] = false; // Отменяем выполнение
    updateTaskStatus(index); // Обновляем статус в списке
    updatePoints(); // Пересчитываем баллы
  }
}

// Функция обновления статуса задания в DOM
function updateTaskStatus(index) {
  const key = resolveTaskStatusKeyByIndex(index);
  let taskItems = document.querySelectorAll("#taskList li span.status");
  taskItems.forEach((status) => {
    if (status.dataset.taskKey === key || parseInt(status.dataset.index) === index) {
      status.innerText = taskStatus[key] ? "✓" : "✖";
    }
  });
}

// Функция обновления баллов (исправлена ошибка)
function updatePoints() {
  totalPoints = 0; // Сбрасываем баллы перед пересчетом
  const visibleTaskKeys = (currentVisibleTasks || []).map((task, index) => getTaskStatusKey(task, index));
  const sourceKeys = visibleTaskKeys.length ? visibleTaskKeys : Object.keys(taskStatus);
  sourceKeys.forEach((key) => {
    if (taskStatus[key]) totalPoints += 10; // Добавляем 10 баллов за каждое выполненное задание
  });

  // Обновляем отображение баллов
  document.getElementById("pointsDisplay").innerText = `Бали: ${totalPoints}`;
}

  
 

// Переключение активного элемента меню
function switchMenuItem(direction) {
  // Убираем подсветку с текущего активного элемента
  menuItems[activeMenuItemIndex].classList.remove('active');

  // Обновляем индекс активного элемента с учетом направления
  activeMenuItemIndex = (activeMenuItemIndex + direction + menuItems.length) % menuItems.length;

  // Добавляем подсветку новому активному элементу
  menuItems[activeMenuItemIndex].classList.add('active');

  // Управляем видимостью блоков в зависимости от активного элемента
  updateContentVisibility();
}
// Обновление видимости блоков в зависимости от активного элемента меню
function updateContentVisibility() {
  // Скрываем все блоки контента
  document.querySelector('.systeminf').style.display = 'none';
  document.querySelector('.ocnew').style.display = 'none';
  document.querySelector('.advancedslot').style.display = 'none';
  document.querySelector('.paramOcTweak').style.display = 'none';
  document.getElementById('bootGuard').style.display = 'none';
  systemTimeElement.style.display = 'none';
  systemDateElement.style.display = 'none';
  DataElement.style.display = 'none';
  Data2Elem.style.display = 'none';
  cpu_config.style.display = 'none';
  changeCpu.style.display = 'none';
  changeCpu_1.style.display = 'none';
  changeCpu_2.style.display = 'none';
  changeCpu.classList.remove('active');
  spredDisabled.style.display = 'none';
  bootFail.style.display = 'none';
  bootEnabled.style.display = 'none';
  document.getElementById('MonitorConfig').style.display = "none";
  document.getElementById('BootConfig').style.display = "none";
  document.getElementById('SecuritytConfig').style.display = "none";
  document.getElementById('ExitConfig').style.display = "none";
  // Показываем нужный блок в зависимости от активного элемента
  switch (activeMenuItemIndex) {
    case 0: // Main
    let siteRelod = sessionStorage.getItem("siteReload");


    if(siteRelod === '1'){
      loadProfile(777)
      siteRelod = sessionStorage.setItem("siteReload", "-1");
      saveProfile(999)
    }
    if(siteRelod === '2'){
      loadProfile(776)
      siteRelod = sessionStorage.setItem("siteReload", "-1");
      saveProfile(999)
    }

      hiddenON.style.display = '';
      document.querySelector('.systeminf').style.display = 'block';
      systemTimeElement.style.display = 'block';
      systemDateElement.style.display = 'block';
      DataElement.style.display = 'flex';
      Data2Elem.style.display = 'flex';

      let multt = localStorage.getItem('multip')
      let coresf = localStorage.getItem('allCor')
      const speeds = {
        "[x5.0 1000 MHz]": "1000MHz",
        "[x6.0 1200 MHz]": "1200MHz",
        "[x7.0 1400 MHz]": "1400MHz",
        "[x8.0 1600 MHz]": "1600MHz",
        "[x9.0 1800 MHz]": "1800MHz",
        "[x10.0 2000 MHz]": "2000MHz",
        "[x11.0 2200 MHz]": "2200MHz",
        "[x12.0 2400 MHz]": "2400MHz",
        "[x13.0 2600 MHz]": "2600MHz",
        "[x14.0 2800 MHz]": "2800MHz",
        "[x15.0 3000 MHz]": "3000MHz",
        "[x16.0 3200 MHz]": "3200MHz",
        "[x17.0 3400 MHz]": "3400MHz",
        "[x18.0 3600 MHz]": "3600MHz",
        "[x19.0 3800 MHz]": "3800MHz",
        "[x20.0 4000 MHz]": "4000MHz",
      };
      const corel = {
        "[All Cores]": "Eight-Core",
        "[One Core Per Unit]": "One-Core",
        "[Two Cores]": "Two-Core",
        "[Four Cores]": "Four-Core",
        "[Six Cores]": "Six-Core",
      };
      
      if (multt && speeds[multt]) {
        document.getElementById('mhzcpu').innerHTML = speeds[multt];
      }
      if (coresf && corel[coresf]) {
        let coss = document.getElementById('allCores').innerHTML.replace(/\[|\]/g, '').trim();

        document.getElementById('coresall').innerHTML = corel[coresf];
        document.getElementById('coresall').innerHTML = coss;

      }
   
      
      if(Number(localStorage.getItem('escapeInstant')) === 2){
        document.querySelector('.systeminf').style.display = 'none';
      systemTimeElement.style.display = 'none';
      systemDateElement.style.display = 'none';
      DataElement.style.display = 'none';
      Data2Elem.style.display = 'none';
      document.querySelector('.parameters').style.display = 'none';
    document.querySelector('.options').style.display = 'none';
    document.getElementById("mainmenu").classList.remove("active");
    document.getElementById("advans").classList.add("active");
        activeMenuItemIndex = 2
        blockMenu = false; /// Дає змогу перемикання 
    document.querySelector('.parameters').style.display = 'none';
    document.querySelector('.options').style.display = 'none';
    document.querySelector('.advancedslot').style.display = 'block';
let rerre =[  
 advansQuiet.style.display = "none",
 document.getElementById('advansQuiet1').style.display = "none",
 document.getElementById('advansQuiet2').style.display = "none",
 document.getElementById('advansQuiet3').style.display = "none",
 advansEnha.style.display = "none",
 advansThrot.style.display = "none",
 document.getElementById('advansThrotpar').style.display = "none",]  
    advansCpuconf.style.display = "block" 
  advansChipconf.style.display = "block"
  advansAcpicon.style.display = "block"
  advansStor.style.display = "block" 
  advansPci.style.display = "block"
  advansUsb.style.display = "block"
  advansInstanflash.style.display = "block";
  document.getElementById('warnadvanc').style.display = "block";
  document.getElementById('biosadvans').style.display = "block";
  document.getElementById('underlinadv').style.display = "block";
  document.getElementById('advancpuopen').style.display = "none";
  activeDisplay = 35;
  localStorage.setItem('escapeInstant', 0)
      }

      break;
    case 1: // OC Tweaker
    if(document.getElementById('multipar').textContent === '[x20.0 4000 MHz]'){
      localStorage.setItem('multip', '[x20.0 4000 MHz]')
    }
    localStorage.setItem('actdisExit', 2)
    AdvancedBlock1 = false; /// Перем
    scrollIndex = 0; // Начальный индекс
    document.querySelector('.parameters').style.display = 'block';
      document.querySelector('.options').style.display = 'block';
      document.querySelector('.ocnew').style.display = 'block';
      cpu_config.style.display = 'block';
      changeCpu.style.display = 'block';
      changeCpu_1.style.display = 'block';
      changeCpu_2.style.display = 'block';
      spredDisabled.style.display = 'block';
      bootFail.style.display = 'block';
      bootEnabled.style.display = 'block';
      document.getElementById('bootGuard').style.display = 'block';
      document.querySelector('.paramOcTweak').style.display = 'block';   
      break;
    case 2: // Advanced
    localStorage.setItem('actdisExit', 29)
    AdvancedBlock1 = true; /// Перем
    blockMenu = false; /// Дає змогу перемикання 
    
    document.querySelector('.parameters').style.display = 'none';
    document.querySelector('.options').style.display = 'none';
    document.querySelector('.advancedslot').style.display = 'block';
let rerre =[  
 advansQuiet.style.display = "none",
 document.getElementById('advansQuiet1').style.display = "none",
 document.getElementById('advansQuiet2').style.display = "none",
 document.getElementById('advansQuiet3').style.display = "none",
 advansEnha.style.display = "none",
 advansThrot.style.display = "none",
 document.getElementById('advansThrotpar').style.display = "none",]  


    advansCpuconf.style.display = "block" 
  advansChipconf.style.display = "block"
  advansAcpicon.style.display = "block"
  advansStor.style.display = "block" 
  advansPci.style.display = "block"
  advansUsb.style.display = "block"
  advansInstanflash.style.display = "block";
  document.getElementById('warnadvanc').style.display = "block";
  document.getElementById('biosadvans').style.display = "block";
  document.getElementById('underlinadv').style.display = "block";
  document.getElementById('advancpuopen').style.display = "none";
      break; 
      case 3: // H/WMonitor
        max3elem = true; // запрещает переключение только между 109 и 111
        max2elem = true; // запрещает переключение только между 109 и 111
        max1elem = true; // запрещает переключение только между 109 и 111
        max3elem1 = true; // запрещает переключение только между 109 и 111
        max2elem1 = true; // запрещает переключение только между 109 и 111
        max1elem1 = true; // запрещает переключение только между 115 и 117

      localStorage.setItem('actdisExit', 87)
      AdvancedBlock1 = false; /// Перем
      activeDisplay = 87; 
      document.querySelector('.parameters').style.display = 'none';
    document.querySelector('.options').style.display = 'none';
    advansCpuconf.style.display = "none" 
  advansChipconf.style.display = "none"
  advansAcpicon.style.display = "none"
  advansStor.style.display = "none" 
  advansPci.style.display = "none"
  advansUsb.style.display = "none"
  advansInstanflash.style.display = "none";
  document.getElementById('warnadvanc').style.display = "none";
  document.getElementById('biosadvans').style.display = "none";
  document.getElementById('underlinadv').style.display = "none";
  document.getElementById('advancpuopen').style.display = "none";
  document.getElementById('MonitorConfig').style.display = "block";
      break;
      case 4: // Boot
      localStorage.setItem('actdisExit', 92)
      document.querySelector('.parameters').style.display = 'none';
    document.querySelector('.options').style.display = 'none';
  document.getElementById('BootConfig').style.display = "block";
 if(pashalka === true){
  document.getElementById('pashalka1').style.display = "flex";
 } 
 if(pashalka === false){
  document.getElementById('pashalka1').style.display = "none";
 } 
  
 
      break;
      case 5: // Security 
      let tempwron = localStorage.getItem('paroluserSuperLocal')
      if(paroluser === 'vZvIh3d8C'){
        document.getElementById("passUserid").classList.add("activepass")
        document.getElementById("notinstallpass").innerHTML = "Installed"
      } if(paroluser === 'MuKLeqkeH7e') {
        document.getElementById("passUserid").classList.remove("activepass")
        document.getElementById("notinstallpass").innerHTML = "Not Installed"
      }

      if(tempwron === 'FH5Fj3f2w'){
        document.getElementById("passUserSuperid").classList.add("activepass")
        document.getElementById("notinstallpass1").innerHTML = "Installed"
      } if(tempwron === 'Au62sHJGFf5r') {
        document.getElementById("passUserSuperid").classList.remove("activepass")
        document.getElementById("notinstallpass1").innerHTML = "Not Installed"
      }
      document.querySelector('.parameters').style.display = 'none';
    document.querySelector('.options').style.display = 'none';
  document.getElementById('SecuritytConfig').style.display = "block";
  
 
      break;
      case 6: // Exit    
      document.querySelector('.parameters').style.display = 'none';
    document.querySelector('.options').style.display = 'none';
  document.getElementById('ExitConfig').style.display = "block";
  
 
      break;
    // Добавьте другие case для остальных элементов меню
    default:
      break;
  }
}

  // Обновление активной строки
  function updateActiveLine() {
  let lines = [systemTimeElement, systemDateElement, overClock, overhyi, bootFail, bootFailGuard, CpuActive, amdTurbo, amdState, amdApm, multipliervol, multipliercpu, cpuvol, cpuvolnbb, htbus, htbusswidth, memclock, memtiming, onboardGpu, onboardGpucllock, DramVol, vol_1, vol_2, VCoreoff, VCoreDrop, save1st, load1st, save2st, load2st, advansCpuconf, advansChipconf, advansAcpicon, advansStor, advansPci, advansUsb, advansInstanflash, advansQuiet, advansQuiet2, advansEnha, advansThrot, advansOnboard, advansFront, advansOnboardLan, advansPrimary, advansInternal, advansShare, advansOnboardHdmi, advansSuspend, advansCheckReady, advansAwayMode, advansRestore, advansPCIDevices, advansKeyboard, advansRTC, advansRTCDate, advansRTCTime, advansACPI, advansDeep, advansOnboardSata, advansSataOper, advansSATaComb, advansSata2_1, advansSata2_2, advansSata2_3, advansSata2_4, advansHotPlug, advansSata2_2Auto, advansSMart, advansHotPlug2, advansSata2_2Auto2, advansSMart2, advansType, advansPIO, advansDMA, advansType4, advansLba4, advansblocktran, advansPIO4, advansDMA4, advansSmart4, advansPCItim, advansPsiIde, advansUsbcont, advansUsb2_0, advansUsbLegacy, advansKeyboaUsb, advansMousePower, otpenb, otpenb1, otpenb2, otp, caseopen, bootSett, boot1st, bootHardDisk, ChangeSett, ChangeUser, saveChanges, DiscardChangesAExit, DiscardChan, LoadBios, LoadPerfor, LoadPowerSav, stsat1, ndsam2, fulllog, hiddeAddon, bootfrom, bootnum, spufan, targetcpu, targetfan, spufan1, targetcpu1, targetfan1, spufan2, targetcpu2, targetfan2, systemDiskElement, systemLangElement, diskLine, lengua, sata_3, sata_4, sata_configr, system_inform];
  console.log(activeDisplay)
  // Если выбран Manual, добавляем cpufreq и pcieFre в массив lines
  if ((activeMenuItemIndex !== 2 && activeMenuItemIndex === 1)  && selectedOption === "Manual") {
    // Вставляем cpufreq и pcieFre после overhyi
    lines.splice(3, 0, cpufreq, pcieFre);
    // Удаляем класс "noactive" у элементов
    cpufreq.classList.remove("noactive");
    pcieFre.classList.remove("noactive");
    changeCpu_1.classList.remove("noactive");
    changeCpu_2.classList.remove("noactive");

  } else if ((activeMenuItemIndex !== 2 && activeMenuItemIndex === 1) && selectedOption === "Auto") { 
    // Добавляем класс "noactive" к элементам
    cpufreq.classList.add("noactive");
    pcieFre.classList.add("noactive");
    changeCpu_1.classList.add("noactive");
    changeCpu_2.classList.add("noactive");
  }

  // Убираем подсветку с каждой строки, если она не активна
  lines.forEach((line, index) => {
    line.classList.remove("active");
  });

  // Подсвечиваем только активную строку
  lines[activeDisplay].classList.add("active");

  if(activeDisplay === 55){
  const hoursElem = document.getElementById("rtcHours");
  const minutesElem = document.getElementById("rtcMinutes");
  const secondsElem = document.getElementById("rtcSeconds");
    // Сначала убираем подсветку со всех частей
    if (hoursElem) hoursElem.classList.remove("active");
  if (minutesElem) minutesElem.classList.remove("active");
  if (secondsElem) secondsElem.classList.remove("active");
    // Добавляем подсветку активной части
    
    if (timeActivePart === 0 && hoursElem) {
    hoursElem.classList.add("active");
  } else if (timeActivePart === 1 && minutesElem) {
    minutesElem.classList.add("active");
  } else if (timeActivePart === 2 && secondsElem) {
    secondsElem.classList.add("active");
  }
} else{
  document.getElementById("rtcHours").classList.remove("active");
  document.getElementById("rtcMinutes").classList.remove("active");
  document.getElementById("rtcSeconds").classList.remove("active");
}

  // Для Legacy Diskette A подсвечиваем обе строки: [1.44M, 3.5 in.] и Legacy Diskette A
  if (activeDisplay === 2) {
    changeCpu.classList.add('active');
  } else {
    changeCpu.classList.remove('active');
  }

  // Для Language подсвечиваем обе строки: [English] и Language
  if (activeDisplay === 3) {
    changeCpu_1.classList.add('active');
    lengua.classList.add("active");
    document.getElementById('option3').style.display = 'none';
    document.getElementById('option4').style.display = 'none';
    document.getElementById('option5').style.display = 'none';
    if (!cpufreq) {
        console.error("Не знайдено");
    } else if (!cpufreq.classList.contains("active")) {
        spredDisabled?.classList.add("active"); // Добавляем класс, если cpufreq не содержит "active"
    } 
} else {
    spredDisabled.classList.remove("active");
    systemLangElement.classList.remove("active");
    lengua.classList.remove("active");
    changeCpu_1.classList.remove('active');
    document.getElementById('option3').style.display = 'block';
    document.getElementById('option4').style.display = 'block';
    document.getElementById('option5').style.display = 'block';
}

  if (activeDisplay === 4) {
    sataone.classList.add("active");
    changeCpu_2.classList.add('active');
    cpufreq.classList.remove('active');
    if (changeCpu_2 && changeCpu_2.classList.contains('active')) {
        ramkaaElement.innerHTML = `
      <p style="font-size: 1.6rem;line-height: 1.45;">Set the PCIE frequency Range: 50MHz - 200MHz</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
          } 
   
      if (bootFail && bootFail.classList.contains('active')) {
        ramkaaElement.innerHTML = `
      <p>Enable or disable the feature of Boot Failure Guard.</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
          } 
      if (!cpufreq) {
        console.error("Не знайдено");
    } else if (bootFail.classList.contains("active")) {
      bootEnabled?.classList.add("active"); // Добавляем класс, если cpufreq не содержит "active"
    } 

  } else {
    sataone.classList.remove("active");
    changeCpu_2.classList.remove('active');
    bootEnabled.classList.remove('active');
  }
  if (activeDisplay === 5) {
    if (bootFailGuard.classList.contains("active")) {
      document.getElementById('bootGuard')?.classList.add("active"); // Добавляем класс, если cpufreq не содержит "active"
      ramkaaElement.innerHTML = `
      <p>Select count of Boot Failure Guard.</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } else{
      spredDisabled.classList.add("active");
      ramkaaElement.innerHTML = `
      <p>Config the feature of spread spectrum</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    }

  } else {
    sata_2.classList.remove("active");
    document.getElementById('bootGuard')?.classList.remove("active");
  }
  if (activeDisplay === 6) {
    sata_3.classList.add("active");
    if (bootFail && bootFail.classList.contains('active')) {
      bootEnabled.classList.add('active');
        ramkaaElement.innerHTML = `
      <p>Enable or disable the feature of Boot Failure Guard.</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
          } 
    if (CpuActive && CpuActive.classList.contains('active')) {
      document.getElementById('allCores').classList.add('active')
        ramkaaElement.innerHTML = `
      <p>All Cores
        <br>
        One Core Per Unit 
        <br>
        Two Cores 
        <br>
        Four Cores 
        <br>
        Six Cores</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
          } 
  } else {
    sata_3.classList.remove("active");
    document.getElementById('allCores').classList.remove('active')
  }
  if (activeDisplay === 7) {
    if (amdTurbo.classList.contains("active")) {
      document.getElementById('turbocoreAuto')?.classList.add("active"); // Добавляем класс, если cpufreq не содержит "active"
      ramkaaElement.innerHTML = `
      <p>Disabled<br>
        Enabled
        <br>
        Auto
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    }
    if (bootFailGuard.classList.contains("active")) {
      document.getElementById('bootGuard')?.classList.add("active"); // Добавляем класс, если cpufreq не содержит "active"
      ramkaaElement.innerHTML = `
      <p>Select count of Boot Failure Guard.</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else {
    sata_4.classList.remove("active");
    document.getElementById('turbocoreAuto')?.classList.remove("active");
  } 
  if (activeDisplay === 8) {
    if(amdState.classList.contains("active")){
      document.getElementById('amdstateend')?.classList.add("active");
      ramkaaElement.innerHTML = `
      <p>Disabled<br>Enabled</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
    if (CpuActive && CpuActive.classList.contains('active')) {
      document.getElementById('allCores').classList.add('active')
        ramkaaElement.innerHTML = `
      <p>All Cores
        <br>
        One Core Per Unit 
        <br>
        Two Cores 
        <br>
        Four Cores 
        <br>
        Six Cores</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
          } 

  } else {
    sata_configr.classList.remove("active");
    document.getElementById('amdstateend')?.classList.remove("active");
  }
  if (activeDisplay === 9) {
    if (amdTurbo.classList.contains("active")) {
      document.getElementById('turbocoreAuto')?.classList.add("active"); // Добавляем класс, если cpufreq не содержит "active"
      ramkaaElement.innerHTML = `
      <p>Disabled<br>
        Enabled
        <br>
        Auto
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
    if (amdApm.classList.contains("active")){
      document.getElementById('amdapmm')?.classList.add("active");
      ramkaaElement.innerHTML = `
      <p style="font-size: 0.8rem;">APM dynamically monitors core activity and generates an approximation of power consumption. 
When manually ad just the CPU Multiplier/Voltage, APM status will automatically be set to disable.</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    }
  } else {
    system_inform.classList.remove("active");
    document.getElementById('amdapmm')?.classList.remove("active");
  } 
  if (activeDisplay === 10){
    activdisp10 = true;
    if(amdState.classList.contains("active")){
      document.getElementById('amdstateend')?.classList.add("active");
      ramkaaElement.innerHTML = `
      <p>Disabled<br>Enabled</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
    if(multipliervol.classList.contains("active")){
          document.getElementById('multivol').classList.add('active')
          ramkaaElement.innerHTML = `
      <p>If Manual, multiplier and voltage will be set based on user selection. Final result is depending on CPU's capability. And Cool' n' Quiet will be disabled.</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
  } else {
    document.getElementById('multivol').classList.remove('active')
    activdisp10 = false;
  }
  if (activeDisplay === 11){
    if (amdApm.classList.contains("active")){
      document.getElementById('amdapmm')?.classList.add("active");
      ramkaaElement.innerHTML = `
      <p style="font-size: 0.8rem;">APM dynamically monitors core activity and generates an approximation of power consumption. 
When manually ad just the CPU Multiplier/Voltage, APM status will automatically be set to disable.</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    }
    if (multipliercpu.classList.contains("active")){
      document.getElementById('multipar')?.classList.add("active");
      ramkaaElement.innerHTML = `
      <p style="font-size: 1.8rem;">Adjust processor core frequency multiplier.</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    }
    
  } else{
    document.getElementById('multipar')?.classList.remove("active");
  }
  if (activeDisplay === 12){
    if(multipliervol.classList.contains("active")){
          document.getElementById('multivol').classList.add('active')
          ramkaaElement.innerHTML = `
      <p>If Manual, multiplier and voltage will be set based on user selection. Final result is depending on CPU's capability. And Cool' n' Quiet will be disabled.</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
    if(cpuvol.classList.contains("active")){
      document.getElementById('multipvol').classList.add('active')
      ramkaaElement.innerHTML = `
      <p>0.7000 V
        <br>
0.7500 V  
<br>
0.8000 V
<br>
0.8500 V 
<br> 
0.9000 V 
<br>
0.9500 V 
<br>
1.0000 V</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
  } else{
    document.getElementById('multipvol').classList.remove('active')
  }
  if (activeDisplay === 13){
    if(cpuvolnbb.classList.contains("active")){
       document.getElementById('multiNB').classList.add('active')
       ramkaaElement.innerHTML = `
      <p>Adjust processor built-in north bridge frequency multiplier.</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
       if(multipliercpu.classList.contains("active")){
       document.getElementById('multipar').classList.add('active')
       ramkaaElement.innerHTML = `
      <p style="font-size: 1.8rem;">Adjust processor core frequency multiplier.</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
    
  } else {
    document.getElementById('multiNB').classList.remove('active')
  }
  if (activeDisplay === 14){
    if(multipliervol.classList.contains("active")){
        //  document.getElementById('multivol').classList.add('active')
       }
    if(cpuvol.classList.contains("active")){
        document.getElementById('multipvol').classList.add('active')
        ramkaaElement.innerHTML = `
        <p>0.7000 V
        <br>
0.7500 V  
<br>
0.8000 V
<br>
0.8500 V 
<br> 
0.9000 V 
<br>
0.9500 V 
<br>
1.0000 V</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
    if(htbus.classList.contains("active")){
        document.getElementById('htbusspeed').classList.add('active')
        ramkaaElement.innerHTML = `
      <p>Select Hyper Transport Bus Speed.</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
    
  } else {
    document.getElementById('htbusspeed').classList.remove('active')
  }

  if (activeDisplay === 15){
    if(cpuvolnbb.classList.contains("active")){
        document.getElementById('multiNB').classList.add('active')
        ramkaaElement.innerHTML = `
      <p>Adjust processor built-in north bridge frequency multiplier.</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
    if(htbusswidth.classList.contains("active")){
        document.getElementById('htbuswidth').classList.add('active')
        ramkaaElement.innerHTML = `
      <p>Select Hyper Transport Bus Width.</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
    
  } else{
    document.getElementById('htbuswidth').classList.remove('active')
    
  } 
  if (activeDisplay === 16){
    if(htbus.classList.contains("active")){
        document.getElementById('htbusspeed').classList.add('active')
        ramkaaElement.innerHTML = `
      <p>Select Hyper Transport Bus Speed.</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
    if(memclock.classList.contains("active")){
        document.getElementById('memddr3').classList.add('active')
        ramkaaElement.innerHTML = `
      <p>Configure Memory Clock.</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
  } else{
    document.getElementById('memddr3').classList.remove('active')
  }
  if (activeDisplay === 17){
    if(htbusswidth.classList.contains("active")){
        document.getElementById('htbuswidth').classList.add('active')
        ramkaaElement.innerHTML = `
      <p>Select Hyper Transport Bus Width.</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
       if(memtiming.classList.contains("active")){
        ramkaaElement.innerHTML = `
      <p>Configure Memory Timing.</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
  }
  if (activeDisplay === 18){
    if(onboardGpu.classList.contains("active")){
        document.getElementById('onboarddiss').classList.add('active')
        ramkaaElement.innerHTML = `
      <p>Disabled 
        <br>
        Enabled
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
      if(memclock.classList.contains("active")){
        document.getElementById('memddr3').classList.add('active')
        ramkaaElement.innerHTML = `
      <p>Configure Memory Clock.</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       } 
  } else{
    document.getElementById('onboarddiss').classList.remove('active')
    
  }
  if (activeDisplay === 19){
    if(onboardGpucllock.classList.contains("active")){
        document.getElementById('onboardcount').classList.add('active')
        ramkaaElement.innerHTML = `
      <p>
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
    if(memtiming.classList.contains("active")){
        ramkaaElement.innerHTML = `
      <p>Configure Memory Timing.</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }  
  } else{
    document.getElementById('onboardcount').classList.remove('active')
  }
  if (activeDisplay === 20){
    if(DramVol.classList.contains("active")){
        document.getElementById('vol_1aut').classList.add('active')
        ramkaaElement.innerHTML = `
      <p>
        Minimum = 1.30V
        Maximum = 1.80V
        <br>
        <br>
        <br>
        <br>
        <p style="color: red"> System may be damaged or reduce its life cycle when overvoltage.</p>
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
    if(onboardGpu.classList.contains("active")){
        document.getElementById('onboarddiss').classList.add('active')
        ramkaaElement.innerHTML = `
      <p>Disabled 
        <br>
        Enabled
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }  
  } else {
    document.getElementById('vol_1aut').classList.remove('active')
  } 
  if (activeDisplay === 21){
    if(vol_1.classList.contains("active")){
        document.getElementById('vol_2aut').classList.add('active')
        ramkaaElement.innerHTML = `
      <p>
        Minimum = 1.05V
        Maximum = 1.30V
        <br>
        <br>
        <br>
        <br>
        <p style="color: red"> System may be damaged or reduce its life cycle when overvoltage.</p>
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
       if(onboardGpucllock.classList.contains("active")){
        document.getElementById('onboardcount').classList.add('active')
        ramkaaElement.innerHTML = `
      <p>
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       } 
  } else {
    document.getElementById('vol_2aut').classList.remove('active')
    
  } 
  if (activeDisplay === 22){
    if(vol_2.classList.contains("active")){
        document.getElementById('vcore_offaut').classList.add('active')
        ramkaaElement.innerHTML = `
      <p>
        Minimum = 2.30V
        Maximum = 2.70V
        <br>
        <br>
        <br>
        <br>
        <p style="color: red"> System may be damaged or reduce its life cycle when overvoltage.</p>
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
     if(DramVol.classList.contains("active")){
        document.getElementById('vol_1aut').classList.add('active')
        ramkaaElement.innerHTML = `
      <p>
        Minimum = 1.30V
        Maximum = 1.80V
        <br>
        <br>
        <br>
        <br>
        <p style="color: red"> System may be damaged or reduce its life cycle when overvoltage.</p>
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
  } else {
    document.getElementById('vcore_offaut').classList.remove('active')
    
  } 
  if (activeDisplay === 23){
    if(VCoreoff.classList.contains("active")){
        document.getElementById('vcore_dropoff').classList.add('active')
        ramkaaElement.innerHTML = `
      <p>
        Min = +0mV
        <br>
        Max = +150mV
        <br>
        <br>
        <br>
        <br>
        <p style="color: red"> System may be damaged or reduce its life cycle when overvoltage.</p>
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
    if(vol_1.classList.contains("active")){
        document.getElementById('vol_2aut').classList.add('active')
        ramkaaElement.innerHTML = `
      <p>
        Minimum = 1.05V
        Maximum = 1.30V
        <br>
        <br>
        <br>
        <br>
        <p style="color: red"> System may be damaged or reduce its life cycle when overvoltage.</p>
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
  } else {
    document.getElementById('vcore_dropoff').classList.remove('active')
    
  } 
  if (activeDisplay === 24){
    if(VCoreDrop.classList.contains("active")){
        document.getElementById('vcore_dropoff_1').classList.add('active')
        ramkaaElement.innerHTML = `
      <p>
        Auto
        <br>
        1.30mV
        <br>
        0.65mV
        <br>
        <br>
        <br>
        <p style="color: red"> System may be damaged or reduce its life cycle when overvoltage.</p>
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
    if(vol_2.classList.contains("active")){
        document.getElementById('vcore_offaut').classList.add('active')
        ramkaaElement.innerHTML = `
      <p>
        Minimum = 2.30V
        Maximum = 2.70V
        <br>
        <br>
        <br>
        <br>
        <p style="color: red"> System may be damaged or reduce its life cycle when overvoltage.</p>
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
  } else {
    document.getElementById('vcore_dropoff_1').classList.remove('active') 
  } 
  if (activeDisplay === 25){
    if(save1st.classList.contains("active")){
        ramkaaElement.innerHTML = `
      <p>
      Press [Enter] to save the changes as User Defaults.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
    if(VCoreoff.classList.contains("active")){
        document.getElementById('vcore_dropoff').classList.add('active')
        ramkaaElement.innerHTML = `
      <p>
        Min = +0mV
        <br>
        Max = +150mV
        <br>
        <br>
        <br>
        <br>
        <p style="color: red"> System may be damaged or reduce its life cycle when overvoltage.</p>
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       } 
  } else {
   
  } 
  if (activeDisplay === 26, 28, 30){
    if(VCoreDrop.classList.contains("active")){
        document.getElementById('vcore_dropoff_1').classList.add('active')
        ramkaaElement.innerHTML = `
      <p>
        Auto
        <br>
        1.30mV
        <br>
        0.65mV
        <br>
        <br>
        <br>
        <p style="color: red"> System may be damaged or reduce its life cycle when overvoltage.</p>
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
    if(load1st.classList.contains("active")){
        ramkaaElement.innerHTML = `
      <p>
        Press [Enter] to load as User Defaults.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
       if(load2st.classList.contains("active")){
        ramkaaElement.innerHTML = `
      <p>
        Press [Enter] to load as User Defaults.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
    if(advansChipconf.classList.contains("active")){
        ramkaaElement.innerHTML = `
      <p>
        Configure Chipset settings.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }

  } else{
    
  }

  if (activeDisplay === 31){
    if(advansAcpicon.classList.contains("active")){
        
        ramkaaElement.innerHTML = `
      <p id="ppsize" style="font-size: 1.6rem">
        Section for Advanced 
        <br>
        ACPI Configuration
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    
  }
  if (activeDisplay === 32){
    if(advansStor.classList.contains("active")){
        
        ramkaaElement.innerHTML = `
      <p id="ppsize" style="font-size: 1.6rem">
     Configure storage devices.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    
  }
  if (activeDisplay === 33){
    if(advansPci.classList.contains("active")){
        
        ramkaaElement.innerHTML = `
      <p>
    Configure PCI/PnP settings.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  }
  if (activeDisplay === 34){
    if(advansUsb.classList.contains("active")){
        
        ramkaaElement.innerHTML = `
      <p>
    Configure the USB support.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  }
  if (activeDisplay === 35){
    if(advansInstanflash.classList.contains("active")){
        
        ramkaaElement.innerHTML = `
      <p>
        Supported device: 
USB, Floppy, HDD. 
Supported file system: 
FAT12, FAT16, FAT32.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  }
  if (activeDisplay === 27, 29){
    if(save2st.classList.contains("active")){
        ramkaaElement.innerHTML = `
      <p>
      Press [Enter] to save the changes as User Defaults.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
       if(save1st.classList.contains("active")){
        ramkaaElement.innerHTML = `
      <p>
      Press [Enter] to save the changes as User Defaults.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
    if(advansCpuconf.classList.contains("active")){
        ramkaaElement.innerHTML = `
      <p>
      Configure CPU
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
       }
  } 
  if (activeDisplay === 36){
    if(advansQuiet.classList.contains("active")){
        document.getElementById('advansQuiet1').classList.add('active')
        ramkaaElement.innerHTML = `
      <p id="ppsize" style="font-size: 1.6rem">
        Enabling this function may reduce CPU voltage and memory freq., and lead to system stability or compatibility issue with some memory modules or power supplies. Please set this item to [Disablel if above issue occurs.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    document.getElementById('advansQuiet1').classList.remove('active') 
  }
  if (activeDisplay === 37){
    if(advansQuiet2.classList.contains("active")){
        document.getElementById('advansQuiet3').classList.add('active')
        ramkaaElement.innerHTML = `
      <p id="ppsize" style="">
        Configure 
        <br>
Processor Assisted 
Virtualization.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    document.getElementById('advansQuiet3').classList.remove('active')
  }
  if (activeDisplay === 38){
    if(advansEnha.classList.contains("active")){
        document.getElementById('advansEnhapar').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        Enable this feature will let your system utilize the AMD specific ACPI states to save power consumption.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    document.getElementById('advansEnhapar').classList.remove('active')
  }
  if (activeDisplay === 39){
    if(advansThrot.classList.contains("active")){
        document.getElementById('advansThrotpar').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        Disabled 
        <br>
Auto 
<br>
12.5% 
<br>
25% 
<br>
37.5%
<br> 
50% 
<br>
62.5%
<br> 
75% 
<br>
87.5%

        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    document.getElementById('advansThrotpar').classList.remove('active')
  }
  if (activeDisplay === 40){
    if(advansOnboard.classList.contains("active")){
        document.getElementById('advansOnboardAuto').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        Auto/Enable/Disable <br> Onboard HD Audio.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    document.getElementById('advansOnboardAuto').classList.remove('active')
  }
  if (activeDisplay === 41){
    if(advansFront.classList.contains("active")){
        document.getElementById('advansFrontHD').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        Select Front Panel Typ. 
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    document.getElementById('advansFrontHD').classList.remove('active')
  }
  if (activeDisplay === 42){
    if(advansOnboardLan.classList.contains("active")){
        document.getElementById('advansOnboardLanEnab').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        Enable/Disable Onboard <br> LAN Device.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    document.getElementById('advansOnboardLanEnab').classList.remove('active')
  }
  if (activeDisplay === 43){
    if(advansPrimary.classList.contains("active")){
        document.getElementById('advansPrimaryPci').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        Select the type of primary VGA in case of multiple video controllers.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    document.getElementById('advansPrimaryPci').classList.remove('active')
  }
  if (activeDisplay === 44){
    if(advansInternal.classList.contains("active")){
        document.getElementById('advansInternalUma').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        Disable
        <br>
        UMA
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    document.getElementById('advansInternalUma').classList.remove('active')
  }
  if (activeDisplay === 45){
    if(advansShare.classList.contains("active")){
        document.getElementById('advansShareAut').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
       Set share memory size of the onboard VGA.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    document.getElementById('advansShareAut').classList.remove('active')
  }
  if (activeDisplay === 46){
    if(advansOnboardHdmi.classList.contains("active")){
        document.getElementById('advansOnboardHdmiEn').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
       Disabled
       <br>
       Enabled
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    document.getElementById('advansOnboardHdmiEn').classList.remove('active')
  }
  if (activeDisplay === 47){
    if(advansSuspend.classList.contains("active")){
        document.getElementById('advansSuspendAuto').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        Select auto-detect or disable the STR feature.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    document.getElementById('advansSuspendAuto').classList.remove('active')
  }
  if (activeDisplay === 48){
    if(advansCheckReady.classList.contains("active")){
        document.getElementById('advansCheckReadyAuto').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        Auto
        <br>
        Enabled
        <br>
        Disabled
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    document.getElementById('advansCheckReadyAuto').classList.remove('active')
  }
  if (activeDisplay === 49){
    if(advansAwayMode.classList.contains("active")){
        document.getElementById('advansAwayMDisabled').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        Enable Away Mode in Windows Media Center Edition.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    document.getElementById('advansAwayMDisabled').classList.remove('active')
  }
  if (activeDisplay === 50){
    if(advansRestore.classList.contains("active")){
        document.getElementById('advansRestorePower').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        Set the power state after an unexpected AC/Power loss.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    document.getElementById('advansRestorePower').classList.remove('active')
  }
  if (activeDisplay === 51){
    if(advansPCIDevices.classList.contains("active")){
        document.getElementById('advansPCIDevicesDisb').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        Enable or disable the PCI PME# power on feature.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    document.getElementById('advansPCIDevicesDisb').classList.remove('active')
  }
  if (activeDisplay === 52){
    if(advansKeyboard.classList.contains("active")){
        document.getElementById('advansKeyboardDisa').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        Enable or disable the keyboard power on feature.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    document.getElementById('advansKeyboardDisa').classList.remove('active')
  }
  if (activeDisplay === 53){
    if(advansRTC.classList.contains("active")){
        document.getElementById('advansRTCByOs').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        If your OS supports RTC power on feature, you may set to [By OS] to let it handled by OS.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    document.getElementById('advansRTCByOs').classList.remove('active')
  }
  if (activeDisplay === 54){
    if(advansACPI.classList.contains("active")){
        document.getElementById('advansACPIEnabl').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        Set Date of RTC power on feature.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
    if(advansRTCDate.classList.contains("active")){
        document.getElementById('advansRTCDatechose').classList.add('active')
    } 
  } else{
    
    document.getElementById('advansRTCDatechose').classList.remove('active')
  }
  if (activeDisplay === 55){
    ramkaaElement.innerHTML = `
      <p style="">
        Set Alarm time of RTC power on feature.
        <br>
        (You will be notified at a specified time)
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
  } else{
    
  }
  if (activeDisplay === 56){
    if(advansACPI.classList.contains("active")){
        document.getElementById('advansACPIEnabl').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
 Disabled
 <br>
 Enabled
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    document.getElementById('advansACPIEnabl').classList.remove('active')
  }
  if (activeDisplay === 57){
    if(advansDeep.classList.contains("active")){
        document.getElementById('advansDeepDisa').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
 Disabled
 <br>
 Enabled
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    advansDeepDisa.classList.remove('active')
  }
  if (activeDisplay === 58){
    if(advansOnboardSata.classList.contains("active")){
        document.getElementById('advansOnboSataEnb').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        Configure onboard 
serial ATA 
Controller
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    advansOnboSataEnb.classList.remove('active')
  }
  if (activeDisplay === 59){
    if(advansSataOper.classList.contains("active")){
        document.getElementById('advansSataAhci').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        IDE Mode /AHCI Mode /RAID Mode.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    advansSataAhci.classList.remove('active')
  }
  if (activeDisplay === 60){
    if(advansSATaComb.classList.contains("active")){
        document.getElementById('advansCombEnab').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        Disabled
        <br>
        Enabled
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    advansCombEnab.classList.remove('active')
  }
  if (activeDisplay === 61){
    if(advansSata2_1.classList.contains("active")){
        document.getElementById('advans2_1Not').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="font-size: 1.5rem;">
        While entering setup, BIOS auto detects the presence of IDE devices. This displays the status of auto detection of IDE devices.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    advans2_1Not.classList.remove('active')
  }
  if (activeDisplay === 62){
    if(advansSata2_2.classList.contains("active")){
        document.getElementById('advans2_2Not').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="font-size: 1.5rem;">
        While entering setup, BIOS auto detects the presence of IDE devices. This displays the status of auto detection of IDE devices.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    advans2_2Not.classList.remove('active')
  }
  if (activeDisplay === 63){
    if(advansSata2_3.classList.contains("active")){
        document.getElementById('advans2_3CD').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="font-size: 1.5rem;">
        While entering setup, BIOS auto detects the presence of IDE devices. This displays the status of auto detection of IDE devices.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    advans2_3CD.classList.remove('active')
  }
  if (activeDisplay === 64){
    if(advansSata2_4.classList.contains("active")){
        document.getElementById('advansSataDisk').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="font-size: 1.5rem;">
        While entering setup, BIOS auto detects the presence of IDE devices. This displays the status of auto detection of IDE devices.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    advansSataDisk.classList.remove('active')
  }
  if (activeDisplay === 65){
    if(advansHotPlug.classList.contains("active")){
        document.getElementById('advansDisablPlug').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        Disabled
        <br>
        Enabled
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    advansDisablPlug.classList.remove('active')
  }
  if (activeDisplay === 66){
    if(advansSata2_2Auto.classList.contains("active")){
        document.getElementById('advans2_2AUto').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        Select the type of device connected to the system.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    advans2_2AUto.classList.remove('active')
  }
  if (activeDisplay === 67){
    if(advansSMart.classList.contains("active")){
        document.getElementById('advansSmarEnab').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="font-size: 1.5rem;">
        S.M.A.R.T. stands for Self-Monitoring, Analysis and Reporting Technology.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    advansSmarEnab.classList.remove('active')
  }
  if (activeDisplay === 68){
    if(advansHotPlug2.classList.contains("active")){
        document.getElementById('advansDisablPlug2').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        Disabled
        <br>
        Enabled
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    advansDisablPlug2.classList.remove('active')
  }
  if (activeDisplay === 69){
    if(advansSata2_2Auto2.classList.contains("active")){
        document.getElementById('advans2_2AUto2').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        Select the type of device connected to the system.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    advans2_2AUto2.classList.remove('active')
  }
  if (activeDisplay === 70){
    if(advansSMart2.classList.contains("active")){
        document.getElementById('advansSmarEnab2').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="font-size: 1.5rem;">
        S.M.A.R.T. stands for Self-Monitoring, Analysis and Reporting Technology.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    advansSmarEnab2.classList.remove('active')
  } 
  if (activeDisplay === 71){
    if(advansType.classList.contains("active")){
        document.getElementById('advansDisablPlug3').classList.add('active')
        activdisp71 = true;
        ramkaaElement.innerHTML = `
      <p style="">
        Select the type of device commected to the system.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    advansDisablPlug3.classList.remove('active')
    activdisp71 = false;
  }
  if (activeDisplay === 72){
    if(advansPIO.classList.contains("active")){
        document.getElementById('advans2_2AUto3').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        Select PIO Mode.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    advans2_2AUto3.classList.remove('active')
  }
  if (activeDisplay === 73){
    if(advansDMA.classList.contains("active")){
        document.getElementById('advansSmarEnab3').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="font-size: 1.5rem;">
        Select DMA Mode.
        <br> 
Auto : Auto detected 
<br>
SWDMAn: SingleWordDMAN 
<br>
MWDMAN: MultiWordDMAn 
<br>
UDMAN: UltraDMAn
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    advansSmarEnab3.classList.remove('active')
  }
  if (activeDisplay === 74){
    if(advansType4.classList.contains("active")){
        document.getElementById('advansDisablPlug4').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        Select the type of device commected to the system.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    advansDisablPlug4.classList.remove('active')
  }
  if (activeDisplay === 75){
    if(advansLba4.classList.contains("active")){
        document.getElementById('advanslba_4').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="font-size: 1.5rem;">
        Disabled: Disables LBA Mode.
        <br> 
Auto: Enables LBA 
Mode if the device supports it and the device is not already formatted with LBA Mode disabled.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    advanslba_4.classList.remove('active')
  }
  if (activeDisplay === 76){
    if(advansblocktran.classList.contains("active")){
        document.getElementById('advansBlocktransfer').classList.add('active')
    } 
  } else{
    advansBlocktransfer.classList.remove('active')
  }
  if (activeDisplay === 77){
    if(advansPIO4.classList.contains("active")){
        document.getElementById('advans2_2AUto4').classList.add('active')
    } 
  } else{
    advans2_2AUto4.classList.remove('active')
  }
  if (activeDisplay === 78){
    if(advansDMA4.classList.contains("active")){
        document.getElementById('advansDmb4').classList.add('active')
    } 
  } else{
    advansDmb4.classList.remove('active')
  }
  if (activeDisplay === 79){
    if(advansSmart4.classList.contains("active")){
        document.getElementById('advansSmarDisab4').classList.add('active')
    } 
  } else{
    advansSmarDisab4.classList.remove('active')
  }
  if (activeDisplay === 80){
    if(advansPCItim.classList.contains("active")){
        document.getElementById('advanspcitim32').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        Value in units of PCI clocks for PCI device 
latency timer 
register.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    advanspcitim32.classList.remove('active')
  }
  if (activeDisplay === 81){
    if(advansPsiIde.classList.contains("active")){
        document.getElementById('advansIdepsiEn').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        ENABLED: BIOS uses PCI busmastering for reading / writing to IDE drives.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    advansIdepsiEn.classList.remove('active')
  }
  if (activeDisplay === 82){
    if(advansUsbcont.classList.contains("active")){
        document.getElementById('advansUsbEnab').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
      To enable or disable the onboard USB controllers.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    advansUsbEnab.classList.remove('active')
  }
  if (activeDisplay === 83){
    if(advansUsb2_0.classList.contains("active")){
        document.getElementById('advansUsb2_0Enab').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
      To enable or disable USB 2.0 support.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    advansUsb2_0Enab.classList.remove('active')
  }
  if (activeDisplay === 84){
    if(advansUsbLegacy.classList.contains("active")){
        document.getElementById('advansLegacyEnab').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="font-size: 1.5rem;">
      Use this option to select legacy support for USB devices. 
      If you have USB compatibility issue, it is recommended to select [Disabled] to enter OS.
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    advansLegacyEnab.classList.remove('active')
  }
  if (activeDisplay === 85){
    if(advansKeyboaUsb.classList.contains("active")){
        document.getElementById('advansKeyboaDisabl').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
        Disabled
        <br>
        Enabled
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    advansKeyboaDisabl.classList.remove('active')
  }
  if (activeDisplay === 86){
    if(advansMousePower.classList.contains("active")){
        document.getElementById('advansMouseDisabl').classList.add('active')
        ramkaaElement.innerHTML = `
      <p style="">
      Disabled
      <br>
      Enabled
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    } 
  } else{
    advansMouseDisabl.classList.remove('active')
  }
  if (activeDisplay === 87){
        ramkaaElement.innerHTML = `
      <p style="">
        
        </p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    
  }
  if (activeDisplay === 88){
    ramkaaElement.innerHTML = `
  <p style="">
    
    </p>
  <div class="ramkaaa" style="font-size: 1.5rem;">
    <p>←→ Select Screen</p>
    <p>↑↓ Select item</p>
    <p>+- Change Field</p>
    <p>F1 General Help</p>
    <p>F10 Save and Exit</p>
    <p>ESC Exit</p>
  </div>`;

}
if (activeDisplay === 89){
    ramkaaElement.innerHTML = `
  <p style="">
    
    </p>
  <div class="ramkaaa" style="font-size: 1.5rem;">
    <p>←→ Select Screen</p>
    <p>↑↓ Select item</p>
    <p>+- Change Field</p>
    <p>F1 General Help</p>
    <p>F10 Save and Exit</p>
    <p>ESC Exit</p>
  </div>`;
}    
if (activeDisplay === 90){
    ramkaaElement.innerHTML = `
  <p style="">
    Disabled
    <br>
    Enabled
    </p>
  <div class="ramkaaa" style="font-size: 1.5rem;">
    <p>←→ Select Screen</p>
    <p>↑↓ Select item</p>
    <p>+- Change Field</p>
    <p>F1 General Help</p>
    <p>F10 Save and Exit</p>
    <p>ESC Exit</p>
  </div>`;
}
if (activeDisplay === 91){
    ramkaaElement.innerHTML = `
  <p style="">
  Enable or disable the 
  feature of Case 
  Open.
    </p>
  <div class="ramkaaa" style="font-size: 1.5rem;">
    <p>←→ Select Screen</p>
    <p>↑↓ Select item</p>
    <p>+- Change Field</p>
    <p>F1 General Help</p>
    <p>F10 Save and Exit</p>
    <p>ESC Exit</p>
  </div>`;
} 
if (activeDisplay === 92){
    ramkaaElement.innerHTML = `
  <p style="">
  Configure Settings during System Boot.
    </p>
  <div class="ramkaaa" style="font-size: 1.5rem;">
    <p>←→ Select Screen</p>
    <p>↑↓ Select item</p>
    <p>+- Change Field</p>
    <p>F1 General Help</p>
    <p>F10 Save and Exit</p>
    <p>ESC Exit</p>
  </div>`;
} 
if (activeDisplay === 93){
    ramkaaElement.innerHTML = `
  <p style="font-size: 1.5rem;">
  Specifies the boot sequence from the available devices. 
A device enclosed in parenthesis has been disabled in the corresponding type menu.
    </p>
  <div class="ramkaaa" style="font-size: 1.5rem;">
    <p>←→ Select Screen</p>
    <p>↑↓ Select item</p>
    <p>+- Change Field</p>
    <p>F1 General Help</p>
    <p>F10 Save and Exit</p>
    <p>ESC Exit</p>
  </div>`;
}
if (activeDisplay === 94){
    ramkaaElement.innerHTML = `
  <p style="">
  Specifies the Boot Device 
Priority sequence from available Hard Drives.
    </p>
  <div class="ramkaaa" style="font-size: 1.5rem;">
    <p>←→ Select Screen</p>
    <p>↑↓ Select item</p>
    <p>+- Change Field</p>
    <p>F1 General Help</p>
    <p>F10 Save and Exit</p>
    <p>ESC Exit</p>
  </div>`;
}
if (activeDisplay === 95){
  ramkaaElement.innerHTML = `
<p style="">
Install or Change the password.
  </p>
<div class="ramkaaa" style="font-size: 1.5rem;">
  <p>←→ Select Screen</p>
  <p>↑↓ Select item</p>
  <p>+- Change Field</p>
  <p>F1 General Help</p>
  <p>F9 Load Defaults</p>
  <p>F10 Save and Exit</p>
  <p>ESC Exit</p>
</div>`;
}
if (activeDisplay === 96){
  ramkaaElement.innerHTML = `
<p style="">
Install or Change the password.
  </p>
<div class="ramkaaa" style="font-size: 1.5rem;">
  <p>←→ Select Screen</p>
  <p>↑↓ Select item</p>
  <p>+- Change Field</p>
  <p>F1 General Help</p>
  <p>F9 Load Defaults</p>
  <p>F10 Save and Exit</p>
  <p>ESC Exit</p>
</div>`;
}
if (activeDisplay === 97){
  ramkaaElement.innerHTML = `
<p style="">
Exit system setup after saving the changes. 
<br>
<br>
F10 key can be used for this operation.
  </p>
<div class="ramkaaa" style="font-size: 1.5rem;">
  <p>←→ Select Screen</p>
  <p>↑↓ Select item</p>
  <p>+- Change Field</p>
  <p>F1 General Help</p>
  <p>F9 Load Defaults</p>
  <p>F10 Save and Exit</p>
  <p>ESC Exit</p>
</div>`;
}
if (activeDisplay === 98){
  ramkaaElement.innerHTML = `
<p style="">
Exit system setup without saving any changes. 
<br>
<br>
ESC key can be used for this operation.
  </p>
<div class="ramkaaa" style="font-size: 1.5rem;">
  <p>←→ Select Screen</p>
  <p>↑↓ Select item</p>
  <p>+- Change Field</p>
  <p>F1 General Help</p>
  <p>F9 Load Defaults</p>
  <p>F10 Save and Exit</p>
  <p>ESC Exit</p>
</div>`;
}
if (activeDisplay === 99){
  ramkaaElement.innerHTML = `
<p style="">
Discards changes done so far to any of the setup questions. 
<br>
<br>
F7 key can be used for this operation.
  </p>
<div class="ramkaaa" style="font-size: 1.5rem;">
  <p>←→ Select Screen</p>
  <p>↑↓ Select item</p>
  <p>+- Change Field</p>
  <p>F1 General Help</p>
  <p>F9 Load Defaults</p>
  <p>F10 Save and Exit</p>
  <p>ESC Exit</p>
</div>`;
}
if (activeDisplay === 100){
  ramkaaElement.innerHTML = `
<p style="">
Load BIOS Default values for all the setup questions. 
<br>
<br>
F9 key can be used for this operation.
  </p>
<div class="ramkaaa" style="font-size: 1.5rem;">
  <p>←→ Select Screen</p>
  <p>↑↓ Select item</p>
  <p>+- Change Field</p>
  <p>F1 General Help</p>
  <p>F9 Load Defaults</p>
  <p>F10 Save and Exit</p>
  <p>ESC Exit</p>
</div>`;
}
if (activeDisplay === 101){
  ramkaaElement.innerHTML = `
<p style="font-size: 1.3rem;">
This performance Setup Default may not be compatible with all system configurations. 
If system boot failure occurs after loading this setting, please resume BIOS default. 
F4 key can be used for this operation.
  </p>
<div class="ramkaaa" style="font-size: 1.5rem;">
  <p>←→ Select Screen</p>
  <p>↑↓ Select item</p>
  <p>+- Change Field</p>
  <p>F1 General Help</p>
  <p>F9 Load Defaults</p>
  <p>F10 Save and Exit</p>
  <p>ESC Exit</p>
</div>`;
}
if (activeDisplay === 102){
  ramkaaElement.innerHTML = `
<p style="">
Load Power Saving Setup Default. 
<br>
F6 key can be used for this operation.
  </p>
<div class="ramkaaa" style="font-size: 1.5rem;">
  <p>←→ Select Screen</p>
  <p>↑↓ Select item</p>
  <p>+- Change Field</p>
  <p>F1 General Help</p>
  <p>F9 Load Defaults</p>
  <p>F10 Save and Exit</p>
  <p>ESC Exit</p>
</div>`;
}
if (activeDisplay === 103){
    ramkaaElement.innerHTML = `
  <p style="">
  Specifies the boot sequence from the available devices.
    </p>
  <div class="ramkaaa" style="font-size: 1.5rem;">
    <p>←→ Select Screen</p>
    <p>↑↓ Select item</p>
    <p>+- Change Field</p>
    <p>F1 General Help</p>
    <p>F10 Save and Exit</p>
    <p>ESC Exit</p>
  </div>`;
}             
if (activeDisplay === 104){
    ramkaaElement.innerHTML = `
  <p style="">
  Specifies the boot sequence from the available devices.
    </p>
  <div class="ramkaaa" style="font-size: 1.5rem;">
    <p>←→ Select Screen</p>
    <p>↑↓ Select item</p>
    <p>+- Change Field</p>
    <p>F1 General Help</p>
    <p>F10 Save and Exit</p>
    <p>ESC Exit</p>
  </div>`;
}   

  // Снимаем подсветку с частей времени и даты, если они не активны
  if (activeDisplay === 0) {
    timeParts.forEach((part, index) => {
      part.classList.remove("active");
      if (index === timeActivePart) {
        part.classList.add("active");
      }
    });
  } else {
    timeParts.forEach(part => part.classList.remove("active"));
  }

  if (activeDisplay === 1) {
    dateParts.forEach((part, index) => {
      part.classList.remove("active");
      if (index === dateActivePart) {
        part.classList.add("active");
      }
    });
  } else {
    dateParts.forEach(part => part.classList.remove("active"));
  }

  // Обновление текста в ramkaa
  if (activeDisplay === 0) {
    ramkaaElement.innerHTML = `
    <div class="ram1" style="font-size: 3vh;">
      <p>Use [Enter], [TAB] or [SHIFT-TAB] to select a field.</p>
      <p>Use [+] or [-] to configure system Time.</p>
      </div>
      <div class="ramkaaa" style="font-size: 2.5vh;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>Tab Select Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
    document.querySelector('.options').style.display = 'block';
    document.querySelector('.parameters').style.display = 'block';
  } else if (activeDisplay === 1) {
    ramkaaElement.innerHTML = `
      <p>Use [Enter], [TAB] or [SHIFT-TAB] to select a field.</p>
      <p>Use [+] or [-] to configure system Date.</p>
      <div class="ramkaaa" style="font-size: 3vh;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>Tab Select Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
  } else if (activeDisplay === 2) {
    
    ramkaaElement.innerHTML = `
      <p>Select the over clock mode.</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
  } else if (activeDisplay === 3) {
    changeCpu.classList.remove('active');
    if (cpufreq && cpufreq.classList.contains('active')) {
      ramkaaElement.innerHTML = `
      <p style="font-size: 1.6rem;line-height: 1.45;">Set the CPU frequency Range: 100MHz - 400MHz</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
          } 

    if (overhyi && overhyi.classList.contains('active')) {
          ramkaaElement.innerHTML = `
      <p>Config the feature of spread spectrum</p>
      <div class="ramkaaa" style="font-size: 1.5rem;">
        <p>←→ Select Screen</p>
        <p>↑↓ Select item</p>
        <p>+- Change Field</p>
        <p>F1 General Help</p>
        <p>F10 Save and Exit</p>
        <p>ESC Exit</p>
      </div>`;
          }
  }

  return lines;
}



  // Переключение строк
  // Переключение строк с учетом скрытых элементов
// Переключение строк с учетом скрытых элементов
function switchLine(direction) {
  if (!isSystemInformActive && !isSataConfigActive && !isSataAlertActive) { // Переключение работает только если system_inform, sata_config и sata_alert не активны
    const visibleLines = getVisibleLines(); // Получаем массив видимых элементов
    const currentIndex = visibleLines.indexOf(activeDisplay); // Находим индекс текущего активного элемента в массиве видимых

    if (currentIndex === -1) {

      // Если текущий активный элемент не найден среди видимых, выбираем первый видимый элемент

      
      activeDisplay = visibleLines[0];

    } else {
      // Вычисляем новый индекс с учетом направления
      let newIndex = (currentIndex + direction + visibleLines.length) % visibleLines.length;
      activeDisplay = visibleLines[newIndex]; // Обновляем activeDisplay

    } 
    
if (activeMenuItemIndex === 0) { /// Максимальное значение переключений для Main
    if(activeDisplay >= 2){
    activeDisplay = 1
    } 
  }
  if (activeMenuItemIndex === 1) { /// Максимальное значение переключений для OcTweaker
    if(!cpufreq.classList.contains("noactive")){
      if(activeDisplay >= 31){
    activeDisplay = 2
    }} else{ 
      if(activeDisplay >= 29){
    activeDisplay = 2
    }}
  }
  if (activeMenuItemIndex === 4) { // Максимальное значение переключений для boot
  
}

  if(AdvancedBlock1 === true){
    if(activeDisplay === 28){
      activeDisplay = 29;
    }
   if(activeDisplay === 40){
     activeDisplay = 35
    }
  }

  if(CPUConfBlock === true){
    if(activeDisplay === 29){
      activeDisplay = 36
    }
    if(activeDisplay === 35){
      activeDisplay = 39
    }
  }
  if(AdvancedSetBlock === true){
    if(activeDisplay === 29){
      activeDisplay = 40;
      console.log('строка 3456')
    } else if(activeDisplay === 47){
      activeDisplay = 40;
      console.log('строка 3456')
    }
  }

if(AcpiConfiggBlock === true){
  if(activeDisplay === 46){
      activeDisplay = 47;
    } else if(activeDisplay === 58){
      activeDisplay = 57;
    }
} 
if(StorageConfiggBlock === true){
  if(activeDisplay === 57){
      activeDisplay = 58;
    } if(activeDisplay === 65){
      activeDisplay = 58;
    }
}
if(StorageConfiggBlock_2 === true){
  if(activeDisplay === 57){
      activeDisplay = 58;               
    } else if(activeDisplay === 2){
      activeDisplay = 58;
    }
}
if(StorageConfiggBlock_3 === true){   
  if(activeDisplay === 57){
      activeDisplay = 58;
    } else if(activeDisplay === 2){
      activeDisplay = 62;
    }
} if(StorageConfiggBlock_4 === false){
  if(activeDisplay === 57){
      activeDisplay = 58;
    } else if(activeDisplay === 65){
      activeDisplay = 58;
    }
} 
if(sataAdvanc2_2 === true){
  if(activeDisplay === 68){
      activeDisplay = 65;
    } else if(activeDisplay === 64){
      activeDisplay = 67;
    }
} 
if(sataAdvanc2_22 === true){
  if(activeDisplay === 67){
      activeDisplay = 68;
    } else if(activeDisplay === 67){
      activeDisplay = 68;
    }
} 

if(PCIPnP === true){
  if(activeDisplay === 79){
    activeDisplay = 80
  }
  if(activeDisplay === 82){
    activeDisplay = 81
  }
}
if(USBchos === true){
  if(activeDisplay === 81){
    activeDisplay = 82
  }
  if(activeDisplay === 87){
    activeDisplay = 86
  }
}
if(storageConfigNew === true){
  if(activeDisplay === 57){
    activeDisplay = 58
  }
  if(activeDisplay === 65){
    activeDisplay = 64
  }
}

if(max3elem === false){
  if(activeDisplay === 111){
    activeDisplay = 112
  }
  if(activeDisplay === 115){
    console.log('max3lem')
    activeDisplay = 114
  }
}
if(max2elem === false){
  if(activeDisplay === 111){
    activeDisplay = 112
  }
  if(activeDisplay === 115){
    activeDisplay = 114
    console.log('max2lem')
  }
}
if(max1elem === false){
  if(activeDisplay === 115){
    activeDisplay = 112
  }
  if(activeDisplay === 111){
    activeDisplay = 112
  }
}



   //   activeDisplay = 115
   



if (activeMenuItemIndex === 3) { /// Максимальное значение переключений для HWMonitor
      if(activeDisplay === 86){
    activeDisplay = 87
    }
    if(activeDisplay === 92){
      activeDisplay = 91
      }
if(cpuFan2){
    if(activeDisplay === 2){
      activeDisplay = 117
      const element = document.getElementById('targetfan2');
      if(window.getComputedStyle(element).display === 'none'){
        activeDisplay = 115
      }
    }
    if(activeDisplay === 114){
    activeDisplay = 115
    }
  }
if(cpuFan1){
    if(activeDisplay === 2){
      activeDisplay = 117
      const element = document.getElementById('targetfan1');
      if(window.getComputedStyle(element).display === 'none'){
        activeDisplay = 115
      }
    }
    if(activeDisplay === 116){
    activeDisplay = 115
    }
  }
if(cpuFan){
    if(activeDisplay === 2){
      activeDisplay = 117
      const element = document.getElementById('targetfan');
      if(window.getComputedStyle(element).display === 'none'){
        activeDisplay = 115
      }
    }
    if(activeDisplay === 108){
    activeDisplay = 109
    }
    if(activeDisplay === 112){
      activeDisplay = 111
      }
  }
  }
  if (activeMenuItemIndex === 4) { /// Максимальное значение переключений для Boot
    
     if(bootsetting2){
      if(activeDisplay === 104){
        activeDisplay = 105
       }
       if(activeDisplay >= 109){
        activeDisplay = 108
       }
     }

     if(bootsetting){
     if(activeDisplay === 102){
      activeDisplay = 103
     }
     if(activeDisplay >= 105){
      activeDisplay = 104
     }
    }

     
     if(bootCheck === false) {
     if(activeDisplay === 95){
      activeDisplay = 94
     }
     if(activeDisplay === 91){
      activeDisplay = 92
     }
    }

  }
  if (activeMenuItemIndex === 5) { /// Максимальное значение переключений для Security
  
      if(activeDisplay === 94){
    activeDisplay = 95
    }
    if(activeDisplay === 2){
    activeDisplay = 96
    }
    if(activeDisplay >= 97){
    activeDisplay = 96
    }
  }
  if (activeMenuItemIndex === 6) { /// Максимальное значение переключений для Exit
      if(activeDisplay === 96){
    activeDisplay = 97
    }
    if(activeDisplay === 2){
    activeDisplay = 102
    }
    if(activeDisplay === 103){
      activeDisplay = 102
      }
  }
    updateActiveLine(); // Оновлюємо підсвічування
  }

}

  // Получение массива индексов видимых элементов
  function getVisibleLines() {
  let lines = [systemTimeElement, systemDateElement, overClock, overhyi, bootEnabled, bootFailGuard, CpuActive, amdTurbo, amdState, amdApm, multipliervol, multipliercpu, cpuvol, cpuvolnbb, htbus, htbusswidth, memclock, memtiming, onboardGpu, onboardGpucllock, DramVol, vol_1, vol_2, VCoreoff, VCoreDrop, save1st, load1st, save2st, load2st, advansCpuconf, advansChipconf, advansAcpicon, advansStor, advansPci, advansUsb, advansInstanflash, advansQuiet, advansQuiet2, advansEnha, advansThrot, advansOnboard, advansFront, advansOnboardLan, advansPrimary, advansInternal, advansShare, advansOnboardHdmi, advansSuspend, advansCheckReady, advansAwayMode, advansRestore, advansPCIDevices, advansKeyboard, advansRTC, advansRTCDate, advansRTCTime, advansACPI, advansDeep, advansOnboardSata, advansSataOper, advansSATaComb, advansSata2_1, advansSata2_2, advansSata2_3, advansSata2_4, advansHotPlug, advansSata2_2Auto, advansSMart, advansHotPlug2, advansSata2_2Auto2, advansSMart2, advansType, advansPIO, advansDMA, advansType4, advansLba4, advansblocktran, advansPIO4, advansDMA4, advansSmart4, advansPCItim, advansPsiIde, advansUsbcont, advansUsb2_0, advansUsbLegacy, advansKeyboaUsb, advansMousePower, otpenb, otpenb1, otpenb2, otp, caseopen, bootSett, boot1st, bootHardDisk, ChangeSett, ChangeUser, saveChanges, DiscardChangesAExit, DiscardChan, LoadBios, LoadPerfor, LoadPowerSav, stsat1, ndsam2, fulllog, hiddeAddon, bootfrom, bootnum, spufan, targetcpu, targetfan, spufan1, targetcpu1, targetfan1, spufan2, targetcpu2, targetfan2, systemDiskElement, systemLangElement, diskLine, lengua, sata_3, sata_4, sata_configr, system_inform];
  const visibleLines = [];

  // Если выбран Manual, добавляем cpufreq и pcieFre в lines
  if (selectedOption === "Manual" && activeMenuItemIndex === 1) {
    // Вставляем cpufreq и pcieFre после overhyi
    lines.splice(3, 0, cpufreq, pcieFre);
    // Удаляем класс "noactive" у элементов
    if (cpufreq.classList.contains("noactive")) {
      cpufreq.classList.remove("noactive");
    }

    if (pcieFre.classList.contains("noactive")) {
      pcieFre.classList.remove("noactive");
    }
  }

  lines.forEach((line, index) => {
    if (isElementVisible(line) && !line.classList.contains("noactive")) { // Проверяем, видим ли элемент и не скрыт ли он
      visibleLines.push(index); // Добавляем индекс видимого элемента в массив
    }
  });

  return visibleLines; // Возвращаем массив индексов видимых элементов
}

// Проверка, видим ли элемент
function isElementVisible(element) {
  if (!element) return false; // Если элемента нет, возвращаем false
  const style = window.getComputedStyle(element); // Получаем вычисленные стили элемента
  return style.display !== "none"; // Возвращает true, если элемент видим
}



  // Переключение внутри конфигурации SATA с учетом скрытых элементов
function switchSataConfig(direction) {
  if (isSataConfigActive) {
    let newActiveSataConfig = activeSataConfig;

    do {
      // Обновляем индекс с учетом направления
      newActiveSataConfig = (newActiveSataConfig + direction + sataPairs.length) % sataPairs.length;
    } while (isSataConfigElementHidden(newActiveSataConfig)); // Пропускаем скрытые элементы

    // Убираем подсветку с текущей пары
    sataPairs[activeSataConfig].forEach(element => element.classList.remove("active"));

    // Обновляем индекс
    activeSataConfig = newActiveSataConfig;

    // Подсвечиваем новую пару
    sataPairs[activeSataConfig].forEach(element => element.classList.add("active"));
  }
}

// Проверка, скрыт ли элемент в конфигурации SATA
function isSataConfigElementHidden(index) {
  const sataConfigElements = document.querySelectorAll(".sata_configr span:not(.underlined):not(.nochose)");
  return sataConfigElements[index].style.display === "none"; // Возвращает true, если элемент скрыт
}

  // Функция для управления окном выбора (дискета)
  function setupAlertWindow() {
    const alertOptions = document.querySelectorAll(".alerttext div"); // Элементы внутри окна выбора
    let activeAlertOption = 0; // Индекс активного элемента в окне выбора

    // Функция для открытия окна выбора
    function openAlertWindow() {
      alertElement.classList.remove("hidden"); // Показываем окно
      activeAlertOption = 0; // Сбрасываем активный элемент на первый
      alertOptions[activeAlertOption].classList.add("active"); // Подсвечиваем первый элемент
    }

    // Функция для закрытия окна выбора
    function closeAlertWindow() {
      alertElement.classList.add("hidden"); // Скрываем окно
      alertOptions.forEach(option => option.classList.remove("active")); // Убираем подсветку со всех элементов
    }

    // Функция для перемещения между элементами в окне выбора
    function navigateAlertWindow(direction) {
      alertOptions[activeAlertOption].classList.remove("active"); // Убираем подсветку с текущего элемента
      activeAlertOption = (activeAlertOption + direction + alertOptions.length) % alertOptions.length; // Обновляем индекс
      alertOptions[activeAlertOption].classList.add("active"); // Подсвечиваем новый элемент
    }
    // Новая функция для прокрутки
    // Обработчик событий клавиатуры для окна выбора
    document.addEventListener("keydown", (event) => {
      if (isMemTimingActive) {
        handleMemTimingKeyDown(event);
        return;
      }
      if (alertElement.classList.contains("hidden") && alertElementLang.classList.contains("hidden") && sataAlertElement.style.display === "none") {
        // Если окно выбора закрыто, работаем с основным интерфейсом
        if (event.key === "ArrowUp") {
          if(confirmalerm === false){
          if (isSataConfigActive) {
            switchSataConfig(-1); // Перемещаемся вверх внутри конфигурации SATA
          } else {
            switchLine(-1); // Перемещаемся вверх в основном интерфейсе
            scrollDown()
          }
        }
        }
        if (event.key === "ArrowDown") {
          if(confirmalerm === false){
          if (isSataConfigActive) {
            switchSataConfig(1); // Перемещаемся вниз внутри конфигурации SATA
          } else {
            switchLine(1); // Перемещаемся вниз в основном интерфейсе
            scrollNext();
        }
      }
        }
        if (event.key === "Enter") {  
          if (enterLock) return;
    setTimeout(() => {
      enterLock = false;
    }, 5);  
  }

        // Обработка времени
        if (activeDisplay === 0) {
          if (event.key === "Tab") {
            timeActivePart = (timeActivePart + 1) % 3;
            updateActiveLine(); // Оновлюємо підсвічування 
          }
          if (event.key === "+") {
            if (timeActivePart === 0) hours = (hours + 1) % 24;
            if (timeActivePart === 1) minutes = (minutes + 1) % 60;
            if (timeActivePart === 2) seconds = (seconds + 1) % 60;
            updateTimeDisplay();
            let homsec = hoursPart.innerHTML + ":" + minutesPart.innerHTML + ":" + secondsPart.innerHTML
            console.log(homsec)
            if(homsec === "20:53:42"){
              setTimeout(() => {
                toggleTaskStatus(8); 
                console.log('№9correct!');
                localStorage.setItem('num9correct', '9correct')
              }, 100);
            }
          }
          if (event.key === "-") {
            if (timeActivePart === 0) hours = (hours - 1 + 24) % 24;
            if (timeActivePart === 1) minutes = (minutes - 1 + 60) % 60;
            if (timeActivePart === 2) seconds = (seconds - 1 + 60) % 60;
            updateTimeDisplay();
            let homsec = hoursPart.innerHTML + ":" + minutesPart.innerHTML + ":" + secondsPart.innerHTML
            console.log(homsec)
            if(homsec === "20:53:42"){
              setTimeout(() => {
                toggleTaskStatus(8); 
                console.log('№9correct!');
                localStorage.setItem('num9correct', '9correct')
              }, 100);
            }
          }
        }

        // Обработка даты
        if (activeDisplay === 1) {
          if (event.key === "Tab") {
            dateActivePart = (dateActivePart + 1) % 3;
            updateActiveLine(); // Оновлюємо підсвічування
          }
          if (event.key === "+") {
            if (dateActivePart === 0) day++;
            if (dateActivePart === 1) month = (month % 12) + 1;
            if (dateActivePart === 2) year++;
            updateDateDisplay();
          }
          if (event.key === "-") {
            if (dateActivePart === 0) day = Math.max(1, day - 1);
            if (dateActivePart === 1) month = month > 1 ? month - 1 : 12;
            if (dateActivePart === 2) year--;
            updateDateDisplay();
          }
        }

        if (activeDisplay === 55) {
    // Переключение между частями времени по нажатию Tab
    if (event.key === "Tab") {
      event.preventDefault(); // Предотвращаем стандартное поведение Tab
      timeActivePart = (timeActivePart + 1) % 3;
      updateActiveLine();
    }
    
    // Увеличение выбранной части времени
    if (event.key === "+") {
      if (timeActivePart === 0) {
        hours = (hours + 1) % 24; // Предположим, 24-часовой формат
        localStorage.setItem('hoursLocal', hours)
      }
      if (timeActivePart === 1) {
        minutes = (minutes + 1) % 60;
        localStorage.setItem('minuteLocal', minutes)
      }
      if (timeActivePart === 2) {
        seconds = (seconds + 1) % 60;
        localStorage.setItem('secondsLocal', seconds)
      }
      updateAdvansRTCByOstimechoseDisplay();
    }
    
    // Уменьшение выбранной части времени
    if (event.key === "-") {
      if (timeActivePart === 0) {
        hours = hours > 0 ? hours - 1 : 23;
        localStorage.setItem('hoursLocal', hours)
      }
      if (timeActivePart === 1) {
        minutes = minutes > 0 ? minutes - 1 : 59;
        localStorage.setItem('minuteLocal', minutes)
      }
      if (timeActivePart === 2) {
        seconds = seconds > 0 ? seconds - 1 : 59;
        localStorage.setItem('secondsLocal', seconds)
      }
      updateAdvansRTCByOstimechoseDisplay();
    }
  }

        // Открытие окна выбора для диска
        if (activeDisplay === 2 && event.key === "Enter" && toastMenuLoad === false) {
          openSataAlert();
        }

        // Открытие окна выбора для языка
        if (activeDisplay === 3 && event.key === "Enter" && toastMenuLoad === false) {
          if (cpufreq && !cpufreq.classList.contains('active')) {
            localStorage.setItem('actdisExit', activeDisplay)
         openAlertWindowLang();
          } 
          
        } if (activeDisplay === 3 && event.shiftKey && event.key === "+"){

          if (overhyi && overhyi.classList.contains('active')){
          
        } else {
          if(changeCpu_1.textContent >= "[400]"){ 
            alert('Больше 400 нельзя ')
          } else {
            changeCpu_1.textContent = `[${acceptMass[5]++}]`;
            localStorage.setItem('changeCpu11_1', `[${acceptMass[5]}]`); 
          }
        }  

        }
        if (activeDisplay === 3 && event.shiftKey && event.key === "_"){
          if (overhyi && overhyi.classList.contains('active')){

          } else {
          if(changeCpu_1.textContent <= '[101]'){
        } else {
          changeCpu_1.textContent = `[${acceptMass[5]--}]`;
          localStorage.setItem('changeCpu11_1', `[${acceptMass[5]}]`); 
        }
         }
        }
        if (activeDisplay === 4 && event.key === "Enter" && toastMenuLoad === false) {
          if (pcieFre && !pcieFre.classList.contains('active')) {
            localStorage.setItem('actdisExit', activeDisplay)
            openSetupOpenBoot();
          }
        } 
        if (bootFail && bootFail.classList.contains('active')) {

        } else {
        // Обработка Shift + "+"
if (activeDisplay === 4 && event.shiftKey && event.key === "+") {
    // Преобразуем текущее значение в число
    const currentValue = parseInt(changeCpu_2.textContent.replace(/[\[\]]/g, ''));
    
    // Проверяем максимальное значение (200)
    if (currentValue >= 200) {
        // Ничего не делаем, если достигнут максимум
    } else {
        // Увеличиваем значение массива и обновляем текст
        acceptMass[6]++;
        changeCpu_2.textContent = `[${acceptMass[6]}]`;
        localStorage.setItem('changeCpu2_2', `[${acceptMass[6]}]`); 
    }
}

// Обработка Shift + "_" (фактически Shift + "-")
if (activeDisplay === 4 && event.shiftKey && event.key === "_") {
    const currentValue = parseInt(changeCpu_2.textContent.replace(/[\[\]]/g, ''));
    if (currentValue <= 50) {
    } else {
        acceptMass[6]--;
        changeCpu_2.textContent = `[${acceptMass[6]}]`;
        localStorage.setItem('changeCpu2_2', `[${acceptMass[6]}]`);
    }
}
}       
        
        if (activeDisplay === 5 && event.key === "Enter" && toastMenuLoad === false) {    
          localStorage.setItem('actdisExit', activeDisplay)
          if(bootFailGuard.classList.contains("active")){
            openSetupOpenBoot_1();
          }
          if(overhyi.classList.contains("active")) {
          openAlertWindowLang();
          }
        } else {
          
    
         }
          if (activeDisplay === 6 && event.key === "Enter" && toastMenuLoad === false) {
            localStorage.setItem('actdisExit', activeDisplay)
          if (bootFail && bootFail.classList.contains('active')) {
            openSetupOpenBoot();
          } 
          if (CpuActive && CpuActive.classList.contains('active')) {
            openSetupOpenBoot_2();
          } 
 
         } else {
  
         }
if (activeDisplay === 7 && event.key === "Enter" && toastMenuLoad === false) {
  localStorage.setItem('actdisExit', activeDisplay)
  if (bootFailGuard.classList.contains("active")) {
    openSetupOpenBoot_1();
    }
    if (amdTurbo.classList.contains("active")) {
      openSetupOpenBoot_3();
    } 
   } 

        // Логика для SATA Configuration
        if (activeDisplay === 8 && event.key === "Enter" && toastMenuLoad === false) {
          localStorage.setItem('actdisExit', activeDisplay)
          if(amdState.classList.contains("active")){
            openSetupOpenBoot_4();
         } if (CpuActive && CpuActive.classList.contains('active')) {
            openSetupOpenBoot_2();
          } 
        
        }

        // Логика для system_inform
        if (activeDisplay === 9 && event.key === "Enter" && toastMenuLoad === false) {
          localStorage.setItem('actdisExit', activeDisplay)
          if (amdApm.classList.contains("active")) {
            openSetupOpenBoot_5();
           } 
           if (amdTurbo.classList.contains("active")) {
      openSetupOpenBoot_3();
    } 
        } 
        if (activeDisplay === 10 && event.key === "Enter" && toastMenuLoad === false){
          localStorage.setItem('actdisExit', activeDisplay)
          if(amdState.classList.contains("active")){
          openSetupOpenBoot_4();
       } 
       if(multipliervol.classList.contains("active")){
          openSetupOpenBoot_6();
       } 
     }
     if (activeDisplay === 11 && event.key === "Enter" && toastMenuLoad === false){
      localStorage.setItem('actdisExit', activeDisplay)
      if (amdApm.classList.contains("active")) {
            openSetupOpenBoot_5();
           } 
    if (multipliercpu.classList.contains("active")) {
            openSetupOpenBoot_9(); 
           } 
           
     }
     if (activeDisplay === 12 && event.key === "Enter" && toastMenuLoad === false){
      localStorage.setItem('actdisExit', activeDisplay)
      if(multipliervol.classList.contains("active")){
          openSetupOpenBoot_6();
       } 
       if(cpuvol.classList.contains("active")){
          openSetupOpenBoot_8();
       } 
     }
     if (activeDisplay === 13 && event.key === "Enter" && toastMenuLoad === false){
      localStorage.setItem('actdisExit', activeDisplay)
          if(cpuvolnbb.classList.contains("active")){
          openSetupOpenBoot_7();
       }

       if (multipliercpu.classList.contains("active")) {
            openSetupOpenBoot_7();
           } 
     }
     if (activeDisplay === 14 && event.key === "Enter" && toastMenuLoad === false){
      localStorage.setItem('actdisExit', activeDisplay)
          if(htbus.classList.contains("active")){
            openSetupOpenBoot_7();
       }
       if(cpuvol.classList.contains("active")){
          openSetupOpenBoot_8();
       } 
     }
     if (activeDisplay === 15 && event.key === "Enter" && toastMenuLoad === false){
      localStorage.setItem('actdisExit', activeDisplay)
          if(htbusswidth.classList.contains("active")){
            newOpenBoot();
       }
       if(cpuvolnbb.classList.contains("active")){
          openSetupOpenBoot_9();
       }
     }

    if (activeDisplay === 16 && event.key === "Enter" && toastMenuLoad === false){
      localStorage.setItem('actdisExit', activeDisplay)
        if(htbus.classList.contains("active")){
            openSetupOpenBoot_7();
       }
       if(memclock.classList.contains("active")){
        newOpenBoot_1();
       }
    }
    if (activeDisplay === 17 && event.key === "Enter" && toastMenuLoad === false){
      localStorage.setItem('actdisExit', activeDisplay)
      if(htbusswidth.classList.contains("active")){
            newOpenBoot();
       }
       if(memtiming.classList.contains("active")){
        if(document.getElementById('toast-container')){
          
        }
       }
    }
    if(activeDisplay === 17 && event.key === "Enter"){
      if(memtiming.classList.contains("active")){
        openMemoryTiming();
        return;
      }
    }
    if (activeDisplay === 18 && event.key === "Enter" && toastMenuLoad === false){
      localStorage.setItem('actdisExit', activeDisplay)
         if(onboardGpu.classList.contains("active")){
          newOpenBoot_2();
      }
    if(memclock.classList.contains("active")){
        newOpenBoot_1();
       }
    }
    if (activeDisplay === 19 && event.key === "Enter" && toastMenuLoad === false){
    //     if(htbus.classList.contains("active")){
    //       openSetupOpenBoot_7();
    //   }
    } 

    if ((activeDisplay === 19 || activeDisplay === 21) && event.shiftKey && event.key === "+") {
  if (overhyi && overhyi.classList.contains('active')) {
    // Если overhyi активен, возможно, здесь будут другие действия
  } else {
    const onboardCountEl = document.getElementById('onboardcount');
    // Убираем квадратные скобки и получаем числовое значение
    let currentValue = parseInt(onboardCountEl.textContent.replace(/\[|\]/g, ''), 10);
    
    if (currentValue >= 3000) { 
      alert('Больше 3000 нельзя');
    } else {
      // Увеличиваем значение на 10
      currentValue += 10;
      onboardCountEl.textContent = `[${currentValue}]`;
      // Если acceptMass используется как источник данных, обновляем его
      acceptMass[106] = currentValue;
      localStorage.setItem('onboardCoutEl', `[${currentValue}]`) 
    }
  }
}

if ((activeDisplay === 19 || activeDisplay === 21) && event.shiftKey && event.key === "_") {
  if (overhyi && overhyi.classList.contains('active')) {
    // Если overhyi активен, здесь можно добавить нужную логику
  } else {
    const onboardCountEl = document.getElementById('onboardcount');
    let currentValue = parseInt(onboardCountEl.textContent.replace(/\[|\]/g, ''), 10);
    
    if (currentValue <= 1000) {
      // Если значение уже меньше или равно 1000, ничего не делаем (или можно добавить сообщение)
    } else {
      // Уменьшаем значение на 10
      currentValue -= 10;
      onboardCountEl.textContent = `[${currentValue}]`;
      acceptMass[106] = currentValue;
      localStorage.setItem('onboardCoutEl', `[${currentValue}]`) 
    }
  }
}
    if (activeDisplay === 20 && event.key === "Enter" && toastMenuLoad === false){
      localStorage.setItem('actdisExit', activeDisplay)
         if(DramVol.classList.contains("active")){
          newOpenBoot_3();
       }
       if(onboardGpu.classList.contains("active")){
          newOpenBoot_2();
      }
    }
    if (activeDisplay === 110) {
        const cpuTargetElement = document.getElementById("cputraget_2");

        if (!cpuTargetElement) return; // Перевіряємо, чи є елемент

        // Отримуємо поточне значення в градусах Цельсія
        let match = cpuTargetElement.textContent.match(/\d+/);
        if (!match) return;

        let currentTempC = parseInt(match[0], 10); // Перетворимо на число

        // Перевіряємо натискання клавіш
        if (event.shiftKey && event.key === "+") {
            if (currentTempC + 2 <= 65) { // Перевіряємо, чи не вище максимуму
                currentTempC += 2;
                setTimeout(() => {
                  toggleTaskStatus(3); // 4
                  localStorage.setItem('num4correct', '4correct') 
                  console.log('4correct');
                }, 100);
            } else {
                
            }
        } else if (event.shiftKey && event.key === "_") {
            if (currentTempC - 2 >= 45) { // Перевіряємо, чи не нижче мінімуму
                currentTempC -= 2;
                setTimeout(() => {
                  toggleTaskStatus(3); // 4
                  localStorage.setItem('num4correct', '4correct') 
                  console.log('4correct');
                }, 100);
            } else {
                
            }
        }

        // Конвертуємо у Фаренгейти
        let currentTempF = Math.round(currentTempC * 9 / 5 + 32);

        // Оновлюємо значення
        cpuTargetElement.textContent = `[${currentTempC}°C/${currentTempF}°F]`;

    }
    if (activeDisplay === 116) {
        const cpuTargetElement = document.getElementById("cputraget_22");

        if (!cpuTargetElement) return; // Перевіряємо, чи є елемент

        // Отримуємо поточне значення в градусах Цельсія
        let match = cpuTargetElement.textContent.match(/\d+/);
        if (!match) return;

        let currentTempC = parseInt(match[0], 10); // Перетворимо на число

        // Перевіряємо натискання клавіш
        if (event.shiftKey && event.key === "+") {
            if (currentTempC + 2 <= 65) { // Перевіряємо, чи не вище максимуму
                currentTempC += 2;
            } else {
                
            }
        } else if (event.shiftKey && event.key === "_") {
            if (currentTempC - 2 >= 45) { // Перевіряємо, чи не нижче мінімуму
                currentTempC -= 2;
            } else {
                
            }
        }

        // Конвертуємо у Фаренгейти
        let currentTempF = Math.round(currentTempC * 9 / 5 + 32);

        // Оновлюємо значення
        cpuTargetElement.textContent = `[${currentTempC}°C/${currentTempF}°F]`;
    }

    if (activeDisplay === 113) {
        const cpuTargetElement = document.getElementById("cputraget_21");

        if (!cpuTargetElement) return; // Перевіряємо, чи є елемент

        // Отримуємо поточне значення в градусах Цельсія
        let match = cpuTargetElement.textContent.match(/\d+/);
        if (!match) return;

        let currentTempC = parseInt(match[0], 10); // Перетворимо на число

        // Перевіряємо натискання клавіш
        if (event.shiftKey && event.key === "+") {
            if (currentTempC + 2 <= 65) { // Перевіряємо, чи не вище максимуму
                currentTempC += 2;
            } else {
                
            }
        } else if (event.shiftKey && event.key === "_") {
            if (currentTempC - 2 >= 45) { // Перевіряємо, чи не нижче мінімуму
                currentTempC -= 2;
            } else {
                
            }
        }

        // Конвертуємо у Фаренгейти
        let currentTempF = Math.round(currentTempC * 9 / 5 + 32);

        // Оновлюємо значення
        cpuTargetElement.textContent = `[${currentTempC}°C/${currentTempF}°F]`;
    }


    if (activeDisplay === 21 && event.key === "Enter" && toastMenuLoad === false){
      myzika_2.play();
         if(vol_1.classList.contains("active")){
          newOpenBoot_4();
          localStorage.setItem('actdisExit', activeDisplay)
      }
    }
    if (activeDisplay === 22 && event.key === "Enter" && toastMenuLoad === false){
      localStorage.setItem('actdisExit', activeDisplay)
         if(vol_2.classList.contains("active")){
          newOpenBoot_5()
      }
      if(DramVol.classList.contains("active")){
          newOpenBoot_3();
       }
    }
    if (activeDisplay === 23 && event.key === "Enter" && toastMenuLoad === false){
      localStorage.setItem('actdisExit', activeDisplay)
         if(VCoreoff.classList.contains("active")){
      newOpenBoot_6()
       }
       if(vol_1.classList.contains("active")){
          newOpenBoot_4();
      }
    }
    if (activeDisplay === 24 && event.key === "Enter" && toastMenuLoad === false){
      localStorage.setItem('actdisExit', activeDisplay)
         if(VCoreDrop.classList.contains("active")){
     newOpenBoot_7()
       }
       if(vol_2.classList.contains("active")){
          newOpenBoot_5()
      }
    }
    if ((activeDisplay === 26 || activeDisplay === 28) && event.key === "Enter" && choseMenuLoad === false && toastMenuLoad === false){

  if (load1st.classList.contains("active")) {
    choseMenuLoad = true
    confirmalerm = true;
    rightleftBlock = true;
    toastr.options.tapToDismiss = false;
    toastr.options.progressBar = false;
    console.log(choseMenuLoad + "/" + confirmalerm + "/" + rightleftBlock + " :load1st debug")
    toastr.options.timeOut = "0";
    toastr.options.extendedTimeOut = "0";
    toastr.success(`
      <button id="btnYes" class="btn btn-success">[Ok]</button>
      <button type="button" id="btnNo" class="btn clear">[Cancel]</button>
    `, "Load 1st User Defaults SETUP options?");
    
    // Ждем, пока toastr сгенерирует кнопки (примерно 100 мс)
    setTimeout(() => {
      const btnYes = document.getElementById("btnYes");
      const btnNo = document.getElementById("btnNo");
      
      if (!btnYes || !btnNo) {
        console.error("Кнопки не найдены");
        return;
      }
      
      // Инициализируем массив кнопок и устанавливаем первую как активную
      let activeIndexMenu = 0;
      const buttons = [btnYes, btnNo];
      buttons[activeIndexMenu].classList.add("activeMenu");
      
      // Функции для выбора
      function selectYes() {
        userChoice = true;
        toastr.clear();
        console.log("User selected: Yes");
        loadProfile(1);
        removeKeyListener();
setTimeout(() => {
        rightleftBlock = false;
        confirmalerm = false;
        choseMenuLoad = false;

}, 1000); 
      }   
      function selectNo() {
        userChoice = false;
        toastr.clear();
        console.log("User selected: No");
        removeKeyListener();
  setTimeout(() => {
        rightleftBlock = false;
        confirmalerm = false;
        choseMenuLoad = false;
        console.log(choseMenuLoad + "/" + confirmalerm + "/" + rightleftBlock + " :load1st debug")
}, 1000);
        
      }  
      // Обработчик клавиатуры для переключения между кнопками и подтверждения выбора
      function arrowHandler(e) {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          buttons.forEach(btn => btn.classList.remove("activeMenu"));
          activeIndexMenu = (activeIndexMenu + 1) % buttons.length;
          buttons[activeIndexMenu].classList.add("activeMenu");
          e.preventDefault();
        } else if (e.key === "Enter") {
          // Если нажато Enter, проверяем, какая кнопка активна, и вызываем соответствующую функцию
          if (buttons[activeIndexMenu].id === "btnYes") {
            selectYes();
          } else if (buttons[activeIndexMenu].id === "btnNo") {
            selectNo();
          }
        } else if (e.key === "Escape"){
            selectNo();
        }
      }
      
      document.addEventListener("keydown", arrowHandler);
      
      // Функция для удаления обработчика, когда выбор сделан
      function removeKeyListener() {
        document.removeEventListener("keydown", arrowHandler);
      }
      
    }, 1);
  }
    }

    if (activeDisplay === 25, 27 && event.key === "Enter" && toastMenuLoad === false){
         if(save2st.classList.contains("active")){
          confirmalerm = true;
      rightleftBlock = true;
      toastr.options.timeOut = "2800";
      toastr.options.extendedTimeOut = "1000";
      toastr.options.tapToDismiss = true;
      toastr.options.progressBar = true;
      toastr.success("You have successfully saved profile #2", "Success!");
      var toastTitle = document.querySelector(".toast-title");
      toastTitle.style.height = "50px";
      toastTitle.style.lineHeight = "40px";
      saveProfile(2); // Сохранить профиль 2
       }
       if(save1st.classList.contains("active")){
      
      confirmalerm = true;
      rightleftBlock = true;
      toastr.options.tapToDismiss = true;
      toastr.options.progressBar = true;
      toastr.options.timeOut = "2800";
      toastr.options.extendedTimeOut = "1000";
      toastr.success("You have successfully saved profile #1", "Success!");
      var toastTitle = document.querySelector(".toast-title");
      toastTitle.style.height = "50px";
      toastTitle.style.lineHeight = "40px";
      saveProfile(1); // Сохранить профиль 1

       }
    }
    if ((activeDisplay === 28 || activeDisplay === 30) && event.key === "Enter" && choseMenuLoad === false && toastMenuLoad === false) {

  if (load2st.classList.contains("active")) {
    choseMenuLoad = true;
      confirmalerm = true;
      rightleftBlock = true;
      toastr.options.progressBar = false;
      toastr.options.tapToDismiss = false;
      console.log(choseMenuLoad + "/" + confirmalerm + "/" + rightleftBlock + " :load2st debug")
    toastr.options.timeOut = "0";
    toastr.options.extendedTimeOut = "0";
    toastr.success(`
      <button id="btnYes" class="btn btn-success">[Ok]</button>
      <button type="button" id="btnNo" class="btn clear">[Cancel]</button>
    `, "Load 2st User Defaults SETUP options?");
    
    // Ждем, пока toastr сгенерирует кнопки (примерно 100 мс)
    setTimeout(() => {
      const btnYes = document.getElementById("btnYes");
      const btnNo = document.getElementById("btnNo");
      
      if (!btnYes || !btnNo) {
        console.error("Кнопки не найдены");
        return;
      }
      
      // Инициализируем массив кнопок и устанавливаем первую как активную
      let activeIndexMenu = 0;
      const buttons = [btnYes, btnNo];
      buttons[activeIndexMenu].classList.add("activeMenu");
      
      // Функции для выбора
      function selectYes() {
        userChoice = true;
        console.log("User selected: Yes");
        loadProfile(2);
        removeKeyListener();
        toastr.clear();
      setTimeout(() => {
        rightleftBlock = false;
        confirmalerm = false;
        choseMenuLoad = false;
        console.log(choseMenuLoad + "/" + confirmalerm + "/" + rightleftBlock + " :load2st debug")

}, 1000);
        
      }
      
      function selectNo() {
        userChoice = false;
        console.log("User selected: No");
        removeKeyListener();
        toastr.clear();
    setTimeout(() => {
        rightleftBlock = false;
        confirmalerm = false;
        choseMenuLoad = false;

}, 1000);
        
      }
      
      
      // Обработчик клавиатуры для переключения между кнопками и подтверждения выбора
      function arrowHandler(e) {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          buttons.forEach(btn => btn.classList.remove("activeMenu"));
          activeIndexMenu = (activeIndexMenu + 1) % buttons.length;
          buttons[activeIndexMenu].classList.add("activeMenu");
          e.preventDefault();
        } else if (e.key === "Enter") {
          // Если нажато Enter, проверяем, какая кнопка активна, и вызываем соответствующую функцию
          if (buttons[activeIndexMenu].id === "btnYes") {
            selectYes();
          } else if (buttons[activeIndexMenu].id === "btnNo") {
            selectNo();
          }
        } else if (e.key === "Escape"){
            selectNo();
        }
      }
      
      document.addEventListener("keydown", arrowHandler);
      
      // Функция для удаления обработчика, когда выбор сделан
      function removeKeyListener() {
        document.removeEventListener("keydown", arrowHandler);
      }
      
    }, 1);
  }
}

function updateMemoryDisplay(memClockValue) {
  if (!memClockValue) return;
  
  // Get the memory clock value without the brackets
  const cleanMemClock = memClockValue.replace(/[\[\]]/g, '');
  
  // Get both DDR3 slots
  const memoryDisplays = document.querySelectorAll('.systeminf div:nth-child(11) div:last-child, .systeminf div:nth-child(12) div:last-child');
  
  memoryDisplays.forEach(display => {
    if (display) {
      // Extract the frequency from the memory clock string
      const frequency = cleanMemClock.split('MHz')[0].trim();
      const ddrType = cleanMemClock.split('MHz')[1].trim();
      
      // Update the memory slot display
      display.textContent = `8192MB/${frequency}MHz ${ddrType}`;
    }
  });
}

// Add event listener for memory clock changes


if (activeDisplay === 29 && event.key === "Enter" && toastMenuLoad === false){
    if(advansCpuconf.classList.contains("active")){
      localStorage.setItem('actdisExit', activeDisplay)
        advancCpuConf();
       }
    }
    if (activeDisplay === 30 && event.key === "Enter" && toastMenuLoad === false){
    if(advansChipconf.classList.contains("active")){
      localStorage.setItem('actdisExit', activeDisplay)
        advancCpuConf();
       }
    }
    if (activeDisplay === 31 && event.key === "Enter" && toastMenuLoad === false){
    if(advansAcpicon.classList.contains("active")){
      localStorage.setItem('actdisExit', activeDisplay)
        advancCpuConf();
       }
    }
    if (activeDisplay === 32 && event.key === "Enter" && toastMenuLoad === false){
    if(advansStor.classList.contains("active")){
      localStorage.setItem('actdisExit', activeDisplay)
        advancCpuConf();
       }
    }
    if (activeDisplay === 33 && event.key === "Enter" && toastMenuLoad === false){
    if(advansPci.classList.contains("active")){
      localStorage.setItem('actdisExit', activeDisplay) /// зберігаємо індекс, для коректної обробки функції Esc
        advancCpuConf();
       }
    }
    if (activeDisplay === 34 && event.key === "Enter" && toastMenuLoad === false){
    if(advansUsb.classList.contains("active")){
      localStorage.setItem('actdisExit', activeDisplay) /// зберігаємо індекс, для коректної обробки функції Esc
        advancCpuConf();
       }
    }
    if (activeDisplay === 35 && event.key === "Enter" && choseMenuLoad === false && enterLock === false && toastMenuLoad === false){
    if(advansInstanflash.classList.contains("active")){
// Именованная функция, которая отменяет стандартное действие
function disableAllMouseActions(event) {
  event.preventDefault();
}
// Добавляем обработчики для всех нужных событий
document.addEventListener("mousedown", disableAllMouseActions);
document.addEventListener("mouseup", disableAllMouseActions);
document.addEventListener("click", disableAllMouseActions);
document.addEventListener("contextmenu", disableAllMouseActions);
    choseMenuLoad = true
    confirmalerm = true;
    rightleftBlock = true;

    toastr.options.progressBar = false;
    toastr.options.tapToDismiss = false;
    console.log(choseMenuLoad + "/" + confirmalerm + "/" + rightleftBlock + " :InstantFlash debug")
    toastr.options.timeOut = "0";
    toastr.options.extendedTimeOut = "0";
    toastr.success(`
      <button id="btnYes" class="btn btn-success">[Ok]</button>
      <button type="button" id="btnNo" class="btn clear">[Cancel]</button>
    `, "Execute Instant Flash utility?");
    
    // Ждем, пока toastr сгенерирует кнопки (примерно 100 мс)
    setTimeout(() => {
      const btnYes = document.getElementById("btnYes");
      const btnNo = document.getElementById("btnNo");
      
      if (!btnYes || !btnNo) {
        console.error("Кнопки не найдены");
        return;
      }
      
      // Инициализируем массив кнопок и устанавливаем первую как активную
      let activeIndexMenu = 0;
      const buttons = [btnYes, btnNo];
      buttons[activeIndexMenu].classList.add("activeMenu");
      
      // Функции для выбора
      function selectYes() {
        setTimeout(() => {
          toggleTaskStatus(6); 
          console.log('№7correct!');
          localStorage.setItem('num7correct', '7correct')
        }, 100);
        userChoice = true;
        toastr.clear();
        tempPass = localStorage.getItem('paroluserLocal');
        localStorage.setItem('temppasloc', tempPass)
        console.log("User selected: Yes");
        console.log('hello1')
        removeKeyListener();
    setTimeout(() => {
        rightleftBlock = false;
        confirmalerm = false;
        choseMenuLoad = false;
        // Удаляем обработчики, чтобы вернуть стандартное поведение
document.removeEventListener("mousedown", disableAllMouseActions);
document.removeEventListener("mouseup", disableAllMouseActions);
document.removeEventListener("click", disableAllMouseActions);
document.removeEventListener("contextmenu", disableAllMouseActions);

    history.replaceState(null, "", "/biosinstant.html");
    window.location.href = "/biosinstant.html";
}, 1000);         
      }
      
      function selectNo() {
        userChoice = false;
        toastr.clear();
        console.log("User selected: No");
        console.log('hello1')
        removeKeyListener();
  setTimeout(() => {
        rightleftBlock = false;
        confirmalerm = false;
        choseMenuLoad = false;
        // Удаляем обработчики, чтобы вернуть стандартное поведение
document.removeEventListener("mousedown", disableAllMouseActions);
document.removeEventListener("mouseup", disableAllMouseActions);
document.removeEventListener("click", disableAllMouseActions);
document.removeEventListener("contextmenu", disableAllMouseActions);

        console.log(choseMenuLoad + "/" + confirmalerm + "/" + rightleftBlock + " :InstantFlash debug")
}, 1000);
        
      }  
      // Обработчик клавиатуры для переключения между кнопками и подтверждения выбора
      function arrowHandler(e) {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          buttons.forEach(btn => btn.classList.remove("activeMenu"));
          activeIndexMenu = (activeIndexMenu + 1) % buttons.length;
          buttons[activeIndexMenu].classList.add("activeMenu");
          e.preventDefault();
        } else if (e.key === "Enter" && choseMenuLoad === true) {
          // Если нажато Enter, проверяем, какая кнопка активна, и вызываем соответствующую функцию
          if (buttons[activeIndexMenu].id === "btnYes") {
            selectYes();
          } else if (buttons[activeIndexMenu].id === "btnNo") {
            selectNo();
          }
        }
      }
      
      document.addEventListener("keydown", arrowHandler);
      
      // Функция для удаления обработчика, когда выбор сделан
      function removeKeyListener() {
        document.removeEventListener("keydown", arrowHandler);
      }
      
    }, 1);
       }
    }
    if (activeDisplay === 36 && event.key === "Enter" && enterLock === false && toastMenuLoad === false){
    if(advansQuiet.classList.contains("active")){
      newOpenBoot_8()
       }
    }
    if (activeDisplay === 37 && event.key === "Enter" && toastMenuLoad === false){
    if(advansQuiet2.classList.contains("active")){
      newOpenBoot_9()
       }
    }
    if (activeDisplay === 38 && event.key === "Enter" && toastMenuLoad === false){
    if(advansEnha.classList.contains("active")){
      newOpenBoot_10()
       }
    }
    if (activeDisplay === 39 && event.key === "Enter" && toastMenuLoad === false){
    if(advansThrot.classList.contains("active")){
      newOpenBoot_11()
       }
    }
  if (activeDisplay === 40 && event.key === "Enter" && enterLock === false && toastMenuLoad === false){
    if(advansOnboard.classList.contains("active")){
      newOpenBoot_12()
       }
    }
  if (activeDisplay === 41 && event.key === "Enter" && toastMenuLoad === false){
    if(advansFront.classList.contains("active")){
      newOpenBoot_13()
       }
    }
  if (activeDisplay === 42 && event.key === "Enter" && toastMenuLoad === false){
    if(advansOnboardLan.classList.contains("active")){
       newOpenBoot_14()
       }
    }
  if (activeDisplay === 43 && event.key === "Enter" && toastMenuLoad === false){
    if(advansPrimary.classList.contains("active")){
      newOpenBoot_15()
       }
    }
  if (activeDisplay === 44 && event.key === "Enter" && toastMenuLoad === false){
    if(advansInternal.classList.contains("active")){
      newOpenBoot_16()
       }
    }
  if (activeDisplay === 45 && event.key === "Enter" && toastMenuLoad === false){
    if(advansShare.classList.contains("active")){
      newOpenBoot_17()
       }
    }
  if (activeDisplay === 46 && event.key === "Enter" && toastMenuLoad === false){
    if(advansOnboardHdmi.classList.contains("active")){
      newOpenBoot_14();
       }
    } 
  if (activeDisplay === 47 && event.key === "Enter" && enterLock === false && toastMenuLoad === false){
    if(advansSuspend.classList.contains("active")){
      newOpenBoot_18();
       }
    }
  if (activeDisplay === 48 && event.key === "Enter" && toastMenuLoad === false){
    if(advansCheckReady.classList.contains("active")){
      newOpenBoot_12()
       }
    } 
    if (activeDisplay === 49 && event.key === "Enter" && toastMenuLoad === false){
    if(advansAwayMode.classList.contains("active")){
      newOpenBoot_14()
       }
    }
    if (activeDisplay === 50 && event.key === "Enter" && toastMenuLoad === false){
    if(advansRestore.classList.contains("active")){
      newOpenBoot_19()
       }
    }
    if (activeDisplay === 51 && event.key === "Enter" && toastMenuLoad === false){
    if(advansPCIDevices.classList.contains("active")){
      newOpenBoot_14()
       }
    }
    if (activeDisplay === 52 && event.key === "Enter" && toastMenuLoad === false){
    if(advansKeyboard.classList.contains("active")){
      newOpenBoot_20();
       }
    } 
    if (activeDisplay === 53 && event.key === "Enter" && toastMenuLoad === false){
    if(advansRTC.classList.contains("active")){
      newOpenBoot_21()
       }
    }
    if (activeDisplay === 54 && event.key === "Enter" && toastMenuLoad === false){
    if(advansRTCDate.classList.contains("active")){
      newOpenBoot_22()
       }
    }
    if (activeDisplay === 56 && event.key === "Enter" && toastMenuLoad === false){
    if(advansACPI.classList.contains("active")){
      newOpenBoot_14()
       }
    }
    if (activeDisplay === 57 && event.key === "Enter" && toastMenuLoad === false){
    if(advansDeep.classList.contains("active")){
      newOpenBoot_14()
       }
    } 
    if (activeDisplay === 58 && event.key === "Enter" && enterLock === false && toastMenuLoad === false){
    if(advansOnboardSata.classList.contains("active")){
      newOpenBoot_14()
       }
    }
    if (activeDisplay === 59 && event.key === "Enter" && toastMenuLoad === false){
    if(advansSataOper.classList.contains("active")){
      newOpenBoot_23() /// "IDE"
       }
    }
    if (activeDisplay === 60 && event.key === "Enter" && toastMenuLoad === false){
    if(advansSATaComb.classList.contains("active")){
      newOpenBoot_14() 
       }
    }
    if (activeDisplay === 61 && event.key === "Enter" && toastMenuLoad === false){
    if(advansSata2_1.classList.contains("active")){
      localStorage.setItem('actdisExit', activeDisplay)
      advancCpuConf();
       }
    }
    if (activeDisplay === 62 && event.key === "Enter" && toastMenuLoad === false){
    if(advansSata2_2.classList.contains("active")){
      localStorage.setItem('actdisExit', activeDisplay)
      advancCpuConf();
       }
    }
    if (activeDisplay === 63 && event.key === "Enter" && toastMenuLoad === false){
    if(advansSata2_3.classList.contains("active")){
      localStorage.setItem('actdisExit', activeDisplay)
      advancCpuConf();
       }
    }
    if (activeDisplay === 64 && event.key === "Enter" && toastMenuLoad === false){
    if(advansSata2_4.classList.contains("active")){
      localStorage.setItem('actdisExit', activeDisplay)
      advancCpuConf();
       }
    }
    if ((activeDisplay === 65 || activeDisplay === 68) && event.key === "Enter" && enterLock === false && toastMenuLoad === false){
    if(advansHotPlug.classList.contains("active")){
      newOpenBoot_14() 
       }
       if(advansHotPlug2.classList.contains("active")){
      newOpenBoot_14() 
       }
    }
    if ((activeDisplay === 66 || activeDisplay === 69 ) && event.key === "Enter" && toastMenuLoad === false){
    if(advansSata2_2Auto.classList.contains("active")){
      newOpenBoot_24()
       }
       if(advansSata2_2Auto2.classList.contains("active")){
      newOpenBoot_24()
       }
    }
    if ((activeDisplay === 67 || activeDisplay === 70) && event.key === "Enter" && toastMenuLoad === false){
    if(advansSMart.classList.contains("active")){
      newOpenBoot_14() 
       }
    if(advansSMart2.classList.contains("active")){
      newOpenBoot_14() 
       }
    }
    if (activeDisplay === 71 && event.key === "Enter" && enterLock === false && toastMenuLoad === false){
    if(advansType.classList.contains("active")){
      newOpenBoot_25()
       }
    }
    if (activeDisplay === 72 && event.key === "Enter" && toastMenuLoad === false){
    if(advansPIO.classList.contains("active")){
      newOpenBoot_29()
       }
    }
    if (activeDisplay === 73 && event.key === "Enter" && toastMenuLoad === false){
    if(advansDMA.classList.contains("active")){
      newOpenBoot_26()
       }
    }
    if (activeDisplay === 74 && event.key === "Enter" && enterLock === false && toastMenuLoad === false){
    if(advansType4.classList.contains("active")){
      newOpenBoot_27()
       }
    } 
    if (activeDisplay === 75 && event.key === "Enter" && toastMenuLoad === false){
    if(advansLba4.classList.contains("active")){
      newOpenBoot_28()
       }
    }
    if (activeDisplay === 76 && event.key === "Enter" && toastMenuLoad === false){
    if(advansblocktran.classList.contains("active")){
      newOpenBoot_28()
       }
    }
    if (activeDisplay === 77 && event.key === "Enter" && toastMenuLoad === false){
     if(advansPIO4.classList.contains("active")){
      newOpenBoot_29()
       }
    }
    if (activeDisplay === 78 && event.key === "Enter" && toastMenuLoad === false){
     if(advansDMA4.classList.contains("active")){
      newOpenBoot_26()
       }
    }
    if (activeDisplay === 79 && event.key === "Enter" && toastMenuLoad === false){
     if(advansSmart4.classList.contains("active")){
       newOpenBoot_30()
       }
    }
    if (activeDisplay === 80 && event.key === "Enter" && enterLock === false && toastMenuLoad === false){
     if(advansPCItim.classList.contains("active")){
       newOpenBoot_31()
       }
    }
    if (activeDisplay === 81 && event.key === "Enter" && toastMenuLoad === false){
     if(advansPsiIde.classList.contains("active")){
       newOpenBoot_32()
       }
    }
    if (activeDisplay === 82 && event.key === "Enter" && enterLock === false && toastMenuLoad === false){
     if(advansUsbcont.classList.contains("active")){
      newOpenBoot_33()
       }
    }
    if (activeDisplay === 83 && event.key === "Enter" && toastMenuLoad === false){
     if(advansUsb2_0.classList.contains("active")){
      newOpenBoot_33()
       }
    }
    if (activeDisplay === 84 && event.key === "Enter" && toastMenuLoad === false){
     if(advansUsbLegacy.classList.contains("active")){
      newOpenBoot_34()
       }
    }
    if (activeDisplay === 85 && event.key === "Enter" && toastMenuLoad === false){
     if(advansKeyboaUsb.classList.contains("active")){
      newOpenBoot_33()
       }
    } 
    if (activeDisplay === 86 && event.key === "Enter" && toastMenuLoad === false){
     if(advansMousePower.classList.contains("active")){
      newOpenBoot_33()
       }
    } 
    if (activeDisplay === 87 && event.key === "Enter" && toastMenuLoad === false){
      localStorage.setItem('actdisExit', activeDisplay)
      rightleftBlock = true;
      hwMonitorConf()
    } 
    if (activeDisplay === 88 && event.key === "Enter" && toastMenuLoad === false){
      localStorage.setItem('actdisExit', activeDisplay)
      rightleftBlock = true;
      hwMonitorConf()
    } 
    if (activeDisplay === 89 && event.key === "Enter" && toastMenuLoad === false){
      localStorage.setItem('actdisExit', activeDisplay)
      rightleftBlock = true;
      hwMonitorConf()
    } 
    if (activeDisplay === 93 && event.key === "Enter" && toastMenuLoad === false){
      localStorage.setItem('actdisExit', activeDisplay)
      newOpenBoot_35()
    } 
    if (activeDisplay === 94 && event.key === "Enter" && toastMenuLoad === false){
      rightleftBlock = true;
      localStorage.setItem('actdisExit', activeDisplay)
      BootConf()
    }
    if (activeDisplay === 95 && event.key === "Enter" && choseMenuLoad === false && toastMenuLoad === false){ /// change password
      if (ChangeSett.classList.contains("active")) {
          choseMenuLoad = true;
          confirmalerm = true;
          rightleftBlock = true;
          toastr.options.tapToDismiss = false;
          toastr.options.progressBar = false;
          toastr.options.timeOut = 0;
          toastr.options.extendedTimeOut = 0;
          
      
          // Показываем поле ввода
          let toastId = toastr.success(`
            <input type="password" id="passwordField" placeholder="Enter new password" autofocus>
          `, "Enter new password for Supervisor");
      
          // Ждем, пока toastr сгенерирует окно
          setTimeout(() => {
              const passwordField = document.getElementById("passwordField");
      
              if (passwordField) {
                  passwordField.focus(); // Устанавливаем фокус
      
                  function closeToast() {
                      toastr.clear(); // Очистка тоста
                      document.querySelectorAll('.toast').forEach(toast => toast.remove()); // Принудительное удаление
                      document.removeEventListener('keydown', handleKeyDown);
                      passwordField.removeEventListener('blur', handleBlur);
                      updateActiveLine()
                  }
      
                  function handleKeyDown(event) {
                      if (event.key === 'Enter') {
                          const password = passwordField.value.trim();
                          if (password.length >= 3) {
                              localStorage.setItem('changePassSupervisor', password);
                              console.log('Password saved:', password);
                              closeToast(); // Закрываем окно
                              paroluserSuper = 'FH5Fj3f2w'; // если есть пароль, то будет уведомление и показывать что он установлен
                              localStorage.setItem('paroluserSuperLocal', paroluserSuper)
                              if(localStorage.getItem('paroluserSuperLocal') === 'FH5Fj3f2w'){
                                  document.getElementById("passUserSuperid").classList.add("activepass")
                                  document.getElementById("notinstallpass1").innerHTML = "Installed"
                                  setTimeout(() => {
                                    toggleTaskStatus(5);
                                    localStorage.setItem('num6correct', '6correct') 
                                    console.log('№6correct!');
                                  }, 100);
                                }
                              setTimeout(() => {
                                  choseMenuLoad = false;
                                  confirmalerm = false;
                                  rightleftBlock = false;
                              }, 300);
                          } 
                      } else if (event.key === 'Escape') {
                          console.log('Window closed without saving');
                          choseMenuLoad = false;
                          confirmalerm = false;
                          rightleftBlock = false;
                          closeToast(); // Закрываем окно
                      }
                  }
      
                  function handleBlur() {
                      setTimeout(() => passwordField.focus(), 10); // Переводим фокус обратно
                  }
      
                  // Добавляем обработчики событий
                  passwordField.addEventListener('keydown', handleKeyDown);
                  passwordField.addEventListener('blur', handleBlur);
              }
          }, 100);
      }     
    }
    if (activeDisplay === 95 && event.key === "F9" && choseMenuLoad === false && toastMenuLoad === false) {
      choseMenuLoad = true
      confirmalerm = true;
      rightleftBlock = true;
      toastr.options.tapToDismiss = false;
      toastr.options.progressBar = false;
      console.log(choseMenuLoad + "/" + confirmalerm + "/" + rightleftBlock + " :load1st debug")
      toastr.options.timeOut = "0";
      toastr.options.extendedTimeOut = "0";
      toastr.success(`
        <button id="btnYes" class="btn btn-success">[Ok]</button>
        <button type="button" id="btnNo" class="btn clear">[Cancel]</button>
      `, "Do you want to return the default value?");
      
      // Ждем, пока toastr сгенерирует кнопки (примерно 100 мс)
      setTimeout(() => {
        const btnYes = document.getElementById("btnYes");
        const btnNo = document.getElementById("btnNo");
        
        if (!btnYes || !btnNo) {
          console.error("Кнопки не найдены");
          return;
        }
        
        // Инициализируем массив кнопок и устанавливаем первую как активную
        let activeIndexMenu = 0;
        const buttons = [btnYes, btnNo];
        buttons[activeIndexMenu].classList.add("activeMenu");
        
        // Функции для выбора
        function selectYes() {
          userChoice = true;
          toastr.clear();
          console.log("User selected: Yes");
          localStorage.setItem('paroluserSuperLocal', 'Au62sHJGFf5r')

  setTimeout(() => {
          rightleftBlock = false;
          confirmalerm = false;
          choseMenuLoad = false;
          if(localStorage.getItem('paroluserSuperLocal') === 'Au62sHJGFf5r'){
            document.getElementById("passUserSuperid").classList.remove("activepass")
            document.getElementById("notinstallpass1").innerHTML = "Not Installed"
            setTimeout(() => {
              toggleTaskStatus(5);
              localStorage.setItem('num6correct', '6correct')  
              console.log('№6correct!');
            }, 100);
          }
  }, 1000); 
        }   
        function selectNo() {
          userChoice = false;
          toastr.clear();
          console.log("User selected: No");
          removeKeyListener();
    setTimeout(() => {
          rightleftBlock = false;
          confirmalerm = false;
          choseMenuLoad = false;
          
  }, 1000);
          
        }  
        // Обработчик клавиатуры для переключения между кнопками и подтверждения выбора
        function arrowHandler(e) {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            buttons.forEach(btn => btn.classList.remove("activeMenu"));
            activeIndexMenu = (activeIndexMenu + 1) % buttons.length;
            buttons[activeIndexMenu].classList.add("activeMenu");
            e.preventDefault();
          } else if (e.key === "Enter") {
            // Если нажато Enter, проверяем, какая кнопка активна, и вызываем соответствующую функцию
            if (buttons[activeIndexMenu].id === "btnYes") {
              selectYes();
            } else if (buttons[activeIndexMenu].id === "btnNo") {
              selectNo();
            }
          } else if (e.key === "Escape"){
              selectNo();
          }
        }
        
        document.addEventListener("keydown", arrowHandler);
        
        // Функция для удаления обработчика, когда выбор сделан
        function removeKeyListener() {
          document.removeEventListener("keydown", arrowHandler);
        }
        
      }, 1);
    }
    if (activeDisplay === 96 && event.key === "Enter" && choseMenuLoad === false && toastMenuLoad === false){ /// change password
        if (ChangeUser.classList.contains("active")) {
            choseMenuLoad = true;
            confirmalerm = true;
            rightleftBlock = true;
            toastr.options.tapToDismiss = false;
            toastr.options.progressBar = false;
            toastr.options.timeOut = 0;
            toastr.options.extendedTimeOut = 0;
            console.log(choseMenuLoad + "/" + confirmalerm + "/" + rightleftBlock + " :load1st debug");
        
            // Показываем поле ввода
            let toastId = toastr.success(`
              <input type="password" id="passwordField" placeholder="Enter new password" autofocus>
            `, "Enter new password for User Password");
        
            // Ждем, пока toastr сгенерирует окно
            setTimeout(() => {
                const passwordField = document.getElementById("passwordField");
        
                if (passwordField) {
                    passwordField.focus(); // Устанавливаем фокус
        
                    function closeToast() {
                        toastr.clear(); // Очистка тоста
                        document.querySelectorAll('.toast').forEach(toast => toast.remove()); // Принудительное удаление
                        document.removeEventListener('keydown', handleKeyDown);
                        passwordField.removeEventListener('blur', handleBlur);
                        updateActiveLine()
                    }
        
                    function handleKeyDown(event) {
                        if (event.key === 'Enter') {
                            const password = passwordField.value.trim();
                            if (password.length >= 3) {
                                localStorage.setItem('changePass', password);
                                console.log('Password saved:', password);
                                closeToast(); // Закрываем окно
                                paroluser = 'vZvIh3d8C'; // если есть пароль, то будет уведомление и показывать что он установлен
                                localStorage.setItem('paroluserLocal', paroluser)
                                if(localStorage.getItem('paroluserLocal') === 'vZvIh3d8C'){
                                    document.getElementById("passUserid").classList.add("activepass")
                                    document.getElementById("notinstallpass").innerHTML = "Installed"
                                    setTimeout(() => {
                                      toggleTaskStatus(5);
                                      localStorage.setItem('num6correct', '6correct')  
                                      console.log('№6correct!');
                                    }, 100);
                                  }
                                setTimeout(() => {
                                    choseMenuLoad = false;
                                    confirmalerm = false;
                                    rightleftBlock = false;
                                }, 300);
                            } 
                        } else if (event.key === 'Escape') {
                            console.log('Window closed without saving');
                            choseMenuLoad = false;
                            confirmalerm = false;
                            rightleftBlock = false;
                            closeToast(); // Закрываем окно
                        }
                    }
        
                    function handleBlur() {
                        setTimeout(() => passwordField.focus(), 10); // Переводим фокус обратно
                    }
        
                    // Добавляем обработчики событий
                    passwordField.addEventListener('keydown', handleKeyDown);
                    passwordField.addEventListener('blur', handleBlur);
                }
            }, 100);
        }     
      }

      if (activeDisplay === 96 && event.key === "F9" && choseMenuLoad === false && toastMenuLoad === false) {
        choseMenuLoad = true
        confirmalerm = true;
        rightleftBlock = true;
        toastr.options.tapToDismiss = false;
        toastr.options.progressBar = false;
        console.log(choseMenuLoad + "/" + confirmalerm + "/" + rightleftBlock + " :load1st debug")
        toastr.options.timeOut = "0";
        toastr.options.extendedTimeOut = "0";
        toastr.success(`
          <button id="btnYes" class="btn btn-success">[Ok]</button>
          <button type="button" id="btnNo" class="btn clear">[Cancel]</button>
        `, "Do you want to return the default value?");
        
        // Ждем, пока toastr сгенерирует кнопки (примерно 100 мс)
        setTimeout(() => {
          const btnYes = document.getElementById("btnYes");
          const btnNo = document.getElementById("btnNo");
          
          if (!btnYes || !btnNo) {
            console.error("Кнопки не найдены");
            return;
          }
          
          // Инициализируем массив кнопок и устанавливаем первую как активную
          let activeIndexMenu = 0;
          const buttons = [btnYes, btnNo];
          buttons[activeIndexMenu].classList.add("activeMenu");
          
          // Функции для выбора
          function selectYes() {
            userChoice = true;
            toastr.clear();
            console.log("User selected: Yes");
            paroluser = 'MuKLeqkeH7e'
            localStorage.setItem('paroluserLocal', paroluser)

    setTimeout(() => {
            rightleftBlock = false;
            confirmalerm = false;
            choseMenuLoad = false;
            if(localStorage.getItem('paroluserLocal') === 'MuKLeqkeH7e'){
              document.getElementById("passUserid").classList.remove("activepass")
              document.getElementById("notinstallpass").innerHTML = "Not Installed"
              setTimeout(() => {
                toggleTaskStatus(5);
                localStorage.setItem('num6correct', '6correct')  
                console.log('№6correct!');
              }, 100);
            }
    }, 1000); 
          }   
          function selectNo() {
            userChoice = false;
            toastr.clear();
            console.log("User selected: No");
            removeKeyListener();
      setTimeout(() => {
            rightleftBlock = false;
            confirmalerm = false;
            choseMenuLoad = false;
            
    }, 1000);
            
          }  
          // Обработчик клавиатуры для переключения между кнопками и подтверждения выбора
          function arrowHandler(e) {
            if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
              buttons.forEach(btn => btn.classList.remove("activeMenu"));
              activeIndexMenu = (activeIndexMenu + 1) % buttons.length;
              buttons[activeIndexMenu].classList.add("activeMenu");
              e.preventDefault();
            } else if (e.key === "Enter") {
              // Если нажато Enter, проверяем, какая кнопка активна, и вызываем соответствующую функцию
              if (buttons[activeIndexMenu].id === "btnYes") {
                selectYes();
              } else if (buttons[activeIndexMenu].id === "btnNo") {
                selectNo();
              }
            } else if (e.key === "Escape"){
                selectNo();
            }
          }
          
          document.addEventListener("keydown", arrowHandler);
          
          // Функция для удаления обработчика, когда выбор сделан
          function removeKeyListener() {
            document.removeEventListener("keydown", arrowHandler);
          }
          
        }, 1);
      }
      if(activeDisplay === 97 && event.key === "Enter" && toastMenuLoad === false){
        toastMenuLoad = true;
          choseMenuLoad = true
          confirmalerm = true;
          rightleftBlock = true;
          toastr.options.tapToDismiss = false;
          toastr.options.progressBar = false;
          console.log(choseMenuLoad + "/" + confirmalerm + "/" + rightleftBlock + " :load1st debug")
          toastr.options.timeOut = "0";
          toastr.options.extendedTimeOut = "0";
          toastr.success(`
            <button id="btnYes" class="btn btn-success">[Ok]</button>
            <button type="button" id="btnNo" class="btn clear">[Cancel]</button>
          `, "Save and Exit?");
          
          // Ждем, пока toastr сгенерирует кнопки (примерно 100 мс)
          setTimeout(() => {
            const btnYes = document.getElementById("btnYes");
            const btnNo = document.getElementById("btnNo");
            
            if (!btnYes || !btnNo) {
              console.error("Кнопки не найдены");
              return;
            }
            
            // Инициализируем массив кнопок и устанавливаем первую как активную
            let activeIndexMenu = 0;
            const buttons = [btnYes, btnNo];
            buttons[activeIndexMenu].classList.add("activeMenu");
            
            // Функции для выбора
            function selectYes() {
              userChoice = true;
              toastr.clear();
              console.log("User selected: Yes");
              saveProfile(999)
              history.replaceState(null, "", "/biosinstant.html"); 
              window.location.href = "/biosLoad.html";
              removeKeyListener();
      setTimeout(() => {
              rightleftBlock = false;
              confirmalerm = false;
              choseMenuLoad = false;
              toastMenuLoad = false;
      
      }, 1000); 
            }   
            function selectNo() {
              userChoice = false;
              toastr.clear();
              console.log("User selected: No");
              removeKeyListener();
        setTimeout(() => {
              rightleftBlock = false;
              confirmalerm = false;
              choseMenuLoad = false;
              toastMenuLoad = false;
              console.log(choseMenuLoad + "/" + confirmalerm + "/" + rightleftBlock + " :load1st debug")
      }, 1000);
              
            }  
            // Обработчик клавиатуры для переключения между кнопками и подтверждения выбора
            function arrowHandler(e) {
              if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                buttons.forEach(btn => btn.classList.remove("activeMenu"));
                activeIndexMenu = (activeIndexMenu + 1) % buttons.length;
                buttons[activeIndexMenu].classList.add("activeMenu");
                e.preventDefault();
              } else if (e.key === "Enter") {
                // Если нажато Enter, проверяем, какая кнопка активна, и вызываем соответствующую функцию
                if (buttons[activeIndexMenu].id === "btnYes") {
                  selectYes();
                } else if (buttons[activeIndexMenu].id === "btnNo") {
                  selectNo();
                }
              } else if (e.key === "Escape"){
                  selectNo();
              }
            }
            
            document.addEventListener("keydown", arrowHandler);
            
            // Функция для удаления обработчика, когда выбор сделан
            function removeKeyListener() {
              document.removeEventListener("keydown", arrowHandler);
            }
            
          }, 1);
        
      }
      if (event.key === "F10" && choseMenuLoad === false){
          toastMenuLoad = true;
          choseMenuLoad = true;
          confirmalerm = true;
          rightleftBlock = true;
          toastr.options.tapToDismiss = false;
          toastr.options.progressBar = false;
          console.log(choseMenuLoad + "/" + confirmalerm + "/" + rightleftBlock + " :load1st debug")
          toastr.options.timeOut = "0";
          toastr.options.extendedTimeOut = "0";
          toastr.success(`
            <button id="btnYes" class="btn btn-success">[Ok]</button>
            <button type="button" id="btnNo" class="btn clear">[Cancel]</button>
          `, "Save and Exit?");
          
          // Ждем, пока toastr сгенерирует кнопки (примерно 100 мс)
          setTimeout(() => {
            const btnYes = document.getElementById("btnYes");
            const btnNo = document.getElementById("btnNo");
            
            if (!btnYes || !btnNo) {
              console.error("Кнопки не найдены");
              return;
            }
            
            // Инициализируем массив кнопок и устанавливаем первую как активную
            let activeIndexMenu = 0;
            const buttons = [btnYes, btnNo];
            buttons[activeIndexMenu].classList.add("activeMenu");
            
            // Функции для выбора
            function selectYes() {
              userChoice = true;
              toastr.clear();
              console.log("User selected: Yes");
              saveProfile(999)
              history.replaceState(null, "", "/biosinstant.html"); 
              window.location.href = "/biosLoad.html";
              removeKeyListener();
      setTimeout(() => {
              rightleftBlock = false;
              confirmalerm = false;
              choseMenuLoad = false;
              toastMenuLoad = false;
      }, 1000); 
            }   
            function selectNo() {
              userChoice = false;
              toastr.clear();
              console.log("User selected: No");
              removeKeyListener();
        setTimeout(() => {
              rightleftBlock = false;
              confirmalerm = false;
              choseMenuLoad = false;
              toastMenuLoad = false;
              console.log(choseMenuLoad + "/" + confirmalerm + "/" + rightleftBlock + " :load1st debug")
      }, 1000);
              
            }  
            // Обработчик клавиатуры для переключения между кнопками и подтверждения выбора
            function arrowHandler(e) {
              if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                buttons.forEach(btn => btn.classList.remove("activeMenu"));
                activeIndexMenu = (activeIndexMenu + 1) % buttons.length;
                buttons[activeIndexMenu].classList.add("activeMenu");
                e.preventDefault();
              } else if (e.key === "Enter") {
                // Если нажато Enter, проверяем, какая кнопка активна, и вызываем соответствующую функцию
                if (buttons[activeIndexMenu].id === "btnYes") {
                  selectYes();
                } else if (buttons[activeIndexMenu].id === "btnNo") {
                  selectNo();
                }
              } else if (e.key === "Escape"){
                  selectNo();
              }
            }
            
            document.addEventListener("keydown", arrowHandler);
            
            // Функция для удаления обработчика, когда выбор сделан
            function removeKeyListener() {
              document.removeEventListener("keydown", arrowHandler);
            }
            
          }, 1);
        
    
      }
      if(activeDisplay === 98 && event.key === "Enter" && toastMenuLoad === false){
        nosaveandexit()
      }
      if(event.key === "F7" && choseMenuLoad === false){
        nosaveandexit()
      }
      if(activeDisplay === 99 && event.key === "Enter" && toastMenuLoad === false){
        loadProfile(999)
      }
      if(activeDisplay === 100 && event.key === "Enter" && toastMenuLoad === false){
        loaddefultbios()
      }
      if(event.key === "F9" && choseMenuLoad === false){
        loaddefultbios()
      }
      if(activeDisplay === 101 && event.key === "Enter" && toastMenuLoad === false){
        loadperfomance()
      }
      if(event.key === "F4" && choseMenuLoad === false){
        loadperfomance()
      }
      if(activeDisplay === 102 && event.key === "Enter" && toastMenuLoad === false){
        loadpowersef()
      }
      if(event.key === "F6" && choseMenuLoad === false){
        loadpowersef()
      }
      if (event.key === "F1" && choseMenuLoad === false){
        generalHelpActive = true;
        document.getElementById('generalHelp').style.display = ''
        choseMenuLoad = true
        confirmalerm = true;
        rightleftBlock = true;
      }
      if (event.key === "Escape" && generalHelp.style.display === ''){    
        document.getElementById('generalHelp').style.display = 'none'
        choseMenuLoad = false;
        confirmalerm = false;
        rightleftBlock = false;
        setTimeout(() => {
          generalHelpActive = false;
        }, 10);
        
      }
    if (activeDisplay === 92 && event.key === "Enter" && toastMenuLoad === false){
      rightleftBlock = true;
      BootConf()
    }
    if (activeDisplay === 103 && event.key === "Enter" && enterLock === false && toastMenuLoad === false){
      localStorage.setItem('actdisExit', activeDisplay) /// зберігаємо індекс, для коректної обробки функції Esc
      newOpenBoot_36()
    }
    if (activeDisplay === 104 && event.key === "Enter" && toastMenuLoad === false){
      localStorage.setItem('actdisExit', activeDisplay) /// зберігаємо індекс, для коректної обробки функції Esc
      newOpenBoot_36()
    }
    if (activeDisplay === 105 && event.key === "Enter" && enterLock === false && toastMenuLoad === false){
      newOpenBoot_33()
    }
    if (activeDisplay === 106 && event.key === "Enter" && toastMenuLoad === false){
      newOpenBoot_33()
    }  
    if (activeDisplay === 107 && event.key === "Enter" && toastMenuLoad === false){
      newOpenBoot_33()
    }
    if (activeDisplay === 108 && event.key === "Enter" && toastMenuLoad === false){
      newOpenBoot_37()
    }
    if (activeDisplay === 109 && event.key === "Enter" && enterLock === false){
      newOpenBoot_38()
    }
    if (activeDisplay === 111 && event.key === "Enter" && toastMenuLoad === false){
      newOpenBoot_39()
    }
    if (activeDisplay === 91 && event.key === "Enter" && toastMenuLoad === false){
      newOpenBoot_33()
    }
    if (activeDisplay === 90 && event.key === "Enter" && toastMenuLoad === false){
      newOpenBoot_33()
      
    } 
    if (activeDisplay === 112 && event.key === "Enter" && enterLock === false && toastMenuLoad === false){
      newOpenBoot_40()
    }
    if (activeDisplay === 113 && event.key === "Enter"  && toastMenuLoad === false){
      enterPressCount++;
       // Если это первое нажатие, запускаем таймер сброса
       if (enterPressCount === 1) {
            enterPressTimer = setTimeout(() => {
                enterPressCount = 0;
            }, 1000); // Таймер сброса (1 сек)
        }
        // Если нажали три раза подряд за 500 мс
        if (enterPressCount === 5) {
            clearTimeout(enterPressTimer); // Очищаем таймер
            enterPressCount = 0; // Сбрасываем счётчик
            console.log("5oe нажатие Enter сработало!");
            // Тут можно вызвать нужную функцию
            document.body.style.transition = "transform 300ms ease-in-out";
            document.body.style.transform = "scale(0.9)";
            document.querySelector(".headerr").style.background = "#f30b0b";
            document.getElementById("targetmem").style.marginRight = "182px";
            

setTimeout(() => {
    document.body.style.transform = "scale(1)";
    document.querySelector(".headerr").style.background = "#1c23a7";
    document.getElementById("targetmem").style.marginRight = "282px";
    pashalka = pashalka ? false : true; // Меняет значение на противоположное
    pashalkoDefault();
    
}, 300);
        }

    
    }
    if (activeDisplay === 114 && event.key === "Enter" && toastMenuLoad === false){
      newOpenBoot_39()
    }
    if (activeDisplay === 115 && event.key === "Enter" && enterLock === false && toastMenuLoad === false){
        newOpenBoot_40()
      }
      if (activeDisplay === 117 && event.key === "Enter" && toastMenuLoad === false){
        newOpenBoot_39()
      }

      } else if (!alertElement.classList.contains("hidden")) {
        // Если окно выбора диска открыто, работаем только с ним
        switch (event.key) {
          case "ArrowUp":
            navigateAlertWindow(-1); // Перемещаемся вверх
            break;
          case "ArrowDown":
            navigateAlertWindow(1); // Перемещаемся вниз
            break;
          case "Enter":
            // Сохраняем выбранное значение и закрываем окно
            changeCpu.textContent = `[${alertOptions[activeAlertOption].textContent}]`;
              localStorage.setItem('changeCpuLocal', `[${alertOptions[activeAlertOption].textContent}]`)
            closeAlertWindow();
            break;
          case "Escape":
            // Закрываем окно без сохранения
            closeAlertWindow();
            break;
        }


      } else if (!alertElementLang.classList.contains("hidden")) { //ИСПОЛЬЗУЕМ ЭТО !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!~!!!!
        // Если окно выбора языка открыто, работаем только с ним
        switch (event.key) {
          case "ArrowUp":
            navigateAlertWindowLang(-1); // Перемещаемся вверх
            break;
          case "ArrowDown":
            navigateAlertWindowLang(1); // Перемещаемся вниз
            break;
          case "Enter":
      //    if (document.querySelector("#option1").textContent === "Disabled") { ////
       //       bootEnabled.textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
        //    } 
            if (document.querySelector("#option1").textContent === acceptMass[7]) {
             document.getElementById('bootGuard').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
             localStorage.setItem('bootguar', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
             sessionStorage.setItem("bootguarSession", `[${alertOptionsLang[activeAlertOptionLang].textContent}]`);         
            }
            if (document.querySelector("#option1").textContent === acceptMass[1, 2]) {
            spredDisabled.textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
            localStorage.setItem('spredDisabl', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`)   
          }
          if (document.querySelector("#option1").textContent === acceptMass[10]) {
          document.getElementById('allCores').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
          localStorage.setItem('allCor', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`)
          if(allCores.innerHTML === "[Four Cores]"){
            setTimeout(() => {
              toggleTaskStatus(4); 
              console.log('№5correct!');
              if(localStorage.getItem('num5correct')){

              }
              else{
              confirmalerm = true;
              rightleftBlock = true;
              toastr.options.tapToDismiss = true;
              toastr.options.progressBar = true;
              toastr.options.timeOut = "2800";
              toastr.options.extendedTimeOut = "1000";
              toastr.success("You have successfully completed the task #5", "Success!");
              var toastTitle = document.querySelector(".toast-title");
              toastTitle.style.height = "50px";
              toastTitle.style.lineHeight = "40px";
              localStorage.setItem('num5correct', '5correct')
            }
            }, 100);
          }   
          }
          if (document.querySelector("#option1").textContent === acceptMass[20]) {
           document.getElementById('bootEnabled').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('bootEnab', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`)   
          }
          if (document.querySelector("#option1").textContent === acceptMass[15]) {
           document.getElementById('turbocoreAuto').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('turbocoreAu', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`)  
          }
          if (document.querySelector("#option1").textContent === acceptMass[150] && activdisp71 === true) {
           document.getElementById('advansDisablPlug3').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           selectedOption = alertOptionsLang[activeAlertOptionLang].textContent.trim();
    
    // Управление видимостью группы элементов
    const elementsToToggle = ['advansPIO', 'advans2_2AUto3', 'advansDMA', 'advansSmarEnab3'];
    
    elementsToToggle.forEach(id => {
        const element = document.getElementById(id);
        if(element) {
            element.style.display = selectedOption === "Not Installed" ? "none" : "block";
            selectedOption === "Not Installed" ? offsata23.style.display = "none" : offsata23.style.display = "flex";
            selectedOption === "Not Installed" ? onSata23.style.display = "flex" : onSata23.style.display = "none";
            console.log(`${id} display: ${element.style.display}`); // Отладка
        }
    });
    activeDisplay = 71;
    updateActiveLine();
    
    const Plug3Local = document.getElementById('advansDisablPlug3');
    if(Plug3Local) {
      Plug3Local.textContent = `[${selectedOption}]`;
      localStorage.setItem('Plug3Local', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`)
    }
          }
          if (document.querySelector("#option1").textContent === acceptMass[18]) {
           document.getElementById('amdstateend').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('amdstate', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`)  
          }
          if (document.querySelector("#option1").textContent === acceptMass[22] && amdApm.classList.contains("active")) {
           document.getElementById('amdapmm').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('amdapm', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`)  
          }
          if (document.querySelector("#option1").textContent.trim() === acceptMass[25] && activdisp10 === true && !advansSata2_2Auto.classList.contains("active") && !advansSata2_2Auto2.classList.contains("active") && !advansDMA.classList.contains("active")) {
    selectedOption = alertOptionsLang[activeAlertOptionLang].textContent.trim();
    
    // Управление видимостью группы элементов
    const elementsToToggle = ['cpuvol', 'multipvol', 'cpuvolnbb', 'multiNB', 'multipliercpu', 'multipar'];
    
    elementsToToggle.forEach(id => {
        const element = document.getElementById(id);
        if(activeMenuItemIndex !== 2) {
            element.style.display = selectedOption === "ManuaI" ? "block" : "none";
            console.log(`${id} display: ${element.style.display}`); // Отладка
        }
    });
    activeDisplay = 10;
    updateActiveLine();
    
    const multivolElement = document.getElementById('multivol');
    if(multivolElement) {
        multivolElement.textContent = `[${selectedOption}]`;
        localStorage.setItem('multivolEl', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
    }
}
          if (document.querySelector("#option1").textContent === acceptMass[27]) {
            if(!htbus.classList.contains("active")){
              document.getElementById('multiNB').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
              localStorage.setItem('multi', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
            }  
          }
          if (document.querySelector("#option1").textContent === acceptMass[39]) {
           document.getElementById('multipvol').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('multipv', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if (document.querySelector("#option1").textContent === acceptMass[54]) {
           document.getElementById('multipar').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('multip', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`)
           setTimeout(() => {
            toggleTaskStatus(2); // 3 quest 
            localStorage.setItem('num3correct', '3correct') 
            console.log('3correct');
          }, 100); 
          }
          if (document.querySelector("#option2").textContent === acceptMass[128]) {
           document.getElementById('advansKeyboardDisa').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('advansKeyboardLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if (document.querySelector("#option2").textContent === acceptMass[150] && advansSata2_2Auto.classList.contains("active") || advansSata2_2Auto2.classList.contains("active")) {
          if(advansSata2_2Auto.classList.contains("active")) { 
            document.getElementById('advans2_2AUto').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('advans2_2AUtoLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) }
           if(advansSata2_2Auto2.classList.contains("active")) { 
            document.getElementById('advans2_2AUto2').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('advans2_2AUto2Local', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) }
          }
          
          if (htbus.classList.contains("active")) {
           document.getElementById('htbusspeed').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('htbussp', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if (document.querySelector("#option1").textContent === acceptMass[70]) {
           document.getElementById('htbuswidth').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('htbuswid', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if (document.querySelector("#option1").textContent === acceptMass[73]) {
           document.getElementById('memddr3').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('memdr', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`)
           setTimeout(() => {
            toggleTaskStatus(2); // 3 quest 
            localStorage.setItem('num3correct', '3correct') 
            console.log('3correct');
          }, 100); 
          }
          if (onboardGpu.classList.contains("active") || load1st.classList.contains("active") || load2st.classList.contains("active") || activeDisplay === 26 && event.key === "Enter") {
           
           selectedOption = alertOptionsLang[activeAlertOptionLang].textContent.trim();
    
    // Управление видимостью группы элементов
    const elementsToToggle = ['onboardGpucllock', 'onboardcount'];
    
    elementsToToggle.forEach(id => {
        const element = document.getElementById(id);
        if(element) {
            element.style.display = selectedOption === "Enabled" ? "block" : "none";
            console.log(`${id} display: ${element.style.display}`); // Отладка
        }
    });
    activeDisplay = 18;
    updateActiveLine();
    
    const boardiss = document.getElementById('onboarddiss');
    if(boardiss) {
      boardiss.textContent = `[${selectedOption}]`;
      localStorage.setItem('boardis', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
    }

          }
          if (document.querySelector("#option1").textContent === acceptMass[79]) {
           document.getElementById('vol_1aut').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('vol1aut', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if (document.querySelector("#option1").textContent === acceptMass[46]) {
           document.getElementById('vol_2aut').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('vol2aut', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if (document.querySelector("#option1").textContent === acceptMass[91]) {
           document.getElementById('vcore_offaut').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('vcoreoff', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if (document.querySelector("#option1").textContent === acceptMass[100]) {
           document.getElementById('vcore_dropoff').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('vcoredro', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if (document.querySelector("#option1").textContent === acceptMass[104]) {
           document.getElementById('vcore_dropoff_1').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('vcoredro1', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if (document.querySelector("#option1").textContent === acceptMass[22] && advansQuiet.classList.contains("active")) {
           document.getElementById('advansQuiet1').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('advansQuietLoc', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if (document.querySelector("#option3").textContent === acceptMass[129] && advansRTCByOs.classList.contains("active")) { 
           document.getElementById('advansRTCByOs').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           

           selectedOption = alertOptionsLang[activeAlertOptionLang].textContent.trim();
    
    // Управление видимостью группы элементов 
    const elementsToToggle = ['advansRTCDate', 'advansRTCDatechose', 'advansRTCTime', 'advansRTCByOstimechose', 'advansRTCByOstimechose2'];
    
    elementsToToggle.forEach(id => {
  const element = document.getElementById(id);
  if (element) {
    if (selectedOption === "Enabled") {
      element.style.display = (id === 'advansRTCByOstimechose2') ? "flex" : "block";
    } else {
      element.style.display = "none";
    }
    console.log(`${id} display: ${element.style.display}`);
  }
});

    updateActiveLine();
    
    
    const advansRTCChos = document.getElementById('advansRTCByOs');
    if(advansRTCChos) {
      advansRTCChos.textContent = `[${selectedOption}]`;
      localStorage.setItem('advansRTCByLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
    }



          }
          if (document.querySelector("#option1").textContent === acceptMass[22] && advansQuiet2.classList.contains("active")) {
           document.getElementById('advansQuiet3').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('advansQuiet3Loc', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if (document.querySelector("#option1").textContent === acceptMass[22] && advansEnha.classList.contains("active")) {
           document.getElementById('advansEnhapar').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('advansEnhaparLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if (document.querySelector("#option1").textContent === acceptMass[22] && advansThrotpar.classList.contains("active")) {
           document.getElementById('advansThrotpar').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('advansThrotparLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if (document.querySelector("#option1").textContent === acceptMass[22] && (advansOnboard.classList.contains("active") || advansCheckReady.classList.contains("active"))) { 
            if(advansCheckReady.classList.contains("active")){
            document.getElementById('advansCheckReadyAuto').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
            localStorage.setItem('advansCheckRedLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
           }
       if(advansOnboard.classList.contains("active"))  {  
       
       document.getElementById('advansOnboardAuto').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           selectedOption = alertOptionsLang[activeAlertOptionLang].textContent.trim();

    
  // Управление видимостью группы элементов 
    const elementsToToggle = ['advansFront', 'advansFrontHD'];
    
    elementsToToggle.forEach(id => {
        const element = document.getElementById(id);
        if(element) {
            element.style.display = selectedOption === "Enabled" ? "block" : "none";
            console.log(`${id} display: ${element.style.display}`); // Отладка
        }
    });
    activeDisplay = 40;
    updateActiveLine();
    
    const OnboardAuto = document.getElementById('advansOnboardAuto');
    if(OnboardAuto) {
      OnboardAuto.textContent = `[${selectedOption}]`;
      localStorage.setItem('advansOnboardAutoLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`)  
    }
  }
          }
          if (document.querySelector("#option1").textContent === acceptMass[114] && advansFront.classList.contains("active")) {
           document.getElementById('advansFrontHD').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('advansFrontHDLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if (document.querySelector("#option1").textContent === acceptMass[22] && (advansOnboardLan.classList.contains("active") || advansOnboardSata.classList.contains("active") || advansHotPlug2.classList.contains("active") || advansSMart2.classList.contains("active") || advansOnboardHdmi.classList.contains("active") || advansSuspend.classList.contains("active") || advansAwayMode.classList.contains("active") || advansPCIDevicesDisb.classList.contains("active") || advansACPI.classList.contains("active") || advansDeep.classList.contains("active") || advansSATaComb.classList.contains("active") || advansHotPlug.classList.contains("active") || advansSMart.classList.contains("active") )) {
          if(advansOnboardLan.classList.contains("active")) {   
            document.getElementById('advansOnboardLanEnab').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
            localStorage.setItem('advansLanEnaLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if(advansAwayMode.classList.contains("active")) {
            document.getElementById('advansAwayMDisabled').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
            localStorage.setItem('advansAwayMLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if(advansSMart2.classList.contains("active")) {
            document.getElementById('advansSmarEnab2').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
            localStorage.setItem('advansEnab2MLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if(advansSata2_2Auto2.classList.contains("active")) {
            document.getElementById('advans2_2AUto2').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
            localStorage.setItem('advansAUto2Local', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if(advansHotPlug2.classList.contains("active")) {
            document.getElementById('advansDisablPlug2').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
            localStorage.setItem('advansPlug2Local', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if(advansOnboardSata.classList.contains("active")) {
            document.getElementById('advansOnboSataEnb').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
            


            selectedOption = alertOptionsLang[activeAlertOptionLang].textContent.trim();
    
    // Управление видимостью группы элементов 
    const elementsToToggle = ['advansSataOper', 'advansSataAhci', 'advansSATaComb', 'advansCombEnab', 'advansSata2_1', 'advans2_1Not', 'advansSata2_2', 'advans2_2Not', 'advansSata2_3', 'advans2_3CD', 'advansSata2_4', 'advansSataDisk'];
    
    elementsToToggle.forEach(id => {
        const element = document.getElementById(id);
        if(element) {

if(StorageConfiggBlock_4 === false){ 
  const elementsToToggle_1 = ['advansSataOper', 'advansSataAhci', 'advansSATaComb', 'advansCombEnab', 'advansSata2_1', 'advans2_1Not', 'advansSata2_2', 'advans2_2Not'];
  elementsToToggle_1.forEach(id => {
        const element_1 = document.getElementById(id);
        if(element_1) {
            element_1.style.display = selectedOption === "Enabled" ? "block" : "none";
            advansOnboardSata.style.width = selectedOption === "Enabled" ? "30%" : "100%";
            advansOnboSataEnb.style.width = selectedOption === "Enabled" ? "50%" : "0%";

        }
        })
}
  if(StorageConfiggBlock_4 === true){
            element.style.display = selectedOption === "Enabled" ? "block" : "none";
            advansOnboardSata.style.width = selectedOption === "Enabled" ? "30%" : "100%";
            advansOnboSataEnb.style.width = selectedOption === "Enabled" ? "50%" : "0%";
            console.log(`${id} display: ${element.style.display}`); // Отладка
        }
        if(advansSata2_1.style.display ==="none"){
          StorageConfiggBlock = false
          StorageConfiggBlock_2 = true
        } if(advansSata2_1.style.display ==="block"){
          StorageConfiggBlock = true
          StorageConfiggBlock_2 = false
        }
      }
    });
    updateActiveLine();
    
    const advansOnbo = document.getElementById('advansOnboSataEnb');
    if(advansOnbo) {
      advansOnbo.textContent = `[${selectedOption}]`;
      localStorage.setItem('advansOnboSataLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`)  
    }
          } if(advansACPI.classList.contains("active")) {
            document.getElementById('advansACPIEnabl').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
            localStorage.setItem('advansACPIMLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if(advansDeep.classList.contains("active")) {
            document.getElementById('advansDeepDisa').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
            localStorage.setItem('advansDeepDisaLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
           if(advansOnboardHdmi.classList.contains("active")){
            document.getElementById('advansOnboardHdmiEn').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
            localStorage.setItem('advansHdmiELocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
           }
           if(advansHotPlug.classList.contains("active")){
            document.getElementById('advansDisablPlug').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
            localStorage.setItem('advansDisablPlugLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
           }
           if(advansSMart.classList.contains("active")){
            document.getElementById('advansSmarEnab').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
            localStorage.setItem('advansSmarEnLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
           }
           if(advansPCIDevicesDisb.classList.contains("active")){
            document.getElementById('advansPCIDevicesDisb').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
            localStorage.setItem('advansPCIDevicesELocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
           }
           if(advansSATaComb.classList.contains("active")){
            document.getElementById('advansCombEnab').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
            

            selectedOption = alertOptionsLang[activeAlertOptionLang].textContent.trim();
    
    // Управление видимостью группы элементов 
    const elementsToToggle = ['advansSata2_3', 'advans2_3CD', 'advansSata2_4', 'advansSataDisk'];
    
    elementsToToggle.forEach(id => {
        const element = document.getElementById(id);
        if(element) {
            element.style.display = selectedOption === "Enabled" ? "block" : "none";
            selectedOption === "Enabled" ? StorageConfiggBlock_4 = true : StorageConfiggBlock_4 = false;
            console.log(`${id} display: ${element.style.display}`); // Отладка
        }
        if(advansSata2_4.style.display ==="none"){
          StorageConfiggBlock = false
          StorageConfiggBlock_3 = true
        } if(advansSata2_4.style.display ==="block"){
          StorageConfiggBlock = true
          StorageConfiggBlock_3 = false
        }
    });
    updateActiveLine();
    
    const advansCombE = document.getElementById('advansCombEnab');
    if(advansCombE) {
      advansCombE.textContent = `[${selectedOption}]`;
      localStorage.setItem('advansComnEnabLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
    }

           }
           if(advansSuspendAuto.classList.contains("active")){
            document.getElementById('advansSuspendAuto').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
            

            selectedOption = alertOptionsLang[activeAlertOptionLang].textContent.trim();
    
    // Управление видимостью группы элементов 
    const elementsToToggle = ['advansCheckReady', 'advansCheckReadyAuto'];
    
    elementsToToggle.forEach(id => {
        const element = document.getElementById(id);
        if(element) {
            element.style.display = selectedOption === "Auto" ? "block" : "none";
            console.log(`${id} display: ${element.style.display}`); // Отладка
        }
    });
    updateActiveLine();
    
    const OnboardAuto = document.getElementById('advansSuspendAuto');
    if(OnboardAuto) {
      OnboardAuto.textContent = `[${selectedOption}]`;
      localStorage.setItem('advansSuspendAutoLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
    }

           }
           
          }
          if (document.querySelector("#option1").textContent === acceptMass[116] && advansPrimaryPci.classList.contains("active")) {
           document.getElementById('advansPrimaryPci').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('advansPrimaryPcLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if (document.querySelector("#option1").textContent === acceptMass[119] && advansInternalUma.classList.contains("active")) {
           document.getElementById('advansInternalUma').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           

           selectedOption = alertOptionsLang[activeAlertOptionLang].textContent.trim();
    
    // Управление видимостью группы элементов 
    const elementsToToggle = ['advansSurround', 'advansSurround2'];
    
    elementsToToggle.forEach(id => {
        const element = document.getElementById(id);
        if(element) {
            element.style.display = selectedOption === "Uma" ? "block" : "none";
            console.log(`${id} display: ${element.style.display}`); // Отладка
        }
    });
    updateActiveLine();
    
    const OnboardAuto = document.getElementById('advansInternalUma');
    if(OnboardAuto) {
      OnboardAuto.textContent = `[${selectedOption}]`;
      localStorage.setItem('advansPrimaryPcLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
    }
          }
          if (document.querySelector("#option1").textContent === acceptMass[120] && advansShare.classList.contains("active")) {
           document.getElementById('advansShareAut').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('advansShareLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if (document.querySelector("#option1").textContent === acceptMass[126]) {
           document.getElementById('advansRestorePower').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('advansRestoreLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if (document.querySelector("#option1").textContent === acceptMass[130] && advansRTCDate.classList.contains("active")) {
           document.getElementById('advansRTCDatechose').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('advansRTCDatechoLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if (document.querySelector("#option1").textContent === acceptMass[146] && advansSataOper.classList.contains("active")) {
           document.getElementById('advansSataAhci').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('advansSataAhLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if (document.querySelector("#option1").textContent === acceptMass[153] && (advansDMA.classList.contains("active") || advansDMA4.classList.contains("active")) ) {
          if(advansDMA.classList.contains("active")){
            document.getElementById('advansSmarEnab3').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('advanssEnab3Local', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if(advansDMA4.classList.contains("active")){
            document.getElementById('advansDmb4').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('advansDmb4Local', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          } 
          if (document.querySelector("#option1").textContent === acceptMass[166] && advansType4.classList.contains("active")) {
           document.getElementById('advansDisablPlug4').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('advansPlug4Local', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if (document.querySelector("#option1").textContent === acceptMass[170] && (advansLba4.classList.contains("active") || advansblocktran.classList.contains("active")) ) {
            if(advansLba4.classList.contains("active")){
           document.getElementById('advanslba_4').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('advanslba_4Local', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if(advansblocktran.classList.contains("active")){
           document.getElementById('advansBlocktransfer').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('advansBlocktrLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          }
          if (document.querySelector("#option1").textContent === acceptMass[172] && (advansPIO4.classList.contains("active") || advansPIO.classList.contains("active"))) {
           if(advansPIO4.classList.contains("active")){
           document.getElementById('advans2_2AUto4').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;

           document.getElementById('advansPioNum').textContent = `:${alertOptionsLang[activeAlertOptionLang].textContent}`;
           if(document.getElementById('advansPioNum').textContent === ":Auto"){
            document.getElementById('advansPioNum').textContent = ":4"
           }
           localStorage.setItem('advans2_2AUto4Local', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`)
           localStorage.setItem('advansPioNumLocal', document.getElementById('advansPioNum').textContent)
          }
          if(advansPIO.classList.contains("active")){
            document.getElementById('advans2_2AUto3').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;

            document.getElementById('advansPio3').textContent = `:${alertOptionsLang[activeAlertOptionLang].textContent}`;
           if(document.getElementById('advansPio3').textContent === ":Auto"){
            document.getElementById('advansPio3').textContent = ":4"
           } 
           localStorage.setItem('advans2_2AUto3Local', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`)
           localStorage.setItem('advansPio3Local', document.getElementById('advansPio3').textContent)
          }
          } 
          if (document.querySelector("#option1").textContent === acceptMass[171] && advansSmart4.classList.contains("active")) {
           document.getElementById('advansSmarDisab4').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('advansSmarDisab4Local', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          } 
          if (document.querySelector("#option1").textContent === acceptMass[173] && advansPCItim.classList.contains("active")) {
           document.getElementById('advanspcitim32').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('advanspcitim32Local', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`)
           if(document.getElementById('advanspcitim32').textContent === "[160]"){
            setTimeout(() => {
              toggleTaskStatus(9); 
              console.log('№10correct!');
              localStorage.setItem('num10correct', '10correct')
            }, 100);
           } 
          }
          if (document.querySelector("#option1").textContent === acceptMass[16] && advansIdepsiEn.classList.contains("active")) {
           document.getElementById('advansIdepsiEn').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('advansIdepsiLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if (document.querySelector("#option1").textContent === acceptMass[181] && (advansUsbcont.classList.contains("active") || advansUsb2_0.classList.contains("active") || advansKeyboaUsb.classList.contains("active") || advansMousePower.classList.contains("active") || fulllog.classList.contains("active") || hiddeAddon.classList.contains("active") || bootfrom.classList.contains("active") || caseopen.classList.contains("active") || otp.classList.contains("active"))) {
           if(advansUsbcont.classList.contains("active")){
            document.getElementById('advansUsbEnab').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;

            selectedOption = alertOptionsLang[activeAlertOptionLang].textContent.trim();
    
    // Управление видимостью группы элементов 
    const elementsToToggle = ['advansUsb2_0', 'advansUsb2_0Enab', 'advansUsbLegacy', 'advansLegacyEnab'];
    
    elementsToToggle.forEach(id => {
        const element = document.getElementById(id);
        if(element) {
            element.style.display = selectedOption === "Enabled" ? "flex" : "none";
            console.log(`${id} display: ${element.style.display}`); // Отладка
        }
    });

    updateActiveLine();
    
    
    const UsbEnab = document.getElementById('advansUsbEnab');
    if(UsbEnab) {
      UsbEnab.textContent = `[${selectedOption}]`;
      localStorage.setItem('advansUsbEnabLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`)
    } 
    setTimeout(() => {
      toggleTaskStatus(1); // 2 correct
      localStorage.setItem('num2correct', '2correct') 
      console.log('2correct!');
    }, 100);
           }
           if(advansUsb2_0.classList.contains("active")){
            document.getElementById('advansUsb2_0Enab').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('advansKeyboaLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
           setTimeout(() => {
            toggleTaskStatus(1); // 2 correct
            localStorage.setItem('num2correct', '2correct') 
            console.log('2correct!');
          }, 100);
           }
           if(advansKeyboaUsb.classList.contains("active")){
            document.getElementById('advansKeyboaDisabl').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('advansKeyboaLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
           setTimeout(() => {
            toggleTaskStatus(1); // 2 correct
            localStorage.setItem('num2correct', '2correct') 
            console.log('2correct!');
          }, 100);
           }
           if(caseopen.classList.contains("active")){
            document.getElementById('casedisab').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('hwmonitorcasedisabLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
           }
           if(advansMousePower.classList.contains("active")){
            document.getElementById('advansMouseDisabl').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('advansMouseDisabLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
           setTimeout(() => {
            toggleTaskStatus(1); // 2 correct
            localStorage.setItem('num2correct', '2correct') 
            console.log('2correct!');
          }, 100);
           } 
           if(otp.classList.contains("active")){
            document.getElementById('otpenabl').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('hwMonitorotpenablLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
           } 
           if(fulllog.classList.contains("active")) {
            document.getElementById('bootload_1').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;

            selectedOption = alertOptionsLang[activeAlertOptionLang].textContent.trim();
    
    // Управление видимостью группы элементов 
    const elementsToToggle = ['hiddeAddon'];
    
    elementsToToggle.forEach(id => {
        const element = document.getElementById(id);
        if(element) {
            element.style.display = selectedOption === "Enabled" ? "flex" : "none";
            console.log(`${id} display: ${element.style.display}`); // Отладка
        }
    });

    updateActiveLine();
    
    
    const UsbEnab = document.getElementById('bootload_1');
    if(UsbEnab) {
      UsbEnab.textContent = `[${selectedOption}]`;
      localStorage.setItem('bootload_1Local', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`)
    } 
           }
           if(hiddeAddon.classList.contains("active")){
            document.getElementById('bootload_hiddem').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
            localStorage.setItem('bootload_hiddemLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
           }
           if(bootfrom.classList.contains("active")){
            document.getElementById('bootload_2').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
            localStorage.setItem('bootload_2Local', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
           }
          }
          if (document.querySelector("#option1").textContent === acceptMass[183] && advansUsbLegacy.classList.contains("active")) {
           document.getElementById('advansLegacyEnab').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('advansLegacyLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if (document.querySelector("#option2").textContent === acceptMass[186] && boot1st.classList.contains("active")) { 
           document.getElementById('satatoshib_1').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('advanstoshib_1Local', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if (document.querySelector("#option1").textContent === acceptMass[187] && (stsat1.classList.contains("active") || ndsam2.classList.contains("active"))) {
            
            if(stsat1.classList.contains("active")){
              document.getElementById('satatoshib_2').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;

            if(document.getElementById('satatoshib_2').textContent === "[Disabled]"){
                document.getElementById('satatoshib_2').textContent = document.getElementById('satatoshib_3').textContent;
                document.getElementById('satatoshib_3').textContent = `[Disabled]`;
                blockdisabled = true;
                console.log(blockdisabled + ' blockdisb')
              }

              if(document.getElementById('satatoshib_2').textContent === "[AHCI:PO-Samsung SSD 860 EVO 250]"){
                if(document.getElementById('satatoshib_3').textContent === "[Disabled]"){
                document.getElementById('satatoshib_2').textContent = `[AHCI:PO-Samsung SSD 860 EVO 250]`;
                document.getElementById('satatoshib_3').textContent = `[Disabled]`
               blockdisabled = true;
              }
              }
              if(document.getElementById('satatoshib_2').textContent === `[SATA:PS-TOSHIBA DT01ACA100]`){
                if(document.getElementById('satatoshib_3').textContent === "[Disabled]"){
                document.getElementById('satatoshib_2').textContent = `[SATA:PS-TOSHIBA DT01ACA100]`;
                document.getElementById('satatoshib_3').textContent = `[Disabled]`
               blockdisabled = true;
              }
              }
            if((document.getElementById('satatoshib_2').textContent === "[SATA:PS-TOSHIBA DT01ACA100]" || document.getElementById('satatoshib_2').textContent === "[AHCI:PO-Samsung SSD 860 EVO 250]") && (document.getElementById('satatoshib_3').textContent === "[AHCI:PO-Samsung SSD 860 EVO 250]" || document.getElementById('satatoshib_3').textContent === "[SATA:PS-TOSHIBA DT01ACA100]")){
              blockdisabled = false;
              if(blockdisabled === false){
              if(document.getElementById('satatoshib_2').textContent === "[SATA:PS-TOSHIBA DT01ACA100]"){
                document.getElementById('satatoshib_3').textContent = `[AHCI:PO-Samsung SSD 860 EVO 250]`;
                console.log('stroka5353')
              }
              if(document.getElementById('satatoshib_2').textContent === "[AHCI:PO-Samsung SSD 860 EVO 250]"){
                document.getElementById('satatoshib_3').textContent = `[SATA:PS-TOSHIBA DT01ACA100]`;
                console.log('stroka5357')
              }
            }  
          }
              document.getElementById('satatoshib_1').textContent = document.getElementById('satatoshib_2').textContent;
              localStorage.setItem('advanstoshibLocal1', document.getElementById('satatoshib_1').textContent) 
              localStorage.setItem('advansatatoshib_2bLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`)
              setTimeout(() => {
                toggleTaskStatus(0); // 1 correct quest
                localStorage.setItem('num1correct', '1correct') 
                console.log('1correct');
              }, 100); 
            }
            if(ndsam2.classList.contains("active")){
              document.getElementById('satatoshib_3').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;  

              if(document.getElementById('satatoshib_3').textContent === "[AHCI:PO-Samsung SSD 860 EVO 250]"){
                if(document.getElementById('satatoshib_2').textContent === "[Disabled]"){
                document.getElementById('satatoshib_2').textContent = `[AHCI:PO-Samsung SSD 860 EVO 250]`;
                document.getElementById('satatoshib_3').textContent = `[Disabled]`
               blockdisabled_2 = true;
              }
              }
              if(document.getElementById('satatoshib_3').textContent === `[SATA:PS-TOSHIBA DT01ACA100]`){
                if(document.getElementById('satatoshib_2').textContent === "[Disabled]"){
                document.getElementById('satatoshib_2').textContent = `[SATA:PS-TOSHIBA DT01ACA100]`;
                document.getElementById('satatoshib_3').textContent = `[Disabled]`
               blockdisabled_2 = true;
              }
              }
              if(blockdisabled_2 === false){         
              if(document.getElementById('satatoshib_3').textContent === "[SATA:PS-TOSHIBA DT01ACA100]"){
                document.getElementById('satatoshib_2').textContent = `[AHCI:PO-Samsung SSD 860 EVO 250]`;
              }
              if(document.getElementById('satatoshib_3').textContent === "[AHCI:PO-Samsung SSD 860 EVO 250]"){
                document.getElementById('satatoshib_2').textContent = `[SATA:PS-TOSHIBA DT01ACA100]`;
              }
            } 
              document.getElementById('satatoshib_1').textContent = document.getElementById('satatoshib_2').textContent;
              localStorage.setItem('advanstoshibLocal', document.getElementById('satatoshib_1').textContent) 
              localStorage.setItem('advansatatoshib_3bLocal', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
            }

          }
          if (document.querySelector("#option1").textContent === acceptMass[189]) { 
           document.getElementById('bootload_3').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('bootload_3Local', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if (document.querySelector("#option1").textContent === acceptMass[191] && activeDisplay === 109) { 
           document.getElementById('cputraget_1').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;

           selectedOption = alertOptionsLang[activeAlertOptionLang].textContent.trim();
    
    // Управление видимостью группы элементов 
    const elementsToToggle = ['targetcpu', 'targetfan'];
    
    elementsToToggle.forEach(id => {
        const element = document.getElementById(id);
        if(element) {
            element.style.display = selectedOption === "Automatic mode" ? "flex" : "none";
            console.log(`${id} display: ${element.style.display}`); // Отладка
        }
    });

    updateActiveLine();
    
    
    const UsbEnab = document.getElementById('cputraget_1');
    if(UsbEnab) {
      UsbEnab.textContent = `[${selectedOption}]`;
      localStorage.setItem('monitortraget_1Local', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`)
    }  
    setTimeout(() => {
      toggleTaskStatus(3); // 4
      localStorage.setItem('num4correct', '4correct') 
      console.log('4correct');
    }, 100);    
          }
          if (document.querySelector("#option1").textContent === acceptMass[193] && (targetfan.classList.contains("active") || targetfan1.classList.contains("active") || targetfan2.classList.contains("active"))) {   
            if(targetfan.classList.contains("active")){
           document.getElementById('cputraget_3').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('cputraget_3Local', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`)
           setTimeout(() => {
            toggleTaskStatus(3); // 4
            localStorage.setItem('num4correct', '4correct') 
            console.log('4correct!');
          }, 100); 
          }
          if(targetfan1.classList.contains("active")){
           document.getElementById('cputraget_31').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
           localStorage.setItem('cputraget_31Local', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
          }
          if(targetfan2.classList.contains("active")){
            document.getElementById('cputraget_32').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
            localStorage.setItem('cputraget_32Local', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`) 
           }
          }
          


          if (document.querySelector("#option1").textContent === acceptMass[191] && activeDisplay === 112) { 


           document.getElementById('cputraget_11').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;

           selectedOption = alertOptionsLang[activeAlertOptionLang].textContent.trim();
    
    // Управление видимостью группы элементов 
    const elementsToToggle = ['targetcpu1', 'targetfan1'];
    
    elementsToToggle.forEach(id => {
        const element = document.getElementById(id);
        if(element) {
            element.style.display = selectedOption === "Automatic mode" ? "flex" : "none";
            max3elem = selectedOption === "Automatic mode" ? false : true;
            max2elem = selectedOption === "Manual" ? false : true;
            max1elem = selectedOption === "Full On" ? false : true;
            console.log(max2elem + ' UPP')
            console.log(max1elem + ' UPPdaym')
            
            console.log(`${id}`); // Отладка
            console.log(max3elem); // Отладка

        }
    });

    elementsToToggle.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (selectedOption === "Manual") {
                element.style.display = id === "targetfan1" ? "flex" : "none";
                max2elem = selectedOption === "Manual" ? false : true;
                console.log(max2elem + ' DoWN')
            }
            console.log(`${id} `); // Отладка
        }
    });

    

    updateActiveLine();
    
    
    const UsbEnab = document.getElementById('cputraget_11');
    if(UsbEnab) {
      UsbEnab.textContent = `[${selectedOption}]`;
      localStorage.setItem('monitortraget_11Local', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`)
    }      
          }


          if (document.querySelector("#option1").textContent === acceptMass[191] && activeDisplay === 112) { 


           document.getElementById('cputraget_11').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;

           selectedOption = alertOptionsLang[activeAlertOptionLang].textContent.trim();
    
    // Управление видимостью группы элементов 
    const elementsToToggle = ['targetcpu1', 'targetfan1'];
    
    elementsToToggle.forEach(id => {
        const element = document.getElementById(id);
        if(element) {
            element.style.display = selectedOption === "Automatic mode" ? "flex" : "none";
            max3elem = selectedOption === "Automatic mode" ? false : true;
            max2elem = selectedOption === "Manual" ? false : true;
            max1elem = selectedOption === "Full On" ? false : true;
            console.log(max2elem + ' UPP')
            console.log(max1elem + ' UPPdaym')
            
            console.log(`${id}`); // Отладка
            console.log(max3elem); // Отладка

        }
    });

    elementsToToggle.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (selectedOption === "Manual") {
                element.style.display = id === "targetfan1" ? "flex" : "none";
                max2elem = selectedOption === "Manual" ? false : true;
                console.log(max2elem + ' DoWN')
            }
            console.log(`${id} `); // Отладка
        }
    });

    

    updateActiveLine();
    const UsbEnab = document.getElementById('cputraget_11');
    if(UsbEnab) {
      UsbEnab.textContent = `[${selectedOption}]`;
      localStorage.setItem('monitortraget_11Local', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`)
    }      
          }


          if (document.querySelector("#option1").textContent === acceptMass[191] && activeDisplay === 115) { 
            document.getElementById('cputraget_12').textContent = `[${alertOptionsLang[activeAlertOptionLang].textContent}]`;
            selectedOption = alertOptionsLang[activeAlertOptionLang].textContent.trim();
     // Управление видимостью группы элементов 
     const elementsToToggle = ['targetcpu2', 'targetfan2'];
     elementsToToggle.forEach(id => {
         const element = document.getElementById(id);
         if(element) {
             element.style.display = selectedOption === "Automatic mode" ? "flex" : "none";
             max3elem1 = selectedOption === "Automatic mode" ? false : true;
             max2elem1 = selectedOption === "Manual" ? false : true;
             max1elem1 = selectedOption === "Full On" ? false : true;
             console.log(max2elem1 + ' UPP')
             console.log(max1elem1 + ' UPPdaym')
             
             console.log(`${id}`); // Отладка
             console.log(max3elem1); // Отладка
 
         }
     });
     elementsToToggle.forEach(id => {
         const element = document.getElementById(id);
         if (element) {
             if (selectedOption === "Manual") {
                 element.style.display = id === "targetfan2" ? "flex" : "none";
                 max2elem1 = selectedOption === "Manual" ? false : true;
                 console.log(max2elem1 + ' DoWN')
             }
             console.log(`${id} `); // Отладка
         }
     });
     updateActiveLine();
     const UsbEnab = document.getElementById('cputraget_12');
     if(UsbEnab) {
       UsbEnab.textContent = `[${selectedOption}]`;
       localStorage.setItem('monitortraget_12Local', `[${alertOptionsLang[activeAlertOptionLang].textContent}]`)
     }      
           }


            closeAlertWindowLang();
            setTimeout(() => {
              blockMenu = false; 
              console.log(blockMenu + ' close')
    }, 5);

            
            break;
          case "Escape":
            // Закрываем окно без сохранения
            closeAlertWindowLang();
            setTimeout(() => {
              blockMenu = false; 
              console.log(blockMenu + ' Esc_close')
    }, 5);
            
            
            break;
          case "Shift":
            // Закрываем окно без сохранения
            
            break;
        }
      } else if (sataAlertElement.style.display === "block") {
        // Если окно sata_alert открыто, работаем только с ним
        switch (event.key) {
          case "ArrowUp":
            navigateSataAlert(-1); // Перемещаемся вверх
            break;
          case "ArrowDown":
            navigateSataAlert(1); // Перемещаемся вниз
            break;
          case "Enter":
            applySataAlertOption(); // Применяем выбранный пункт
            updateActiveLine();
            break;
          case "Escape":
            closeSataAlert(); // Закрываем окно без сохранения
    
            break;
        }
      }

      // Логика для возврата при нажатии Esc
      if (activeMenuItemIndex === 1 && event.key === "Escape" && confirmalerm === false && generalHelpActive === false) {
        {

          // Возвращаем элементы
          powerr.style.display = "block";
          boott.style.display = "block";
          toolss.style.display = "block";
          exitt.style.display = "block";
          advans.style.display = "block";
          octweak.style.display = "block";
          document.querySelector('.sata_configr').style.display = 'none';
          // Разблокируем переключение
          isSataConfigActive = false;
          isSystemInformActive = false;
          closeSataAlert(); // Закрываем окно после выбора
          // Устанавливаем активный элемент на systemTimeElement и hoursPart
          if(Number(localStorage.getItem('actdisExit')) > 27){
            activeDisplay = 2
          } else {
          activeDisplay = Number(localStorage.getItem('actdisExit')) // Перемикаємося
        }
          closeAlertWindowLang();
          updateActiveLine(); // Оновлюємо підсвічування
          setTimeout(() => {
            localStorage.setItem('actdisExit', 2)
          }, 5);
          if(Number(localStorage.getItem('actdisExit')) === 2){
            scrollIndex = 0
            scrollBoth()
          }
        }
      }
      if ((StorageSata2_2.style.display === "flex" || StorageSata2_22.style.display === "flex" || StorageSata2_23.style.display === "flex" || StorageSata2_24.style.display === "flex") && event.key === "Escape" && blockMenu === false && generalHelpActive === false) {     
        {
          in_subject = false;
          document.getElementById('advanshead').innerHTML = "Storage Configuration"
          document.getElementById('advancpuopen').style.display = "flex"
          document.getElementById('StorageConf').style.display = "flex"
          activeDisplay = 58;
          document.getElementById('StorageSata2_2').style.display = "none"
          document.getElementById('StorageSata2_22').style.display = "none"
          document.getElementById('StorageSata2_23').style.display = "none"
          document.getElementById('StorageSata2_24').style.display = "none"
          if(Number(localStorage.getItem('actdisExit')) > 64){
            activeDisplay = 58
          } else {
          activeDisplay = Number(localStorage.getItem('actdisExit')) // Перемикаємося
        }
          closeAlertWindowLang();
          updateActiveLine(); // Оновлюємо підсвічування  
        }
        setTimeout(() => {
          in_subject = true;
          sataAdvanc2_22 = false;    
          sataAdvanc2_2 = false;   
    }, 5);
    localStorage.setItem('actdisExit', 32)
      }
    if ((blockMenu === false && in_subject === true) && activeMenuItemIndex === 2 && event.key === "Escape" && generalHelpActive === false) {
        {
       //   AdvancedBlock1 = false;
          console.log(AdvancedBlock1)
          // Повертаємо елементи
          document.querySelector('.advancedslot').style.display = 'block';
          rightleftBlock = false;
          // Розблокуємо перемикання
          AdvancedSetBlock = false;
          AcpiConfiggBlock = false;
          StorageConfiggBlock = false;
          CPUConfBlock === false;
          isSataConfigActive = false;
          isSystemInformActive = false;


          if(Number(localStorage.getItem('actdisExit')) > 34){
            activeDisplay = 29
          } else {
          activeDisplay = Number(localStorage.getItem('actdisExit')) // Перемикаємося
        }

          advansQuiet.style.display = "none"
          advansCpuconf.style.display = "block";
          advansChipconf.style.display = "block";
          advansAcpicon.style.display = "block";
          advansStor.style.display = "block";
          advansPci.style.display = "block";
          advansUsb.style.display = "block";
          advansInstanflash.style.display = "block";
          document.getElementById('warnadvanc').style.display = "block";
          document.getElementById('biosadvans').style.display = "block";
          document.getElementById('underlinadv').style.display = "block";
          document.getElementById('advanshead').innerHTML = "Advanced Settings"
          powerr.style.display = "block";
          boott.style.display = "block";
          toolss.style.display = "block";
          exitt.style.display = "block";
          octweak.style.display = "block";
          document.getElementById('mainmenu').style.display = "block";
          advans.style.display = "block";
          advans.style.position = "";
advansQuiet.style.display = "none" 
document.getElementById('advansQuiet1').style.display = "none";
document.getElementById('advansQuiet2').style.display = "none";
document.getElementById('advansQuiet3').style.display = "none";
document.getElementById('advancpuopen').style.display = "none";
advansEnha.style.display = "none";
advansThrot.style.display = "none";
document.getElementById('advansThrotpar').style.display = "none";
          closeAlertWindowLang();
          updateActiveLine(); // Оновлюємо підсвічування
          localStorage.setItem('actdisExit', 29)
        } 
      }

      if (blockMenu === false && activeMenuItemIndex === 3 && event.key === "Escape" && confirmalerm === false && generalHelpActive === false) {

        activeDisplay = Number(localStorage.getItem('actdisExit'));
        cpuFan = false; // запрещает переключение 
        cpuFan1 = false; // запрещает переключение 
        cpuFan2 = false; // запрещает переключение 
        rightleftBlock = false;
        HardDiskDriveact = false;
  mainmenu.style.display = "block";
  powerr.style.display = "block";
  toolss.style.display = "block";
  exitt.style.display = "block";
  advans.style.display = "block";
  octweak.style.display = "block";
  boott.style.display = "block";
  powerr.style.position = "";
  document.getElementById('systeninff').style.display = "block";
  document.getElementById('otpenb').style.display = "flex"
  document.getElementById('otpenb1').style.display = "flex"
  document.getElementById('otpenb2').style.display = "flex"
  document.getElementById('otp').style.display = "flex"
  document.getElementById('caseopen').style.display = "flex"

  document.getElementById('boot1st').style.display = "flex";
  document.getElementById('bootHardDisk').style.display = "flex";
  document.getElementById('advanshead45').innerHTML = "Hardware Health Event Monitoring"
  document.getElementById('cpufansettin').style.display = "none"
  document.getElementById('cpufansettin1').style.display = "none"
  document.getElementById('cpufansettin2').style.display = "none"
  localStorage.setItem('actdisExit', 87)
  updateActiveLine(); // Оновлюємо підсвічування
      }

      if (blockMenu === false && activeMenuItemIndex === 4 && event.key === "Escape" && confirmalerm === false && generalHelpActive === false) {
        activeDisplay = Number(92);
        rightleftBlock = false;
        HardDiskDriveact = false;
        bootsetting = false;
        bootsetting2 = false;
  mainmenu.style.display = "block";
  powerr.style.display = "block";
  toolss.style.display = "block";
  exitt.style.display = "block";
  advans.style.display = "block";
  octweak.style.display = "block";
  boott.style.position = "";
  document.getElementById('bootSett').style.display = "flex";
  document.getElementById('boot1st').style.display = "flex";
  document.getElementById('bootHardDisk').style.display = "flex";
  document.getElementById('advanshead453').innerHTML = "Boot Settings"
  document.getElementById('harddiskdriv').style.display = "none"
  document.getElementById('bootconfig1').style.display = "none"
  localStorage.setItem('actdisExit', 94)
  updateActiveLine(); // Оновлюємо підсвічування
      }
    });
    
  // Обработчик событий клавиатуры
document.addEventListener('keydown', (event) => {
  if(rightleftBlock === false){
  if (event.key === 'ArrowLeft') {
          CPUConfBlock = false;
          AdvancedSetBlock = false;
          AcpiConfiggBlock = false;
          StorageConfiggBlock = false;
          powerr.style.display = "block";
          boott.style.display = "block";
          toolss.style.display = "block";
          exitt.style.display = "block";
          octweak.style.display = "block";
          document.getElementById('mainmenu').style.display = "block";
          advans.style.display = "block";
          advans.style.position = "";
    switchMenuItem(-1); // Переключение влево
    closeAlertWindowLang();
    if (activeMenuItemIndex === 0) {
      activeDisplay = 0;
      updateActiveLine();
    } if (activeMenuItemIndex === 1) {
      activeDisplay = 2;
      updateActiveLine();
    }
    if (activeMenuItemIndex === 2) {
      activeDisplay = 29;
      updateActiveLine();
    }
    if (activeMenuItemIndex === 3) {
      activeDisplay = 87;
      updateActiveLine();
    }
    if (activeMenuItemIndex === 4) {
      activeDisplay = 92;
      updateActiveLine();
    }
    if (activeMenuItemIndex === 5) {
      activeDisplay = 95;
      updateActiveLine();
    }
    if (activeMenuItemIndex === 6) {
      activeDisplay = 97;
      updateActiveLine();
    }
    closeAlertWindow();
  } else if (event.key === 'ArrowRight') {
          AdvancedSetBlock = false;
          CPUConfBlock = false;
          AcpiConfiggBlock = false;
          StorageConfiggBlock = false;
          powerr.style.display = "block";
          boott.style.display = "block";
          toolss.style.display = "block";
          exitt.style.display = "block";
          octweak.style.display = "block";
          document.getElementById('mainmenu').style.display = "block";
          advans.style.display = "block";
          advans.style.position = "";
    switchMenuItem(1); // Переключение вправо
    closeAlertWindowLang();
    if (activeMenuItemIndex === 0) {
      activeDisplay = 0;
      updateActiveLine();
    } if (activeMenuItemIndex === 1) {
      activeDisplay = 2;
      updateActiveLine();
    } if (activeMenuItemIndex === 2) {
      activeDisplay = 29;
      updateActiveLine();
    }
    if (activeMenuItemIndex === 3) {
      activeDisplay = 87;
      updateActiveLine();
    }
    if (activeMenuItemIndex === 4) {
      activeDisplay = 92;
      updateActiveLine();
    }
    if (activeMenuItemIndex === 5) {
      activeDisplay = 95;
      updateActiveLine();
    }
    if (activeMenuItemIndex === 6) {
      activeDisplay = 97;
      updateActiveLine();
    }
    closeAlertWindow();
  }
}
})

  }



  // Функция для управления окном выбора (язык)
  function setupAlertWindowLang() {
    alertOptionsLang = document.querySelectorAll(".alerttext_1 div"); // Элементы внутри окна выбора языка
    activeAlertOptionLang = 0; // Индекс активного элемента в окне выбора языка

    // Функция для открытия окна выбора языка
    window.openAlertWindowLang = function() {
      updateBoot(2, 3);
      alertElementLang.classList.remove("hidden"); // Показываем окно
      activeAlertOptionLang = 0; // Сбрасываем активный элемент на первый
      alertOptionsLang[activeAlertOptionLang].classList.add("active"); // Подсвечиваем первый элемент
    };

    // Функция для закрытия окна выбора языка
    window.closeAlertWindowLang = function() {
      alertElementLang.classList.add("hidden"); // Скрываем окно
      alertOptionsLang.forEach(option => option.classList.remove("active")); // Убираем подсветку со всех элементов
    };

    // Функция для перемещения между элементами в окне выбора языка
    window.navigateAlertWindowLang = function(direction) {
      alertOptionsLang[activeAlertOptionLang].classList.remove("active"); // Убираем подсветку с текущего элемента
      activeAlertOptionLang = (activeAlertOptionLang + direction + alertOptionsLang.length) % alertOptionsLang.length; // Обновляем индекс
            if (document.querySelector("#option1").textContent === acceptMass[20, 21] ) { /// Boot Failure Guard
              if(activeAlertOptionLang >= 2){
                activeAlertOptionLang = 0
              }
            } 
            if (document.querySelector("#option1").textContent === acceptMass[7]) { /// Boot Failure Guard Count
              if(activeAlertOptionLang >= 3){
                activeAlertOptionLang = 0
              }
            }
            if (document.querySelector("#option1").textContent === acceptMass[1, 2]) { /// Spread Spectrum
              if(activeAlertOptionLang >= 2){
                activeAlertOptionLang = 0
              }
          }
          if (document.querySelector("#option1").textContent === acceptMass[15] ) { /// Spread Spectrum
              if(activeAlertOptionLang >= 3){
                activeAlertOptionLang = 0
              }
          }
          if (document.querySelector("#option1").textContent === acceptMass[18]) { /// Spread Spectrum
              if(activeAlertOptionLang >= 2){
                activeAlertOptionLang = 0
              }
          }
          if (document.querySelector("#option1").textContent === acceptMass[22] && amdApm.classList.contains("active")) { /// Spread Spectrum
              if(activeAlertOptionLang >= 3){
                activeAlertOptionLang = 0 
              }
          }
          if (document.querySelector("#option1").textContent === acceptMass[25] && !advansDMA.classList.contains("active") && !advansDMA4.classList.contains("active") && !advansSmart4.classList.contains("active")) { /// Spread Spectrum //////////////////////////////
              if(activeAlertOptionLang >= 2){
                activeAlertOptionLang = 0
              }
          }
          if (document.querySelector("#option1").textContent === acceptMass[126]) { /// PowerOn
              if(activeAlertOptionLang >= 2){
                activeAlertOptionLang = 0
              }
          }
          if (document.querySelector("#option1").textContent === acceptMass[27]) { /// Spread Spectrum
              if(activeAlertOptionLang >= 11){     
                activeAlertOptionLang = 11
              }
          }
          if (document.querySelector("#option1").textContent === acceptMass[70]) { /// Spread Spectrum
              if(activeAlertOptionLang >= 3){     
                activeAlertOptionLang = 0
              }
          }
          if (document.querySelector("#option1").textContent === acceptMass[73]) { /// Spread Spectrum
              if(activeAlertOptionLang >= 6){     
                activeAlertOptionLang = 0
              }
              
          }
          if (document.querySelector("#option1").textContent === acceptMass[79]) { /// Spread Spectrum
              if(activeAlertOptionLang >= 1){     
                activeAlertOptionLang = 0
              }
              
          }
          if (document.querySelector("#option1").textContent === acceptMass[46]) { /// Spread Spectrum
              if(activeAlertOptionLang >= 7){     
                activeAlertOptionLang = 0
              }   
          }
          if (document.querySelector("#option1").textContent === acceptMass[91]) { /// Spread Spectrum
              if(activeAlertOptionLang >= 1){     
                activeAlertOptionLang = 0
              }
          }
          if (document.querySelector("#option1").textContent === acceptMass[100]) { /// Spread Spectrum
              if(activeAlertOptionLang >= 5){     
                activeAlertOptionLang = 0
              }
              
          }
          if (document.querySelector("#option1").textContent === acceptMass[104]) { /// Spread Spectrum
              if(activeAlertOptionLang >= 3){     
                activeAlertOptionLang = 0
              }
              
          }
          if (document.querySelector("#option1").textContent === acceptMass[22] && advansThrot.classList.contains("active")) { /// CPU Thermal Throttle
              if(activeAlertOptionLang >= 8){     
                activeAlertOptionLang = 0
              }
              
          }
          if (document.querySelector("#option1").textContent === acceptMass[22] && advansOnboard.classList.contains("active")) { /// Spread Spectrum
              if(activeAlertOptionLang >= 3){     
                activeAlertOptionLang = 0
              }
              
          }
          if (document.querySelector("#option1").textContent === acceptMass[113] && advansFront.classList.contains("active")) { /// Spread Spectrum
              if(activeAlertOptionLang >= 2){     
                activeAlertOptionLang = 0
              }
              
          }
          if (document.querySelector("#option1").textContent === acceptMass[186] && advansOnboardAuto.classList.contains("active")) { /// Spread Spectrum
              if(activeAlertOptionLang >= 3){     
                activeAlertOptionLang = 0
              } 
          }
          if (document.querySelector("#option1").textContent === acceptMass[116] && advansPrimary.classList.contains("active")) { /// Spread Spectrum
              if(activeAlertOptionLang >= 3){     
                activeAlertOptionLang = 0
              } 
          }
          if (document.querySelector("#option1").textContent === acceptMass[119] && advansInternalUma.classList.contains("active")) { /// Spread Spectrum
              if(activeAlertOptionLang >= 2){     
                activeAlertOptionLang = 0
              } 
          }
          if (document.querySelector("#option1").textContent === acceptMass[120] && advansShare.classList.contains("active")) { /// Spread Spectrum
              if(activeAlertOptionLang >= 7){     
                activeAlertOptionLang = 0
              } 
          }
          if (document.querySelector("#option1").textContent === acceptMass[22] && advansRTC.classList.contains("active")) { /// BYOS
              if(activeAlertOptionLang >= 3){     
                activeAlertOptionLang = 0
              }
              
          }
          if (document.querySelector("#option1").textContent === acceptMass[146] && advansSataOper.classList.contains("active")) { /// BYOS
              if(activeAlertOptionLang >= 3){     
                activeAlertOptionLang = 0
              }
              
          }
          if (document.querySelector("#option1").textContent === acceptMass[150] && advansSataOper.classList.contains("active")) { /// TYPE
              if(activeAlertOptionLang >= 4){     
                activeAlertOptionLang = 0
              }
              
          }
          if (document.querySelector("#option1").textContent === acceptMass[153] && advansDMA.classList.contains("active")) { /// TYPE
              if(activeAlertOptionLang >= 13){     
                activeAlertOptionLang = 0
              }
              
          }
          if (document.querySelector("#option1").textContent === acceptMass[170] !== advansThrotpar.classList.contains("active") && !advansOnboard.classList.contains("active")) { /// TYPE //////////////////
              if(activeAlertOptionLang >= 2){     
                activeAlertOptionLang = 0
              } 
          }
          if (document.querySelector("#option1").textContent === acceptMass[170] && advansOnboard.classList.contains("active") ) { /// TYPE //////////////////
            if(activeAlertOptionLang >= 3){     
              activeAlertOptionLang = 0
            } 
        }
          if (document.querySelector("#option1").textContent === acceptMass[170] && advansThrotpar.classList.contains("active")) { /// TYPE //////////////////
            if(activeAlertOptionLang >= 9){     
              activeAlertOptionLang = 0
            } 
        }
          if (document.querySelector("#option2").textContent === acceptMass[154]) { /// TYPE
              if(activeAlertOptionLang >= 13){     
                activeAlertOptionLang = 0
              }
              
          }
          if (document.querySelector("#option1").textContent === acceptMass[173]) { /// TYPE
              if(activeAlertOptionLang >= 8){     
                activeAlertOptionLang = 0
              }
              
          }
          if (document.querySelector("#option1").textContent === acceptMass[16] && advansIdepsiEn.classList.contains("active")) { /// TYPE
              if(activeAlertOptionLang >= 2){     
                activeAlertOptionLang = 0
              }
              
          }
          if (document.querySelector("#option1").textContent === acceptMass[181]) { /// TYPE
              if(activeAlertOptionLang >= 200){     
                activeAlertOptionLang = 0
              }
              
          }
          if (document.querySelector("#option1").textContent === acceptMass[185]) { /// Boot
              if(activeAlertOptionLang >= 200){     
                activeAlertOptionLang = 0
              } 
          }
          if (document.querySelector("#option2").textContent === acceptMass[186]) { /// Boot toshib
            if(activeAlertOptionLang >= 200){     
              activeAlertOptionLang = 0
            } 
        }
        if (document.querySelector("#option1").textContent === acceptMass[187]) { /// Boot toshib
          if(activeAlertOptionLang >= 300){     
            activeAlertOptionLang = 0
          } 
      }
      if (document.querySelector("#option2").textContent === acceptMass[188]) { /// Boot toshib
        if(activeAlertOptionLang >= 300){     
          activeAlertOptionLang = 0
        } 
    }
    if (document.querySelector("#option1").textContent === acceptMass[189] && bootnum.classList.contains("active")) { /// Bootnumlock
      if(activeAlertOptionLang >= 200){     
        activeAlertOptionLang = 0
      } 
  }
  if (document.querySelector("#option1").textContent === acceptMass[191] ) { /// cpufan
    if(activeAlertOptionLang >= 300){     
      activeAlertOptionLang = 0
    } 
}
if (document.querySelector("#option1").textContent === acceptMass[191] && spufan.classList.contains("active")) { /// cpufan
  if(activeAlertOptionLang >= 200){     
    activeAlertOptionLang = 0
  } 
}
if (document.querySelector("#option1").textContent === acceptMass[193] ) { /// Target Fan Speed
  if(activeAlertOptionLang >= 9){     
    activeAlertOptionLang = 0
  } 
}
          if (document.querySelector("#option1").textContent === acceptMass[114] && advansFront.classList.contains("active")) { /// Front Panel
            if(activeAlertOptionLang >= 2){   
                activeAlertOptionLang = 0
              }
              
          }


      alertOptionsLang[activeAlertOptionLang].classList.add("active"); // Подсвечиваем новый элемент

      console.log(activeAlertOptionLang + ": activeAlertOptionLang")
      // Прокручування обраного елемента в область видимості
alertOptionsLang[activeAlertOptionLang].scrollIntoView({
 
  block: "nearest"
});
    };
  }


  function updateBoot(index1, index2, index3, index4, index5, index6, index7, index8, index9, index10, index11, index12, index13, index14, index15, index16){
  const alertDivs = document.querySelectorAll(".alerttext_1 div"); // Находим все div внутри .alerttext_1
  

    // Обновляем текст каждого элемента по переданным индексам
    alertDivs[0].textContent = acceptMass[index1]  // 1 элемент
    alertDivs[1].textContent = acceptMass[index2]  // 2 элемент
    alertDivs[2].textContent = acceptMass[index3]  // 3 элемент
    alertDivs[3].textContent = acceptMass[index4]  // 4 элемент
    alertDivs[4].textContent = acceptMass[index5]  // 5 элемент
    alertDivs[5].textContent = acceptMass[index6]  // 6 элемент
    alertDivs[6].textContent = acceptMass[index7]  // 7 элемент
    alertDivs[7].textContent = acceptMass[index8]  // 8 элемент
    alertDivs[8].textContent = acceptMass[index9]  // 9 элемент
    alertDivs[9].textContent = acceptMass[index10]  // 10 элемент
    alertDivs[10].textContent = acceptMass[index11]  // 11 элемент
    alertDivs[11].textContent = acceptMass[index12]  // 12 элемент
    alertDivs[12].textContent = acceptMass[index13]  // 13 элемент
    alertDivs[13].textContent = acceptMass[index14]  // 14 элемент
    alertDivs[14].textContent = acceptMass[index15]  // 15 элемент
    alertDivs[15].textContent = acceptMass[index16]  // 16 элемент
}
// Функция для управления окном выбора (1, 2, 3)
function setupOpenBoot_1() {
  updateBoot(7, 8, 9);
    alertOptionsLang = document.querySelectorAll(".alerttext_1 div"); // Элементы внутри окна выбора языка
    activeAlertOptionLang = 0; 
    // Функция для открытия окна выбора языка
    window.openSetupOpenBoot_1 = function() {
      alertElementLang.classList.remove("hidden"); // Показываем окно
      activeAlertOptionLang = 0; // Сбрасываем активный элемент на первый
      setupOpenBoot_1();
      var wewrw = document.getElementById("option1")
      wewrw.classList.add("active"); // Подсвечиваем первый элемент
    };

    // Функция для закрытия окна выбора языка
    window.closeSetupOpenBoot = function() {
      alertElementLang.classList.add("hidden"); // Скрываем окно
      alertOptionsLang.forEach(option => option.classList.remove("active")); // Убираем подсветку со всех элементов
    };

    // Функция для перемещения между элементами в окне выбора языка
    window.navigateSetupOpenBoot = function(direction) {
      alertOptionsLang[activeAlertOptionLang].classList.remove("active"); // Убираем подсветку с текущего элемента
      activeAlertOptionLang = (activeAlertOptionLang + direction + alertOptionsLang.length) % alertOptionsLang.length; // Обновляем индекс
      alertOptionsLang[activeAlertOptionLang].classList.add("active"); // Подсвечиваем новый элемент
    };
  }  

// Функция для управления окном выбора (язык)

function setupOpenBoot_2() {
    updateBoot(10, 11, 12, 13, 14);
    alertOptionsLang = document.querySelectorAll(".alerttext_1 div"); // Элементы внутри окна выбора языка
    activeAlertOptionLang = 0; 
    // Функция для открытия окна выбора языка
    window.openSetupOpenBoot_2 = function() {
      alertElementLang.classList.remove("hidden"); // Показываем окно
      activeAlertOptionLang = 0; // Сбрасываем активный элемент на первый
      setupOpenBoot_2();
      var wewrw = document.getElementById("option1")
      wewrw.classList.add("active"); // Подсвечиваем первый элемент
      
    }
  };
function setupOpenBoot() {
    updateBoot(20, 21);
    alertOptionsLang = document.querySelectorAll(".alerttext_1 div"); // Элементы внутри окна выбора языка
    activeAlertOptionLang = 0; 
    // Функция для открытия окна выбора языка
    window.openSetupOpenBoot = function() {
      alertElementLang.classList.remove("hidden"); // Показываем окно
      activeAlertOptionLang = 0; // Сбрасываем активный элемент на первый
      setupOpenBoot();
      var wewrw = document.getElementById("option1")
      wewrw.classList.add("active"); // Подсвечиваем первый элемент
    };

    // Функция для закрытия окна выбора языка
    window.closeSetupOpenBoot = function() {
      alertElementLang.classList.add("hidden"); // Скрываем окно
      alertOptionsLang.forEach(option => option.classList.remove("active")); // Убираем подсветку со всех элементов
    };

    // Функция для перемещения между элементами в окне выбора языка
    window.navigateSetupOpenBoot = function(direction) {
      alertOptionsLang[activeAlertOptionLang].classList.remove("active"); // Убираем подсветку с текущего элемента
      activeAlertOptionLang = (activeAlertOptionLang + direction + alertOptionsLang.length) % alertOptionsLang.length; // Обновляем индекс
      alertOptionsLang[activeAlertOptionLang].classList.add("active"); // Подсвечиваем новый элемент
    };
  }  

  function setupOpenBoot_3() {
    updateBoot(15, 16, 17);
    alertOptionsLang = document.querySelectorAll(".alerttext_1 div"); // Элементы внутри окна выбора языка
    activeAlertOptionLang = 0; 
    // Функция для открытия окна выбора языка
    window.openSetupOpenBoot_3 = function() {
      alertElementLang.classList.remove("hidden"); // Показываем окно
      activeAlertOptionLang = 0; // Сбрасываем активный элемент на первый
      setupOpenBoot_3();
      var wewrw = document.getElementById("option1")
      wewrw.classList.add("active"); // Подсвечиваем первый элемент
      
    }
  };

  function setupOpenBoot_4() {
    updateBoot(18, 19);
    alertOptionsLang = document.querySelectorAll(".alerttext_1 div"); // Элементы внутри окна выбора языка
    activeAlertOptionLang = 0; 
    // Функция для открытия окна выбора языка
    window.openSetupOpenBoot_4 = function() {
      alertElementLang.classList.remove("hidden"); // Показываем окно
      activeAlertOptionLang = 0; // Сбрасываем активный элемент на первый
      setupOpenBoot_4();
      var wewrw = document.getElementById("option1")
      wewrw.classList.add("active"); // Подсвечиваем первый элемент

      
      
    }
  };
  function setupOpenBoot_5() {
    updateBoot(22, 23, 24);
    alertOptionsLang = document.querySelectorAll(".alerttext_1 div"); // Элементы внутри окна выбора языка
    activeAlertOptionLang = 0; 
    // Функция для открытия окна выбора языка
    window.openSetupOpenBoot_5 = function() {
      alertElementLang.classList.remove("hidden"); // Показываем окно
      activeAlertOptionLang = 0; // Сбрасываем активный элемент на первый
      setupOpenBoot_5();
      var wewrw = document.getElementById("option1")
      wewrw.classList.add("active"); // Подсвечиваем первый элемент
      
    }
  };
  function setupOpenBoot_6() {
    updateBoot(25, 26);
    alertOptionsLang = document.querySelectorAll(".alerttext_1 div"); // Элементы внутри окна выбора языка
    activeAlertOptionLang = 0; 
    // Функция для открытия окна выбора языка
    window.openSetupOpenBoot_6 = function() {
      alertElementLang.classList.remove("hidden"); // Показываем окно
      activeAlertOptionLang = 0; // Сбрасываем активный элемент на первый
      setupOpenBoot_6();
      var wewrw = document.getElementById("option1")
      wewrw.classList.add("active"); // Подсвечиваем первый элемент
      
    }
  };
  function setupOpenBoot_7() {
    updateBoot(27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38);
    alertOptionsLang = document.querySelectorAll(".alerttext_1 div"); // Элементы внутри окна выбора языка
    activeAlertOptionLang = 0; 
    // Функция для открытия окна выбора языка
    window.openSetupOpenBoot_7 = function() {
      alertElementLang.classList.remove("hidden"); // Показываем окно
      activeAlertOptionLang = 0; // Сбрасываем активный элемент на первый
      setupOpenBoot_7();
      var wewrw = document.getElementById("option1")
      wewrw.classList.add("active"); // Подсвечиваем первый элемент
      
    }
  };
  function setupOpenBoot_8() {
    updateBoot(39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53);
    alertOptionsLang = document.querySelectorAll(".alerttext_1 div"); // Элементы внутри окна выбора языка
    activeAlertOptionLang = 0; 
    // Функция для открытия окна выбора языка
    window.openSetupOpenBoot_8 = function() {
      alertElementLang.classList.remove("hidden"); // Показываем окно
      activeAlertOptionLang = 0; // Сбрасываем активный элемент на первый
      setupOpenBoot_8();
      var wewrw = document.getElementById("option1")
      wewrw.classList.add("active"); // Подсвечиваем первый элемент
      
    }
  };

  function setupOpenBoot_9() {
    updateBoot(54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69);
    alertOptionsLang = document.querySelectorAll(".alerttext_1 div"); // Элементы внутри окна выбора языка
    activeAlertOptionLang = 0; 
    // Функция для открытия окна выбора языка
    window.openSetupOpenBoot_9 = function() {
      alertElementLang.classList.remove("hidden"); // Показываем окно
      activeAlertOptionLang = 0; // Сбрасываем активный элемент на первый
      setupOpenBoot_9();
      var wewrw = document.getElementById("option1")
      wewrw.classList.add("active"); // Подсвечиваем первый элемент
      
    }
  };

  function setupOpenBoot_10() {
    blockMenu = true; /// якщо відкрито вікно вибору, блокуємо натискання esc на головний екран
    alertOptionsLang = document.querySelectorAll(".alerttext_1 div"); // Элементы внутри окна выбора языка
    activeAlertOptionLang = 0; 
    // Функция для открытия окна выбора языка
    window.openSetupOpenBoot_10 = function() {
      blockMenu = true;
      console.log(blockMenu)
      alertElementLang.classList.remove("hidden"); // Показываем окно
      activeAlertOptionLang = 0; // Сбрасываем активный элемент на первый
      setupOpenBoot_10();
      var wewrw = document.getElementById("option1")
      wewrw.classList.add("active"); // Подсвечиваем первый элемент
      
    }
  };
  



// Функция для сохранения профиля (номер профиля: 1 или 2)
function saveProfile(profileNumber) {
  // Собираем данные профиля в один объект
  const profileData = {
    bootguar: document.getElementById('bootGuard').textContent,
    spredDisabl: spredDisabled.textContent,
    allCor: document.getElementById('allCores').textContent,
    cpufree: document.getElementById('changeCpu_1').textContent,
    pciefree: document.getElementById('changeCpu_2').textContent,
    cpufreeList: document.getElementById('changeCpu_1').className,
    pciefreeList: document.getElementById('changeCpu_2').className,
    bootEnab: document.getElementById('bootEnabled').textContent,
    turbocoreAu: document.getElementById('turbocoreAuto').textContent,
    amdstate: document.getElementById('amdstateend').textContent,
    amdapm: document.getElementById('amdapmm').textContent,
    multivolEl: document.getElementById('multivol').textContent,
    multip: document.getElementById('multipar').textContent,
    multipv: document.getElementById('multipvol').textContent,
    multi: document.getElementById('multiNB').textContent,
    htbussp: document.getElementById('htbusspeed').textContent,
    htbuswid: document.getElementById('htbuswidth').textContent,
    memdr: document.getElementById('memddr3').textContent,
    boardis: document.getElementById('onboarddiss').textContent,
    vol1aut: document.getElementById('vol_1aut').textContent,
    vol2aut: document.getElementById('vol_2aut').textContent,
    vcoreoff: document.getElementById('vcore_offaut').textContent,
    vcoredro: document.getElementById('vcore_dropoff').textContent,
    vcoredro1: document.getElementById('vcore_dropoff_1').textContent,
    onboardCoutEl: document.getElementById('onboardcount').textContent,
    otpenabl: document.getElementById('otpenabl').textContent,
    casedisab: document.getElementById('casedisab').textContent,
    cputraget_1: document.getElementById('cputraget_1').textContent,
    cputraget_2: document.getElementById('cputraget_2').textContent,
    cputraget_3: document.getElementById('cputraget_3').textContent,
    cputraget_11: document.getElementById('cputraget_11').textContent,
    cputraget_21: document.getElementById('cputraget_21').textContent,
    cputraget_31: document.getElementById('cputraget_31').textContent,
    cputraget_12: document.getElementById('cputraget_12').textContent,
    cputraget_22: document.getElementById('cputraget_22').textContent,
    cputraget_32: document.getElementById('cputraget_32').textContent,
    satatoshib_1: document.getElementById('satatoshib_1').textContent,
    satatoshib_2: document.getElementById('satatoshib_2').textContent,
    satatoshib_3: document.getElementById('satatoshib_3').textContent,
    bootload_1: document.getElementById('bootload_1').textContent,
    bootload_hiddem: document.getElementById('bootload_hiddem').textContent,
    bootload_2: document.getElementById('bootload_2').textContent,
    bootload_3: document.getElementById('bootload_3').textContent,
    advansUsbEnab: document.getElementById('advansUsbEnab').textContent,
    advansUsb2_0Enab: document.getElementById('advansUsb2_0Enab').textContent,
    advansLegacyEnab: document.getElementById('advansLegacyEnab').textContent,
    advansKeyboaDisabl: document.getElementById('advansKeyboaDisabl').textContent,
    advansMouseDisabl: document.getElementById('advansMouseDisabl').textContent,
    advanspcitim32: document.getElementById('advanspcitim32').textContent,
    advansIdepsiEn: document.getElementById('advansIdepsiEn').textContent,
    advansOnboSataEnb: document.getElementById('advansOnboSataEnb').textContent,
    advansSataAhci: document.getElementById('advansSataAhci').textContent,
    advansCombEnab: document.getElementById('advansCombEnab').textContent,
    advansDisablPlug: document.getElementById('advansDisablPlug').textContent,
    advans2_2AUto: document.getElementById('advans2_2AUto').textContent,
    advansSmarEnab: document.getElementById('advansSmarEnab').textContent,
    advansDisablPlug2: document.getElementById('advansDisablPlug2').textContent,
    advans2_2AUto2: document.getElementById('advans2_2AUto2').textContent,
    advansSmarEnab2: document.getElementById('advansSmarEnab2').textContent,
    advansDisablPlug3: document.getElementById('advansDisablPlug3').textContent,
    advans2_2AUto3: document.getElementById('advans2_2AUto3').textContent,
    advansSmarEnab3: document.getElementById('advansSmarEnab3').textContent,
    advansDisablPlug4: document.getElementById('advansDisablPlug4').textContent,
    advanslba_4: document.getElementById('advanslba_4').textContent,
    advansBlocktransfer: document.getElementById('advansBlocktransfer').textContent,
    advans2_2AUto4: document.getElementById('advans2_2AUto4').textContent,
    advansDmb4: document.getElementById('advansDmb4').textContent,
    advansSmarDisab4: document.getElementById('advansSmarDisab4').textContent,
    advansSuspendAuto: document.getElementById('advansSuspendAuto').textContent,
    advansCheckReadyAuto: document.getElementById('advansCheckReadyAuto').textContent,
    advansAwayMDisabled: document.getElementById('advansAwayMDisabled').textContent,
    advansRestorePower: document.getElementById('advansRestorePower').textContent,
    advansPCIDevicesDisb: document.getElementById('advansPCIDevicesDisb').textContent
  };

  const profileString = JSON.stringify(profileData);
  localStorage.setItem(`profile${profileNumber}`, profileString);
  console.log(`Профиль ${profileNumber} сохранён: ${profileString}`);
}

function loadProfile(profileNumber) {

  // Специфические настройки для профиля 777
  if(profileNumber === 777) {
    document.getElementById('bootGuard').textContent = '[3]';
    document.getElementById('multipar').textContent = '[x3 600 MHz]';
    document.getElementById('multipar').textContent = '[x10 2000 MHz]';
    document.getElementById('multipvol').textContent = '[1.3000 V]';
    document.getElementById('multiNB').textContent = '[x15.0 3000 MHz]';
    document.getElementById('htbusspeed').textContent = '[x5 1000 MHz]';
    document.getElementById('htbuswidth').textContent = '[16 Bit]';
    document.getElementById('onboardcount').textContent = '[2400]';
    document.getElementById('vcore_dropoff').textContent = '[+100mV]';
    document.getElementById('advansThrotpar').textContent = '[75%]';
    document.getElementById('advansKeyboaDisabl').textContent = '[Enabled]';
    document.getElementById('advansMouseDisabl').textContent = '[Enabled]';
    document.getElementById('satatoshib_1').textContent = '[AHCI:PO-Samsung SSD 860 EVO 250]';
    document.getElementById('satatoshib_2').textContent = '[AHCI:PO-Samsung SSD 860 EVO 250]';
    document.getElementById('satatoshib_3').textContent = '[SATA:PS-TOSHIBA DT01ACA100]';
    console.log('Специальный профиль 777 загружен');
   
    return; // Прерываем выполнение функции
  }
    // Специфические настройки для профиля 776
    if(profileNumber === 776) {
      document.getElementById('bootGuard').textContent = '[1]';
      document.getElementById('multipar').textContent = '[x3 600 MHz]';
      document.getElementById('multipar').textContent = '[x6 1200 MHz]';
      document.getElementById('multipvol').textContent = '[1.1000 V]';
      document.getElementById('multiNB').textContent = '[x10.0 2000 MHz]';
      document.getElementById('htbusspeed').textContent = '[x3 600 MHz]';
      document.getElementById('htbuswidth').textContent = '[8 Bit]';
      document.getElementById('onboardcount').textContent = '[1500]';
      document.getElementById('vcore_dropoff').textContent = '[+0mV]';
      document.getElementById('advansThrotpar').textContent = '[62.5%]';
      document.getElementById('advansKeyboaDisabl').textContent = '[Enabled]';
      document.getElementById('advansMouseDisabl').textContent = '[Enabled]';
      document.getElementById('satatoshib_1').textContent = '[AHCI:PO-Samsung SSD 860 EVO 250]';
      document.getElementById('satatoshib_2').textContent = '[AHCI:PO-Samsung SSD 860 EVO 250]';
      document.getElementById('satatoshib_3').textContent = '[SATA:PS-TOSHIBA DT01ACA100]';
      console.log('Специальный профиль 776 загружен');
     
      return; // Прерываем выполнение функции
    }

  const profileString = localStorage.getItem(`profile${profileNumber}`);

  if (profileString) {
    const profileData = JSON.parse(profileString);

    // Основные настройки
    if (profileData.bootguar !== undefined) document.getElementById('bootGuard').textContent = profileData.bootguar;
    if (profileData.spredDisabl !== undefined) spredDisabled.textContent = profileData.spredDisabl;
    if (profileData.allCor !== undefined) document.getElementById('allCores').textContent = profileData.allCor;
    if (profileData.bootEnab !== undefined) document.getElementById('bootEnabled').textContent = profileData.bootEnab;
    
    // Настройки CPU
    if (profileData.cpufree !== undefined) document.getElementById('changeCpu_1').textContent = profileData.cpufree;
    if (profileData.pciefree !== undefined) document.getElementById('changeCpu_2').textContent = profileData.pciefree;
    if (profileData.cpufreeList !== undefined) document.getElementById('changeCpu_1').className = profileData.cpufreeList;
    if (profileData.pciefreeList !== undefined) document.getElementById('changeCpu_2').className = profileData.pciefreeList;

    // Настройки AMD
    if (profileData.turbocoreAu !== undefined) document.getElementById('turbocoreAuto').textContent = profileData.turbocoreAu;
    if (profileData.amdstate !== undefined) document.getElementById('amdstateend').textContent = profileData.amdstate;
    if (profileData.amdapm !== undefined) document.getElementById('amdapmm').textContent = profileData.amdapm;

    // Настройки напряжения
    if (profileData.multivolEl !== undefined) {
      const mv = profileData.multivolEl;
      document.getElementById('multivol').textContent = mv;
      const displayValue = mv === "[Auto]" ? "none" : mv === "[ManuaI]" ? "block" : "";
      if (displayValue) {
        ['cpuvol', 'multipvol', 'cpuvolnbb', 'multiNB', 'multipliercpu', 'multipar'].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.style.display = displayValue;
        });
      }
    }

    // Настройки памяти и шины
    if (profileData.multip !== undefined) document.getElementById('multipar').textContent = profileData.multip;
    if (profileData.multipv !== undefined) document.getElementById('multipvol').textContent = profileData.multipv;
    if (profileData.multi !== undefined) document.getElementById('multiNB').textContent = profileData.multi;
    if (profileData.htbussp !== undefined) document.getElementById('htbusspeed').textContent = profileData.htbussp;
    if (profileData.htbuswid !== undefined) document.getElementById('htbuswidth').textContent = profileData.htbuswid;
    if (profileData.memdr !== undefined) document.getElementById('memddr3').textContent = profileData.memdr;

    // Настройки графики
    if (profileData.boardis !== undefined) {
      const boardisValue = profileData.boardis.replace(/\[|\]/g, '').trim();
      document.getElementById('onboarddiss').textContent = `[${boardisValue}]`;
      const displayValue = boardisValue === "Enabled" ? "block" : "none";
      ['onboardGpucllock', 'onboardcount'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = displayValue;
      });
    }
    if (profileData.onboardCoutEl !== undefined) document.getElementById('onboardcount').textContent = profileData.onboardCoutEl;

    // Настройки напряжения
    if (profileData.vol1aut !== undefined) document.getElementById('vol_1aut').textContent = profileData.vol1aut;
    if (profileData.vol2aut !== undefined) document.getElementById('vol_2aut').textContent = profileData.vol2aut;
    if (profileData.vcoreoff !== undefined) document.getElementById('vcore_offaut').textContent = profileData.vcoreoff;
    if (profileData.vcoredro !== undefined) document.getElementById('vcore_dropoff').textContent = profileData.vcoredro;
    if (profileData.vcoredro1 !== undefined) document.getElementById('vcore_dropoff_1').textContent = profileData.vcoredro1;

    // Дополнительные настройки
    if (profileData.otpenabl !== undefined) document.getElementById('otpenabl').textContent = profileData.otpenabl;
    if (profileData.casedisab !== undefined) document.getElementById('casedisab').textContent = profileData.casedisab;
    
    // Температурные настройки
    if (profileData.cputraget_1 !== undefined) document.getElementById('cputraget_1').textContent = profileData.cputraget_1;
    if (profileData.cputraget_2 !== undefined) document.getElementById('cputraget_2').textContent = profileData.cputraget_2;
    if (profileData.cputraget_3 !== undefined) document.getElementById('cputraget_3').textContent = profileData.cputraget_3;
    if (profileData.cputraget_11 !== undefined) document.getElementById('cputraget_11').textContent = profileData.cputraget_11;
    if (profileData.cputraget_21 !== undefined) document.getElementById('cputraget_21').textContent = profileData.cputraget_21;
    if (profileData.cputraget_31 !== undefined) document.getElementById('cputraget_31').textContent = profileData.cputraget_31;
    if (profileData.cputraget_12 !== undefined) document.getElementById('cputraget_12').textContent = profileData.cputraget_12;
    if (profileData.cputraget_22 !== undefined) document.getElementById('cputraget_22').textContent = profileData.cputraget_22;
    if (profileData.cputraget_32 !== undefined) document.getElementById('cputraget_32').textContent = profileData.cputraget_32;

    // SATA/Toshiba настройки
    if (profileData.satatoshib_1 !== undefined) document.getElementById('satatoshib_1').textContent = profileData.satatoshib_1;
    if (profileData.satatoshib_2 !== undefined) document.getElementById('satatoshib_2').textContent = profileData.satatoshib_2;
    if (profileData.satatoshib_3 !== undefined) document.getElementById('satatoshib_3').textContent = profileData.satatoshib_3;

    // Boot Loader настройки
    if (profileData.bootload_1 !== undefined) document.getElementById('bootload_1').textContent = profileData.bootload_1;
    if (profileData.bootload_hiddem !== undefined) document.getElementById('bootload_hiddem').textContent = profileData.bootload_hiddem;
    if (profileData.bootload_2 !== undefined) document.getElementById('bootload_2').textContent = profileData.bootload_2;
    if (profileData.bootload_3 !== undefined) document.getElementById('bootload_3').textContent = profileData.bootload_3;

    // USB/PCI настройки
    if (profileData.advansUsbEnab !== undefined) document.getElementById('advansUsbEnab').textContent = profileData.advansUsbEnab;
    if (profileData.advansUsb2_0Enab !== undefined) document.getElementById('advansUsb2_0Enab').textContent = profileData.advansUsb2_0Enab;
    if (profileData.advansLegacyEnab !== undefined) document.getElementById('advansLegacyEnab').textContent = profileData.advansLegacyEnab;
    if (profileData.advansKeyboaDisabl !== undefined) document.getElementById('advansKeyboaDisabl').textContent = profileData.advansKeyboaDisabl;
    if (profileData.advansMouseDisabl !== undefined) document.getElementById('advansMouseDisabl').textContent = profileData.advansMouseDisabl;
    if (profileData.advanspcitim32 !== undefined) document.getElementById('advanspcitim32').textContent = profileData.advanspcitim32;
    if (profileData.advansIdepsiEn !== undefined) document.getElementById('advansIdepsiEn').textContent = profileData.advansIdepsiEn;
    if (profileData.advansOnboSataEnb !== undefined) document.getElementById('advansOnboSataEnb').textContent = profileData.advansOnboSataEnb;
    if (profileData.advansSataAhci !== undefined) document.getElementById('advansSataAhci').textContent = profileData.advansSataAhci;
    if (profileData.advansCombEnab !== undefined) document.getElementById('advansCombEnab').textContent = profileData.advansCombEnab;
    if (profileData.advansDisablPlug !== undefined) document.getElementById('advansDisablPlug').textContent = profileData.advansDisablPlug;
    if (profileData.advans2_2AUto !== undefined) document.getElementById('advans2_2AUto').textContent = profileData.advans2_2AUto;
    if (profileData.advansSmarEnab !== undefined) document.getElementById('advansSmarEnab').textContent = profileData.advansSmarEnab;
    if (profileData.advansDisablPlug2 !== undefined) document.getElementById('advansDisablPlug2').textContent = profileData.advansDisablPlug2;
    if (profileData.advans2_2AUto2 !== undefined) document.getElementById('advans2_2AUto2').textContent = profileData.advans2_2AUto2;
    if (profileData.advansSmarEnab2 !== undefined) document.getElementById('advansSmarEnab2').textContent = profileData.advansSmarEnab2;
    if (profileData.advansDisablPlug3 !== undefined) document.getElementById('advansDisablPlug3').textContent = profileData.advansDisablPlug3;
    if (profileData.advans2_2AUto3 !== undefined) document.getElementById('advans2_2AUto3').textContent = profileData.advans2_2AUto3;
    if (profileData.advansSmarEnab3 !== undefined) document.getElementById('advansSmarEnab3').textContent = profileData.advansSmarEnab3;
    if (profileData.advansDisablPlug4 !== undefined) document.getElementById('advansDisablPlug4').textContent = profileData.advansDisablPlug4;
    if (profileData.advanslba_4 !== undefined) document.getElementById('advanslba_4').textContent = profileData.advanslba_4;
    if (profileData.advansBlocktransfer !== undefined) document.getElementById('advansBlocktransfer').textContent = profileData.advansBlocktransfer;
    if (profileData.advans2_2AUto4 !== undefined) document.getElementById('advans2_2AUto4').textContent = profileData.advans2_2AUto4;
    if (profileData.advansDmb4 !== undefined) document.getElementById('advansDmb4').textContent = profileData.advansDmb4;
    if (profileData.advansSmarDisab4 !== undefined) document.getElementById('advansSmarDisab4').textContent = profileData.advansSmarDisab4;
    if (profileData.advansSuspendAuto !== undefined) document.getElementById('advansSuspendAuto').textContent = profileData.advansSuspendAuto;
    if (profileData.advansCheckReadyAuto !== undefined) document.getElementById('advansCheckReadyAuto').textContent = profileData.advansCheckReadyAuto;
    if (profileData.advansAwayMDisabled !== undefined) document.getElementById('advansAwayMDisabled').textContent = profileData.advansAwayMDisabled;
    if (profileData.advansRestorePower !== undefined) document.getElementById('advansRestorePower').textContent = profileData.advansRestorePower;
    if (profileData.advansPCIDevicesDisb !== undefined) document.getElementById('advansPCIDevicesDisb').textContent = profileData.advansPCIDevicesDisb;

    console.log(`Профиль ${profileNumber} загружен.`);
    if (load1st.classList.contains("active") || load2st.classList.contains("active")) {
      updateActiveLine();
    }
  } else if(document.getElementById('load1st').classList.contains("active") || document.getElementById('load2st').classList.contains("active")) {
    console.log(`Профиль ${profileNumber} не найден в localStorage.`);
    alert("Профиль не найден!");
  }
}
function newOpenBoot(){
  updateBoot(70, 71, 72);
  openSetupOpenBoot_10();
}
function newOpenBoot_1(){
  updateBoot(73, 74, 75, 76, 77, 78);
  openSetupOpenBoot_10();
}
function newOpenBoot_2(){
  updateBoot(22, 23);
  openSetupOpenBoot_10();
}
function newOpenBoot_3(){
  updateBoot(79, 80, 81, 82, 83, 84, 85, 86, 87, 89, 90);
  openSetupOpenBoot_10();
}
function newOpenBoot_4(){
  updateBoot(46, 47, 48, 49, 50, 51, 24);
  openSetupOpenBoot_10();
}
function newOpenBoot_5(){
  updateBoot(91, 92, 93, 94, 95, 96, 97, 98, 99, 24);
  openSetupOpenBoot_10();
}
function newOpenBoot_6(){
  updateBoot(100, 101, 102, 103, 24);
  openSetupOpenBoot_10();
}
function newOpenBoot_7(){
  updateBoot(104, 105, 24);
  openSetupOpenBoot_10();
}
function newOpenBoot_8(){
      updateBoot(22, 23);
      openSetupOpenBoot_10();
  }
function newOpenBoot_9(){
      updateBoot(22, 23);
      openSetupOpenBoot_10();
  }
function newOpenBoot_10(){
      updateBoot(22, 23);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_11(){
      updateBoot(22, 24, 107, 108, 109, 110, 111, 112);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_12(){
      updateBoot(22, 23, 90);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_13(){
      updateBoot(114, 115);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_14(){
      updateBoot(22, 23);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_15(){
      updateBoot(116, 117, 118);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_16(){
      updateBoot(119, 22);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_17(){
      updateBoot(120, 121, 122, 123, 124, 125, 90);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_18(){
      updateBoot(22, 72);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_19(){
      updateBoot(126, 127);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_20(){
      updateBoot(22, 128);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_21(){
      updateBoot(22, 23, 129);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_22(){
      updateBoot(130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_23(){
      updateBoot(146, 147, 148);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_24(){
      updateBoot(149, 150);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_25(){
      updateBoot(150, 149, 151, 152);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_26(){
      updateBoot(153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_27(){
      updateBoot(166, 167, 168, 169);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_28(){
      updateBoot(170, 171);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_29(){
      updateBoot(172, 131, 132, 133, 134, 171);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_30(){
      updateBoot(171, 22, 23);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_31(){
      updateBoot(173, 174, 175, 176, 177, 178, 179, 180);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_32(){
      updateBoot(16, 170);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_33(){
      updateBoot(181, 182);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_34(){
      updateBoot(183, 181, 184, 182);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_35(){
      updateBoot(185, 186);
      const alertDivss = document.querySelectorAll(".alerttext_1 div"); 
      alertDivss[0].textContent = document.getElementById('satatoshib_2').textContent.replace(/\[|\]/g, '').trim() // 1 element
      if(document.getElementById('satatoshib_2').textContent === "[Disabled]"){
        alertDivss[1].textContent = ""
      }
      openSetupOpenBoot_10();
  }
  function newOpenBoot_36(){
      updateBoot(187, 188, 186);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_37(){
      updateBoot(189, 190);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_38(){
      updateBoot(191, 192);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_39(){
      updateBoot(193, 194, 195, 196, 197, 198, 199, 200, 201);
      openSetupOpenBoot_10();
  }
  function newOpenBoot_40(){
      updateBoot(191, 202, 192);
      openSetupOpenBoot_10();
  }
  function nosaveandexit(){
    toastMenuLoad = true;
    choseMenuLoad = true
    confirmalerm = true;
    rightleftBlock = true;
    toastr.options.tapToDismiss = false;
    toastr.options.progressBar = false;
    console.log(choseMenuLoad + "/" + confirmalerm + "/" + rightleftBlock + " :load1st debug")
    toastr.options.timeOut = "0";
    toastr.options.extendedTimeOut = "0";
    toastr.success(`
      <button id="btnYes" class="btn btn-success">[Ok]</button>
      <button type="button" id="btnNo" class="btn clear">[Cancel]</button>
    `, "Discard Changes and Exit?");
    
    // Ждем, пока toastr сгенерирует кнопки (примерно 100 мс)
    setTimeout(() => {
      const btnYes = document.getElementById("btnYes");
      const btnNo = document.getElementById("btnNo");
      
      if (!btnYes || !btnNo) {
        console.error("Кнопки не найдены");
        return;
      }
      
      // Инициализируем массив кнопок и устанавливаем первую как активную
      let activeIndexMenu = 0;
      const buttons = [btnYes, btnNo];
      buttons[activeIndexMenu].classList.add("activeMenu");
      
      // Функции для выбора
      function selectYes() {
        userChoice = true;
        toastr.clear();
        console.log("User selected: Yes");
        loadProfile(999)
        history.replaceState(null, "", "/biosinstant.html"); 
        window.location.href = "/biosLoad.html";
        removeKeyListener();
setTimeout(() => {
        rightleftBlock = false;
        confirmalerm = false;
        choseMenuLoad = false;
        toastMenuLoad = false;

}, 1000); 
      }   
      function selectNo() {
        userChoice = false;
        toastr.clear();
        console.log("User selected: No");
        removeKeyListener();
  setTimeout(() => {
        rightleftBlock = false;
        confirmalerm = false;
        choseMenuLoad = false;
        toastMenuLoad = false;
        console.log(choseMenuLoad + "/" + confirmalerm + "/" + rightleftBlock + " :load1st debug")
}, 1000);
        
      }  
      // Обработчик клавиатуры для переключения между кнопками и подтверждения выбора
      function arrowHandler(e) {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          buttons.forEach(btn => btn.classList.remove("activeMenu"));
          activeIndexMenu = (activeIndexMenu + 1) % buttons.length;
          buttons[activeIndexMenu].classList.add("activeMenu");
          e.preventDefault();
        } else if (e.key === "Enter") {
          // Если нажато Enter, проверяем, какая кнопка активна, и вызываем соответствующую функцию
          if (buttons[activeIndexMenu].id === "btnYes") {
            selectYes();
          } else if (buttons[activeIndexMenu].id === "btnNo") {
            selectNo();
          }
        } else if (e.key === "Escape"){
            selectNo();
        }
      }
      
      document.addEventListener("keydown", arrowHandler);
      
      // Функция для удаления обработчика, когда выбор сделан
      function removeKeyListener() {
        document.removeEventListener("keydown", arrowHandler);
      }
      
    }, 1);
  }
  function loaddefultbios(){
    toastMenuLoad = true;
    choseMenuLoad = true
    confirmalerm = true;
    rightleftBlock = true;
    toastr.options.tapToDismiss = false;
    toastr.options.progressBar = false;
    console.log(choseMenuLoad + "/" + confirmalerm + "/" + rightleftBlock + " :load1st debug")
    toastr.options.timeOut = "0";
    toastr.options.extendedTimeOut = "0";
    toastr.success(`
      <button id="btnYes" class="btn btn-success">[Ok]</button>
      <button type="button" id="btnNo" class="btn clear">[Cancel]</button>
    `, "Load BIOS Defaults?");
    
    // Ждем, пока toastr сгенерирует кнопки (примерно 100 мс)
    setTimeout(() => {
      const btnYes = document.getElementById("btnYes");
      const btnNo = document.getElementById("btnNo");
      
      if (!btnYes || !btnNo) {
        console.error("Кнопки не найдены");
        return;
      }
      
      // Инициализируем массив кнопок и устанавливаем первую как активную
      let activeIndexMenu = 0;
      const buttons = [btnYes, btnNo];
      buttons[activeIndexMenu].classList.add("activeMenu");
      
      // Функции для выбора
      function selectYes() {
          toggleTaskStatus(7); 
          console.log('№8correct!');
          localStorage.setItem('num8correct', '8correct')
        userChoice = true;
        toastr.clear();
        console.log("User selected: Yes");
        saveProfile(999)
        localStorage.removeItem('profile999')
        localStorage.setItem('multi', '[x20.0 4000 MHz]')
        history.replaceState(null, "", "/biosinstant.html"); 
        window.location.href = "/biosLoad.html";
        removeKeyListener();
setTimeout(() => {
        rightleftBlock = false;
        confirmalerm = false;
        choseMenuLoad = false;
        toastMenuLoad = false;

}, 1000); 
      }   
      function selectNo() {
        userChoice = false;
        toastr.clear();
        console.log("User selected: No");
        removeKeyListener();
  setTimeout(() => {
        rightleftBlock = false;
        confirmalerm = false;
        choseMenuLoad = false;
        toastMenuLoad = false;
        console.log(choseMenuLoad + "/" + confirmalerm + "/" + rightleftBlock + " :load1st debug")
}, 1000);
        
      }  
      // Обработчик клавиатуры для переключения между кнопками и подтверждения выбора
      function arrowHandler(e) {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          buttons.forEach(btn => btn.classList.remove("activeMenu"));
          activeIndexMenu = (activeIndexMenu + 1) % buttons.length;
          buttons[activeIndexMenu].classList.add("activeMenu");
          e.preventDefault();
        } else if (e.key === "Enter") {
          // Если нажато Enter, проверяем, какая кнопка активна, и вызываем соответствующую функцию
          if (buttons[activeIndexMenu].id === "btnYes") {
            selectYes();
          } else if (buttons[activeIndexMenu].id === "btnNo") {
            selectNo();
          }
        } else if (e.key === "Escape"){
            selectNo();
        }
      }
      
      document.addEventListener("keydown", arrowHandler);
      
      // Функция для удаления обработчика, когда выбор сделан
      function removeKeyListener() {
        document.removeEventListener("keydown", arrowHandler);
      }
      
    }, 1);
  }
  function loadperfomance(){
    toastMenuLoad = true;
    choseMenuLoad = true
    confirmalerm = true;
    rightleftBlock = true;
    toastr.options.tapToDismiss = false;
    toastr.options.progressBar = false;
    console.log(choseMenuLoad + "/" + confirmalerm + "/" + rightleftBlock + " :load1st debug")
    toastr.options.timeOut = "0";
    toastr.options.extendedTimeOut = "0";
    toastr.success(`
      <button id="btnYes" class="btn btn-success">[Ok]</button>
      <button type="button" id="btnNo" class="btn clear">[Cancel]</button>
    `, "Load Performance Setup Default?");
    
    // Ждем, пока toastr сгенерирует кнопки (примерно 100 мс)
    setTimeout(() => {
      const btnYes = document.getElementById("btnYes");
      const btnNo = document.getElementById("btnNo");
      
      if (!btnYes || !btnNo) {
        console.error("Кнопки не найдены");
        return;
      }
      
      // Инициализируем массив кнопок и устанавливаем первую как активную
      let activeIndexMenu = 0;
      const buttons = [btnYes, btnNo];
      buttons[activeIndexMenu].classList.add("activeMenu");
      
      // Функции для выбора
      function selectYes() {
        userChoice = true;
        toastr.clear();
        console.log("User selected: Yes");
        localStorage.removeItem('profile999')
        sessionStorage.setItem("siteReload", "1"); 
        history.replaceState(null, "", "/biosinstant.html"); 
        window.location.href = "/biosLoad.html";
        removeKeyListener();
setTimeout(() => {
        rightleftBlock = false;
        confirmalerm = false;
        choseMenuLoad = false;
        toastMenuLoad = false;

}, 1000); 
      }   
      function selectNo() {
        userChoice = false;
        toastr.clear();
        console.log("User selected: No");
        removeKeyListener();
  setTimeout(() => {
        rightleftBlock = false;
        confirmalerm = false;
        choseMenuLoad = false;
        toastMenuLoad = false;
        console.log(choseMenuLoad + "/" + confirmalerm + "/" + rightleftBlock + " :load1st debug")
}, 1000);
        
      }  
      // Обработчик клавиатуры для переключения между кнопками и подтверждения выбора
      function arrowHandler(e) {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          buttons.forEach(btn => btn.classList.remove("activeMenu"));
          activeIndexMenu = (activeIndexMenu + 1) % buttons.length;
          buttons[activeIndexMenu].classList.add("activeMenu");
          e.preventDefault();
        } else if (e.key === "Enter") {
          // Если нажато Enter, проверяем, какая кнопка активна, и вызываем соответствующую функцию
          if (buttons[activeIndexMenu].id === "btnYes") {
            selectYes();
          } else if (buttons[activeIndexMenu].id === "btnNo") {
            selectNo();
          }
        } else if (e.key === "Escape"){
            selectNo();
        }
      }
      
      document.addEventListener("keydown", arrowHandler);
      
      // Функция для удаления обработчика, когда выбор сделан
      function removeKeyListener() {
        document.removeEventListener("keydown", arrowHandler);
      }
      
    }, 1);
  }
  function loadpowersef(){
    toastMenuLoad = true;
    choseMenuLoad = true
    confirmalerm = true;
    rightleftBlock = true;
    toastr.options.tapToDismiss = false;
    toastr.options.progressBar = false;
    console.log(choseMenuLoad + "/" + confirmalerm + "/" + rightleftBlock + " :load1st debug")
    toastr.options.timeOut = "0";
    toastr.options.extendedTimeOut = "0";
    toastr.success(`
      <button id="btnYes" class="btn btn-success">[Ok]</button>
      <button type="button" id="btnNo" class="btn clear">[Cancel]</button>
    `, "Load Power Saving Setup Default?");
    
    // Ждем, пока toastr сгенерирует кнопки (примерно 100 мс)
    setTimeout(() => {
      const btnYes = document.getElementById("btnYes");
      const btnNo = document.getElementById("btnNo");
      
      if (!btnYes || !btnNo) {
        console.error("Кнопки не найдены");
        return;
      }
      
      // Инициализируем массив кнопок и устанавливаем первую как активную
      let activeIndexMenu = 0;
      const buttons = [btnYes, btnNo];
      buttons[activeIndexMenu].classList.add("activeMenu");
      
      // Функции для выбора
      function selectYes() {
        userChoice = true;
        toastr.clear();
        console.log("User selected: Yes");
        localStorage.removeItem('profile999')
        sessionStorage.setItem("siteReload", "2");
        history.replaceState(null, "", "/biosinstant.html"); 
        window.location.href = "/biosLoad.html";
        removeKeyListener();
setTimeout(() => {
        rightleftBlock = false;
        confirmalerm = false;
        choseMenuLoad = false;
        toastMenuLoad = false;

}, 1000); 
      }   
      function selectNo() {
        userChoice = false;
        toastr.clear();
        console.log("User selected: No");
        removeKeyListener();
  setTimeout(() => {
        rightleftBlock = false;
        confirmalerm = false;
        choseMenuLoad = false;
        toastMenuLoad = false;
        console.log(choseMenuLoad + "/" + confirmalerm + "/" + rightleftBlock + " :load1st debug")
}, 1000);
        
      }  
      // Обработчик клавиатуры для переключения между кнопками и подтверждения выбора
      function arrowHandler(e) {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          buttons.forEach(btn => btn.classList.remove("activeMenu"));
          activeIndexMenu = (activeIndexMenu + 1) % buttons.length;
          buttons[activeIndexMenu].classList.add("activeMenu");
          e.preventDefault();
        } else if (e.key === "Enter") {
          // Если нажато Enter, проверяем, какая кнопка активна, и вызываем соответствующую функцию
          if (buttons[activeIndexMenu].id === "btnYes") {
            selectYes();
          } else if (buttons[activeIndexMenu].id === "btnNo") {
            selectNo();
          }
        } else if (e.key === "Escape"){
            selectNo();
        }
      }
      
      document.addEventListener("keydown", arrowHandler);
      
      // Функция для удаления обработчика, когда выбор сделан
      function removeKeyListener() {
        document.removeEventListener("keydown", arrowHandler);
      }
      
    }, 1);
  }
  document.getElementById("pashalka1").addEventListener("click", function(){
 // Применяем стили для .header
 document.querySelector(".header").style.background = "linear-gradient(to right, #ff0076, #a7189c, #e11886)";

 // Применяем стили для .header
 document.querySelector(".headerr").style.background = "linear-gradient(to right, #ff0076, #a7189c, #e11886)";
// Применяем стили для .menu-item
document.querySelector(".menu-item").style.background = "#bc27c8";
// Применяем стили для .menu-item.active
let activeMenuItems = document.querySelectorAll(".menu-item");
activeMenuItems.forEach(item => {
    item.style.backgroundColor = "#1acc14";
    item.style.color = "#1acc14";
});

// Применяем стили для .ramka
document.querySelector(".ramka").style.border = "solid #e714ca";

// Применяем стили для .ramkaa
document.querySelector(".ramkaa").style.border = "solid #e714ca";

// Применяем стили для .footer
document.querySelector(".footer").style.background = "linear-gradient(to left, #a71c22, #d51ed0)";

localStorage.setItem('valumePashalko', 1)
  });
  function pashalkoDefault() {
    // Сбросить стили для .header
    document.querySelector(".header").style.background = ""; // Вернуть дефолтный стиль

    // Сбросить стили для .headerr
    document.querySelector(".headerr").style.background = ""; // Вернуть дефолтный стиль

    // Сбросить стили для .menu-item
    document.querySelector(".menu-item").style.background = ""; // Вернуть дефолтный стиль

    // Сбросить стили для .menu-item.active
    let activeMenuItems = document.querySelectorAll(".menu-item");
    activeMenuItems.forEach(item => {
        item.style.backgroundColor = ""; // Вернуть дефолтный стиль
        item.style.color = ""; // Вернуть дефолтный стиль
    });

    // Сбросить стили для .ramka
    document.querySelector(".ramka").style.border = ""; // Вернуть дефолтный стиль

    // Сбросить стили для .ramkaa
    document.querySelector(".ramkaa").style.border = ""; // Вернуть дефолтный стиль

    // Сбросить стили для .footer
    document.querySelector(".footer").style.background = ""; // Вернуть дефолтный стиль

    localStorage.setItem('valumePashalko', 0)
}
function checkpassword(){
  let parolLoca = String(localStorage.getItem('paroluserLocal'))

  if(Number(localStorage.getItem('escapeInstant')) === 2){
    console.log(tempPass)
    let nows = localStorage.getItem('temppasloc')
    localStorage.setItem('paroluserLocal', nows); 
    localStorage.removeItem('temppasloc')
  }
    if (parolLoca === 'vZvIh3d8C') {
        document.getElementById("passUserid").classList.add("activepass");
        document.getElementById("notinstallpass").innerHTML = "Installed";
    
        let correctPassword = localStorage.getItem('changePass'); // Получаем пароль из localStorage
        let woros;
    
        while (true) { // Бесконечный цикл, пока не введут правильный пароль
            woros = prompt("User Password");
    
            if (!woros) { 
                // Если пользователь не ввел ничего (нажал "Отмена" или оставил пустым)
                alert("Password cannot be empty!");
                continue; // Повторяем ввод
            }
    
            if (woros !== correctPassword) {
                alert("Password incorrect! Try again.");
                continue; // Повторяем ввод
            }
    
            break; // Пароль верный — выходим из цикла
        }
    
        console.log("Access granted!");
    } 
    if(parolLoca === 'MuKLeqkeH7e'){
      
    }

   // if(loadchenges === 1){
//
  //  }
    
}
function changeOption(){ /// Save Changes and Exit

}
  function updateTemperature() {
  const voltageElement = document.getElementById("1392V");
  const tempContainer = document.getElementById('gradysF')
  const rpmElement = document.getElementById("1797rpm");
  const rpmElement8 = document.getElementById("1827rpm");


  setInterval(() => {
    // Генерация случайной температуры от 40 до 45°C
    const tempCelsius = Math.floor(Math.random() * 6) + 40;
    // Генерация случайного числа от 1760 до 1810
    const rpmValue = Math.floor(Math.random() * 51) + 1760;
        // Генерация случайного числа от 2101 до 2204
    const rpmValue8 = Math.floor(Math.random() * 104) + 2101;
  // Генерация случайного числа от 1.372 до 1.402 с точностью до 3 знаков после запятой
  const voltageValue = (Math.random() * (1.402 - 1.372) + 1.372).toFixed(3);
    
    // Конвертация в Фаренгейты
    const tempFahrenheit = Math.round(tempCelsius * 9 / 5 + 32);
    
    // Обновление текста
    tempContainer.textContent = `${tempCelsius}°C/${tempFahrenheit}°F`;
    rpmElement.textContent = `${rpmValue} RPM`;
    rpmElement8.textContent = `${rpmValue8} RPM`;
    voltageElement.textContent = `${voltageValue} V`;
  }, 1000);
}
function advancCpuConf(){
  enterLock = true;
  advansCpuconf.style.display = "none" 
  advansChipconf.style.display = "none"
  advansAcpicon.style.display = "none"
  advansStor.style.display = "none" 
  advansPci.style.display = "none"
  advansUsb.style.display = "none"
  advansInstanflash.style.display = "none";
  document.getElementById('warnadvanc').style.display = "none";
  document.getElementById('biosadvans').style.display = "none";
  document.getElementById('underlinadv').style.display = "none";
  document.getElementById('ChipsetConf').style.display = "none"
  const advans = document.getElementById("advans");
  const rect = advans.getBoundingClientRect(); /// Зчитуємо координати і застосовуємо їх
  advans.style.position = "absolute";
  advans.style.left = `${rect.left}px`;
  CPUConfBlock = false;
  AdvancedSetBlock = false;
  AcpiConfiggBlock = false;
  StorageConfiggBlock = false;
  PCIPnP = false;
  USBchos = false;
  storageConfigNew = false;
  powerr.style.display = "none";
  boott.style.display = "none";
  toolss.style.display = "none";
  exitt.style.display = "none";
  octweak.style.display = "none";
  document.getElementById('mainmenu').style.display = "none";
  document.getElementById('AcpiConfigg').style.display = "none"
  document.getElementById('StorageConf').style.display = "none"
  document.getElementById('StorageSata2_2').style.display = "none"
  document.getElementById('StorageSata2_22').style.display = "none"
  document.getElementById('StorageSata2_23').style.display = "none"
  document.getElementById('StorageSata2_24').style.display = "none"
  document.getElementById('PCIPnPConfigg').style.display = "none"
  document.getElementById('UsbConfigg').style.display = "none"
  document.getElementById('advansEnhapar').style.display = "none" 

if(activeDisplay === 29 && event.key === "Enter" && toastMenuLoad === false){
  rightleftBlock = true; /// Блокуємо перемикання стрілок вліво вправо (якщо натиснути esc то значення стане false)
  CPUConfBlock = true;
  advansQuiet.style.display = "" 
  document.getElementById('advanshead').innerHTML = "CPU Configuration"
  document.getElementById('advansQuiet1').style.display = "";
  document.getElementById('advansQuiet2').style.display = "";
  document.getElementById('advansQuiet3').style.display = "";
  document.getElementById('advansEnhapar').style.display = ""
  document.getElementById('advancpuopen').style.display = "flex";
  advansEnha.style.display = "";
 advansThrot.style.display = "";
 document.getElementById('advansThrotpar').style.display = "";
  activeDisplay = 36;
  updateActiveLine();
} 

if(activeDisplay === 30 && event.key === "Enter" && toastMenuLoad === false){
  rightleftBlock = true; /// Блокуємо перемикання стрілок вліво вправо (якщо натиснути esc то значення стане false)
  AdvancedSetBlock = true;
  document.getElementById('advanshead').innerHTML = "Chipset Configuration"
  document.getElementById('advancpuopen').style.display = "flex"
  document.getElementById('ChipsetConf').style.display = "flex"
  document.getElementById('advansEnhapar').style.display = "none"
  activeDisplay = 40;
  updateActiveLine();
}
if(activeDisplay === 31 && event.key === "Enter" && toastMenuLoad === false){
  AcpiConfiggBlock = true;
  rightleftBlock = true; /// Блокуємо перемикання стрілок вліво вправо (якщо натиснути esc то значення стане false)
  document.getElementById('advanshead').innerHTML = "ACPI Configuration"
  document.getElementById('advancpuopen').style.display = "flex"
 document.getElementById('AcpiConfigg').style.display = "flex" 
 activeDisplay = 47;
 
}
if(activeDisplay === 32 && event.key === "Enter" && toastMenuLoad === false){
  storageConfigNew = true;
  in_subject = true;
  rightleftBlock = true; /// Блокуємо перемикання стрілок вліво вправо (якщо натиснути esc то значення стане false)
  document.getElementById('advanshead').innerHTML = "Storage Configuration"
  document.getElementById('advancpuopen').style.display = "flex"
 document.getElementById('StorageConf').style.display = "flex" 
  activeDisplay = 58;
}

if (activeDisplay === 61 && event.key === "Enter" && toastMenuLoad === false){
  sataAdvanc2_2 = true;
    if(advansSata2_1.classList.contains("active")){
      document.getElementById('advanshead').innerHTML = "SATAII_1"
  document.getElementById('advancpuopen').style.display = "flex"
      document.getElementById('StorageSata2_2').style.display = "flex"
      activeDisplay = 65
       }
    }

    if (activeDisplay === 62 && event.key === "Enter" && toastMenuLoad === false){
  sataAdvanc2_22 = true;
    if(advansSata2_2.classList.contains("active")){
      document.getElementById('advanshead').innerHTML = "SATAII_2"
  document.getElementById('advancpuopen').style.display = "flex"
      document.getElementById('StorageSata2_22').style.display = "flex"
      activeDisplay = 68
       }
    }
    if (activeDisplay === 63 && event.key === "Enter"  && toastMenuLoad === false){
  
    if(advansSata2_3.classList.contains("active")){
      document.getElementById('advanshead').innerHTML = "SATAII_3"
  document.getElementById('advancpuopen').style.display = "flex"
      document.getElementById('StorageSata2_23').style.display = "flex"
       activeDisplay = 71
       }
    }
    if (activeDisplay === 64 && event.key === "Enter" && toastMenuLoad === false){
  
  if(advansSata2_4.classList.contains("active")){
    document.getElementById('advanshead').innerHTML = "SATAII_4"
document.getElementById('advancpuopen').style.display = "flex"
    document.getElementById('StorageSata2_24').style.display = "flex"
     activeDisplay = 74
     }
  }
  if (activeDisplay === 33 && event.key === "Enter" && toastMenuLoad === false){
  if(advansPci.classList.contains("active")){
    PCIPnP = true;
    rightleftBlock = true; /// Блокуємо перемикання стрілок вліво вправо (якщо натиснути esc то значення стане false)
    document.getElementById('advanshead').innerHTML = "Advanced PCI/PnP Settings"
document.getElementById('advancpuopen').style.display = "flex"
    document.getElementById('PCIPnPConfigg').style.display = "flex"
     activeDisplay = 80
     }
  }
  if (activeDisplay === 34 && event.key === "Enter" && toastMenuLoad === false){
  if(advansUsb.classList.contains("active")){
    USBchos = true;
    rightleftBlock = true; /// Блокуємо перемикання стрілок вліво вправо (якщо натиснути esc то значення стане false)
    document.getElementById('advanshead').innerHTML = "USB Configuration"
document.getElementById('advancpuopen').style.display = "flex"
    document.getElementById('UsbConfigg').style.display = "flex"
     activeDisplay = 82
     }
  }
updateActiveLine();
}
function BootConf(){
  enterLock = true;
  in_subject = true;
  document.getElementById('bootSett').style.display = "none"
  document.getElementById('boot1st').style.display = "none"
  document.getElementById('bootHardDisk').style.display = "none"
  document.getElementById('bootconfig1').style.display = "none"
  const advans1 = document.getElementById("boott");
  const rect = advans1.getBoundingClientRect(); /// Зчитуємо координати і застосовуємо їх
  advans1.style.position = "absolute";
  advans1.style.left = `${rect.left}px`;
  mainmenu.style.display = "none";
  powerr.style.display = "none";
  toolss.style.display = "none";
  exitt.style.display = "none";
  advans.style.display = "none";
  octweak.style.display = "none";
  if (activeDisplay === 94 && event.key === "Enter" && toastMenuLoad === false){
    bootsetting = true;
    activeDisplay = 103;
    document.getElementById('advanshead453').innerHTML = "Hard Disk Drivers"
    document.getElementById('harddiskdriv').style.display = "block"
  }
  if (activeDisplay === 92 && event.key === "Enter" && toastMenuLoad === false){
    bootsetting2 = true;
    activeDisplay = 105;
    document.getElementById('advanshead453').innerHTML = "Boot Settings Configuration"
    document.getElementById('bootconfig1').style.display = "block"
  }

  updateActiveLine();
}
function hwMonitorConf(){
  enterLock = true;
  in_subject = true;
  const advans1 = document.getElementById("powerr");
  const rect = advans1.getBoundingClientRect(); /// Зчитуємо координати і застосовуємо їх
  advans1.style.position = "absolute";
  advans1.style.left = `${rect.left}px`;
  mainmenu.style.display = "none";
  toolss.style.display = "none";
  exitt.style.display = "none";
  advans.style.display = "none";
  boott.style.display = "none";
  octweak.style.display = "none";
  document.getElementById('systeninff').style.display = "none"
  document.getElementById('otpenb').style.display = "none"
  document.getElementById('otpenb1').style.display = "none"
  document.getElementById('otpenb2').style.display = "none"
  document.getElementById('otp').style.display = "none"
  document.getElementById('caseopen').style.display = "none"
  if (activeDisplay === 87 && event.key === "Enter" && toastMenuLoad === false){
    cpuFan = true;
    activeDisplay = 109;
    document.getElementById('advanshead45').innerHTML = "CPU Fan Setting"
    document.getElementById('cpufansettin').style.display = "block"
  }
  if (activeDisplay === 88 && event.key === "Enter" && toastMenuLoad === false){

   cpuFan1 = true;
   max3elem = false; // разрешает переключение только между 109 и 111
     activeDisplay = 112;
    document.getElementById('advanshead45').innerHTML = "Chassis Fan 1 Setting"
    document.getElementById('cpufansettin1').style.display = "block"

  }
  if (activeDisplay === 89 && event.key === "Enter" && toastMenuLoad === false){
   cpuFan2 = true;
   activeDisplay = 115;
    document.getElementById('advanshead45').innerHTML = "Chassis Fan 2 Setting"
    document.getElementById('cpufansettin2').style.display = "block"

  }

  updateActiveLine();
}    

function InstantFlashOn() {
      // Очищаємо історію, щоб не можна було повернутися назад
      history.replaceState(null, "", "bios.html");
    window.location.href = "/biosinstant.html";
}

function scrollBoth() {
  const element = scrollMass[scrollIndex];
  if (element) {
    // Прокручиваем к элементу.
    // Можно настроить поведение скролла через параметры scrollIntoView.
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    console.warn(`Элемент с индексом ${scrollIndex} не найден.`);
  }
}

function scrollNext() {
  if((activeMenuItemIndex === 2 || activeMenuItemIndex === 0) && activeDisplay === 2){
    scrollIndex = 0

  }
  if(activeMenuItemIndex === 1) {
  // Увеличиваем индекс с переходом на начало списка по кругу
  scrollIndex = (scrollIndex + 1) % scrollMass.length;
  console.log(scrollIndex + ': scrollIndex (вниз)');
  scrollBoth();
}
}

function scrollDown() {
  if ((activeMenuItemIndex === 2 || activeMenuItemIndex === 0) && activeDisplay === 2) {
    scrollIndex = 0;
  } else if (activeMenuItemIndex === 1) {
    // Если индекс больше 0, уменьшаем его, иначе оставляем равным 0
    if (scrollIndex > 0) {
      scrollIndex = scrollIndex - 1;
    } else {
      scrollIndex = 0;
    }
    console.log(scrollIndex + ': scrollIndex (вверх)');
    scrollBoth();
  }
}
  const avtor = document.getElementById("avtor");
  const originalText = avtor.textContent;

  avtor.addEventListener("mouseenter", () => {
    avtor.textContent = "Made by Martynenko Bogdan";
  });

  avtor.addEventListener("mouseleave", () => {
    avtor.textContent = originalText;
  });

  // Функция для открытия окна sata_alert
  function openSataAlert() {
    sataAlertElement.style.display = "block"; // Показываем окно
    activeSataAlertOption = 0; // Сбрасываем активный пункт на первый
    sataAlertOptions[activeSataAlertOption].classList.add("active"); // Подсвечиваем первый пункт
    isSataAlertActive = true; // Блокируем основное меню
  }

  // Функция для закрытия окна sata_alert
  function closeSataAlert() {
    sataAlertElement.style.display = "none"; // Скрываем окно
    sataAlertOptions.forEach(option => option.classList.remove("active")); // Убираем подсветку со всех пунктов
    activeSataAlertOption = 2; // Сбрасываем активный пункт на первый
    isSataAlertActive = false; // Разблокируем основное меню
  }

  // Функция для перемещения между пунктами в sata_alert
  function navigateSataAlert(direction) {
    sataAlertOptions[activeSataAlertOption].classList.remove("active"); // Убираем подсветку с текущего пункта
    activeSataAlertOption = (activeSataAlertOption + direction + sataAlertOptions.length) % sataAlertOptions.length; // Обновляем индекс
    sataAlertOptions[activeSataAlertOption].classList.add("active"); // Подсвечиваем новый пункт
  }

  // Функция для применения выбранного пункта
function applySataAlertOption() {
  selectedOption = sataAlertOptions[activeSataAlertOption].textContent; // Обновляем глобальную переменную
  const enhancedElement = document.getElementById("enhan_1"); // Элемент [Enhanced]

  // Заменяем текст [Enhanced] на выбранный пункт
  changeCpu.textContent = `[${selectedOption}]`;
  localStorage.setItem('multivolEl', `[${selectedOption}]`); // Сохраняем выбор в localStorage
  

  // Если выбран Manual, скрываем sataconf и обновляем параметры
  if (selectedOption === "Manual" && activeMenuItemIndex === 1) {
    document.getElementById("sataconf").style.display = "none";
    paramsataElements = document.querySelectorAll(".paramsata span:not(.idedd)");
    sataConfigElements = document.querySelectorAll(".sata_configr span:not(.underlined):not(.nochose):not(.confsatas)");
    updateActiveLine();
  } else {
    document.getElementById("sataconf").style.display = "block";
  }
  if (selectedOption === "Auto") {
    updateActiveLine();
  }

  closeSataAlert(); // Закрываем окно после выбора
}
  ;
  // Инициализация функций управления окнами выбора
  setupAlertWindow();
  setupAlertWindowLang();
  setupOpenBoot();
  setupOpenBoot_1();
  setupOpenBoot_2();
  setupOpenBoot_3();
  setupOpenBoot_4();
  setupOpenBoot_5();
  setupOpenBoot_6();
  setupOpenBoot_7();
  setupOpenBoot_8();
  setupOpenBoot_9(); 
  setupOpenBoot_10();
  checkpassword()
  updateTemperature();
  // Инициализация: подсветка активного элемента и видимость контента
menuItems[activeMenuItemIndex].classList.add('active');

updateContentVisibility();
  // Инициализация времени и даты
  initializeTimeAndDate();
  updateTimeDisplay();
  updateDateDisplay();

  // Восстановление состояния Overclock Mode (Manual/Auto) из localStorage
  const savedMultivol = localStorage.getItem('multivolEl');
  if (savedMultivol && (savedMultivol.includes('Manual') || savedMultivol.includes('ManuaI'))) {
    selectedOption = 'Manual';
    document.getElementById("changeCpu").textContent = `[${selectedOption}]`;
    cpufreq.classList.remove('noactive');
    pcieFre.classList.remove('noactive');
    changeCpu_1.classList.remove('noactive');
    changeCpu_2.classList.remove('noactive');
  } else if (savedMultivol && savedMultivol.includes('Auto')) {
    selectedOption = 'Auto';
    cpufreq.classList.add('noactive');
    pcieFre.classList.add('noactive');
    changeCpu_1.classList.add('noactive');
    changeCpu_2.classList.add('noactive');
  }

  updateActiveLine();

  const timer = setInterval(checkTime, 1000);
  if(Number(localStorage.getItem('valumePashalko')) === 0){  
    pashalkoDefault()
  }
  if(Number(localStorage.getItem('valumePashalko')) === 1){   
    document.getElementById("pashalka1").click();
  }
  if(Number(localStorage.getItem('valumePashalko')) <= -1){   
    
    for (let index = 0; index < 100; index++) {
      var myzika_2
        alert('You have changed the value to -1. You are doomed to failure')
       
    }
  }

  if(localStorage.getItem('num7correct')){
    setTimeout(() => {
      toggleTaskStatus(6); 
      console.log('№7correct!');
    }, 100);
  }
  if(localStorage.getItem('num8correct')){
    setTimeout(() => {
      toggleTaskStatus(7); 
    }, 100);
  }
  if(localStorage.getItem('num9correct')){
    setTimeout(() => {
      toggleTaskStatus(8); 
      console.log('№9correct!');
      localStorage.setItem('num9correct', '9correct')
    }, 100);
  }
  if(localStorage.getItem('num10correct')){
    toggleTaskStatus(9); 
  }
  if(localStorage.getItem('num4correct')){
    toggleTaskStatus(3); 

  }
  if(localStorage.getItem('num5correct')){
    toggleTaskStatus(4); 

  }
  if(localStorage.getItem('num6correct')){
    toggleTaskStatus(5); 

  }
  if(localStorage.getItem('num3correct')){
    toggleTaskStatus(2); 

  }
  if(localStorage.getItem('num2correct')){
    toggleTaskStatus(1); 
  }
  if(localStorage.getItem('num1correct')){
    toggleTaskStatus(0); 
  }

  

// ==========================================
// MEMORY TIMING SUB-SCREEN & POPUP SYSTEM
// ==========================================
const memTimingData = [
  { id: "power_down", name: "Power Down Enable", options: ["Disabled", "Enabled"], default: "Disabled", desc: "Enable or disable DDR power down mode to save power at the cost of slight latency." },
  { id: "bank_interleave", name: "Bank Interleaving", options: ["Auto", "Disabled"], default: "Auto", desc: "Enable Bank Interleaving to allow memory accesses to alternate banks for higher throughput." },
  { id: "channel_interleave", name: "Channel Interleaving", options: ["Auto", "Disabled", "XOR of Address bits[20:16, 6]"], default: "Auto", desc: "Configure Channel Interleaving for dual-channel memory architecture." },
  { id: "tCL", name: "CAS# Latency (tCL)", options: ["Auto", "5 CLK", "6 CLK", "7 CLK", "8 CLK", "9 CLK", "10 CLK", "11 CLK"], default: "9 CLK", desc: "Configure CAS# Latency. Lower values decrease memory read access latency." },
  { id: "tRCD", name: "RAS# to CAS# Delay (tRCD)", options: ["Auto", "5 CLK", "6 CLK", "7 CLK", "8 CLK", "9 CLK", "10 CLK", "11 CLK", "12 CLK"], default: "9 CLK", desc: "Delay between activating a row and accessing a column in the active row." },
  { id: "tRP", name: "Row Precharge Time (tRP)", options: ["Auto", "5 CLK", "6 CLK", "7 CLK", "8 CLK", "9 CLK", "10 CLK", "11 CLK", "12 CLK"], default: "9 CLK", desc: "Time required to precharge (deactivate) a row of memory before opening a new row." },
  { id: "tRAS", name: "Min Active RAS (tRAS)", options: ["Auto", "15 CLK", "18 CLK", "20 CLK", "22 CLK", "24 CLK", "27 CLK", "30 CLK"], default: "24 CLK", desc: "Minimum cycles a row must remain active before it can be precharged." },
  { id: "command_rate", name: "Command Rate (CR)", options: ["Auto", "1T", "2T"], default: "1T", desc: "Command Rate timing between memory controller and physical DRAM modules." },
  { id: "tRC", name: "Row Cycle Time (tRC)", options: ["Auto", "28 CLK", "31 CLK", "33 CLK", "36 CLK", "40 CLK", "42 CLK"], default: "33 CLK", desc: "Minimum time between successive active commands to the same bank." },
  { id: "tWR", name: "Write Recovery Time (tWR)", options: ["Auto", "6 CLK", "8 CLK", "10 CLK", "12 CLK", "14 CLK"], default: "10 CLK", desc: "Time between write completion and the start of precharging the same row." },
  { id: "tRFC", name: "Row Refresh Cycle Time (tRFC)", options: ["Auto", "90 ns", "110 ns", "160 ns", "300 ns"], default: "160 ns", desc: "Time required to refresh a row of memory. Lower improves responsiveness if DRAM supports it." },
  { id: "tRRD", name: "RAS to RAS Delay (tRRD)", options: ["Auto", "4 CLK", "5 CLK", "6 CLK", "7 CLK"], default: "4 CLK", desc: "Minimum delay between activating two different rows in different banks." },
  { id: "tWTR", name: "Write to Read Delay (tWTR)", options: ["Auto", "4 CLK", "5 CLK", "6 CLK", "7 CLK", "8 CLK"], default: "5 CLK", desc: "Minimum cycles between write command and next read command." },
  { id: "tRTP", name: "Read to Precharge (tRTP)", options: ["Auto", "4 CLK", "5 CLK", "6 CLK", "7 CLK"], default: "5 CLK", desc: "Delay between a read command and precharge command to the same bank." }
];

let isMemTimingActive = false;
let activeMemTimingIndex = 0;
let activeMemTimingAlertOption = 0;

function initMemoryTiming() {
  const container = document.getElementById("memTimingList");
  if (!container) return;
  container.innerHTML = "";

  memTimingData.forEach((item, index) => {
    const savedVal = localStorage.getItem("memtiming_" + item.id) || item.default;
    const row = document.createElement("div");
    row.id = `mt_row_${index}`;
    row.className = "mem-timing-row";
    row.style.cssText = "display: flex; width: 100%; justify-content: space-between; margin-top: 6px; cursor: pointer; padding: 1px 0;";

    const lbl = document.createElement("div");
    lbl.id = `mt_lbl_${index}`;
    lbl.style.cssText = "width: 50%;";
    lbl.textContent = item.name;

    const val = document.createElement("div");
    val.id = `mt_val_${index}`;
    val.style.cssText = "width: 48%; text-align: left;";
    val.textContent = `[${savedVal}]`;

    row.appendChild(lbl);
    row.appendChild(val);

    row.addEventListener("click", () => {
      activeMemTimingIndex = index;
      updateMemTimingHighlight();
      openMemTimingAlert();
    });

    container.appendChild(row);
  });

  const mtMenuTrigger = document.getElementById("memtiming");
  if (mtMenuTrigger) {
    mtMenuTrigger.addEventListener("click", () => {
      openMemoryTiming();
    });
  }
}

function openMemoryTiming() {
  enterLock = true;
  in_subject = true;
  isMemTimingActive = true;
  rightleftBlock = true;
  localStorage.setItem('actdisExit', 17);

  if (typeof myzika_2 !== 'undefined' && myzika_2) {
    myzika_2.play();
  }

  // Скрываем остальные вкладки меню
  mainmenu.style.display = "none";
  advans.style.display = "none";
  powerr.style.display = "none";
  boott.style.display = "none";
  toolss.style.display = "none";
  exitt.style.display = "none";

  const octweakElem = document.getElementById("octweak");
  const rect = octweakElem.getBoundingClientRect();
  octweakElem.style.position = "absolute";
  octweakElem.style.left = `${rect.left}px`;

  // Скрываем основной список OC Tweaker и правую колонку параметров
  const scrollthis = document.getElementById("scrollthis");
  if (scrollthis) scrollthis.style.display = "none";

  const paramOc = document.querySelector(".paramOcTweak");
  if (paramOc) paramOc.style.display = "none";

  // Показываем подэкран Memory Timing
  const sub = document.getElementById("memTimingSub");
  if (sub) sub.style.display = "block";

  activeMemTimingIndex = 0;
  updateMemTimingHighlight();
}

function closeMemoryTiming() {
  isMemTimingActive = false;
  in_subject = false;
  rightleftBlock = false;

  if (typeof myzika_2 !== 'undefined' && myzika_2) {
    myzika_2.play();
  }

  // Скрываем подэкран
  const sub = document.getElementById("memTimingSub");
  if (sub) sub.style.display = "none";

  // Возвращаем вкладки меню
  mainmenu.style.display = "block";
  advans.style.display = "block";
  powerr.style.display = "block";
  boott.style.display = "block";
  toolss.style.display = "block";
  exitt.style.display = "block";

  const octweakElem = document.getElementById("octweak");
  octweakElem.style.position = "";
  octweakElem.style.left = "";

  // Возвращаем основной вид OC Tweaker
  const scrollthis = document.getElementById("scrollthis");
  if (scrollthis) scrollthis.style.display = "block";

  const paramOc = document.querySelector(".paramOcTweak");
  if (paramOc) paramOc.style.display = "block";

  activeDisplay = 17;
  updateActiveLine();
}

function updateMemTimingHighlight() {
  for (let i = 0; i < memTimingData.length; i++) {
    const row = document.getElementById(`mt_row_${i}`);
    const lbl = document.getElementById(`mt_lbl_${i}`);
    const val = document.getElementById(`mt_val_${i}`);
    if (i === activeMemTimingIndex) {
      if (row) row.classList.add("active");
      if (lbl) {
        lbl.style.color = "white";
        lbl.style.backgroundColor = "black";
      }
      if (val) {
        val.style.color = "white";
        val.style.backgroundColor = "black";
      }
      if (ramkaaElement) {
        ramkaaElement.innerHTML = `
          <p style="font-size: 1.6rem;">${memTimingData[i].desc}</p>
          <div class="ramkaaa" style="font-size: 1.5rem;">
            <p>←→ Select Screen</p>
            <p>↑↓ Select item</p>
            <p>+- Change Field</p>
            <p>F1 General Help</p>
            <p>F10 Save and Exit</p>
            <p>ESC Exit</p>
          </div>`;
      }
    } else {
      if (row) row.classList.remove("active");
      if (lbl) {
        lbl.style.color = "";
        lbl.style.backgroundColor = "";
      }
      if (val) {
        val.style.color = "";
        val.style.backgroundColor = "";
      }
    }
  }
}

function switchMemTimingRow(direction) {
  activeMemTimingIndex = (activeMemTimingIndex + direction + memTimingData.length) % memTimingData.length;
  updateMemTimingHighlight();
  if (typeof myzika_2 !== 'undefined' && myzika_2) {
    myzika_2.play();
  }
}

function openMemTimingAlert() {
  const alertElem = document.getElementById("memTimingAlert");
  const optionsContainer = document.getElementById("memTimingAlertOptions");
  if (!alertElem || !optionsContainer) return;

  optionsContainer.innerHTML = "";
  const currentItem = memTimingData[activeMemTimingIndex];
  const currentValEl = document.getElementById(`mt_val_${activeMemTimingIndex}`);
  const currentVal = currentValEl ? currentValEl.textContent.replace(/[\\[\\]]/g, "").trim() : currentItem.default;

  activeMemTimingAlertOption = 0;

  currentItem.options.forEach((opt, idx) => {
    const div = document.createElement("div");
    div.textContent = opt;
    div.id = `mt_opt_${idx}`;
    div.style.cssText = "padding: 3px 5px; cursor: pointer;";
    if (opt === currentVal) {
      activeMemTimingAlertOption = idx;
      div.classList.add("active");
      div.style.color = "white";
      div.style.backgroundColor = "black";
    }

    div.addEventListener("click", () => {
      applyMemTimingOptionVal(opt);
    });

    optionsContainer.appendChild(div);
  });

  alertElem.classList.remove("hidden");
  blockMenu = true;

  if (typeof myzika_2 !== 'undefined' && myzika_2) {
    myzika_2.play();
  }
}

function closeMemTimingAlert() {
  const alertElem = document.getElementById("memTimingAlert");
  if (alertElem) alertElem.classList.add("hidden");
  blockMenu = false;
  if (typeof myzika_2 !== 'undefined' && myzika_2) {
    myzika_2.play();
  }
}

function navigateMemTimingAlert(direction) {
  const currentItem = memTimingData[activeMemTimingIndex];
  const count = currentItem.options.length;
  const prevDiv = document.getElementById(`mt_opt_${activeMemTimingAlertOption}`);
  if (prevDiv) {
    prevDiv.classList.remove("active");
    prevDiv.style.color = "";
    prevDiv.style.backgroundColor = "";
  }

  activeMemTimingAlertOption = (activeMemTimingAlertOption + direction + count) % count;

  const nextDiv = document.getElementById(`mt_opt_${activeMemTimingAlertOption}`);
  if (nextDiv) {
    nextDiv.classList.add("active");
    nextDiv.style.color = "white";
    nextDiv.style.backgroundColor = "black";
    nextDiv.scrollIntoView({ block: "nearest" });
  }

  if (typeof myzika_2 !== 'undefined' && myzika_2) {
    myzika_2.play();
  }
}

function applyMemTimingAlertOption() {
  const currentItem = memTimingData[activeMemTimingIndex];
  const chosenOpt = currentItem.options[activeMemTimingAlertOption];
  applyMemTimingOptionVal(chosenOpt);
}

function applyMemTimingOptionVal(chosenOpt) {
  const currentItem = memTimingData[activeMemTimingIndex];
  const valEl = document.getElementById(`mt_val_${activeMemTimingIndex}`);
  if (valEl) {
    valEl.textContent = `[${chosenOpt}]`;
  }
  localStorage.setItem("memtiming_" + currentItem.id, chosenOpt);
  closeMemTimingAlert();
}

function cycleMemTimingOption(direction) {
  const currentItem = memTimingData[activeMemTimingIndex];
  const valEl = document.getElementById(`mt_val_${activeMemTimingIndex}`);
  const currentVal = valEl ? valEl.textContent.replace(/[\\[\\]]/g, "").trim() : currentItem.default;
  let currIdx = currentItem.options.indexOf(currentVal);
  if (currIdx === -1) currIdx = 0;
  const nextIdx = (currIdx + direction + currentItem.options.length) % currentItem.options.length;
  const nextOpt = currentItem.options[nextIdx];
  if (valEl) {
    valEl.textContent = `[${nextOpt}]`;
  }
  localStorage.setItem("memtiming_" + currentItem.id, nextOpt);
  if (typeof myzika_2 !== 'undefined' && myzika_2) {
    myzika_2.play();
  }
}

function handleMemTimingKeyDown(event) {
  const alertElem = document.getElementById("memTimingAlert");
  const isAlertOpen = alertElem && !alertElem.classList.contains("hidden");

  if (isAlertOpen) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      navigateMemTimingAlert(-1);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      navigateMemTimingAlert(1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      applyMemTimingAlertOption();
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeMemTimingAlert();
    }
  } else {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      switchMemTimingRow(-1);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      switchMemTimingRow(1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      openMemTimingAlert();
    } else if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      cycleMemTimingOption(1);
    } else if (event.key === "-") {
      event.preventDefault();
      cycleMemTimingOption(-1);
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeMemoryTiming();
    }
  }
}

// Инициализируем при загрузке
initMemoryTiming();

